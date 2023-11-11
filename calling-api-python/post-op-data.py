# from dotenv import load_dotenv
# import pathlib
# import os
# import requests

# dotenv_path = pathlib.Path(pathlib.Path(__file__).parent.resolve(), '../.env')
# load_dotenv(dotenv_path=dotenv_path)
# API_TOKEN = os.getenv('API_TOKEN')
# # response = requests.get("http://localhost:8888/get-element-list")
# # print(response.json()['element'])



# # API_ENDPOINT="http://localhost:8888/post-op-data"

# # for i in range(12, 1000):
# #     data = {
# #         "token":"346653cbcb27ca3618bfcf4f77221b3941def125ec6273430e062fb57b74726370483f407f6d2f370a2a1db27b55e876931b585401bde04b31d7b12baa3f47f8",
# #         "element": "Chau Doc " + str(i),
# #         "date": "2023-11-7",
# #         "data": [208.9, 203.2,	200.2,	196.6,	192.3,	192.4,	191.7,	192.8,	191.6,	200.4,	207.2,	217.4,	221.9,	210.4,	200.0,	194.7,	183.9,	166.6,	158.2,	139.4,	128.4,	122.9,	130.5,	135.5,	169.3, 177.4, 182.0, 177.3,	191.1,	211.0,	218.9,	241.7,	252.3,	250.4,	245.0,	250.2,	259.4,	258.8,	252.0,	245.3,	237.4,	244.7,	236.0,	229.2,	222.1,	216.2,	207.8,	202.5, 2040]
# #     }
# #     r = requests.post(url=API_ENDPOINT, data=data)
# #     print(r.json())

import tkinter as tk
from tkinter import filedialog
root = tk.Tk()
root.withdraw()

def get_file_name(name):
    print(name, end = ':\n') 
    in_path = filedialog.askopenfilename(title=name)
    print(in_path, end = '\n\n')
    return in_path

#%%

import pandas as pd

df = pd.read_excel(get_file_name('Chon file data: '))

#%%
date = str(df.iloc[1,6])[:10]
df_i=df[(df[df.columns[4]]=='I')].fillna('0')
df_p=df[(df[df.columns[4]]=='P')].fillna('0')
df_ip = df[(df[df.columns[4]]=='P') | (df[df.columns[4]]=='I')]

#%% OPDataList
elementList = list(df_ip.iloc[:,2].unique())
opDataList = {'date': date, 'elementList': elementList}

#%% OPData
import json
 
# Data to be written
opData = []

for e in elementList:
    elementI = df_i[df_i[df_i.columns[2]]==e]
    elementP = df_p[df_p[df_p.columns[2]]==e]
    
    elementI = list(elementI.iloc[0, 7:7+49]) if len(elementI) > 0 else []
    elementP = list(elementP.iloc[0, 7:7+49]) if len(elementP) > 0 else []

    elementI = [float(str(i).replace(',','')) for i in elementI]
    elementP = [float(str(i).replace(',','')) for i in elementP]

    
    opData.append(
        {
            'date': date,
            'name': e,
            'i': elementI,
            'p': elementP
        }
    )

 
#%%
with open("./calling-api-python/" + date + "-op-data.json", "w") as outfile:
    json.dump(opData, outfile)

with open("./calling-api-python/" + date + "-op-data-list.json", "w") as outfile:
    json.dump(opDataList, outfile)
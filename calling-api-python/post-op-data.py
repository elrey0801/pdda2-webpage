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
with open("./json-opdata/" + date + "-op-data.json", "w") as outfile:
    json.dump(opData, outfile)

with open("./json-opdata/" + date + "-op-data-list.json", "w") as outfile:
    json.dump(opDataList, outfile)
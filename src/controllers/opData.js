import OPDataService from "../services/opData.js";
import OPData from "../models/opData.js";
import OPDataList from "../models/opDataList.js";
import fs from 'fs';

const OPDataController = {
    postOpData: async (req, res) => {
        var date = Date.parse(req.body.date);
        var element = req.body.element;
        var data = req.body.data;
        var packedData = {
            date: date,
            data: [{
                name: element,
                i: data
            }]
        };
        OPDataService.addOpData(packedData, req, res);
    },

    getOpData: async (req, res) => {
        var name = req.body.name;
        var date = "2023-11-7";
        try {
            var result = await OPData.findOne({
                date: Date.parse(date),
                name: name  
            });

            return res.status(200).json({
                message: 'Found',
                element: result
            })
        } catch(error) {
            console.log(error);
            return res.status(200).json({
                message: 'Not Found',
            })
        }
    },

    getElementList: async (req, res) => {
        var result = await OPDataList.find();
        result = result.map(e => e.elementList);
        return res.status(200).json({
            message: 'OK',
            element: result
        })
    },

    addJSON: async (req, res) => {
        const opData = JSON.parse(fs.readFileSync('op-data.json', 'utf-8'));
        const opDataList = JSON.parse(fs.readFileSync('op-data-list.json', 'utf-8'));
        try {
            await Promise.all([
                OPData.create(opData),
                OPDataList.create(opDataList),
            ]);
            console.log('data successfully imported')

            return res.status(200).json({
                message: 'OK',
            })
          } catch (error) {
                console.log('error', error) 
        }
    }
}

export default OPDataController;
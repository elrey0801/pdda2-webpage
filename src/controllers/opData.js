import OPDataService from "../services/opData.js";
import OPData from "../models/opData.js";
import OPDataList from "../models/opDataList.js";
import fs from 'fs';
import { log } from "console";

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
        var date = req.body.date;
        try {
            var result = await OPData.findOne({
                date: date,
                name: name  
            });
 
            return res.status(200).json({
                message: 'getOpData: OK',
                name: result
            })
        } catch(error) {
            return res.status(404).json({
                message: 'getOpData: Not Found',
            })
        }
    },

    getElementList: async (req, res) => {
        var date = req.body.date;

        if(!date) {
            return res.status(404).json({
                message: 'getElementList: Date is null',
            })
        }
        try {
            var result = await OPDataList.findOne({date: date});
            return res.status(200).json({
                message: 'getElementList: OK',
                elementList: result.elementList
            })
        } catch(e) {
            return res.status(404).json({
                message: 'getElementList: Not Found',
            })
        }

    },

    addJSON: async (req, res) => {
        const opData = JSON.parse(fs.readFileSync('op-data.json', 'utf-8'));
        const opDataList = JSON.parse(fs.readFileSync('op-data-list.json', 'utf-8'));
        try {
            await Promise.all([
                OPData.create(opData),
                OPDataList.create(opDataList),
            ]);
  
            return res.status(200).json({
                message: 'addJSON: Imported data',
            })
          } catch (error) {
                console.log('error', error) 
                return res.status(404).json({
                    message: 'addJSON: Import Failed',
                })
        }
    }
}

export default OPDataController;
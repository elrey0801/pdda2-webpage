import OPData from "../models/opData.js";
import OPDataList from "../models/opDataList.js";
import fs from 'fs';

const OPDataController = {
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
                element: result,
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
            var result =await OPDataList.findOne({date: date});
            return res.status(200).json({
                message: 'getElementList: OK',
                elementList: result.elementList
            })
        } catch(e) {
            return res.status(404).json({
                message: 'getElementList: Not Found',
            })
        }

    }
}

export default OPDataController;
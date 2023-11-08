import OPDataService from "../services/opData.js";
import OPData from "../models/opData.js";

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
        var element = req.body.element;
        try {
            var result = await OPData.findOne({element: element});
            result = result.data;
            return res.status(200).json({
                message: 'Found',
                element: result[0]
            })
        } catch(error) {
            return res.status(200).json({
                message: 'Not Found',
            })
        }
    },

    getElementList: async (req, res) => {
        var result = await OPData.find();
        result = result.map(e => e.element);
        return res.status(200).json({
            message: 'OK',
            element: result
        })
    }
}

export default OPDataController;
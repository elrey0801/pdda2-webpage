import OPDataService from "../services/opData.js";
import OPData from "../models/opData.js";

const OPDataController = {
    postOpData: async (req, res) => {
        var date = Date.parse(req.body.date);
        var element = req.body.element;
        var data = req.body.data;
        var packedData = {
            element: element,
            data: [{
                date,
                i: data
            }]
        };
        OPDataService.addOpData(packedData, req, res);
    },

    getOpData: async (req, res) => {
        var element = req.body.elemnt;
        console.log(OPData.findOne({element: element}));
        return res.status(200).json({
            message: 'Added',
        })
    }
}

export default OPDataController;
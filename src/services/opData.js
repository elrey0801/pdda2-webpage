import OPData from "../models/opData.js";

const OPDataService = {
    addOpData: async (packedData, req, res) => {
        try {
            console.log(packedData);
            var newData = new OPData(packedData);

            await newData.save();
            return res.status(200).json({
                message: 'Added',
            })
        } catch(err) {
            return res.status(400).json({
                message: 'Failed',
                error: err
            })
        }
    }
}

export default OPDataService;
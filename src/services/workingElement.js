import WorkingElement from "../models/workingElement.js";

const WorkingElementService = {
    addWorkingGroup: async (workingGroupData, req, res) => {
        try {
            console.log(workingGroupData);
            var newData = new WorkingElement(workingGroupData);

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

export default WorkingElementService;
import WorkingElement from "../models/workingElement.js";

const WorkingElementService = {
    addWorkingElement: async (workingElementData, req, res) => {
        try {
            console.log(workingElementData);
            var newData = new WorkingElement(workingElementData);

            await newData.save();
            return res.status(200).json({
                message: 'Added new working element',
            })
        } catch(err) {
            return res.status(400).json({
                message: 'Failed to add new working element',
                error: err
            })
        }
    }
}

export default WorkingElementService;
import WorkingElementService from "../services/workingElement.js";
import WorkingElement from "../models/opData.js";
import fs from 'fs';

const WorkingElementController = {
    createWorkingElement: async (req, res) => {
        var scheduleStart = new Date(req.body.scheduleStart);
        var scheduleFinish = new Date(req.body.scheduleFinish);
        var crew = req.body.crew;
        var content = req.body.content;
        var element = req.body.element;
        var station = req.body.station;
        var ptt = req.body.ptt;
        // let username = await req.user;
        // var creator = username[0].name;
        var groupId = req.body.groupId;

        var packedData = {
            scheduleStart: scheduleStart,
            scheduleFinish: scheduleFinish,
            crew: crew,
            content: content,
            element: element,
            station: station,
            ptt: ptt,
            creator: 'elrey0801',
            groupId: 'kkkk'
        };
        WorkingElementService.addWorkingElement(packedData, req, res);
    },

    getWorkingElements: async (req, res) => {
        var response = await fetch('http://127.0.0.1:8080/get-working-elements');
        response = await response.json();
        return res.status(200).json({
            message: 'ok',
            data: response
        })
    }
}

export default WorkingElementController;
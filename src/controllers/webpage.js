const WebPageController = {
    getHome: async (req, res) => {
        let username = await req.user;
        res.render('home.ejs', { username: username[0].name });
    }, 
    
    getDataPage: async (req, res) => {
        let username = await req.user;
        res.render('./op-data/data.ejs', { username: username[0].name });
    },

    getCreateWorkingGroupPage: async (req, res) => {
        let username = await req.user;
        res.render('./ptvh/create-working-group.ejs', { username: username[0].name });
    }
}

export default WebPageController;
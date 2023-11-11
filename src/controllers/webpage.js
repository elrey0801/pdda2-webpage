const WebPageController = {
    getHome: async (req, res) => {
        let username = await req.user;
        res.render('home.ejs', { username: username[0].name });
    }, 
    
    getDataPage: async (req, res) => {
        let username = await req.user;
        res.render('./op-data/data.ejs', { username: username[0].name });
    }
}

export default WebPageController;
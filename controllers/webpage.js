let getHome = async (req, res) => {
    let username = await req.user;
    res.render('home.ejs', { username: username[0].name });
}

let WebPageController = { getHome };

export default WebPageController;
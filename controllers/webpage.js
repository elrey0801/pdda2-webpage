let getHome =  (req, res) => {
    res.render('home.ejs');
}

let getPostLogIn =  (req, res) => {
    res.redirect('/');
}

export default { getHome, getPostLogIn };
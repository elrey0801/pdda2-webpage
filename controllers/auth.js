import passport from "passport";

let getLogin = (req, res) => {
    res.render('./auth/login.ejs')
}

let postLogin = passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    })

let logout = (req, res) => {

}

export default { getLogin, postLogin, logout }
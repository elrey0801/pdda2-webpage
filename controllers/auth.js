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
    req.logOut((err) => {
        if (err) return next(err);
        res.redirect('/login');
    });
}

let checkAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

let checkNotAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }
    next();
}

let AuthController = { getLogin, postLogin, logout, checkAuthenticated, checkNotAuthenticated }


export default AuthController;
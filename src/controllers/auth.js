import passport from "passport";

const AuthController = {
    getLogin: (req, res) => {
        res.render('./auth/login.ejs')
    },

    postLogin: passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    }),

    logout: (req, res) => {
        req.logOut((err) => {
            if (err) return next(err);
            res.redirect('/login');
        });
    },

    checkAuthenticated: (req, res, next) => {
        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect('/login');
    },

    checkNotAuthenticated: (req, res, next) => {
        if (req.isAuthenticated()) {
            return res.redirect('/');
        }
        next();
    },

}

export default AuthController;
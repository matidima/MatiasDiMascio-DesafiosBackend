import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { AuthController } from "../controllers/controller.js";
import { User } from "../models/user.js";

const init = () => {
    passport.use(
        "login",
        new LocalStrategy({ 
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true }, AuthController.login)
    );
    passport.use(
        "register",
        new LocalStrategy({ 
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true }, AuthController.register)
    );

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });
    passport.deserializeUser((id, done) => {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });
}

const Authenticated = (req, res, next) => {
    if (req.isAuthenticated())
        return res.render("home", { username: req.user.username });
    next()
}


export const PassportAuth = { Authenticated, init }
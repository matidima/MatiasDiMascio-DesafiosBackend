import { UserModel } from "../models/user.js";
import { BCRYPT_VALIDATION } from "../utils/bcrypt.js";

const login = ( req, email, password, done ) => {
    UserModel.findOne({ email: email }, (err, user) => {
    if (err) {
        console.log("Error in Login: " + err);
        return done(err);
    }
    if (!user) {
        console.log(user)
            console.log("User Not Found with email: " + email);
            return done(null, false);
        }
        if (!BCRYPT_VALIDATION.validatePassword(password, user)) {
            console.log("Invalid Password");
            return done(null, false); 
        }
        return done(null, user);
    });
}

const register = (req, email, password, done) => {
    const { username } = req.body
    UserModel.findOne({ email: email }, function (err, user) {
        if (err) {
            console.log("Error in SignUp: " + err);
            return done(err);
        }
        if (user) {
            console.log("User already exists");
            return done(null, false);
        } else {
            const newUser = new User();
            const passwordString = password.toString();
            newUser.username = username;
            newUser.email = email;
            newUser.password = BCRYPT_VALIDATION.hashPassword(passwordString);
            newUser.save().then(datos => done(null, datos)).catch(null, false)
        }
    });
}

export const AuthController = { login, register }
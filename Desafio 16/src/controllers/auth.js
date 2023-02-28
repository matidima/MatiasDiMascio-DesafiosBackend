import { UserModel } from "../models/index.js";
import { BCRYPT_VALIDATION } from "../utils/bcrypt.js";
import { EMAIL_UTILS } from "../utils/nodemailer.js";

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
    const { username, address, age, thumbnail, phone } = req.body
    UserModel.findOne({ email: email }, async function (err, user) {
        if (err) {
            console.log("Error in SignUp: " + err);
            return done(err);
        }
        if (user) {
            console.log("User already exists");
            return done(null, false);
        } else {
            const newUser = new UserModel();
            const passwordString = password.toString();
            newUser.username = username;
            newUser.address = address;
            newUser.age = age;
            newUser.thumbnail = thumbnail;
            newUser.phone = phone;
            newUser.email = email;
            newUser.password = BCRYPT_VALIDATION.hashPassword(passwordString);
            newUser.save().then(datos => done(null, datos)).catch(null, false)
            let subject = 'Nuevo usuario creado'
            let mailTo = 'matias.dimascio@gmail.com'
            let html = `
                        <h3>Nuevo registro de usuario</h3>
                        <p> Datos:</p>
                        <ul>
                        <li> Nombre: ${username}</li>
                        <li> Email: ${email}</li>
                        <li> Teléfono: ${phone}</li>
                        <li> Edad: ${age}</li>
                        <li> Dirección: ${address}</li>
                        </ul>
            `
            await EMAIL_UTILS.sendEmail(mailTo, subject, html)
        }
    });
}

export const AuthController = { login, register }
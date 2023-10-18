import fs from 'fs';
import bcrypt from 'bcrypt';
import { Strategy } from 'passport-local';
const LocalStrategy = Strategy;

let PassportUtilities = {
    //Initialise Passport
    initialize: (passport, getUserName, getUserById) => {
        const authenticateUser = async (username, password, done) => {
            const response = await getUserName(username);
            let user = response[0];
            if (user == null) return done(null, false, { message: "Incorrect UserName or Password!" });
    
            if (!user.activated) return done(null, false, { message: "User has not been activated yet!" });
    
            try {
                if (await bcrypt.compare(password, user.password)) {
                    let logstr = `[${new Date()}] ${username} --- logged in\n`
                    console.log(logstr);
                    //fs.appendFileSync("logs.txt", logstr);
                    return done(null, user);
                }
                else {
                    let logstr = `[${new Date()}] ${username} --- input wrong password\n`
                    console.log(logstr);
                    //fs.appendFileSync("logs.txt", logstr);
                    return done(null, false, { message: "Wrong password" });
                }
            }
            catch (err) {
                return done(err);
            }
        }
        passport.use(new LocalStrategy({ usernameField: 'username' }, authenticateUser));
        passport.serializeUser((user, done) => done(null, user.id));
        passport.deserializeUser((id, done) => {
            return done(null, getUserById(id));
        })
    },
}


export default PassportUtilities;
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import passport from "passport";
import { config } from "dotenv";

config();
console.log('client id', process.env.CLIENT_ID)

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID as string,
      clientSecret: process.env.CLIENT_SECRET!,
      callbackURL: "http:localhost:4000/api/v1/auth/google/callback",
      scope: ["profile", "email"],
    },
    function (accessToken, refreshToken, profile, callback) {
        console.log("pp", profile)
      callback(null, profile);
    }
  )
);

passport.serializeUser((user, done)=> {
    console.log('su', user)
    done(null, user)
})

passport.deserializeUser((user, done)=> {
    console.log('dsu', user)

    done(null, user!)
})

// passport.use(new GoogleStrategy.Strategy({
//     clientID: process.env.CLIENT_ID,
//     clientSecret: process.env.CLIENT_SECRET,
//     callbackURL: "http://www.example.com/auth/google/callback"
//   },
//   function(accessToken, refreshToken, profile, cb) {
//     User.findOrCreate({ googleId: profile.id }, function (err, user) {
//       return cb(err, user);
//     });
//   }
// ));

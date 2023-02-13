import { SHA256 } from "crypto-js";
import passport from "passport";
import { BasicStrategy } from "passport-http";
import users, { User } from "./users";

export default passport.use(new BasicStrategy(
    function(username, password, done) {
      const user = users.filter((u: User) => u.username === username)[0] ?? [];

      if(!user) return done(null, false);

      if(user.secret === SHA256(password).toString()){
        return done(null, user);
      }

      return done(null, false);
    }
  ));
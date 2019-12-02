const mongoose = require('mongoose');

const { Schema } = mongoose;

module.exports = () => {
  const db = mongoose.connect(
    'mongodb://localhost:27017/social-auth-example',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    },
    (err) => {
      if (err) {
        console.log('Unable to connect the server. Please start the db server');
      } else {
        console.log('succesfully connected to db');
      }
    }
  );

  const UserSchema = new Schema({
    facebookProvider: {
      type: {
        id: String,
        token: String
      },
      select: false
    }
  });

  UserSchema.set('toJSON', { getters: true, virtuals: true });

  // eslint-disable-next-line func-names
  UserSchema.statics.upsertFbUser = function(
    accessToken,
    refreshToken,
    profile,
    cb
  ) {
    const That = this;
    return this.findOne(
      {
        'facebookProvider.id': profile.id
      },
      (err, user) => {
        // no user was found, lets create a new one
        if (!user) {
          const newUser = new That({
            fullName: profile.displayName,
            email: profile.emails[0].value,
            facebookProvider: {
              id: profile.id,
              token: accessToken
            }
          });

          newUser.save((error, savedUser) => {
            if (error) {
              console.log(error);
            }
            return cb(error, savedUser);
          });
        } else {
          return cb(err, user);
        }
      }
    );
  };

  mongoose.model('User', UserSchema);

  return db;
};

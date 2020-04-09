const mongoose = require('mongoose');
const User = mongoose.model('User');
const token = mongoose.model('token');
const sgMail = require('@sendgrid/mail');

const { encrypt, decrypt } = require('../utils/utils.js')
const keys = require('../keys/index.js');
sgMail.setApiKey(keys.sendGrid);

module.exports = (app) => {
  
  app.post('/api/register', (req, res) => {          
     User.findOne({ email: req.body.email }).then(findUser => {
      if (findUser) {
        return;
      }
      const hashPassword = encrypt(req.body.password);
      const NewUser = new User({
        ...req.body,
        password: hashPassword,
        verified: false
      });
      return NewUser.save();  
    }).then((userData) => {
      if(userData) {
        return res.sendStatus(200);
      }
      return res.status(500).send('Email Already Exists');
    }).catch(err=>{
      console.log(err)
      return res.status(500).send();
    });
  });
  
  app.post('/api/login', (req, res) => {
    if(req.session.userID !== undefined) {
      req.session.destroy(err => {
        if (err) {
          console.log(err);  
          return res.status(500).send('Internal Server Error');
        } else {
          const hashPassword = encrypt(req.body.password);
          User.findOne({ email: req.body.email, password: hashPassword }).select({ "password": 0 })
          .then( data => {
              req.session.userID = data._id;
              return res.sendStatus(200);
          }).catch(err => {
              console.log(err);
              return res.status(500).send('Internal Server Error'); 
          });
        }
      });
    } else {
      const hashPassword = encrypt(req.body.password);
      User.findOne({ email: req.body.email, password: hashPassword }).select({ "password": 0 })
        .then(data => {
          if(data) {
            req.session.userID = data._id;
            return res.sendStatus(200);
          }
          console.log('No User Present');
          return res.status(500).send('Internal Server Error');
        }).catch(err => {
          console.log(err);
          return res.status(500).send('Internal Server Error');
      });
    }
  });

  app.get('/api/currentUser', (req, res) => {
    if (req.session.userID) {
      User.findOne({ _id: req.session.userID } , { password: 0 }).select({ "password": 0 })
      .then(data => {
        if(!data) {
          return res.status(200).send([]);
        }
        return res.status(200).send(data);
      }).catch(err => {
        console.log(err);
        return res.status(500).send();
      });
    } else {
      res.sendStatus(500);
    }
  });
  
  app.delete('/api/logout', (req, res) => {
    if (req.session.userID) {
      req.session.destroy(function(err) {
        if(err) {
          res.sendStatus(500);
        } else {
          res.sendStatus(200);
        }
      }
    );
    } else {
      res.sendStatus(500);
    }
  });

  app.get('/api/verifyReset', (req, res) => {
    const q = req.query.q;
    token.find({
      value: q
    }).then((tokenData) => {
      if(tokenData.length) {
        console.log('Token data present');
        const email = decrypt(q);
        return User.findOne({ email }).select({ "password": 0 })
      } else {
        return false;  
      }
    }).then((data)=>{
      if(data) {
        console.log('User present');
        return res.status(200).send(true);
      } else {
        console.log('User not present');
        return res.status(200).send(false);
      }
    })
    .catch((err)=>{
      console.log(err);
      return res.status(200).send(false);
    })
  });

  app.get('/api/confirmReset', (req, res) => {
    const q = req.query.q;
    const password = req.query.password;
    const email = decrypt(q);
    token.find({
      value: q
    }).then((tokenData) => {
      if(tokenData.length) {
        console.log('Token present');
        return User.findOne({ email }).select({ "password": 0 });
      } else {
        console.log('Token not present');
        return false;
      }
    }).then((userData) => {
      if(userData) {
        console.log('User present');
        const hashPassword = encrypt(password);
        return User.updateOne({ email }, { password: hashPassword }, { upsert: true })
      } else {
        console.log('User Data not present');
        return false;
      }
    }).then((updateStatus) => {
      if(updateStatus) {
        console.log('Password updated');
        return token.deleteMany({ value: q });
      } else {
        console.log('Password not Updated');
        return false;
      }
    }).then((tokenStatus) => {
      if(tokenStatus) {
        console.log('Token deleted');
        return res.sendStatus(200);
      } else {
        console.log('Token not deleted');
        return res.sendStatus(500);
      }
    }).catch((err) => {
      console.log(err);
      return res.sendStatus(500);
    });
  });

  app.get('/api/forgotPassword',(req, res) => {
      const email = req.query.email;
      const emailParameter = encrypt(email);
      User.findOne({email}).select({"password": 0})
      .then((userExists) => {
        if(userExists) {
          console.log('User Present');
          const newToken = new token({
            value: emailParameter
          });
          console.log('User Present');
          return newToken.save()
        } else {
          console.log('User not Present');
          return false;
        }
      }).then((tokenSaved) => {
          if(tokenSaved) {
            console.log('Token Saved');
            let userLink = `${req.protocol}://${req.get('host')}/resetPassword?q=${emailParameter}`;
            if(!(process.env.NODE_ENV === 'production')) {
              userLink = userLink.split('5000')[0] + '3000' + userLink.split('5000')[1];
            }
            const msg = {
              to: email,
              from: keys.supportEmail,
              subject: 'Quizler Password Reset link',
              html: `<p><p>Hello,</p>please use the link below to reset your Quizler account password</p><a href="${userLink}" target="_blank">Reset Password Link</a>`,
            };
            sgMail.send(msg);
            console.log('forgot password link sent');
            return res.sendStatus(200);
          } else {
            console.log('Token not Saved');
            return res.sendStatus(500);
          }
      }).catch((err) => {
        console.log(err)
        return res.status(500);
      });
  });
  
  app.get('/api/verifyLink', (req, res) => {
    if(req.session.userID) {
      const q = encrypt(req.session.userID);
      const newToken = new token({
        value: q
      });
      newToken.save()
      .then(() => {
        return User.findOne({_id: req.session.userID }).select({"password": 0});    
      })
      .then((data) => {
        if(data) {
          let userLink = `${req.protocol}://${req.get('host')}/api/confirmVerify?q=${q}`;
          const msg = {
            to: data.email,
            from: keys.supportEmail,
            subject: 'Quizler Verify account',
            html: `<p><p>Hello,</p>please use the link below to verify our account</p><a href="${userLink}" target="_blank">Verify Account Link</a>`,
          };
          sgMail.send(msg);
          console.log('Verification Link has been sent');
          return res.sendStatus(200);
        }
      }).catch(err=>{
        console.log(err);
        return res.sendStatus(500);
      });
    } else {
      res.sendStatus(500);
    }
  });

  app.get('/api/confirmVerify', (req, res) => {
    token.find({
      value: req.query.q
    }).then((tokenData) => {
      if(tokenData.length) {
        return token.deleteMany({ value: req.query.q })
      } else {
        console.log('Token not present');
        return false;
      }
    }).then((tokenRemove) => {
      if(tokenRemove) {
        console.log('Token Removed', tokenRemove);
        const _id = decrypt(req.query.q);
        return User.updateOne({ _id }, { verified: true }, { upsert: true });
      } else {
        console.log('Token not Removed', tokenRemove);
        return false;
      }
    }).then((userUpdated) => {
      if(userUpdated) {
        console.log('User Updated', userUpdated);
        return res.send('Your account has been verified');
      } else {
        console.log('User not Updated');
        return res.sendStatus(500);    
      }
    })
    .catch(err => {
      console.log(err)
      return res.sendStatus(500);
    })
  });
};

const mongoose = require('mongoose');
const User = mongoose.model('User');
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
    if(!req.session.reset) {
      res.status(200).send(false);  
    } else {
      try {
        const email = decrypt(req.query.q);
        User.findOne({ email }).select({ "password": 0 })
        .then((data) => {
          if(!data) {
            return res.status(200).send(false);
          } else {
            return res.status(200).send(true);
          } 
        }).catch((err) => {
          console.log(err)
          return res.status(200).send(false); 
        });
      } catch(err) {
        console.log(err);
        return res.status(200).send(false);   
      }
    }
  });

  app.get('/api/confirmReset', (req, res) => {
    try {
      const email = decrypt(req.query.q);
      User.findOne({ email }).select({ "password": 0 })
      .then((data) => {
        if(!data) {
          return;
        }
        const hashPassword = encrypt(req.query.password);
        return User.updateOne({ email }, { password: hashPassword }, { upsert: true });
      }).then((data) => {
        if(data) {
          req.session.reset = false;
          return res.status(200).send(true); 
        } else {
          return res.status(200).send(false); 
        }
      }).catch((err) => {
        console.log(err)
        return res.status(200).send(false); 
      });
    } catch(err) {
      console.log(err);
      return res.status(200).send(false);   
    }
  });

  app.get('/api/forgotPassword',(req, res) => {
      const email = req.query.email;
      User.findOne({ email }).select({ "password": 0 })
      .then( data => {
         if(!data) {
          return res.send('User does not exist');
        } else {
          const emailParameter = encrypt(email);
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
          req.session.reset = true;
          return res.send('Reset Password Link Sent');
        }
      }).catch(err => {
          console.log(err);
          return res.status(500).send('Internal Server Error'); 
      });
  });
  
  app.get('/api/verifyLink', (req, res) => {
    if(req.session.userID) {
      const q = encrypt(req.session.userID);
      User.findOne({_id: req.session.userID }).select({"password": 0}).then(data=>{
        req.session.verify = true;
        let userLink = `${req.protocol}://${req.get('host')}/api/confirmVerify?q=${q}`;
        const msg = {
          to: data.email,
          from: keys.supportEmail,
          subject: 'Quizler Verify account',
          html: `<p><p>Hello,</p>please use the link below to verify our account</p><a href="${userLink}" target="_blank">Verify Account Link</a>`,
        };
        sgMail.send(msg);
        return res.sendStatus(200);
      }).catch(err=>{
        console.log(err);
        return res.sendStatus(500);
      });
    } else {
      res.sendStatus(500);
    }
  });

  app.get('/api/confirmVerify', (req, res) => {
    if(req.session.verify) {
      try {
        const _id = decrypt(req.query.q);
        User.findOne({ _id }).then(data=>{
          if(!data) {
            return;
          }
          return User.updateOne({ _id }, { verified: true }, { upsert: true });
        }).then((result) => {
          if(result) {
            req.session.verify = false;
            return res.send('Your account has been verified. Please close this tab and continue browsing'); 
          } else {
            return res.sendStatus(500); 
          }
        })
        .catch(err => {
          console.log(err);
          return res.sendStatus(500);
        });
      } catch(e) {
        console.log(e);
        res.sendStatus(500);
      }
    } else {
      console.log('Session not present');
      res.sendStatus(500);
    }
  });
};

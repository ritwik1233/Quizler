const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = (app) => {
  
  app.post('/api/register', (req, res) => {      
    const registerBody = {
        ...req.body,
        verified: false,
        accountType: 'free'
    };
    const newUser = new User({
      ...registerBody,
    })
    User.findOne({ email: registerBody.email }).then(result => {
      if (result) {
        return res.status(500).send('Email Already Exists');
      }
      newUser.save().then(() => {
        return res.sendStatus(200);
      }).catch(err => {
        console.log(err);
        return res.status(500).send('Internal Server Error');      
      });  
    }).catch(err => {
       console.log(err);
       return res.status(500).send('Internal Server Error');
    });
  });
  
  app.post('/api/login',(req, res) => {
    if(req.session.userID !== undefined) {
      req.session.destroy(err => {
        if (err) {
          console.log(err);  
          return res.status(500).send('Internal Server Error');
        } else {
          User.findOne({ email: req.body.email, password: req.body.password }).select({ "password": 0 })
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
      User.findOne({ email: req.body.email, password: req.body.password }).select({ "password": 0 })
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

  app.get('/api/currentUser',(req, res) => {
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
  
  app.delete('/api/logout',(req, res) => {
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
  })
};

const express = require("express");
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const path = require('path');

const keys = require('./keys');

mongoose.connect(keys.MongoURI, { useNewUrlParser: true,  useUnifiedTopology: true  });

require('./models/questionModel.js');
require('./models/userModel.js')

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json())
app.use(session({
  secret: keys.secret,
  resave: false,
  saveUninitialized: true,
}));

require('./routes/authRoutes.js')(app);
require('./routes/apiRoutes.js')(app);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}
app.listen(PORT, (err) => {
    if(err) {
        console.log(err);
    } else {
        console.log('Node Server listening at', PORT);
    }
});

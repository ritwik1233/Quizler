const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const path = require('path');
const helmet = require('helmet');

const fileUpload = require('express-fileupload');
const keys = require('./keys');

mongoose.connect(keys.MongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

require('./models/quizModel.js');
require('./models/questionModel.js');
require('./models/userModel.js');
require('./models/tokenModel.js');

const app = express();
const PORT = process.env.PORT || 5000;
app.use(helmet());
app.use(
  session({
    secret: keys.secret,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(fileUpload());
app.use(bodyParser.json());

require('./routes/authRoutes.js')(app);
require('./routes/questionRoutes.js')(app);
require('./routes/quizRoutes.js')(app);
require('./routes/homeRoutes.js')(app);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}
app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Node Server listening at', PORT);
  }
});

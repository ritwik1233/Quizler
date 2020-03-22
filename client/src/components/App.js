import React from 'react';
import { Grid } from '@material-ui/core';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from './Header.js';
import HomePage from '../components/Home/HomePage.js';
import LoginPage from './Common/LoginPage.js';
import RegisterPage from './Common/RegisterPage.js';
import QuestionPage from '../components/Questions/QuestionPage.js';
import NewQuestionPage from './Questions/NewQuestionPage.js';
import QuizPage from '../components/Quizes/QuizPage.js';
import NewQuizPage from '../components/Quizes/NewQuizPage.js';
import AnalyticsPage from '../components/Analytics/AnalyticsPage.js';
import ProfilePage from '../components/Profile/ProfilePage.js';
import ConfirmTestPage from './Home/ConfirmTestPage.js';
import NewTestPage from './Home/NewTestPage.js';
import ResultPage from './Home/ResultPage.js';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Header />
          </Grid>
          <Grid item xs={12}>
            <Switch>
              <Route  exact path="/" component={HomePage}/>
              <Route  path="/confirmtest" component={ConfirmTestPage}/>
              <Route  path="/newtest" component={NewTestPage}/>
              <Route  path="/result" component={ResultPage}/> 
              <Route  path="/login" component={LoginPage}/>
              <Route  path="/register" component={RegisterPage}/>
              <Route  path="/questions" component={QuestionPage}/>
              <Route  path="/newquestions" component={NewQuestionPage}/>
              <Route  path="/quiz" component={QuizPage}/>
              <Route  path="/newquiz" component={NewQuizPage}/>
              <Route  path="/analytics" component={AnalyticsPage}/>
              <Route  path="/profile" component={ProfilePage}/>
            </Switch>
          </Grid>
        </Grid>
      </BrowserRouter>
   );
  };
};
export default App;

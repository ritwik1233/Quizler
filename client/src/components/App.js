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
import AnalyticsPage from '../components/Analytics/AnalyticsPage.js';
import ProfilePage from '../components/Profile/ProfilePage.js';


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
              <Route  exact path="/" component={ HomePage }/>
              <Route  path="/login" component={ LoginPage }/>
              <Route  path="/register" component={ RegisterPage }/>
              <Route  path="/questions" component={ QuestionPage }/>
              <Route  path="/newquestions" component={ NewQuestionPage }/>
              <Route  path="/quiz" component={ QuizPage }/>
              <Route  path="/analytics" component={ AnalyticsPage }/>
              <Route  path="/profile" component={ ProfilePage }/>
            </Switch>
          </Grid>
        </Grid>
      </BrowserRouter>
   );
  };
};
export default App;

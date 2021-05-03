import React from "react";
import {
  Grid,
  Typography,
  Link,
  Button,
  Modal,
  CardContent,
  Card,
} from "@material-ui/core";
import PropTypes from "prop-types";
import { Link as RouterLink, Redirect } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import AddIcon from "@material-ui/icons/Add";

import {
  fetchUser,
  getAllQuestion,
  getAllQuiz,
  editQuiz,
} from "../../actions/index.js";
import QuizListComponent from "./components/QuizListComponent.js";
import SearchComponent from "../Common/SearchComponent.js";

function QuizPage(props) {
  const dispatch = useDispatch();
  const [redirect, setRedirect] = React.useState(false);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [link, setLink] = React.useState("");

  // Component Did Mount Hook
  React.useState(() => {
    dispatch(fetchUser());
    dispatch(getAllQuestion());
    dispatch(getAllQuiz());
  }, []);

  // componentDidUpdate Hook for current User Object
  React.useEffect(() => {
    const _id = props.currentUser._id;
    if (_id !== "default" && !_id) {
      setRedirect(true);
    }
  }, [props.currentUser]);

  const editItem = (quiz) => {
    dispatch(editQuiz(quiz));
    props.history.push("/newquiz");
  };

  const deleteItem = (status) => {
    if (status) {
      dispatch(getAllQuiz());
    }
  };

  const handleAdd = () => {
    dispatch(editQuiz({}));
  };

  const handleClose = () => {
    setModalOpen(false);
  };
  const handleOpen = () => {
    setModalOpen(true);
  };

  const shareLink = (id) => {
    const link = `${window.location.origin}/confirmtest?q=${id}`;
    setLink(link);
  };

  if (redirect) {
    return <Redirect to="/" />;
  }
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Modal
          open={modalOpen}
          onClose={handleClose}
          style={{
            width: "50%",
            marginTop: "15%",
            marginLeft: "25%",
          }}
        >
          <Card>
            <CardContent>
              <Grid container spacing={0}>
                <Grid item xs={12}>
                  <Typography variant="h6">Share Link</Typography>
                </Grid>
                <Grid item xs={12}>
                  <hr />
                </Grid>
                <Grid item xs={12}>
                  <a href={link} target="_blank" rel="noopener noreferrer">
                    {link}
                  </a>
                </Grid>
                <Grid item xs={12}>
                  &nbsp;
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Modal>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            &nbsp;
          </Grid>
          <Grid item xs={10}>
            <Typography variant="h5">&nbsp;&nbsp;Quizes</Typography>
          </Grid>
          <Grid item xs={2}>
            <Link to="/newQuiz" component={RouterLink}>
              <Button
                onClick={handleAdd}
                variant="contained"
                endIcon={<AddIcon />}
              >
                Add
              </Button>
            </Link>
          </Grid>
          <Grid item xs={12}>
            &nbsp;
          </Grid>
          <Grid item xs={12}>
            <SearchComponent type="quiz" />
          </Grid>
          <Grid item xs={12}>
            &nbsp;
          </Grid>
          <Grid item xs={12}>
            <QuizListComponent
              allQuiz={props.allQuiz}
              deleteItem={deleteItem}
              editItem={editItem}
              shareLink={shareLink}
              handleOpen={handleOpen}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

function mapStateToProps(state) {
  return {
    currentUser: state.auth.currentUser,
    allQuiz: state.quiz.allQuiz,
  };
}

// type checking for props
QuizPage.propTypes = {
  currentUser: PropTypes.objectOf(Object),
  allQuiz: PropTypes.arrayOf(Object),
};

// setting default props
QuizPage.defaultProps = {
  currentUser: { _id: "default" },
  allQuiz: [],
};
export default connect(mapStateToProps)(QuizPage);

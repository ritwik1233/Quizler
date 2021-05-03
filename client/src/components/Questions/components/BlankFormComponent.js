import React from "react";
import {
  TextField,
  Button,
  MenuItem,
  ButtonGroup,
  Tooltip,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import PropTypes from "prop-types";
import AddOptionFormComponent from "./AddOptionFormComponent.js";
import OptionListComponent from "./OptionListComponent.js";

function formSetence(editQuestion) {
  const correctAnswer = editQuestion.options.find((element) => element.correct);
  const firstHalf = editQuestion.question.split("_____")[0].trim().length
    ? editQuestion.question.split("_____")[0].trim() + " "
    : "";
  const secondHalf = editQuestion.question.split("_____")[1].trim();
  const fullSentence = firstHalf + correctAnswer.description + " " + secondHalf;
  return fullSentence;
}

function wordSplit(sentence) {
  return sentence.split(" ");
}

function BlankFormComponent(props) {
  const [tag, setTag] = React.useState([]);
  const [options, setOptions] = React.useState([]);
  const [tagValue, setTagValue] = React.useState("");
  const [point, setPoint] = React.useState(0);
  const [sentenceValue, setSentenceValue] = React.useState("");
  const [sentence, setSentence] = React.useState(false);
  const [addOption, setAddOption] = React.useState(false);

  React.useEffect(() => {
    if (props.editQuestion.options) {
      setOptions(props.editQuestion.options);
    }
  }, [props.editQuestion.options]);

  React.useEffect(() => {
    if (props.editQuestion.tag) {
      setTagValue(props.editQuestion.tag);
    }
  }, [props.editQuestion.tag]);

  React.useEffect(() => {
    if (props.editQuestion.point) {
      setPoint(props.editQuestion.point);
    }
  }, [props.editQuestion.point]);

  React.useEffect(() => {
    if (props.editQuestion.question) {
      const blankSentence = formSetence(props.editQuestion);
      setPoint(blankSentence);
    }
  }, [props.editQuestion.question]);

  const submitQuestion = (e) => {
    e.preventDefault();
    const data = {
      _id: props.editQuestion._id ? props.editQuestion._id : undefined,
      question: sentenceValue,
      options: options,
      tag: tagValue,
      point: e.target.point.value,
      type: "MCQBLANK",
    };
    axios.post("/api/addQuestion", data).then(() => {
      props.handleRedirect();
    });
  };
  const markBlank = (data) => {
    const sentence = sentenceValue.replace(data, "_____");
    const optionArray = options;
    optionArray.push({ description: data, correct: true });
    setOptions(optionArray);
    setSentenceValue(sentence);
  };

  const handleOption = () => {
    setAddOption(true);
  };

  const handleCancel = () => {
    setAddOption(false);
  };

  const handleSentenceChange = (e) => {
    setSentenceValue(e.target.value);
  };

  const handlePointChange = (e) => {
    setPoint(e.target.value);
  };

  const addOptionForm = (optionData) => {
    const optionArray = this.state.options;
    optionArray.push(optionData);
    setOptions(optionArray);
    setAddOption(false);
  };

  const selectOption = (tagValue) => {
    setTagValue(tagValue);
  };

  const onSentenceUpdate = () => {
    if (sentenceValue.length > 0) {
      setSentence(!sentence);
      setOptions([]);
    }
  };

  const handleTagChange = (e) => {
    setTagValue(e.target.value);
    axios
      .get("/api/getAllTag", {
        params: {
          tag: e.target.value,
        },
      })
      .then((res) => {
        setTag(res.data);
      })
      .catch((err) => {
        setTag([]);
      });
  };

  const deleteOption = (optionIndex) => {
    let optionArray = options.filter(
      (eachData, index) => index !== optionIndex
    );
    setOptions(optionArray);
  };

  const words = wordSplit(sentenceValue);
  const option = options.map((eachData, index) => {
    return (
      <OptionListComponent
        optionData={eachData}
        key={index}
        index={index}
        deleteOption={deleteOption}
      />
    );
  });
  return (
    <form onSubmit={submitQuestion}>
      {!sentence ? (
        <Tooltip title="Enter full sentence">
          <TextField
            variant="outlined"
            margin="normal"
            id="question"
            value={sentenceValue}
            onChange={handleSentenceChange}
            label="Sentence"
            name="question"
            autoComplete="question"
            required
            fullWidth
            autoFocus
          />
        </Tooltip>
      ) : options.length > 0 ? (
        <Typography variant="body1">{sentenceValue}</Typography>
      ) : (
        <ButtonGroup color="primary" aria-label="outlined primary button group">
          {words.map((eachData, key) => {
            return (
              <Tooltip title="Mark as blank" key={key}>
                <Button
                  onClick={() => {
                    markBlank(eachData);
                  }}
                >
                  {eachData}
                </Button>
              </Tooltip>
            );
          })}
        </ButtonGroup>
      )}
      <Button variant="contained" onClick={onSentenceUpdate} color="primary">
        {sentence ? "Remove Sentence" : "Add Sentence"}
      </Button>
      <br />
      {options.length > 0 && (
        <Button variant="contained" color="primary" onClick={handleOption}>
          Add Option
        </Button>
      )}
      {addOption && (
        <React.Fragment>
          <br />
          <br />
          <AddOptionFormComponent
            correct={true}
            addOptionForm={addOptionForm}
            handleCancel={handleCancel}
          />
        </React.Fragment>
      )}
      {options.length > 0 && <Typography variant="h6">Options</Typography>}
      {option}
      <TextField
        variant="outlined"
        margin="normal"
        name="point"
        label="Point"
        type="number"
        id="point"
        autoComplete="point"
        value={point}
        onChange={handlePointChange}
        required
        fullWidth
      />
      {tag.length > 0 ? (
        <TextField
          style={{ marginBottom: "0px" }}
          variant="outlined"
          margin="normal"
          onChange={handleTagChange}
          value={tagValue}
          required
          fullWidth
          id="tag"
          label="Tag"
          name="tag"
          autoComplete="tag"
        />
      ) : (
        <TextField
          variant="outlined"
          margin="normal"
          onChange={handleTagChange}
          value={tagValue}
          required
          fullWidth
          id="tag"
          label="Tag"
          name="tag"
          autoComplete="tag"
        />
      )}
      {tag.length > 0 && (
        <div
          style={{
            borderStyle: "solid",
            borderWidth: "1px",
          }}
        >
          {tag.map((eachData, key) => {
            return (
              <MenuItem
                onClick={() => {
                  selectOption(eachData);
                }}
                key={key}
              >
                {eachData}
              </MenuItem>
            );
          })}
        </div>
      )}
      <br />
      <Button variant="contained" type="submit" color="primary">
        Submit
      </Button>
    </form>
  );
}

// type checking for props
BlankFormComponent.propTypes = {
  editQuestion: PropTypes.objectOf(Object),
  handleRedirect: PropTypes.func,
};

// setting default props
BlankFormComponent.defaultProps = {
  editQuestion: {},
  handleRedirect: () => {},
};
export default BlankFormComponent;

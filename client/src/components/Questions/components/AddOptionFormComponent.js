import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, Paper, TextField, Button, Checkbox, FormControlLabel } from '@material-ui/core';

function AddOptionFormComponent(props) {
    const [checked, setChecked] = useState(false);
    const [error, setError] = useState(false);
    const [optionValue, addOption] = useState('');
    const handleChecked = () => {
      setChecked(!checked);
    };
    const handleCancel = () => {
      props.handleCancel();
    };
    const changeOptionValue = (e) => {
      addOption(e.target.value);
    }
    const addOptionForm = () => {
      if (optionValue.length === 0){
        setError(true);
        return;
      }
      const data = {
        description: optionValue,
        correct: props.correct? false:checked
      };
      props.addOptionForm(data);
    }
    return (
      <Paper>
        <Grid container spacing ={0}>
        <Grid item xs={5}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            error={error}
            value={optionValue}
            onChange={changeOptionValue}
            fullWidth
            id="option"
            label="option"
            name="Add option"
            autoComplete="option"
            autoFocus
          />
        </Grid>
        <Grid item xs={3} style={{marginTop:'25px'}}>
          {!props.correct && <FormControlLabel
            control={
              <Checkbox
              checked={checked}
              onChange={handleChecked}
                value="checked"
                color="primary"
              />
            }
            label="Is option correct?"
            labelPlacement="start"
          />}
        </Grid>
        <Grid item xs={2} style={{marginTop:'25px'}}>
          <Button 
            variant="contained"
            color="primary"
            onClick={addOptionForm}
            >
            Add
          </Button>        
        </Grid>
        <Grid item xs={2} style={{marginTop:'25px'}}>
          <Button 
            variant="contained"
            color="primary"
            onClick={handleCancel}
            >
              Cancel
          </Button>        
        </Grid>
        </Grid>
      </Paper>
    );
}

// type checking for props
AddOptionFormComponent.propTypes = {
  addOptionForm: PropTypes.func,
  handleCancel: PropTypes.func
};

// setting default props
AddOptionFormComponent.defaultProps = {
  addOptionForm: ()=>{},
  handleCancel: ()=>{}
};

export default  AddOptionFormComponent;

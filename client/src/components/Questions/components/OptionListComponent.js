import React from 'react';
import { Grid, Typography, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

function OptionListComponent(props) {
    const deleteOption = () => {
     props.deleteOption(props.index);
    }
    return (
          <Grid container spacing={3}>
            <Grid item xs={8}>
                <Typography variant="body1">{props.optionData.description}</Typography>  
            </Grid>
            <Grid item xs={2}>
              <Typography variant="body1">{props.optionData.correct ? 'Correct' : 'Incorrect'}</Typography>
            </Grid>
            <Grid item xs={2}>
              <IconButton aria-label="delete" size="small" onClick={deleteOption}>
                <DeleteIcon fontSize="inherit" />
              </IconButton>
            </Grid>
          </Grid>
    );
};
export default OptionListComponent;

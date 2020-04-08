import React from 'react';
import { Grid, Typography, Paper, Button, Table, TableHead, TableRow,TableCell, TableBody, Container, LinearProgress } from '@material-ui/core';
import axios from 'axios';

class FileUploadComponent extends React.Component {
    state = {
        loading: false,
        error: '',
    };


    onSubmit = (e) => {
        e.preventDefault();
        this.setState({ loading: true, error: '' });
        if(!e.target.fileUpload.files[0]) {
            this.setState({ loading: false, error: 'No File Selected' });     
            return;
        }
        const data = new FormData();
        data.append('file', e.target.fileUpload.files[0],e.target.fileUpload.files[0].name);
        const config = {     
            headers: { 'Content-Type': 'multipart/form-data' }
        }

        axios.post('/api/uploadfile', data, config)
            .then((res) => {
                if(res.data.length) {
                    this.setState({ loading: false, error: res.data });
                } else {
                    this.setState({ loading: false });
                    this.props.fileUpload();
                }
            })
            .catch((err) => {
                this.setState({ loading: false })
            });
    };

    render() {
        return (
        <Grid container spacing={0}>
            <Grid item xs={12}>
                <form onSubmit={this.onSubmit}>
                    <Paper>
                        <Container fixed>
                            <Grid container spacing={0}>
                                <Grid item xs={12}>
                                    &nbsp;
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="h4">File Upload</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                <hr/>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="body1">File Upload functionality can only be implemented for MCQ questions. Use the sample file provided below to edit your csv </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Questions</TableCell>
                                                <TableCell>Options</TableCell>
                                                <TableCell>CorrectOption</TableCell>
                                                <TableCell>Points(Optional</TableCell> 
                                                <TableCell>Tag(Optional)</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell>What is capital of India?</TableCell>
                                                <TableCell>New Delhi/Mumbai/Kolkata/Banagalore</TableCell>
                                                <TableCell>New Delhi</TableCell>
                                                <TableCell>1</TableCell>
                                                <TableCell>General Knowledge</TableCell> 
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </Grid>
                                <Grid item xs={12}>
                                    &nbsp;
                                </Grid>
                                {
                                this.state.loading && 
                                <React.Fragment>
                                    <Grid item xs={12}>
                                        <LinearProgress />
                                    </Grid>
                                    <Grid item xs={12}>
                                        &nbsp;
                                    </Grid>
                                </React.Fragment>
                                }
                                {
                                    this.state.error.length > 0 && 
                                    <React.Fragment>
                                        <Grid item xs={12}>
                                            <Typography variant="body1" color="error">
                                                {this.state.error}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            &nbsp;
                                        </Grid>
                                    </React.Fragment>
                                }
                                <Grid item xs={12}>
                                    <input
                                        type="file"
                                        name="fileUpload"
                                        style={{
                                            borderStyle: 'solid',
                                            borderRadius: '2px',
                                            width: '100%',
                                            borderWidth: '1px'
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary">
                                    Upload
                                    </Button>
                                </Grid>
                                <Grid item xs={12}>
                                    &nbsp;
                                </Grid>
                            </Grid>
                        </Container>
                    </Paper>
                </form>
            </Grid>
        </Grid>
        )
    }
}
export default FileUploadComponent;
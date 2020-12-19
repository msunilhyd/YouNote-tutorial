import React from 'react';
import { Grid, Card } from '@material-ui/core';
import Notepad from './Editor';

const NoteContainer = (props) => {
    return (
        <Grid
            elevation={5}
            component={Card}
            item
            container
            direction='column'
            xs={12}
            md={15}
            style={{padding: '10px', maxHeight: '100%'}}>
            <Grid item xs={12} style={{padding: '10px'}}>
                <NotePad {...props} handleSave={(note) => props.handleSave(note)} />
            </Grid>
        </Grid>
    );
}

export default NoteContainer;
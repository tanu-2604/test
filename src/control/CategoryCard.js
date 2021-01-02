import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Container } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
     marginTop:"45px"
    },
    paper: {
      padding: theme.spacing(1),
      background:"green",
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
}));
function CategoryCard() {
    const classes = useStyles();
    return (
        <>
         <Container className={classes.root}>
         <Grid item xs={4}>
          <Paper className={classes.paper}>item</Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>item</Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>item</Paper>
        </Grid>
         </Container>

        </>
    )
}

export default CategoryCard

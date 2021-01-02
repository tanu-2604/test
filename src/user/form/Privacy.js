import { makeStyles } from '@material-ui/core';
import React from 'react'
import {  Grid, Card} from '@material-ui/core';
import '../style/disclaimer.css'
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme)=>({
    gridContainer: {
      paddingLeft: "20px",
      paddingRight: "20px",
      background:"#fff",
      minHeight:"100vh"
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      },
    
  }));
function Privacy() {
    const classes=useStyles()
    return (
        <div className={classes.gridContainer}>
        <Grid container>
          <Grid item xs>
            
          </Grid>
          <Grid item xs={11} sm={6} md={6} lg={4} className="form-grid" >
                <div justify="center" className={classes.head}>
                   <h3 className="dis">Privacy Policy</h3>
                </div>
                <div className="para-text">
                    <p className="para">If Effective date: November 15, 2020 <br/>
                    <br/>
                    https://testyourbond.site ("us", "we", or "our") operates the https://webestfriends.com/ website (the "Service").
                    <br/>
                    <br/>
                     This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data. 
                     <br/>
                     <br/>
                     We use your data to provide and improve the Service. By using the Service, you agree to the collection and use of information in accordance with this policy. Unless otherwise defined in this Privacy Policy, terms used in this Privacy Policy have the same meanings as in our Terms and Conditions, accessible from https://webestfriends.com/</p>
                </div>
                <div justify="center" className={classes.head}>
                   <h3 className="dis">Information Collection And Use</h3>
                </div>
                <div className="para-text">
                    <p className="para">
                    We collect several different types of information for various purposes to provide and improve our Service to you.
                    </p>
                </div>
                <div justify="center" className={classes.head}>
                   <h3 className="dis">Update</h3>
                </div>
                 <div className="para-text">
                    <p className="para">
                    This site disclaimer was last updated on: Thursday, November 15th, 2018 · Should we update, amend or make any changes to this document, those changes will be prominently posted here
                    </p>
                </div>
                <div className="go-wrapper">
                <Link to="/"><button className="go">Go Back</button></Link>
                </div>
          </Grid>
          <Grid item xs></Grid>
       </Grid>    
    </div>
    )
}

export default Privacy

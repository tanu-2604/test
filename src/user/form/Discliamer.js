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
function Discliamer() {
    const classes=useStyles()
    return (
        <div className={classes.gridContainer}>
        <Grid container>
          <Grid item xs>
            
          </Grid>
          <Grid item xs={11} sm={6} md={6} lg={4} className="form-grid" >
                <div justify="center" className={classes.head}>
                   <h3 className="dis">Disclaimer</h3>
                </div>
                <div className="para-text">
                    <p className="para">If you require any more information or have any questions about our site's disclaimer, please feel free to contact us from https://webestfriends.com/contact.</p>
                </div>
                <div className="para-text">
                    <p className="para">
                All the information on this website is published in good faith and for general information purpose only. https://webestfriends.com/ does not make any warranties about the completeness, reliability and accuracy of this information. Any action you take upon the information you find on this website (https://webestfriends.com/), is strictly at your own risk. https://webestfriends.com/ will not be liable for any losses and/or damages in connection with the use of our website.
                </p>
                </div>
                <div className="para-text">
                    <p className="para">
                    From our website, you can visit other websites by following hyperlinks to such external sites. While we strive to provide only quality links to useful and ethical websites, we have no control over the content and nature of these sites. These links to other websites do not imply a recommendation for all the content found on these sites. Site owners and content may change without notice and may occur before we have the opportunity to remove a link which may have gone 'bad'.
                    </p>
                </div>
                <div className="para-text">
                    <p className="para">
                    If you require any more information or have any questions about our site's disclaimer, please feel free to contact us from https://webestfriends.com/contact.
                    </p>
                </div>
                <div justify="center" className={classes.head}>
                   <h3 className="dis">Consent</h3>
                </div>
                <div className="para-text">
                    <p className="para">
                    By using our website, you hereby consent to our disclaimer and agree to its terms.
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

export default Discliamer

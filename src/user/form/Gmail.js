import React from 'react'
import '../style/form.css'
import {  Grid, Card} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme)=>({
    gridContainer: {
      paddingLeft: "20px",
      paddingRight: "20px",
      background:"#7555D9",
      minHeight:"100vh"
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      },
      link:{
       fontSize:"25px"
      },
     gmail:{
         background:"#fff",
         borderRadius: "35px",
         border: "none",
         fontSize:"22px",
         color:"#012156",
        padding:"0px 20px",
          margin:" -15px",
          textAlign:"center",
          fontFamily:"Baloo Bhai 2",
          fontWeight:"600px"
     },
     link:{
         fontSize:"25px",
         color:"#FFFFFF",
         padding:"0px 20px",
         textAlign:"center",
         fontFamily:"chicle",
         fontWeight:"200px"
     }
  }));
  
function Gmail() {
const classes = useStyles();
return (
<>
<div className={classes.gridContainer}>
<Grid container>
<Grid item xs>
  
</Grid>
<Grid item xs={11} sm={6} md={6} lg={4} >
  
<div justify="center" className={classes.head}>
<h3 className="text1">Contact</h3>
<h4 className={classes.link}>Send any questions, ideas or suggestions</h4>
</div>
  <Card className={classes.gmail}>
    <h4>datingvalue@gmail.com</h4>
    </Card>
  
</Grid>
<Grid item xs>
  
</Grid>

</Grid>
<br/>
<Grid container>
<Grid item xs>
  
</Grid>
<Grid item xs={11} sm={6} md={6} lg={4}>
  
</Grid>
<Grid item xs>
  
</Grid>
</Grid>


</div>

</>
);
}

export default Gmail

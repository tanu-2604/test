import React, { useState, useEffect } from 'react';
import '../style/score.css';
import '../style/quizscore.css';
import {  Grid, Card} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ReactSpeedometer from "react-d3-speedometer";
import { Link } from 'react-router-dom';
import Footer from '../footer/Footer';




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
      tagimage:{
        maxHeight:"238px",
        width:"100%",
        margin:"0 auto",
        padding:"15px"
    },
    buttongrid:{
        marginTop:"20px"
    }
    
    
  }));
  
function QuizScore(props) {
    var mylevel=props.location.state.score.score.value;
    var question=props.location.state.quizLength.maxSteps;
    const name=props.location.state.name.name;
    const allresult=props.location.state.resultData.allResult;
    console.log(allresult)
    const classes = useStyles();
    return (
    <>
    <div className={classes.gridContainer}>
    <Grid container>
            <Grid item xs></Grid>
            <Grid item xs={11} sm={6} md={4} lg={3} >
                <Card className="player-list">
                    <Grid container justify="center">
    <span className="pname"  >{name}</span>
                </Grid>
                </Card>
            </Grid>
           <Grid item xs></Grid>
       </Grid>
    <Grid container>
       <Grid item xs></Grid>
      <Grid item xs={11} sm={6} md={4} lg={3} >
          <Card className="score-card">
    <span className="tagline">{allresult[0].title}</span>
            <Grid container justify="center">  
                <ReactSpeedometer
                    maxValue={20}
                    value={allresult[0].needle}
                    minValue={0}
                    className="speedometer"
                    segments={4}
                    ringWidth={60}
                    needleHeightRatio={.5}
                    needleTransition={"easeBackInOut"}
                    segmentColors={["#fff"," #fff"," #fff"," #fff"]}
                    needleColor={"#707070"}
                    customSegmentLabels={[
                      {
                        text: "😡",
                        position: "INSIDE",
                        color:"#fff",
                        fontSize:"35px",
                        
                      
                        
                      },
                      {
                        text: "😐",
                        position: "INSIDE",
                        color: "#fff",
                        fontSize:"35px",
                        
                      },
                      
                      {
                        text: "😊",
                        position: "INSIDE",
                        color: "#fff",
                        fontSize:"35px",
                      
                      },
                      {
                        text: "😍",
                        position: "INSIDE",
                        color:"#fff",
                        fontSize:"35px",
                      
                        
                      },
                    ]}
                /> 
             </Grid>
        </Card>

    </Grid>
    <Grid item xs></Grid>
</Grid>
    <br/>

    <Grid container>
        <Grid item xs></Grid>
        <Grid item xs={11} sm={6} md={6} lg={3} className={classes.imageBg}>
        <Card className="tagimg-card">
        <Grid container justify="center">
        <h4 className="score-value">Your Score:{mylevel}/{question}</h4>
             </Grid>
        <Grid container justify="center">
             <img className={classes.tagimage} src={`https://app-admin.webestfriends.com/uploads/${allresult[0].resultImage}`}/>
             </Grid>
             <Grid container justify="center">
             <h4 className="score-value">{allresult[0].phrase}</h4>
             </Grid>
             </Card>
         </Grid>
        <Grid item xs></Grid>
    </Grid>
    <Grid container className={classes.buttongrid}>
        <Grid item xs></Grid>
        <Grid item xs={11} sm={6} md={6} lg={3}>
        <Grid container  justify="center">
        <Link to="/quizcategory"><button className="copy">Play More Quiz</button></Link>  
            <Link to="/"><button className="copy">Create Your Quiz</button></Link>
            </Grid>  
             </Grid>
        <Grid item xs></Grid>
    </Grid>
    <Footer/>
    </div>
    
    </>
);
}

export default QuizScore

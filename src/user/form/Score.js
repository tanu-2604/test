import React, { useState, useEffect } from 'react';
import '../style/score.css';
import {  Grid, Card} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ReactSpeedometer from "react-d3-speedometer";
import { Link } from 'react-router-dom';
import Footer from '../footer/Footer';
import services from '../../services/services';



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
    
  }));
  
function Score(props) {
  
  const category=props.location.state.category.category;
    var datalist=JSON.parse(localStorage.getItem('alldata'));
    var list=datalist['list'];
    var score=datalist.score.score;
    var createdBy=datalist['createdBy'];
    const [title,setTitle]=useState({})
  const feedbackBy=(localStorage.getItem('feedbackby'))
  useEffect(() => {
    getCategory();
}, [])

const  getCategory = async () => {
 const categoryData={
     categoryId:category
 }

 const options = {
     method: 'POST',
     headers: {
         "Apiuserid": "49507884",
         "Scope": "In.QuizApp.READ",   
     }
 }
 const result = await services.getCategory(categoryData,options)
 setTitle(result.data.data)
};
     var value=((score/list)*100);
  if(value >= 81 && value <=100)
  {
    var text="Best Friend"  
  }
  else if(value >= 61 && value <=80)
  {
     text="Good Friend"
  }
  else if(value >= 41 && value <=60)
  {
     text ="Average Friend"
  }
  else if(value >= 21 && value <=40)
  {
     text="Bad Friend"
  }
  else{
     text ="Very Bad Friend"
  }

  const classes = useStyles();
    return (
    <>
    <div className={classes.gridContainer}>
    <Grid container>
       <Grid item xs></Grid>
      <Grid item xs={11} sm={6} md={6} lg={4} >
          <div justify="center" className={classes.head}>
              <h3 className="title" key={title.title} >{title.title}</h3>
          </div>
          <Card className="score-card">
               <h3 className="how">Your Score:{score}/{list}</h3>
            <Grid container justify="center">  
                <ReactSpeedometer
                    maxValue={list}
                    value={score}
                    minValue={0}
                    className="speedometer"
                    segments={5}
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
                        text: "😞",
                        position: "INSIDE",
                        color: "#fff",
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
             <Grid container justify="center">
             <h4 className="score-value">{text}</h4>
             </Grid>
            <Link to="/"><button className="copy">Create Your Quiz</button></Link> 
            <Link to="/quizcategory"><button className="copy">Play More Quiz</button></Link>  
              <div className="sharelink">
                <h3 className="knows">Who knows {createdBy} best:</h3>
              </div>
                              <Grid container justify="center">                   
                                    <table className="table-data sharetable">
                                        <thead>
                                        <tr>
                                            <th className="shareth">Name</th>
                                            <th className="shareth" >Score</th>
                                        </tr>
                                        </thead>
                                       <tbody>
                                       <tr>
                  <td className="sharetd">{feedbackBy}</td>
                  <td className="sharetd">{score}</td>
                                        </tr>
                                       </tbody>
                                    </table>                   
                              </Grid>              
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
    <Footer/>
    </div>
    
    </>
);
}

export default Score

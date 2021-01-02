import React,{useState,useEffect} from 'react'
import {Grid,Card, CardContent} from '@material-ui/core';
import { makeStyles,withStyles } from '@material-ui/core/styles';
import '../style/playquiz.css'
import LinearProgress from '@material-ui/core/LinearProgress';
import services from '../../services/services';
import { Redirect } from 'react-router-dom';
import Footer from '../footer/Footer';
import { Helmet } from 'react-helmet';

const BorderLinearProgress = withStyles((theme) => ({
    root: {
      height: 10,
      borderRadius: 5,
      width:"100%",
    },
    colorPrimary: {
      backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
    },
    bar: {
      borderRadius: 5,
      backgroundColor: '#FFDD52',
    },
  }))(LinearProgress);
  
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
      pro:{
          textAlign:"center"
      }
    
  }));
function PlayQuiz({quizlist,quizId,createdBy,category}) {

 const[score,setScore]=useState(0)
 const [activeStep, setActiveStep] = React.useState(0);
 const [meter,setMeter]=useState(false);
 const [correctAns,setCorrectAns]= useState(0);
 const [clickedAns,setClickedAns]= useState(0);
 const [progress,setProgress]=useState(false);
 const [count,setCount]=useState(1);
 const json =localStorage.getItem("feedbackby")
 const [title,setTitle]=useState({})
 

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
 const result = await services. getCategory(categoryData,options)
 setTitle(result.data.data)
};
  let quiz = [
    {
        label: quizlist?.question,
        options: quizlist?.options,
    },
];

    const classes = useStyles();
    if (quizlist?.length) {
      quiz = quizlist;
    }
    
    function showProgress(index) {

      var increment = Math.ceil((count) / (maxSteps) * 100);
      setProgress(increment)
      
    }
    const maxSteps = quiz.length;
    const handleSelect = (optId,label)=>{
       setClickedAns(optId)
       if(optId===quiz[activeStep].answerId){
            increaseScore();
           setCorrectAns(quiz[activeStep].answerId)
       }
       else{
         setCorrectAns(quiz[activeStep].answerId)
       }
     
    }


const handleNext = (optId,label)=>{

  if(maxSteps-1 !==activeStep){
    setTimeout(()=>{setActiveStep(prevActiveStep => prevActiveStep + 1)
      setCount(count+1)},500)
    
   
  }
  else{
   
     handleSubmit()
  }
  handleSelect(optId,label);

  showProgress(quiz[activeStep].qusId);
}
const increaseScore = ()=>{
  setScore(score+1)
}
const handleSubmit = async() =>{
    const data={
      quizId:quizId,
      feedbackBy:json,
      score:score
    }
    const options = {
      method: 'POST',
      headers: {
        "Apiuserid": "49507884",
        "Scope": "In.QuizApp.INSERT",
      }
    }
    const result = await services.getResult(data, options)
     setMeter(result.data.data)
}
if(meter===true)
{
  var datalist={list:quizlist.length,quizId:quizId,createdBy:createdBy,score:{score}}
  localStorage.setItem('alldata',JSON.stringify(datalist))
  return(<Redirect to={{
    pathname: '/score',
    state:{category:{category}}}} push={true} />)

}
    return (
        <div className={classes.gridContainer}>
          <Helmet>
  <title>{title.title}</title>
      </Helmet>
        <Grid container>
           <Grid item xs></Grid>
            <Grid item xs={11} sm={6} md={6} lg={4} >
                 <div justify="center">
                     <h3 className="title">{title.title}</h3>
                   
                 </div>
                 <div justify="center">     
                     <h4 className="question">Question <span>{count}/{maxSteps}</span></h4>
                 </div>
                 <div justify="center">
                    <BorderLinearProgress variant="determinate" value={progress} />
                 </div>
                 <Card className="playoptioncard">
                <h3 className="questionname">{quiz[activeStep].title}</h3>
                   <div className="playcard">
                    {
                    quiz[activeStep]?.options?.map((options,index)=>{

                    return(
                        <Grid
                      container
                      className= {
                        correctAns === options.optionId ?
                        'correctplay' : 
                      clickedAns === options.optionId?
                      'incorrectplay' : 'options'}
                      correct={quiz[activeStep].answer}
                      key={index}
                      onClick={()=>{handleNext(options.optionId,options.optionLabel)}}
                      >
                      <Grid item xs={4} sm={4} md={4}lg={4} className="img-div">
                      {options.optionImg.length
                                ?<img className="playImg" 
                                  src={options.optionImg}/>
                                :<span></span>
                              }
                      </Grid> 
                      <Grid item xs={8} sm={8} md={8}lg={8} className="card-div">
                        <CardContent className="playcontent">
                          <h3 className="play-head"id="cardText">
                        {options.optionLabel}
                          </h3>
                        </CardContent>
                      </Grid>
                      </Grid>
                    )

                    })
                    } 
                </div>
         </Card>
            </Grid>
            <Grid item xs></Grid>
       </Grid>
       <Footer/>
  </div>
    )
}

export default PlayQuiz

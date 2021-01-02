import React, { useState, useEffect} from 'react'
import { Grid, Card, CardContent } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import '../style/questionlist.css'
import LinearProgress from '@material-ui/core/LinearProgress';
import services from '../../services/services';
import { Redirect } from 'react-router-dom';
import Footer from '../footer/Footer';
import { withCookies, Cookies, useCookies } from 'react-cookie';
import { Helmet } from 'react-helmet';

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 10,
    borderRadius: 5,
    width: "100%",
  },
  colorPrimary: {
    backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: '#FFDD52',
  },
}))(LinearProgress);

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    paddingLeft: "20px",
    paddingRight: "20px",
    background: "#7555D9",
    minHeight: "100vh"
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  pro: {
    textAlign: "center"
  }

}));
function QuestionList({ questionlist,limit }) {
  const classes = useStyles();
  const [title, setTitle] = useState({})
  const [stateCount, setStateCount] = React.useState([])
  let [activeStep, setActiveStep] = React.useState(0);
 let [answerList, setAnswerList] = React.useState([]);
  const [createQuiz, setCreateQuiz] = useState();
  const [result, setResult] = useState(false);
  const [progress, setProgress] = useState(0);
  const [count, setCount] = useState(1);
  const [clickedAns, setClickedAns] = useState(0);
  const [cookies, setCookie] = useCookies(['createId']);
  var dummyArr = []

  const data = JSON.parse(localStorage.getItem('userInfo'));
  const createdBy = data['name'];
  const cookie = new Cookies();
 
  var categoryId
  if(localStorage.getItem("categoryId"))
  {
   categoryId = JSON.parse(localStorage.getItem("categoryId"));
 
  }
  else{
      categoryId=JSON.parse(cookie.get('categoryId'));
     
  }

  

  useEffect(() => {
    const index = questionlist.map((value, index) => index);
    setStateCount(index)
    getCategory();
  }, [])

  const getCategory = async () => {
    const categoryData = {
      categoryId: categoryId
    }
    const options = {
      method: 'POST',
      headers: {
        "Apiuserid": "49507884",
        "Scope": "In.QuizApp.READ",
      }
    }
    const result = await services.getCategory(categoryData, options)
    setTitle(result.data.data)
    
  };
  let tutorialSteps = [
    {
      label: questionlist?.question,
      options: questionlist?.optionsArray,
      status:questionlist?.questionStatus
    },
  ];
  if (questionlist?.length) {
    tutorialSteps = questionlist;
  }
  function showProgress(index) {
    var increment = Math.ceil((count) / (limit) * 100);
    setProgress(increment)
  }

  const handleNext = (id, label) => {

    const qusId = questionlist[activeStep]?.qusId;
    const answer = label;
    const answerId = id;
    setClickedAns(id)
    setAnswerList(
      [...answerList, { qusId: qusId, answer: answer, answerId: answerId }]
    )
    if (limit > answerList.length + 1) {
      setTimeout(()=>{
        stateCount.shift();
      activeStep = stateCount[0];
      setActiveStep(stateCount[0]);
      setCount(count + 1)
      },500)
   
    }
    else {
      setTimeout(() => {
        handleSubmit([...answerList, { qusId: qusId, answer: answer, answerId: answerId }])
      }, 500)
    }
    showProgress(tutorialSteps[activeStep].qusId);
  }

  const handleSkip = (steps) => {
    stateCount.push(steps);
    stateCount.shift();
    activeStep = stateCount[0];
    setActiveStep(stateCount[0]);

  };

  const handleSubmit = async ([...answerList]) => {
    const list = {
      categoryId: categoryId,
      createdBy: createdBy,
      quizQuestions: answerList
    }

    const options = {
      method: 'POST',
      headers: {
        "Apiuserid": "49507884",
        "Scope": "In.QuizApp.INSERT",
      }
    }
    const result = await services.createQuestionQuiz(list, options)
    setCreateQuiz(result.data.data.quizId)
    setResult(true)
    if (result.data.code === 200) {
      setResult(true)
    }
  };

  if (localStorage.getItem("createId") == null||localStorage.getItem("createId") == []) {
    localStorage.setItem("createId", JSON.stringify(dummyArr))
    setCookie("createId", dummyArr)
  }
  else {
    dummyArr = JSON.parse(localStorage.getItem("createId"));
    dummyArr.push(createQuiz)
  
  }
  if (result) {
    localStorage.setItem("createId", JSON.stringify(dummyArr))

    return (<Redirect to={{ pathname: "/sharelink", state: { quizId: createQuiz } }} push={true} />)
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
            <h4 className="question">Question <span>{count}/{limit}</span></h4>
          </div>
          <div justify="center">
            <BorderLinearProgress variant="determinate" value={progress} />
          </div>
{
      
   <Card className="questioncard">

  <h3 className="questionname">{tutorialSteps[activeStep]?.question}</h3>
  <div className="optioncard">
    {
      tutorialSteps[activeStep]?.optionsArray?.map((options, index) => {
       
        return (
          <>
           {options.optionImg.length ?
            <Grid container className={ clickedAns === options.optionId ? 'clickoption' :  'nonclickoption'} onClick={() => { handleNext(options.optionId, options.optionLabel) }} key={index}id="cardbox">
              <Grid item xs={4} sm={4} md={4} lg={4} className="image-div" >
              <img className="optionImg" src={options.optionImg} /> 
              </Grid>
              <Grid item xs={8} sm={8} md={8} lg={8} className="optionbg" >
                <CardContent className="cardcontent">
                  <h3 className="optioncontent" id="cardText">
                    {options.optionLabel}
                  </h3>
                </CardContent>
              </Grid>
           </Grid>
         : 
         <Grid justify="center" container className="new">
            <Grid item xs={8} sm={8} md={8} lg={8} className={
            clickedAns === options.optionId ?'newclickoption' : 'newnonclickoption'} onClick={() => { handleNext(options.optionId, options.optionLabel) }} key={index} id="cardbox">
                <CardContent className="newcontent">
                  <h3 className="optioncontent" id="cardText">
                    {options.optionLabel}
                  </h3>
                </CardContent>
            </Grid>
         </Grid>
         }
      </>
        )
      })
    }
  </div>
  <div className="start-wrapper">
    <button className="skip" onClick={() => { limit > answerList.length + 1 ? handleSkip(activeStep) : handleSubmit() }}>Skip the Question</button>
  </div>
</Card>
}
        </Grid>
        <Grid item xs></Grid>
      </Grid>
      <Footer />
    </div>
  )
}

export default QuestionList;

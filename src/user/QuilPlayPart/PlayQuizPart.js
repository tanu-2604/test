import React, { useState, useEffect } from 'react'
import { Grid, Card, CardContent } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
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
function PlayQuizPart({ quizdata, que }) {
  let [score, setScore] = useState({ value: 0 })
  const [activeStep, setActiveStep] = React.useState(0);
  const [meter, setMeter] = useState(false);
  const [allResult, setAllResult] = useState([]);
  const [correctAns, setCorrectAns] = useState(0);
  const [clickedAns, setClickedAns] = useState(0);
  const [progress, setProgress] = useState(0);
  const [count, setCount] = useState(1);
  let [answerList, setAnswerList] = React.useState([]);
  const data = JSON.parse(localStorage.getItem('userInfo'));
  const name = data['name'];


  let quiz = [
    {
      label: que?.question,
      options: que?.options,
      answer: que?.answer
    },
  ];

  const classes = useStyles();
  if (que?.length) {
    quiz = que;
  }

  function showProgress(index) {

    var increment = Math.ceil((count) / (maxSteps) * 100);
    setProgress(increment)

  }
  const maxSteps = quiz.length;
  const handleSelect = (label) => {
    setClickedAns(label)
    if (label === quiz[activeStep].answer) {
      score = { value: ++score.value };
      setCorrectAns(quiz[activeStep].answer)
      setAnswerList([
        ...
        answerList,
        {
          qusId: count,
          answer: label,
          correct: "yes"
        }
      ])
    }
    else {
      setCorrectAns(quiz[activeStep].answer)
      setAnswerList([
        ...
        answerList,
        {
          qusId: count,
          answer: label,
          correct: "no"
        }
      ])
    }

  }
  const handleNext = (label) => {
    if (maxSteps - 1 != activeStep) {
      handleSelect(label);
      setTimeout(() => {
        setActiveStep(prevActiveStep => prevActiveStep + 1)
        setCount(count + 1)
      }, 300)
      handleSelect(label);
    }
    else {
      handleSelect(label);
      setTimeout(() => {
        handleSubmit([...answerList, {
          qusId: count,
          answer: label,
          correct: "yes"
        }])
      }, 500)

    }
    showProgress(quiz[activeStep].qusId);
  }

  const handleSubmit = async ([...answerList]) => {
    const data = {
      quizId: quizdata[0].adminQuizId,
      score: score.value,
      playerName: name,
      answers: answerList
    }
    const options = {
      method: 'POST',
      headers: {
        "Apiuserid": "49507884",
        "Scope": "In.QuizApp.INSERT",
      }
    }
    const result = await services.saveAnswer(data, options)
    setAllResult(result.data.data)
    setMeter(result.data.code)

  }
  if (meter === 200) {
    return (<Redirect to={{
      pathname: '/quizscore', state: { quizLength: { maxSteps }, score: { score }, name: { name }, resultData: { allResult } }
    }} push={true}
    />
    )

  }
  return (
    <div className={classes.gridContainer}>
      <Grid container>
  <Helmet><title>{quizdata[0].title}</title></Helmet>
        <Grid item xs></Grid>
        <Grid item xs={11} sm={6} md={6} lg={4} >
          <div justify="center">
            <h3 className="title">{quizdata[0].title}</h3>
           </div>
          <div justify="center">
            <h4 className="question">Question <span>{count}/{maxSteps}</span></h4>
          </div>
          <div justify="center">
            <BorderLinearProgress variant="determinate" value={progress} />
          </div>
          <Card className="playoptioncard">
            <h3 className="questionname">{quiz[activeStep].questionTitle}</h3>
            <div className="playcard">
              {
                quiz[activeStep]?.optionsArray?.map((options, index) => {

                  return (
                    <div key={index}>
                      {options.optionImg.length ?
                        <Grid
                          container
                          className={
                            correctAns === options.optionLabel ?
                              'correctplay' :
                              clickedAns === options.optionLabel ?
                                'incorrectplay' : 'options'}
                          correct={quiz[activeStep].answer}
                          onClick={() => { handleNext(options.optionLabel) }}
                          key={index}
                          id="cardbox">


                          <Grid item xs={4} sm={4} md={4} lg={4} className="image-div" >
                            <img className="optionImg" src={`${quizdata[0].image_base_path}/${options.optionImg}`} />
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
                          <Grid item xs={10} sm={10} md={10} lg={10}
                            className={
                              correctAns === options.optionLabel ?
                                'correctplay' :
                                clickedAns === options.optionLabel ?
                                  'incorrectplay' : 'options'}
                            correct={quiz[activeStep].answer}
                            onClick={() => { handleNext(options.optionLabel) }}
                            key={index}
                            id="cardbox">
                             <CardContent className="newcontent">
                              <h3 className="optioncontent" id="cardText">
                                {options.optionLabel}
                              </h3>
                            </CardContent>

                          </Grid>
                        </Grid>
                      }</div>

                  )

                })
              }
            </div>
          </Card>
        </Grid>
        <Grid item xs></Grid>
      </Grid>
      <Footer />
    </div>
  )
}

export default PlayQuizPart

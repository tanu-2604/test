import { Card, CardContent, FormControl, Grid, makeStyles, MenuItem, Select } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import "./createQuiz.css"
import AdminLink from '../management/AdminLinks';
import { Redirect, useParams } from 'react-router-dom';
import services from '../../services/services';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  gridContainer: {
    paddingTop: "20px",
    minHeight: "100vh"
  },
  paper: {
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  headPart: {
    backgroundColor: "#133b5c",
    color: "#ffff"
  },
  icon: {
    color: "#fff"
  },
  categorytitle: {
    color: "#133b5c",
    fontSize: "35px",
    fontWeight: "600",
    textAlign: "center"
  },
  heading: {
    fontSize: theme.typography.pxToRem(20),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

function EditQuiz() {
  const classes = useStyles();
  const { id } = useParams();
  const [question, setQuestion] = useState(
    [
      {
        questionTitle: '',
        priority: 1,
        answer: "",
        optionsArray: [
          { optionLabel: "", optionImg: "" },
          { optionLabel: "", optionImg: "" }
        ]
      },
    ]
  )
  const [resultdata, setResultData] = useState(
    [
      {
        maxScore: '',
        minScore: "",
        title: "",
        phrase: "",
        needle: "",
        resultImage: ""
      }
    ]
  )

  const [quiz, setQuiz] = useState([])
  const [load, setLoad] = useState(false)
  const [image, setImage] = useState('')
  const data = JSON.parse(localStorage.getItem('friend'));
  const jwt = data['jwt'];
  useEffect(() => {
    getQuizBySlug();
  }, [])

  const getQuizBySlug = async () => {
    const data = {
      quizSlug: id
    }
    const options = {
      method: 'Post',
      headers: {
        "Apiuserid": "49507884",
        "Scope": "In.QuizApp.READ",
        "Authorization": `quizApp-oauthtoken ${jwt}`,
      }
    }
    const result = await services.getQuizBySlug(data, options)
    console.log(result.data.data)
    setQuiz(result.data.data)
    setQuestion(JSON.parse(result.data.data[0].questionData))
    setResultData(JSON.parse(result.data.data[0].resultData))
  };
  const addQuestion = () => {
    setQuestion([
      ...question,
      {
        questionTitle: '',
        priority: 1,
        answer: "",
        optionsArray: [
          { optionLabel: "", optionImg: "" },
          { optionLabel: "", optionImg: "" }
        ]
      },
    ])
  }

  const removeQuestion = (index) => {
    const list = [...question]
    list.splice(index, 1);
    setQuestion(list);
  }
  const addresult = () => {
    setResultData([
      ...resultdata,
      {
        maxScore: '',
        minScore: "",
        title: "",
        phrase: "",
        needle: "",
        resultImage: ""
      }
    ])
  }

  const removeresult = (index) => {
    const listdata = [...resultdata]
    listdata.splice(index, 1);
    setResultData(listdata);
  }
  const addOption = (questionIndex) => {
    const options = question[questionIndex];
    options.optionsArray.push({ optionLabel: "", optionImg: "" });
    const previous = question.slice(0, questionIndex);
    const current = [options];
    const next = question.slice(questionIndex + 1, question?.length);
    setQuestion([
      ...previous,
      ...current,
      ...next
    ]);
  }
  const removeOption = (questionIndex, answerIndex) => {
    const options = question[questionIndex];
    const newArray = options.optionsArray.filter((value, index) => index !== answerIndex);
    const previous = question.slice(0, questionIndex);
    const current = [{ ...options, optionsArray: [...newArray] }];
    const next = question.slice(questionIndex + 1, question?.length);
    setQuestion([
      ...previous,
      ...current,
      ...next
    ]);
  }
  const handleOption = (questionIndex, index, event) => {
    const values = [...question];

    values[questionIndex].optionsArray[index].optionLabel = event.target.value;
    setQuestion(values);
  }
  const handleQuestion = (index, event) => {

    const values = [...question];

    values[index].questionTitle = event.target.value;
    setQuestion(values);

  }
  const radioclick = (questionIndex, index, event) => {
    const values = [...question];
    var clicked = values[questionIndex].optionsArray[index].optionLabel
    values[questionIndex].answer = clicked
    setQuestion(values);
  }
  const handleImage = async (event) => {
    var output = document.getElementById('output');
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function () {
      URL.revokeObjectURL(output.src) // free memory
    }
    var imgpath = event.target.files[0]
    const data = imgpath.name;
    console.log(data)
    const currentTime = new Date();
    const time = currentTime.getTime();
    const ext = data.split('.')
    console.log(ext[0], ext[1])
    var file_path = ext[0] + time + '.' + ext[1];
    var myimg = data.replace(data, file_path)
    var img = new FormData()
    img.append("bannerImg", imgpath)
    img.append("newName", myimg)
    const options = {
      method: 'POST',
      headers: {
        "Apiuserid": "49507884",
        "Scope": "In.QuizApp.INSERT",
        'Content-Type': 'multipart/form-data',
        "Authorization": `quizApp-oauthtoken ${jwt}`,
      }
    }
    const result = await services.bannerImage(img, options);
    setImage(result.data.message)
  }

  const optionImage = async (questionIndex, index, event) => {
    // var imageOpt = document.getElementById('imageOpt');
    // imageOpt.src = URL.createObjectURL(event.target.files[0]);
    // imageOpt.onload = function () {
    // URL.revokeObjectURL(imageOpt.src) // free memory
    //  }
    const values = [...question];
    var imgpath = event.target.files[0]
    const data = imgpath.name;
    const currentTime = new Date();
    const time = currentTime.getTime();
    const ext = data.split('.')
    var file_path = questionIndex + '_' + index + '_' + ext[0] + time + '.' + ext[1];
    var myimg = data.replace(data, file_path)
    var img = new FormData()
    img.append("optionImg", imgpath);
    img.append("newName", myimg)
    const options = {
      method: 'POST',
      headers: {
        "Apiuserid": "49507884",
        "Scope": "In.QuizApp.INSERT",
        'Content-Type': 'multipart/form-data',
        "Authorization": `quizApp-oauthtoken ${jwt}`,
      }
    }
    const result = await services.getImage(img, options);
    values[questionIndex].optionsArray[index].optionImg = file_path;
    setQuestion(values);
  }
  const handleMax = (index, event) => {
    if (event.target.value === "") {
      alert("Please enter Maxscore");
      return true;
    }
    else {
      const resultValue = [...resultdata];
      resultValue[index].maxScore = event.target.value;
      setResultData(resultValue);

    }
  }
  const handleMin = (index, event) => {
    if (event.target.value === "") {
      alert("Please enter Min score");
      return true;
    }
    else {
      const resultValue = [...resultdata];
      resultValue[index].minScore = event.target.value;
      setResultData(resultValue);

    }


  }
  const handleTitle = (index, event) => {
    if (event.target.value === "") {
      alert("Please enter title");
      return true;
    }
    else {
      const resultValue = [...resultdata];
      resultValue[index].title = event.target.value;
      setResultData(resultValue);

    }

  }
  const handlephrases = (index, event) => {
    const resultValue = [...resultdata];
    resultValue[index].phrase = event.target.value;
    setResultData(resultValue);

  }
  const handleneedle = (index, event) => {
    if (event.target.value === "") {
      alert("Please Choose needle value");
      return true;
    }
    else {
      const resultValue = [...resultdata];
      resultValue[index].needle = event.target.value;
      setResultData(resultValue);
    }

  }
  const handleResultImage = async (event, resindex) => {
    const resultValue = [...resultdata];
    var resultimg = event.target.files[0]
    const data = resultimg.name;
    const currentTime = new Date();
    const time = currentTime.getTime();
    const ext = data.split('.')
    var result_path = resindex + '_' + ext[0] + time + '.' + ext[1];
    var myimg = data.replace(data, result_path)
    var resultimage = new FormData()
    resultimage.append("resultImage", resultimg);
    resultimage.append("newName", myimg)
    const options = {
      method: 'POST',
      headers: {
        "Apiuserid": "49507884",
        "Scope": "In.QuizApp.INSERT",
        'Content-Type': 'multipart/form-data',
        "Authorization": `quizApp-oauthtoken ${jwt}`,
      }
    }
    const result = await services.getImage(resultimage, options);
    console.log(result)
    resultValue[resindex].resultImage = result_path;
    setResultData(resultValue);
  }
  const updateList = async () => {
    var quizId = document.getElementById("quizId").value
    var title = document.getElementById("title").value
    var slug = document.getElementById("slug").value
    var language = document.getElementById("language").value

    var fileUpload = {
      quizId: quizId,
      quizTitle: title,
      quizSlug: slug,
      language: language,
      bannerImage: image,
      questionsArray: question,
      resultdata: resultdata

    }
    const options = {
      method: 'POST',
      headers: {
        "Apiuserid": "49507884",
        "Scope": "In.QuizApp.INSERT",
        'Content-Type': 'multipart/form-data',
        "Authorization": `quizApp-oauthtoken ${jwt}`,
      }
    }
    const result = await services.updateQuiz(fileUpload, options)
    if (result.data.code === 200) {
      setLoad(true)
    }
  }
  if (load) {
    return (<Redirect to="/quizlist" push={true} />)
  }
  return (
    <div className={classes.root}>
      <AdminLink />
      {
        quiz?.map((list, index) => {
          return (
            <Grid container className="detailView">
              <Grid container>
                <input type="hidden" id="quizId" defaultValue={list.adminQuizId} />
                <Grid item xs></Grid>
                <Grid item xs={11} sm={6} md={6} lg={4} >
                  <div className="createnumber">
                    <h3>Title</h3>
                  </div>
                  <Card className="create-list">
                    <Grid
                      container
                      justify="center"
                    >
                      <input type="text" id="title" className="title-text"
                        name="title"
                        defaultValue={list.title}
                        placeholder="Title"
                      />
                    </Grid>
                  </Card>
                </Grid>
                <Grid item xs></Grid>
              </Grid>
              <Grid container>
                <Grid item xs></Grid>
                <Grid item xs={11} sm={6} md={6} lg={4} >
                  <div className="createnumber">
                    <h3>Slug</h3>
                  </div>
                  <Card className="create-list">
                    <Grid
                      container
                      justify="center"
                    >
                      <input type="text" id="slug" className="title-text"
                        name="slug"
                        defaultValue={list.slug}
                        placeholder="Slug"
                      />
                    </Grid>
                  </Card>
                </Grid>
                <Grid item xs></Grid>
              </Grid>
              <Grid container>
                <Grid item xs></Grid>
                <Grid item xs={11} sm={6} md={6} lg={4} >
                  <div className="createnumber">
                    <h3>language</h3>
                  </div>
                  <Card className="create-list">
                    <Grid
                      container
                      justify="center"
                    >
                      <FormControl className={classes.formControl} fullWidth  >
                        <select label="Category" id="language" value={list.language} className="title-text" >
                          {/* <MenuItem value="">select Language</MenuItem>      */}
                          <option value={list.language}>{list.language}</option>
                        </select>
                      </FormControl>
                    </Grid>
                  </Card>
                </Grid>
                <Grid item xs></Grid>
              </Grid>
              <Grid container>
                <Grid item xs></Grid>
                <Grid item xs={11} sm={6} md={6} lg={4} >
                  <div className="createnumber">
                    <h3>upload</h3>
                  </div>
                  <Card className="create-list">
                    <Grid
                      container
                      justify="center"
                    >
                      {
                        list.bannerImage != "" ?
                          <div className="img-holder">
                            <img id="output" className="img" src={`${list.image_base_path}/${list.bannerImage}`} />
                          </div>
                          :
                          <div className="img-holder">
                            <img id="output" className="img" />
                          </div>
                      }
                      <input type="file" accept="image/*" id="input" name="input" onChange={event => handleImage(event)} />
                      <div className="create-label">
                        <label className="create-img" htmlFor="input">
                          <span>  Choose your Photo</span>
                        </label>
                      </div>
                    </Grid>
                  </Card>
                </Grid>
                <Grid item xs></Grid>
              </Grid>
              {
                question.map((que, index) => (
                  <Grid container>
                    <Grid item xs></Grid>
                    <Grid item xs={11} sm={6} md={6} lg={4} className="card">
                      <div className="createnumber">
                        <h3>Question</h3>
                      </div>
                      <div className="createnumber1">
                        {question.length > 1 && <button className="delete" onClick={() => removeQuestion(index)}>X</button>}
                      </div>
                      <Card className="create-list">
                        <Grid
                          container
                          justify="center"
                        >
                          <input type="text" id="question" defaultValue={que.questionTitle} className="que-text"
                            name="question"
                            placeholder="Enter Question"
                            onChange={event => handleQuestion(index, event)}
                          />
                        </Grid>
                        {que.optionsArray.map((option, optIndex) => (
                          <>
                            <div className="answerContainer">
                            {que.answer?.length &&
                            
                              que.answer === option.optionLabel ? <input type="radio" name={`option_${index}`} defaultChecked={que.answer} /> : <input type="radio" name={`option_${index}`} onClick={event => radioclick(index, optIndex, event)} />
                            
                            
                            }
                              
                              {option.optionImg?.length ?
                                <Grid
                                  container
                                  className="viewOption"
                                  key={optIndex}
                                  id="cardbox">
                                  <Grid item xs={4} sm={4} md={4} lg={4} className="div-image" >
                                    <img className="view-img" src={`${list.image_base_path}/${option.optionImg}`} />
                                  </Grid>
                                  <Grid item xs={8} sm={8} md={8} lg={8} className="viewbg" >
                                    <CardContent className="view-card">
                                      <input className="create-option" placeholder="Answer" defaultValue={option.optionLabel} onChange={event => handleOption(index, optIndex, event)} />
                                    </CardContent>
                                  </Grid>
                                </Grid>
                                :

                                <Grid
                                  container
                                  className="viewOption"
                                  key={index}
                                  id="cardbox">
                                  <Grid item xs={12} sm={12} md={12} lg={12} className="viewbg" >
                                    <CardContent className="view-card">
                                      <input className="create-option" placeholder="Answer" defaultValue={option.optionLabel} onChange={event => handleOption(index, optIndex, event)} />
                                    </CardContent>
                                  </Grid>
                                </Grid>
                              }
                              <div className="quizwrapper">
                                <div className="quizfile-upload2">
                                  <input type="file" className="quizoption2"
                                    onChange={event => optionImage(index, optIndex, event)}
                                  />
                                  <img src="/assets/image/option.png" height="40px" />
                                </div>
                              </div>
                              {optIndex > 1 && <button className="delete" onClick={() => removeOption(index, optIndex)}>X</button>}
                            </div>
                          </>
                        ))}
                        <div className="create-label">
                          {
                            <button className="addoption" onClick={() => addOption(index)}>Add Option</button>}
                        </div>
                      </Card>
                      <div className="create-label">
                        {index === question.length - 1 && <button className="addoption" onClick={() => addQuestion()}>Add Question</button>}
                      </div>
                    </Grid>
                    <Grid item xs></Grid>
                  </Grid>

                ))}
              {
                resultdata?.map((res, resindex) => {
                  return (
                    <Grid container>
                      <Grid item xs></Grid>
                      <Grid item xs={11} sm={6} md={6} lg={4} className="card" >
                        <div>
                          <div className="createnumber">
                            <h3>Result</h3>
                          </div>
                          <div className="createnumber1">
                            {resultdata.length > 1 && <button className="delete" onClick={() => removeresult(resindex)}>X</button>}
                          </div>
                        </div>
                        <Card className="create-list">
                          <Grid
                            container
                            justify="center"
                          >
                            <input type="text" id="max" className="result-text"
                              name="max"
                              defaultValue={res.maxScore}
                              onBlur={event => handleMax(resindex, event)}
                            />
                            <input type="text" id="min" className="result-text"
                              name="min"
                              defaultValue={res.minScore}
                              onBlur={event => handleMin(resindex, event)}
                            />
                            <input type="text" id="resultTitle" className="result-text"
                              name="resultTitle"
                              defaultValue={res.title}
                              onBlur={event => handleTitle(resindex, event)}
                            />
                            <input type="text" id="phrase" className="result-text"
                              name="phrase"
                              defaultValue={res.phrase}
                              onBlur={event => handlephrases(resindex, event)}
                            />

                            <input type="file" accept="image/*" id={`resultImage${resindex}`} className="img-input" name={`resultImage${resindex}`} onChange={event => handleResultImage(event, resindex)} />
                            <FormControl className={classes.formControl} fullWidth  >
                              <Select value={res?.needle} id="needle" className="result-text"
                                inputProps={{ 'aria-label': 'Without label' }} onChange={event => handleneedle(resindex, event)} >
                                <MenuItem value="" >Select Needle Position </MenuItem>
                                <MenuItem value="2">😞</MenuItem>
                                <MenuItem value="8">😐</MenuItem>
                                <MenuItem value="12">😊</MenuItem>
                                <MenuItem value="18">😍</MenuItem>
                              </Select>
                            </FormControl>
                            <div className="create-label">
                              <label className="create-img" htmlFor={`resultImage${resindex}`}>
                                <span>  Choose your Photo</span>
                              </label>
                            </div>

                          </Grid>
                        </Card>

                      </Grid>
                      <Grid item xs></Grid>
                    </Grid>
                  )
                })
              }
              <div className="create-label">
                <button className="addoption" onClick={updateList}>Update</button>
              </div>
            </Grid>
          )
        })
      }
    </div>
  )
}

export default EditQuiz

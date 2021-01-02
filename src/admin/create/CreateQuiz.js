import { Card, FormControl, Grid, InputLabel, makeStyles, MenuItem, Select } from '@material-ui/core';
import React, { useState } from 'react';
import "./createQuiz.css"
import AdminLink from '../management/AdminLinks';
import services from '../../services/services';
import { Redirect } from 'react-router-dom';

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
  formControl: {
    alignItems: "center"

  },
}));

function CreateQuiz() {
  const classes = useStyles();
  const data = JSON.parse(localStorage.getItem('friend'));
  const jwt = data['jwt'];
  const [image, setImage] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)
  const [language, setLanguage] = useState([])
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
      }
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
  const handleChange = (event) => {
    setLanguage(event.target.value);
  };
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
    console.log(result.message)
    setImage(result.data.message)
  }

  const optionImage = async (questionIndex, index, event) => {
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
  const handleResultImage = async (event, resindex) => {
    const resultValue = [...resultdata];
    var resultimg = event.target.files[0];
    const data = resultimg.name;
    const currentTime = new Date();
    const time = currentTime.getTime();
    const ext = data.split('.')
    var result_path = 'a'+resindex + '_' + ext[0] + time + '.' + ext[1];
    var myimg = data.replace(data, result_path)
    var resultimage = new FormData()
    resultimage.append("resultImg", resultimg);
    resultimage.append("newName", myimg);
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
  const handleOption = (questionIndex, index, event) => {

    if ((event.target.value === "" && event.target.value === null) || (event.target.value.length <= 2)) {
      alert("please fill option");
      return true;
    }
    else {
      const values = [...question];
      values[questionIndex].optionsArray[index].optionLabel = event.target.value;
      setQuestion(values);
    }
  }
  const radioclick = (questionIndex, index) => {
    const values = [...question];
    var clicked = values[questionIndex].optionsArray[index].optionLabel
    if (clicked === " ") {
      alert("please choose one answer")
    }
    else {
      values[questionIndex].answer = clicked
      setQuestion(values);
    }

  }

  const handleQuestion = (index, event) => {
    if (language.length <= 0) {
      alert("Please choose language");
      return;
    }
    if ((event.target.value === "" && event.target.value === null) || (event.target.value.length <= 3)) {
      alert("please fill question")
      return true;
    }
    else {
      const values = [...question];
      values[index].questionTitle = event.target.value;
      setQuestion(values);
    }

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


  const handleSubmit = async () => {
    var title = document.getElementById("title").value
    var slug = document.getElementById("slug").value
    if ((title == "") || (title == null) || (title.length <= 2)) {
      alert("please enter required title");
      return true;
    } else if (slug == "") {
      alert("please enter slug");
      return true;
    }

    let data = true;
    question.map((item) => {
      if (item.questionTitle === "") {
        alert("Question Cannot be blank!")
        data = false;
        return
      }
      else {
        data = true;
      }
      if (item.answer === "") {
        alert("Please Choose right option")
        data = false;
        return
      }
      else {
        data = true;
      }
      item.optionsArray.map((item1) => {
        if (item1.optionLabel == "") {
          alert("Please enter all answer options")
          data = false;
          return
        }
        else {
          data = true;
          return
        }
      })


    })
    resultdata.map((res) => {
      if (res.maxScore === "" && res.minScore === "" && res.title === "" && res.needle === "") {
        alert("Result Value Cannot be blank!")
        data = false;
        return
      }
      else {
        data = true;
      }

    })
    if (data == true) {

      var fileUpload = {
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
      const result = await services.createQuiz(fileUpload, options)
      setLoggedIn(true)
    }
  }
  if (loggedIn) {
    return <Redirect to="/quizlist" push={true} />
  }
  return (
    <div className={classes.root}>
      <AdminLink />
      <Grid container className="detailView">
        <Grid container>
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
                <FormControl className={classes.formControl} fullWidth>
                  <Select label="Category" id="category" className="title-text" value={language} onChange={handleChange} >
                    <MenuItem value="en">Select Language</MenuItem>
                    <MenuItem value="en">en</MenuItem>
                  </Select>
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
                <div className="img-holder">
                  <img id="output" className="img" />
                </div>
                <input type="file" accept="image/*" id="input" name="input"
                  onChange={event => handleImage(event)}
                />
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
            <Grid container key={index}>
              <Grid item xs></Grid>
              <Grid item xs={11} sm={6} md={6} lg={4} className="card" >
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
                    <input type="text" id="question" className="que-text"
                      name="question"
                      placeholder="Enter Question"
                      onBlur={event => handleQuestion(index, event)}
                    />
                  </Grid>
                  {que.optionsArray.map((option, optIndex) => (
                    <React.Fragment key={optIndex}>
                      <div className="answerContainer">
                        <input type="radio" name={`option_${index}`} defaultChecked={que.answer} onClick={event => radioclick(index, optIndex, event)} />
                        <textarea className="create-option" placeholder="Answer" onBlur={event => handleOption(index, optIndex, event)} />
                        <div className="quizwrapper">
                          <div className="quizfile-upload2">
                            <input type="file" className="quizoption2"
                              defaultValue={option.optionImg}
                              onChange={event => optionImage(index, optIndex, event)}
                            />
                            <img src="/assets/image/option.png" height="40px" />
                          </div>
                        </div>
                        {optIndex > 1 && <button className="delete" onClick={() => removeOption(index, optIndex)}>X</button>}
                      </div>
                    </React.Fragment >
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
          resultdata.map((res, resindex) => (
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
                      placeholder="Max Score"
                      onBlur={event => handleMax(resindex, event)}
                    />
                    <input type="text" id="min" className="result-text"
                      name="min"
                      placeholder="Min Score"
                      onBlur={event => handleMin(resindex, event)}
                    />
                    <input type="text" id="resultTitle" className="result-text"
                      name="resultTitle"
                      placeholder="Title"
                      onBlur={event => handleTitle(resindex, event)}
                    />
                    <input type="text" id="phrase" className="result-text"
                      name="phrase"
                      placeholder="Phrase"
                      onBlur={event => handlephrases(resindex, event)}
                    />

                    <input type="file" accept="image/*" id={`resultImage${resindex}`} className="img-input" name={`resultImage${resindex}`} onChange={event => handleResultImage(event, resindex)} />
                    <FormControl className={classes.formControl} fullWidth>
                      <Select id="needle" className="result-text"
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
          ))}
        <div className="create-label">
          {<button className="addoption" onClick={() => addresult()}>Add Result</button>}
        </div>
        <div className="create-label">
          <button className="addoption" onClick={handleSubmit}>Save</button>
        </div>
      </Grid>

    </div>
  )
}

export default CreateQuiz

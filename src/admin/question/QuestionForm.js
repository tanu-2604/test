import React, { useState, useEffect } from 'react';
import { makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Grid,Card } from '@material-ui/core';
import './Question.css'
import services from '../../services/services';
import { Redirect, useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),

    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: '25ch',
    },

  },
  formControl: {
    margin: theme.spacing(1),

  },
  option: {
    display: "block"
  },
  option1: {
    float: "left"
  },
  img: {
    float: "right",
    width: "50px"
  },

  button: {
    margin: theme.spacing(1),
  },
  dropdown: {
    zIndex: 1,
    transform: "translate(14px, 13px) scale(1)",
    padding: "10.5px 14px"
  },
  create:{
    marginTop:"55px",
    textAlign:"center",
    color:"#133b5c"
  }
}))

function QuestionForm() {
  const classes = useStyles()
  const history = useHistory()
  const [question, setQuestion] = useState(
    [
      {
        questionTitle: '',
        optionsArray: [
          { optionLabel: "", optionImg: "" },
          { optionLabel: "", optionImg: "" }
        ]
      },
    ]
  )

  const [category, setCategory] = useState([])
  const [categoryOption, setCategoryOption] = useState([])
  const data = JSON.parse(localStorage.getItem('friend'));
  const jwt = data['jwt'];
  var userId = data['userId'];
  useEffect(() => {
       getAllCategory();
  }, [])

  const  getAllCategory = async () => {
      const options = {
          method: 'Get',
          headers: {
              "Apiuserid": "49507884",
              "Scope": "In.QuizApp.READ",
              "Authorization": `quizApp-oauthtoken ${jwt}`,
          }
      }
      const result = await services.getAllCategory(options)
      setCategory(result.data.data)
  };

  const addQuestion = (event,index) => {
    
      setQuestion([
        ...question,
        {
          questionTitle: '',
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

  const handleChange = (event) => {
    if(event.target.value != "" && event.target.value !=null)
    {
      setCategoryOption(event.target.value);
    }
    else{
      alert("please take category")
      return true;
    }
    
  };

  const handleOption = (questionIndex, index, event) => {
    if((event.target.value === "" && event.target.value ===null)||(event.target.value.length <=2 ))
    {
      alert("please fill option");
      return true;
    }
    else{
      const values = [...question];
     values[questionIndex].optionsArray[index].optionLabel = event.target.value;
     setQuestion(values);
    }
  }

  const handleImage = async(questionIndex, index, event) => {
    const values = [...question];
     var imgpath=event.target.files[0]
    const data = imgpath.name;
    const currentTime = new Date();
    const time = currentTime.getTime();
    const ext= data.split('.')
    var file_path= questionIndex+'' + index+'' +ext[0]+time+'.'+ext[1];
    var myimg=data.replace(data,file_path)
    var img=new FormData()
    img.append("optionImg",imgpath);
    img.append("newName",myimg)
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
    values[questionIndex].optionsArray[index].optionImg=file_path;
    setQuestion(values);
  }

  const handleQuestion = (index, event) => {
    if(categoryOption.length<=0){
      alert("Please Select your Category first!" );
      return;
    }
    
    if((event.target.value === "" && event.target.value ===null)||(event.target.value.length <=3))
    {
      alert("please fill question")
      return true;
    }
    else{
      const values = [...question];
    values[index].questionTitle = event.target.value;
    setQuestion(values);
    }
   

  }
  var LoggedIn=false
  const addTask = async () => { 
    let data=true;
      question.map((item)=>{
             if(item.questionTitle === "")
             {
              console.log(item.questionTitle)
              alert("Question Cannot be blank!")
              data= false;
              return;
             }
             else{
              data= true;
             }
             item.optionsArray.map((item1)=>{
               if(item1.optionLabel==""){
               alert("Please enter all answer options")
               data= false;
               return;
               }
               else{
                data= true;
                return;
               }
             })
            
             
    })
    if(data==true){
      const fileUpload={
      category:categoryOption,
      userId:userId,
      questionsArray:question
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
    const result = await services.addQuestion(fileUpload, options)
   return<Redirect to="/category" push={true}/>
  }
  
  }
 
  return (
    <div>
      <Container>
        <h1 className={classes.create}>Create Question</h1>
              <Grid container>
                    <Grid item xs></Grid>
                    <Grid item xs={11} sm={6} md={6} lg={4} >
                    <div className="createnumber">
                        <h3>Category</h3>
                    </div>
                      <Card className="create-list">
                       <Grid container justify="center">
                             <FormControl className={classes.formControl} fullWidth>
                              <Select
                                label="Category"
                                id="category"
                                value={categoryOption}
                                onChange={handleChange}
                                 >
                               {
                                category.map((option, index) => {
                                  return (
                                <MenuItem key={index} value={option.categoryId}>{option.title}</MenuItem>
                                )})}
                              </Select>
                              </FormControl>
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
                    {question.length > 1 &&<button className="delete" onClick={() => removeQuestion(index)}>X</button>}
                   </div>
                      <Card className="create-list">
                                  <Grid
                                  container
                                  justify="center"
                                 >
                               <input  type="text" id="question" className="que-text"
                            name="question"
                            placeholder="Enter Question"
                           // onFocus={()=>checkCategory()}
                            onBlur={event => handleQuestion(index, event)}
                            required/>
                               </Grid>
                               {que.optionsArray.map((option, optIndex) => (
                               <>
                              <div className="answerContainer">
                               {/* <input type="radio"  name={`option_${index}`}onClick={event => radioclick(index, optIndex, event)}/> */}
                               <input className="create-answer" placeholder="Answer"  onBlur={event => handleOption(index, optIndex, event)}/>
                               <div className="quizwrapper">
                                <div className="quizfile-upload2">
                                  <input type="file" className="quizoption2"
                                    defaultValue={option.optionImg}
                                    onChange={event =>handleImage(index, optIndex, event)}
                                    required/>
                                  <img src="/assets/image/option.png" height="40px" />
                                </div>
                                </div>
                               {optIndex > 1 &&<button className="delete"  onClick={() => removeOption(index, optIndex)}>X</button>}
                              </div>
                              </>
                               ))}
                              <div className="create-label">
                              {
                              <button className="addoption"   onClick={() => addOption(index)}>Add Option</button>}
                              </div>
                      </Card>
                      <div className="create-label">
                      {index === question.length - 1 &&  <button className="addoption"   onClick={(event) => addQuestion(event,index)}>Add Question</button>}
                     </div>
                    </Grid>
                    <Grid item xs></Grid>
                  </Grid>
                  
                ))}
              <div className="addWrapper">
                <Button
                  className="addTAsk"
                  variant="contained"
                  onClick={addTask}
                >
                  Create
                 </Button>

              </div>
      </Container>
    </div>
  )
}

export default QuestionForm
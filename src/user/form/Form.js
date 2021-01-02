import React, { useState, useEffect } from 'react';
import '../style/form.css';
import { Grid, Card } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom';
import services from '../../services/services';
import Footer from '../footer/Footer';
import {Cookies, useCookies } from 'react-cookie';


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
  list: {
    margin: "25px auto",
    textAlign: "center"
  },
  add: {
    width: "100%"
  }

}));

function Form() {
  const classes = useStyles();
  const [data, setData] = useState(false);
  const [question, setQuestion] = useState([])
  const [title, setTitle] = useState({});
  const [cookies, setCookie] = useCookies(['userInfo']);
  const cookie = new Cookies()
  var categoryId

  if (localStorage.getItem("categoryId")) {
    categoryId = JSON.parse(localStorage.getItem("categoryId"));

  }
  else {
    categoryId = JSON.parse(cookie.get('categoryId'));

  }
  const handleSubmit = () => {
    var selectLanguage = document.getElementById("selectLanguage").value;
    var name = document.getElementById("name").value;

    if ((name == "") || (name == null) || (name.length <= 2)) {
      alert("please enter required name");
    } else if (selectLanguage == "") {
      alert("please select Language");
    }

    else {
      var data = {
        selectLanguage: selectLanguage,
        name: name
      }
      localStorage.setItem("userInfo", JSON.stringify(data));
      setCookie("userInfo", JSON.stringify(data));
      setData(true);
    }

  }

  useEffect(() => {
    getCategory();
    getQuestionlist();

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
    setTitle(result.data.data);

    document.title = result.data.data.title;
  };

  const getQuestionlist = async () => {
    const data = {
      categoryId: categoryId,
      status:"active"
    }  
    const options = {
      method: 'POST',
      headers: {
        "Apiuserid": "49507884",
        "Scope": "In.QuizApp.READ",
      }
    }
    const result = await services.getQuestionlist(data, options)
    setQuestion(result.data.data)
  };
  if (data) return (<Redirect to="/questionlist" push={true} />)
  return (
    <>
      <div className={classes.gridContainer}>
        <Grid container>
          <Grid item xs></Grid>
          <Grid item xs={11} sm={6} md={6} lg={4} className="form-grid" >
            <div justify="center" className={classes.head}>
              <h3 className="text1" key={title}>{title.title}</h3>
            </div>
            <Card className="form-card">
              <h3 className="language">Select Language:</h3>
              <select id="selectLanguage">
                <option value="" defaultValue>Select Language</option>
                <option value="English">English</option>
              </select>
              <h3 className="language">Name</h3>
              <input type="text" id="name" className="formname" placeholder="Enter Your Name" required /><br />
              <div className="start-wrapper">
                <button className="started" onClick={handleSubmit}> Start</button>
              </div>
            </Card>
          </Grid>
          <Grid item xs></Grid>
        </Grid>
        <br />
        <Grid container>
          <Grid item xs></Grid>
          <Grid item className={classes.list} xs={11} sm={6} md={6} lg={4}>
            <a href="#">
              <img src="/assets/image/Image5.png" className={classes.add} />
            </a>
          </Grid>
          <Grid item xs></Grid>
        </Grid>
        <Footer />
      </div>

    </>
  );
}

export default Form

import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography, Grid, Divider, Paper } from '@material-ui/core';
import './CategoryForm.css'
import services from '../../services/services';


const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  heading: {
    textAlign: "center",
    fontWeight: "500",
    color: "#133b5c"
  },
  btn: {
    margin: "10px",
    background: "#133b5c",
    color: "#fff",
    '&: hover': {
      color: "#133b5c !important",
    }

  },
  form: {
    textAlign: "center"
  },
  createwrap:{
    textAlign:"center"
  }
}));


function CategoryForm() {
  const classes = useStyles();
  const[loggedIn,setLoggedIn]=useState(false)
  const data = JSON.parse(localStorage.getItem('friend'));
  const jwt = data['jwt'];
  var userId = data['userId'];


  var loadFile = function (e) {
    var output = document.getElementById('output');
    output.src = URL.createObjectURL(e.target.files[0]);
    output.onload = function () {
      URL.revokeObjectURL(output.src) // free memory
    }
  };

  const createCategory = async () => {
    const data = new FormData();
    var categoryTitle = document.getElementById("categoryTitle").value;
    var questionlength = document.getElementById("questionlength").value;
    var userfile = document.getElementById('input').files?.[0];
    if ((categoryTitle == "") || (categoryTitle == null) || (categoryTitle.length <= 2)) {
      alert("please enter required Category");
    } 
    data.append("categoryTitle", categoryTitle);
    data.append("userId", userId);
    data.append("limit", questionlength);
    data.append("userfile", userfile);
    const options = {
      method: 'POST',
      headers: {
        "Apiuserid": "49507884",
        "Scope": "In.QuizApp.INSERT",
        'Content-Type': 'multipart/form-data',
        "Authorization": `quizApp-oauthtoken ${jwt}`,
      }
    }
    const result = await services.createCategory(data, options)
    if(result.data.code==200)
    {
     setLoggedIn(true)
    }
  }
  
 
if(loggedIn)
{
window.location.reload();

}


  return (
    <>
      <Typography variant="h5" className={classes.heading}>Create Category</Typography>
      <form className={classes.root}>

        <div className={classes.form}>
          <TextField
            id="categoryTitle"
            label="Category Name"
            type="text"
            variant="outlined"
            size="small"
          />
        </div>
        <div className={classes.form}>
          <TextField
            id="questionlength"
            label="Max length"
            type="number"
            variant="outlined"
            size="small"
          />
        </div>
        <div className="img-holder">
          <img id="output" className="img" />
        </div>
        <input type="file" accept="image/*" id="input" name="input" onChange={(e) => loadFile(e)} />
        <div className="label">
          <label className="image-upload" htmlFor="input">
            <span>  Choose your Photo</span>
          </label>
        </div>
        <div className={classes.createwrap}>
        <Button
          className={classes.btn}
          size="normal"
          variant="contained"
          onClick={createCategory}
          >
          Create
            </Button>
        </div>
      </form>


    </>


  )
}

export default CategoryForm

import React,{useState} from 'react'
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography } from '@material-ui/core';
import services from '../../services/services';
import { Redirect } from 'react-router-dom';
import User from './User';


const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
    heading:{
          textAlign:"center",
          fontWeight:"500",
          color:"#133b5c"   
         },
    btn:{
        float:"left",
        margin:"10px",
        background:"#133b5c",
        color:"#fff",
        '&: hover':{
        color: "#133b5c !important",
        }

    }
  }));
function AdminForm() {
    const classes = useStyles();
    const[loggedIn,setLoggedIn]=useState(false)

   const  data= JSON.parse(localStorage.getItem('friend'));
   const jwt= data['jwt'];

    const createAdmin = async() => {
      var firstName = document.getElementById("firstName").value;
      var lastName = document.getElementById("lastName").value;
      var username = document.getElementById("username").value;
      var password = document.getElementById("password").value;
      var passw=  /^[A-Za-z]\w{6,20}$/;

     if(firstName===""&&lastName==="" && username==="")
     {

     }
     else if(password.value.match(passw))
     {
      alert('Correct, try another...');
      return true;
     }
     else{

     }
      var data = {
        firstName:firstName,
        lastName: lastName,
        username: username,
        password: password,
      }
      const options = {
        method: 'POST',
       headers:{
          "Apiuserid": "49507884",
          "Scope": "In.QuizApp.INSERT",
          "Authorization": `quizApp-oauthtoken ${jwt}`,
       }
      }
        const result= await services.createAdmin(data,options)
        console.log(result)
       if(result.data.code==200)
       {
        setLoggedIn(true)
       }
    }  
  if(loggedIn)
  {
    window.location.reload(true);
   
  }


    return (
        <form className={classes.root}>
            <Typography variant="h5" className={classes.heading}>Create User</Typography>
            <div>
                <TextField
                id="firstName"
                label="First Name"
                type="firstName"
                />
            </div>
            <div>
                <TextField
                id="lastName"
                label="Last Name"
                type="lastName"
                />
            </div>
            <div>
                <TextField
                id="username"
                label="User Name"
                type="userName"
                />
            </div>
            <div>
              <TextField
              id="password"
              label="Password"
              type="password"
              />
            </div> 
    
            <Button
            className={classes.btn}
            size="normal"
            variant="contained"
            onClick={createAdmin}
              >
                Create
            </Button>
            <Button
            className={classes.btn}
            size="normal"
            variant="contained"
            // onClick={addTask}
            >
                Reset
              </Button>
        </form>
    )
}

export default AdminForm

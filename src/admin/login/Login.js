import React, { useState } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import "./Login.css"
import services from '../../services/services';
import { Redirect } from 'react-router-dom';
import { ToastsContainer, ToastsStore, ToastsContainerPosition } from 'react-toasts';

const Login = () => {
const[loggedIn,setLoggedIn]=useState(false)
const[page,setPage]=useState([])

const login = async() => {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
   
    var data = {
     username: username,
      password: password,
    }
    const options = {
      method: 'POST',
     headers:{
        "Apiuserid": "49507884",
        "Scope": "In.QuizApp.LOGIN"
     }
    }
      const result= await services.login(data,options)
       var codedata = result.data.code
     if(codedata != 400 && codedata != 401)
     {
        setPage(result.data)
        setLoggedIn(true)
     }
     else{
        ToastsStore.error("Please enter right username and password")
     }
  }  

  localStorage.setItem('friend', JSON.stringify(page)); 
  if(loggedIn)
  {
      return(<Redirect to="/quizlist" push={true}/>)
  }
//   else{
//       return(<Redirect to="/login" push={true}/>)
//   }
    return (
        <>
          <Container fluid className="loginwrapper fadeInDown">
                <Row>
                    <Col className="formContent mt-5" sm={12} md={6} lg={4}>
                        <div className="fadeIn first">
                            <img src="/assets/image/download.png" id="icon" alt="user icon" height="90" className="mb-3" />
                        </div>
                            <input  type="text" id="username" className="fadeIn input-text Second mb-4"
                            name="username"
                            placeholder="User Name"
                            />

                            <input  type="password" id="password" className="fadeIn input-text third
                            mb-4"
                            name="password"
                            placeholder="Password"
                            />

                            <input  type="submit"  className="btn btn-primary btn-block fadeIn submit fourth mb-3"
                            onClick={login}
                            />
                            <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.TOP_CENTER} />
                    </Col> 
                </Row>     
          </Container>  
        </>
    )
}

export default Login;
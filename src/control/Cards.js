import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import  './Card.css'
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

import Button from '@material-ui/core/Button';

import {Link} from  "react-router-dom"
import { Grid } from '@material-ui/core';
import services from '../services/services';

const useStyles = makeStyles((theme)=>({
   
      paper: {
        padding: theme.spacing(1),
   
      },
  card: {
    maxWidth: 350,
    margin:"50px",
    marginTop:"120px"

  },
  media: {
    height:50
  },
  edit:{
    float:"left",
    margin: "3px",
    fontSize:"10px",
    background:"#133b5c",
    color:"#fff",
  },
  active:{
    margin: "3px",
    float:"left",
    fontSize:"10px",
    background:"#133b5c",
    color:"#fff",
  },
  dlt:{
    margin: "3px",
    float:"left",
    fontSize:"10px",
    background:"#E70808",
    color:"#fff",
  },
  
  col:{
    display:"flex",
  }

}));

export default function Cards({category}) {
  const classes = useStyles();
  const[status,setStatus]=useState()
  const data = JSON.parse(localStorage.getItem('friend'));
  const jwt = data['jwt'];
  const checkedStatus = (id) => async () => {
    
    var data = {
     categoryId: id,
    }
    const options = {
      method: 'POST',
      headers: {
        "Apiuserid": "49507884",
        "Scope": "In.QuizApp.LOGIN",
        "Authorization": `quizApp-oauthtoken ${jwt}`,
      }
    }
    const result = await services.categoryStatus(data, options)
    if(result.data.status===200){
      setStatus(true)
    }

  }
if(status){
  window.location.reload();
}
  return (
    <>
      <Card className={classes.root}     variant="outlined" key={category.categoryId} >
         <Grid container className="carddata">
              <Grid item xs={4} sm={4} md={4} lg={4} className="imgpart" >
                <img className="categoryImg" src={category.image} /> 
              </Grid>
              <Grid item xs={8} sm={8} md={8} lg={8} className="optionbg" >
                <CardContent className="cardcontent">
                  <h3 className="optioncontent" id="cardText">
                      {category.title}
                  </h3>
                   </CardContent>
              </Grid>
        </Grid>
            
            <div>
            {
                     category.status === "active" ?
                     <Button
                     className={classes.dlt}
                     size="small"
                     variant="contained"
                     onClick={checkedStatus(category.categoryId)}
                     >
                    Deactive
                    </Button> :
                         <Button
                         className={classes.active}
                         size="small"
                         variant="contained"
                         onClick={checkedStatus(category.categoryId)}
                         >
                        Active
                        </Button>
                    }
                   
                  <Link to={`/allquestionlist/${category.categoryId}`} >
                  <Button
                    className={classes.edit}
                    size="small"
                    variant="contained"
                   
                    >
                   Questions
                   </Button>
                  </Link>
                  <Link to={`/allquestionlist/${category.categoryId}`} >
                  <Button
                    className={classes.edit}
                    size="small"
                    variant="contained"
                    >Edit
                   </Button>
                  </Link>
          </div>
        
    </Card>
        
    </>
  );
}
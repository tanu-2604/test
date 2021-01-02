import React, { useEffect, useState } from 'react'
import { Card, CardContent, Grid, makeStyles, TextField } from '@material-ui/core';
import "./createQuiz.css"
import AdminLink from '../management/AdminLinks'
import { useParams } from 'react-router-dom';
import services from '../../services/services';

function ViewAns() {
  const {id}=useParams();
    const[playerResult,setPlayerResult]=useState([])
    const[resultAns,setResultAns]=useState([])
    const data = JSON.parse(localStorage.getItem('friend'));
    const jwt = data['jwt'];
    useEffect(() => {
        getPlayerResult();
    }, [])
  
    const getPlayerResult = async () => {
         const data={
           resultId:id
         }
        const options = {
            method: 'Post',
            headers: {
                "Apiuserid": "49507884",
                "Scope": "In.QuizApp.READ",
                "Authorization": `quizApp-oauthtoken ${jwt}`,
            }
        }
        const result = await services.getPlayerResult(data,options)
        setPlayerResult(result.data.data)
        setResultAns(JSON.parse(result.data.data[0].answers))

    };
    return (
        <>
             <AdminLink/>
             <Grid container>
                    <Grid item xs></Grid>
{
  playerResult.map((player,index)=>{
    return(
      <Grid item xs={11} sm={6} md={6} lg={4} className="card" >
      <div>
      <div className="createnumber">
    <h3>{player.playerName}</h3>
      </div>
     <div className="createnumber1">
     </div>
      </div>
        <Card className="create-list">
          <Grid container justify="center">
              <span className="all-text"><span className="span-text">Score:</span> {player.score}</span>
              <span className="all-text"><span className="span-text">Played At:</span> {player.createDate}</span>
              {
                resultAns.map((answerd,index)=>{
               return(
                 <>
                   {
                   answerd.correct==="yes"?
                   <span className="right-text">{answerd.answer}</span>
                   :
                   <span className="wrong-text">{answerd.answer}</span>
                 }
                 </>
                 
               )
                })
              }
        </Grid>
        </Card>
      </Grid>
    )
  })
}
                    <Grid item xs></Grid>
                  </Grid>
        </>
    ) 
}

export default ViewAns

import React, { useEffect, useState } from 'react'
import AdminLink from '../management/AdminLinks';
import { Card, CardContent, Grid, makeStyles} from '@material-ui/core';
import "./View.css"
import { useParams } from 'react-router-dom';
import services from '../../services/services';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  gridContainer: {
    paddingTop:"20px",
    minHeight:"100vh"
  },
  imgsize:{
    width:"100%"
  }
  
}));
function View() {
  const classes = useStyles()
  const {id}=useParams();
  const [quiz,setQuiz]=useState([])
  const [que,setQue]=useState([])
  const [resultdata,setResultdata]=useState([])
  const data = JSON.parse(localStorage.getItem('friend'));
  const jwt = data['jwt'];
  useEffect(() => {
      getQuizBySlug();
  }, [])

  const getQuizBySlug = async () => {
       const data={
         quizSlug:id
       }
      const options = {
          method: 'Post',
          headers: {
              "Apiuserid": "49507884",
              "Scope": "In.QuizApp.READ",
              "Authorization": `quizApp-oauthtoken ${jwt}`,
          }
      }
      const result = await services.getQuizBySlug(data,options)
      console.log(result.data.data)
      setQuiz(result.data.data)
      setQue(JSON.parse(result.data.data[0].questionData))
      setResultdata(JSON.parse(result.data.data[0].resultData))
  };

  console.log(que)
    return (
        <>
            <AdminLink/>
           {
             quiz?.map((list,index)=>{
               return(
                <Grid container className="detailView">
                <Grid container>
                    <Grid item xs></Grid>
                    <Grid item xs={11} sm={6} md={6} lg={4} >
                        <div className="createnumber">
                            <h3>Title</h3>
                        </div>
                        <Card className="create-list">
                        <Grid container justify="center">
                            <span className="title-text">{list.title}</span>
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
                                     <span className="title-text">{list.slug}</span>    
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
                                          <span className="title-text">{list.language}</span>
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
                        {
                          list.bannerImage?
                          <Card className="create-list">
                              <Grid container justify="center" >
                              <img className={classes.imgsize} src={`${list.image_base_path}/${list.bannerImage}`}/>
                              </Grid>
                          </Card>:
                           <Card className="create-list">
                              <Grid container justify="center" >
                                 <span  id="upload" className="title-text" name="upload">Image Not Uploaded</span>
                              </Grid>
                           </Card>
                        }
                        </Grid>
                        <Grid item xs></Grid>
                      </Grid>
                      {
                        que?.map((que,index)=>{
                          return(
                            <Grid container>
                        <Grid item xs></Grid>
                        <Grid item xs={11} sm={6} md={6} lg={4} className="card">
                        <div className="createnumber">
                            <h3>Question</h3>
                        </div>
                          <Card className="create-list">
                                      <Grid
                                      container
                                      justify="center"
                                     >
                                          <span className="que-text">{que.questionTitle}</span>
                                   </Grid>
                                   {que.optionsArray?.map((options, optIndex) => {
                                     
                                    return(  <div className="answerContainer">
                                      {
                                        que.answer===options.optionLabel? <input type="radio" disabled  name={`option_${index}`} defaultChecked={que.answer} />: <input type="radio" disabled/>
                                      }
                                      {/* <input type="radio" disabled  name={`option_${index}`} defaultChecked={que.answer} /> */}
                                      {options.optionImg?.length ?
                     <Grid
                     container
                     className="viewOption"
                     key={optIndex}
                     id="cardbox">
                     <Grid item xs={4} sm={4} md={4} lg={4} className="div-image" >
                      <img className="view-img"  src={`${list.image_base_path}/${options.optionImg}`} /> 
                    </Grid>
                    <Grid item xs={8} sm={8} md={8} lg={8} className="viewbg" >
                    <CardContent className="view-card">
                    <h3 className="view-option" id="cardText">
                         {options.optionLabel}
                       </h3>
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
                    <h3 className="view-option" id="cardText">
                         {options.optionLabel}
                       </h3>
                    </CardContent>
                  </Grid>
               </Grid>
                  }
                 
                                     </div>
  
                                   )})
              }
                                 
                          </Card>
                        </Grid>
                        <Grid item xs></Grid>
                      </Grid>
                          )

                        })
                      }

                      {
                        resultdata?.map((res,index)=>{
                          return(
                      <Grid container>
                        <Grid item xs></Grid>
                        <Grid item xs={11} sm={6} md={6} lg={4} className="card" >
                        <div>
                        <div className="createnumber">
                            <h3>Result</h3>
                        </div>
                       <div className="createnumber1">
                       </div>
                        </div>
                          <Card className="create-list">
                            <Grid container justify="center">
                          <span className="result-text"><span className="span-text">Max Score:</span>{res.maxScore}</span>
                          <span className="result-text"><span className="span-text">Min Score:</span>{res.minScore}</span>
                          <span className="result-text"><span className="span-text">Title:</span>{res.title}</span>
                          <span className="result-text"><span className="span-text">Phrase:</span>{res.phrase}</span> 
                          <span className="result-text"><span className="span-text">Needle:</span> {res.needle}</span> 
                          {
                            res.resultImage ===""?<span  id="upload" className="result-text" name="upload">Image Not Uploaded</span>:
                            <img className={classes.imgsize} src={`${list.image_base_path}/${res.resultImage}`}/>
                          }
                          </Grid>
                          </Card>
                        </Grid>
                        <Grid item xs></Grid>
                      </Grid>
                       )
                      })
                    }
                      </Grid>
               )
             })
           }
        </>
    )
}

export default View

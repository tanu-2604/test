import React,{useState,useEffect} from 'react';
import '../style/category.css';
import { makeStyles, Grid, Card, CardMedia, CardContent, Typography } from '@material-ui/core';
import services from '../../services/services';
import { Redirect,useHistory} from 'react-router-dom';
import Footer from '../footer/Footer';
import { useCookies } from 'react-cookie';
import { Helmet } from 'react-helmet';

    const useStyles = makeStyles({
        gridContainer: {
            background:"#7555D9",
            minHeight:"100vh",
            padding:"0px 20px"
            
        },
        grid:{
            marginBottom:"20px"
        },
        
       
    });

function QuizCategory() {
    const classes = useStyles();
    const history = useHistory()
    const[category,setCategory] = useState([]);
    const [id,setId]= useState(0)
    const [cookies, setCookie] = useCookies(['playQuizId']);
    useEffect(() => {
        getAllQuiz();
        document.title="We Best Friends"
      
    }, [])

    const  getAllQuiz = async () => {
        const options = {
        method: 'Get',
        }
    const result = await services.getAllQuiz(options)
      setCategory(result.data.data)
    };

   const handleClick =(id,image,title,slug)=>{
    localStorage.setItem('playQuizId', JSON.stringify(id)); 
    setId(id)
    setCookie('playQuizId', id, { path: '/quizCategory' });
    history.push({pathname:`/quizform/${slug}`});
    }
    
        return (
            <>
            {
                category.length? 
                <Grid container className={classes.gridContainer} justify="center">
                <Grid item xs={12} sm={6} md={3}>
                <h3 className="choose1">Choose your</h3>
                <h3 className="choose2">Quiz</h3>
                </Grid>
                {
                  category.map((list,index)=>{
                 return(  
                       <>
                       {
                           list.bannerImage!=""?
                           <Grid container justify="center" className={classes.grid}>
                           <Grid item xs={12} sm={7} md={6}lg={3} >
                               <Card className="card" key={`${index}_${list.adminQuizId}`}  onClick={()=>{handleClick(list.adminQuizId,list.bannerImage,list.title,list.slug)}} >
                                   <div>  
                                       <Grid container>
                                           <Grid item xs={4} sm={4} md={3}lg={3} className="img-card" >
                                               <img className="cardImg" src={list.bannerImage}/>
                                           </Grid>
                                           <Grid item xs={8} sm={8} md={9}lg={9} className="content-bg" >
                                               <CardContent className="card-category">
                                                   <h3 className="content">{list.title}</h3>
                                               </CardContent>
                                           </Grid>
                                       </Grid>
                                   </div>
                               </Card>
                           </Grid>
                       </Grid>:
                      <Grid container justify="center" key={`${index}_${list.adminQuizId}`} className={classes.grid}>
                      <Grid item xs={12} sm={7} md={6}lg={3} >
                              <Card className="card"  onClick={()=>{handleClick(list.adminQuizId,list.bannerImage,list.title,list.slug)}} >
                                  <div>  
                                      <Grid container>
                                          <Grid item xs={12} sm={12} md={12}lg={12} className="content-bg" >
                                              <CardContent className="card-category">
                                                  <h3 className="content">{list.title}</h3>
                                              </CardContent>
                                          </Grid>
                                      </Grid>
                                  </div>
                              </Card>
                          </Grid>
                  </Grid>
                       }
                       </>
                        )
                })
                }  
                 <Footer/>
         </Grid>
         :null
            }
            
        
         </>
        );
}

export default QuizCategory;

import React,{useEffect,useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom';
import { Grid, Divider, Card, CardContent, Button } from '@material-ui/core';
import services from '../../services/services';
import AdminLink from '../management/AdminLinks';


const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    gridContainer: {
      paddingTop:"20px",
      minHeight:"100vh"
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      },
    headPart:{
        backgroundColor:"#133b5c",
      color:"#ffff"
    },
    icon:{
        color:"#fff"
    },
    categorytitle:{
        marginTop:"50px",
        color:"#133b5c",
        fontSize:"35px",
        fontWeight:"600",
        textAlign:"center"
    },
    heading: {
      fontSize: theme.typography.pxToRem(20),
      fontWeight: theme.typography.fontWeightRegular,
    },
    optionimg:{
      float:"left",
      padding:"10px",
      width:"70%"
    },
    buttonwrap:{
      textAlign:"center"
    },
    active:{
      margin: "3px",
      fontSize:"10px",
      background:"#133b5c",
      color:"#fff",
    },
    dlt:{
      margin: "3px",
      fontSize:"10px",
      background:"#E70808",
      color:"#fff",
    },
  }));
  
  export default function AllQuestionList() {
    const classes = useStyles();
    const [title,setTitle]=useState({})
    const {id} = useParams();
    const [questionList, setQuestionList] = useState([]);
    const[status,setStatus]=useState()
    const data = JSON.parse(localStorage.getItem('friend'));
    const jwt = data['jwt'];
    useEffect(() => {
      getCategory();
        getQuestionlist();
    }, [])

  
  const  getCategory = async () => {
   const categoryData={
       categoryId:id
   }
  
   const options = {
       method: 'POST',
       headers: {
           "Apiuserid": "49507884",
           "Scope": "In.QuizApp.READ",   
       }
   }
   const result = await services. getCategory(categoryData,options)
   setTitle(result.data.data)
  };
    const getQuestionlist = async () => {
        const data={
             categoryId:id
        }
        const options = {
            method: 'GET',
            headers: {
                "Apiuserid": "49507884",
                "Scope": "In.QuizApp.READ",
            }
        }
        const result = await services.getQuestionlist(data,options)
        console.log(result)
        setQuestionList(result.data.data)
    };

    const checkedStatus = (id) => async () => {
    
      var data = {
       qusId: id,
      }
      const options = {
        method: 'POST',
        headers: {
          "Apiuserid": "49507884",
          "Scope": "In.QuizApp.READ",
          "Authorization": `quizApp-oauthtoken ${jwt}`,
        }
      }
      const result = await services.questionStatus(data, options)
      if(result.data.status===200){
        setStatus(true)
      }
  
    }
  if(status){
    window.location.reload();
  }
    return (
      <div className={classes.root}>
        <AdminLink/>
        <h3 className={classes.categorytitle}>{title.title}</h3>
          <Grid
                container
                className={classes.gridContainer}
                justify="center"
             >
               {
                 questionList.map((list,index)=>{
                   return(
                    <Grid container key={index}>
                    <Grid item xs></Grid>
                    <Grid item xs={11} sm={6} md={6} lg={4} >
                      <Card className="questioncard">
                   <h3 className="questionname">{list.question}</h3>
                         <div className="optioncard">
                         {
                           list.optionsArray.map((option,index)=>{
                                return(
                                   <>
                                {option.optionImg.length ?
                                  <Grid container className='nonclickoption'>
                                    <Grid item xs={4} sm={4} md={4} lg={4} className="image-div" >
                                    <img className="optionImg" src={option.optionImg} /> 
                                    </Grid>
                                    <Grid item xs={8} sm={8} md={8} lg={8} className="optionbg" >
                                      <CardContent className="cardcontent">
                                        <h3 className="optioncontent" id="cardText">
                                          {option.optionLabel}
                                        </h3>
                                      </CardContent>
                                    </Grid>
                                 </Grid>
                               : 
                               <Grid justify="center" container className="new">
                                  <Grid item xs={8} sm={8} md={8} lg={8} className='newnonclickoption'>
                                      <CardContent className="newcontent">
                                        <h3 className="optioncontent" id="cardText">
                                          {option.optionLabel}
                                        </h3>
                                      </CardContent>
                                  </Grid>
                               </Grid>
                               }
                               </>
                                )
                           })
                         }
                               
                    
                        </div>
                        
                        <div className={classes.buttonwrap}>
                        {
                     list.questionStatus=== "active" ?
                     <Button
                     className={classes.dlt}
                     onClick={checkedStatus(list.qusId)}
                     size="small"
                     variant="contained"
                     >
                    Deactive
                    </Button> 
                    :
                         <Button
                         className={classes.active}
                         size="small"
                         variant="contained"
                         onClick={checkedStatus(list.qusId)}
                         >
                        Active
                        </Button>
                    }
                        </div>
                        
                      </Card>
                    </Grid>
                    <Grid item xs></Grid>
                  </Grid>
                   )
                 })
               }
                
         </Grid>
        </div>
  );
}
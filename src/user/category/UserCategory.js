import React,{useState,useEffect} from 'react';
import '../style/category.css';
import { makeStyles, Grid, Card, CardMedia, CardContent, Typography } from '@material-ui/core';
import services from '../../services/services';
import { Redirect } from 'react-router-dom';
import Footer from '../footer/Footer';
import { useCookies } from 'react-cookie';

    const useStyles = makeStyles({
        gridContainer: {
            background:"#7555D9",
            minHeight:"100vh",
            padding:"0px 20px"
            
        },
        
    });

function UserCategory() {

const classes = useStyles();
const[category,setCategory] = useState([]);
const[page,setPage] = useState(false);
const [id,setId]= useState(0)
const [cookies, setCookie] = useCookies(['categoryid']);

useEffect(() => {
//localStorage.removeItem('createId');
getUserCategory();
}, [])

// this function use for Api data

const  getUserCategory = async () => {   
    const options = {
    method: 'Get',
    }
    const result = await services.getUserCategory(options)
    setCategory(result.data.data)
};

// this function use for save category Id in local storage and cookie
const handleClick =(id)=>{
    localStorage.setItem('categoryId', JSON.stringify(id)); 
    setId(id)
    setPage(true);
    setCookie('categoryId', id, { path: '/' });
}

if(page) { return <Redirect to={{pathname:"/form",state:{id:{id}}}} push={true}/>

}
return (
<>
    {
        category.length? 
            <Grid container className={classes.gridContainer} justify="center">
                <Grid item xs={12} sm={6} md={3}>
                    <h3 className="choose1">Choose your</h3>
                    <h3 className="choose2">Category</h3>
                </Grid>
                    {
                        category.map((list,index)=>{
                            return(  
                            <Grid container justify="center" className={classes.grid} key= {index}>
                                {
                                 list.status=== "active"?
                                    <Grid item xs={12} sm={7} md={6}lg={3} >
                                        <Card className="card" key={index} onClick={()=>{handleClick(list.categoryId,list.title)}} >
                                            <div>  
                                                <Grid container>
                                                    <Grid item xs={4} sm={4} md={3}lg={3} className="img-card" >
                                                      <img className="cardImg" src={list.image}/>
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
                                  :null
                                }
                            </Grid>
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

export default UserCategory;

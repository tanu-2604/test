import React,{useEffect,useState} from "react";
import Cards from "../../control/Cards";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import services from "../../services/services";

const useStyles = makeStyles({
  gridContainer: {
    paddingLeft: "40px",
    paddingRight: "40px"
  }
});

export default function CardGroup() {
  const classes = useStyles();
  const[category,setCategory] = useState([])
  const data = JSON.parse(localStorage.getItem('friend'));
  const jwt = data['jwt'];
  useEffect(() => {
       getAllCategory();
  }, [])

  const  getAllCategory = async () => {
      const options = {
          method: 'Get',
          headers: {
              "Apiuserid": "49507884",
              "Scope": "In.QuizApp.READ",
              "Authorization": `quizApp-oauthtoken ${jwt}`,
          }
      }
      const result = await services.getAllCategory(options)
      console.log(result)
      setCategory(result.data.data)
  };
  return (
    <Grid
      container
      spacing={4}
      className={classes.gridContainer}
      justify="center"
    >
      {
        category.map((list) =>{

         return(
          <Grid item xs={12} sm={6} md={4}>
          <Cards category={list} />
            </Grid>
         ) 
         })
      }
    </Grid>
  );
}

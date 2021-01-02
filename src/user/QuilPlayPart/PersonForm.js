import React, { useState, useEffect } from 'react';
import '../style/personform.css';
import { Grid, Card } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Footer from '../footer/Footer';
import { withCookies, Cookies, useCookies } from 'react-cookie';
import { useHistory, useParams } from 'react-router-dom';
import services from '../../services/services';
import { Helmet } from 'react-helmet';
import MetaTags from 'react-meta-tags';

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    paddingLeft: "20px",
    paddingRight: "20px",
    background: "#7555D9",
    minHeight: "100vh"
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  list: {
    margin: "25px auto",
    textAlign: "center"
  },
  add: {
    width: "100%"
  },
  card: {
    marginTop: "60px"
  },
  banner: {
    maxHeight: "238px",
    width: "100%",
    margin: "0 auto",
  }

}));

function PersonForm(props) {
  const classes = useStyles();
  const { id } = useParams()
  const history = useHistory()
  const [data, setData] = useState(false);
  const [cookies, setCookie] = useCookies(['userInfo']);
  const [quiz, setQuiz] = useState([])


  useEffect(() => {
    getQuiz();
  }, [])

  const getQuiz = async () => {
    const data = {
      quizSlug: id
    }
    const options = {
      method: 'Post',
      headers: {
        "Apiuserid": "49507884",
        "Scope": "In.QuizApp.READ",
      }
    }
    const result = await services.getQuiz(data, options);
    document.title = result.data.data[0].title;  
    document.getElementsByTagName("META")[1].content = result.data.data[0].title;
    document.getElementsByTagName("META")[2].content = result.data.data[0].image_base_path + result.data.data[0].bannerImage;
    setQuiz(result.data.data[0])
  };
  const handleSubmit = () => {
    var name = document.getElementById("name").value;

    if ((name == "") || (name == null) || (name.length <= 2)) {
      alert("please enter required name");
    }

    else {
      var data = {
        name: name
      }
      localStorage.setItem("userInfo", JSON.stringify(data));
      setCookie("userInfo", JSON.stringify(data));
      history.push({ pathname: "/quiz", state: { slug: { id } } });
    }

  }
  return (
    <>
      <div className={classes.gridContainer}>
        <Grid container>
          <Grid item xs>
            <Helmet>
              <title>{quiz.title}</title>
              {/* <meta property="og:image" content={quiz.bannerImage} /> */}

            </Helmet>

            {/* <MetaTags>
            <title>{quiz.title}</title>
            <meta name="description" content="Some description." />
            <meta property="og:title" content={quiz.title} />
            <meta property="og:type" content="article" />
            <meta property="og:image" content={quiz.bannerImage}/>
          </MetaTags> */}
          </Grid>
          <Grid item xs={11} sm={6} md={6} lg={4} className={classes.card} >
            <Card className="quiz-card">
              <div className={classes.head}>
                <h3 className="quiztext">{quiz.title}</h3>
                {
                  quiz.bannerImage ? <img className={classes.banner} src={`${quiz.image_base_path}/${quiz.bannerImage}`} /> : null
                }
              </div>
              <h3 className="personname">What is Your Name</h3>
              <input type="text" id="name" className="formname" placeholder="Enter Your Name" required /><br />
              <div className="start-wrapper">
                <button className="started" onClick={handleSubmit}> Start</button>
              </div>
            </Card>
          </Grid>
          <Grid item xs></Grid>
        </Grid>
        <br />
        <Grid container>
          <Grid item xs></Grid>
          <Grid item className={classes.list} xs={11} sm={6} md={6} lg={4}>
            <a href="#">
              <img src="/assets/image/Image5.png" className={classes.add} />
            </a>
          </Grid>
          <Grid item xs></Grid>
        </Grid>

        <Footer />
      </div>

    </>
  );
}

export default PersonForm

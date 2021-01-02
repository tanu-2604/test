import React, { useState, useEffect } from 'react'
import '../style/friendlink.css'
import { Grid, Card } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useParams, Redirect, useHistory } from 'react-router-dom';
import services from '../../services/services';
import Footer from '../footer/Footer';
import { Helmet } from 'react-helmet';



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
    head: {
        textAlign: "center"
    },
    list: {
        margin: "25px auto",
        textAlign: "center"
    },
    add: {
        width: "100%"
    },
    page:{
   marginTop:"45px"
    }


}));

function FriendLink() {
    const classes = useStyles();
    const history = useHistory()
    const [quiz, setQuiz] = useState([])
    const [list, setList] = useState({})
    const [right, setRight] = useState(false)
    const [loader, setLoader] = useState(false)
    var { id } = useParams();
    useEffect(() => {
        if (localStorage.getItem('createId') != null) {
            var jsondata = JSON.parse(localStorage.getItem('createId'))
            jsondata.map(item => {

                console.log(item, typeof item)
                if (item === id) {
                    history.push({ pathname: "/sharelink", state: { quizId: id } });
                }

            });
        }
        getAdminQuiz();
    }, [])

    const getAdminQuiz = async () => {
        const data = {
            quizId: id
        }
        const options = {
            method: 'GET',
            headers: {
                "Apiuserid": "49507884",
                "Scope": "In.QuizApp.READ",

            }
        }
        const result = await services.getAdminQuiz(data, options)
        console.log(result.data.data)
        setQuiz(result.data.data)
        setList(result.data.data.quizQuestions)

    };
    const playby = () => {
        var name = document.getElementById("feedbackBy").value;
        if ((name == "") || (name == null) || (name.length <= 2)) {
            alert("please enter required name");
            return true;
        }
        else {
            localStorage.setItem("feedbackby", name);
            setRight(true)
        }

    }
    if (right) {
        return (<Redirect to={{
            pathname: '/quizlink',
            state: { quizQuestions: quiz }
        }} push={true} />)
    }
    return (
        <>
            
            <div className={classes.gridContainer}>
                <Grid container>
                    <Grid item xs></Grid>
                    {quiz?.category &&
                    <>
                      <Helmet>
                      <title>{quiz.categoryData.title}</title>
                                  <meta property='og:title' content={document.title} />
                              </Helmet>
                        <Grid item xs={11} sm={6} md={6} lg={4} className={classes.page}>
                            <div justify="center" className={classes.head}>
                                <h3 className="dare">{quiz.categoryData.title}</h3>
                            </div>
                            <Card className="form-card">
                                <h3 className="how">How well do you know {quiz.createdBy}?</h3>
                                <h4 className="First">Name</h4>
                                <input type="text" id="feedbackBy" className="name" placeholder="Enter Your Name" />
                                <br />
                                <div className="friendStart">
                                    <button className="started" onClick={playby}> Start</button>
                                </div>
                            </Card>
                        </Grid>
                        </>
                    }
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

export default FriendLink

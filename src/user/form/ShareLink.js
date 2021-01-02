import React, { useState, useRef, useEffect } from 'react'
import '../style/sharelink.css'
import { Grid, Card, Popover, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import services from '../../services/services';
import InstaModel from './InstaModel';
import Footer from '../footer/Footer';
import { ToastsContainer, ToastsStore, ToastsContainerPosition } from 'react-toasts';
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
  grid: {
    position: "relative"
  },
  typography: {
    padding: "10px",
    color: "green",
    fontSize: "15px",
    border: "none"
  },

}));

function ShareLink(props) {

  const id = props.location.state.quizId
  const classes = useStyles();
  const [allResult, setAllResult] = useState([])
  const [open, setOpen] = useState(false);
  const createId = JSON.parse(localStorage.getItem('createId'));
  var dataId = createId.pop();
  const [title, setTitle] = useState({})
  var categoryId = JSON.parse(localStorage.getItem("categoryId"));

  useEffect(() => {
    getCategory();
    getCreaterResult();
    console.log(document.title);
  }, [])

  const getCategory = async () => {
    const categoryData = {
      categoryId: categoryId
    }

    const options = {
      method: 'POST',
      headers: {
        "Apiuserid": "49507884",
        "Scope": "In.QuizApp.READ",
      }
    }
    const result = await services.getCategory(categoryData, options)
    setTitle(result.data.data)
  };

  const textAreaRef = useRef(null);
  function copyToClipboard(e) {
    textAreaRef.current.select();
    document.execCommand('copy');
    e.target.focus();
    ToastsStore.success("Copied SuccessFully")
  };

  const getCreaterResult = async () => {
    const dataid = {
      quizId: dataId,
    }
    const options = {
      method: 'POST',
      headers: {
        "Apiuserid": "49507884",
        "Scope": "In.QuizApp.Read",
      }
    }
    const result = await services.getCreaterResult(dataid, options)
    setAllResult(result.data.data)
  }
  const refresh = () => {
    window.location.reload();
  }

  return (
    <>
      <Helmet
        title={title.title}
        meta={[
          { name: 'twitter:site', content: "WeBestFriends" },
          { name: 'twitter:creator', content: "WeBestFriends" },
          { name: 'twitter:title', content: title.title },
          { name: 'twitter:image', content: title.image },
          { property: 'og:title', content: document.title },
          { property: 'og:description', content: title.title },
          { property: 'og:image', content: title.image },
        ]}
      />
      <div className={classes.gridContainer}>
        <Grid container className={classes.grid}>
          <Grid item xs></Grid>
          <Grid item xs={11} sm={6} md={6} lg={4} >
            <div justify="center" className={classes.head}>
              <h3 className="title">{title.title}</h3>
            </div>
            <Card className="form-card">
              <div className="sharelink">
                <h3 className="challenge">Your Challenge is ready</h3>
                <img src="/assets/image/friend.svg" />
                <h3 className="this-link">Share this link with your friends</h3>
                <input ref={textAreaRef} className="quizInput" defaultValue={`https://webestfriends.com/friendlink/${id}`} />
                <br />
              </div>
              <div className="btn-wrapper">
                <button onClick={copyToClipboard} className="copy"> Copy Link</button>
                <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.TOP_CENTER} />
              </div>
              <div className="btn-list">
                <button className="whatsapp">
                  <a href={`whatsapp://send?text=https://webestfriends.com/friendlink/${id}`} className="status">
                    <img src="/assets/image/whatsapp.png" className="whatsapp-img" /><span className="status">WhatsApp Status</span>
                  </a>
                </button>
                <button className="instagram" onClick={() => setOpen(true)}>
                  <img src="/assets/image/instagram.png" className="instagram-img" /><span className="instagram-status">Add to Instagram Bio</span>
                </button>
                {/* <button className="sharing">
                                <a href="#">
                                  <img src="/assets/image/sharing.svg"className="sharing-img" /><span className="status">Share</span>
                                </a>
                          </button>        */}
              </div>
              <div className="result-wrapper">
                <button className="result" onClick={refresh}> View Results</button>
              </div>
              {allResult?.length ?
                <>
                  <div className="sharelink">
                    <h3 className="challenge">Who knows you the best:</h3>
                  </div>
                  <Grid container justify="center">
                    <table className="table-data sharetable">
                      <thead>
                        <tr>
                          <th className="shareth">Name</th>
                          <th className="shareth">Score</th>
                        </tr>
                      </thead>
                      {
                        allResult?.map((tabledata) => {
                          return (
                            <tbody>
                              <tr>
                                <td className="sharetd">{tabledata.feedbackBy}</td>
                                <td className="sharetd">{tabledata.score}</td>
                              </tr>
                            </tbody>
                          )
                        })
                      }
                    </table>
                  </Grid>
                </> : null
              }
              <Grid item xs> </Grid>
            </Card>
          </Grid>
          <Grid item xs>

          </Grid>
        </Grid>
        <InstaModel open={open}
          setOpen={setOpen}
        />
        <Footer />
      </div>

    </>
  );
}

export default ShareLink

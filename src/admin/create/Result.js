import { IconButton } from '@material-ui/core'
import { VisibilitySharp } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import  Table  from 'react-bootstrap/Table';
import { Link, useParams } from 'react-router-dom';
import services from '../../services/services';
import AdminLink from '../management/AdminLinks';
import "./result.css"

function Result() {
    const {id}=useParams();
    const[tableData,setTableData]=useState([])
    const data = JSON.parse(localStorage.getItem('friend'));
    const jwt = data['jwt'];
    useEffect(() => {
        getAllResults();
    }, [])
  
    const getAllResults = async () => {
         const data={
           quizId:id
         }
        const options = {
            method: 'Post',
            headers: {
                "Apiuserid": "49507884",
                "Scope": "In.QuizApp.READ",
                "Authorization": `quizApp-oauthtoken ${jwt}`,
            }
        }
        const result = await services.getAllResults(data,options)
        setTableData(result.data.data)
    };
    return (
        <>
            <AdminLink/>
                    <div className="detailView1">
                    <div style={{width:"100%"}}>
                       <div className="cardTable">
                          <table className="viewtable">
                                 <thead>
                                  <tr>
                                      <th>ID</th>
                                      <th>Player Name</th>
                                      <th>Played At</th>
                                      <th>Score</th>
                                      <th>View</th>
                                  </tr>
                                  </thead>
                                  <tbody>
                                  {
               tableData.map((tdata,index)=>{
                   return(
                                  <tr>
                   <td>{tdata.resultId}</td>
                   <td>{tdata.playerName}</td>
                                      <td>{tdata.createDate}</td>
                   <td>{tdata.score}</td>
                                      <td>
                                          <Link to={`/playeranswer/${tdata.resultId}`}>
                                          <IconButton>
                                              <VisibilitySharp/>
                                          </IconButton>
                                          </Link>
                                      </td>
                                  </tr>
                                   )
                                })
                            }
                              </tbody>
                          </table>
                       </div>
                    </div>
                  </div>
            
        </>
    )
}

export default Result

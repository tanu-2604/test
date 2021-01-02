import React, { useState,useEffect } from 'react'
import services from '../../services/services';
import QuestionList from './QuestionList';
import { withCookies, Cookies } from 'react-cookie';

function QuestionApi() {
   const [question,setQuestion]=useState([])
   const [limit,setLimit]=useState([])
   const cookies = new Cookies();
   var categoryId
    if(localStorage.getItem("categoryId"))
    {
     categoryId = JSON.parse(localStorage.getItem("categoryId"));
    }
    else{
        categoryId=JSON.parse(cookies.get('categoryId'));
    }
    useEffect(() => {
        getQuestionlist();
    }, [])

    const getQuestionlist = async () => {
        const data={
            categoryId:categoryId
        }
   
        const options = {
            method: 'POST',
            headers: {
                "Apiuserid": "49507884",
                "Scope": "In.QuizApp.READ",   

            }
        }
        const result = await services.getQuestionlist(data,options)
        console.log(result)
        setLimit(result.data.limit)
        setQuestion(result.data.data)
    };

    return (
        <div>
            {
             question?.length &&
                <QuestionList questionlist={question} limit={limit} /> 
            }
                    
        </div>
    )
}

export default QuestionApi;

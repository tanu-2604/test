import React, { useEffect, useState } from 'react';
import services from '../../services/services';
import PlayQuizPart from './PlayQuizPart';


function PlayQuizPartApi(props) {
   const slug=props.location.state.slug.id;
   const [quiz,setQuiz]=useState([])
   const [que,setQue]=useState([])
  
   useEffect(() => {
       getQuiz();
   }, [])
 
   const getQuiz = async () => {
        const data={
          quizSlug:slug
        }
       const options = {
           method: 'Post',
           headers: {
               "Apiuserid": "49507884",
               "Scope": "In.QuizApp.READ",
           }
       }
       const result = await services.getQuiz(data,options)
       setQuiz(result.data.data)
       setQue(JSON.parse(result.data.data[0].questionData))
   };
 
   

    return (
        <div>
            {
                 que?.length &&
               <PlayQuizPart quizdata={quiz} que={que}/>
            }
               
        </div>
    )
}

export default PlayQuizPartApi

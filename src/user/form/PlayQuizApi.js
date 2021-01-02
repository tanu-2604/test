import React from 'react';
import PlayQuiz from './PlayQuiz';

function PlayQuizApi(props) {
   const playQuizlist=props.location.state.quizQuestions.quizQuestion;
   const createdBy=props.location.state.quizQuestions.createdBy;
   const quizId=props.location.state.quizQuestions.quizId;
   const category=props.location.state.quizQuestions.category;

    return (
        <div>
            {
                 playQuizlist?.length &&
               <PlayQuiz quizlist={playQuizlist} quizId={quizId} createdBy={createdBy} category={category} />
            }
               
        </div>
    )
}

export default PlayQuizApi

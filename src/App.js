import React,{browserHistory } from 'react';
import './App.css';
import Login from './admin/login/Login';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import User from './admin/management/User';
import Category from './admin/category/Category';
import Protected from './services/Protected'
import Question from './admin/question/Question';
import UserCategory from './user/category/UserCategory'
import  Form from './user/form/Form';
import ShareLink from './user/form/ShareLink';
import FriendLink from './user/form/FriendLink';
import Score from './user/form/Score';
import Gmail from './user/form/Gmail';
import PlayQuizApi from './user/form/PlayQuizApi';
import Privacy from './user/form/Privacy';
import Discliamer from './user/form/Discliamer';
import QuestionApi from './user/question/QuestionApi';
import AllQuestionList from './admin/question/AllQuestionList';
import CreateQuiz from './admin/create/CreateQuiz';
import Quizlist from './admin/create/Quizlist';
import View from './admin/create/View';
import Result from './admin/create/Result';
import ViewAns from './admin/create/ViewAns';
import EditQuiz from './admin/create/EditQuiz';
import QuizCategory from './user/category/QuizCategory';
import PersonForm from './user/QuilPlayPart/PersonForm';
import PlayQuizPartApi from './user/QuilPlayPart/PlayQuizPartApi';
import QuizScore from './user/QuilPlayPart/QuizScore';
function App() {
  return (
    <>
    
      <Router history={browserHistory}>
        <Switch>
          {/* admin part  */}
           <Route path="/login"exact component={Login}/>
           <Protected path="/usermanagement" exact component={User}/>
           <Protected path="/category" exact component={Category}/>
           <Protected path="/question" exact component={Question}/>
           <Protected path="/createQuiz" exact component={CreateQuiz}/>
           <Protected path="/quizlist" exact component={Quizlist}/>
           <Protected path="/editQuiz/:id" exact component={EditQuiz}/>
           <Protected path="/view/:id" exact component={View}/>
           <Protected path="/result/:id" exact component={Result}/>
           <Protected path="/playeranswer/:id" exact component={ViewAns}/>
           <Protected path="/allquestionlist/:id" exact component={AllQuestionList} />
             {/* this part is category with question */}
           <Route path="/" exact component={UserCategory}/>
           <Route path="/form" exact component={Form}/> 
           <Route path="/questionlist" exact component={QuestionApi}/>
           <Route path="/sharelink" exact component={ShareLink}/>
           <Route path="/quizlink" exact component={PlayQuizApi}/>
           <Route path="/friendlink/:id" exact component={FriendLink}/>
           <Route path="/score" exact component={Score}/>
           {/* this part is direct quiz part to play */}
           <Route path="/quizcategory" exact component={QuizCategory}/>
           <Route path="/quizform/:id" exact component={PersonForm}/> 
           <Route path="/quiz" exact component={PlayQuizPartApi}/>
           <Route path="/quizscore" exact component={QuizScore}/>
            {/* footer part */}
           <Route path="/contact" exact component={Gmail}/>
           <Route path="/privacy" exact component={Privacy}/>
           <Route path="/disclaimer" exact component={Discliamer}/>
           </Switch>
      </Router>
      
    </>
  );
}

export default App;

import React from 'react';
import { Redirect, Route, useParams } from 'react-router-dom';


const Restricted = ({ component: Cmp, ...rest }) => {
    const {id}= useParams()
   console.log(id)
    
       return(
        <Route
        {...rest}
        render={(props) =>
            localStorage.getItem('createId')
                ? <Redirect to="/sharelink"/>
                :(<Cmp {...props} />)
        }
    />
       )
   
    }
export default Restricted;
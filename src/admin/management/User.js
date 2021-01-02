import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import './User.css'
import AdminLink from './AdminLinks';
import UserList from './UserList';

const useStyles= makeStyles((theme)=>({
    root:{
        marginTop:"80px"
    },
    
}))

function User() {
    const classes = useStyles();
   
    return (
            <>      
                <AdminLink/>
                 <UserList/>
            </>
    )
}

export default User;

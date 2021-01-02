import React, { useState, useEffect } from 'react'
import services from '../../services/services';
import UserTable from './UserTable';

function UserList() {
    const [user, setUser] = useState([]);
    const data = JSON.parse(localStorage.getItem('friend'));
    const jwt = data['jwt'];
    useEffect(() => {
        getUser();
    }, [])

    const getUser = async () => {
        const options = {
            method: 'GET',
            headers: {
                "Apiuserid": "49507884",
                "Scope": "In.QuizApp.READ",
                "Authorization": `quizApp-oauthtoken ${jwt}`,
            }
        }
        const result = await services.getUser(options)
        setUser(result.data.data)
    };

    return (
        <>

            {
                user?.length &&
                <UserTable list={user} updateUsers={getUser} />
            }

        </>
    )
}

export default UserList

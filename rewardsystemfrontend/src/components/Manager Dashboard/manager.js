import React from 'react'
import AdminHeader from '../Header/AdminHeader'
import { useEffect } from 'react'
import { isAuthenticated } from '../../Authen'
import { useHistory } from 'react-router'


const Manager=() =>{

    const history = useHistory();
    useEffect(() => {
        if (isAuthenticated() && isAuthenticated().designation === "Manager") {
            console.log("I am a Admin");
            history.push('/Manager')
          } else{
              history.push('/')
          }
    }, [history])



    return (<>
<AdminHeader/>
        <div>
            <h1>You are logged in as Manager</h1>
        </div></>
    )
}

export default Manager;
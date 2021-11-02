import React, {useEffect} from 'react'
import AdminHeader from '../Header/AdminHeader'
import { useHistory } from 'react-router';
import { isAuthenticated } from '../../Authen';



const Employee=() =>{
    const history = useHistory();

    useEffect(() => {
        if (isAuthenticated() && (isAuthenticated().designation === "Employee" || isAuthenticated().designation === "Team Lead")) {
            console.log("I am a Employee");
            history.push('/Employee')
          } else{
              history.push('/')
          }
    }, [history])


    return (<>
        <AdminHeader/>
        <div>
            <h1>You are as Emp</h1>
        </div></>
    )
}

export default Employee

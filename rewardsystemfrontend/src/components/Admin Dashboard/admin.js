import React ,{useEffect}from 'react'
import AdminHeader from '../Header/AdminHeader'
import { useHistory } from 'react-router';
import { isAuthenticated } from '../../Authen';



const Admin=() =>{
    const history = useHistory();
    // const context = useContext(contextValue);
  
  useEffect(() => {
      if (isAuthenticated() && isAuthenticated().designation === "Admin") {
          console.log("I am a Admin");
          history.push('/admin')
        } else{
            history.push('/')
        }
  }, [history])


    return (
        <>
        <AdminHeader/>
      
        <div>
            <p>You are on admin Page</p>
        </div>
        </>
    )
}

export default Admin

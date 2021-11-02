import { getLocalStorage, setLocalStorage, deleteLocalStorage } from "./localstorage"
import { setCookies,getCookie,deleteCookie } from "./cookies";


export const setAuthentification = (token, user) => {
    setCookies("token", token);
    setLocalStorage("user", user);
  };

 export const isAuthenticated = () => {
    if (getCookie("token") && getLocalStorage("user")) {
      return getLocalStorage("user");
    } else {
      return false;
    }
  };

  export const Logout=(next)=>{  
deleteCookie('token');
deleteLocalStorage('user')

next()
  }
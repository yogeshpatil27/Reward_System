import "./App.css";
import "react-bootstrap";
import Login from "./components/Login/login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Register from "./components/Admin Dashboard/register";
import Manager from "./components/Manager Dashboard/manager";
import Admin from "./components/Admin Dashboard/admin";
import { isAuthenticated } from "./Authen";
import Employee from "./components/All Employee Dashboard/Employee";
import PageNotFound from "./components/PageNotFount/PageNotFound";
import EmployeeDetails from "./components/Admin Dashboard/EmployeeDetails";
import Edituser from "./components/Admin Dashboard/edituser";


function App() {
  return (
    <div>
      <header>
        <Router>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/Admin" component={Admin} />
            <Route path="/Register" component={Register} />
            <Route path="/Manager" component={Manager} />
            <Route path="/Employee" component={Employee} />
            <Route path="/EmployeeDetails" component={EmployeeDetails} />  
            <Route path="/edit/:id" component={Edituser} />           
            <Route component={PageNotFound} />
          </Switch>
        </Router>
      </header>
    </div>
  );
}

export default App;

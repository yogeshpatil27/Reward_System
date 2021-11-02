import React from "react";
import "./AdminHeader.css";
import { Logout } from "../../Authen";
import { useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
//import { Nav, Navbar, Container } from "react-bootstrap";
//import Button from "@restart/ui/esm/Button";
import { isAuthenticated } from "../../Authen";
import styled from 'styled-components';
import Register from "../Admin Dashboard/register";

const AdminHeader = () => {


const Container = styled.div`
height: 60px;
border: none;
align-items:center;
background-color:teal;
color:white;
`

const Wrapper=styled.div`
padding: 20px 20px;
display:flex;
align-items:center;
;
`

const Left=styled.div`
flex:1;

display:flex;
justify-content:flex-start;
`
const AppName=styled.div`
font-weight:bold;
font-size:18px;
`

const RegisterempLink=styled.button`
margin-left:15px;
cursor: pointer;
border:none;
background-color:teal;
color:white;
`

const EmployeeDetails=styled.div`
margin-left:15px;
border:none;
cursor: pointer;
background-color:teal;
color:white;`

const Right=styled.div`
flex:1
justify-content:end
`

const LogoutButton=styled.button`
border:none;
margin-right:50px;
width:20px;
justify-content:end;
cursor: pointer;
background-color:teal;
color:white;
`


  const history = useHistory();
  const HandleLogout = () => {
    Logout(() => {
      history.push("/");
    });
  };



  return (

    <>
      {isAuthenticated() && isAuthenticated().designation === "Admin" && (
<Container>
            <Wrapper>
              <Left>
                <AppName>Award System</AppName>
                <RegisterempLink onClick={()=>{  history.push("/Register")}}>Register Employee</RegisterempLink>
                <EmployeeDetails onClick={()=>{  history.push("/EmployeeDetails")}}>Employee Details</EmployeeDetails>
              </Left>
              <Right>
              <LogoutButton onClick={HandleLogout}>Logout</LogoutButton>
          </Right>
            </Wrapper>
        </Container>

)}

{isAuthenticated() && isAuthenticated().designation === "Manager" && (
<Container>
            <Wrapper>
              <Left>
                <AppName>Award System</AppName>
                <EmployeeDetails>Employee Details</EmployeeDetails>
              </Left>
              <Right>
              <LogoutButton onClick={HandleLogout}>Logout</LogoutButton>
          </Right>
            </Wrapper>
        </Container>
)}




{isAuthenticated() && (isAuthenticated().designation === "Employee"|| isAuthenticated().designation === "Team Lead") && (
<Container>
            <Wrapper>
              <Left>
                <AppName>Award System</AppName>
              </Left>
              <Right>
              <LogoutButton onClick={HandleLogout}>Logout</LogoutButton>
          </Right>
            </Wrapper>
        </Container>

)}







{/* <Navbar bg="dark" variant="dark">
            <Container>
              <Navbar.Brand href="#home">Admin</Navbar.Brand>
              <Nav className="me-auto">
                <Nav.Link href="#home">News Feed</Nav.Link>
                <Nav.Link href="/Register">Register Employee</Nav.Link>
              </Nav>
              <Button variant="dark" onClick={HandleLogout}>
                Logout
              </Button>
            </Container>
          </Navbar> */}



      {/* {isAuthenticated() && isAuthenticated().designation === "Admin" && (
        <div className="Adminhead">
          <Navbar bg="dark" variant="dark">
            <Container>
              <Navbar.Brand href="#home">Admin</Navbar.Brand>
              <Nav className="me-auto">
                <Nav.Link href="/Admin">News Feed</Nav.Link>
                <Nav.Link href="/Register">Register Employee</Nav.Link>
                <Nav.Link href="/EmployeeDetails">Employee Details</Nav.Link>
              </Nav>
              <Button onClick={HandleLogout}>
                Logout
              </Button>
            </Container>
          </Navbar>
        </div>
      )} */}
{/* 
      {isAuthenticated() && isAuthenticated().designation === "Manager" && (
        <div className="Adminhead">
          <Navbar bg="dark" variant="dark">
            <Container>
              <Navbar.Brand href="#home">Manager</Navbar.Brand>
              <Nav className="me-auto">
                <Nav.Link href="/Manager">News Feed</Nav.Link>
                <Nav.Link href="">Nominate Employee</Nav.Link>
              </Nav>
              <Button variant="dark" onClick={HandleLogout}>
                Logout
              </Button>
            </Container>
          </Navbar>
        </div>
      )}

      {isAuthenticated() && (isAuthenticated().designation === "Employee"|| isAuthenticated().designation === "Team Lead") && (
        <div className="Adminhead">
          <Navbar bg="dark" variant="dark">
            <Container>
              <Navbar.Brand href="#home">Employee</Navbar.Brand>
              <Nav className="me-auto">
                <Nav.Link href="/Employee">News Feed</Nav.Link>
                <Nav.Link href=""></Nav.Link>
              </Nav>
              <Button variant="dark" onClick={HandleLogout}>
                Logout
              </Button>
            </Container>
          </Navbar>
        </div>
      )} */}

    </>
  );
};

export default AdminHeader;

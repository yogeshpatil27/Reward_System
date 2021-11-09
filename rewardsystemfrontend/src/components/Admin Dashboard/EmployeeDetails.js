import React, { useEffect, useState } from "react";
import AdminHeader from "../Header/AdminHeader";
import { useHistory } from "react-router";
import { isAuthenticated } from "../../Authen";
import axios from "axios";
import { Table, Container, Button } from "react-bootstrap";
import styled from "styled-components";
import "./EmployeeDetails.css";
import { Link } from "react-router-dom";
import { getDropdownMenuPlacement } from "react-bootstrap/esm/DropdownMenu";

const EmployeeDetails = () => {
  const history = useHistory();

  useEffect(() => {
    if (isAuthenticated() && isAuthenticated().designation === "Admin") {
      console.log("I am a Admin");
      history.push("/EmployeeDetails");
    } else {
      history.push("/");
    }
  }, [history]);

  const [empDetails, setEmpDetail] = useState([]);

  const getEmp = async () => {
    try {
      const res = await axios.get(`http://localhost:9009/employees`);
      console.log(res.data);
      setEmpDetail(res.data);
    } catch (err) {
      console.log("Error while loading Table");
    }
  };

  useEffect(() => {
    getEmp();
  }, []);

  const DeleteEmployee = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:9009/employees/${id}`);
      console.log(res);
      getEmp();
    } catch (err) {
      console.log("Error while Deleting from Table");
    }
  };

  return (
    <>
      <AdminHeader />
      <div>
        <br />
        <Container>
          <Table className="border shadow p-3 mb-5 bg-white rounded">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Designation</th>
                <th scope="col">Department</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {empDetails?.map((e, index) => {
                return (
                  <tr key={e._id}>
                    <td scope="row">{index + 1}</td>
                    <td scope="row">{e.name}</td>
                    <td scope="row">{e.email}</td>
                    <td scope="row">{e.designation}</td>
                    <td scope="row">{e.department}</td>
                    <td>
                      <button
                        className="Edit"
                        onClick={() => history.push(`/edit/${e._id}`)}
                        component={Link}
                        to={`/edit/${e._id}`}
                      >
                        Edit
                      </button>
                      <button
                        className="Delete"
                        onClick={() => DeleteEmployee(e._id)}
                      >
                       Active
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Container>
      </div>
    </>
  );
};

export default EmployeeDetails;

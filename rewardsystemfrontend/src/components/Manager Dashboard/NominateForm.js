import React, { useEffect, useState } from "react";
import { Grid, Container } from "@material-ui/core";
import Controls from "./controls/Controls";
import { useForm, Form } from "./useForm";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import "../Admin Dashboard/register.css";
import axios from "axios";
import { getLocalStorage } from "../../localstorage";
//import Select from '@material-ui/core/Select';
//import MenuText from '@material-ui/core/MenuText';
//import { Select as  MenuItem,  } from '@material-ui/core';
//import Select from 'react-select'
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import isEmpty from "validator/es/lib/isEmpty";

const NominateForm = (props) => {
  const [CriteriaSelected, setCriteriaSelected] = useState([]);
  const loggeduser = getLocalStorage("user");
  const [praises, setPraises] = useState("");
  const { id } = useParams();
  const [values, setValues] = useState();
  const [getEmDetails, setEmpDetails] = useState([]);
  const [errors, setErrors] = useState({});

  const criterias = [
    "Client appreciation",
    "Team Player",
    "Timely leaves",
    "Added work to company",
    "Asset for company",
  ];

  useEffect(async () => {
    await axios.get("http://localhost:9009/employees/" + id).then((res) => {
      // console.log("res", res);
      setEmpDetails(res?.data?.[0]);
    });
  }, [id]);

  const handleChange = (event) => {
    setCriteriaSelected(event.target.value);
  };

  const handlePraise = (e) => {
    setPraises(e.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const history = useHistory();


  const initialFValues = {
    _id: getEmDetails._id,
    fullName: getEmDetails.name,
    designation: getEmDetails.designation,
    nominatedBy: loggeduser.name,
    criteria: CriteriaSelected,
    department: getEmDetails.department,
    praise: praises,
  };

  // const validate = (fieldValues = values) => {
  //     let temp = { ...errors }
  //     if ('fullName' in fieldValues)
  //         temp.fullName = fieldValues.fullName !== 0 ? "" : "This field is required."
  //     if ('designation' in fieldValues)
  //         temp.designation = fieldValues.designation !== 0 ? "" : "This field is required."
  //     if ('nominatedBy' in fieldValues)
  //         temp.nominatedBy = fieldValues.nominatedBy ? "" : "This field is required."
  //     if ('criteria' in fieldValues)
  //         temp.criteria = fieldValues.criteria !==0  ? "" : "This field is required."
  //     if ('department' in fieldValues)
  //         temp.department = fieldValues.department !== 0 ? "" : "This field is required."
  //         if('praise' in fieldValues)
  //         temp.praise = fieldValues.praise.length !== 0 ? "" : "This field is required."
  //     setErrors({
  //         ...temp
  //     })

  //     if (fieldValues === values)
  //         return Object.values(temp).every(x => x === "")
  // }

  //   var SelectHandle=(e)=>{
  //     setSelected=(Array.isArray(e)?e.map(x=>x.value):[]);
  //    console.log (JSON.stringify(selected));
  //     }

  // const {
  //     values,
  //     // setValues,
  //     errors,
  //     setErrors,
  //     handleInputChange,
  //     // resetForm
  // } = useForm(initialFValues, true, validate);

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(initialFValues);

   await axios.post("http://localhost:9009/nominations", initialFValues).then((res) => {
        alert(res.data.message);
        // //            setLoginUser(res.data.user)
      });
      history.push("/ManagersEmpDetails");
    // if (validate()){
    //    alert("Nominatations successful")
    // resetForm()
    //}
  };

  return (
    <>
      <Container className="SetupForm">
        <Form onSubmit={handleSubmit}>
          <Grid container>
            <Grid item xs></Grid>
            <Grid item xs={6}>
              <Controls.Input
                name="fullName"
                label="Full Name"
                value={getEmDetails.name}
                onChange={handleInputChange}
                // error={errors.fullName}
              />
              <Controls.Input
                label="Designation"
                name="designation"
                value={getEmDetails.designation}
                onChange={handleInputChange}
                // error={errors.designation}
              />
              <Controls.Input
                label="NominatedBy"
                name="nominatedBy"
                value={loggeduser.name}
                onChange={handleInputChange}
                // error={errors.nominatedBy}
              />
              {/* <Controls.Select
                    name="criteria"
                    label="Criteria" 
                    Multiple   
                    options={[
                        { id: '1', title: 'Client appreciation' },
                        { id: '2', title: 'Team Player' },
                        { id: '3', title: 'Timely leaves' },
                        { id: '4', title: 'Added work to company' },
                        { id: '5', title: 'Asset for company' }
                    ]}
                    error={errors.criteria}
                />  */}

              <FormControl>
                <InputLabel id="demo-mutiple-name-label">
                  Criteria Satisfied
                </InputLabel>
                <Select
                  name="criteria"
                  labelId="demo-mutiple-name-label"
                  id="demo-mutiple-name"
                  multiple
                  value={CriteriaSelected}
                  onChange={handleChange}
                  input={<Input />}
                >
                  {criterias.map((name) => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Working */}
              {/* 
  <Controls.Select
  name="criteria" 
  onChange={SelectHandle}
  label ="criteria" 
  isMulti
  options={[
    { value:'Client appreciation', label: 'Client appreciation' },
    { value:'Team Player', label: 'Team Player' },
    { value:'Timely leaves', label: 'Timely leaves' },
    { value:'Added work to company', label: 'Added work to company' },
    { value:'Asset for company', label: 'Asset for company' }
]}/> */}

              <Controls.Input
                name="department"
                label="Department"
                value={getEmDetails.department}
                onChange={handleInputChange}
                error={errors.department}
              />

              <Controls.Input
                name="praise"
                label="Praising Words"
                placeholder="Please write few words for Nominee"
                onChange={handlePraise}
              />

              <div>
                <Controls.Button type="submit" text="Submit" />
                <Controls.Button text="Draft" color="default" />
                <Controls.Button
                  type="cancel"
                  text="cancel"
                  color="secondary"
                  variant="outlined"
                  onClick={() => {
                    history.push("/ManagersEmpDetails");
                  }}
                />
              </div>
            </Grid>
            <Grid item xs></Grid>
          </Grid>
        </Form>
      </Container>
      <div>
        <p>{JSON.stringify(CriteriaSelected)}</p>
      </div>
    </>
  );
};

export default NominateForm;

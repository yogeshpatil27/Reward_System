import React, { useState, useEffect } from "react";
import { alpha } from "@material-ui/core/styles";
import { Grid, Container } from "@material-ui/core";
import Controls from "../Manager Dashboard/controls/Controls";
import { useForm, Form } from "../Manager Dashboard/useForm";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import "../Admin Dashboard/register.css";
import axios from "axios";
import { getLocalStorage } from "../../localstorage";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import isEmpty from "validator/es/lib/isEmpty";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import "date-fns";

const WinnerForm = (props) => {
  const history = useHistory();
  const { id } = useParams();
  const [Month, setAwardMonth] = useState([]);
  const [getNonimations, setNominations] = useState({});
  const [values, setValues] = useState();

  const currentDate = new Date();
  const [selectedDate, setSelectedDate] =
    (useState (new Date().toLocaleDateString("en-US")));

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleChange = (event) => {
    setAwardMonth(event.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  useEffect(() => {
    getNominationsbyID();
  }, []);

  const getNominationsbyID = async () => {
    await axios.get("http://localhost:9009/nominations/" + id).then((res) => {
      console.log("res", res);
      setNominations(res?.data?.[0]);
    });
    console.log("Getting Nomination by ID", getNonimations);
  };

  const initialFValues = {
    _id: getNonimations._id,
    fullName: getNonimations.fullName,
    designation: getNonimations.designation,
    nominatedBy: getNonimations.nominatedBy,
    department: getNonimations.department,
    Months: selectedDate,
  };

//   const Months = [
//     "January",
//     "February",
//     "March",
//     "April",
//     "May",
//     "June",
//     "July",
//     "August",
//     "September",
//     "October",
//     "November",
//     "December",
//   ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Values are", initialFValues);
      await axios.post("http://localhost:9009/winners", initialFValues).then((res) => {
        alert(res.data.message);
    // //            setLoginUser(res.data.user)
      });
     history.push("/admin");
    // if (validate()){
    //    alert("Nominatations successful")
    // resetForm()
    //}
  };
  return (
    <div>
      <>
        <Container className="SetupForm">
          <Form onSubmit={handleSubmit}>
            <Grid container>
              <Grid item xs></Grid>
              <Grid item xs={6}>
                <Controls.Input
                  name="fullName"
                  label="Full Name"
                  value={getNonimations.fullName}
                  onChange={handleInputChange}
                />
                <Controls.Input
                  name="department"
                  label="Department"
                  value={getNonimations.department}
                  onChange={handleInputChange}
                />
                <Controls.Input
                  label="Designation"
                  name="designation"
                  value={getNonimations.designation}
                  onChange={handleInputChange}
                />
                <Controls.Input
                  label="NominatedBy"
                  name="nominatedBy"
                  value={getNonimations.nominatedBy}
                  onChange={handleInputChange}
                />
                {/* <FormControl>
                  <InputLabel id="demo-mutiple-name-label">
                    Select Month
                  </InputLabel>
                  <Select
                    name="Months"
                    labelId="demo-mutiple-name-label"
                    id="demo-mutiple-name"
                    value={Month}
                    onChange={handleChange}
                    input={<Input />}
                  >
                    {Months.map((name) => (
                      <MenuItem key={name} value={name}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl> */}

                <div>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container justifyContent="space-around">
                      <DatePicker
                        variant="inline"
                        openTo="year"
                        views={["year", "month"]}
                        label="Year and Month"
                        helperText="Start from year selection"
                        value={selectedDate}
                        onChange={handleDateChange}
                      />
                    </Grid>
                  </MuiPickersUtilsProvider>
                </div>
                <div>
                  <Controls.Button type="submit" text="Submit" />
                  <Controls.Button
                    type="cancel"
                    text="cancel"
                    color="secondary"
                    variant="outlined"
                    onClick={() => {
                      history.push("/admin");
                    }}
                  />
                </div>
              </Grid>
              <Grid item xs></Grid>
            </Grid>
          </Form>
        </Container>
      </>
    </div>
  );
};

export default WinnerForm;

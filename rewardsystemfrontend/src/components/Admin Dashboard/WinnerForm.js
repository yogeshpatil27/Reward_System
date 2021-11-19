import React,{useState} from 'react'

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

const WinnerForm = () => {
    const history = useHistory();


    const [Month, setAwardMonth] = useState([]);

    const handleChange = (event) => {
        setAwardMonth(event.target.value);
      };
    const Months = [ "January","February","March", "April", "May","June","July","August","September","October","November","December"];
    return (
        <div>
           <>
      <Container className="SetupForm">
        <Form >
          <Grid container>
            <Grid item xs></Grid>
            <Grid item xs={6}>
              <Controls.Input
                name="fullName"
                label="Full Name"
              />
                     <Controls.Input
                label="email"
                name="email"
              />
               <Controls.Input
                name="department"
                label="Department"
               />
              <Controls.Input
                label="Designation"
                name="designation"
              />
           
              <Controls.Input
                label="NominatedBy"
                name="nominatedBy"
              />

              <FormControl>
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
              </FormControl>

             
              <div>
                <Controls.Button type="submit" text="Submit"/>
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
    )
}

export default WinnerForm

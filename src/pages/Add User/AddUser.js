// import {
//     Button,
//     Col,
//     Form,
//     Input,
//     Row,
//     Select,
//   } from 'antd';
//   import React, { useState } from 'react';
//   import { useHistory } from 'react-router-dom'
//   import axios from 'axios';

//   const AddUser = () => {
//     const [Name, setName] = useState();
//     const [Email, setEmail] = useState();
//     const [Cell, setCell] = useState();
//     const [Age, setAge] = useState();

//     const history = useHistory();

//     const AddUser = async(e) => {
//         e.preventDefault();
//         try {
//             const res = await axios.post("/user/add", {
//                 Name,
//                 Email,
//                 Cell,
//                 Age
//               });
//               console.log(res)
//               history.push('/user/view')
//         } catch (error) {

//         }
//     }
//     return (
//       <Row style={{ marginTop:50 }}>
//         <Col xs={2}></Col>
//         <Col xs={12}>
//         <Form
//         layout="vertical"
//       >
//         <Form.Item label="Name">
//           <Input onChange={(e) => setName(e.target.value)} />
//         </Form.Item>
//         <Form.Item label="Email">
//           <Input type='email' onChange={(e) => setEmail(e.target.value)} />
//         </Form.Item>
//         <Form.Item label="Cell Number">
//           <Input type='number' onChange={(e) => setCell(e.target.value)} />
//         </Form.Item>
//         <Form.Item label="Age">
//           <Input type='number' onChange={(e) => setAge(e.target.value)} min = {18} max = {60} />
//         </Form.Item>
//         <Form.Item>
//           <Button style={{ width: '100%', borderRadius: 15 }} size = "large" onClick={AddUser} type='primary'>Submit</Button>
//         </Form.Item>
//       </Form>
//         </Col>
//       </Row>
//     );
//   };

//   export default AddUser;

import React from "react";
import { Grid, styled } from "@mui/material";
import { useState } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import axios from "axios";
import { Alert, Snackbar } from "@mui/material";
import { useHistory } from "react-router-dom";
import { LoadingButton } from "@mui/lab";

const TextField = styled(TextValidator)(() => ({
  width: "100%",
  marginBottom: "16px",
}));

const AddUser = () => {
  const [state, setState] = useState({ date: new Date() });
  const [msg, setMsg] = useState();

  const history = useHistory();

  const handleSubmit = async() => {
    try {
      const res = await axios
      .post("/user/add", {
        Name,
        Email,
        Cell,
        Age,
      })
      setMsg(res.data.msg);
      if(res.data.msg === "User Added") {
        handleClick()
        history.push("/user/view");
      }
      else {
        handleClick1();
      }
    } catch (error) {
      console.log(error)
    }
  };

  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);

  function handleClick() {
    setOpen(true);
  }

  function handleClick1() {
    setOpen1(true);
  }
  function handleClose(_, reason) {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  }

  function handleClose1(_, reason) {
    if (reason === "clickaway") {
      return;
    }
    setOpen1(false);
  }

  const handleChange = (event) => {
    event.persist();
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const { Name, Email, Cell, Age } = state;

  return (
    <div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          sx={{ width: "100%" }}
          variant="filled"
        >
          {msg}
        </Alert>
      </Snackbar>
      <Snackbar open={open1} autoHideDuration={6000} onClose={handleClose1}>
        <Alert
          onClose={handleClose1}
          severity="error"
          sx={{ width: "100%" }}
          variant="filled"
        >
          {msg}
        </Alert>
      </Snackbar>
      <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
        <Grid container spacing={6}>
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 8 }}>
            <TextField
              type="text"
              name="Name"
              id="standard-basic"
              value={Name || ""}
              onChange={handleChange}
              errorMessages={["this field is required"]}
              label="Name"
              validators={[
                "required",
              ]}
            />

            <TextField
              type="email"
              name="Email"
              label="Email"
              onChange={handleChange}
              value={Email || ""}
              validators={["required", 'isEmail']}
              errorMessages={["this field is required", "Email is Not Valid"]}
            />

            <TextField
              type="number"
              name="Cell"
              label="Cell Number"
              value={Cell || ""}
              onChange={handleChange}
              validators={["required"]}
              errorMessages={["this field is required"]}
            />
            <TextField
              type="number"
              name="Age"
              onChange={handleChange}
              label="Age"
              value={Age || ""}
              validators={["required"]}
              errorMessages={["this field is required"]}
              min = {18}
              max = {60}
              InputProps={{
                inputProps: { 
                    max: 60, min: 18
                }
            }}
            />
            <LoadingButton
              type="submit"
              color="primary"
              variant="contained"
              sx={{ mb: 2, mt: 3 }}
              style={{ width: '100%' }}
            >
              Submit
            </LoadingButton>
          </Grid>
        </Grid>
      </ValidatorForm>
    </div>
  );
};

export default AddUser;

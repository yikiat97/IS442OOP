import * as React from "react";
import { Container, textAlign, spacing, Box } from "@mui/system";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";

import {
  FormControl,
  FormHelperText,
  Grid,
  Paper,
  TableRow,
  OutlinedInput,
  MenuItem,
  Button,
  Link,
  Select,
} from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { message } from "antd";

function EditCompanyDetails() {
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.info.dark,
      color: theme.palette.common.white,
      fontWeight: theme.typography.fontWeightBold,
      fontSize: 14,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 12,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.common.white,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const registrationNum = useParams().company;
  const currUser = sessionStorage.getItem("role");

  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [gstRegistrationNumber, setGstRegistrationNumber] = useState("");
  const [businessNature, setBusinessNature] = useState("");

  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [role, setRole] = useState("Vendor");
  const [deleted, setDeleted] = useState("");
  const [user, setUser] = useState();
  const password = "";

  const navigate = useNavigate();

  useEffect(() => {
    getUsers();
    getCompanyDetails();
  }, []);

  const cancel = (event) => {
    navigate("/UserManagement");
  };

  const getCompanyDetails = () => {
    axios
      .get(
        "http://localhost:8080/company/getDetails?registrationNum=" +
          registrationNum
      )
      .then((response) => {
        setName(response.data.name);
        setCountry(response.data.country);
        setGstRegistrationNumber(response.data.gstRegistrationNumber);
        setBusinessNature(response.data.businessNature);
      })
      .catch((error) => console.error(error));
  };

  const getUsers = () => {
    axios
      .get(
        "http://localhost:8080/login/getUsersByCompany?registrationNum=" +
          registrationNum
      )
      .then((response) => {
        setContactName(response.data[0].name);
        setEmail(response.data[0].email);
        setContactNumber(response.data[0].contactNumber);
        setRole(response.data[0].role);
        console.log(response.data[0].deleted === true ? "Yes" : "No")
        setDeleted(response.data[0].deleted === true ? "Yes" : "No");
      })
      .catch((error) => console.error(error));
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleCountryChange = (event) => {
    setCountry(event.target.value);
  };

  const handleGSTRegistratioNumberChange = (event) => {
    setGstRegistrationNumber(event.target.value);
  };

  const handleBusNatureChange = (event) => {
    setBusinessNature(event.target.value);
  };

  const handleContactNameChange = (event) => {
    setContactName(event.target.value);
  };

  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleContactNumChange = (event) => {
    setContactNumber(event.target.value);
  };

  const handleDeletedStatusChange = (event) => {
    console.log(event)
    setDeleted(event.target.value)
  };

  const saveCompany = async (e) => {
    e.preventDefault();

    try {
      if (name === "") {
        message.warning("No Company Name given!");
        return;
      } else if (country === "") {
        message.warning("No Country given!");
        return;
      } else if (gstRegistrationNumber === "") {
        message.warning("No GST Registration Number given!");
        return;
      } else if (contactName === "") {
        message.warning("No Contact Name given!");
        return;
      } else if (email === "") {
        message.warning("No Contact Email given!");
        return;
      } else if (!regex.test(email)) {
        message.warning("Enter a valid Email");
      } else {
        const res = await axios.put(
          "http://localhost:8080/company/edit",
          {
            registrationNum,
            name,
            country,
            businessNature,
            gstRegistrationNumber,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const res1 = await axios.put(
          "http://localhost:8080/login/editUser",
          {
            password,
            name: contactName,
            email,
            contactNumber,
            role,
            companyRegistrationNum: registrationNum,
            deleted: deleted === "Yes" ? true : false
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (currUser === "Admin") {
          navigate("/UserManagement");
        } else {
          navigate("/VendorInfoPage");
        }
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  console.log(deleted);

  return (
    <Grid sx={{ mt: 6, textAlign: "left", px: 4 }}>
      <Grid
        container
        spacing={{ md: 6 }}
        columns={{ xs: 12, sm: 4, md: 4 }}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
        {currUser === "Admin" ? (
          <Grid item md={2.0} sm={2.5}>
            <h1>User Management</h1>
          </Grid>
        ) : (
          <Grid item md={2.0} sm={2.5}>
            <h1>Update Details</h1>
          </Grid>
        )}
        <Grid
          item
          md={2.0}
          sm={1}
          sx={{ justifyContent: "flex-end", display: "flex" }}>
          <Button
            columns={{ xs: 12, sm: 12, md: 12 }}
            sx={{ mt: 1, mr: 1 }}
            variant="contained"
            color="error"
            onClick={cancel}>
            Cancel
          </Button>
          <Button
            columns={{ xs: 12, sm: 12, md: 12 }}
            sx={{ mt: 1, mr: 1 }}
            variant="contained"
            color="success"
            onClick={saveCompany}>
            Save
          </Button>
        </Grid>
      </Grid>

      <Paper
        elevation={1}
        sx={{ height: "100%", pt: 1, pl: 2, pb: 2, my: 3 }}
        md={{}}>
        <Grid sx={{ mx: 2, mb: 4 }} columns={{ xs: 12, sm: 12, md: 12 }}>
          <Box sx={{ display: "flex", flexWrap: "wrap" }}>
            <div>
              <FormControl
                sx={{ m: 2, width: "25ch" }}
                variant="outlined"
                onChange={handleNameChange}>
                <FormHelperText id="outlined-weight-helper-text">
                  Company Name
                </FormHelperText>
                <OutlinedInput
                  id="outlined-adornment-weight"
                  aria-describedby="outlined-weight-helper-text"
                  value={name}
                />
                {name === "" ? (
                  <FormHelperText sx={{ color: "#dd3c32" }}>
                    Please enter a Name
                  </FormHelperText>
                ) : (
                  <></>
                )}
              </FormControl>
            </div>
            <div>
              <FormControl
                sx={{ m: 2, width: "25ch" }}
                variant="outlined"
                onChange={handleCountryChange}>
                <FormHelperText id="outlined-weight-helper-text">
                  Country of Origin
                </FormHelperText>
                <OutlinedInput
                  id="outlined-adornment-weight"
                  aria-describedby="outlined-weight-helper-text"
                  value={country}
                />
                {country === "" ? (
                  <FormHelperText sx={{ color: "#dd3c32" }}>
                    Please enter a Country
                  </FormHelperText>
                ) : (
                  <></>
                )}
              </FormControl>
              <FormControl sx={{ m: 2, width: "25ch" }} variant="outlined">
                <FormHelperText id="outlined-weight-helper-text">
                  Registration Number
                </FormHelperText>
                <OutlinedInput
                  id="outlined-adornment-weight"
                  aria-describedby="outlined-weight-helper-text"
                  value={registrationNum}
                  disabled
                />
              </FormControl>
              <FormControl
                sx={{ m: 2, width: "25ch" }}
                variant="outlined"
                onChange={handleGSTRegistratioNumberChange}>
                <FormHelperText id="outlined-weight-helper-text">
                  GST Registration Number
                </FormHelperText>
                <OutlinedInput
                  id="outlined-adornment-weight"
                  aria-describedby="outlined-weight-helper-text"
                  value={gstRegistrationNumber}
                />
                {gstRegistrationNumber === "" ? (
                  <FormHelperText sx={{ color: "#dd3c32" }}>
                    Please enter a GST registration number
                  </FormHelperText>
                ) : (
                  <></>
                )}
              </FormControl>
              <FormControl
                sx={{ m: 2, width: "25ch" }}
                variant="outlined"
                onChange={handleBusNatureChange}>
                <FormHelperText id="outlined-weight-helper-text">
                  Business Nature
                </FormHelperText>
                <OutlinedInput
                  id="outlined-adornment-weight"
                  aria-describedby="outlined-weight-helper-text"
                  value={businessNature}
                />
              </FormControl>
            </div>
          </Box>

          <Box sx={{ display: "flex", flexWrap: "wrap" }}>
            <div>
              <FormControl
                sx={{ m: 2, width: "25ch" }}
                variant="outlined"
                onChange={handleContactNameChange}>
                <FormHelperText id="outlined-weight-helper-text">
                  Contact Name
                </FormHelperText>
                <OutlinedInput
                  id="outlined-adornment-weight"
                  aria-describedby="outlined-weight-helper-text"
                  value={contactName}
                />
                {contactName === "" ? (
                  <FormHelperText sx={{ color: "#dd3c32" }}>
                    Please enter a Name
                  </FormHelperText>
                ) : (
                  <></>
                )}
              </FormControl>
              <FormControl sx={{ m: 2, width: "25ch" }} variant="outlined">
                <FormHelperText id="outlined-weight-helper-text">
                  Email
                </FormHelperText>
                <OutlinedInput
                  id="outlined-adornment-weight"
                  aria-describedby="outlined-weight-helper-text"
                  value={email}
                  disabled
                />
              </FormControl>
              <FormControl
                sx={{ m: 2, width: "25ch" }}
                variant="outlined"
                onChange={handleContactNumChange}>
                <FormHelperText id="outlined-weight-helper-text">
                  Contact Number
                </FormHelperText>
                <OutlinedInput
                  id="outlined-adornment-weight"
                  aria-describedby="outlined-weight-helper-text"
                  value={contactNumber}
                />
              </FormControl>
              <FormControl sx={{ m: 2, width: "25ch" }} variant="outlined">
                <FormHelperText id="outlined-weight-helper-text">
                  User Role
                </FormHelperText>
                <Select value={role} disabled>
                  <MenuItem value="Admin">Admin</MenuItem>
                  <MenuItem value="Approver">Approver</MenuItem>
                  <MenuItem value="Vendor">Vendor</MenuItem>
                </Select>
              </FormControl>
              <FormControl
                sx={{ m: 2, width: "25ch" }}
                variant="outlined"
                >
                <FormHelperText id="outlined-weight-helper-text">
                  Deleted Status
                </FormHelperText>
                {console.log("407", deleted)}
                <Select value={deleted} onChange={handleDeletedStatusChange}>
                  <MenuItem value="Yes">Yes</MenuItem>
                  <MenuItem value="No">No</MenuItem>
                </Select>
              </FormControl>
            </div>
          </Box>
        </Grid>
      </Paper>
    </Grid>
  );
}

export default EditCompanyDetails;

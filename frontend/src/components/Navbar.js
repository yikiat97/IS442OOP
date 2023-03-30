import React, { useState } from "react";
import GroupsIcon from "@mui/icons-material/Groups";
import FeedIcon from "@mui/icons-material/Feed";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import { Link } from 'react-router-dom';
import StartIcon from '@mui/icons-material/Start';
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from '@mui/icons-material/Settings';
import { Sidebar, Menu, MenuItem, SubMenu, useProSidebar, ProSidebarProvider} from "react-pro-sidebar";
import {
    Typography,
    ListItemIcon,
    Grid
  } from "@mui/material";


const Navbar = () => {
  const role = sessionStorage.getItem("role");
  const roleText = role ? role : "Sign in";

  const handleAuthItemClick = () => {
    if (role) {
      sessionStorage.clear();
      window.location.replace(window.location.origin);
    } else {
      window.location.replace(window.location.origin + "/login");
    }
  };

  return(
    <ProSidebarProvider>
        <Sidebar style={{height:'100%', background:"#C6F0FF"}}>

            <Menu style={{paddingBottom:'14px', paddingTop:"10px", background: "#2596BE"}}>
            <Typography
                    noWrap='true'
                    variant="title"
                    sx={{
                        fontSize: "24px",
                        pr:"5px",
                        pl:'10px',
                        color:"#FFFFFF"
                        
                    }}>
                    Quantum
                    </Typography>
            <Typography
                
                variant="title"
                sx={{
                    fontSize: "24px",
                    fontWeight: 700,
                    color:"#FFFFFF",
                }}>
                VMS
            </Typography>
            </Menu>
            {role!=null ?
            <><Menu style={{ textAlign: "left" }}>
                
                    <SubMenu label='User Management' icon={<GroupsIcon />} component={<Link to='/UserManagement' />}>
                        <MenuItem component={<Link to='/CreateCompany' />}>Create New Company</MenuItem>
                    </SubMenu>

                    <SubMenu label='Workflows' icon={<SettingsSuggestIcon />} component={<Link to='/WorkflowsAdmin' />}>
                        <MenuItem component={<Link to='/ViewWorkflowsTemplate' />}>View Templates</MenuItem>
                        <MenuItem component={<Link to='/CreateWorkflow' />}>Create New Template</MenuItem>
                        <MenuItem component={<Link to='/ViewAllWorkflow' />}>View Workflows</MenuItem>
                        <MenuItem component={<Link to='/AssignWorkflow' />}>Assign Workflow</MenuItem>

                    </SubMenu>

                    <SubMenu label='Form Management' icon={<FeedIcon />} component={<Link to='/FormHomePage' />}>
                        <MenuItem component={<Link to='/ViewDeletedForms' />}>View Deleted Forms</MenuItem>
                        <MenuItem component={<Link to='/ViewForms' />}>View Current Forms</MenuItem>
                        <MenuItem component={<Link to='/FormCreation' />}>Create New Form</MenuItem>
                    </SubMenu>

                    <MenuItem icon={<SettingsIcon />} component={<Link to='/Tobefillin'/>}>Settings
                    </MenuItem>

                </Menu><Menu sx={{}} onClick={handleAuthItemClick}>
                        {/* <MenuItem icon={<PersonIcon/>}> */}
                        <Grid container sx={{ mt: '10px', display: "flex", align: "center" }}>
                            <Grid item md={3}>
                                <PersonIcon />
                            </Grid>

                            <Grid item md={6}>
                                <Typography
                                    noWrap='true'
                                    variant="body2"
                                    sx={{ fontWeight: 700, textAlign: "left" }}>
                                    {roleText}
                                </Typography>
                            </Grid>

                            <Grid item md={3}>
                                <Typography textAlign={'center'}>
                                    <StartIcon />
                                </Typography>
                            </Grid>
                        </Grid>



                          {/* </MenuItem> */}
                      </Menu></>
            :<></>}


        </Sidebar>
    </ProSidebarProvider>


);
};
export default Navbar;

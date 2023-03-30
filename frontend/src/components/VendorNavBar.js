import React, { useState } from "react";
import GroupsIcon from "@mui/icons-material/Groups";
import FeedIcon from "@mui/icons-material/Feed";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import { Link } from 'react-router-dom';
import StartIcon from '@mui/icons-material/Start';
import PersonIcon from "@mui/icons-material/Person";
import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic';
import GradingIcon from '@mui/icons-material/Grading';
import AssignmentIcon from '@mui/icons-material/Assignment';
import SettingsIcon from '@mui/icons-material/Settings';
import { Sidebar, Menu, MenuItem, SubMenu, useProSidebar, ProSidebarProvider} from "react-pro-sidebar";
import {
    Typography,
    ListItemIcon,
    Grid
  } from "@mui/material";


const VendorNavbar = () => {
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

            <Menu style={{textAlign:"left"}}>

                <MenuItem icon={<AutoAwesomeMosaicIcon />} component={<Link to='/VendorOverviewPage'/>}>Overview
                </MenuItem>

                <MenuItem icon={<AssignmentIcon />} component={<Link to='/VendorAssignWorkflowPage'/>}> Pending Workflow
                </MenuItem>

                <MenuItem icon={<GradingIcon />} component={<Link to='/VendorPastWorkflowpage'/>}> Completed Worflow
                </MenuItem>

                <MenuItem icon={<SettingsIcon />} component={<Link to='/VendorInfoPage'/>}>Settings
                </MenuItem>

            </Menu>

            <Menu sx={{}} >
                {/* <MenuItem icon={<PersonIcon/>}> */}
                <Grid container sx={{mt:'10px',display:"flex", align:"center"}}>
                    <Grid item md={3}>
                      <PersonIcon/>
                    </Grid>

                    <Grid item md={6}>
                    <Typography
                        noWrap='true'
                        variant="body2"
                        sx={{fontWeight: 700, textAlign:"left" }}>
                        {roleText}
                    </Typography>
                    </Grid>

                    <Grid item md={3}>
                    <Typography textAlign={'center'} onClick={handleAuthItemClick}>
                            <StartIcon />   
                    </Typography>
                    </Grid>
                </Grid>
                
                
                
                {/* </MenuItem> */}
            </Menu>


        </Sidebar>
    </ProSidebarProvider>


);
};
export default VendorNavbar;

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

                <SubMenu label='Overview' icon={<AutoAwesomeMosaicIcon />} component={<Link to='/VendorOverviewPage'/>}>
                </SubMenu>

                <SubMenu label='Pending Workflow' icon={<AssignmentIcon />} component={<Link to='/VendorAssignWorkflowPage'/>}>
                </SubMenu>

                <SubMenu label='Completed Worflow' icon={<GradingIcon />} component={<Link to='/VendorPastWorkflowpage'/>}>
                </SubMenu>

            </Menu>

            <Menu sx={{}} >
                {/* <MenuItem icon={<PersonIcon/>}> */}
                <Grid container sx={{mt:'10px',display:"flex", align:"center"}}>
                    <Grid item md={3}>
                    <Link to='/VendorInfoPage'>
                      <PersonIcon/>
                    </Link>
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

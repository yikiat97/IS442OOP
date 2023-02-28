import {
    AppBar,
    IconButton,
    Typography,
    Box,
    Menu,
    MenuItem,
    List,
    ListItemButton,
    ListItemText,
    MenuList,
    ListItemIcon,
    Grid
  } from "@mui/material";
import React from 'react';
import GroupsIcon from '@mui/icons-material/Groups';
import FeedIcon from '@mui/icons-material/Feed';
import PersonIcon from '@mui/icons-material/Person';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import StartIcon from '@mui/icons-material/Start';
import {Link} from "react-router-dom";
const Navbar = (props) => {
return (

    <AppBar  position='static' sx={{ height:'100%'}}>

        <Box sx={{ py:'25px', background:'#2596BE'}}>

          <Grid container>
            <Grid>
            <Typography variant='title' sx={{fontSize:'32px', pl:'15px', pr: '10px' }}>
            Quantum 
            </Typography>
            </Grid>

            <Grid>
              <Typography variant='title' sx={{fontSize:'32px', fontWeight:700}}>
              VMS  
              </Typography>
            </Grid>
          </Grid>
          
        
        </Box>
            
        
    <Box sx={{ background:'#C6F0FF', height:'100%', color:'#000000'}}>
    <MenuList>
        <MenuItem>
        <ListItemIcon> <GroupsIcon/> </ListItemIcon>
          
          <Typography variant="body2">
            User Management
          </Typography>
        </MenuItem>

        <MenuItem>
        <ListItemIcon> <SettingsSuggestIcon/> </ListItemIcon>
          
          <Typography variant="body2">
            <Link to="/WorkflowsAdmin">Workflows</Link>
          </Typography>
        </MenuItem>

        <MenuItem>
        <ListItemIcon><FeedIcon/></ListItemIcon>
          <Typography variant="body2">
            <Link to="/Form">Form management</Link>

          </Typography>
        </MenuItem>
    </MenuList>
    </Box>

    <Box sx={{background:'#C6F0FF', py:"10px"}}>
    <MenuItem>
    
      <ListItemIcon> <PersonIcon/> </ListItemIcon>
          
          <Typography variant="body2" sx={{color:'#000000', fontWeight:700}}>
            Admin
          </Typography>

      <ListItemIcon sx={{pl:"120px"}}> <StartIcon/> </ListItemIcon>

    
    </MenuItem>

    
    </Box>
    </AppBar>

    
 );
};
export default Navbar;

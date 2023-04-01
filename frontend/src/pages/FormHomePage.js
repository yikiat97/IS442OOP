import * as React from 'react';
import {

    Grid, 
    Paper, 
    Button,
    Card, 
    CardContent,
    Typography,
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TableRow,
    Link,
    Menu,
    MenuItem,
        
} from "@mui/material";
import CreateIcon from '@mui/icons-material/Create';
import Create from '@mui/icons-material/Create';
import DraftsIcon from '@mui/icons-material/Drafts';
import Container from '@mui/material/Container';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';

function FormHomePage() {
    return (
        
        <Grid sx={{mt:6, mb:6, textAlign:'left', px:4}}>
            
            <Grid container spacing={{ md: 6 }} columns={{xs:12, sm:4,md:4}} sx={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                <Grid item md={2.0} sm={2.5}>
                    <h1>Form Management</h1>
                </Grid>

            </Grid>

            <Grid container spacing={4} sx={{pt:4}}>
                <Grid item xs={4}>
                    <Link href='ViewForms' underline='none'>
                    <Card sx={{ borderRadius: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}} style={{backgroundColor: "#E7F9DD", width: '300px', height: '400px'}} >
                        <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} >
                                <DraftsIcon  sx={{color:"#054322"}} style={{ width: '150px', height: '150px' }}></DraftsIcon>
                                <Typography variant="body1" fontWeight="Bold" color={"#054322"}>
                                    <Grid container sx={{alignContent:"center", justifyContent:"center", pt:3}}>
                                        <Grid item>
                                        View Current Forms
                                        </Grid>
                                        <Grid item sx={{pl:1}}>
                                        <ArrowCircleRightOutlinedIcon  />
                                        </Grid>
                                    </Grid>
                                </Typography>
                        </CardContent>
                    </Card>
                    </Link>
                </Grid>

                

                <Grid item xs={4}>
                    <Link href='FormCreation' underline='none'>
                    <Card sx={{ borderRadius: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}} style={{backgroundColor: "#FEDBC2" , width: '300px', height: '400px'}}>
                        <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                <CreateIcon  sx={{color:"#8A3C03"}} style={{ width: '150px', height: '150px' }}></CreateIcon>
                                <Typography variant="body1" fontWeight="Bold" color={"#8A3C03"}>
                                    <Grid container sx={{alignContent:"center", justifyContent:"center", pt:3}}>
                                        <Grid item>
                                        Create Forms
                                        </Grid>
                                        <Grid item sx={{pl:1}}>
                                        <ArrowCircleRightOutlinedIcon  />
                                        </Grid>
                                    </Grid>
                                </Typography>
                        </CardContent>
                    </Card>
                    </Link>
                </Grid>

                <Grid item xs={4}>
                    <Link href='ViewDeletedForms' underline='none'>
                    <Card sx={{ borderRadius: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}} style={{backgroundColor: "#FFD9D9" , width: '300px', height: '400px'}}>
                        <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                <DeleteOutlineIcon sx={{color:"#790202"}} style={{ width: '150px', height: '150px' }}></DeleteOutlineIcon>
                                <Typography variant="body1" fontWeight="Bold" color={"#790202"}>
                                    <Grid container sx={{alignContent:"center", justifyContent:"center", pt:3}}>
                                            <Grid item>
                                            View Deleted Forms
                                            </Grid>
                                            <Grid item sx={{pl:1}}>
                                            <ArrowCircleRightOutlinedIcon  />
                                            </Grid>
                                    </Grid>
                                </Typography>
                        </CardContent>
                    </Card>
                    </Link>
                </Grid>
                
            </Grid> 
        </Grid>
 
    );
}

export default FormHomePage;
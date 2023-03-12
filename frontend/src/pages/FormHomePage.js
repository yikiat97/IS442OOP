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
    MenuItem
        
} from "@mui/material";
import CreateIcon from '@mui/icons-material/Create';
import Create from '@mui/icons-material/Create';
import DraftsIcon from '@mui/icons-material/Drafts';
import Container from '@mui/material/Container';
const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
    },
};
function FormHomePage() {
    return (
        
        <Container maxWidth="md" style={styles.container}>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Card variant="outlined" sx={{ borderRadius: '16px'  }}>
                        <a href="ViewForms">
                            <DraftsIcon></DraftsIcon>
                            <Typography variant="body1">View past forms</Typography>                        
                        </a>                        
                    </Card>


                </Grid>
                <Grid item xs={6}>
                    <Card variant="outlined" sx={{ borderRadius: '16px' }}>
                        <a href="FormCreation">
                            <CreateIcon></CreateIcon>
                            <Typography variant="body1">Create forms</Typography>
                        </a>                        
                    </Card>


                </Grid>
            </Grid>               
        </Container>
 
    );
}

export default FormHomePage;
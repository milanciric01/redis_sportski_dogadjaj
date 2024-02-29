import { Navigate, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import Button from "@mui/material/Button";
import Item from '@mui/material/ListItem'
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { FormControl, InputLabel, MenuItem, Paper, Select } from '@mui/material';
import axios from 'axios';
function AzurirajTrMinUtak()
{
    const navigate = useNavigate();
   const[id,setId]=useState(-1);
   const idHandler=(event)=>{
    const d=event.target.value;
    setId(d);
   }
   const[minut,setMinut]=useState(0);
   const minutHandler=(event)=>{
    const d=event.target.value;
    setMinut(d);
   }
   const[value,setValue]=useState(0);
    const utakmicaHandler=(event)=>
    {
        event.preventDefault();
        
        const response = axios.put(
          `https://localhost:7196/api/match/updateMatchMinute/${id}/${minut}`,
          {
            headers: {
              // Ovde možete dodati header informacije ako su potrebne
              // Authorization: `Bearer ${token}`
            },
          }
        )
          .then((response) => {
           
           setValue(1);
          })
          .catch((error) => {
            // Obrada greške
            console.log(error);
            
          });
        
        


    }
    const okHandler=(event)=>{
        event.preventDefault();
        setValue(0);
    }
   
    return(
        <>
        {value===0&&(<Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh' }}
      >
        <Container component="main" maxWidth="xs" alignItems="center" justifyContent="center"  >
        <Paper elevation={24}>
        <Box
          sx={{  
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h3">
           Azuriraj utakmicu
          </Typography>
         
          <Box component="form" noValidate sx={{ mt: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
                <Item>
                    <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="Domaca"
                    label="Unesite id utakmice koju azurirate"
                    name="Domacin"
                    autoComplete="Domacin"
                    autoFocus
                    onChange={idHandler}
                />  
                </Item>
            </Grid>
                <Grid item xs={12}>
                    <Item>
                        <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="gostojuca"
                        label="Unesite minut utakmice"
                        type="number"
                        id="gost"
                        autoComplete="Gost"
                        onChange={minutHandler}
                        />
                    </Item>
                         </Grid>
          </Grid>
          
            
           
           <div>

           </div>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={utakmicaHandler}
            >
              Azuriraj utakmicu
            </Button>
           
          </Box>
        </Box>
        </Paper>
      </Container>
    </Grid>)}
    {value==1&&(
        <Paper elevation={24}>
            <Typography>
                <h1>
                    Uspesno azurirana utakmica
                </h1>
            </Typography>
            <Button onClick={okHandler}>
                OK
            </Button>
        </Paper>
    )}
    </>
    
    );
}
export default AzurirajTrMinUtak;
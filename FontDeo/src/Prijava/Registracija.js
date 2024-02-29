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
import { Paper } from '@mui/material';
import axios from 'axios';
function Registracija()
{
    const navigate = useNavigate();
    const [mejl, setMejl] = useState('');
    const [sifra,setSifra]=useState('');
    const[ime,setIme]=useState('');
    const[prezime,setPrezime]=useState('');
    const [potvrda,setPotvrda]=useState('');
    const registracijaHandler=(event)=>
    {
        event.preventDefault();
        const response = axios.post(
          `https://localhost:7196/api/Authentication/register`,
          {
            first_Name: ime,
            last_Name: prezime,
            email:mejl,
            password:sifra,
            passwordVerification:potvrda
          },
          {
            headers: {
              // Ovde možete dodati header informacije ako su potrebne
              // Authorization: `Bearer ${token}`
            },
          }
        )
          .then((response) => {
            // Obrada uspešnog odgovora
            localStorage.setItem('ime',ime);
            localStorage.setItem('prezime',prezime);
            localStorage.setItem('email', mejl);
            
            navigate('/');
          })
          .catch((error) => {
            // Obrada greške
            console.log(error);
            
          });
        
        


    }
    const linkHandler=()=>
    {
        navigate('/Prijava');
    }
    const imeHandler=(event)=>{
     
        const novoIme = event.target.value;
  
        // Ažuriramo stanje sa novom vrednošću
        setIme(novoIme); 
    }
    const prezimeHandler=(event)=>{
     
      const novoPrezime = event.target.value;

      // Ažuriramo stanje sa novom vrednošću
      setPrezime(novoPrezime); 
  }
  const emailHandler=(event)=>{
     
    const novoEmail = event.target.value;

    // Ažuriramo stanje sa novom vrednošću
    setMejl(novoEmail); 
}
const passwordHandler=(event)=>{
     
  const novoPassword = event.target.value;

  // Ažuriramo stanje sa novom vrednošću
  setSifra(novoPassword); 
}
const potvrdaHandler=(event)=>{
     
  const novoPotvrdi = event.target.value;

  // Ažuriramo stanje sa novom vrednošću
  setPotvrda(novoPotvrdi); 
}
    return(
        <>
        <Grid
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
           Registracija
          </Typography>
         
          <Box component="form" noValidate sx={{ mt: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
                <Item>
                    <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="ime"
                    label="Ime"
                    name="ime"
                    autoComplete="ime"
                    autoFocus
                    onChange={imeHandler}
                />  
                </Item>
            </Grid>
                <Grid item xs={6}>
                    <Item>
                        <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="prezime"
                        label="Prezime"
                        type="text"
                        id="prezime"
                        autoComplete="prezime"
                        onChange={prezimeHandler}
                        />
                    </Item>
                </Grid>
                <Grid item xs={12}>
                    <Item>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="email"
                        label="Email"
                        type="email"
                        id="email"
                        autoComplete="email"
                        onChange={emailHandler}
                    />
          
                    </Item>
                </Grid>
                <Grid item xs={12}>
                    <Item>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Sifra"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={passwordHandler}
                    />
          
                    </Item>
                </Grid>
                <Grid item xs={12}>
                    <Item>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="confirm-password"
                        label="Potvrdi sifru"
                        type="password"
                        id="confirm-password"
                        autoComplete="current-password"
                        onChange={potvrdaHandler}
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
              onClick={registracijaHandler}
            >
              Registrujte se
            </Button>
            <Grid container sx={{ mt: 5, mb: 5 }}
             justifyContent="center"
             alignItems="center">
              
                <Link href="#" variant="body2" onClick={linkHandler}>
                  {"Imate nalog? Prijavite se"}
                </Link>
            </Grid>
          </Box>
        </Box>
        </Paper>
      </Container>
    </Grid>
    </>
    
    );
}
export default Registracija;
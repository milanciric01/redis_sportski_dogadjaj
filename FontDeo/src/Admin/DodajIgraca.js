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
import { FormControl, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import axios from 'axios';
function DodajIgraca()
{
    const navigate = useNavigate();
   const[id,setId]=useState('');
   const idHandler=(event)=>{
    const d=event.target.value;
    setId(d);
   }
   const[dres,setDres]=useState(0);
   const dresHandler=(event)=>{
    const d=event.target.value;
    setDres(d);
   }
   const[ime,setIme]=useState('');
   const imeHandler=(event)=>{
    const d=event.target.value;
    setIme(d);
   }
   const[pozicija,setPozicija]=useState(0);
   const pozicijaHandler=(event)=>{
    const d=event.target.value;
    setPozicija(d);
   }
   const[golovi,setGolovi]=useState(0);
   const goloviHandler=(event)=>{
    const d=event.target.value;
    setGolovi(d);
   }
   const[sutevi,setSutevi]=useState(0);
   const suteviHandler=(event)=>{
    const d=event.target.value;
    setSutevi(d);
   }
   const[asistencije,setAsistencije]=useState(0);
   const asistencijeHandler=(event)=>{
    const d=event.target.value;
    setAsistencije(d);
   }
   const[zuti,setZuti]=useState(0);
   const zutiHandler=(event)=>{
    const d=event.target.value;
    setZuti(d);
   }
   const[crveni,setCrveni]=useState(0);
   const crveniHandler=(event)=>{
    const d=event.target.value;
    setCrveni(d);
   }
   const[ekipa,setEkipa]=useState('');
   const ekipaHandler=(event)=>{
    const d=event.target.value;
    setEkipa(d);
   }
   const [sta,setSta]=useState(1);
   const okHandler=(event)=>{
    const d=event.target.value;
    setValue(1);
   }
   
  
      
        const azurirajHandler=(event)=>{
            event.preventDefault();
             console.log(`${id}`);
                  
              
            const response = axios.put(
              `https://localhost:7196/api/Team/updatePlayer/${id}`,
              {
                id: id,
                jersey_number: dres,
                full_Name: ime,
                position: pozicija,
                goalsScored: golovi,
                shots: sutevi,
                assists: asistencije,
                yellowCards: zuti,
                redCards: crveni,
                tim: ekipa
              },
              {
                headers: {
                  // Ovde možete dodati header informacije ako su potrebne
                  // Authorization: `Bearer ${token}`
                },
              }
            )
              .then((response) => {
                console.log("Donro");
                setSta(1);
                setValue(4);
                  console.log(response.data);
                  setId(response.data);
                 
              
              })
              .catch((error) => {
                // Obrada greške
                console.log("eror");
                console.log(error);
                
              });
        }
        const azuriranjeHandler=(event)=>
        {
            event.preventDefault();
            setId(0);
            setDres(0);
            setIme('');
            setPozicija('');
            setGolovi(0);
            setSutevi(0);
            setAsistencije(0);
            setZuti(0);
            setCrveni(0);
           setEkipa('');
           setValue(2);
            
           
            };
          const [dodavanje,setDodavanje]=useState(0);
          const dodavanjeHandler=(event)=>{
              event.preventDefault();
              setValue(1);
          }
         
    
        
          const [value,setValue]=useState(0);

          const dodajIgracaHandler=(event)=>
          {
              event.preventDefault();
             
                  
              
              const response = axios.post(
                `https://localhost:7196/api/match/DodajIgraca`,
                {
                    id: 3,
                    jersey_number: dres,
                    full_Name: ime,
                    position: pozicija,
                    goalsScored: golovi,
                    shots: sutevi,
                    assists: asistencije,
                    yellowCards: zuti,
                    redCards: crveni,
                    tim: ekipa,
                },
                {
                  headers: {
                    // Ovde možete dodati header informacije ako su potrebne
                    // Authorization: `Bearer ${token}`
                  },
                }
              )
                .then((response) => {
                    console.log(response.data);
                    setId(response.data);
                    const response2 = axios.put(
                        `https://localhost:7196/api/Team/addPlayer/${response.data}/${ekipa}`,
                        {
                          headers: {
                            // Ovde možete dodati header informacije ako su potrebne
                            // Authorization: `Bearer ${token}`
                          },
                        }
                      )
                        .then((response) => {
                         setSta(1);
                         setValue(4);
                        })
                        .catch((error) => {
                          // Obrada greške
                          console.log(error);
                          
                        });
                
                })
                .catch((error) => {
                  // Obrada greške
                  console.log(error);
                  
                });
              };
            
          return(
            <>
             <Paper elevation={24}>
                <Grid container spacing={2}sx={{marginLeft:'340px'}}>
                <Grid item xs={6}>
                    <Item>
                    <Button variant="contained" onClick={dodavanjeHandler}>Dodaj igraca</Button>
                    </Item>
                </Grid>
                <Grid item xs={6}>
                    <Item>
                    <Button variant="contained" onClick={azuriranjeHandler}>Azuriraj igraca</Button>
                    </Item>
                </Grid>
                </Grid>
            </Paper>
            {value===1&&(<Grid
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
               Dodaj igraca
              </Typography>
              
              <Box component="form" noValidate sx={{ mt: 1 }}>
              <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Item>
                            <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="gostojuca"
                            label="Broj na dresu"
                            type="number"
                            id="gost"
                            autoComplete="Gost"
                            onChange={dresHandler}
                            />
                        </Item>
                    </Grid>
                    <Grid item xs={12}>
                        <Item>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="datum"
                            type="text"
                            label="Puno ime"
                            id="datum"
                            autoComplete="datum"
                            onChange={imeHandler}
                        />
              
                        </Item>
                    </Grid>
                    <Grid item xs={12}>
                        <Item>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="minut"
                            label="Pozicija"
                            type="text"
                            id="minut"
                            autoComplete="minut"
                            onChange={pozicijaHandler}
                        />
              
                        </Item>
                    </Grid>
                    <Grid item xs={12}>
                        <Item>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="minut"
                            label="Golovi"
                            type="number"
                            id="minut"
                            autoComplete="minut"
                            onChange={goloviHandler}
                        />
              
                        </Item>
                    </Grid>
                 
                    <Grid item xs={12}>
                        <Item>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="minut"
                            label="Sutevi"
                            type="number"
                            id="minut"
                            autoComplete="minut"
                            onChange={suteviHandler}
                        />
              
                        </Item>
                    </Grid>
                    <Grid item xs={12}>
                        <Item>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="minut"
                            label="Asistencije"
                            type="number"
                            id="minut"
                            autoComplete="minut"
                            onChange={asistencijeHandler}
                        />
              
                        </Item>
                    </Grid>
                 
                    <Grid item xs={12}>
                        <Item>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="minut"
                            label="Zuti kartoni"
                            type="number"
                            id="minut"
                            autoComplete="minut"
                            onChange={zutiHandler}
                        />
              
                        </Item>
                    </Grid>
                    <Grid item xs={12}>
                        <Item>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="minut"
                            label="Crveni kartoni"
                            type="number"
                            id="minut"
                            autoComplete="minut"
                            onChange={crveniHandler}
                        />
              
                        </Item>
                    </Grid>
                    <Grid item xs={12}>
                        <Item>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="minut"
                            label="Naziv kluba za koji nastupa"
                            type="text"
                            id="minut"
                            autoComplete="minut"
                            onChange={ekipaHandler}
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
                  onClick={dodajIgracaHandler}
                >
                  Dodaj igraca
                </Button>
               
              </Box>
            </Box>
            </Paper>
          </Container>
        </Grid>)}
        {value==4&&(
            <Paper elevation={24}>
                <Typography>
                    <h1>
                        Uspesno obavljena funkcija
                    </h1>
                </Typography>
                <Button onClick={okHandler}>
                    OK
                </Button>
            </Paper>
        )}
        {value==2&&(
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
               Azuriraj igraca
              </Typography>
              
              <Box component="form" noValidate sx={{ mt: 1 }}>
              <Grid container spacing={2}>
              <Grid item xs={12}>
                        <Item>
                            <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="gostojuca"
                            label="Unesite id igraca koga zelite da azurirate"
                            type="text"
                            id="gost"
                            autoComplete="Gost"
                            onChange={idHandler}
                            >
                                 <InputLabel shrink htmlFor="bootstrap-input">
                                    {id}
                                </InputLabel>
                            </TextField>
                        </Item>
                    </Grid>
                    <Grid item xs={12}>
                        <Item>
                            <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="gostojuca"
                            label="Broj na dresu"
                            type="text"
                            id="gost"
                            autoComplete="Gost"
                            onChange={dresHandler}
                            >
                                 <InputLabel shrink htmlFor="bootstrap-input">
                                    {dres}
                                </InputLabel>
                            </TextField>
                        </Item>
                    </Grid>
                    <Grid item xs={12}>
                        <Item>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="datum"
                            type="text"
                            label="Puno ime"
                            id="datum"
                            autoComplete="datum"
                            onChange={imeHandler}
                        >
                               <InputLabel shrink htmlFor="bootstrap-input">
                                    {ime}
                                </InputLabel>
                            </TextField>
              
                        </Item>
                    </Grid>
                    <Grid item xs={12}>
                        <Item>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="minut"
                            label="Pozicija"
                            type="text"
                            id="minut"
                            autoComplete="minut"
                            onChange={pozicijaHandler}
                        >
                               <InputLabel shrink htmlFor="bootstrap-input">
                                    {pozicija}
                                </InputLabel>
                            </TextField>
              
                        </Item>
                    </Grid>
                    <Grid item xs={12}>
                        <Item>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="minut"
                            label="Golovi"
                            type="number"
                            id="minut"
                            autoComplete="minut"
                            onChange={goloviHandler}
                        >
                               <InputLabel shrink htmlFor="bootstrap-input">
                                    {golovi}
                                </InputLabel>
                            </TextField>
              
                        </Item>
                    </Grid>
                 
                    <Grid item xs={12}>
                        <Item>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="minut"
                            label="Sutevi"
                            type="number"
                            id="minut"
                            autoComplete="minut"
                            onChange={suteviHandler}
                        >
                               <InputLabel shrink htmlFor="bootstrap-input">
                                    {sutevi}
                                </InputLabel>
                            </TextField>
              
                        </Item>
                    </Grid>
                    <Grid item xs={12}>
                        <Item>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="minut"
                            label="Asistencije"
                            type="number"
                            id="minut"
                            autoComplete="minut"
                            onChange={asistencijeHandler}
                        >
                               <InputLabel shrink htmlFor="bootstrap-input">
                                    {asistencije}
                                </InputLabel>
                            </TextField>
              
                        </Item>
                    </Grid>
                 
                    <Grid item xs={12}>
                        <Item>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="minut"
                            label="Zuti kartoni"
                            type="number"
                            id="minut"
                            autoComplete="minut"
                            onChange={zutiHandler}
                        >
                               <InputLabel shrink htmlFor="bootstrap-input">
                                    {zuti}
                                </InputLabel>
                            </TextField>
              
                        </Item>
                    </Grid>
                    <Grid item xs={12}>
                        <Item>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="minut"
                            label="Crveni kartoni"
                            type="number"
                            id="minut"
                            autoComplete="minut"
                            onChange={crveniHandler}
                        >
                               <InputLabel shrink htmlFor="bootstrap-input">
                                    {crveni}
                                </InputLabel>
                            </TextField>
              
                        </Item>
                    </Grid>
                    <Grid item xs={12}>
                        <Item>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="minut"
                            label="Naziv kluba za koji nastupa"
                            type="text"
                            id="minut"
                            autoComplete="minut"
                            onChange={ekipaHandler}
                        >
                               <InputLabel shrink htmlFor="bootstrap-input">
                                    {ekipa}
                                </InputLabel>
                            </TextField>
              
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
                  onClick={azurirajHandler}
                >
                  Azuriraj igraca
                </Button>
               
              </Box>
            </Box>
            </Paper>
          </Container>
        </Grid>)}
       
           
        
        </>
        );
        


    }
   
    
export default DodajIgraca;
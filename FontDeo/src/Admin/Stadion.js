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
function Stadion()
{
    const navigate = useNavigate();
   const[id,setId]=useState('');
   const idHandler=(event)=>{
    const d=event.target.value;
    setId(d);
   }
   const[ime,setIme]=useState('');
   const imeHandler=(event)=>{
    const d=event.target.value;
    setIme(d);
   }
   const[lokacija,setLokacija]=useState('');
   const lokacijaHandler=(event)=>{
    const d=event.target.value;
    setLokacija(d);
   }
   const[kapacitet,setKapacitet]=useState('');
   const kapacitetHandler=(event)=>{
    const d=event.target.value;
    setKapacitet(d);
   }
   const [sta,setSta]=useState(1);
   const okHandler=(event)=>{
    const d=event.target.value;
    setValue(1);
   }
   
    const dodajStadionHandler=(event)=>
    {
        event.preventDefault();
        const stadionData = {
            id: 1,
            name: ime,
            location: lokacija,
            capacity: kapacitet,
            
            }
            
        
        const response = axios.post(
          `https://localhost:7196/api/match/DodajStadion`,
          stadionData,
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
        };
        const [stadioni,setStadioni]=useState([]);
        const vratiStadioneHandler=(event)=>
        {
            event.preventDefault();
           
            
            const response = axios.get(
              `https://localhost:7196/api/match/VratiStadione`,
              {
                headers: {
                  // Ovde možete dodati header informacije ako su potrebne
                  // Authorization: `Bearer ${token}`
                },
              }
            )
              .then((response) => {
               
               setStadioni(response.data);
               setValue(2);
               setSta(2);
              })
              .catch((error) => {
                // Obrada greške
                console.log(error);
                
              });
            };
          const [dodavanje,setDodavanje]=useState(0);
          const dodavanjeHandler=(event)=>{
              event.preventDefault();
              setValue(1);
          }
          const btnHandler=(event,id)=>{
            event.preventDefault();
            const response = axios.delete(
                `https://localhost:7196/api/match/ObrisiStadion/${id}`,
                {
                  headers: {
                    // Ovde možete dodati header informacije ako su potrebne
                    // Authorization: `Bearer ${token}`
                  },
                }
              )
                .then((response) => {
                 
                 setStadioni(response.data);
                 setValue(4);
                 setSta(2);
                })
                .catch((error) => {
                  // Obrada greške
                  console.log(error);
                  
                });
          }
    
        
          const [value,setValue]=useState(0);
          return(
            <>
             <Paper elevation={24}>
                <Grid container spacing={2}sx={{marginLeft:'340px'}}>
                <Grid item xs={6}>
                    <Item>
                    <Button variant="contained" onClick={dodavanjeHandler}>Dodaj stadion</Button>
                    </Item>
                </Grid>
                <Grid item xs={6}>
                    <Item>
                    <Button variant="contained" onClick={vratiStadioneHandler}>Vrati stadione</Button>
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
               Dodaj stadion
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
                            label="Naziv stationa"
                            type="text"
                            id="gost"
                            autoComplete="Gost"
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
                            name="datum"
                            type="text"
                            label="Lokacija"
                            id="datum"
                            autoComplete="datum"
                            onChange={lokacijaHandler}
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
                            label="Kapacitet"
                            type="number"
                            minValue='1000'
                            maxValue='100000'
                            id="minut"
                            autoComplete="minut"
                            onChange={kapacitetHandler}
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
                  onClick={dodajStadionHandler}
                >
                  Dodaj stadion
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
           
           <TableContainer component={Paper} sx={{display:'flex',justifyContent:'center',alignItems:'center',marginTop:'80px'}}>
           <Table sx={{ minWidth: 650 }} aria-label="simple table">  
           <TableHead sx={{background: '#0a434a'}}>
             <TableCell sx={{ fontFamily: 'cursive',textAlign:'center',color:'white' }}>ID</TableCell>
             <TableCell sx={{ fontFamily: 'cursive', textAlign:'center',color:'white'}}>NAZIV</TableCell>
             <TableCell sx={{ fontFamily: 'cursive', textAlign:'center',color:'white' }}>LOKACIJA</TableCell>
             <TableCell sx={{ fontFamily: 'cursive', textAlign:'center',color:'white' }}>KAPACITET</TableCell>
             <TableCell sx={{ fontFamily: 'cursive', textAlign:'center',color:'white' }}></TableCell>
             <TableCell sx={{ fontFamily: 'cursive', textAlign:'center',color:'white' }}></TableCell>
            
           </TableHead>
           <TableBody sx={{background:'#07808f'}}>
             {stadioni.map((element) =>

               <TableRow key={element.Id}>
                   <TableCell sx={{  fontFamily: 'cursive', textAlign:'center',color:'white' }}>{element.id}</TableCell>
                 <TableCell sx={{  textAlign:'center', fontFamily: 'cursive',color:'white' }}>{element.name}</TableCell>

                 <TableCell sx={{  textAlign:'center', fontFamily: 'cursive',color:'white' }}>{element.location}</TableCell>

                 <TableCell sx={{  textAlign:'center', fontFamily: 'cursive',color:'white' }}>{element.capacity}</TableCell>

                 <TableCell sx={{  textAlign:'center', fontFamily: 'cursive',color:'white' }}>{element.draws}</TableCell>

                 <TableCell sx={{  textAlign:'center', fontFamily: 'cursive',fontWeight: 'bold',color:'#92c4d1' }}><Button sx={{color:'white',fontFamily:'cursive'}}   onClick={(event) => btnHandler(event, element.id)} >Obrisi stadion</Button></TableCell>
              
               </TableRow>

             )}

           </TableBody>

         </Table>
         </TableContainer>

                
           
        )}
       
           
        
        </>
        );
        


    }
   
    
export default Stadion;
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
import { Collapse, FormControl, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import axios from 'axios';
import { Label, Output } from '@mui/icons-material';
function DodajTim()
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
   const[odigrane,setOdigrane]=useState(0);
   const odigraneHandler=(event)=>{
    const d=event.target.value;
    setOdigrane(d);
   }
   const[pobede,setPobede]=useState(0);
   const pobedeHandler=(event)=>{
    const d=event.target.value;
    setPobede(d);
   }
   const[neresene,setNeresene]=useState(0);
   const nereseneHandler=(event)=>{
    const d=event.target.value;
    setNeresene(d);
   }
   const[pts,setPts]=useState(0);
   const ptsHandler=(event)=>{
    const d=event.target.value;
    setPts(d);
   }
   const[l,setL]=useState(0);
   const liHandler=(event)=>{
    const d=event.target.value;
    setL(d);
   }
   const [razlika,setRazlika]=useState(0);
   const[dati,setDati]=useState('');
   const datiHandler=(event)=>{
    const d=event.target.value;
    setDati(d);
   }
   const[primljeni,setPrimljeni]=useState(0);
   const primljeniHandler=(event)=>{
    const d=event.target.value;
    setPrimljeni(d);
    setRazlika(dati-primljeni);
   }

   
   const [sta,setSta]=useState(1);
   const okHandler=(event)=>{
    const d=event.target.value;
    setValue(1);
   }
   
  
   const [klubovi,setKlubovi]=useState([]);
  
        const[imeA,setImeA]=useState('');
        const imeAHandler=(event)=>{
         const d=event.target.value;
         setImeA(d);
        }
        const[odigraneA,setOdigraneA]=useState(0);
        const odigraneAHandler=(event)=>{
         const d=event.target.value;
         setOdigraneA(d);
        }
        const[pobedeA,setPobedeA]=useState(0);
        const pobedeAHandler=(event)=>{
         const d=event.target.value;
         setPobedeA(d);
        }
        const[nereseneA,setNereseneA]=useState(0);
        const nereseneAHandler=(event)=>{
         const d=event.target.value;
         setNereseneA(d);
        }
        const[ptsA,setPtsA]=useState(0);
        const ptsAHandler=(event)=>{
         const d=event.target.value;
         setPtsA(d);
        }
        const[lA,setLA]=useState(0);
        const liAHandler=(event)=>{
         const d=event.target.value;
         setLA(d);
        }
        const [razlikaA,setRazlikaA]=useState(0);
        const[datiA,setDatiA]=useState('');
        const datiAHandler=(event)=>{
         const d=event.target.value;
         setDatiA(d);
        }
        const[primljeniA,setPrimljeniA]=useState(0);
        const primljeniAHandler=(event)=>{
         const d=event.target.value;
         setPrimljeniA(d);
         setRazlikaA(dati-primljeni);
        }
     
        
        const azuriranjeHandler=(event)=>
        {
            event.preventDefault();
            const response =  axios.get(`https://localhost:7196/api/Team/GetSortedTeams`,
            {
              headers:{
                //Authorization: `Bearer ${token}`
              }
            }).then(response=>{
              setKlubovi(response.data);
              setValue(2);
              console.log(klubovi);
            })
            .catch(error=>{
              console.log(error);
            })
           
            };
          const [dodavanje,setDodavanje]=useState(0);
          const dodavanjeHandler=(event)=>{
              event.preventDefault();
              setValue(1);
          }
         
    
        
          const [value,setValue]=useState(0);
          let  players=[
            {
            id: 0,
            jersey_number: 0,
            full_Name: "string",
            position: "string",
            goalsScored: 0,
            shots: 0,
            assists: 0,
            yellowCards: 0,
            redCards: 0,
            tim: "string"
            }
        ];
        const[team,setTeam]=useState('');
          const dodajTimHandler=(event)=>
          {
            event.preventDefault();
            const response = axios.post(
                `https://localhost:7196/api/Team/addTeam`,
                {
                    name: ime,
                    played_Games: odigrane,
                    wins: pobede,
                    draws: neresene,
                    loses: l,
                    position: 0,
                    goals_Foward: dati,
                    goals_Concided: primljeni,
                    players:players,
                    points: pts
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
                    setSta(1);
                    setValue(4);
                   
                
                })
                .catch((error) => {
                  // Obrada greške
                  console.log(error);
                  
                });
             
              };
              const[kljuc,setKljuc]=useState('');
              const btnHandler=(event,ime)=>{
                event.preventDefault();
                const response = axios.get(
                    `https://localhost:7196/api/Team/GetTeam/${ime}`,
                    {
                      headers: {
                        // Ovde možete dodati header informacije ako su potrebne
                        // Authorization: `Bearer ${token}`
                      },
                    }
                  )
                    .then((response) => {
                        console.log(response.data);
                        setValue(3);
                       setTeam(response.data);
                       setKljuc(ime);
                    
                    })
                    .catch((error) => {
                      // Obrada greške
                      console.log(error);
                      
                    });
                

            }
            const azurirajHandler=(event)=>{
                event.preventDefault();
                const response = axios.put(
                    `https://localhost:7196/api/Team/UpdateTeam/${kljuc}`,
                    {
                        name: imeA,
                        played_Games: odigraneA,
                        wins: pobedeA,
                        draws: nereseneA,
                        loses: lA,
                        position: 0,
                        goals_Foward: datiA,
                        goals_Concided: primljeniA,
                        goals_Difference:datiA-primljeniA,
                        players:players,
                        points: ptsA
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
                        setSta(1);
                        setValue(4);
                       
                    
                    })
                    .catch((error) => {
                      // Obrada greške
                      console.log(error);
                      
                    });
            }
          return(
            <>
             <Paper elevation={24}>
                <Grid container spacing={2}sx={{marginLeft:'340px'}}>
                <Grid item xs={6}>
                    <Item>
                    <Button variant="contained" onClick={dodavanjeHandler}>Dodaj klub</Button>
                    </Item>
                </Grid>
                <Grid item xs={6}>
                    <Item>
                    <Button variant="contained" onClick={azuriranjeHandler}>Azuriraj klub</Button>
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
               Dodaj klub
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
                            label="Naziv kluba"
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
                            name="gostojuca"
                            label="Odigrane utakmice"
                            type="number"
                            id="gost"
                            autoComplete="Gost"
                            onChange={odigraneHandler}
                            />
                        </Item>
                    </Grid>
                    <Grid item xs={4}>
                        <Item>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="datum"
                            type="number"
                            label="W"
                            id="datum"
                            autoComplete="datum"
                            onChange={pobedeHandler}
                        />
              
                        </Item>
                    </Grid>
                    <Grid item xs={4}>
                        <Item>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="minut"
                            label="D"
                            type="number"
                            id="minut"
                            autoComplete="minut"
                            onChange={nereseneHandler}
                        />
              
                        </Item>
                    </Grid>
                    <Grid item xs={4}>
                        <Item>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="minut"
                            label="l"
                            type="number"
                            id="minut"
                            autoComplete="minut"
                            onChange={liHandler}
                        />
              
                        </Item>
                    </Grid>
                 
                    <Grid item xs={6}>
                        <Item>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="minut"
                            label="Dati golovi"
                            type="number"
                            id="minut"
                            autoComplete="minut"
                            onChange={datiHandler}
                        />
              
                        </Item>
                    </Grid>
                    <Grid item xs={6}>
                        <Item>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="minut"
                            label="Primljeni golovi"
                            type="number"
                            id="minut"
                            autoComplete="minut"
                            onChange={primljeniHandler}
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
                            label="Ukupno bodova"
                            type="number"
                            id="minut"
                            autoComplete="minut"
                            onChange={ptsHandler}
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
                  onClick={dodajTimHandler}
                >
                  Dodaj klub
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
                 <TableCell sx={{ fontFamily: 'cursive',textAlign:'center',color:'white' }}>Pozicija</TableCell>
                 <TableCell sx={{ fontFamily: 'cursive', textAlign:'center',color:'white'}}>KLub</TableCell>
                 <TableCell sx={{ fontFamily: 'cursive', textAlign:'center',color:'white' }}>Odigrane utakmice</TableCell>
                 <TableCell sx={{ fontFamily: 'cursive', textAlign:'center',color:'white' }}>Pobede</TableCell>
                 <TableCell sx={{ fontFamily: 'cursive', textAlign:'center',color:'white'}}>Neresene</TableCell>
                 <TableCell sx={{ fontFamily: 'cursive', textAlign:'center',color:'white'}}>Porazi</TableCell>
                 <TableCell sx={{ fontFamily: 'cursive', textAlign:'center',color:'white'}}>Dati golovi</TableCell>
                 <TableCell sx={{ fontFamily: 'cursive', textAlign:'center',color:'white'}}>Primlejni golovi</TableCell>
                 <TableCell sx={{ fontFamily: 'cursive', textAlign:'center',color:'white'}}>Gol razlika</TableCell>
                 <TableCell sx={{ fontFamily: 'cursive', textAlign:'center', fontWeight: 'bold',color:'#92c4d1'}}>Bodovi</TableCell>
                 <TableCell sx={{ fontFamily: 'cursive', textAlign:'center', fontWeight: 'bold',color:'#92c4d1'}}></TableCell>
               </TableHead>
               <TableBody sx={{background:'#07808f'}}>
                 {klubovi.map((element,ind) =>
   
                   <TableRow key={element.Id}>
                       <TableCell sx={{  fontFamily: 'cursive', textAlign:'center',color:'white' }}>{ind+1}</TableCell>
                     <TableCell sx={{  textAlign:'center', fontFamily: 'cursive',color:'white' }}>{element.name}</TableCell>
   
                     <TableCell sx={{  textAlign:'center', fontFamily: 'cursive',color:'white' }}>{element.played_Games}</TableCell>
   
                     <TableCell sx={{  textAlign:'center', fontFamily: 'cursive',color:'white' }}>{element.wins}</TableCell>
   
                     <TableCell sx={{  textAlign:'center', fontFamily: 'cursive',color:'white' }}>{element.draws}</TableCell>
   
                     <TableCell sx={{  textAlign:'center', fontFamily: 'cursive',color:'white' }}>{element.loses}</TableCell>
                     <TableCell sx={{  textAlign:'center', fontFamily: 'cursive',color:'white' }}>{element.goals_Foward}</TableCell>
                     <TableCell sx={{  textAlign:'center', fontFamily: 'cursive',color:'white' }}>{element.goals_Concided}</TableCell>
                     <TableCell sx={{  textAlign:'center', fontFamily: 'cursive',color:'white' }}>{element.goals_Differebce}</TableCell>
                     <TableCell sx={{  textAlign:'center', fontFamily: 'cursive',fontWeight: 'bold',color:'#92c4d1' }}>{element.points}</TableCell>
                     <TableCell sx={{  textAlign:'center', fontFamily: 'cursive',fontWeight: 'bold',color:'#92c4d1' }}><Button sx={{color:'white',fontFamily:'cursive'}}   onClick={(event) => btnHandler(event, element.name)} >Azuriraj</Button></TableCell>
               
                   </TableRow>
   
                 )}
   
               </TableBody>
   
             </Table>
             </TableContainer>
           )}
            {value===3&&(<Grid
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
               Azuriraj klub
              </Typography>
              
              <Box component="form" noValidate sx={{ mt: 1 }}>
              <Grid container spacing={2}>
              <Grid item xs={12}>
                        <Item>
                          <h1>
                                {team.name}
                            </h1>
                        </Item>
                    </Grid>
             
                    <Grid item xs={6}>
                        <Item>
                          <h1>
                                {team.played_Games}
                            </h1>
                        </Item>
                    </Grid>
                    <Grid item xs={6}>
                        <Item>
                            <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="gostojuca"
                            label="Odigrane utakmice"
                            type="number"
                            id="gost"
                            autoComplete="Gost"
                            onChange={odigraneAHandler}
                            />
                        </Item>
                    </Grid>
                    <Grid item xs={6}>
                        <Item>
                          <h1>
                                {team.wins}
                            </h1>
                        </Item>
                    </Grid>
                    <Grid item xs={6}>
                        <Item>
                         
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="datum"
                            type="number"
                            label="W"
                            id="datum"
                            autoComplete="datum"
                            onChange={pobedeAHandler}
                        />
              
                        </Item>
                    </Grid>
                    <Grid item xs={6}>
                        <Item>
                          <h1>
                                {team.draws}
                            </h1>
                        </Item>
                    </Grid>
                    <Grid item xs={6}>
                        <Item>
                       
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="minut"
                            label="D"
                            type="number"
                            id="minut"
                            autoComplete="minut"
                            onChange={nereseneAHandler}
                        />
              
                        </Item>
                    </Grid>
                    <Grid item xs={6}>
                        <Item>
                          <h1>
                                {team.loses}
                            </h1>
                        </Item>
                    </Grid>
                    <Grid item xs={6}>
                        <Item>
                      
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="minut"
                            label="l"
                            type="number"
                            id="minut"
                            autoComplete="minut"
                            onChange={liAHandler}
                        />
              
                        </Item>
                    </Grid>
                    <Grid item xs={6}>
                        <Item>
                          <h1>
                                {team.goals_Foward}
                            </h1>
                        </Item>
                    </Grid>
                    <Grid item xs={6}>
                        <Item>
                      
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="minut"
                            label="Dati golovi"
                            type="number"
                            id="minut"
                            autoComplete="minut"
                            onChange={datiAHandler}
                        />
              
                        </Item>
                    </Grid>
                    <Grid item xs={6}>
                        <Item>
                          <h1>
                                {team.goals_Concided}
                            </h1>
                        </Item>
                    </Grid>
                    <Grid item xs={6}>
                        <Item>
                      
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="minut"
                            label="Primljeni golovi"
                            type="number"
                            id="minut"
                            autoComplete="minut"
                            onChange={primljeniAHandler}
                        />
              
                        </Item>
                    </Grid><Grid item xs={6}>
                        <Item>
                          <h1>
                                {team.points}
                            </h1>
                        </Item>
                    </Grid>
                 
                          <Grid item xs={6}>
                        <Item>
                       
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="minut"
                            label="Ukupno bodova"
                            type="number"
                            id="minut"
                            autoComplete="minut"
                            onChange={ptsAHandler}
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
                  onClick={azurirajHandler}
                >
                  Azuriraj klub
                </Button>
               
              </Box>
            </Box>
            </Paper>
          </Container>
        </Grid>)}
       
           
        
        </>
        );
        


    }
   
    
export default DodajTim;
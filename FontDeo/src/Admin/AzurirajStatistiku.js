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
function AzurirajStatistiku()
{
    const navigate = useNavigate();
    const[suteviD,setSuteviD]=useState('');
    const suteviDHandler=(event)=>{
     const d=event.target.value;
     setSuteviD(d);
    }
    
   const[suteviG,setSuteviG]=useState('');
   const suteviGHandler=(event)=>{
    const d=event.target.value;
    setSuteviG(d);
   }
   const[suteviUD,setSuteviUD]=useState('');
   const suteviUDHandler=(event)=>{
    const d=event.target.value;
    setSuteviUD(d);
   }
   const[suteviUG,setSuteviUG]=useState('');
   const suteviUGHandler=(event)=>{
    const d=event.target.value;
    setSuteviUG(d);
   }
   const[posedD,setPosedD]=useState('');
   const posedDHandler=(event)=>{
    const d=event.target.value;
    setPosedD(d);
   }
   const[posedG,setPosedG]=useState('');
   const posedGHandler=(event)=>{
    const d=event.target.value;
    setPosedG(d);
   }
   const[paseviD,setPaseviD]=useState('');
   const paseviDHandler=(event)=>{
    const d=event.target.value;
    setPaseviD(d);
   }
   const[paseviG,setPaseviG]=useState('');
   const paseviGHandler=(event)=>{
    const d=event.target.value;
    setPaseviG(d);
   }
   const[preciznostD,setPreciznostD]=useState('');
   const preciznostDHandler=(event)=>{
    const d=event.target.value;
    setPreciznostD(d);
   }
   const[preciznostG,setPreciznostG]=useState('');
   const preciznostGHandler=(event)=>{
    const d=event.target.value;
    setPreciznostG(d);
   }
   const[fauliD,setFauliD]=useState('');
   const fauliDHandler=(event)=>{
    const d=event.target.value;
    setFauliD(d);
   }
   const[fauliG,setFauliG]=useState('');
   const fauliGHandler=(event)=>{
    const d=event.target.value;
    setFauliG(d);
   }

   const[zutiD,setZutiD]=useState('');
   const zutiDHandler=(event)=>{
    const d=event.target.value;
    setZutiD(d);
   }
   const[zutiG,setZutiG]=useState('');
   const zutiGHandler=(event)=>{
    const d=event.target.value;
    setZutiG(d);
   }
   const[crveniD,setCrveniD]=useState('');
   const crveniDHandler=(event)=>{
    const d=event.target.value;
    setCrveniD(d);
   }
   const[crveniG,setCrveniG]=useState('');
   const crveniGHandler=(event)=>{
    const d=event.target.value;
    setCrveniG(d);
   }

   const[ofsajdiD,setOfsajdiD]=useState('');
   const ofsajdiDHandler=(event)=>{
    const d=event.target.value;
    setOfsajdiD(d);
   }
   const[ofsajdiG,setOfsajdiG]=useState('');
   const ofsajdiGHandler=(event)=>{
    const d=event.target.value;
    setOfsajdiG(d);
   }
   const[korneriD,setKorneriD]=useState('');
   const korneriDHandler=(event)=>{
    const d=event.target.value;
    setKorneriD(d);
   }
   const[korneriG,setKorneriG]=useState('');
   const korneriGHandler=(event)=>{
    const d=event.target.value;
    setKorneriG(d);
   }

  const[value,setValue]=useState(0);

  const [id,setId]=useState(-1);
    const utakmicaHandler=(event)=>
    {
        event.preventDefault();
        const response = axios.put(
          `https://localhost:7196/api/match/updateMatchStats/${id}`,
            {
                shotsHome: suteviD,
                shotsOnGoalHome: suteviUD,
                possesionHome: posedD,
                passesHome: paseviD,
                accurucyHome: preciznostD,
                faulsHome: fauliD,
                yellowHome: zutiD,
                redHome: crveniD,
                offsidesHome: ofsajdiD,
                cornersHome: korneriD,
                shotsAway: suteviG,
                shotsOnGoalAway: suteviUG,
                possesionAway: posedG,
                passesAway: paseviG,
                accurucyAway: preciznostG,
                faulsAway: fauliG,
                yellowAway: zutiG,
                redAway: crveniG,
                offsidesAway: ofsajdiG,
                cornersAway: korneriG,
            },
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
    const idHandler=(event)=>{
        const i=event.target.value;
        setId(i);
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
           Azuriraj statistiku
          </Typography>
         
          <Box component="form" noValidate sx={{ mt: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={5}>
                <Item>
                    <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="Domaca"
                    label="Unesite id utakmice"
                    name="Domacin"
                    autoComplete="Domacin"
                    autoFocus
                    onChange={idHandler}
                />  
                </Item>
            
                </Grid>
                <Grid item xs={7}>
                    <Item>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="suteviUOkvirDomacin"
                        label="Domacin sutevi"
                        type="number"
                        id="suteviUOkvirDomacin"
                        autoComplete="0"
                        onChange={suteviDHandler}
                    />
          
                    </Item>
                </Grid>
                <Grid item xs={5}>
                    <Item>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="suteviGost"
                        label="Gost sutevi"
                        type="number"
                        id="suteviGost"
                        autoComplete="0"
                        onChange={suteviGHandler}
                    />
          
                    </Item>
                </Grid>
                <Grid item xs={7}>
                    <Item>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="suteviGost"
                        label="U gol domacin"
                        type="number"
                        id="suteviGost"
                        autoComplete="0"
                        onChange={suteviUDHandler}
                    />
          
                    </Item>
                </Grid>
                <Grid item xs={7}>
                    <Item>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="suteviGost"
                        label="u gol gost"
                        type="number"
                        id="suteviGost"
                        autoComplete="0"
                        onChange={suteviUGHandler}
                    />
          
                    </Item>
                </Grid>
                <Grid item xs={7}>
                    <Item>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="posedDomacin"
                        label="posed domacin"
                        type="number"
                        id="posedDomacin"
                        autoComplete="0"
                        onChange={posedDHandler}
                    />
          
                    </Item>
                </Grid>
                <Grid item xs={5}>
                    <Item>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="posedGost"
                        label="posed gost"
                        type="number"
                        id="posedGost"
                        autoComplete="0"
                        onChange={posedGHandler}
                    />
          
                    </Item>
                </Grid>
                <Grid item xs={7}>
                    <Item>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="paseviDomacin"
                        label="pasevi domacin"
                        type="number"
                        id="paseviDomacin"
                        autoComplete="0"
                        onChange={paseviDHandler}
                    />
          
                    </Item>
                </Grid>
                <Grid item xs={7}>
                    <Item>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="paseviGost"
                        label="pasevi gost"
                        type="number"
                        id="paseviGost"
                        autoComplete="0"
                        onChange={paseviGHandler}
                    />
          
                    </Item>
                </Grid>
                <Grid item xs={7}>
                    <Item>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="preciznostDomacin"
                        label="Preciznst domacin"
                        type="number"
                        id="preciznostDomacin"
                        autoComplete="0"
                        onChange={preciznostDHandler}
                    />
          
                    </Item>
                </Grid>
                <Grid item xs={7}>
                    <Item>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="preciznostGost"
                        label="preciznost gost"
                        type="number"
                        id="preciznostGost"
                        autoComplete="0"
                        onChange={preciznostGHandler}
                    />
          
                    </Item>
                </Grid>
                <Grid item xs={5}>
                    <Item>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="preciznostGost"
                        label="fauli domacin"
                        type="number"
                        id="preciznostGost"
                        autoComplete="0"
                        onChange={fauliDHandler}
                    />
          
                    </Item>
                </Grid>
                <Grid item xs={5}>
                    <Item>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="preciznostGost"
                        label="fauli gost"
                        type="number"
                        id="preciznostGost"
                        autoComplete="0"
                        onChange={fauliGHandler}
                    />
          
                    </Item>
                </Grid>
                <Grid item xs={5}>
                    <Item>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="preciznostGost"
                        label="zuti domacin"
                        type="number"
                        id="preciznostGost"
                        autoComplete="0"
                        onChange={zutiDHandler}
                    />
          
                    </Item>
                </Grid>
                <Grid item xs={5}>
                    <Item>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="preciznostGost"
                        label="zuti gost"
                        type="number"
                        id="preciznostGost"
                        autoComplete="0"
                        onChange={zutiGHandler}
                    />
          
                    </Item>
                </Grid>
                <Grid item xs={5}>
                    <Item>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="preciznostGost"
                        label="crveni domacin"
                        type="number"
                        id="preciznostGost"
                        autoComplete="0"
                        onChange={crveniDHandler}
                    />
          
                    </Item>
                </Grid>
                <Grid item xs={5}>
                    <Item>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="preciznostGost"
                        label="crveni gost"
                        type="number"
                        id="preciznostGost"
                        autoComplete="0"
                        onChange={crveniGHandler}
                    />
          
                    </Item>
                </Grid>

                <Grid item xs={7}>
                    <Item>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="preciznostGost"
                        label="korneri domacin"
                        type="number"
                        id="preciznostGost"
                        autoComplete="0"
                        onChange={korneriDHandler}
                    />
          
                    </Item>
                </Grid>
                <Grid item xs={7}>
                    <Item>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="preciznostGost"
                        label="korneri gost"
                        type="number"
                        id="preciznostGost"
                        autoComplete="0"
                        onChange={korneriGHandler}
                    />
          
                    </Item>
                </Grid>


                <Grid item xs={7}>
                    <Item>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="preciznostGost"
                        label="ofsajdi domacin"
                        type="number"
                        id="preciznostGost"
                        autoComplete="0"
                        onChange={ofsajdiDHandler}
                    />
          
                    </Item>
                </Grid>
                <Grid item xs={7}>
                    <Item>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="preciznostGost"
                        label="ofsajdi gost"
                        type="number"
                        id="preciznostGost"
                        autoComplete="0"
                        onChange={ofsajdiGHandler}
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
export default AzurirajStatistiku;
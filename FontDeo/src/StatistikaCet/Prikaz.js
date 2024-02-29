import { Avatar, BottomNavigation, BottomNavigationAction, Box, Button, Card, CardActions, CardContent, Chip, Container, Paper, TextField, Typography } from "@mui/material";
import * as React from 'react';
import Grid from '@mui/material/Grid'; // Grid version 1
import Grid2 from '@mui/material/Unstable_Grid2'; // Grid version 2
import { styled } from '@mui/material/styles';
import ButtonAppBar from "../GlavnaStranica/AppBar";
import Statistika from "./Statistika";
import Cet from "./Cet";
import axios from "axios";
import ButtonAppBarAdm from "../Admin/AppBarAdmin";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  
const Prikaz=()=>
{
    
    const [i,setI]=React.useState(0);
    
    const baza=(newData)=>
    {
       setI(newData+i);
       
    }
   const UTAKMICA= localStorage.getItem('utakmica');
   const [mec,setMec]=React.useState({});
   const [s1,setS1]=React.useState('');
   const [s2,setS2]=React.useState('');
   const email=localStorage.getItem('email');
   const [score,setScore]=React.useState('0:0');
   const[asin,setAsin]=React.useState(false);
   React.useEffect(() => {
 
    console.log('Uso sam u fju ponovo');
    
  const response =  axios.get(`https://localhost:7196/api/match/Getmatch/${UTAKMICA}`,
  {
    headers:{
      //Authorization: `Bearer ${token}`
    }
  }).then(response=>{
    setMec(response.data);
    setValue(0);
    setScore(mec.score);
    console.log(response.data);
    displayMatchTime();
    
  })
  .catch(error=>{
    console.log(error);
  })
  }, [UTAKMICA,i]);
  React.useEffect(() => {
    const connection = new HubConnectionBuilder()
      .withUrl("https://localhost:7196/ChatHub") // Promenjeno na ChatHub
      .build();
  
    connection.start().then(() => {
      console.log('Connected to SignalR hub');
    });
  
    connection.on("UpdatedStats", () => {
      console.log("Message set changed, refresh data");
      console.log('Uso sam u fju');
    
        const response =  axios.get(`https://localhost:7196/api/match/Getmatch/${UTAKMICA}`,
        {
          headers:{
            //Authorization: `Bearer ${token}`
          }
        }).then(response=>{
          setMec(response.data);
          setValue(0);
          setScore(mec.score);
          console.log(response.data);
          displayMatchTime();
          
        })
        .catch(error=>{
          console.log(error);
        })
  
      // Ovde možete ažurirati stanje komponente, ponovo dohvatiti poruke itd.
    });
  
    
  }, [i]);
    const [value, setValue] = React.useState(-1);
    const statistikaHadler=(event)=>{
        setValue(0);

    }
    const cetHadler=(event)=>{
        setValue(1);

    }
    const handleChange=(event)=>
    {
       setScore(event.target.value);
       
    }
    const[menjaj,setMenjaj]=React.useState(0);
    const azurHandler=(event)=>
    {
        event.preventDefault();
        setMenjaj(1);
    }
    const azurHandler2=(event)=>
    {
        event.preventDefault();
        console.log('Uso sam u fju');
            const response =   axios.put(`https://localhost:7196/api/match/UpdateScore/${UTAKMICA}/${score}`,
            {
                headers:{
                //Authorization: `Bearer ${token}`
                }
            }).then(response=>{
                
              
                console.log(response.data);
                setI(i+1);
                setMenjaj(0);
            })
            .catch(error=>{
                console.log(error);
            })
    }
    const [conn,setConn]=React.useState();
  
    React.useEffect(() => {
        // Postavljanje intervala da se funkcija fetchData poziva svakih 60 sekundi
        const intervalId = setInterval(() => {
          
        console.log('Uso sam u fju');
        const response =  axios.get(`https://localhost:7196/api/match/TimeUntilMatch/${UTAKMICA}`,
        {
          headers:{
            //Authorization: `Bearer ${token}`
          }
        }).then(response=>{
          
         
          console.log(response.data);
          const response2 =  axios.get(`https://localhost:7196/api/match/Getmatch/${UTAKMICA}`,
            {
                headers:{
                //Authorization: `Bearer ${token}`
                }
            }).then(response=>{
                setMec(response.data);
                setValue(0);
                setScore(mec.score);
                console.log(response.data);
                displayMatchTime();
            })
            .catch(error=>{
                console.log(error);
            })
        })
        .catch(error=>{
          console.log(error);
        })
        }, 60000);
    
        // Čišćenje intervala prilikom unmount-a komponente
        return () => clearInterval(intervalId);
      }, [UTAKMICA]);
      const displayMatchTime = () => {
       
        if (mec.matchTime > 0) {
          return mec.matchDate;
        } else if (mec.matchTime <= 0 && mec.matchTime >= -45) {
          return `${-mec.matchTime} min`;
        } else if (mec.matchTime <= -45 && mec.matchTime >= -60) {
          return "Poluvreme";
        } else if (mec.matchTime <= -60 && mec.matchTime >= -105) {
          return `${-mec.matchTime + 15} min`;
        }
     
    
        return "Kraj";
      };
    return(
        <>
        {(email==null)&&(<ButtonAppBar/>)}
        {(email!=null&&!email.substring('admin'))&&(<ButtonAppBar/>)}
        {(email!=null&&email.substring('admin'))&&(<ButtonAppBarAdm/>)}
        <Paper elevation={10} maxWidth="sm" sx={{background:'#9fbec7',marginTop:'30px',width:'700px',marginLeft:'550px'}}>
            
            <Grid container spacing={0}>
                <Grid xs={8}>
                    <Typography>
                        <h3 style={{fontFamily:'cursive',marginLeft:'0px'}}>
                            Premier league:{mec.matchDate}
                        </h3>
                    </Typography>
                </Grid>
                <Grid xs={2}>
                    <Typography>
                        <h3 style={{fontFamily:'cursive',marginLeft:'0px'}}>
                            ID:{mec.id}
                        </h3>
                    </Typography>
                </Grid>
               
                <Grid xs={2}>
                    <Typography>
                        <h3 style={{fontFamily:'cursive',color:'yellow'}}>
                        {value==0&&(displayMatchTime())}
                        {value==1&&(displayMatchTime())}
                        </h3>
                    </Typography>
                </Grid>
                <Grid xs={2}>
                    <Typography>
                        <h3 style={{fontFamily:'cursive'}}>
                        <Avatar sx={{marginLeft:'40px'}}> {value === -1 ? 'H' : mec.homeTeam[0]+mec.homeTeam[1]+mec.homeTeam[2]}</Avatar>
                           {mec.homeTeam}
                        </h3>
                    </Typography>
                </Grid>
               {menjaj==0&&( <Grid xs={8}>
                <h1 style={{fontFamily:'cursive',color:'yellow'}}>
               {mec.score}
                </h1>
                   <Button variant="contained" onClick={azurHandler} style={{ display: (email !== null && email.includes('admin')) ? '' : 'none' }}>Azuriraj rezultat</Button>
                </Grid>)}
                {menjaj==1&&( <Grid xs={8}>
                <TextField defaultValue={score} onChange={handleChange}></TextField>
                <Button variant="contained" onClick={azurHandler2}>Azuriraj rezultat</Button>
                   
                </Grid>)}
                <Grid xs={2}>
                    <Typography>
                        <h3 style={{fontFamily:'cursive'}}>
                            <Avatar sx={{marginLeft:'40px'}}>{value === -1 ? 'A' : mec.awayTeam[0]+mec.awayTeam[1]+mec.awayTeam[2]}</Avatar>
                            {mec.awayTeam}
                        </h3>
                    </Typography>
                </Grid>
                <Grid xs={12}>
                    <Typography>
                        <h1 style={{fontFamily:'cursive'}}>
                            {mec.fixture}
                        </h1>
                    </Typography>
                </Grid>
                <Box sx={{ width: 700 }}>
                <BottomNavigation
                    showLabels
                    value={value}
                    
                >
                    <BottomNavigationAction label="Statistika" sx={{color:'black',fontFamily:'cursiive'}}onClick={statistikaHadler}/>
                    <BottomNavigationAction label="Uzivo pracenje utakmice"sx={{color:'black',fontFamily:'cursiive'}}onClick={cetHadler} />
                </BottomNavigation>
                </Box>
                <Box sx={{ width: 700 }}>
                {value==0&&(<Statistika utakmica={mec.stats} tim1={mec.homeTeam[0]+mec.homeTeam[1]+mec.homeTeam[2]} tim2={mec.awayTeam[0]+mec.awayTeam[1]+mec.awayTeam[2]}baza={baza}idutakmice={UTAKMICA}/>)}
                {value==1&&(<Cet/>)}
                </Box>
                                    
                        
                </Grid>

            
        </Paper>
        </>
    );

}
export default Prikaz;
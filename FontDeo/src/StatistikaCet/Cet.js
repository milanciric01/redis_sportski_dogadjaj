import { Alert, Avatar, Button, Grid, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useQuery } from 'react-query';

import Poruka from "./Poruka";
import axios from "axios";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
const Cet=()=>
{
    const mejl=localStorage.getItem('email');
    const UTAKMICA= localStorage.getItem('utakmica');
    const [message,setMessage]=useState([]);
    const[komentar,setKomentar]=useState('');
    const email=localStorage.getItem("email");
    const [conn,setConn]=React.useState();
    const[baza,setBaza]=useState(1);
    useEffect(() => {
      const connection = new HubConnectionBuilder()
        .withUrl("https://localhost:7196/ChatHub") // Promenjeno na ChatHub
        .build();
    
      connection.start().then(() => {
        console.log('Connected to SignalR hub');
      });
    
      connection.on("MessageSetChanged", () => {
        console.log("Message set changed, refresh data");
        console.log('Uso sam u fju');
        if(mejl!=null){
      const response =  axios.get(`https://localhost:7196/api/match/ReadConversation/${UTAKMICA}`,
      {
        headers:{
          //Authorization: `Bearer ${token}`
        }
      }).then(response=>{
        setMessage(response.data);
        setValue(1);
       
        console.log(response.data);
      })
      .catch(error=>{
        console.log(error);
      });
    }
        // Ovde možete ažurirati stanje komponente, ponovo dohvatiti poruke itd.
      });
    
      
    }, []);
    const komentarHandler=(event)=>{
     
        const novoKomentar = event.target.value;
    
        // Ažuriramo stanje sa novom vrednošću
        setKomentar(novoKomentar); 
    }
    const saljiHandler=(event)=>{
        event.preventDefault();
        const response = axios.post(
          `https://localhost:7196/api/match/SendMessage`,
          {
            id: 20,
            email: mejl,
            poruka: komentar,
            idMeca: UTAKMICA
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
           
            
          
        })
          .catch((error) => {
            // Obrada greške
            console.log(error);
            
          });

    }
    useEffect(() => {
 
        console.log('Uso sam u fju');
        if(mejl!=null){
      const response =  axios.get(`https://localhost:7196/api/match/ReadConversation/${UTAKMICA}`,
      {
        headers:{
          //Authorization: `Bearer ${token}`
        }
      }).then(response=>{
        setMessage(response.data);
        setValue(1);
       
        console.log(response.data);
      })
      .catch(error=>{
        console.log(error);
      })
    }
      }, [UTAKMICA]);
        const [value, setValue] = useState(0);
        const statistikaHadler=(event)=>{
            setValue(0);
    
        }
   
    const kola=message.map((element) => (
       <>
         {value==1&&mejl===element.email&&(<><Grid xs={12}>
        <Avatar sx={{marginTop:'10px',marginLeft:'60px'}}>{element.email[0]}{element.email[1]}</Avatar>
        </Grid>
        <Grid xs={4}sx={{marginLeft:'115px',marginTop:'-20px'}}>
            <Poruka m={element}/>
        </Grid></>)}
        {value===1&&mejl!=element.email&&(<><Grid xs={12} >
        <Avatar sx={{marginTop:'10px',marginLeft:'40px',marginLeft:'650px'}}>{element.email[0]}{element.email[1]}</Avatar>
        </Grid>
        <Grid xs={4}sx={{marginLeft:'115px',marginTop:'-20px',marginLeft:'500px'}}>
            <Poruka m={element}/>
        </Grid></>)}
        {value===0&&(<><Grid xs={12} >
       
        </Grid>
        <Grid xs={4}sx={{marginLeft:'115px',marginTop:'-20px',marginLeft:'500px'}}>
            <h1>Morate biti prijavljeni da bi ste videli poruke</h1>
        </Grid></>)}
        </>
        ));

    return(
        <Grid container spacing={0}>
           {kola}
           {mejl!=null&&(<><Grid sx={10}>
           <TextField id="filled-basic" label="Napisite komentar" variant="filled" sx={{width:'600px'}} onChange={komentarHandler}/>
           </Grid>
           <Grid sx={2}>
           <Button variant="contained" sx={{width:'100px',marginBottom:'0px',height:'60px'}} onClick={saljiHandler} >Posalji</Button>
           </Grid></>)}
           {mejl===null&&(<><Grid sx={10}>
            <Alert severity="error" sx={{width:'700px'}}>Morate se prijaviti da bi ste napisali komentar!</Alert>
           </Grid></>)}


        </Grid>
    );

}
export default Cet;
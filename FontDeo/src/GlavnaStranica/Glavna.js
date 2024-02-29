import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, FormControl, Grid, InputLabel, MenuItem, Paper, Select, Typography } from "@mui/material";
import Item from '@mui/material/ListItem'
import ButtonAppBar from "./AppBar";
import Kolo from "../KoloTabela/Kolo";
import { useEffect, useState } from "react";
import axios from "axios";
import ButtonAppBarAdm from "../Admin/AppBarAdmin";
import { HubConnectionBuilder } from "@microsoft/signalr";
const BASE_API_URL = 'http://127.0.0.1:6379';
const Glavna=()=>{
  useEffect(() => {
    const connection = new HubConnectionBuilder()
      .withUrl("https://localhost:7196/ChatHub") // Promenjeno na ChatHub
      .build();
  
    connection.start().then(() => {
      console.log('Connected to SignalR hub');
    });
  
    connection.on("UpdatedStats", () => {
      console.log("Message set changed, refresh data");
      console.log('Uso sam u fju');
      const response =  axios.get(`https://localhost:7196/api/match/GetMatchesInFixture/${kolo}`,
      {
        headers:{
          //Authorization: `Bearer ${token}`
        }
      }).then(response=>{
        setMatches(response.data);
        setValue(1);
        console.log(response.data);
      })
      .catch(error=>{
        console.log(error);
        setValue(0);
      })
      // Ovde možete ažurirati stanje komponente, ponovo dohvatiti poruke itd.
    });
  
    
  }, []);
    const[matches,setMatches]=useState([]);
    const [value,setValue]=useState(0);
    const email=localStorage.getItem('email');
    const kola=matches.map((element) => (
    <Kolo match={element} />
    ));
    const kolaI = [
        'Kolo 1',
        'Kolo 2',
        'Kolo 3',
        'Kolo 4',
        'Kolo 5',
        'Kolo 6',
        'Kolo 7',
        'Kolo 8',
        'Kolo 9',
        'Kolo 10',
      ];
      const [kolo, setKolo] = useState('Kolo 1');

      const handleChange = (event) => {
        setKolo(event.target.value);
        console.log(event.target.value);
        
      };
  
    useEffect(() => {
 
        console.log('Uso sam u fju');
        if(email!=null&&!email.substring('admin')==false)
        {
          console.log('korisnik');
        }
        if(email!=null&&email.substring('admin')==true)
        {
          console.log('admin');
        }
      const response =  axios.get(`https://localhost:7196/api/match/GetMatchesInFixture/${kolo}`,
      {
        headers:{
          //Authorization: `Bearer ${token}`
        }
      }).then(response=>{
        setMatches(response.data);
        setValue(1);
        console.log(response.data);
      })
      .catch(error=>{
        console.log(error);
        setValue(0);
      })
      }, [kolo]);
     
    return (
    <>  
        {(email==null)&&(<ButtonAppBar/>)}
        {(email !== null && !email.includes('admin')) && <ButtonAppBar />}
        {(email!=null&&email.includes('admin')===true)&&(<ButtonAppBarAdm/>)}
          <Grid container spacing={0} >
          <Grid xs={5}>
        
                      </Grid>
          <Grid xs={6}>
              <Item>
                <h1 style={{marginLeft:'70px'}}>
                        <FormControl variant="filled" sx={{width:'920px',marginTop:'130px',marginLeft:'-320px'}} >
                <InputLabel id="demo-simple-select-filled-label">Kolo</InputLabel>
                <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={kolo}
                onChange={handleChange}
                >
                <MenuItem>
                <em>None</em>
                </MenuItem>
                {kolaI.map(element=>
                    <MenuItem value={element}>{element}</MenuItem>


                )}
                </Select>
            </FormControl>
                </h1>
                </Item>
          </Grid>
          <Grid xs={2}>
              
          </Grid>
      </Grid>
       {value==1&&(kola)}
    </>
    )

}
export default Glavna;

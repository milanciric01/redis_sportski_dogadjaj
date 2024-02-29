import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import React, { useEffect, useState } from 'react';
import ButtonAppBar from '../GlavnaStranica/AppBar';
import axios from 'axios';
import { Button } from '@mui/material';
import ButtonAppBarAdm from '../Admin/AppBarAdmin';

function createData(PunoIme, DatiGolovi, Sutevi, Asistencije, Zuti, Crveni) {
    return { PunoIme, DatiGolovi, Sutevi, Asistencije, Zuti, Crveni };
  }

  
  const Igraci=()=>{
    const [tim,setTim]=useState(localStorage.getItem('tim'));
    const email=localStorage.getItem('email');
  const [objekat,setObjekat]=useState({});
  const [value,setValue]=useState(0);
  useEffect(() => {
    console.log(`${tim}`);
    console.log('Uso sam u fju');
  const response =  axios.get(`https://localhost:7196/api/Team/GetTeam/${tim}`,
  {
    headers:{
      //Authorization: `Bearer ${token}`
    }
  }).then(response=>{
    setObjekat(response.data);
    setValue(1);
    console.log(objekat);
  })
  .catch(error=>{
    console.log(error);
  })
  }, []);
    return (
    
        <>
            {value==1&&(<>{(email==null)&&(<ButtonAppBar/>)}
        {(email!=null&&!email.substring('admin'))&&(<ButtonAppBar/>)}
        {(email!=null&&email.substring('admin'))&&(<ButtonAppBarAdm/>)}
             <TableContainer component={Paper} sx={{display:'flex',justifyContent:'center',alignItems:'center',marginTop:'80px'}}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">  
            <TableHead sx={{background: '#0a434a'}}>
            <TableCell sx={{ fontFamily: 'cursive',textAlign:'center',color:'white' }}>Redni broj</TableCell>
              <TableCell sx={{ fontFamily: 'cursive',textAlign:'center',color:'white' }}>Puno ime</TableCell>
              <TableCell sx={{ fontFamily: 'cursive', textAlign:'center',color:'white'}}>Dati golovi</TableCell>
              <TableCell sx={{ fontFamily: 'cursive', textAlign:'center',color:'white' }}>Sutevi</TableCell>
              <TableCell sx={{ fontFamily: 'cursive', textAlign:'center',color:'white' }}>Asistencije</TableCell>
              <TableCell sx={{ fontFamily: 'cursive', textAlign:'center',color:'white'}}>Zuti</TableCell>
              <TableCell sx={{ fontFamily: 'cursive', textAlign:'center',color:'white'}}>Crveni</TableCell>
              <TableCell sx={{ fontFamily: 'cursive', textAlign:'center',color:'white'}}>Klub</TableCell>
              
            </TableHead>
            <TableBody sx={{background:'#07808f'}}>
              {objekat.players.map((element,ind) =>

                <TableRow key={element.Id}>
                    <TableCell sx={{  fontFamily: 'cursive', textAlign:'center',color:'white' }}>{ind+1}</TableCell>
                  <TableCell sx={{  textAlign:'center', fontFamily: 'cursive',color:'white' }}>{element.full_Name}</TableCell>

                  <TableCell sx={{  textAlign:'center', fontFamily: 'cursive',color:'white' }}>{element.goalsScored}</TableCell>

                  <TableCell sx={{  textAlign:'center', fontFamily: 'cursive',color:'white' }}>{element.shots}</TableCell>

                  <TableCell sx={{  textAlign:'center', fontFamily: 'cursive',color:'white' }}>{element.assists}</TableCell>

                  <TableCell sx={{  textAlign:'center', fontFamily: 'cursive',color:'white' }}>{element.yellowCards}</TableCell>
                  <TableCell sx={{  textAlign:'center', fontFamily: 'cursive',color:'white' }}>{element.redCards}</TableCell>
                  <TableCell sx={{  textAlign:'center', fontFamily: 'cursive',color:'white' }}>{element.tim}</TableCell>
                               
                </TableRow>

              )}

            </TableBody>

          </Table>
          </TableContainer></>)};

        </>
    );
}
export default Igraci;
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
import { Navigate, useNavigate } from 'react-router-dom';
import ButtonAppBarAdm from '../Admin/AppBarAdmin';

function createData(pos, ou, w, d, l, gf,ga,gd,pts) {
    return { pos, ou, w, d, l, gf,ga,gd,pts };
  }
  
  
  
  const Tabela=()=>{
  const [klubovi,setKlubovi]=useState([]);
  const [value,setValue]=useState(0);
  const email=localStorage.getItem('email');
  const navigate = useNavigate(); 
  const btnHandler=(event,tim)=>{
    event.preventDefault();
    navigate('/Igraci');
    localStorage.setItem('tim',tim);
  }
  useEffect(() => {
 
    console.log('Uso sam u fju');
  const response =  axios.get(`https://localhost:7196/api/Team/GetSortedTeams`,
  {
    headers:{
      //Authorization: `Bearer ${token}`
    }
  }).then(response=>{
    setKlubovi(response.data);
    setValue(1);
    console.log(klubovi);
  })
  .catch(error=>{
    console.log(error);
  })
  }, []);
    return (
    
        <>
            {value==1&&(<>  {(email==null)&&(<ButtonAppBar/>)}
        {(email!=null&&!email.substring('admin'))&&(<ButtonAppBar/>)}
        {(email!=null&&email.substring('admin'))&&(<ButtonAppBarAdm/>)}
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
                  <TableCell sx={{  textAlign:'center', fontFamily: 'cursive',color:'white' }}>{element.goals_Difference}</TableCell>
                  <TableCell sx={{  textAlign:'center', fontFamily: 'cursive',fontWeight: 'bold',color:'#92c4d1' }}>{element.points}</TableCell>
                  <TableCell sx={{  textAlign:'center', fontFamily: 'cursive',fontWeight: 'bold',color:'#92c4d1' }}><Button sx={{color:'white',fontFamily:'cursive'}}   onClick={(event) => btnHandler(event, element.name)} >Vidi Igrace</Button></TableCell>
               
                </TableRow>

              )}

            </TableBody>

          </Table>
          </TableContainer></>)};

        </>
    );
}
export default Tabela;
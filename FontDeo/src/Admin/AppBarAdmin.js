import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { CssBaseline, Drawer, Grid, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function ButtonAppBarAdm() {
    const navigate = useNavigate(); 
    const tabelaHandler=(event)=>{
        event.preventDefault();
        navigate('/Tabela');

    }
    const prijavaHandler=(event)=>{
        event.preventDefault();
        navigate('/Prijava');
    }
    const odjavaHandler=(event)=>{
      event.preventDefault();
     
      localStorage.removeItem('email');
    
      navigate('/Prijava');
  }
  const dodajUtakmicuHandler=(event)=>
  {
    event.preventDefault();
    navigate('/DodajUtakmicu')
  }
  const dodajIgracaHandler=(event)=>
  {
    event.preventDefault();
    navigate('/DodajIgraca');
  }
  const azurirajRezultatHandler=(event)=>
  {
    event.preventDefault();
    navigate('/AzurirajRezultat');
  }
  const dodajStadionHandler=(event)=>
  {
    event.preventDefault();
    navigate('/DodajStadion');
  }
   const dodajTimHandler=(event)=>
   {
    event.preventDefault();
    navigate('/DodajTim');
   }
    const email=localStorage.getItem('email');
   

  
  return (
    
    <Box sx={{ display: 'flex' }}>
    <CssBaseline />
    <AppBar component="nav">
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' },marginLeft:'120px' }}
        >
         
         
        </Typography>
        
        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
       
        <Button key="addMatch" sx={{ color: '#fff',marginBottom:'10px',marginLeft:'-1300px',paddingRight:'140px' }}onClick={dodajUtakmicuHandler}>
              Dodaj utakmicu
        </Button>
      
            <Button key="Tabela" sx={{ color: '#fff',marginBottom:'10px',paddingRight:'140px' }} onClick={dodajStadionHandler}>
             Dodaj stadion
            </Button>
    
            <Button key="Tabela" sx={{ color: '#fff',marginBottom:'10px',paddingRight:'140px' }} onClick={dodajIgracaHandler}>
             Dodaj igraca
            </Button>
            <Button key="Tabela" sx={{ color: '#fff',marginBottom:'10px',paddingRight:'140px' }} onClick={dodajTimHandler}>
              Dodaj tim
            </Button>
            <Button key="Tabela" sx={{ color: '#fff',marginBottom:'10px',padddingRight:'140px' }} onClick={tabelaHandler}>
              Vidi tabelu
            </Button>
            {email!=null&&(<>
            <Avatar sx={{ color: '#fff',marginTop:'-40px',marginRight:'130px' }} >{email[0]+email[1]}</Avatar>
            <Button onClick={odjavaHandler} sx={{color:'white',marginTop:'-70px'}}>Odjavi se</Button>
            </>
            )}
        </Box>
      </Toolbar>
    </AppBar>
    <nav>
      <Drawer
        
        variant="temporary"
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: "100px" },
        }}
      >
       
      </Drawer>
    </nav>
    <Box component="main" sx={{ p: 3 }}>
      <Toolbar />
    
    </Box>
  </Box>

  );
}
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    maxWidth: 400,
  }));
  const mejl=localStorage.getItem('email');
const Poruka=(props)=>{
   
    return(
    <Box sx={{ flexGrow: 1, overflow: 'hidden', px: 3,marginLeft:'-60px',marginBottom:'-10px' }}>
   {mejl==props.m.email&&(<Item
        sx={{
        my: 1,
        mx: 'auto',
        p: 2,
        bgcolor:'#4d8554'
        
        }}
    >
        <Stack spacing={2} direction="row" alignItems="center" >
    <Typography noWrap sx={{fontFamily:'cursive',color:'white'}}>{props.m.poruka}</Typography>
    </Stack>
    </Item>
    )}
    {mejl!=props.m.email&&(<Item
    sx={{
    my: 1,
    mx: 'auto',
    p: 2,
    bgcolor:'#6b7e87'
    }}
>
    <Stack spacing={2} direction="row" alignItems="center" >
<Typography noWrap sx={{fontFamily:'cursive',color:'white'}}>{props.m.poruka}</Typography>
</Stack>
</Item>
)}
    </Box>
    );
}
export default Poruka;
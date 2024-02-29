import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Paper, Typography } from "@mui/material";
import Item from '@mui/material/ListItem'
import { useNavigate } from "react-router-dom";


const Kolo=(props)=>
{
    const navigate=useNavigate();
    localStorage.removeItem('utakmica');
    const detaljiHandler=(event)=>{
        event.preventDefault();
        localStorage.setItem('utakmica',props.match.id);
        navigate('/PrikazMeca');
    }
   
    return (
        <>
       
      
      <Paper elevation={24}sx={{ marginBottom: '30px'}}>
      <Grid container spacing={0} color="inherit" height={'100px'}>
      <Grid xs={1}>
          <Item>
         <h3>ID:{props.match.id}</h3>
          </Item>
         </Grid>
         <Grid xs={4}>
          <Item>
         <h3>{props.match.matchDate},{props.matchTime}</h3>
          </Item>
         </Grid>
         <Grid xs={1}>
          <Item>
          <h3>{props.match.homeTeam}</h3>
          </Item>
         </Grid>
         <Grid xs={1}>
         <Paper elevation={1} sx={{ marginTop: '30px'}}><h3>{props.match.score}</h3></Paper>
         </Grid>
         <Grid xs={2}>
          <Item>
          <h3>{props.match.awayTeam}</h3>
          </Item>
         </Grid>
         <Grid xs={2}>
          <Item>
          <Button variant="contained" sx={{ marginTop: '10px',marginLeft:'48px' }} onClick={detaljiHandler}>Detalji</Button>
          </Item>
         </Grid>
         
                  
     
      </Grid>
      </Paper>
      </>
    )


}
export default Kolo;
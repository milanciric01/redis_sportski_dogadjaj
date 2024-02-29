import { Avatar, Button, Grid, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Chip from '@mui/material/Chip';
const Statistika=(props)=>{
    const email=localStorage.getItem('email');
 const addShotHome=(event)=>
 {
    event.preventDefault();
    console.log('Uso sam u fju');
    const response =  axios.put(`https://localhost:7196/api/match/AddShot/${props.idutakmice}/false/true`,
    {
      headers:{
        //Authorization: `Bearer ${token}`
      }
    }).then(response=>{
      let a=localStorage.getItem('ponovo');
      props.baza(1);
      console.log(response.data);
    })
    .catch(error=>{
      console.log(error);
    })
 }
 const addShotAway=(event)=>
 {
    event.preventDefault();
    console.log('Uso sam u fju');
    const response =  axios.put(`https://localhost:7196/api/match/AddShot/${props.idutakmice}/false/false`,
    {
      headers:{
        //Authorization: `Bearer ${token}`
      }
    }).then(response=>{
      
      props.baza(1);
      console.log(response.data);
    })
    .catch(error=>{
      console.log(error);
    })
 }
 const addShotOnGoalHome=(event)=>
 {
    event.preventDefault();
    console.log('Uso sam u fju');
    const response =  axios.put(`https://localhost:7196/api/match/AddShot/${props.idutakmice}/true/true`,
    {
      headers:{
        //Authorization: `Bearer ${token}`
      }
    }).then(response=>{
      
      props.baza(1);
      console.log(response.data);
    })
    .catch(error=>{
      console.log(error);
    })
 }
 const addShotOnGoalAway=(event)=>
 {
    event.preventDefault();
    console.log('Uso sam u fju');
    const response =  axios.put(`https://localhost:7196/api/match/AddShot/${props.idutakmice}/true/false`,
    {
      headers:{
        //Authorization: `Bearer ${token}`
      }
    }).then(response=>{
      
      props.baza(1);
      console.log(response.data);
    })
    .catch(error=>{
      console.log(error);
    })
 }
 const subShotHome=(event)=>
 {
    event.preventDefault();
    console.log('Uso sam u fju');
    const response =  axios.put(`https://localhost:7196/api/match/SubShot/${props.idutakmice}/false/true`,
    {
      headers:{
        //Authorization: `Bearer ${token}`
      }
    }).then(response=>{
      let a=localStorage.getItem('ponovo');
      props.baza(1);
      console.log(response.data);
    })
    .catch(error=>{
      console.log(error);
    })
 }
 const subShotAway=(event)=>
 {
    event.preventDefault();
    console.log('Uso sam u fju');
    const response =  axios.put(`https://localhost:7196/api/match/SubShot/${props.idutakmice}/false/false`,
    {
      headers:{
        //Authorization: `Bearer ${token}`
      }
    }).then(response=>{
      
      props.baza(1);
      console.log(response.data);
    })
    .catch(error=>{
      console.log(error);
    })
 }
 const subShotOnGoalHome=(event)=>
 {
    event.preventDefault();
    console.log('Uso sam u fju');
    const response =  axios.put(`https://localhost:7196/api/match/SubShot/${props.idutakmice}/true/true`,
    {
      headers:{
        //Authorization: `Bearer ${token}`
      }
    }).then(response=>{
      
      props.baza(1);
      console.log(response.data);
    })
    .catch(error=>{
      console.log(error);
    })
 }
 const subShotOnGoalAway=(event)=>
 {
    event.preventDefault();
    console.log('Uso sam u fju');
    const response =  axios.put(`https://localhost:7196/api/match/SubShot/${props.idutakmice}/true/false`,
    {
      headers:{
        //Authorization: `Bearer ${token}`
      }
    }).then(response=>{
      
      props.baza(1);
      console.log(response.data);
    })
    .catch(error=>{
      console.log(error);
    })
 }
 const addPossesionHome=(event)=>
 {
    event.preventDefault();
    console.log('Uso sam u fju');
    const response =  axios.put(`https://localhost:7196/api/match/AddPossesion/${props.idutakmice}/true`,
    {
      headers:{
        //Authorization: `Bearer ${token}`
      }
    }).then(response=>{
      props.baza(1);
      console.log(response.data);
    })
    .catch(error=>{
      console.log(error);
    })
 }
 const addPossesionAway=(event)=>
 {
    event.preventDefault();
    console.log('Uso sam u fju');
    const response =  axios.put(`https://localhost:7196/api/match/AddPossesion/${props.idutakmice}/false`,
    {
      headers:{
        //Authorization: `Bearer ${token}`
      }
    }).then(response=>{
      
      props.baza(1);
      console.log(response.data);
    })
    .catch(error=>{
      console.log(error);
    })
 }
 const subPossesionHome=(event)=>
 {
    event.preventDefault();
    console.log('Uso sam u fju');
    const response =  axios.put(`https://localhost:7196/api/match/SubPossesion/${props.idutakmice}/true`,
    {
      headers:{
        //Authorization: `Bearer ${token}`
      }
    }).then(response=>{
      props.baza(1);
      console.log(response.data);
    })
    .catch(error=>{
      console.log(error);
    })
 }
 const subPossesionAway=(event)=>
 {
    event.preventDefault();
    console.log('Uso sam u fju');
    const response =  axios.put(`https://localhost:7196/api/match/SubPossesion/${props.idutakmice}/false`,
    {
      headers:{
        //Authorization: `Bearer ${token}`
      }
    }).then(response=>{
      
      props.baza(1);
      console.log(response.data);
    })
    .catch(error=>{
      console.log(error);
    })
}
const addPassesHome=(event)=>
{
   event.preventDefault();
   console.log('Uso sam u fju');
   const response =  axios.put(`https://localhost:7196/api/match/SetPasses/${props.idutakmice}/true/true`,
   {
     headers:{
       //Authorization: `Bearer ${token}`
     }
   }).then(response=>{
     props.baza(1);
     console.log(response.data);
   })
   .catch(error=>{
     console.log(error);
   })
}
const addPassesAway=(event)=>
{
   event.preventDefault();
   console.log('Uso sam u fju');
   const response =  axios.put(`https://localhost:7196/api/match/SetPasses/${props.idutakmice}/true/false`,
   {
     headers:{
       //Authorization: `Bearer ${token}`
     }
   }).then(response=>{
     
     props.baza(1);
     console.log(response.data);
   })
   .catch(error=>{
     console.log(error);
   })
}
const subPassesHome=(event)=>
{
   event.preventDefault();
   console.log('Uso sam u fju');
   const response =  axios.put(`https://localhost:7196/api/match/SetPasses/${props.idutakmice}/false/true`,
   {
     headers:{
       //Authorization: `Bearer ${token}`
     }
   }).then(response=>{
     props.baza(1);
     console.log(response.data);
   })
   .catch(error=>{
     console.log(error);
   })
}
const subPassesAway=(event)=>
{
   event.preventDefault();
   console.log('Uso sam u fju');
   const response =  axios.put(`https://localhost:7196/api/match/SetPasses/${props.idutakmice}/false/false`,
   {
     headers:{
       //Authorization: `Bearer ${token}`
     }
   }).then(response=>{
     
     props.baza(1);
     console.log(response.data);
   })
   .catch(error=>{
     console.log(error);
   })
}
const addFoulsAway=(event)=>
{
   event.preventDefault();
   console.log('Uso sam u fju');
   const response =  axios.put(`https://localhost:7196/api/match/Fouls/${props.idutakmice}/true/false/false/false/true`,
   {
     headers:{
       //Authorization: `Bearer ${token}`
     }
   }).then(response=>{
     props.baza(1);
     console.log(response.data);
   })
   .catch(error=>{
     console.log(error);
   })
}
const subFoulsAway=(event)=>
{
   event.preventDefault();
   console.log('Uso sam u fju');
   const response =  axios.put(`https://localhost:7196/api/match/Fouls/${props.idutakmice}/true/false/false/false/false`,
   {
     headers:{
       //Authorization: `Bearer ${token}`
     }
   }).then(response=>{
     
     props.baza(1);
     console.log(response.data);
   })
   .catch(error=>{
     console.log(error);
   })
}
const addFoulsHome=(event)=>
{
   event.preventDefault();
   console.log('Uso sam u fju');
   const response =  axios.put(`https://localhost:7196/api/match/Fouls/${props.idutakmice}/true/false/false/true/true`,
   {
     headers:{
       //Authorization: `Bearer ${token}`
     }
   }).then(response=>{
     props.baza(1);
     console.log(response.data);
   })
   .catch(error=>{
     console.log(error);
   })
}
const subFoulsHome=(event)=>
{
   event.preventDefault();
   console.log('Uso sam u fju');
   const response =  axios.put(`https://localhost:7196/api/match/Fouls/${props.idutakmice}/true/false/false/true/false`,
   {
     headers:{
       //Authorization: `Bearer ${token}`
     }
   }).then(response=>{
     
     props.baza(1);
     console.log(response.data);
   })
   .catch(error=>{
     console.log(error);
   })
}
const addYellowsHome=(event)=>
{
   event.preventDefault();
   console.log('Uso sam u fju');
   const response =  axios.put(`https://localhost:7196/api/match/Fouls/${props.idutakmice}/false/true/false/true/true`,
   {
     headers:{
       //Authorization: `Bearer ${token}`
     }
   }).then(response=>{
     props.baza(1);
     console.log(response.data);
   })
   .catch(error=>{
     console.log(error);
   })
}
const subYellowsHome=(event)=>
{
   event.preventDefault();
   console.log('Uso sam u fju');
   const response =  axios.put(`https://localhost:7196/api/match/Fouls/${props.idutakmice}/false/true/false/true/false`,
   {
     headers:{
       //Authorization: `Bearer ${token}`
     }
   }).then(response=>{
     
     props.baza(1);
     console.log(response.data);
   })
   .catch(error=>{
     console.log(error);
   })
}
const addYellowsAway=(event)=>
{
   event.preventDefault();
   console.log('Uso sam u fju');
   const response =  axios.put(`https://localhost:7196/api/match/Fouls/${props.idutakmice}/false/true/false/false/true`,
   {
     headers:{
       //Authorization: `Bearer ${token}`
     }
   }).then(response=>{
     props.baza(1);
     console.log(response.data);
   })
   .catch(error=>{
     console.log(error);
   })
}
const subYellowsAway=(event)=>
{
   event.preventDefault();
   console.log('Uso sam u fju');
   const response =  axios.put(`https://localhost:7196/api/match/Fouls/${props.idutakmice}/false/true/false/false/false`,
   {
     headers:{
       //Authorization: `Bearer ${token}`
     }
   }).then(response=>{
     
     props.baza(1);
     console.log(response.data);
   })
   .catch(error=>{
     console.log(error);
   })
}
const addRedsHome=(event)=>
{
   event.preventDefault();
   console.log('Uso sam u fju');
   const response =  axios.put(`https://localhost:7196/api/match/Fouls/${props.idutakmice}/false/false/true/true/true`,
   {
     headers:{
       //Authorization: `Bearer ${token}`
     }
   }).then(response=>{
     props.baza(1);
     console.log(response.data);
   })
   .catch(error=>{
     console.log(error);
   })
}
const subRedsHome=(event)=>
{
   event.preventDefault();
   console.log('Uso sam u fju');
   const response =  axios.put(`https://localhost:7196/api/match/Fouls/${props.idutakmice}/false/false/true/true/false`,
   {
     headers:{
       //Authorization: `Bearer ${token}`
     }
   }).then(response=>{
     
     props.baza(1);
     console.log(response.data);
   })
   .catch(error=>{
     console.log(error);
   })
}
const addRedsAway=(event)=>
{
   event.preventDefault();
   console.log('Uso sam u fju');
   const response =  axios.put(`https://localhost:7196/api/match/Fouls/${props.idutakmice}/false/false/true/false/true`,
   {
     headers:{
       //Authorization: `Bearer ${token}`
     }
   }).then(response=>{
     props.baza(1);
     console.log(response.data);
   })
   .catch(error=>{
     console.log(error);
   })
}
const subRedsAway=(event)=>
{
   event.preventDefault();
   console.log('Uso sam u fju');
   const response =  axios.put(`https://localhost:7196/api/match/Fouls/${props.idutakmice}/false/false/true/false/false`,
   {
     headers:{
       //Authorization: `Bearer ${token}`
     }
   }).then(response=>{
     
     props.baza(1);
     console.log(response.data);
   })
   .catch(error=>{
     console.log(error);
   })
}
const addOffsidesHome=(event)=>
{
   event.preventDefault();
   console.log('Uso sam u fju');
   const response =  axios.put(`https://localhost:7196/api/match/IncrementOffsides/${props.idutakmice}/true/true`,
   {
     headers:{
       //Authorization: `Bearer ${token}`
     }
   }).then(response=>{
     props.baza(1);
     console.log(response.data);
   })
   .catch(error=>{
     console.log(error);
   })
}
const subOffsidesHome=(event)=>
{
   event.preventDefault();
   console.log('Uso sam u fju');
   const response =   axios.put(`https://localhost:7196/api/match/IncrementOffsides/${props.idutakmice}/true/false`,
   {
     headers:{
       //Authorization: `Bearer ${token}`
     }
   }).then(response=>{
     
     props.baza(1);
     console.log(response.data);
   })
   .catch(error=>{
     console.log(error);
   })
}
const addOffsidesAway=(event)=>
{
   event.preventDefault();
   console.log('Uso sam u fju');
   const response =   axios.put(`https://localhost:7196/api/match/IncrementOffsides/${props.idutakmice}/false/true`,
   {
     headers:{
       //Authorization: `Bearer ${token}`
     }
   }).then(response=>{
     props.baza(1);
     console.log(response.data);
   })
   .catch(error=>{
     console.log(error);
   })
}
const subOffsidesAway=(event)=>
{
   event.preventDefault();
   console.log('Uso sam u fju');
   const response =   axios.put(`https://localhost:7196/api/match/IncrementOffsides/${props.idutakmice}/false/false`,
   {
     headers:{
       //Authorization: `Bearer ${token}`
     }
   }).then(response=>{
     
     props.baza(1);
     console.log(response.data);
   })
   .catch(error=>{
     console.log(error);
   })
}
const addCornersHome=(event)=>
{
   event.preventDefault();
   console.log('Uso sam u fju');
   const response =  axios.put(`https://localhost:7196/api/match/IncrementCorners/${props.idutakmice}/true/true`,
   {
     headers:{
       //Authorization: `Bearer ${token}`
     }
   }).then(response=>{
     props.baza(1);
     console.log(response.data);
   })
   .catch(error=>{
     console.log(error);
   })
}
const subCornersHome=(event)=>
{
   event.preventDefault();
   console.log('Uso sam u fju');
   const response =   axios.put(`https://localhost:7196/api/match/IncrementCorners/${props.idutakmice}/true/false`,
   {
     headers:{
       //Authorization: `Bearer ${token}`
     }
   }).then(response=>{
     
     props.baza(1);
     console.log(response.data);
   })
   .catch(error=>{
     console.log(error);
   })
}
const addCornersAway=(event)=>
{
   event.preventDefault();
   console.log('Uso sam u fju');
   const response =   axios.put(`https://localhost:7196/api/match/IncrementCorners/${props.idutakmice}/false/true`,
   {
     headers:{
       //Authorization: `Bearer ${token}`
     }
   }).then(response=>{
     props.baza(1);
     console.log(response.data);
   })
   .catch(error=>{
     console.log(error);
   })
}
const subCornersAway=(event)=>
{
   event.preventDefault();
   console.log('Uso sam u fju');
   const response =   axios.put(`https://localhost:7196/api/match/IncrementCorners/${props.idutakmice}/false/false`,
   {
     headers:{
       //Authorization: `Bearer ${token}`
     }
   }).then(response=>{
     
     props.baza(1);
     console.log(response.data);
   })
   .catch(error=>{
     console.log(error);
   })
}
    return(
            
        <Grid container spacing={0}>
            <Grid xs={4}>
                <Avatar sx={{marginTop:'10px',marginLeft:'40px'}}>{props.tim1}</Avatar>
            </Grid>
            <Grid xs={4}>
                <h3 style={{color:'black',fontFamily:'cursive',marginLeft:'-100px'}}>Statistika</h3>
            </Grid>
            <Grid xs={4}>
                <Avatar sx={{marginTop:'10px',marginLeft:'110px'}}>{props.tim2}</Avatar>
            </Grid>
            <Grid xs={1} >
                <h4 style={{marginTop:'10px',marginLeft:'40px',color:'black',fontFamily:'cursive'}}>{props.utakmica.shotsHome}</h4>
            </Grid>
            <Grid sx={1}>
                <Button style={{marginLeft:'0px',color:'black',fontFamily:'cursive'}}  disabled={(email==null||(email !== null && email.includes('admin')==false) )}  onClick={addShotHome}  >+</Button>
            </Grid>
            <Grid sx={1}>
                <Button style={{marginLeft:'20px',marginRight:'-30px',color:'black',fontFamily:'cursive'}} onClick={subShotHome} disabled={(email==null||(email !== null && email.includes('admin')==false) ) }>-</Button>
            </Grid>
            <Grid xs={4}>
            <h4 style={{marginTop:'10px',color:'black',fontFamily:'cursive'}}>Sutevi</h4>
            </Grid>
            <Grid xs={1}>
            <h4 style={{marginTop:'10px',marginLeft:'170px',color:'black',fontFamily:'cursive'}}>{props.utakmica.shotsAway}</h4>
            </Grid>
            <Grid sx={1}>
                <Button style={{marginLeft:'0px',color:'black',fontFamily:'cursive'}}onClick={addShotAway}disabled={(email==null||(email !== null && email.includes('admin')==false) )}>+</Button>
            </Grid>
            <Grid sx={1}>
                <Button style={{marginLeft:'-5px',marginRight:'70px',color:'black',fontFamily:'cursive'}}onClick={subShotAway}disabled={(email==null||(email !== null && email.includes('admin')==false) )}>-</Button>
            </Grid>
            <Grid xs={1} >
                <h4 style={{marginTop:'10px',marginLeft:'40px',color:'black',fontFamily:'cursive'}}>{props.utakmica.shotsOnGoalHome}</h4>
            </Grid>
            <Grid sx={1}>
                <Button style={{marginLeft:'0px',color:'black',fontFamily:'cursive'}}onClick={addShotOnGoalHome}disabled={(email==null||(email !== null && email.includes('admin')==false) ) }>+</Button>
            </Grid>
            <Grid sx={1}>
                <Button style={{marginLeft:'20px',marginRight:'-30px',color:'black',fontFamily:'cursive'}}onClick={subShotOnGoalHome}disabled={(email==null||(email !== null && email.includes('admin')==false) )}>-</Button>
            </Grid>
            <Grid xs={4}>
            <h4 style={{marginTop:'10px',color:'black',fontFamily:'cursive'}}>Sutevi u okvir gola</h4>
            </Grid>
            <Grid xs={1}>
            <h4 style={{marginTop:'10px',marginLeft:'170px',color:'black',fontFamily:'cursive'}}>{props.utakmica.shotsOnGoalAway}</h4>
            </Grid>
            <Grid sx={1}>
                <Button style={{marginLeft:'0px',color:'black',fontFamily:'cursive'}}onClick={addShotOnGoalAway}disabled={(email==null||(email !== null && email.includes('admin')==false) )}>+</Button>
            </Grid>
            <Grid sx={1}>
                <Button style={{marginLeft:'-5px',marginRight:'70px',color:'black',fontFamily:'cursive'}}onClick={subShotOnGoalAway}disabled={(email==null||(email !== null && email.includes('admin')==false) ) }>-</Button>
            </Grid>
            <Grid xs={1} >
                <h4 style={{marginTop:'10px',marginLeft:'40px',color:'black',fontFamily:'cursive'}}>{props.utakmica.possesionHome}%</h4>
            </Grid>
            <Grid sx={1}>
                <Button style={{marginLeft:'0px',color:'black',fontFamily:'cursive'}}onClick={addPossesionHome}disabled={(email==null||(email !== null && email.includes('admin')==false) ) }>+</Button>
            </Grid>
            <Grid sx={1}>
                <Button style={{marginLeft:'20px',marginRight:'-30px',color:'black',fontFamily:'cursive'}}onClick={subPossesionHome}disabled={(email==null||(email !== null && email.includes('admin')==false) ) }>-</Button>
            </Grid>
            <Grid xs={4}>
            <h4 style={{marginTop:'10px',color:'black',fontFamily:'cursive'}}>Posed lopte</h4>
            </Grid>
            <Grid xs={1}>
            <h4 style={{marginTop:'10px',marginLeft:'170px',color:'black',fontFamily:'cursive'}}>{props.utakmica.possesionAway}%</h4>
            </Grid>
            <Grid sx={1}>
                <Button style={{marginLeft:'0px',color:'black',fontFamily:'cursive'}}onClick={addPossesionAway}disabled={(email==null||(email !== null && email.includes('admin')==false) ) }>+</Button>
            </Grid>
            <Grid sx={1}>
                <Button style={{marginLeft:'-5px',marginRight:'70px',color:'black',fontFamily:'cursive'}}onClick={subPossesionAway}disabled={(email==null||(email !== null && email.includes('admin')==false) ) }>-</Button>
            </Grid>
            <Grid xs={1} >
                <h4 style={{marginTop:'10px',marginLeft:'40px',color:'black',fontFamily:'cursive'}}>{props.utakmica.passesHome}</h4>
            </Grid>
            <Grid sx={1}>
                <Button style={{marginLeft:'0px',color:'black',fontFamily:'cursive'}}onClick={addPassesHome}disabled={(email==null||(email !== null && email.includes('admin')==false) )}>+</Button>
            </Grid>
            <Grid sx={1}>
                <Button style={{marginLeft:'20px',marginRight:'-30px',color:'black',fontFamily:'cursive'}}onClick={subPassesHome}disabled={(email==null||(email !== null && email.includes('admin')==false) )}>-</Button>
            </Grid>
            <Grid xs={4}>
            <h4 style={{marginTop:'10px',color:'black',fontFamily:'cursive'}}>Dodavanja</h4>
            </Grid>
            <Grid xs={1}>
            <h4 style={{marginTop:'10px',marginLeft:'170px',color:'black',fontFamily:'cursive'}}>{props.utakmica.passesAway}</h4>
            </Grid>
            <Grid sx={1}>
                <Button style={{marginLeft:'0px',color:'black',fontFamily:'cursive'}}onClick={addPassesAway}disabled={(email==null||(email !== null && email.includes('admin')==false) )}>+</Button>
            </Grid>
            <Grid sx={1}>
                <Button style={{marginLeft:'-5px',marginRight:'70px',color:'black',fontFamily:'cursive'}}onClick={subPassesAway}disabled={(email==null||(email !== null && email.includes('admin')==false) ) }>-</Button>
            </Grid>
           
            <Grid xs={1} >
                <h4 style={{marginTop:'10px',marginLeft:'40px',color:'black',fontFamily:'cursive'}}>{props.utakmica.foulsHome}</h4>
            </Grid>
            <Grid sx={1}>
                <Button style={{marginLeft:'0px',color:'black',fontFamily:'cursive'}}onClick={addFoulsHome}disabled={(email==null||(email !== null && email.includes('admin')==false) )}>+</Button>
            </Grid>
            <Grid sx={1}>
                <Button style={{marginLeft:'20px',marginRight:'-30px',color:'black',fontFamily:'cursive'}}onClick={subFoulsHome}disabled={(email==null||(email !== null && email.includes('admin')==false) ) }>-</Button>
            </Grid>
            <Grid xs={4}>
            <h4 style={{marginTop:'10px',color:'black',fontFamily:'cursive'}}>Faulovi</h4>
            </Grid>
            <Grid xs={1}>
            <h4 style={{marginTop:'10px',marginLeft:'170px',color:'black',fontFamily:'cursive'}}>{props.utakmica.foulsAway}</h4>
            </Grid>
            <Grid sx={1}>
                <Button style={{marginLeft:'0px',color:'black',fontFamily:'cursive'}}onClick={addFoulsAway}disabled={(email==null||(email !== null && email.includes('admin')==false) ) }>+</Button>
            </Grid>
            <Grid sx={1}>
                <Button style={{marginLeft:'-5px',marginRight:'70px',color:'black',fontFamily:'cursive'}}onClick={subFoulsAway}disabled={(email==null||(email !== null && email.includes('admin')==false) ) }>-</Button>
            </Grid>
            <Grid xs={1} >
                <h4 style={{marginTop:'10px',marginLeft:'40px',color:'black',fontFamily:'cursive'}}>{props.utakmica.yellowHome}</h4>
            </Grid>
            <Grid sx={1}>
                <Button style={{marginLeft:'0px',color:'black',fontFamily:'cursive'}}onClick={addYellowsHome}disabled={(email==null||(email !== null && email.includes('admin')==false) )}>+</Button>
            </Grid>
            <Grid sx={1}>
                <Button style={{marginLeft:'20px',marginRight:'-30px',color:'black',fontFamily:'cursive'}}onClick={subYellowsHome}disabled={(email==null||(email !== null && email.includes('admin')==false) ) }>-</Button>
            </Grid>
            <Grid xs={4}>
            <h4 style={{marginTop:'10px',color:'black',fontFamily:'cursive'}}>Zuti kartoni</h4>
            </Grid>
            <Grid xs={1}>
            <h4 style={{marginTop:'10px',marginLeft:'170px',color:'black',fontFamily:'cursive'}}>{props.utakmica.yellowAway}</h4>
            </Grid>
            <Grid sx={1}>
                <Button style={{marginLeft:'0px',color:'black',fontFamily:'cursive'}}onClick={addYellowsAway}disabled={(email==null||(email !== null && email.includes('admin')==false) ) }>+</Button>
            </Grid>
            <Grid sx={1}>
                <Button style={{marginLeft:'-5px',marginRight:'70px',color:'black',fontFamily:'cursive'}}onClick={subYellowsAway}disabled={(email==null||(email !== null && email.includes('admin')==false) ) }>-</Button>
            </Grid>
            <Grid xs={1} >
                <h4 style={{marginTop:'10px',marginLeft:'40px',color:'black',fontFamily:'cursive'}}>{props.utakmica.redHome}</h4>
            </Grid>
            <Grid sx={1}>
                <Button style={{marginLeft:'0px',color:'black',fontFamily:'cursive'}}onClick={addRedsHome}disabled={(email==null||(email !== null && email.includes('admin')==false) ) }>+</Button>
            </Grid>
            <Grid sx={1}>
                <Button style={{marginLeft:'20px',marginRight:'-30px',color:'black',fontFamily:'cursive'}}onClick={subRedsHome}disabled={(email==null||(email !== null && email.includes('admin')==false) ) }>-</Button>
            </Grid>
            <Grid xs={4}>
            <h4 style={{marginTop:'10px',color:'black',fontFamily:'cursive'}}>Crveni kartoni</h4>
            </Grid>
            <Grid xs={1}>
            <h4 style={{marginTop:'10px',marginLeft:'170px',color:'black',fontFamily:'cursive'}}>{props.utakmica.redAway}</h4>
            </Grid>
            <Grid sx={1}>
                <Button style={{marginLeft:'0px',color:'black',fontFamily:'cursive'}}onClick={addRedsAway}disabled={(email==null||(email !== null && email.includes('admin')==false) )}>+</Button>
            </Grid>
            <Grid sx={1}>
                <Button style={{marginLeft:'-5px',marginRight:'70px',color:'black',fontFamily:'cursive'}}onClick={subRedsAway}disabled={(email==null||(email !== null && email.includes('admin')==false) ) }>-</Button>
            </Grid>
            <Grid xs={1} >
                <h4 style={{marginTop:'10px',marginLeft:'40px',color:'black',fontFamily:'cursive'}}>{props.utakmica.offsidesHome}</h4>
            </Grid>
            <Grid sx={1}>
                <Button style={{marginLeft:'0px',color:'black',fontFamily:'cursive'}}onClick={addOffsidesHome}disabled={(email==null||(email !== null && email.includes('admin')==false) )}>+</Button>
            </Grid>
            <Grid sx={1}>
                <Button style={{marginLeft:'20px',marginRight:'-30px',color:'black',fontFamily:'cursive'}}onClick={subOffsidesHome}disabled={(email==null||(email !== null && email.includes('admin')==false) )}>-</Button>
            </Grid>
            <Grid xs={4}>
            <h4 style={{marginTop:'10px',color:'black',fontFamily:'cursive'}}>Ofsajdi</h4>
            </Grid>
            <Grid xs={1}>
            <h4 style={{marginTop:'10px',marginLeft:'170px',color:'black',fontFamily:'cursive'}}>{props.utakmica.offsidesAway}</h4>
            </Grid>
            <Grid sx={1}>
                <Button style={{marginLeft:'0px',color:'black',fontFamily:'cursive'}}onClick={addOffsidesAway}disabled={(email==null||(email !== null && email.includes('admin')==false) )}>+</Button>
            </Grid>
            <Grid sx={1}>
                <Button style={{marginLeft:'-5px',marginRight:'70px',color:'black',fontFamily:'cursive'}}onClick={subOffsidesAway}disabled={(email==null||(email !== null && email.includes('admin')==false) ) }>-</Button>
            </Grid>
            <Grid xs={1} >
                <h4 style={{marginTop:'10px',marginLeft:'40px',color:'black',fontFamily:'cursive'}}>{props.utakmica.cornersHome}</h4>
            </Grid>
            <Grid sx={1}>
                <Button style={{marginLeft:'0px',color:'black',fontFamily:'cursive'}}onClick={addCornersHome}disabled={(email==null||(email !== null && email.includes('admin')==false) )}>+</Button>
            </Grid>
            <Grid sx={1}>
                <Button style={{marginLeft:'20px',marginRight:'-30px',color:'black',fontFamily:'cursive'}}onClick={subCornersHome}disabled={(email==null||(email !== null && email.includes('admin')==false) ) }>-</Button>
            </Grid>
            <Grid xs={4}>
            <h4 style={{marginTop:'10px',color:'black',fontFamily:'cursive'}}>Korneri</h4>
            </Grid>
            <Grid xs={1}>
            <h4 style={{marginTop:'10px',marginLeft:'170px',color:'black',fontFamily:'cursive'}}>{props.utakmica.cornersAway}</h4>
            </Grid>
            <Grid sx={1}>
                <Button style={{marginLeft:'0px',color:'black',fontFamily:'cursive'}}onClick={addCornersAway}disabled={(email==null||(email !== null && email.includes('admin')==false) )}>+</Button>
            </Grid>
            <Grid sx={1}>
                <Button style={{marginLeft:'-5px',marginRight:'70px',color:'black',fontFamily:'cursive'}}onClick={subCornersAway}disabled={(email==null||(email !== null && email.includes('admin')==false) )}>-</Button>
            </Grid>
            <Grid sx={6}>
                <h1 style={{marginLeft:'0px',color:'yellow',fontFamily:'cursive'}}>Lokacija :</h1>
            </Grid>
            <Grid sx={6}>
            <h1 style={{marginLeft:'0px',color:'yellow',fontFamily:'cursive'}}>{props.utakmica.stadium}</h1>
            </Grid>
                    
            </Grid>

     
    );
}
export default Statistika;
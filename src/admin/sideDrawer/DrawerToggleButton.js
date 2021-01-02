import React from 'react'
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core';

 const useStyle = makeStyles({
     btn:{
         background:"transparent",
         border:"none",
         flexDirection:"column",
         color:"#fcdab7",
         cursor:"pointer",
         '&:focus':{
            outline:"none" 
         }
     },
     menubtn:{
         '&:hover':{
             color:"#fcdab7"
         }
     }
     
 })

function DrawerToggleButton({click}) {
    const classes = useStyle();
    return (
        <button className={classes.btn} onClick={click} >
            <MenuIcon  className={classes.menubtn} />
        </button>
    )
}

export default DrawerToggleButton



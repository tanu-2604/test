import React from 'react'
import { makeStyles } from '@material-ui/styles'

const useStyles= makeStyles({
    backdrop:{
        position:"fixed",
        top:"0",
        left:"0",
        width:"100%",
        height:"100%",
        background:"rgba(0,0,0,0.3)",
        zIndex:"100"

    }
})

function BackDrop({click}) {
    const classes = useStyles();
    return (
        <div className={classes.backdrop} onClick={click}>
            
        </div>
    )
}

export default BackDrop

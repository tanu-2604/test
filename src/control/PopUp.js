import React from 'react'
import { Dialog, DialogTitle, DialogContent} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';


const useStyle = makeStyles(theme =>({
    dialogWrapper:{
         padding:theme.spacing(2),
         position:"absolute",
         top:theme.spacing(5)
    },
  closeButton: {
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  text:{
    fontSize:"15px",
    color:"#000",

  }
   
}))

export default function PopUp(props) {
    const classes = useStyle();

    const {title,maxWidth,children,openPopup,setOpenPopup,onClose,text} = props
    return (
         <Dialog open={openPopup} maxWidth={maxWidth} >
               <DialogTitle>
                    <div>
                       
                      <IconButton aria-label="close" className={classes.closeButton} onClick={()=>{setOpenPopup(false)}}>
                        <CloseIcon />
                      </IconButton> 
                    </div>
               </DialogTitle>
               <DialogContent>
                  {children}  
               </DialogContent>
         </Dialog>
    )
}

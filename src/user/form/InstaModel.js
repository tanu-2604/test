
import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const useStyle = makeStyles(theme =>({
   modelhead:{
        fontSize:"15px",
        color:"#000",
    
      },
  close: {
    color: "#012156",
    fontWeight:"600"
  },
   
}))
export default function InstaModel(props) {
    const {open,setOpen} = props
    const classes=useStyle()
  
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle className={classes.modelhead} id="alert-dialog-slide-title">
            <Typography  className={classes.modelhead}>How to add this link to your Instagram BIO</Typography>
        </DialogTitle>
        <DialogContent>
                <ul>
                   <li>Copy your link</li>
                   <li>Go on your profile in the app</li>
                   <li>Click on Edit Profile</li>
                   <li>Paste the link under Website section</li>
               </ul>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>{setOpen(false)}} className={classes.close}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
import React,{useState} from 'react';
import { Typography} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import '../management/User.css'
import PopUp from '../../control/PopUp'
import CategoryForm from './CategoryForm'
import CardGroup from './CardGroup'
import AdminLink from '../management/AdminLinks';

const useStyles= makeStyles((theme)=>({
    root:{
      marginTop:"70px",
      width:"100%"
    },
    heading:{
           float:"left",
           fontSize:"20px",
           marginTop:"15px",
           marginLeft:"10px",
           fontWeight:"700",
           color:"#133b5c"
   }, 
}))
function Category() {
    const classes = useStyles();
    const [openPopup,setOpenPopup] = useState(false);
    return (
        <> 
             <AdminLink/>
            <div className={classes.root}>
              <Typography variant="h4" className={classes.heading}>Category List</Typography> 
                <div className="wrapper-inner-tab-backgrounds-second">
                  <div className="sim-button button13" onClick={ ()=> setOpenPopup(true)} ><span>Create Category</span></div>
                </div>    
            </div> 
            <CardGroup/>
              <PopUp
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
                maxWidth="md"
                >
                <CategoryForm/>
            </PopUp>
        </>
    )
}

export default Category

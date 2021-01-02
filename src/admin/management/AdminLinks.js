import React, { useState } from 'react';
import Navbar from '../navbar/Navbar';
import SideDrawer from '../sideDrawer/SideDrawer';
import BackDrop from '../backdrop/BackDrop';


function AdminLink() {

  const[drawerOpen,setDrawerOpen]= useState(false);

  const handleDrawer =()=>{
         setDrawerOpen(true);  
  }
  
  const backdropClick = ()=>{
    setDrawerOpen(false)
  }

  let sideDrawer;
  let backdrop;
  if(drawerOpen)
  {
    sideDrawer= <SideDrawer/>
    backdrop= <BackDrop click={backdropClick}/>
  }
  return (
    <div className="container">
          <Navbar drawer={handleDrawer} />
          {sideDrawer}
          {backdrop}
    </div>
  );
}

export default AdminLink;

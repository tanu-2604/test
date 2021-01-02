import React from 'react'
import './Navbar.css'
import DrawerToggleButton from '../sideDrawer/DrawerToggleButton'
import { Link, NavLink, Router } from 'react-router-dom'
const Navbar = props => {
    return (
            <header className="toolbar" >
           <nav className="toolbar-navigation">
               <div className="toggle-button">
                   <DrawerToggleButton click={props.drawer}/>
               </div>
                <div className="toolbar-logo">
                    <NavLink to="/usermanagement" >Admin Panel</NavLink>
                </div>
                <div className="spacer"/>
                <div className="toolbar-navigation-item">
                   
                    <ul>
                        <li><NavLink to="/usermanagement" >User Mangement</NavLink></li>
                        <li><NavLink to="/category" >Category</NavLink></li>
                        <li><NavLink to="/question" >Question</NavLink></li>
                        <li><NavLink to="/createQuiz" >Create Quiz</NavLink></li>
                        <li><NavLink to="/quizlist" >Quiz</NavLink></li>
                    </ul>
                    
                </div>
            </nav>  
        </header>
       
    )
}

export default Navbar;

import React from 'react'
import { makeStyles, Divider, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import GroupIcon from '@material-ui/icons/Group';
import  CategoryIcon  from  '@material-ui/icons/Category'
import { Link } from 'react-router-dom';
const useStyle = makeStyles({
    sidedrawer: {
        height: "100%",
        background: "#fff",
        boxShadow: "2px 0px 5px rgba(209,207,207,0.1)",
        position: "fixed",
        top: "0",
        left: "0",
        width: "70%",
        maxWidth: "250px",
        zIndex: "200",
        paddingTop:"20px",
    },
    sideul: {
        listStyle: "none",
        display: "flex",
        flexDirection: "column",
        padding:"0",
        margin:"0",
        paddingTop:"20px"

    },
    logo: {
        textAlign: "center",
        justifyContent: "center",
        position: "relative",
        left: "95px",
    },
    sideimg: {
        alignItems: "center",
       
    },
    
    sideli: {
        margin: "0.5rem 0",
        background: "#fff"
    },
    sidea: {
        color: "#012156",
        textDecoration: "none",
        fontWeight: "800",
        '&:hover,&:active': {
            color: "#f45f45"
        }
    },
    icon:{
         color:"#012156"
    }
})
function SideDrawer() {
    const classes = useStyle()
    return (
        <nav className={classes.sidedrawer} >
            <span className={classes.logo}>
                <img src="/assets/image/img.png" height="45px" className={classes.sideimg} />
            </span>
            <ul className={classes.sideul} >
            <Divider />
                <List>
                    <Link to="/usermanagement">
                    <ListItem className={classes.sidea} >
                        <ListItemIcon><GroupIcon className={classes.icon}/></ListItemIcon>
                        <ListItemText primary="User Management" />
                    </ListItem>
                    </Link>
                </List>
                <Divider/>
                <List>
                    <Link to="/category">
                    <ListItem className={classes.sidea} >
                        <ListItemIcon><CategoryIcon className={classes.icon}/></ListItemIcon>
                        <ListItemText primary="Category" />
                    </ListItem>
                    </Link>
                </List>
                <Divider/>
                <List>
                    <Link to="/question">
                    <ListItem className={classes.sidea} >
                        <ListItemIcon><CategoryIcon className={classes.icon}/></ListItemIcon>
                        <ListItemText primary="Question" />
                    </ListItem>
                    </Link>
                </List>
                <Divider/>
                <List>
                    <Link to="/createQuiz">
                    <ListItem className={classes.sidea} >
                        <ListItemIcon><CategoryIcon className={classes.icon}/></ListItemIcon>
                        <ListItemText primary="Create Quiz" />
                    </ListItem>
                    </Link>
                </List>
                <Divider/>
                <List>
                    <Link to="/quizlist">
                    <ListItem className={classes.sidea} >
                        <ListItemIcon><CategoryIcon className={classes.icon}/></ListItemIcon>
                        <ListItemText primary="Quiz" />
                    </ListItem>
                    </Link>
                </List>
            </ul>
        </nav>
    )
}

export default SideDrawer

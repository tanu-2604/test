import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Switch from '@material-ui/core/Switch';
import services from '../../services/services';
import AdminForm from './AdminForm';
import PopUp from '../../control/PopUp'
import { Grid, Typography } from '@material-ui/core';

const columns = [
  { id: 'firstName', label: 'First Name', minWidth: 100, align: 'center' },
  { id: 'lastName', label: 'Last Name', minWidth: 100, align: 'center' },
  {
    id: 'username',
    label: 'User Name',
    minWidth: 100,
    align: 'center'

  },
];


const useStyles = makeStyles((theme)=>({
  root: {
    width: '100%',
    marginTop: "90px"
  },
  container: {
    maxHeight: 400,
  },
  table: {
    background: "#133b5c",
    color: "#fff"
  },
  dltIcon: {
    color: "#F31118"
  },
  heading:{
    float:"left",
    fontSize:"20px",
    marginTop:"15px",
    marginLeft:"10px",
    fontWeight:"700",
    color:"#133b5c"
}, 
}));

export default function UserTable({ list, updateUsers }) {

  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [openPopup,setOpenPopup] = useState(false);
  const data = JSON.parse(localStorage.getItem('friend'));
  const jwt = data['jwt'];

  const checkedStatus = (id) => async () => {
    var userId = id;
    var data = {
      userId: userId,
    }
    const options = {
      method: 'POST',
      headers: {
        "Apiuserid": "49507884",
        "Scope": "In.QuizApp.LOGIN",
        "Authorization": `quizApp-oauthtoken ${jwt}`,
      }
    }
    const result = await services.createStatus(data, options)
    updateUsers();
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Grid container justify="center" className={classes.list}>
        <Grid item xs={11} sm={6} md={6} lg={10}>
    <Paper className={classes.root}>
      <div className={classes.root}>
                        <Typography variant="h4" className={classes.heading}>User Details</Typography> 
                    <div className="wrapper-inner-tab-backgrounds-second">
                        <div className="sim-button button13" onClick={ ()=> setOpenPopup(true)} ><span>Add User</span></div>
                    </div>    
                </div>  
                <PopUp
                    openPopup={openPopup}
                    setOpenPopup={setOpenPopup}
                    maxWidth="sm"
                    >
                        <AdminForm/>
                </PopUp>
     
      <TableContainer className={classes.container}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell className={classes.table}
                  key={column.id.toString()}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
              <TableCell className={classes.table}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow 
                hover 
                role="checkbox"
                 tabIndex={-1}
                 key={row.userId}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <>
                        <TableCell 
                        key={value.toString()}
                        align={column.align}
                         >
                          {column.format && typeof value === 'number' ? column.format(value) : value}
                        </TableCell>
                      </>
                    );

                  })}
                  <TableCell>
                    {
                      row.status === "active" ?
                        <Switch
                          checked={true}
                          onChange={checkedStatus(row.userId)}
                          name="checkedA"
                          color="primary"
                          id={row.userId.toString()}
                          inputProps={{ 'aria-label': 'primary checkbox' }}
                        /> :
                        <Switch
                          checked={false}
                          onChange={checkedStatus(row.userId)}
                          name="checkedA"
                          color="primary"
                          id={row.userId.toString()}
                          inputProps={{ 'aria-label': 'primary checkbox' }}
                        />
                    }
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={list.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
       
           
    </Paper>
    </Grid>
    </Grid>
    
  );
}
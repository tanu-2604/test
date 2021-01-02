import React, { useEffect, useRef, useState } from 'react';
import { Grid, IconButton, makeStyles } from '@material-ui/core';
import AdminLinks from '../management/AdminLinks';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Switch from '@material-ui/core/Switch';
import {EditOutlined, FileCopyOutlined, VisibilityOutlined } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { ToastsContainer, ToastsStore, ToastsContainerPosition } from 'react-toasts';
import "../management/User.css"
import services from '../../services/services';
import MetaTags from 'react-meta-tags';

const useStyles = makeStyles((theme) => ({
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
  heading: {
    float: "left",
    fontSize: "20px",
    marginTop: "15px",
    marginLeft: "10px",
    fontWeight: "700",
    color: "#133b5c"
  },
  list: {
    marginTop: "80px"
  },
  cell: {
    padding: "6px"
  },
  icon: {
    padding: "0px"
  },
  copytext: {
    height: "0rem",
    overflow: "hidden",
    color: "transparent",
    background: "transparent",
    border: "none"
  }
}));
const columns = [
  { id: 'adminQuizId', label: 'Id', minWidth: 100, align: 'center' },
  { id: 'title', label: 'Title', minWidth: 100, align: 'center' },
  {
    id: 'slug',
    label: 'Slug',
    minWidth: 100,
    align: 'center'

  },
  { id: 'language', label: 'Language', minWidth: 100, align: 'center' }

];

export default function Quizlist() {
  const classes = useStyles()

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [quizlist, setQuizList] = useState([]);
  const data = JSON.parse(localStorage.getItem('friend'));
  const jwt = data['jwt'];
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    getAllAdminQuiz();
  }, [])
  const getAllAdminQuiz = async () => {
    const options = {
      method: 'Get',
      headers: {
        "Apiuserid": "49507884",
        "Scope": "In.QuizApp.READ",
        "Authorization": `quizApp-oauthtoken ${jwt}`,
      }
    }
    const result = await services.getAllAdminQuiz(options)
    setQuizList(result.data.data)
  };

  const checkedStatus = (id) => async () => {
    var quizId = id;

    var data = {
      quizId: quizId,
    }
    const options = {
      method: 'POST',
      headers: {
        "Apiuserid": "49507884",
        "Scope": "In.QuizApp.UPDATE",
        "Authorization": `quizApp-oauthtoken ${jwt}`,
      }
    }
    const result = await services.updateQuizStatus(data, options)
    getAllAdminQuiz();
  }
  function copyToClipboard(text) {
    var dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = text;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
    ToastsStore.success("Copied SuccessFully")
  };
  return (
    <>
      <AdminLinks />
      <Grid container justify="center" className={classes.list}>
        <Grid item xs={11} sm={6} md={6} lg={10}>

          <TableContainer className={classes.container}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell className={classes.table}
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                  <TableCell align="center" className={classes.table}>Active</TableCell>
                  <TableCell align="center" className={classes.table}>View</TableCell>
                  <TableCell align="center" className={classes.table}>Result</TableCell>
                  <TableCell align="center" className={classes.table}>Edit</TableCell>
                  <TableCell align="center" className={classes.table}>Url</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>

                {quizlist.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                  return (
                    <>
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={quizlist.adminQuizId}>
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <>
                              <TableCell
                                key={value}
                                align={column.align}
                              >
                                {column.format && typeof value === 'number' ? column.format(value) : value}
                              </TableCell>
                            </>
                          );

                        })}
                        <TableCell align="center" className={classes.cell}>
                          {
                            row.status === "active" ?
                              <Switch
                                checked={true}
                                onChange={checkedStatus(row.adminQuizId)}
                                name="checkedA"
                                color="primary"
                                id={row.adminQuizId}
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                              /> :
                              <Switch
                                checked={false}
                                onChange={checkedStatus(row.adminQuizId)}
                                name="checkedA"
                                color="primary"
                                id={row.adminQuizId}
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                              />
                          }
                        </TableCell>
                        <TableCell align="center" className={classes.cell}>
                          <Link to={`/view/${row.slug}`}>
                            <IconButton className={classes.icon} >
                              <VisibilityOutlined />
                            </IconButton>
                          </Link>
                        </TableCell>
                        <TableCell align="center" className={classes.cell}>
                          <Link to={`/result/${row.adminQuizId}`}>
                            <img src="/assets/image/trofy.jpg" width="30" />
                          </Link>
                        </TableCell>
                        <TableCell align="center" className={classes.cell}>
                          <IconButton className={classes.icon} >
                            <Link to={`/editQuiz/${row.slug}`}>
                              <EditOutlined />
                            </Link>
                          </IconButton>
                        </TableCell>

                        <TableCell align="center" className={classes.cell}>
                          <IconButton className={classes.icon} >
                            <FileCopyOutlined onClick={() => copyToClipboard(`https://webestfriends.com/quizform/${row.slug}`)} />
                            <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.TOP_CENTER} />
                          </IconButton>
                        </TableCell>

                      </TableRow>

                    </>

                  );
                })}

              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={quizlist.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Grid>
      </Grid>
    </>

  )
}

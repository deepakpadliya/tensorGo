import { faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon as FAIcon } from '@fortawesome/react-fontawesome';
import { Button, Container, Grid } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ConfirmDialog from './components/ConfirmDialog';
import CreateUser from './components/CreateUser';
import { changeStatus, deleteUser, fetchUsers, getUserState } from './reducers/userslice';
import DateTime from 'date-and-time';

import './App.css';

function App() {
  const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });

  const classes = useStyles();

  const user = useSelector(getUserState);

  const [editUser, setEditUser] = useState('');

  const [collapse, setcollapse] = useState(false);

  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', content: '', confirm: function () { } });

  const dispatch = useDispatch();

  useEffect(() => {
    if (user.status === 'idle') {
      dispatch(fetchUsers());
    }
  }, [user.status, dispatch])
  return (
    <Container className="App">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" style={{ float: 'left' }} onClick={() => { setcollapse(!collapse); setEditUser(''); }}>Add New User</Button>
        </Grid>
        <Grid item xs={12}>
          <CreateUser id={editUser} show={collapse} toggle={setcollapse} />
        </Grid>
        <Grid item xs={12}>
          Total Rows {user && user.list ? user.list.length : null}
        </Grid>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell><FAIcon icon={faPencilAlt} /></TableCell>
                  <TableCell>Id</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Gender</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Created</TableCell>
                  <TableCell>Updated</TableCell>
                  <TableCell><FAIcon icon={faTrash} /></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {user && user.list.length > 0 && user.list.map((row) => (
                  <TableRow key={row._id}>
                    <TableCell component="th" scope="row">
                      <FAIcon style={{ cursor: 'pointer' }} icon={faPencilAlt} onClick={() => {
                        setEditUser(row._id)
                      }} />
                    </TableCell>
                    <TableCell >{row.id}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{row.gender}</TableCell>
                    <TableCell>{row.status}</TableCell>
                    <TableCell>{DateTime.format(new Date(row.created_at),'DD/MM/YYYY h:mm')}</TableCell>
                    <TableCell>{DateTime.format(new Date(row.updated_at),'DD/MM/YYYY h:mm')}</TableCell>
                    <TableCell>
                      <FAIcon style={{ cursor: 'pointer' }} icon={faTrash} onClick={() => {
                        setConfirmDialog({
                          isOpen: true, title: 'Delete User', content: 'Are you sure You want to delete', confirm: () => {
                            dispatch(deleteUser(row._id)).then(res => {
                              if (res.error) {
                                setConfirmDialog({ ...confirmDialog, isOpen: true, content: res.error.message });
                              } else {
                                setConfirmDialog({ ...confirmDialog, isOpen: false });
                              }
                            }).catch(err => {
                              debugger;
                              setConfirmDialog({ ...confirmDialog, isOpen: true, content: err })
                            });
                            dispatch(changeStatus('idle'));
                          }
                        });
                      }} /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <ConfirmDialog {...confirmDialog} setConfirmDialog={setConfirmDialog} />
        </Grid>
      </Grid>

    </Container>
  );
}

export default App;

import React, { useState } from 'react';
import { Redirect, withRouter } from 'react-router-dom';

import Axios from 'axios';
import PropTypes from 'prop-types'
import NavBar from '../Home/Navbar'

import { makeStyles } from "@material-ui/core/styles";
import EditIcon from "@material-ui/icons/EditOutlined";
import DoneIcon from "@material-ui/icons/DoneAllTwoTone";
import RevertIcon from "@material-ui/icons/NotInterestedOutlined";


import {
    Card,
    CardContent,
    Button,
    Typography,
    Divider,
    TextField,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Input,
    IconButton
} from '@material-ui/core'

//Below is from William
//To do: William only finished UI part
// Current can't read data from backend.
const useStyles = makeStyles(theme => ({
    root: {
      width: "100%",
      marginTop: theme.spacing(3),
      overflowX: "auto"
    },
    table: {
      minWidth: 650
    },
    selectTableCell: {
      width: 60
    },
    tableCell: {
      width: 130,
      height: 40
    },
    input: {
      width: 130,
      height: 40
    }
  }));

const createData = (name, lastName, email, password, phone) => ({
    id: name.replace(" ", "_"),
    name,
    lastName,
    email,
    password,
    phone,
    isEditMode: false
  });
  
  const CustomTableCell = ({ row, name, onChange }) => {
    const classes = useStyles();
    const { isEditMode } = row;
    return (
      <TableCell align="left" className={classes.tableCell}>
        {isEditMode ? (
          <Input
            value={row[name]}
            name={name}
            onChange={e => onChange(e, row)}
            className={classes.input}
          />
        ) : (
          row[name]
        )}
      </TableCell>
    );
  };
  

function BillerInfoForm({ token, user }) {

    const [billerFirstName, setBillerFirstName] = useState('');
    const [billerLastName, setBillerLastName] = useState('');
    const [billerEmail, setBillerEmail] = useState('');

    const onfirstNameChange = (e) => {
        setBillerFirstName(e.target.value);
    }
    const onLastNameChange = (e) => {
        setBillerLastName(e.target.value);
    }

    const onEmailChange = (e) => {
        setBillerEmail(e.target.value);
    }
    
    const onSubmit = () => {
        const id = user._id;
        const payload = { id, billerFirstName, billerLastName, billerEmail };
        console.log("payload:", payload);
        Axios.post('api/user/updateBillerInfo', payload)
            .catch((err) => {
                console.error(err);
            })

    }


    // Below is from William
    const [rows, setRows] = React.useState([
        createData("Tom", "Ford", "a@gmail.com"),
        
      ]);
      const [previous, setPrevious] = React.useState({});
      const classes = useStyles();
    
      const onToggleEditMode = id => {
        setRows(state => {
          return rows.map(row => {
            if (row.id === id) {
              return { ...row, isEditMode: !row.isEditMode };
            }
            return row;
          });
        });
      };
    
      const onChange = (e, row) => {
        if (!previous[row.id]) {
          setPrevious(state => ({ ...state, [row.id]: row }));
        }
        const value = e.target.value;
        const name = e.target.name;
        const { id } = row;
        const newRows = rows.map(row => {
          if (row.id === id) {
            return { ...row, [name]: value };
          }
          return row;
        });
        setRows(newRows);
      };
    
      const onRevert = id => {
        const newRows = rows.map(row => {
          if (row.id === id) {
            return previous[id] ? previous[id] : row;
          }
          return row;
        });
        setRows(newRows);
        setPrevious(state => {
          delete state[id];
          return state;
        });
        onToggleEditMode(id);
      };
    // Above is from William

    return (
        <div>
            <NavBar />
            <Card>
                <CardContent>
                    <Typography variant="h6">
                        Update Biller Information
                    </Typography>

                    <Table className={classes.table} aria-label="caption table">
        <caption>A barbone structure table example with a caption</caption>
        
        <TableHead>
          <TableRow>
            <TableCell align="left" />
            <TableCell align="left">First Name</TableCell>
            <TableCell align="left">Last Name</TableCell>
            <TableCell align="left">Email</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.id}>
              <TableCell className={classes.selectTableCell}>
                {row.isEditMode ? (
                  <>
                    <IconButton
                      aria-label="done"
                      onClick={() => onToggleEditMode(row.id)}
                    >
                      <DoneIcon />
                    </IconButton>
                    <IconButton
                      aria-label="revert"
                      onClick={() => onRevert(row.id)}
                    >
                      <RevertIcon />
                    </IconButton>
                  </>
                ) : (
                  <IconButton
                    aria-label="delete"
                    onClick={() => onToggleEditMode(row.id)}
                  >
                    <EditIcon />
                  </IconButton>
                )}
              </TableCell>
              <CustomTableCell {...{ row, name: "name", onChange }} />
              <CustomTableCell {...{ row, name: "lastName", onChange }} />
              <CustomTableCell {...{ row, name: "email", onChange }} />
            </TableRow>
          ))}
        </TableBody>
      </Table>

                    <form>
                        <TextField
                            id="firstName"
                            type="firstName"
                            label="FirstName"
                            value={billerFirstName}
                            onChange={onfirstNameChange}
                        >
                        </TextField>
                        <TextField
                            id="lastName"
                            type="lastName"
                            label="LasttName"
                            value={billerLastName}
                            onChange={onLastNameChange}
                        >
                        </TextField>
                        <TextField
                            id="email"
                            type="email"
                            label="Email"
                            value={billerEmail}
                            onChange={onEmailChange}

                        >
                        </TextField>
                    </form>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={onSubmit}>
                        Update
                        </Button>



                </CardContent>

            </Card>
        </div>
    )





}

export default withRouter(BillerInfoForm);

import { useState, useCallback } from 'react';


import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DateField } from '@mui/x-date-pickers/DateField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import AppPasswordStrengthMeter from './progressbar';

import {
  Paper,
  Box,
  Grid,
  TextField,
  Typography,
  FormControlLabel,
  Checkbox,
  Button,
  Container,
  shadows,
  Divider

} from '@mui/material'; // use this instead of  @material-ui/core

function App() {

  const validationSchema = Yup.object().shape({
    fullname: Yup.string().required('Fullname is required'),
    middlename: Yup.string().required('Middlename is required'),
    lastname: Yup.string().required('Lastname is required'),
    mobile: Yup.string().required('Mobile Number is required')
      .min(10, '10 digit number required')
      .max(10, '10 digit number required'),

    date_of_birth: Yup.string().required('Birth-Date is required'),

    username: Yup.string()
      .required('Username is required')
      .min(6, 'Username must be at least 6 characters')
      .max(20, 'Username must not exceed 20 characters'),
    email: Yup.string()
      .required('Email is required')
      .email('Email is invalid'),
    passwordmssg: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(40, 'Password must not exceed 40 characters'),
    confirmPassword: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password'), null], 'Confirm Password does not match'),
    acceptTerms: Yup.bool().oneOf([true], 'Accept Terms is required')
  })


  const { register, control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema)
  });


  const onSubmit = data => {
    console.log(JSON.stringify(data, null, 2));
  };

  const [password, setPassword] = useState('')


  const [mytext, setMytext] = useState('')
  const [myarray, setMyarray] = useState([])


  const onChangeDo = (e) => {
    setMytext(e.target.value)
  }

  const onClickAdd = useCallback((textfromuser) => {

    let list = myarray;
    list.push(textfromuser);
    setMyarray(list)
    setMytext("")
  })

  const onChangeDel= (index) =>{
    // let delItem = myarray.splice(index,1)
    // setMyarray({
    //   newDeletedList: delItem
    // })
    const updatedArray = [...myarray];
    updatedArray.splice(index, 1);
    setMyarray(updatedArray);
  }

  return (

    <div>

      <Typography variant="h4" align="center" sx={{ m: '2rem', fontWeight: 'bold' }} >
        Register your account
      </Typography>
      <Container maxWidth="lg" sx={{ boxShadow: 12, borderRadius: '10px' }}>
        <Paper>
          <Box px={3} py={2}>


            <Grid container spacing={1}>

              <Typography variant="h5" align="left" sx={{ m: '1rem', fontWeight: 'bold' }}>
                Personal Information
              </Typography>

              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  id="fullname"
                  name="fullname"
                  label="Full Name"
                  fullWidth
                  margin="dense"
                  {...register('fullname')}
                  error={errors.fullname ? true : false}

                />
                <Typography variant="inherit" color="error">
                  {errors.fullname?.message}
                </Typography>
              </Grid>


              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  id="middlename"
                  name="middlename"
                  label="Middle Name"
                  fullWidth
                  margin="dense"
                  {...register('middlename')}
                  error={errors.middlename ? true : false}
                />
                <Typography variant="inherit" color="error">
                  {errors.middlename?.message}
                </Typography>
              </Grid>


              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  id="lastname"
                  name="lastname"
                  label="Last Name"
                  fullWidth
                  margin="dense"
                  {...register('lastname')}
                  error={errors.lastname ? true : false}
                />
                <Typography variant="inherit" color="error">
                  {errors.lastname?.message}
                </Typography>
              </Grid>

              <Grid item xs={12} sm={12}>
                <TextField
                  id="mobile"
                  name="mobile"
                  label="Mobile"
                  fullWidth
                  margin="dense"
                // {...register('mobile')}
                // error={errors.mobile ? true : false}
                />
                {/* <Typography variant="inherit" color="error">
                  {errors.mobile?.message}
                </Typography> */}
              </Grid>

              <Grid item xs={12} sm={12}>
                <TextField
                  id="hephone"
                  name="hephone"
                  label="Home Phone / Emergency Phone"
                  fullWidth
                  margin="dense"

                />

              </Grid>

              <br />
              <br />
              <br />
              <br />
              <br />

              <Grid item xs={12} sm={12}>
                <Typography color={'#424242'} align="left" sx={{ m: '1rem', fontWeight: 'bold', fontSize: 23, display: 'inline', }}>
                  Date of Birth
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDateFns}  >
                  <DatePicker
                    placeholder="Enter Your BirthDate"
                    label="Date"
                    defaultValue={'null'}
                    id="username"
                    name="username"
                    required
                    fullWidth
                    maxDate={new Date()}
                    margin="dense"
                    error={Boolean(errors.date_of_birth)}
                    helperText={errors.date_of_birth?.message}

                  />
                </LocalizationProvider>


              </Grid>


              <br />
              <br />
              <br />
              <br />
              <br />

              <Grid>
                <Typography color={'#424242'} align="left" sx={{ m: '1rem', fontWeight: 'bold', fontSize: 23 }}>
                  List Your Hobbies
                </Typography>
              </Grid>
              <Grid>

                <TextField
                  required
                  id="hobbies"
                  name="hobbies"
                  label="Hobbies"
                  fullWidth
                  margin="dense"
                  onChange={onChangeDo}
                // {...register('hobbies')}
                // error={errors.hobbies ? true : false}
                />
              </Grid>
              <Grid>
                <Button variant="contained"
                  value={mytext}
                  color="primary" sx={{ ml: 3, mt: 2 }}
                  onClick={() => onClickAdd(mytext)}
                >Add</Button>

              </Grid>


              <Divider sx={{ mt: 2, width: '100%', bgcolor: 'textSecondary', height: '-2rem' }} > </Divider>
              <Typography variant='h6' align='left' sx={{ m: 5 }} >

                {myarray.map((value, index) =>

                  <b key={index} >
                    
                    {index + 1} {value}    <Button variant="contained" color="error" size="small" onClick={()=>onChangeDel(index)} >Delete</Button> 
                    <Divider sx={{ mt: 2, width: '100%', bgcolor: 'textSecondary', height: '-2rem' }} > </Divider>

                  </b>)}

              </Typography>


              <br />

              <Grid item xs={12} >
                <Typography variant="h5" align="left" sx={{ m: '1rem', fontWeight: 'bold' }}>
                  Login Information
                </Typography>
              </Grid>

              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  id="username"
                  name="username"
                  label="Username"
                  fullWidth
                  margin="dense"
                  {...register('username')}
                  error={errors.username ? true : false}
                />
                <Typography variant="inherit" color="error">
                  {errors.username?.message}
                </Typography>
              </Grid>




              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  id="password"
                  name="password"
                  label="Password"
                  type="password"
                  fullWidth
                  margin="dense"
                  onChange={e => setPassword(e.target.value)}

                />

                <AppPasswordStrengthMeter password={password} />


              </Grid>

            </Grid>

            <Box mt={3}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit(onSubmit)}
              >
                Register
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </div>
  );
};

export default App;

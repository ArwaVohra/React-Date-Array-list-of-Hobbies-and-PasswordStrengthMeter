import { useState, useMemo } from 'react';


import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
// import { useState,formState } from 'react';
// import  from '@mui/material/DemoItem';

// import dayjs from 'dayjs';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import DatePicker from '@mui/x-date-pickers/DatePicker';
// import DatePicker from '@mui/x-date-pickers';


// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';


// import { DatePicker } from '@mui/x-date-pickers';
// import DatePicker from '@mui/lab/DatePicker'; //lab wala which worked
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { DatePicker } from '@mui/x-date-pickers';

// import DatePicker from 'react-date-picker';
// import 'react-date-picker/dist/DatePicker.css';
// import 'react-calendar/dist/Calendar.css';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DateField } from '@mui/x-date-pickers/DateField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';

// import PasswordStrengthBar from 'react-password-strength-bar';
// import PasswordStrengthMeter from './component/PasswordStrengthMeter';
// import PasswordStrengthMeter from './progressbar';
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
    // .max(26-5-2023, 'cant be more than todays date'),


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
    // console.log({mydate})
  };
  // const [mydate, setMydate] = useState(null)


  const [value, setValue] = useState(null);

  const [error, setError] = useState(null);
  const errorMessage = useMemo(() => {
    switch (error) {
      case 'maxDate':
      case 'minDate': {
        return 'Please select a date in the first quarter of 2022';
      }

      case 'invalidDate': {
        return 'Your date is not valid';
      }

      default: {
        return '';
      }
    }
  }, [error]);


  const [password,setPassword] = useState('')

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
                    // sx={{ display:'inline'}}
                    placeholder="Enter Your BirthDate"
                    label="Date"
                    defaultValue={'null'}
                    id="username"
                    name="username"
                    required
                    fullWidth
                    // minDate={'2022-01-01T00:00:00.000'}
                    // maxDate={'2022-03-31T23:59:59.999'}
                    margin="dense"
                    // {...register('dateone')}
                    // error={errors.dateone ? true : false}

                    // onError={(newError) => setError(newError)}
                    // slotProps={{
                    //   textField: {
                    //     helperText: errorMessage,
                    //   },
                    // }}


                    error={Boolean(errors.date_of_birth)}
                    helperText={errors.date_of_birth?.message}
                    // rules={{
                    //   required:"Date of Birth"
                    // }}
                  />
                </LocalizationProvider>
                {/* <Typography variant="inherit" color="error">
                  {errors.date_of_birth?.message}
                </Typography> */}
              </Grid>


              <br />
              <br />
              <br />
              <br />
              <br />


              <Typography variant="h5" align="left" sx={{ m: '1rem', fontWeight: 'bold' }}>
                Login Information
              </Typography>


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
                //    {...register('passwordmssg')}
                //   error={errors.passwordmssg ? true : false}
                />
               {/* <input
                     type='password'
                      className="form-control shadow-none" 
                      placeholder='Password' 
                      onChange={e => setPassword(e.target.value)}
                      ></input> */}
               <AppPasswordStrengthMeter password={password} />

                <Typography variant="inherit" color="error">
                  {errors.passwordmssg?.message}
                </Typography>
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
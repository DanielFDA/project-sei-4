/* eslint-disable no-unused-vars */
import React from 'react'
import { useHistory, Link as RouterLink } from 'react-router-dom'
import ImageUpload from '../imageUpload'
import { registerUser } from '../../lib/api'

import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  form: {
    background: 'rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(30px)',
    padding: '5%',
    borderRadius: '45px'
  },
  logo: {
    fontSize: 45,
    fontWeight: 600,
    background: 'linear-gradient(96.21deg, #E751D8 39.3%, #17D5EF 90.17%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  }
}))

function Register() {

  const history = useHistory()
  const [formdata, setFormdata] = React.useState({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    profileImage: '',
    firstName: '',
    lastName: ''
  })
  const [errors, setErrors] = React.useState({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    profileImage: '',
    firstName: '',
    lastName: ''
  })


  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value })
  }
  console.log(formdata)


  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await registerUser(formdata)
      console.log(response)

      setTimeout(() => {
        history.push('/login')
      }, 500)
    } catch (err) {
      const data = err.response.data
      const errarr = {
        username: data.username ? data.username[0] : '',
        email: data.email ? data.email[0] : '',
        password: data.password ? data.password[0] : '',
        passwordConfirmation: data.passwordConfirmation ? data.passwordConfirmation[0] : '',
        profileImage: data.profileImage ? data.profileImage[0] : '',
        firstName: data.firstName ? data.firstName[0] : '',
        lastName: data.lastName ? data.lastName[0] : ''
      }
      if (errarr) {
        setErrors(errarr)
      } else {
        // setErrors('')
      }
      console.log('err.response.data: ', data)
    }
  }

  const classes = useStyles()


  return (
    <Container fixed
      className={classes.root}>
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center" >
        <Container maxWidth="sm">
          <form onSubmit={handleSubmit} className={classes.form}>
            <Box mb={3} style={{ marginLeft: '20%' }}>
              <Typography
                color="textSecondary"
                gutterBottom
                variant="h3"
              >
                the <span className={classes.logo}>BugBuster</span>
              </Typography>
            </Box>
            <TextField
              error={Boolean(errors.username)}
              fullWidth
              helperText={errors.username}
              label="Username"
              margin="normal"
              name="username"
              onChange={handleChange}
              value={formdata.username}
              variant="outlined"
            />
            <TextField
              error={Boolean(errors.firstName)}
              fullWidth
              helperText={errors.firstName}
              label="First Name"
              margin="normal"
              name="firstName"
              onChange={handleChange}
              value={formdata.firstName}
              variant="outlined"
            />
            <TextField
              error={Boolean(errors.lastName)}
              fullWidth
              helperText={errors.lastName}
              label="Last Name"
              margin="normal"
              name="lastName"
              onChange={handleChange}
              value={formdata.lastName}
              variant="outlined"
            />
            <TextField
              error={Boolean(errors.email)}
              fullWidth
              helperText={errors.email}
              label="E-Mail"
              margin="normal"
              name="email"
              onChange={handleChange}
              value={formdata.email}
              variant="outlined"
            />
            <TextField
              error={Boolean(errors.password)}
              fullWidth
              helperText={errors.password}
              label="Password"
              margin="normal"
              name="password"
              onChange={handleChange}
              value={formdata.password}
              variant="outlined"
              type="password"
            />
            <TextField
              error={Boolean(errors.passwordConfirmation)}
              fullWidth
              helperText={errors.passwordConfirmation}
              label="Password Confirmation"
              margin="normal"
              name="passwordConfirmation"
              onChange={handleChange}
              value={formdata.passwordConfirmation}
              variant="outlined"
              type="password"
            />
            <div>
              <ImageUpload
                value={formdata.profile_image}
                name="profile_image"
                button='Upload Profile Picture'
                onChange={handleChange}
              />
              <p>{errors.profileImage}</p>
            </div>
            <Box my={2}>
              <Button
                color="primary"
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Sign up now
              </Button>
            </Box>
            <Typography
              color="textSecondary"
              variant="body1"
            >
              Have an account?
              {' '}
              <Link
                component={RouterLink}
                to="/login"
                variant="h6"
              >
                Sign in
              </Link>
            </Typography>
          </form>
        </Container>
      </Box>
    </Container>

  )
}


export default Register
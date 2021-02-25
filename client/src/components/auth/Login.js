/* eslint-disable no-unused-vars */
import React from 'react'
import { useHistory, Link as RouterLink } from 'react-router-dom'
import { loginUser } from '../../lib/api'
import { setToken } from '../../lib/auth'
import useForm from '../../utils/useForm'

import {
  Box,
  Button,
  Container,
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

function Login() {

  const history = useHistory()
  const { formdata, errors, handleChange, setErrors } = useForm({
    email: '',
    password: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const { data } = await loginUser(formdata)
      setToken(data.token)

      setTimeout(() => {
        history.push('/home')
      }, 500)
    } catch (err) {
      const errorobj = {
        email: err.response.data.detail,
        password: err.response.data.detail
      }
      setErrors(errorobj)
      // //console.log('err.response.data: ', err.response.data)
      // //console.log('Errors: ', errors)
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
              error={(errors.email)}
              fullWidth
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
              helperText={errors.detail}
              label="Password"
              margin="normal"
              name="password"
              onChange={handleChange}
              value={formdata.password}
              variant="outlined"
              type="password"
            />
            <Box my={2}>
              <Button
                color="primary"
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Login now
              </Button>
            </Box>
            <Typography
              color="textSecondary"
              variant="body1"
            >
              Do you need an account?
              {' '}
              <Link
                component={RouterLink}
                to="/register"
                variant="h6"
              >
                Register Now
              </Link>
            </Typography>
          </form>
        </Container>
      </Box>
    </Container>
  )

}

export default Login

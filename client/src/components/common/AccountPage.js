import React from 'react'
import { isAuthenticated } from '../../lib/auth'
// import { Link, useLocation } from 'react-router-dom'
import { getProfile } from '../../lib/api'
import { useHistory } from 'react-router-dom'
import ImageUpload from '../common/ImageUpload'
import { updateUser } from '../../lib/api'
import useForm from '../../utils/useForm'

import {
  Box,
  Button,
  Container,
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

function AccountPage() {

  const history = useHistory()
  const [unauthorized, setUnauthorized] = React.useState(false)
  const { formdata, errors, handleChange, setFormdata, setErrors } = useForm({
    username: false,
    email: false,
    password: '',
    passwordConfirmation: '',
    profileImage: false,
    firstName: false,
    lastName: false
  })

  React.useEffect(() => {
    if (!isAuthenticated) return
    const getData = async () => {
      try {
        const { data } = await getProfile()
        setFormdata(data)
      } catch (err) {
        //console.log(err)
        if (err.response.status === 401 || err.response.status === 403) {
          setUnauthorized(true)
          // //console.log(unauthorized)
          return
        }
      }
    }
    getData()
  }, [setFormdata])

  // //console.log(formdata)

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await updateUser(formdata)
      // //console.log(response)

      setTimeout(() => {
        history.push('/home')
      }, 500)
    } catch (err) {
      // //console.log('err.response.data: ', err.response.data)
      setErrors(err.response.data)
    }
  }

  const classes = useStyles()

  return (
    <Container
      className={classes.root}
    >
      {!formdata ?
        <p>loading...</p>
        :
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
                  // defaultValue={}
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
                // onFocus={handleFocus}
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
                  buttonText='Upload Profile Picture'
                  defaultValue={formdata.profileImage}
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
                  Update Profile
                </Button>
              </Box>
            </form>
          </Container>
        </Box>
      }
    </Container>
  )


}

export default AccountPage
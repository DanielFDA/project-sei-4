/* eslint-disable no-unused-vars */
import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import {
  Box,
  Button,
  TextField,
  Typography,
  makeStyles,
  Menu,
  MenuItem
} from '@material-ui/core'

import MuiDialogContent from '@material-ui/core/DialogContent'
import Dialog from '@material-ui/core/Dialog'
import { assignRoles, createTicket, getProfile, getSingleProject } from '../../lib/api'
import { isAuthenticated } from '../../lib/auth'
import { useHistory, Link, useLocation, useParams } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  form: {
    background: 'rgba(0, 0, 0, 0.5)',
    padding: '5%',
    borderRadius: '45px'
  },
  textField: {
    border: '1px solid rgba(225, 225, 225, 0.3)',
    borderRadius: theme.shape.borderRadius
  }
}))
const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2)
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
})



const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2)
  }
}))(MuiDialogContent)

const CssTextField = withStyles({
  root: {
    '& .MuiInput-underline:after': {
      borderBottomColor: 'yellow'
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'white'
      }
    }
  }
})(TextField)

function NewTicket() {
  const { id } = useParams()
  const classes = useStyles()
  const history = useHistory()
  const [userdata, setUserdata] = React.useState(null)
  const [project, setProject] = React.useState(null)
  const [members, setMembers] = React.useState('')
  const [formdata, setFormdata] = React.useState({
    userOwner: '',
    title: '',
    project: parseInt(id),
    description: '',
    assignedUser: ''
  })
  const [error, setError] = React.useState({
    title: '',
    project: '',
    description: '',
    assignedUser: ''
  })
  // const [projectUser, setprojectUser] = React.useState({
  //   id: userdata.id,
  //   project: '',
  //   role: 'Manager'
  // })

  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value })
  }

  React.useEffect(() => {
    if (!isAuthenticated) return
    const getData = async () => {
      try {
        const { data } = await getProfile()
        setUserdata(data)
        const response = await getSingleProject(id)
        //console.log('singleProject: ', response.data)
        setMembers(response.data.members)
      } catch (err) {
        console.log(err)
        return
      }
    }
    getData()
  }, [])

  // const users = response.filter(user => {
  //   return user.id !== userdata.id
  // })
  // //console.log('AFTER FILTER: ', newUsersToAdd)
  // const usersWithoutOwner = users.filter(user => {
  //   return user.data.id !== 1
  // })
  // //console.log('usersWithout owner: ', usersWithoutOwner)



  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setFormdata(formdata)
      //console.log(formdata)
      const { data } = await createTicket(formdata)
      //console.log(data.id)
      history.push(`/home/projects/${id}`)
    } catch (err) {
      //console.log(err.response.data)
      setError(err.response.data)
    }
  }

  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = (e) => {
    const formData = { ...formdata, ['assignedUser']: e.target.value }
    setFormdata(formData)
    setAnchorEl(null)
    // setFormdata({ ...formdata, [e.target.name]: e.target.value })
    // //console.log(e.target.value)
    //console.log(formdata)
  }


  return (
    <>
      <Dialog
        aria-labelledby="customized-dialog-title"
        open={open}
        PaperProps={{
          style: {
            backgroundColor: 'transparent',
            boxShadow: 'none'
          }
        }}
      >
        <DialogContent >
          <form onSubmit={handleSubmit} className={classes.form}>
            <Typography
              align="center"
              color="textPrimary"
              variant="h2"
            >
              New Ticket
            </Typography>
            <CssTextField
              error={Boolean(error.title)}
              fullWidth
              helperText={error.title}
              label="Ticket Name"
              margin="normal"
              name="title"
              onChange={handleChange}
              value={formdata.title}
              variant="outlined"
            />
            <CssTextField
              error={Boolean(error.description)}
              fullWidth
              helperText={error.description}
              label="Ticket Description"
              margin="normal"
              name="description"
              onChange={handleChange}
              value={formdata.description}
              variant="outlined"
              multiline
              rows={3}
            />
            {members ?
              <div>
                <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                  Assign User
                </Button>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  {members.map((member) => (
                    <MenuItem
                      style={{ 'background-color': 'black' }}
                      onClick={handleClose}
                      value={member.id}
                      key={member.id}
                    >
                      {member.user.firstName} {member.user.lastName}
                    </MenuItem>
                  ))}
                </Menu>
              </div>
              :
              'Loading ...'
            }
            <Box my={2}>
              <Button
                color="primary"
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Create Ticket
              </Button>
            </Box>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default NewTicket
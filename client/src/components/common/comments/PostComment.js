/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import {
  Box,
  Button,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core'
import MuiDialogContent from '@material-ui/core/DialogContent'
import Dialog from '@material-ui/core/Dialog'
import { createComment, getProfile } from '../../../lib/api'
import { isAuthenticated } from '../../../lib/auth'
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
    borderRadius: '45px',
    minWidth: '300px'
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

function PostComment() {
  const classes = useStyles()
  const history = useHistory()
  const { id, idTicket } = useParams()
  const [formdata, setFormdata] = React.useState({
    content: '',
    ticket: parseInt(idTicket)
  })
  const [error, setError] = React.useState({
    content: '',
    ticket: ''
  })

  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value })
  }
  //console.log(formdata)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {

      const response = await createComment(formdata)
      //console.log(response)
      history.push(`/home/projects/${id}`)
    } catch (err) {
      //console.log(err.response.data)
      setError(err.response.data)
    }
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
              New Comment
            </Typography>

            <CssTextField
              error={Boolean(error.description)}
              fullWidth
              helperText={error.description}
              label="Your Comment..."
              margin="normal"
              name="content"
              onChange={handleChange}
              value={formdata.description}
              variant="outlined"
              multiline
              rows={3}

            />

            <Box my={2}>
              <Button
                color="primary"
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Post Comment
              </Button>
            </Box>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default PostComment
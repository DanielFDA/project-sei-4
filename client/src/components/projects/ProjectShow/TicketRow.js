/* eslint-disable no-unused-vars */
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Collapse from '@material-ui/core/Collapse'
import IconButton from '@material-ui/core/IconButton'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import { Button, Grid } from '@material-ui/core'
import Comment from './Comment'
import { Link, useParams } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      borderBottom: 'unset',
      padding: '5px'
    },
    background: theme.palette.background.paper
  }
}))

function TicketRow(ticket) {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)
  const { id } = useParams()
  return (
    <>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)} style={{ color: 'white' }}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {ticket.ticket.title}
        </TableCell>
        <TableCell align="right">{ticket.ticket.types}</TableCell>
        {/* {//console.log('ticket data:', ticket)} */}
        <TableCell align="right">{`${ticket.ticket.userOwner.firstName} ${ticket.ticket.userOwner.lastName}`}</TableCell>
        <TableCell align="right">{`${ticket.ticket.assignedUser.user.firstName} ${ticket.ticket.assignedUser.user.lastName}`}</TableCell>
        <TableCell align="right">{ticket.ticket.status}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>

            <Grid
              container
              justify="space-between"
              spacing={2}
              direction="column"
            >
              <Grid item>
                <Typography
                  color="textSecondary"
                  variant="h5"
                >
                  DESCRIPTION
                </Typography>
                <Typography
                  color="textPrimary"
                  variant="body"
                  gutterBottom
                >
                  {ticket.ticket.description}
                </Typography>
              </Grid>
              <Grid item>
                <Typography
                  color="textSecondary"
                  variant="h5"
                  style={{ marginTop: '5px' }}
                >
                  COMMENTS
                </Typography>
                {ticket.ticket.comments.map(comment => (
                  <Comment
                    key={comment.id}
                    comment={comment}
                  />
                ))}
              </Grid>
              <Grid
                item
                style={{ marginLeft: '35%', marginBottom: '10px' }}
              >
                <Button
                  color="primary"
                  variant="outlined"
                  size="small"
                  component={Link}
                  to={`/home/projects/${id}/ticket/${ticket.ticket.id}/new-comment`}
                >
                  New Comment
                </Button>
                <Button
                  color="secondary"
                  variant="outlined"
                  size="small"
                >
                  Update Ticket
                </Button>
              </Grid>
            </Grid>

          </Collapse>
        </TableCell>
      </TableRow>
    </>
  )
}


export default TicketRow

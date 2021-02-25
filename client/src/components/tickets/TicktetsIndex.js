/* eslint-disable no-unused-vars */
import React from 'react'
import { isAuthenticated } from '../../lib/auth'
import { Link, useLocation } from 'react-router-dom'
import { getAllTickets, getProfile } from '../../lib/api'
import LoadingScreen from '../common/LoadingScreen'
import {
  Box,
  Container,
  Grid,
  makeStyles,
  Typography,
  Tooltip,
  Fab
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import { Pagination } from '@material-ui/lab'
import TicketCard from './TicketCard'

const useStyles = makeStyles((theme) => ({
  html: {
    overflow: 'hidden'
  },
  root: {
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
    flexGrow: 1
  },
  productCard: {
    height: '100%'
  },
  absolute: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(3)
  }
}))

function TicketsIndex() {
  const [user, setUser] = React.useState('')
  const [unauthorized, setUnauthorized] = React.useState(false)
  const [tickets, setTickets] = React.useState([])
  const { pathname } = useLocation()
  const [open, setOpen] = React.useState(false)
  const classes = useStyles()
  const handleClick = () => {
    setOpen(!open)
  }

  React.useEffect(() => {
    if (!isAuthenticated) return
    const getData = async () => {
      try {
        const { data } = await getProfile()
        //console.log(data)
        setUser(data)
        const response = await getAllTickets()
        //console.log('response: ', response.data)
        setTickets(response.data)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [])

  const myAssignedTickets = tickets.filter(ticket => {
    return ticket.assignedUser.user.id === user.id
  })
  //console.log('assigned tickets: ', myAssignedTickets)

  const myCreatedTickets = tickets.filter(ticket => {
    return ticket.userOwner.id === user.id
  })
  //console.log('owned tickets: ', myCreatedTickets)


  return (
    <Container
      className={classes.root}
    >
      {!myAssignedTickets ?
        <p>loading...</p>
        :
        <Container
          maxWidth={false}
        >
          <Typography
            align="center"
            color="textPrimary"
            variant="h2"
          >
            My Assigned Tickets
          </Typography>
          <Box mt={4}>
            <Grid
              container
              spacing={3}
            >
              {myAssignedTickets.map((ticket) => (
                <Grid
                  item
                  key={ticket.id}
                  lg={4}
                  md={6}
                  xs={12}
                >
                  <TicketCard
                    className={classes.projectCard}
                    ticket={ticket}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
          <Typography
            align="center"
            color="textPrimary"
            variant="h2"
            style={{ margin: '3rem 0 0 0' }}
          >
            My Owned Tickets
          </Typography>
          <Box 
            mt={4}
          >
            <Grid
              container
              spacing={3}
            >
              {myCreatedTickets.map((ticket) => (
                <Grid
                  item
                  key={ticket.id}
                  lg={4}
                  md={6}
                  xs={12}
                >
                  <TicketCard
                    className={classes.projectCard}
                    ticket={ticket}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
          <Box
            mt={3}
            display="flex"
            justifyContent="center"
          >
            <Pagination
              color="primary"
              count={1}
              size="small"
            />
          </Box>
        </Container>
      }
    </Container>
  )
}

export default TicketsIndex
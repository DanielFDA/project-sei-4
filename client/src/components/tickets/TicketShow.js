/* eslint-disable no-unused-vars */
import axios from 'axios'
import React from 'react'
import { Link as RouterLink, useParams, useHistory } from 'react-router-dom'
import { getAllTickets, getProfile } from '../../lib/api'
// import { v4 as uuidv4 } from 'uuid'
import { isAuthenticated } from '../../lib/auth'

import {
  Box,
  Container,
  Grid,
  makeStyles,
  Typography,
  Tooltip,
  Fab,
  Link
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'

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

function TicketShow() {
  const [user, setUser] = React.useState('')
  const history = useHistory()
  const { id } = useParams()
  const [tickets, setTickets] = React.useState([])
  const [currentTicket, setCurrentTicket] = React.useState('')
  const [ unauthorized, setUnauthorized]  = React.useState(false)
  const [ notLoggedIn, setNotLoggedIn ] = React.useState(false)
  const [open, setOpen] = React.useState(false)
  let myTicket
  
  const classes = useStyles()

  const handleClick = () => {
    setOpen(!open)
    history.push(`/home/projects/${id}/new-ticket`)
  }

  //* get single item
  React.useEffect(() => {
    // if (id) //console.log('id', id)
    if (!isAuthenticated) return
    const getData = async () => {
      try { 
        const { data } = await getProfile()
        setUser(data)
        //console.log(data)

        const response = await getAllTickets()
        setTickets(response.data)
        const myData = response.data
        myTicket = myData.filter(ticket => {
          return ticket.id === parseInt(id)
        })
        setCurrentTicket(myTicket)
        //console.log(myTicket)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  },[1])

  // const myTicket = tickets.filter(ticket => {
  //   return ticket.id === id
  // })
  // setCurrentTicket(myTicket)
  // //console.log('my ticket: ', currentTicket)

  // function getUserId(){
  //   const payload = getPayload()
  //   if (!payload) return false
  //   //console.log( 'userId on pokeshow',payload.sub )
  //   return payload.sub
  // }  
  // getUserId()

  // const handleProjectDelete = async event => { //Delete Comments Logic 
  //   const commentId = event.target.value 
  //   try {
  //     await deleteComment(id, commentId)
  //     setCommentToDelete(event.target.value) 
  //   } catch (err) {
  //     if (err.response.data.message === 'Unauthorized') {
  //       setUnauthorized(true)
  //       return 
  //     }
  //   }
  // }
  

  return (
    <>
      {currentTicket ? 
        <Typography
          align="left"
          color="textPrimary"
          variant="h1"
          style={{ margin: '0 0 0 10px' }}
        >
          {currentTicket[0].title} 
        </Typography>
        : 
        <p>Loading...</p>
      }
      <section style={{ margin: '0 0 0 20px' }}>
        {currentTicket ?
          <>
            <div>
              <p>Project: </p>
              <Typography 
                // className={classes.root}
                variant='h3'
              >
                <Link
                  size="large"
                  component={RouterLink}
                  to={`/home/projects/${currentTicket[0].project.id}`}>
                  {currentTicket[0].project.name}
                </Link>
              </Typography>
            </div>
            <div>
              <p>Ticket Creation Date: </p>
              <h3>{(currentTicket[0].creationDate).slice(0, 10)}</h3>
            </div>
            <div>
              <p>Project Deadline: </p>
              <h3>{currentTicket[0].project.deadline}</h3>
            </div>
            <div>
              <p>Owner: </p>
              <h2>{currentTicket[0].owner.user.firstName} {currentTicket[0].owner.user.lastName} </h2>
            </div>
            <div>
              <p>Assigned to: </p>
              <h4>{currentTicket[0].assignedUser.user.firstName} {currentTicket[0].assignedUser.user.lastName} </h4>
            </div>
            <div>
              <p>Description: </p>
              <h3>{currentTicket[0].description}</h3>
            </div>
            <div>
              <p>Type: </p>
              <h3>{currentTicket[0].types}</h3>
            </div>
            <div>
              <p>Status: </p>
              <h3>{currentTicket[0].status}</h3>
            </div>
          </>
          : 
          <p>Loading...</p>
        }
      </section>
      {/* <Tooltip
        title="Add Members"
        aria-label="add"
        enterDelay={400}
        leaveDelay={250}
      >
        <Fab
          color="secondary"
          size="large"
          className={classes.absolute}
          onClick={handleClick}
          component={RouterLink} to={`/home/projects/${id}/roles`}
        >
          <AddIcon />
        </Fab>
      </Tooltip>
      <Tooltip
        title="Add Ticket"
        aria-label="add"
        enterDelay={400}
        leaveDelay={250}
        style={{ margin: '0 0 5rem 0' }}
      >
        <Fab
          color="secondary"
          size="large"
          className={classes.absolute}
          onClick={handleClick}
          component={RouterLink}
          to={`/home/projects/${id}/new-ticket`}
        >
          <AddIcon />
        </Fab>
      </Tooltip> */}
    </>
  )
}

export default TicketShow



{/* <div>
            <p>Members: </p>
            {tickets.members.length > 0 ? //ternary not needed in the current state but could change
              <>
                <ul>
                  {tickets.members.map(member => (
                    <li key={member.user.id}>{member.user.firstName} {member.user.lastName} - {member.role}</li>
                  ))}
                </ul>
              </>
              :
              'This project doesn\'t have any members yet'
            }
          </div> */}
{/* <div>
            <p>Tickets: </p>
            {tickets.tickets.length > 0 ? 
              <>
                <ul>
                  {tickets.tickets.map(ticket => (
                    <li key={ticket.id}> {ticket.title} -owner: {ticket.owner.user.firstName} {ticket.owner.user.lastName} -assigned to: {ticket.assignedUser.user.firstName} {ticket.assignedUser.user.lastName} -status :{ticket.status}</li>
                  ))}
                </ul>
              </>
              :
              'This project doesn\'t have any tickets yet'
            }
          </div> */}


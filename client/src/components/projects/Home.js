/* eslint-disable no-unused-vars */
import React from 'react'
import { isAuthenticated } from '../../lib/auth'
import { Link, useLocation } from 'react-router-dom'
import { getProfile } from '../../lib/api'


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
import ProjectCard from './ProjectCard'

const useStyles = makeStyles((theme) => ({
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

function Home() {
  const [userRole, setUserRole] = React.useState(null)
  const [unauthorized, setUnauthorized] = React.useState(false)
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
        // //console.log(data)
        setUserRole(data.group)
      } catch (err) {
        if (err.response.status === 401 || err.response.status === 403) {
          setUnauthorized(true)
          return
        }
      }
    }
    getData()
  }, [])

  return (
    <Container
      className={classes.root}
    >
      {!userRole ?
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
            My Projects
          </Typography>
          <Box mt={4}>
            <Grid
              container
              spacing={3}
            >
              {userRole.map((role) => (
                <Grid
                  item
                  key={role.id}
                  lg={4}
                  md={6}
                  xs={12}
                >
                  <ProjectCard
                    className={classes.projectCard}
                    role={role}

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
          <Tooltip
            title="Create a Project"
            aria-label="add"
            enterDelay={400}
            leaveDelay={250}
          >
            <Fab
              color="secondary"
              size="large"
              className={classes.absolute}
              onClick={handleClick}
              component={Link} to={'/new-project'}
            >
              <AddIcon />
            </Fab>
          </Tooltip>
        </Container>
      }
    </Container>
  )
}

export default Home
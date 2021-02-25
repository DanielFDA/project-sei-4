import React, { useState } from 'react'
//import { useLocation } from 'react-router-dom'
import { makeStyles } from '@material-ui/core'
import SideBar from './sidebar/index'
import Navbar from './NavBar'
import { getProfile } from '../../../lib/api'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%'
  },
  wrapper: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
    paddingTop: 64,
    [theme.breakpoints.up('lg')]: {
      paddingLeft: 256
    }
  },
  contentContainer: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden'
  },
  content: {
    flex: '1 1 auto',
    height: '100%',
    overflow: 'auto'
  }
}))

const Bars = () => {
  const classes = useStyles()
  const [isMobileNavOpen, setMobileNavOpen] = useState(false)
  const [userData, setUserData] = React.useState()
  //const { pathname } = useLocation()

  React.useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await getProfile()
        // //console.log(data)
        setUserData(data)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [])
  // //console.log(userData)

  return (
    <>
      {!userData ?
        <p>loading</p>
        :
        <>
          <div className={classes.root}>
            <Navbar onMobileNavOpen={() => setMobileNavOpen(true)} />
            <SideBar
              onMobileClose={() => setMobileNavOpen(false)}
              openMobile={isMobileNavOpen}
              user={userData}
            />

          </div>
        </>
      }
    </>
  )
}

export default Bars
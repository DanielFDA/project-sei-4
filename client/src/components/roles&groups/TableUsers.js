/* eslint-disable no-unused-vars */
import React from 'react'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import { useParams, useHistory } from 'react-router-dom'
import PerfectScrollbar from 'react-perfect-scrollbar'
import Skeleton from '@material-ui/lab/Skeleton'
import {
  Box,
  Card,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  makeStyles
} from '@material-ui/core'
import UserRow from './UserRow'
import { getProfile, assignRoles } from '../../lib/api'
const useStyles = makeStyles((theme) => ({
  root: {},

  form: {
    borderRadius: '45px',
    margin: theme.spacing(2)
  }
}))

const TableUsers = ({ className, users, ...rest }) => {
  const classes = useStyles()
  const { id } = useParams()
  const [limit, setLimit] = React.useState(10)
  const [page, setPage] = React.useState(0)
  const history = useHistory()
  const [usersToAdd, setUsersToAdd] = React.useState([])
  const [userProfile, setUserProfile] = React.useState()

  React.useEffect(() => {
    const getData = async () => {
      const { data } = await getProfile()
      setUserProfile(data)
    }
    getData()
  }, [])


  const handleChangeCheckbox = (e) => {
    if (e.target.checked) {
      setUsersToAdd([...usersToAdd, { user: parseInt(e.target.value), project: parseInt(id), role: 'Developer' }])
    } else {
      const newUsersToAdd = usersToAdd.filter(user => {
        return user.user !== e.target.value
      })
      setUsersToAdd(newUsersToAdd)
    }
  }
  const setUserRole = (userId, selectedRole) => {
    const updatedUsers = usersToAdd.map(user => {
      if (parseInt(user.user) === userId) {
        return { ...user, role: selectedRole }
      }
      return user
    })
    setUsersToAdd(updatedUsers)
  }

  const handleLimitChange = (event) => {
    setLimit(event.target.value)
  }

  const handlePageChange = (event, newPage) => {
    setPage(newPage)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await assignRoles(usersToAdd)
      history.push(`/home/projects/${id}`)
    } catch (err) {
      console.log(err)
    }
  }


  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <PerfectScrollbar>
        <form className={classes.form}>
          <Box minWidth={1050}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                  </TableCell>
                  <TableCell>
                    Image
                  </TableCell>
                  <TableCell>
                    Id
                  </TableCell>
                  <TableCell>
                    Name
                  </TableCell>
                  <TableCell>
                    Email
                  </TableCell>
                  <TableCell>
                    Select Role
                  </TableCell>

                </TableRow>
              </TableHead>
              {!userProfile ?
                <Skeleton variant="rect" width={210} height={118} />
                :
                <>
                  <TableBody>
                    {users.slice(0, limit).filter(user => user.id !== userProfile.id).map((user) => (
                      <UserRow
                        key={user.id}
                        user={user}
                        handleChangeCheckbox={handleChangeCheckbox}
                        setUserRole={setUserRole}
                      />
                    ))}
                  </TableBody>
                </>
              }
            </Table>
          </Box>

        </form>
        <Box
          display="flex"
          justifyContent="center"
          mt={4}
        >
          <Button
            color="primary"
            variant="contained"
            onClick={handleSubmit}
          >
            Add roles
          </Button>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={users.length}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card >
  )
}

TableUsers.propTypes = {
  className: PropTypes.string,
  users: PropTypes.array.isRequired
}

export default TableUsers

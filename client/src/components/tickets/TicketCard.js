import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  makeStyles,
  Link
} from '@material-ui/core'
import AccessTimeIcon from '@material-ui/icons/AccessTime'
import FaceIcon from '@material-ui/icons/Face'
import { Link as RouterLink } from 'react-router-dom'
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    background: 'rgba(0, 0, 0, 0.2)'
  },
  statsItem: {
    alignItems: 'center',
    display: 'flex'
  },
  statsIcon: {
    marginRight: theme.spacing(1),
    color: theme.palette.background.default
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
}))

const TicketCard = ({ className, ticket, ...rest }) => {
  const classes = useStyles()

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent className={classes.cardContent}>
        <Link
          color="textPrimary"
          gutterBottom
          variant="h4"

          component={RouterLink}
          to={`/home/projects/${ticket.project.id}`}
        >
          {ticket.title}
          {/* {//console.log('thissss', ticket)} */}
        </Link>
        <Typography
          align="center"
          color="textPrimary"
          variant="body1"
        >
          {ticket.description}
        </Typography>
      </CardContent>
      <Box flexGrow={1} />
      <Divider />
      <Box p={2}>
        <Grid
          container
          justify="space-between"
          spacing={2}
        >
          <Grid
            className={classes.statsItem}
            item
          >
            <AccessTimeIcon
              className={classes.statsIcon}
              color="action"
            />
            <Typography
              color="textSecondary"
              display="inline"
              variant="body2"
            >
              {ticket.types}
            </Typography>
          </Grid>
          <Grid
            className={classes.statsItem}
            item
          >
            <FaceIcon
              className={classes.statsIcon}
              color="action"
            />
            <Typography
              color="textSecondary"
              display="inline"
              variant="body2"
            >
              {ticket.owner.user.firstName} {ticket.owner.user.lastName}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Card>
  )
}

TicketCard.propTypes = {
  className: PropTypes.string,
  product: PropTypes.object.isRequired
}

export default TicketCard

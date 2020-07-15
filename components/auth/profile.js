import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { signOut } from '../../redux/actions/authActions'
import Link from 'next/link'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Snackbar from '@material-ui/core/Snackbar'
import AccountCircle from '@material-ui/icons/AccountCircle'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import VpnKeyIcon from '@material-ui/icons/VpnKey'
import Alert from '@material-ui/lab/Alert'

export default function Profile() {
  const dispatch = useDispatch()
  const { user, signOutError } = useSelector(({ auth }) => auth)

  const [anchorEl, setAnchorEl] = React.useState(null)
  const openMenu = Boolean(anchorEl)
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const [openToast, setOpenToast] = React.useState(false);
  const handleToastClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpenToast(false)
  }
  useEffect(() => {
    if (signOutError) {
      setOpenToast(true)
    }
  }, [signOutError])

  const handleSignOut = () => {
    handleClose()
    dispatch(signOut())
  }

  return (
    <>
      {(user === null)
        ? (
          <Link href="/auth/signIn">
            <Button color="inherit" startIcon={<VpnKeyIcon />}>Sign In</Button>
          </Link>
        )
        : (
          <div>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit">
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={openMenu}
              onClose={handleClose}>
              <MenuItem onClick={handleSignOut}>
                <ListItemIcon>
                  <ExitToAppIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Sign Out" />
              </MenuItem>
            </Menu>
          </div>
        )}

      {signOutError && <Snackbar open={openToast} autoHideDuration={5000} onClose={handleToastClose}>
        <Alert onClose={handleToastClose} severity="error">
          {signOutError.message}
        </Alert>
      </Snackbar>}
    </>
  )
}

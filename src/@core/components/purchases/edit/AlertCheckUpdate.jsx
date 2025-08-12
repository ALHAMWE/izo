// ** React Imports
import { Fragment } from 'react'

// ** MUI Imports
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'
import { Box, Typography } from '@mui/material'
import WarningIcon from '@mui/icons-material/Warning'

//**  Next cookies
import { getCookie } from 'cookies-next'

const AlertCheckUpdate = ({ open, close, setFieldValue, isSubmitting, handleSubmit }) => {
  const handleCloseAlert = () => close()
  // ** Cookies
  const transText = getCookie('fontStyle')

  return (
    <Fragment>
      <Dialog
        open={open}
        sx={{ textTransform: transText }}
        onClose={handleCloseAlert}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title' style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant='h5'>You change the supplier !</Typography>
          <Box color={'error'}>
            <WarningIcon sx={{ fontSize: '35px' }} color='error' />
          </Box>
        </DialogTitle>

        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Do you want to transfer the linked Payments ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            color='success'
            variant={isSubmitting ? 'outlined' : 'contained'}
            type='submit'
            disabled={isSubmitting}
            onClick={async () => {
              setFieldValue('check', 1)
              await handleSubmit()

              handleCloseAlert()
            }}
          >
            {isSubmitting ? 'Please wait...' : 'Yes & Update'}
          </Button>
          <Button
            type='submit'
            color='success'
            disabled={isSubmitting}
            variant={isSubmitting ? 'outlined' : 'contained'}
            onClick={async () => {
              setFieldValue('check', 0)
              await handleSubmit()

              handleCloseAlert()
            }}
          >
            {isSubmitting ? 'Please wait...' : 'No & Update'}
          </Button>

          <Button variant='outlined' color='secondary' onClick={handleCloseAlert}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  )
}

export default AlertCheckUpdate

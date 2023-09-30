import React from 'react'
import { useIntl } from 'react-intl'
import { useTheme } from '@mui/material/styles'

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, IconButton,
    Slide,
    useMediaQuery,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';

const Transition = React.forwardRef((props, ref) => (
    <Slide direction="up" {...props} ref={ref} />
))

function BootstrapDialogTitle(props) {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
}

const QuestionDialog = ({
                            isProcessing = false,
                            isOpen = false,
                            id = '',
                            message = '',
                            title = '',
                            action = '',
                            haveButton=false,
                            handleAction = () => {},
                            handleClose = () => {},
                            ...rest
                        }) => {
    const intl = useIntl()
    const theme = useTheme()
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))

    return (
        <Dialog
            fullScreen={fullScreen}
            open={isOpen}
            onClose={handleClose}
            TransitionComponent={Transition}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            {...rest}
        >
            {/*<DialogTitle id="alert-dialog-title">{title}</DialogTitle>*/}
            <BootstrapDialogTitle id="alert-dialog-title" onClose={handleClose}>
                {title}
            </BootstrapDialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {message}
                </DialogContentText>
            </DialogContent>
            {haveButton&&<DialogActions>
                <Button onClick={handleClose} color="primary">
                    {intl.formatMessage({id: 'cancel', defaultMessage: 'Cancel'})}
                </Button>
                <Button
                    disabled={isProcessing}
                    onClick={() => {
                        handleAction(handleClose)
                    }}
                    color="secondary"
                >
                    {action}
                </Button>
            </DialogActions>}
        </Dialog>
    )
}

export default QuestionDialog
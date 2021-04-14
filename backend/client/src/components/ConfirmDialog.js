import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core'
import React from 'react'

const ConfirmDialog = (props) => {
    return (
        <div>
            <Dialog
                // fullScreen={fullScreen}
                open={props.isOpen}
                onClose={() => {
                    props.setConfirmDialog({ ...props, isOpen: false });
                }
                }
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">{props.title}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{props.content}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="danger" onClick={() => props.setConfirmDialog({ ...props, isOpen: false })}>Close</Button>
                    <Button autoFocus variant="contained" color="primary" onClick={props.confirm}>Ok</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
export default ConfirmDialog;
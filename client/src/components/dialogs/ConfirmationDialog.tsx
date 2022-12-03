import { Grid, Typography, Button, Box } from '@mui/material'

import CustomDialog from './CustomDialog'

type ConfirmationDialogProps = {
    open: boolean
    title: string
    description: string
    onConfirm: () => void
    onClose: () => void
}

export default function ConfirmationDialog({ open, onClose, onConfirm, title, description }: ConfirmationDialogProps) {
    return (
        <CustomDialog
            title={title}
            open={open}
            onClose={onClose}
        >
            <Grid container>
                <Grid item xs={12}>
                    <Typography variant="body1">
                        {description}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Box sx={{ float: 'right' }}>
                        <Button color="primary" variant="text" onClick={onClose}>
                            Não
                        </Button>
                        <Button color="primary" variant="contained" onClick={onConfirm}>
                            Sim
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </CustomDialog>
    )
}

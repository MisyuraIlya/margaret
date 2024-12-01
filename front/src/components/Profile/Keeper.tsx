import { Box, Button, CircularProgress, Grid, IconButton, Tooltip, Typography } from '@mui/material';
import React, { useState } from 'react';
import useDataSalesKeeper from '../../hooks/agent/useDataSalesKeeper';
import useDataQuantityKeeper from '../../hooks/agent/useDataQuantityKeeper';
import { useAuth } from '../../store/auth.store';
import ErrorIcon from '@mui/icons-material/Error';
import SalesKeeper from '../Modals/Agent/SalesKeeper';
import { themeColors } from '../../styles/mui';

const Keeper = () => {
    const {user} = useAuth()
    const {data:sales} = useDataSalesKeeper(user?.extId)
    const {data:quantity} = useDataQuantityKeeper(user?.extId)
    const [open, setOpen] = useState(false);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setOpen(true);
    };

    const handleSales = () => {
        if (sales) {
            if (sales?.sumPreviousMonthCurrentYear > sales?.sumPreviousMonthPreviousYear) {
                return (
                    <Tooltip title="עלייה במחזור מחירות">
                        <Button endIcon={<ErrorIcon color='success'/>} onClick={handleClick} variant='outlined' color='success'>
                            צפייה במחזור
                        </Button>
                    </Tooltip>
                );
            } else if (sales?.sumPreviousMonthCurrentYear === 0 && sales?.sumPreviousMonthPreviousYear === 0) {
                return (
                    <Tooltip title="לקוח לא פעיל / מחזור 0 מחירות">
                        <Button endIcon={<ErrorIcon color='info'/>} onClick={handleClick} variant='outlined' color='info'>
                            צפייה במחזור
                        </Button>
                    </Tooltip>
                );
            } else {
                return (
                    <Tooltip title="ירידה במחזור מחירות">
                        <Button endIcon={<ErrorIcon color='error'/>} onClick={handleClick} variant='outlined' color='error'>
                            צפייה במחזור
                        </Button>
                    </Tooltip>
                );
            }
        } else {
            return (
                <Box>
                    <CircularProgress size="20px" color="info" />
                </Box>
            );
        }
    };

    return (
        <>
        <Grid item sm={1.5} xs={6}>
            <Typography variant="h6" color={themeColors.asphalt}>
              {'מחזור'}
            </Typography>
            {handleSales()}
        </Grid>
        <SalesKeeper active={open} setActive={setOpen} user={user!}/>
        </>
    );
};

export default Keeper;
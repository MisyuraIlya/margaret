import { Box, CircularProgress, IconButton, LinearProgress, TableCell, Tooltip, Typography } from '@mui/material';
import React, { FC, useState } from 'react';
import { UserStatus } from '../../../enums/status';
import useDataSalesKeeper from '../../../hooks/agent/useDataSalesKeeper';
import useDataQuantityKeeper from '../../../hooks/agent/useDataQuantityKeeper';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import SalesKeeper from '../../Modals/Agent/SalesKeeper';

interface ICardProps {
    element: IUser
}

const Card: FC<ICardProps> = ({ element }) => {
    const { data: sales } = useDataSalesKeeper(element.extId);
    const { data: quantity } = useDataQuantityKeeper(element.extId);
    const [open, setOpen] = useState(false);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        console.log('here');
        event.preventDefault();
        event.stopPropagation();
        setOpen(true);
    };

    const handleSales = () => {
        if (sales) {
            if (sales?.sumPreviousMonthCurrentYear > sales?.sumPreviousMonthPreviousYear) {
                return (
                    <Tooltip title="עלייה במחזור מחירות">
                        <IconButton onClick={handleClick}>
                            <TrendingUpIcon color="success" />
                        </IconButton>
                    </Tooltip>
                );
            } else if (sales?.sumPreviousMonthCurrentYear === 0 && sales?.sumPreviousMonthPreviousYear === 0) {
                return (
                    <Tooltip title="לקוח לא פעיל / מחזור 0 מחירות">
                        <IconButton onClick={handleClick}>
                            <TrendingFlatIcon color="info" />
                        </IconButton>
                    </Tooltip>
                );
            } else {
                return (
                    <Tooltip title="ירידה במחזור מחירות">
                        <IconButton onClick={handleClick}>
                            <TrendingDownIcon color="error" />
                        </IconButton>
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
            <TableCell>
                <Typography variant="body2">{element?.name}</Typography>
            </TableCell>
            <TableCell>
                <Typography variant="body2">{element?.extId}</Typography>
            </TableCell>
            <TableCell>
                <Typography variant="body2">{element?.phone}</Typography>
            </TableCell>
            <TableCell>
                <Typography variant="body2">{element?.hp}</Typography>
            </TableCell>
            <TableCell>
                <Typography variant="body2">{element?.maxObligo}</Typography>
            </TableCell>
            <TableCell>
                <Typography variant="body2">{element?.maxCredit}</Typography>
            </TableCell>
            <TableCell>
                <Typography variant="body2">{element?.address}</Typography>
            </TableCell>
            <TableCell>
                <Typography variant="body2">{element?.city}</Typography>
            </TableCell>
            <TableCell>
                <Typography variant="body2">{UserStatus(element)}</Typography>
            </TableCell>
            <TableCell sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {handleSales()}
            </TableCell>
            <SalesKeeper active={open} setActive={setOpen} user={element}/>
        </>
    );
};

export default Card;
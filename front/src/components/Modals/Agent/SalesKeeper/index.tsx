// SalesKeeper component
import React, { FC } from 'react';
import ModalWrapper from '../../ModalWrapper';
import { Box, Typography, Tabs, Tab } from '@mui/material';
import SalesKeeperAverage from './SalesKeeperAverage';
import QuantityKeeper from './QuantityKeeper';
import { themeColors } from '../../../../styles/mui';

interface SalesKeeperProps {
    active: boolean
    setActive: (value: boolean) => void
    user: IUser
}

const SalesKeeper: FC<SalesKeeperProps> = ({ active, setActive, user }) => {
    const [value, setValue] = React.useState(0); // State to control the active tab

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <ModalWrapper active={active} setActive={setActive} height={'600px'} width={65}>
            <Box>
                <Tabs value={value} onChange={handleTabChange} aria-label="sales tabs">
                    <Tab label="מחזור" sx={{fontSize:'23px'}}/>
                    <Tab label="כמויות" sx={{fontSize:'23px'}}/>
                </Tabs>
                <Box sx={{margin:'20px 0'}}>
                    <Typography variant='h5' color={'primary'}>
                        {user?.name}
                    </Typography>
                    <Typography variant='body2' color={themeColors.asphalt}>
                        {user?.extId}
                    </Typography>
                </Box>
                <Box>
                    {value === 0 && (
                        <SalesKeeperAverage extId={user.extId}/>
                    )}
                    {value === 1 && (
                        <QuantityKeeper extId={user.extId}/>
                    )}
                </Box>
            </Box>
        </ModalWrapper>
    );
};

export default SalesKeeper;

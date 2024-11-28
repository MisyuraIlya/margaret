// SalesKeeper component
import React, { FC } from 'react';
import ModalWrapper from '../../ModalWrapper';
import { Box, Typography, Tabs, Tab } from '@mui/material';
import SalesKeeperAverage from './SalesKeeperAverage';
import QuantityKeeper from './QuantityKeeper';

interface SalesKeeperProps {
    active: boolean
    setActive: (value: boolean) => void
}

const SalesKeeper: FC<SalesKeeperProps> = ({ active, setActive }) => {
    const [value, setValue] = React.useState(0); // State to control the active tab

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <ModalWrapper active={active} setActive={setActive} height={'450px'} width={80}>
            <Box>
                <Tabs value={value} onChange={handleTabChange} aria-label="sales tabs">
                    <Tab label="מחזור" />
                    <Tab label="כמויות" />
                </Tabs>
                <Box>
                    {value === 0 && (
                        <SalesKeeperAverage/>
                    )}
                    {value === 1 && (
                        <QuantityKeeper/>
                    )}
                </Box>
            </Box>
        </ModalWrapper>
    );
};

export default SalesKeeper;

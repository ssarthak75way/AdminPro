import React from 'react';
import { Backdrop, CircularProgress } from '@mui/material';

interface LoaderProps {
    open?: boolean;
}

const Loader: React.FC<LoaderProps> = ({ open = true }) => {
    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    );
};

export default Loader;

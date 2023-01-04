import { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Drawer, Fab, Grid, IconButton, Tooltip } from '@mui/material';
import { IconSettings } from '@tabler/icons';

// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';

// project imports
import BorderRadius from './BorderRadius';
import Layout from './Layout';
import PresetColor from './PresetColor';
import FontFamily from './FontFamily';
import InputFilled from './InputFilled';
import BoxContainer from './BoxContainer';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { gridSpacing } from 'store/constant';

// ==============================|| LIVE CUSTOMIZATION ||============================== //

const Customization = () => {
    const theme = useTheme();

    // drawer on/off
    const [open, setOpen] = useState(false);
    const handleToggle = () => {
        setOpen(!open);
    };

    return (
        <>
            {/* toggle button */}
            <Tooltip>
                <Fab
                    component="div"
                    onClick={handleToggle}
                    size="medium"
                    variant="circular"
                    color="secondary"
                    sx={{
                        borderRadius: 0,
                        borderTopLeftRadius: '50%',
                        borderBottomLeftRadius: '50%',
                        borderTopRightRadius: '50%',
                        borderBottomRightRadius: '4px',
                        top: '25%',
                        position: 'fixed',
                        right: 10,
                        zIndex: theme.zIndex.speedDial,
                        boxShadow: theme.customShadows.secondary
                    }}
                >
                    {/* <AnimateButton type="rotate">
                        <IconButton color="inherit" size="large" disableRipple>
                            <IconSettings />
                        </IconButton>
                    </AnimateButton> */}
                </Fab>
            </Tooltip>
        </>
    );
};

export default Customization;

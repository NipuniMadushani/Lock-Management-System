// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Box, Button, Menu, MenuItem, useMediaQuery } from '@mui/material';

// project imports
import LAYOUT_CONST from 'constant';
import useConfig from 'hooks/useConfig';
import LogoSection from '../LogoSection';
import SearchSection from './SearchSection';
import MobileSection from './MobileSection';
import ProfileSection from './ProfileSection';
import LocalizationSection from './LocalizationSection';
import MegaMenuSection from './MegaMenuSection';
import NotificationSection from './NotificationSection';

import { useDispatch, useSelector } from 'store';
import { openDrawer } from 'store/slices/menu';

// assets
import { IconMenu2 } from '@tabler/icons';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { useNavigate } from 'react-router-dom';
import AuthService from 'services/auth.service';
import { useEffect, useState } from 'react';

// const userRoles = currentUser.roles[0];

// ==============================|| MAIN NAVBAR / HEADER ||============================== //

const Header = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState();
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleManageProduct = () => {
        setAnchorEl(null);
        navigate('/e-commerce/product-list', { replace: true });
    };

    const dispatch = useDispatch();
    const { drawerOpen } = useSelector((state) => state.menu);

    const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
    const { layout } = useConfig();

    const [kanbanVisible, setKanbanVisible] = useState(false);
    const [eCommerceVisible, setEcommerceVisible] = useState(false);
    const [adminVisible, setAdminVisible] = useState(false);
    const [engineerVisible, setEnginnerVisible] = useState(false);
    const [prchaseOfficeVisible, setPurchaseOfficeVisible] = useState(false);
    useEffect(() => {
        const currentUser = AuthService.getCurrentUser();
        console.log(currentUser?.roles[0]);
        if (currentUser?.roles[0] === 'ROLE_SUPERVISOR') {
            setKanbanVisible(true);
        } else {
            setKanbanVisible(false);
        }

        if (currentUser?.roles[0] === 'ROLE_CUSTOMER') {
            setEcommerceVisible(true);
        } else {
            setEcommerceVisible(false);
        }

        if (currentUser?.roles[0] === 'ROLE_ADMIN') {
            setAdminVisible(true);
        } else {
            setAdminVisible(false);
        }

        if (currentUser?.roles[0] === 'ROLE_ADMIN_ENGINEERING') {
            setEnginnerVisible(true);
        } else {
            setEnginnerVisible(false);
        }
        if (currentUser?.roles[0] === 'ROLE_ADMIN_PURCHASE_OFFICE') {
            setPurchaseOfficeVisible(true);
        } else {
            setPurchaseOfficeVisible(false);
        }
    }, []);

    const handleClickShowKanBanCard = () => {
        setAnchorEl(null);
        navigate('/app/kanban/Board', { replace: true });
        // setShowPassword(!showPassword);
    };

    const handleClickShowEcommerceDetails = () => {
        setAnchorEl(null);
        navigate('/e-commerce/products', { replace: true });
    };
    const handleManageUserDetails = () => {
        setAnchorEl(null);
        navigate('/user/list/list1', { replace: true });
    };

    return (
        <>
            {/* logo & toggler button */}
            <Box
                sx={{
                    width: 228,
                    display: 'flex',
                    [theme.breakpoints.down('md')]: {
                        width: 'auto'
                    }
                }}
            >
                <Box component="span" sx={{ display: { xs: 'none', md: 'block' }, flexGrow: 1 }}>
                    <LogoSection />
                </Box>

                {layout === LAYOUT_CONST.VERTICAL_LAYOUT || (layout === LAYOUT_CONST.HORIZONTAL_LAYOUT && matchDownMd) ? (
                    <Avatar
                        variant="rounded"
                        sx={{
                            ...theme.typography.commonAvatar,
                            ...theme.typography.mediumAvatar,
                            overflow: 'hidden',
                            transition: 'all .2s ease-in-out',
                            background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.secondary.light,
                            color: theme.palette.mode === 'dark' ? theme.palette.secondary.main : theme.palette.secondary.dark,
                            '&:hover': {
                                background: theme.palette.mode === 'dark' ? theme.palette.secondary.main : theme.palette.secondary.dark,
                                color: theme.palette.mode === 'dark' ? theme.palette.secondary.light : theme.palette.secondary.light
                            }
                        }}
                        onClick={() => dispatch(openDrawer(!drawerOpen))}
                        color="inherit"
                    >
                        <IconMenu2 stroke={1.5} size="20px" />
                    </Avatar>
                ) : null}
            </Box>

            {/* header search */}
            <SearchSection />
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ flexGrow: 1 }} />

            {/* mega-menu */}
            <Box>
                {/* <MegaMenuSection /> */}
                <Box>
                    {kanbanVisible && (
                        <Box>
                            <Button
                                id="demo-positioned-button"
                                aria-controls={open ? 'demo-positioned-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                            >
                                Supervisor
                            </Button>
                            <Menu
                                id="demo-positioned-menu"
                                aria-labelledby="demo-positioned-button"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left'
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left'
                                }}
                            >
                                <MenuItem onClick={handleClickShowKanBanCard}>Manage Kanban </MenuItem>
                                {/* <MenuItem onClick={handleClose}>View Income Report</MenuItem>
                         <MenuItem onClick={handleClose}>Manage User </MenuItem> */}
                            </Menu>
                        </Box>
                    )}
                </Box>
            </Box>

            <Box>
                {/* <MegaMenuSection /> */}
                <Box>
                    {eCommerceVisible && (
                        <Box>
                            <Button
                                id="demo-positioned-button"
                                aria-controls={open ? 'demo-positioned-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                            >
                                Customer
                            </Button>
                            <Menu
                                id="demo-positioned-menu"
                                aria-labelledby="demo-positioned-button"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left'
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left'
                                }}
                            >
                                <MenuItem onClick={handleClickShowEcommerceDetails}> LockHood Products</MenuItem>
                                {/* <MenuItem onClick={handleClose}>View Income Report</MenuItem>
                             <MenuItem onClick={handleClose}>Manage User </MenuItem> */}
                            </Menu>
                        </Box>
                    )}
                </Box>
            </Box>
            {adminVisible && (
                <Box>
                    <Button
                        id="demo-positioned-button"
                        aria-controls={open ? 'demo-positioned-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                        Admin
                    </Button>
                    <Menu
                        id="demo-positioned-menu"
                        aria-labelledby="demo-positioned-button"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'left'
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left'
                        }}
                    >
                        <MenuItem onClick={handleManageProduct}>Manage Product </MenuItem>
                        <MenuItem onClick={handleClose}>View Income Report</MenuItem>
                        <MenuItem onClick={handleManageUserDetails}>Manage User </MenuItem>
                    </Menu>
                </Box>
            )}

            {engineerVisible && (
                <Box>
                    <Button
                        id="demo-positioned-button"
                        aria-controls={open ? 'demo-positioned-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                        Admin -Enginnering Department
                    </Button>
                    <Menu
                        id="demo-positioned-menu"
                        aria-labelledby="demo-positioned-button"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'left'
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left'
                        }}
                    >
                        <MenuItem onClick={handleManageProduct}>View KanBan Card Details </MenuItem>
                        {/* <MenuItem onClick={handleClose}>View Income Report</MenuItem>
                        <MenuItem onClick={handleClose}>Manage User </MenuItem> */}
                    </Menu>
                </Box>
            )}
            {prchaseOfficeVisible && (
                <Box>
                    <Button
                        id="demo-positioned-button"
                        aria-controls={open ? 'demo-positioned-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                        Admin -Purchase Office
                    </Button>
                    <Menu
                        id="demo-positioned-menu"
                        aria-labelledby="demo-positioned-button"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'left'
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left'
                        }}
                    >
                        <MenuItem onClick={handleManageProduct}>View KanBan Card Details </MenuItem>
                        {/* <MenuItem onClick={handleClose}>View Income Report</MenuItem>
                        <MenuItem onClick={handleClose}>Manage User </MenuItem> */}
                    </Menu>
                </Box>
            )}
            {/* live customization & localization */}
            {/* <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                <LocalizationSection />
            </Box> */}

            {/* notification & profile */}
            <NotificationSection />
            <ProfileSection />

            {/* mobile header */}
            <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                <MobileSection />
            </Box>
        </>
    );
};

export default Header;

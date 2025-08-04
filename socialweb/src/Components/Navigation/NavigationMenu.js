import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export const getNavigationMenu = (userId) => [
    {
        title: "Main",
        icon: <HomeIcon />,
        path: "/home",
    },
    {
        title: "Account Info",
        icon: <AccountCircleIcon />,
        path: `/profile/${userId}`,
    },
];

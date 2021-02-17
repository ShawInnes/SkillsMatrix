import React from 'react';
import './_Header.scss';
import {Link as RouterLink} from "react-router-dom";
import Button from '../Button/Button';
import {AppBar, makeStyles, createStyles, IconButton, Theme, Toolbar, Typography} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

export interface HeaderProps {
    user?: string;
    onLogin: () => void;
    onLogout: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
    }),
);

export const Header: React.FC<HeaderProps> = ({user, onLogin, onLogout}) => {
    const classes = useStyles();

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    <MenuIcon/>
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                    Skills Matrix
                </Typography>
                {user ? (
                    <>
                        <Button onClick={onLogout}>
                            Log Out
                        </Button>
                    </>
                ) : (
                    <>
                        <Button onClick={onLogin}>
                            Log In
                        </Button>
                    </>
                )}
            </Toolbar>
        </AppBar>
        // <header>
        //     <div className="wrapper">
        //         <div>
        //             <h1>Skills Matrix</h1>
        //         </div>
        //         <div>
        //             <RouterLink to="/">
        //                 <Button>Home</Button>
        //             </RouterLink>
        //             {user ? (
        //                 <>
        //                     <RouterLink to="/about">
        //                         <Button>About</Button>
        //                     </RouterLink>
        //                     <RouterLink to="/users">
        //                         <Button>Users</Button>
        //                     </RouterLink>
        //                 </>
        //             ) : (<></>)}
        //         </div>
        //         <div>
        //
        //         </div>
        //     </div>
        // </header>
    );
}

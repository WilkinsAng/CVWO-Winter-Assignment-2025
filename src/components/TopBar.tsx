import React, {useState} from 'react';
import theme from '../styles/theme';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {ThemeProvider} from "@mui/material/styles";
import Link from "@mui/material/Link";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

interface TopBarProps {
    isAuthenticated: boolean;
    setIsAuthenticated:  React.Dispatch<React.SetStateAction<boolean>>
    username: string | null;
    setUsername:  React.Dispatch<React.SetStateAction<string | null>>;
}
const TopBar: React.FC<TopBarProps> = ({isAuthenticated, setIsAuthenticated, username, setUsername}) => {
    const [open, setOpen] = useState(false);
    const [isLogin, setIsLogin] = useState(true);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    console.log(isAuthenticated);

    return (
        <Box className="TopBar" sx={{ flexGrow: 1 }}>
            <ThemeProvider theme={theme}>
                <AppBar position="static" color="primary">
                    <Toolbar disableGutters>
                        <Link href="/" underline="none" variant="h4" color="inherit">
                            Gossip
                        </Link>
                        {isAuthenticated ?
                            <>
                                <Typography>{username}</Typography>
                                <Button color="inherit" onClick={() => setIsAuthenticated(false)}>Logout</Button>
                            </> :
                            <Button color="inherit" onClick={handleOpen}>Login</Button>}
                    </Toolbar>
                </AppBar>
            </ThemeProvider>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{isLogin ? "Login" : "Signup"}</DialogTitle>
                <DialogContent>
                    {isLogin ? (
                        <LoginForm handleClose={handleClose} setIsAuthenticated={setIsAuthenticated} setUsername={setUsername} onSwitch={() => setIsLogin(false)}/>
                    ) : (
                        <SignupForm handleClose={handleClose} setIsAuthenticated={setIsAuthenticated} setUsername={setUsername} onSwitch={() => setIsLogin(true)}/>
                    )}
                </DialogContent>
            </Dialog>
        </Box>
    );
}

export default TopBar;
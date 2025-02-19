import React, {useState} from 'react';
import theme from '../styles/theme';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {ThemeProvider} from "@mui/material/styles";
import Link from "@mui/material/Link";
import {Link as RouterLink} from "react-router-dom"
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import LoginForm from "./Auth/LoginForm";
import SignupForm from "./Auth/SignupForm";

interface TopBarProps {
    isAuthenticated: boolean;
    setIsAuthenticated:  React.Dispatch<React.SetStateAction<boolean>>
    username: string | null;
    setUsername:  React.Dispatch<React.SetStateAction<string | null>>;
}

// Top Menu Bar component for the forum
const TopBar= ({isAuthenticated, setIsAuthenticated, username, setUsername}: TopBarProps) => {
    const [open, setOpen] = useState(false);
    const [isLogin, setIsLogin] = useState(true);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleLogout = () => {
        localStorage.removeItem("username");
        localStorage.removeItem("userID");
        setIsAuthenticated(false);
        setUsername(null);
    }

    return (
        <Box className="TopBar">
            <ThemeProvider theme={theme}>
                <AppBar position="static" color="primary">
                    <Toolbar disableGutters>
                        <Link
                            component={RouterLink}
                            to="/"
                            underline="hover"
                            variant="h5"
                            color="inherit"
                            sx={{fontWeight: "bold", margin: "0 16px" }}
                        >
                            BinaryBuilders
                        </Link>

                        {/* Spacer to push the next elements to the right */}
                        <Box sx={{ flexGrow: 1 }} />

                        {isAuthenticated ?
                            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                <Typography sx={{ fontWeight: "bold", textTransform: "capitalize" }}>
                                    Welcome, {username}
                                </Typography>

                                <Button color="inherit"
                                        component={RouterLink}
                                        to="/my-threads"
                                        sx={{
                                            textTransform: "none"
                                        }}>
                                    My Threads
                                </Button>
                                <Button color="inherit"
                                        component={RouterLink}
                                        to="/my-comments"
                                        sx={{
                                            textTransform: "none"
                                        }}>
                                    My Comments
                                </Button>

                                <Button
                                    color="inherit"
                                    onClick={handleLogout}
                                    sx={{ textTransform: "none" }}
                                >
                                    Logout
                                </Button>
                            </Box>
                            :
                            <Button
                                color="inherit"
                                onClick={handleOpen}
                                sx={{ textTransform: "none" }}>
                                Login
                            </Button>
                        }
                    </Toolbar>
                </AppBar>
            </ThemeProvider>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{isLogin ? "Login" : "Signup"}</DialogTitle>
                <DialogContent>
                    {isLogin ? (
                        <LoginForm
                            handleClose={handleClose}
                            setIsAuthenticated={setIsAuthenticated}
                            setUsername={setUsername}
                            onSwitch={() => setIsLogin(false)}
                        />
                    ) : (
                        <SignupForm
                            handleClose={handleClose}
                            setIsAuthenticated={setIsAuthenticated}
                            setUsername={setUsername}
                            onSwitch={() => setIsLogin(true)}
                        />
                    )}
                </DialogContent>
            </Dialog>
        </Box>
    );
}

export default TopBar;
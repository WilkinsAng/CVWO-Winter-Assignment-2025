import React, {useState} from "react";
import axios, {isAxiosError} from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

interface LoginFormProps {
    handleClose: () => void,
    setIsAuthenticated:  React.Dispatch<React.SetStateAction<boolean>>
    setUsername:  React.Dispatch<React.SetStateAction<string | null>>
    onSwitch:  () => void
}
const LoginForm: React.FC<LoginFormProps> = ({handleClose, setIsAuthenticated, setUsername, onSwitch}) => {

    /**
     * State used to sign in
     */
    const [localUsername, setLocalUsername] = useState("");
    const [message, setMessage] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/login`, {
                username: localUsername
            });
            const {user_id, username} = response.data.user;
            localStorage.setItem("userID", user_id);
            localStorage.setItem("username", username);
            setIsAuthenticated(true);
            setUsername(username);
            setMessage("Login Successful!");
            handleClose();
        } catch (err: unknown){
            if (isAxiosError(err)) {
                setMessage(err.response?.data?.error);
            } else {
                setMessage("An unexpected error has occurred...");
            }
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <TextField fullWidth
                       label="Username"
                       value={localUsername}
                       onChange={(e) => setLocalUsername(e.target.value)}
                       required
                       margin={"normal"}/>
            <Button type="submit" variant="contained" fullWidth>
                Login
            </Button>
            <p>{message}</p>
            <Typography>
                Don't have an account?
            </Typography>
            <Typography onClick={onSwitch}
                         variant="body2"
                         sx={{
                             cursor: "pointer",
                             color: "primary.main",
                             "&:hover": { textDecoration: "underline" },
                         }}>
                Sign up
            </Typography>
        </form>
    );
}

export default LoginForm;
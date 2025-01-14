import {useState} from 'react';
import Box from '@mui/material/Box';
import './App.css';
import TopBar from "./components/TopBar.tsx";

function App() {
    /**
     * State used for username display
     *
     * ! might put this on the main app component then pass it down
     */
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [username, setUsername] = useState<string | null>(null);

    const handleLogin = (user: string) => {
        setUsername(user);
        setIsAuthenticated(true);
    }

    const handleLogout = () => {
        setIsAuthenticated(false);
        setUsername(null);
    }
    return (
        <Box className="Main">
        <TopBar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} username={username}  setUsername={setUsername} />

    </Box>
);
}

export default App;

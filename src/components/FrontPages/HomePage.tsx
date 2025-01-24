import React, {useEffect, useState} from "react";
import axios from "axios";
import Threads from "../../models/threads"
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThreadDetailsPage from "./ThreadDetailsPage";
import {mockThreads} from "../../mock/mockThreads";

const HomePage: React.FC = () => {
    const [threads, setThreads] = useState<Threads[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [threadOpen, setThreadOpen] = useState(false);
    const [selectedThread, setSelectedThread] = useState<Threads | null>(null)

    const userID =
    useEffect(() => {
        setLoading(true);
        axios.get("http://localhost:8080/threads")
            .then(res => {
                setThreads(res.data.threads);
                setLoading(false);
            })
            .catch(err => {
                setError(err.response?.data?.error);
                setLoading(false);
            })
    }, [])

    const handleThreadOpen = (thread: Threads) => {
        setThreadOpen(true);
        setSelectedThread(thread);
    }

    const handleThreadClose = () => {
        setSelectedThread(null);
        setThreadOpen(false);
    }

    const handleLike = (id: number)  => {
        // axios.patch(`http://localhost:8080/threads/${id}/like`)
        //     .then(() => {
                setThreads((prevThreads) => {
                    return prevThreads.map((thread) => {
                        return thread.id === id ? {...thread, likes: thread.likes + 1} : thread
                    });
                })
            // }).catch((err) => alert(err.error))
    }

    const handleDislike = (id: number)  => {
        // axios.patch(`http://localhost:8080/threads/${id}/dislike`)
        //     .then(() => {
                setThreads((prevThreads) => {
                    return prevThreads.map((thread) => {
                        return thread.id === id ? {...thread, dislikes: thread.dislikes + 1} : thread
                    });
                })
           // }).catch((err) => alert(err.error))
    }

    if (loading) {
        return(
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                <CircularProgress/>
            </Box>
        )
    }
    if (error) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                <Alert severity="error">{error}</Alert>
            </Box>
        )
    }
    return (
        <Box sx={{padding : 4}}>
            <Typography variant="h4" gutterBottom>
                Threads
            </Typography>
            {threads.map((thread: Threads) => (
                <Card key={thread.id}
                      sx={{ marginBottom: 2, cursor: "pointer", "&:hover": {boxShadow: 6}}}
                      onClick={() => handleThreadOpen(thread)}>
                    <CardContent>
                        <Typography variant="h5">{thread.title}</Typography>
                        <Typography variant="body2" color="text.secondary">
                            {thread.content}
                        </Typography>
                        <Typography variant="body2" sx={{ mt: 1 }}>
                            Likes: {thread.likes} | Dislikes: {thread.dislikes}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <IconButton
                            size="small"
                            color="primary"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleLike(thread.id);
                            }}>
                            <ThumbUpIcon/>
                        </IconButton>
                        <IconButton
                            size="small"
                            color="secondary"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleDislike(thread.id)
                            }}
                        >
                            <ThumbDownIcon/>
                        </IconButton>
                    </CardActions>
                </Card>
            ))}
            <ThreadDetailsPage threadOpen={threadOpen} handleCloseDialog={handleThreadClose} selectedThread={selectedThread}/>
        </Box>
    );
}

export default HomePage;
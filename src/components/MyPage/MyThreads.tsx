import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Threads from "../../models/threads";
import axios from "axios";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Card from "@mui/material/Card";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import ThreadDetailsPage from "../FrontPages/ThreadDetailsPage";
import UpdateThreadForm from "./UpdateThreadForm";

const MyThreadsPage = () => {
    const [threads, setThreads] = useState<Threads[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [updateOpen, setUpdateOpen] = useState(false);
    const [threadOpen, setThreadOpen] = useState(false);
    const [selectedThread, setSelectedThread] = useState<Threads | null>(null)

    const handleThreadOpen = (thread: Threads) => {
        setThreadOpen(true);
        setSelectedThread(thread);
    }

    const handleThreadClose = () => {
        setSelectedThread(null);
        setThreadOpen(false);
    }

    const handleUpdateThreadOpen = (thread: Threads) => {
        setUpdateOpen(true);
        setSelectedThread(thread);
    }
    const handleUpdateThreadClose= () => {
        setUpdateOpen(false);
        setSelectedThread(null)
    }

    const onUpdateSuccess = (updatedThread: Threads) => {
        setThreads((prevThreads) =>
            prevThreads.map((thread) =>
                thread.id === updatedThread.id ? updatedThread : thread
            )
        );
    }

    let userID = localStorage.getItem("userID");
    useEffect(() => {
        if (userID == null) {
            setThreads([]);
            return
        }
        axios.get(`http://localhost:8080/users/${userID}/threads`)
            .then((res) => {
                setThreads(res.data.threads);
            })
            .catch((error) => {
                setError(error.response?.data?.error);
                console.error("Error fetching threads:", error)
            });
    }, [userID]);

    console.log(threads);
    const handleDeleteThread = (threadId: number) => {
        axios.delete(`http://localhost:8080/threads/${threadId}`)
            .then(() => setThreads(threads.filter((thread) => thread.id !== threadId)))
            .catch((error) => console.error("Error deleting thread:", error));
    };

    if (error) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                <Alert severity="error">{error}</Alert>
            </Box>
        );
    }

    return (
        <Box sx={{ padding: 4 }}>
            <Typography variant="h4" sx={{ mb: 3 }}>
                My Threads
            </Typography>
            {threads.length === 0 ? (
                <Alert severity="info">No threads found. Start creating some!</Alert>
            ) : (
                threads.map((thread) => (
                    <Card
                        key={thread.id}
                        sx={{
                            marginBottom: 2,
                            cursor: "pointer",
                            "&:hover": { boxShadow: 6 },
                        }}
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
                                    handleUpdateThreadOpen(thread);
                                }}
                            >
                                <EditIcon />
                            </IconButton>
                            <IconButton
                                size="small"
                                color="error"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteThread(thread.id);
                                }}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </CardActions>
                    </Card>
                ))
            )}
            <ThreadDetailsPage threadOpen={threadOpen} handleCloseDialog={handleThreadClose} selectedThread={selectedThread}/>
            <UpdateThreadForm updateOpen={updateOpen} handleUpdateThreadClose={handleUpdateThreadClose} selectedThread={selectedThread} onUpdateSuccess={onUpdateSuccess}/>
        </Box>
    );
};

export default MyThreadsPage;

import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Card from "@mui/material/Card";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import ThreadDetailsPage from "../FrontPages/ThreadDetailsPage";
import Comments from "../../models/comments";
import UpdateCommentForm from "./UpdateCommentForm";
import Threads from "../../models/threads";
import Categories from "../../models/categories";

const MyCommentsPage: React.FC = () => {
    const [comments, setComments] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [updateOpen, setUpdateOpen] = useState(false);
    const [threadOpen, setThreadOpen] = useState(false);
    const [selectedComment, setSelectedComment] = useState<Comments | null>(null);
    const [selectedThread, setSelectedThread] = useState<Threads| null>(null);
    const [categories, setCategories] = useState<Categories[]>([]);
    const [catError, setCatError] = useState<string | null>(null);

    // Fetch categories when component loads
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/categories`)
            .then((res) => {
                setCategories(res.data.categories);
                setCatError(null);
            })
            .catch((err) => {
                console.error("Error fetching categories:", err);
                setCatError(err);
            });
    }, []);

    const userID = localStorage.getItem("userID");
    // Fetch comments for the logged-in user
    useEffect(() => {
        if (!userID) {
            setComments([]);
            return;
        }

        axios
            .get(`${process.env.REACT_APP_API_URL}/users/${userID}/comments`) // Replace with your API endpoint for fetching comments
            .then((res) => {
                setComments(res.data.comments || []);
            })
            .catch((error) => {
                setError(error.response?.data?.error || "Failed to fetch comments.");
                console.error("Error fetching comments:", error);
            });
    }, [userID]);

    // Handle comment deletion
    const handleDeleteComment = (commentId: number) => {
        axios
            .delete(`${process.env.REACT_APP_API_URL}/comments/${commentId}`, {
                headers: {
                    "userID": userID,
                    "Content-Type": "application/json"
                }})
            .then(() => {
                setComments((prevComments) => prevComments.filter((comment) => comment.id !== commentId));
            })
            .catch((error) => console.error("Error deleting comment:", error));
    };

    // Handle comment update success
    const onUpdateSuccess = (updatedComment: Comments) => {
        setComments((prevComments) =>
            prevComments.map((comment) =>
                comment.id === updatedComment.id ? updatedComment : comment
            )
        );
        setUpdateOpen(false);
        setSelectedComment(null);
    };


    // Handle opening thread dialog
    const handleViewThread = async (threadId: number) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/threads/${threadId}`);
            setSelectedThread(response.data.thread);
            setThreadOpen(true);
        } catch (error) {
            console.error("Error fetching thread details:", error);
        }
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
                My Comments
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
                Here is what you have contributed so far!
            </Typography>
            {comments.length === 0 ? (
                <Alert severity="info">No comments found. Start contributing to discussions!</Alert>
            ) : (
                comments.map((comment: Comments) => (
                    <Card
                        key={comment.id}
                        sx={{
                            marginBottom: 2,
                            "&:hover": { boxShadow: 6 },
                        }}
                    >
                        <CardContent>
                            <Typography variant="h6">Comment on Thread no: {comment.thread_id}</Typography>
                            <Typography variant="subtitle2" color="text.secondary">
                                {new Date(comment.created_at).toLocaleDateString()}
                            </Typography>
                            <Typography variant="body1">
                                {comment.content}
                            </Typography>
                            <Typography variant="body2" sx={{ mt: 1 }}>
                                Likes: {comment.likes} | Dislikes: {comment.dislikes}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button
                                size="medium"
                                color="primary"
                                onClick={() => handleViewThread(comment.thread_id)}
                            >
                                View Thread
                            </Button>
                            <IconButton
                                size="medium"
                                color="primary"
                                onClick={() => {
                                    setUpdateOpen(true);
                                    setSelectedComment(comment);
                                }}
                            >
                                <EditIcon />
                            </IconButton>
                            <IconButton
                                size="small"
                                color="error"
                                onClick={() => handleDeleteComment(comment.id)}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </CardActions>
                    </Card>
                ))
            )}
            <ThreadDetailsPage
                threadOpen={threadOpen}
                handleCloseDialog={() => setThreadOpen(false)}
                selectedThread={selectedThread}
                categories={categories}
            />
            <UpdateCommentForm
                updateOpen={updateOpen}
                handleUpdateCommentClose={() => setUpdateOpen(false)}
                selectedComment={selectedComment}
                onUpdateSuccess={onUpdateSuccess}
            />
        </Box>
    );
};

export default MyCommentsPage;

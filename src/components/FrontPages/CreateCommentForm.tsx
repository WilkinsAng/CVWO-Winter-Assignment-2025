import React, {useState} from "react";
import Box from "@mui/material/Box";
import Threads from "../../models/threads";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import axios from "axios";
import Comments from "../../models/comments";

interface CreateCommentProps {
    selectedThread: Threads | null,
    onCreateComment: (comment: Comments) => void
}
const CreateCommentForm: React.FC<CreateCommentProps> = ({selectedThread, onCreateComment}) => {

    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false); // Loading state
    const [error, setError] = useState<string | null>(null); // Error state


    const handleCreateComment = () =>{
        if (selectedThread !== null) {
            if (content.trim() === "") {
                setError("Comment cannot be empty.");
                return;
            }

            setLoading(true);
            setError(null);

            const userID = localStorage.getItem("userID");

            axios.post(`${process.env.REACT_APP_API_URL}/threads/${selectedThread.id}/comments`, {
                content
            }, {
                headers: {
                    "userID": userID,
                    "Content-Type": "application/json"
                }
            }).then((res) => {
                onCreateComment(res.data.comment);
                setContent("");
            }).catch((err) => {
                setError(err.response?.data?.error || "Failed to create comment.");
            }).finally(() => {
                setLoading(false);
            })
        }
    }
    return (
        <Box>
            {error && (
                <Alert severity="error" onClose={() => setError(null)}>
                    {error}
                </Alert>
            )}
            <TextField
                fullWidth
                placeholder="Type your comment here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                multiline
                rows={2}
            />
            <Button
                variant="contained"
                color="primary"
                onClick={handleCreateComment}
                disabled={loading}
                fullWidth
                sx={{marginTop: 1}}
            >
                {loading ? <CircularProgress size={24} /> : "Post Comment"}
            </Button>
        </Box>)
}

export default CreateCommentForm;
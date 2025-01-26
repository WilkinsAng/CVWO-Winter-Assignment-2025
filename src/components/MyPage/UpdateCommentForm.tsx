import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import axios from "axios";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { DialogActions } from "@mui/material";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Comments from "../../models/comments";

interface UpdateCommentFormProps {
    updateOpen: boolean;
    handleUpdateCommentClose: () => void;
    selectedComment: Comments | null; // Comment details
    onUpdateSuccess: (updatedComment: Comments) => void; // Callback for successful update
}

const UpdateCommentForm: React.FC<UpdateCommentFormProps> = ({
                                                                 updateOpen,
                                                                 handleUpdateCommentClose,
                                                                 selectedComment,
                                                                 onUpdateSuccess,
                                                             }) => {
    const [content, setContent] = useState<string>(selectedComment?.content || ""); // Prefill the content
    const [error, setError] = useState<string | null>(null);

    const userID = localStorage.getItem("userID")
    // Reset form values when the selectedComment changes
    useEffect(() => {
        if (selectedComment) {
            setContent(selectedComment.content);
        }
    }, [selectedComment]);

    const handleUpdateComment = async () => {
        if (!selectedComment) return;

        try {
            const response = await axios.patch(
                `${process.env.REACT_APP_API_URL}/comments/${selectedComment.id}`,
                { content } ,
                {
                    headers: {
                        "userID": userID,
                        "Content-Type": "application/json"
                    }}
            );
            onUpdateSuccess(response.data.comment); // Notify parent of the update
            handleUpdateCommentClose(); // Close the dialog
        } catch (err) {
            setError("Failed to update comment. Please try again.");
            console.error("Error updating comment:", err);
        }
    };

    return (
        <Dialog open={updateOpen} onClose={handleUpdateCommentClose} fullWidth>
            <DialogTitle variant="h5" fontWeight="bolder">
                Update Comment
            </DialogTitle>
            <DialogContent>
                <Box sx={{ mt: 2 }}>
                    You can edit your comment here!
                    <TextField
                        fullWidth
                        label="Comment Content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        margin="normal"
                        multiline
                        rows={4}
                        required
                    />
                </Box>
                {error && (
                    <Alert severity="error" sx={{ mt: 2 }}>
                        {error}
                    </Alert>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleUpdateCommentClose} color="secondary">
                    Cancel
                </Button>
                <Button onClick={handleUpdateComment} variant="contained" color="primary">
                    Update
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default UpdateCommentForm;

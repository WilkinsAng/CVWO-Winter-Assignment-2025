import React, {useEffect, useState} from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Threads from "../../models/threads";
import Comments from "../../models/comments";
import {mockComments} from "../../mock/mockComments";
import CommentDetailsPage from "./CommentDetailsPage";

interface ThreadDetailsPageProps {
    threadOpen: boolean,
    handleCloseDialog: () => void,
    selectedThread: Threads | null
}
const ThreadDetailsPage: React.FC<ThreadDetailsPageProps> = ({threadOpen, handleCloseDialog, selectedThread}) => {

    const [comments, setComments] = useState<Comments[]>([]);

    useEffect(() => {
        setComments(mockComments);
    }, [selectedThread])

    return (
        <Dialog
            open={threadOpen}
            onClose={handleCloseDialog}
            fullWidth
            maxWidth="md"
            scroll="body">
            <IconButton
                sx={{justifyContent: "end", marginLeft: "auto"}}
                onClick={handleCloseDialog}>
                <CloseIcon />
            </IconButton>
            <DialogTitle id="thread-title" sx={{fontWeight: 'bold'}}>{selectedThread?.title}</DialogTitle>
            <DialogContent dividers>
                <Typography variant="body1" sx={{ mb: 2 }}>
                    {selectedThread?.content}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Likes: {selectedThread?.likes} | Dislikes: {selectedThread?.dislikes}
                </Typography>
            </DialogContent>
            <DialogContent>
                <Typography variant="h6" sx={{ mt: 2 }}>
                    Comments
                </Typography>
                <Box sx={{
                        maxHeight: 400,
                        overflowY: "auto",
                        borderTop: "1px solid #ccc",
                        mt: 2,
                        pt: 2,
                    }}>
                    {comments.length > 0 ?
                        comments.map((comment: Comments) => (
                            <CommentDetailsPage key={comment.id} comment={comment}/>
                        )) :
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                            No comments yet.
                        </Typography>
                    }
                </Box>
            </DialogContent>
        </Dialog>
    )
}

export default ThreadDetailsPage;
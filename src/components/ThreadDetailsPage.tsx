import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Threads from "../models/threads";

interface ThreadDetailsPageProps {
    threadOpen: boolean,
    handleCloseDialog: () => void,
    selectedThread: Threads | null
}
const ThreadDetailsPage: React.FC<ThreadDetailsPageProps> = ({threadOpen, handleCloseDialog, selectedThread}) => {
    return (
        <Dialog open={threadOpen} onClose={handleCloseDialog} fullWidth maxWidth="md">
            <IconButton sx={{justifyContent: "flex-end", marginLeft: "auto"}}>
                <CloseIcon onClick={handleCloseDialog}/>
            </IconButton>
            <DialogTitle>{selectedThread?.title}</DialogTitle>
            <DialogContent>
                <Typography variant="body1" sx={{ mb: 2 }}>
                    {selectedThread?.content}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Likes: {selectedThread?.likes} | Dislikes: {selectedThread?.dislikes}
                </Typography>
                <Typography variant="h6" sx={{ mt: 2 }}>
                    Comments
                </Typography>
                <Box>
                    {/* Placeholder for comments */}
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        No comments yet.
                    </Typography>
                </Box>
            </DialogContent>
        </Dialog>
    )
}

export default ThreadDetailsPage;
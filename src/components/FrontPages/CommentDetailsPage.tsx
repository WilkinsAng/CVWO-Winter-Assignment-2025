import React from "react";
import Comments from "../../models/comments";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

interface CommentsDetailsPageProps {
    comment: Comments;
}
const CommentDetailsPage: React.FC<CommentsDetailsPageProps> = ({comment}) => {
    return (
        <Box sx={{ marginBottom: 2 }}>
            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: "bold" }}>
                {comment.username} • {new Date(comment.created_at).toLocaleDateString()}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                {comment.content}
            </Typography>
        </Box>
    );
}

export default CommentDetailsPage;



import React from "react";
import Comments from "../../models/comments";
import Typography from "@mui/material/Typography";

interface CommentsDetailsPageProps {
    comment: Comments;
}
const CommentDetailsPage: React.FC<CommentsDetailsPageProps> = ({comment}) => {
    return (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {comment.content}
        </Typography>
    );
}

export default CommentDetailsPage;



import React from "react";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import Card from "@mui/material/Card";
import Threads from "../../models/threads";
import Box from "@mui/material/Box";
import Categories from "../../models/categories";

interface ThreadCardProps {
    thread: Threads;
    handleThreadOpen: (thread: Threads) => void;
    handleLike: (id: number) => void;
    handleDislike: (id: number) => void;
    categories: Categories[];
}
const ThreadCard: React.FC<ThreadCardProps> = ({thread, handleThreadOpen, handleLike, handleDislike, categories}) => {

    return (
        <Card key={thread.id}
              sx={{
                  marginBottom: 2,
                  cursor: "pointer",
                  "&:hover": {boxShadow: 6}
              }}
              onClick={() => handleThreadOpen(thread)}>
            <CardContent>
                {/* User Info, Date, and Category */}
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                        <strong>{thread.username}</strong> • {new Date(thread.created_at).toLocaleDateString()} • {categories.find(cat => cat.id === thread.category_id)?.name || "Unknown"}
                    </Typography>
                </Box>

                {/*Title*/}
                <Typography variant="h6" gutterBottom>
                    {thread.title}
                </Typography>

                {/* Truncated Content */}
                <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 2,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                    }}
                >
                    {thread.content}
                </Typography>
            </CardContent>

            <CardActions>
                <IconButton
                    size="small"
                    color="secondary"
                    onClick={(e) => {
                        e.stopPropagation();
                        handleLike(thread.id);
                    }}>
                    <ThumbUpIcon/>
                    <Typography variant="caption" sx={{ ml: 0.5 }}>
                        {thread.likes}
                    </Typography>
                </IconButton>
                <IconButton
                    size="small"
                    color="error"
                    onClick={(e) => {
                        e.stopPropagation();
                        handleDislike(thread.id)
                    }}>
                    <ThumbDownIcon/>
                    <Typography variant="caption" sx={{ ml: 0.5 }}>
                        {thread.dislikes}
                    </Typography>
                </IconButton>
            </CardActions>
        </Card>
    )
}

export default ThreadCard;
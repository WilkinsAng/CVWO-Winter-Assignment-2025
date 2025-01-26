import React from "react";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Card from "@mui/material/Card";
import Threads from "../../models/threads";
import Box from "@mui/material/Box";
import Categories from "../../models/categories";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface MyThreadCardProps {
    thread: Threads;
    handleThreadOpen: (thread: Threads) => void;
    handleUpdateThreadOpen: (thread: Threads) => void;
    handleDeleteThread: (id: number) => void;
    categories: Categories[];
}
const MyThreadCard: React.FC<MyThreadCardProps> = ({thread, handleThreadOpen, handleUpdateThreadOpen, handleDeleteThread, categories}) => {

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
                    size="medium"
                    color="primary"
                    onClick={(e: React.MouseEvent) => {
                        e.stopPropagation();
                        handleUpdateThreadOpen(thread);
                    }}
                >
                    <EditIcon />
                </IconButton>
                <IconButton
                    size="medium"
                    color="error"
                    onClick={(e: React.MouseEvent) => {
                        e.stopPropagation();
                        handleDeleteThread(thread.id);
                    }}
                >
                    <DeleteIcon />
                </IconButton>
            </CardActions>
        </Card>
    )
}

export default MyThreadCard;
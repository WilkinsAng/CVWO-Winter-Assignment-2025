interface Comments{
    id: number;
    content: string;
    userId: number;
    username: string;
    thread_id: number;
    created_at: string;
    likes: number;
    dislikes: number;
}

export default Comments;
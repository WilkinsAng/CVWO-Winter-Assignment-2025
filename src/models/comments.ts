interface Comments{
    id: number;
    content: string;
    userId: number;
    thread_id: number;
    createdAt: string;
    likes: number;
    dislikes: number;
}

export default Comments;
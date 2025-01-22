interface Comments{
    id: number;
    content: string;
    userId: number;
    threadId: number;
    createdAt: string;
    likes: number;
    dislikes: number;
}

export default Comments;
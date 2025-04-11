export interface IComment {
    commentId: string;
    queryId: string;
    userId: string; // ID of the user who made the comment
    comment: string; 
    createdAt?: Date; 
}
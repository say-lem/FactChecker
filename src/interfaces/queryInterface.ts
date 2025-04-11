
export interface IQuery {
  userId: string;
  text: string;
  verdictFromApi?: any[]; 
  createdAt?: Date;
  upvotes?: number;
  downvotes?: number;
}
  
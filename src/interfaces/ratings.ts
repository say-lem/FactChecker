
export interface IRating {
    queryId: string;
    userId: string;
    vote: 'up' | 'down'; 
    createdAt?: Date;
  }
  
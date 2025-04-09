
export interface IQuery {
    userId: string;
    text: string;
    resultFromAPI?: string; // result from Google Fact Check
    createdAt?: Date;
  }
  
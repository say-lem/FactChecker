export interface ClaimReview {
    textualRating: string;
  }
  
  export interface Claim {
    text: string;
    claimReview: ClaimReview[];
  }
  
  export interface FactCheckResponse {
    claims?: Claim[];
  }
  
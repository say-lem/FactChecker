import axios from 'axios';
import { Claim, FactCheckResponse } from '../interfaces/factCheckInterface';

type Verdict = 'positive' | 'negative' | 'neutral' | 'unverified';

function getSentimentFromTextualRating(text: string): Verdict {
  const lowerText = text.toLowerCase();

  const positiveKeywords = ['true', 'accurate', 'correct'];
  const negativeKeywords = ['false', 'inaccurate', 'incorrect', 'misleading', 'fake', 'enganyós', 'engañoso'];
  const unverifiedKeywords = ['unverified', 'no evidence', 'not verified'];
  const neutralKeywords = ['partly true', 'mixture', 'half true', 'partially accurate'];

  if (positiveKeywords.some(k => lowerText.includes(k))) return 'positive';
  if (negativeKeywords.some(k => lowerText.includes(k))) return 'negative';
  if (unverifiedKeywords.some(k => lowerText.includes(k))) return 'unverified';
  if (neutralKeywords.some(k => lowerText.includes(k))) return 'neutral';

  return 'unverified'; 
}

function analyzeClaimReviews(claims: Claim[]): {
  summary: Record<Verdict, number>,
  verdict: Verdict
} {
  const summary: Record<Verdict, number> = {
    positive: 0,
    negative: 0,
    neutral: 0,
    unverified: 0
  };

  for (const claim of claims) {
    if (!claim.claimReview || claim.claimReview.length === 0) {
      summary.unverified++;
      continue;
    }

    for (const review of claim.claimReview) {
      const sentiment = getSentimentFromTextualRating(review.textualRating || '');
      summary[sentiment]++;
    }
  }

  const entries = Object.entries(summary);
  const [maxCategory, maxCount] = entries.reduce((a, b) => (b[1] > a[1] ? b : a));
  const total = entries.reduce((sum, [, count]) => sum + count, 0);

  if (maxCount === 0 || total === 0) return { summary, verdict: 'unverified' };

  return { summary, verdict: maxCategory as Verdict };
}


export const checkFact = async (query: string) => {
  try {
    const { data } = await axios.get<FactCheckResponse>(
      'https://factchecktools.googleapis.com/v1alpha1/claims:search',
      {
        params: {
          query,
          key: process.env.GOOGLE_FACTCHECK_API_KEY,
        },
      }
    );

    const claims = data.claims || [];

    const { summary, verdict } = analyzeClaimReviews(claims);

    return {
      verdict,
      summary,
      claims,
    };
  } catch (error: any) {
    console.error('Error fetching fact check:', error.message);
    return {
      verdict: 'unverified',
      summary: {
        positive: 0,
        negative: 0,
        neutral: 0,
        unverified: 0,
      },
      claims: [],
    };
  }
};

import axios from 'axios';

export const checkFact = async (query: string) => {
  const { data } = await axios.get('https://factchecktools.googleapis.com/v1alpha1/claims:search', {
    params: {
      query,
      key: process.env.GOOGLE_FACTCHECK_API_KEY,
    },
  });
  return data.claims || [];
};

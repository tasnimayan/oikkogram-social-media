
import axiosInstance from './axiosInstance';

const fetchGraphql = async (query: string, variables: Record<string, any> = {}, otherParams: Record<string, any> = {}) => {
  const requestBody = {
    query,
    variables,
    ...otherParams.body,
  };

  try {
    const response = await axiosInstance.post('', requestBody, { headers: otherParams.headers });
    return response.data;
  } catch (error) {
    console.error('GraphQL request error:', error);
    throw new Error('Error making GraphQL request');
  }
};

export default fetchGraphql;

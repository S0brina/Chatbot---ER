import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/call-llm-text/';

export const sendMessage = async (inputData) => {
  try {
    const response = await axios.post(API_URL, { user_input: inputData }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Log the entire response to debug
    console.log('Response from backend:', response.data);

    // Extract and return the "result" field
    return response.data.result; 
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};
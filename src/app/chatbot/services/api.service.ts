import { hideThinkingMessage, showThinkingMessage } from '@/client/app';
import dotenv from 'dotenv';

dotenv.config();

export const getBaseUrl = (): string | undefined => process.env.API_URL;

export const getAPIUrl = (endpoint: string | null = null): string => {
  if (endpoint) {
    return `${getBaseUrl()}${endpoint}`;
  }
  return `${getBaseUrl()}/api/messages`;
};

export const checkRetrievedMessageData = (data: Response) => {
  if (!data.ok) {
    throw new Error('Unavailable to retrieve data.');
  }
};

export const getRequestInit = (userText: string): RequestInit | undefined => {
  return {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_message: userText }),
  };
};

const getActionRequestInit = (userText: string): RequestInit | undefined => {
  return {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: userText }),
  };
};

const retrieveResponse = async (
  endpoint: string | null = null,
  userText: string,
): Promise<Response> => {
  if (endpoint) {
    return new Promise((resolve) => {
      setTimeout(async () => {
        const response = await fetch(
          getAPIUrl(endpoint),
          getActionRequestInit(userText),
        );
        resolve(response);
      }, 1000);
    });
  }
  return await fetch(getAPIUrl(), getRequestInit(userText));
};

export const retrieveMessageData = async (
  userText: string,
  endpoint: string | null = null,
) => {
  try {
    showThinkingMessage();
    const response = await retrieveResponse(endpoint, userText);
    checkRetrievedMessageData(response);
    hideThinkingMessage();
    return await response.json();
  } catch (error) {
    console.error('Error retrieving JSON data: ', error);
    hideThinkingMessage();
  }
};

import { MessageTypes } from '@/app/chatbot/components/message/messageTypes';

export interface ChatbotMessage {
  type: MessageTypes;
  content?: string;
  path?: string;
  name?: string;
  alt?: string;
  action?: string;
  error?: string;
}

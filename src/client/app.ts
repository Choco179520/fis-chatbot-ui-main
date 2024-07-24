// app.ts
import {
  buildThinkingMessage,
  MessageBuilder,
} from '@/app/chatbot/components/message/messageBuilder';
import {
  getBaseUrl,
  retrieveMessageData,
} from '@/app/chatbot/services/api.service';
import { ChatbotMessage } from '@/app/chatbot/models/message.model';

type ChatbotResponseData = {
  id: number;
  responses: ChatbotMessage;
  error?: string;
  type?: string;
};

export const getTime = (): string => {
  const today: Date = new Date();
  let hours: number | string = today.getHours();
  let minutes: number | string = today.getMinutes();
  if (hours < 10) {
    hours = '0' + hours;
  }
  if (minutes < 10) {
    minutes = '0' + minutes;
  }
  return hours + ':' + minutes;
};

export const createTimestampElement = (): HTMLElement => {
  const timestampElement = document.createElement('small');
  timestampElement.id = 'chat-timestamp';
  timestampElement.textContent = '00:00';
  return timestampElement;
};

export const chatbot = {
  botStarterMessage: {
    type: 'text',
    content: '¡Hola, soy Pantera, tu asistente virtual de la FIS!',
  },
  botErrorMessage: {
    type: 'text',
    content:
      'Por el momento no me encuentro disponible. Por favor, vuelve más tarde.',
  },
  getChatBox: (): Element | null =>
    document.querySelector('.chatbot__message-box'),
};

export const createMessageElement = (
  message: ChatbotMessage,
  isUser: boolean,
  isLastMessage: boolean,
): HTMLElement => {
  const messageBuilder = new MessageBuilder(isUser);
  return messageBuilder.createMessage(message, isLastMessage);
};

export const addMessageToChatBox = (
  messageElement: HTMLElement,
  isAction: boolean = false,
  isImage: boolean = false,
): void => {
  const chatBox = chatbot.getChatBox() as HTMLElement;
  if (!isAction && !isImage) {
    chatBox?.appendChild(messageElement);
  }
  chatBox.scrollTo({
    left: 0,
    top: chatBox.scrollHeight,
    behavior: 'smooth',
  });
};

export const sendMessageToChatbot = async (
  userText: string,
  endpoint: string | null = null,
): Promise<void> => {
  const data: ChatbotResponseData = await retrieveMessageData(
    userText,
    endpoint,
  );

  if (data.error) {
    data.type = 'error';
    const errorElement = createMessageElement(
      data as ChatbotMessage,
      false,
      true,
    );
    addMessageToChatBox(errorElement);
  }
  if (Array.isArray(data.responses)) {
    const nonTextIndexes = data.responses.filter(
      (message: ChatbotMessage) =>
        message.type !== 'action' && message.type !== 'image',
    );
    const lastNonActionIndex = nonTextIndexes.length
      ? nonTextIndexes.length - 1
      : 0;

    data.responses.map((message: ChatbotMessage) => {
      const isLastMessage = nonTextIndexes[lastNonActionIndex] === message;
      let messageElement;

      switch (message.type) {
        case 'text':
          messageElement = createMessageElement(message, false, isLastMessage);
          break;
        case 'image':
          messageElement = createMessageElement(message, false, false);
          break;
        case 'link':
          messageElement = createMessageElement(message, false, isLastMessage);
          break;
        case 'action':
          messageElement = createMessageElement(message, true, false);
          break;
        case 'error':
          messageElement = createMessageElement(message, false, isLastMessage);
          break;
        default:
          console.error('Unknown message type:', message.type);
      }
      if (messageElement) {
        addMessageToChatBox(messageElement);
      }
    });
  }
};

const handleUserInput = (): void => {
  const userInput = document.querySelector(
    '.chatbot__input-box textarea',
  ) as HTMLTextAreaElement;
  const userText = userInput.value.trim();
  if (userText === '') {
    return;
  }
  const userMessage: ChatbotMessage = {
    type: 'text',
    content: userText,
  };
  const userMessageElement = createMessageElement(userMessage, true, false);
  addMessageToChatBox(userMessageElement);
  userInput.value = '';
  sendMessageToChatbot(userText).catch((error) => {
    console.error(error);
  });
};

document
  .getElementById('chatbot__send-button')
  ?.addEventListener('click', () => handleUserInput());

document
  .querySelector('.chatbot__input-box textarea')
  ?.addEventListener('keydown', (event: Event) => {
    const e = event as KeyboardEvent;
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleUserInput();
    }
  });

const toggleClass = (element: Element, className: string): void => {
  element.classList.toggle(className);
};

export const showThinkingMessage = () => {
  const typingMessageElement = buildThinkingMessage();
  addMessageToChatBox(typingMessageElement);
};

export const hideThinkingMessage = () => {
  const thinkingMessage = document.getElementById('thinking-message');
  thinkingMessage?.remove();
};

const addEventListenerToElement = (
  element: Element,
  eventType: string,
  handler: EventListenerOrEventListenerObject,
): void => {
  element.addEventListener(eventType, handler);
};

const startChatbot = async () => {
  const logoWrapper = document.getElementById('logo-wrapper') as HTMLElement;
  try {
    const statusResponse = await fetch(`${getBaseUrl()}/api/status`);
    const statusData = await statusResponse.json();
    if (statusData.status === 'up') {
      logoWrapper?.style.setProperty('--error-red', 'var(--light-green)');
      const botStarterMessageElement = createMessageElement(
        chatbot.botStarterMessage as ChatbotMessage,
        false,
        true,
      );
      addMessageToChatBox(botStarterMessageElement);
    }
  } catch (error) {
    const botErrorMessageElement = createMessageElement(
      chatbot.botErrorMessage as ChatbotMessage,
      false,
      true,
    );
    addMessageToChatBox(botErrorMessageElement);
    console.error('Error connecting to the API:', error);
  }

  const chatbotToggler = document.querySelector('.chatbot__toggler');
  const chatbotBody = document.querySelector('body');
  if (chatbotToggler && chatbotBody) {
    addEventListenerToElement(chatbotToggler, 'click', () =>
      toggleClass(chatbotBody, 'chatbot--show'),
    );
  }

  const expandToggler = document.getElementById('toggler-btn--expand');
  if (expandToggler && chatbotBody) {
    addEventListenerToElement(expandToggler, 'click', () =>
      toggleClass(chatbotBody, 'chatbot--show'),
    );
  }
};

startChatbot().catch((error) => {
  console.error(error);
});

// messageBuilder.ts
import {
  addMessageToChatBox,
  createTimestampElement,
  getTime,
  sendMessageToChatbot,
} from '@/client/app';
import { getBaseUrl } from '@/app/chatbot/services/api.service';
import { MessageTypes } from '@/app/chatbot/components/message/messageTypes';
import { ChatbotMessage } from '@/app/chatbot/models/message.model';
import { DomService } from '@/app/chatbot/services/dom.service';

const buildBubbles = (bubblesNumber: number) => {
  return Array.from({ length: bubblesNumber }, () => {
    return DomService.createDivElement(['typing__bubble']);
  });
};

export const buildThinkingMessage = () => {
  const imageSrc = 'static/assets/svg-panther--white.svg';
  const bubbles = buildBubbles(3);

  const typingMessageContainer = DomService.createDivElement(['typing']);
  const messageElement = DomService.createLiElement(
    ['chat', 'message--incoming'],
    'thinking-message',
  );
  const imageSpan = DomService.createSpanElement(
    `<img src=${imageSrc} alt="Logo de una pantera blanca"/>`,
  );

  typingMessageContainer.append(...bubbles);
  messageElement.appendChild(imageSpan);
  messageElement.appendChild(typingMessageContainer);
  return messageElement;
};

export interface MessageBuilderInterface {
  createMessage(message: ChatbotMessage, isLastMessage: boolean): HTMLElement;
}
export class MessageBuilder implements MessageBuilderInterface {
  private readonly isUser: boolean;

  constructor(isUser: boolean) {
    this.isUser = isUser;
  }

  private getSpanImage(isLastMessage: boolean): string {
    if (isLastMessage && !this.isUser) {
      const imageSrc = 'static/assets/svg-panther--white.svg';
      return `<span><img src=${imageSrc} alt="Logo de una pantera blanca"/></span>`;
    }
    return '<span style="background: var(--white); border-color: var(--white)"></span>';
  }

  private showImageInLargeView(imageUrl: string): void {
    const overlay = document.createElement('div');
    const largeImage = document.createElement('img');
    overlay.classList.add('image-overlay');

    largeImage.src = imageUrl;
    largeImage.classList.add('large-image');

    overlay.appendChild(largeImage);
    overlay.addEventListener('click', () => {
      overlay.remove();
    });

    document.body.appendChild(overlay);
  }

  createActionElement(message: ChatbotMessage): HTMLElement {
    const actionButton = document.createElement('button');
    actionButton.textContent = message.name as string;
    actionButton.classList.add('chat-action-button');
    actionButton.onclick = () =>
      this.handleActionAsInput(
        message.name as string,
        message.action as string,
      );
    return actionButton;
  }

  createImageElement(message: ChatbotMessage): HTMLElement {
    const imageUrl = `${getBaseUrl()}/images/${message.path}`;
    const imageElement = document.createElement('img');
    imageElement.src = imageUrl;
    imageElement.alt = message.alt || 'No existe una descripción disponible';
    imageElement.classList.add('chat-image');
    imageElement.addEventListener('click', () =>
      this.showImageInLargeView(imageUrl),
    );
    return imageElement;
  }

  createTextElement(
    message: ChatbotMessage,
    isLastMessage: boolean,
  ): HTMLElement {
    let content = `<p>${message.content}</p>`;
    if (!isLastMessage) {
      content = `<p style="border-radius: 10px;">${message.content}</p>`;
    }
    return this.createMessageElement(content, isLastMessage);
  }

  createErrorElement(
    message: ChatbotMessage,
    isLastMessage: boolean,
  ): HTMLElement {
    const content = `<p>${message.error}</p>`;
    return this.createMessageElement(content, isLastMessage);
  }

  createLinkElement(
    message: ChatbotMessage,
    isLastMessage: boolean,
  ): HTMLElement {
    const baseContent = `<a href="${message.path}" target="_blank">${message.name}</a>`;
    let content = `<p>${baseContent}</p>`;
    if (!isLastMessage) {
      content = `<p style="border-radius: 10px;">${baseContent}</p>`;
    }
    return this.createMessageElement(content, isLastMessage);
  }

  private createMessageElement(
    content: string,
    isLastMessage: boolean,
  ): HTMLElement {
    const messageClass = this.isUser
      ? 'message--outgoing'
      : 'message--incoming';
    const messageElement = DomService.createLiElement();
    messageElement.id = 'chat-message';
    messageElement.classList.add('chat', messageClass);
    const imageSpan = this.getSpanImage(isLastMessage);
    messageElement.innerHTML = imageSpan.concat(content);
    if (this.isUser) {
      const timestampElement = createTimestampElement();
      timestampElement.textContent = getTime();
      messageElement.appendChild(timestampElement);
    }
    if (isLastMessage) {
      const timestampElement = createTimestampElement();
      timestampElement.textContent = getTime();
      messageElement.appendChild(timestampElement);
    }
    return messageElement;
  }

  public createMessage(
    message: ChatbotMessage,
    isLastMessage: boolean,
  ): HTMLElement {
    switch (message.type as MessageTypes) {
      case 'text':
        return this.createTextElement(message, isLastMessage);
      case 'image':
        return this.createImageElement(message);
      case 'link':
        return this.createLinkElement(message, isLastMessage);
      case 'action':
        return this.createActionElement(message);
      case 'error':
        return this.createErrorElement(message, isLastMessage);
      default:
        throw new Error('Unknown message type');
    }
  }

  private handleActionAsInput(
    message: string,
    action_id: string | undefined = undefined,
  ): void {
    const userMessage: ChatbotMessage = {
      type: 'text',
      content: message,
      action: action_id,
    };
    const userMessageElement = this.createMessage(userMessage, false);
    addMessageToChatBox(userMessageElement);
    sendMessageToChatbot(action_id as string, `/api/actions`).catch((error) => {
      console.error(error);
    });
  }
}

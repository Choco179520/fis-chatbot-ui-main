import { MessageBuilder } from '../../app/chatbot/components/message/messageBuilder';
import { ChatbotMessage } from '../../app/chatbot/models/message.model';

describe('MessageBuilder', () => {
  let messageBuilder: MessageBuilder;

  beforeEach(() => {
    messageBuilder = new MessageBuilder(false);
  });

  it('Creates a text element with correct content for the last incoming message', () => {
    const message: ChatbotMessage = {
      type: 'text',
      content: 'Test message',
    };

    const element = messageBuilder.createTextElement(message, true);
    expect(element.innerHTML).toContain('Test message');
    expect(element.classList.contains('message--incoming')).toBe(true);
    expect(element.querySelector('p')?.style.borderRadius).toBe('');
  });

  it('Creates a text element with a specific style for not the last message', () => {
    const message: ChatbotMessage = {
      type: 'text',
      content: 'Test message',
    };

    const element = messageBuilder.createTextElement(message, false);
    expect(element.querySelector('p')?.style.borderRadius).toBe('10px');
  });

  it('Creates an image element with correct attributes', () => {
    const message: ChatbotMessage = {
      type: 'image',
      path: 'path/to/image.jpg',
      alt: 'Image description',
    };

    const element = messageBuilder.createImageElement(message);
    expect(element.tagName).toBe('IMG');
    expect(element.classList.contains('chat-image')).toBe(true);
  });

  it('Creates an action button element with correct attributes', () => {
    const message: ChatbotMessage = {
      type: 'action',
      name: 'Test Action',
      action: 'testAction',
    };

    const element = messageBuilder.createActionElement(
      message,
    ) as HTMLButtonElement;
    expect(element.tagName).toBe('BUTTON');
    expect(element.textContent).toBe('Test Action');
    expect(element.classList.contains('chat-action-button')).toBe(true);
  });

  it('Creates a link element with correct attributes', () => {
    const message: ChatbotMessage = {
      type: 'link',
      name: 'Test Link',
      path: 'http://example.com',
    };

    const element = messageBuilder.createLinkElement(message, true);
    const anchor = element.querySelector('a');
    expect(anchor).not.toBeNull();
    expect(anchor?.getAttribute('href')).toBe('http://example.com');
    expect(anchor?.textContent).toBe('Test Link');
  });

  it('Creates an error element with correct content', () => {
    const message: ChatbotMessage = {
      type: 'error',
      error: 'Error message',
    };

    const element = messageBuilder.createErrorElement(message, true);
    expect(element.innerHTML).toContain('Error message');
    expect(element.classList.contains('message--incoming')).toBe(true); // Asumiendo que los mensajes de error siempre son entrantes
  });

  it('Correctly creates a message element based on message type', () => {
    const textMessage: ChatbotMessage = {
      type: 'text',
      content: 'Text message',
    };

    const textElement = messageBuilder.createMessage(textMessage, true);
    expect(textElement.innerHTML).toContain('Text message');

    const imageMessage: ChatbotMessage = {
      type: 'image',
      path: 'path/to/image.jpg',
      alt: 'Image description',
    };

    const imageElement = messageBuilder.createMessage(imageMessage, false);
    expect(imageElement.tagName).toBe('IMG');
  });
});

import { DomService } from '../../app/chatbot/services/dom.service';

describe('DomService', () => {
  describe('isValidId', () => {
    test('returns true for a valid id', () => {
      expect(DomService.isValidId('test')).toBe(true);
    });

    test('returns false for an empty id', () => {
      expect(DomService.isValidId('')).toBe(false);
    });
  });

  describe('createDivElement', () => {
    test('creates a div element with specified classes and id', () => {
      const classes = ['test', 'example'];
      const id = 'testId';
      const divElement = DomService.createDivElement(classes, id);

      expect(divElement.tagName).toBe('DIV');
      expect(divElement.classList.contains('test')).toBe(true);
      expect(divElement.classList.contains('example')).toBe(true);
      expect(divElement.id).toBe(id);
    });

    test('creates a div element without classes and id', () => {
      const divElement = DomService.createDivElement();

      expect(divElement.tagName).toBe('DIV');
      expect(divElement.classList.length).toBe(0);
      expect(divElement.id).toBe('');
    });
  });

  describe('createLiElement', () => {
    test('creates a li element with specified classes and id', () => {
      const classes = ['test', 'example'];
      const id = 'testId';
      const liElement = DomService.createLiElement(classes, id);

      expect(liElement.tagName).toBe('LI');
      expect(liElement.classList.contains('test')).toBe(true);
      expect(liElement.classList.contains('example')).toBe(true);
      expect(liElement.id).toBe(id);
    });

    test('creates a li element without classes and id', () => {
      const liElement = DomService.createLiElement();

      expect(liElement.tagName).toBe('LI');
      expect(liElement.classList.length).toBe(0);
      expect(liElement.id).toBe('');
    });
  });

  describe('createImageElement', () => {
    test('creates an image element with src and alt attributes', () => {
      const src = 'http://localhost/test.jpg';
      const alt = 'Test Image';
      const imageElement = DomService.createImageElement(src, alt);

      expect(imageElement.tagName).toBe('IMG');
      expect(imageElement.src).toBe(src);
      expect(imageElement.alt).toBe(alt);
    });
  });

  describe('createLinkElement', () => {
    test('creates a link element with href, target, and content', () => {
      const href = 'https://example.com/';
      const target = '_blank';
      const content = 'Example';
      const linkElement = DomService.createLinkElement(href, target, content);

      expect(linkElement.tagName).toBe('A');
      expect(linkElement.href).toBe(href);
      expect(linkElement.target).toBe(target);
      expect(linkElement.innerHTML).toBe(content);
    });
  });

  describe('createSpanElement', () => {
    test('creates a span element with innerHTML', () => {
      const innerHTML = '<strong>Test</strong>';
      const spanElement = DomService.createSpanElement(innerHTML);

      expect(spanElement.tagName).toBe('SPAN');
      expect(spanElement.innerHTML).toBe(innerHTML);
    });
  });
});

export class DomService {
  static isValidId(id: string) {
    return id !== '';
  }
  static createDivElement(classes: string[] = [], id = ''): HTMLDivElement {
    const divElement = document.createElement('div');
    divElement.classList.add(...classes);
    if (this.isValidId(id)) {
      divElement.id = id;
    }
    return divElement;
  }

  static createLiElement(
    classes: string[] = [],
    id: string = '',
  ): HTMLLIElement {
    const liElement = document.createElement('li');
    liElement.classList.add(...classes);
    if (this.isValidId(id)) {
      liElement.id = id;
    }
    return liElement;
  }

  static createImageElement(src: string, alt: string): HTMLImageElement {
    const imageElement = document.createElement('img');
    imageElement.src = src;
    imageElement.alt = alt;
    return imageElement;
  }

  static createLinkElement(
    href: string,
    target: string,
    content: string,
  ): HTMLAnchorElement {
    const linkElement = document.createElement('a');
    linkElement.href = href;
    linkElement.target = target;
    linkElement.innerHTML = content;
    return linkElement;
  }

  static createSpanElement(innerHTML: string): HTMLSpanElement {
    const spanElement = document.createElement('span');
    spanElement.innerHTML = innerHTML;
    return spanElement;
  }
}

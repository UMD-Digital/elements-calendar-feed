declare global {
  interface Window {
    CalendarFeedElement: typeof CalendarFeedElement;
  }
}

const Colors = {
  white: '#fff',
  offWhite: '#f1f1f1',
  grayLight: '#e6e6e6',
  gray: '#222',
  grayDark: '#454545',
  red: '#e21833',
  redDark: '#951022',
  yellow: '#FFD200',
  green: '#70ebd6',
};

const Breakpoints = {
  largeMobileMax: 767,
  tabletMax: 1023,
  desktopMin: 1024,
};

const ELEMENT_NAME = 'umd-calendar-feed';

const template = document.createElement('template');

template.innerHTML = `
  <style>
  
    :host {
      display: block !important;
      background-color: ${Colors.red} !important;
      position: relative !important;
      z-index: 999;
    }

    :host * {
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
    }
  
  </style>
`;

export default class CalendarFeedElement extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return [''];
  }

  attributeChangedCallback(
    name: string,
    oldValue: string | null,
    newValue: string | null,
  ) {}

  connectedCallback() {}
}

if (!window.customElements.get(ELEMENT_NAME)) {
  window.CalendarFeedElement = CalendarFeedElement;
  window.customElements.define(ELEMENT_NAME, CalendarFeedElement);
}

const EventsQuery = `
  query getEvents($related: [QueryArgument]) {
    solspace_calendar {
      events(
        limit: 3
        loadOccurrences: true,
        rangeStart: "today", 
        relatedTo: $related
      ) {
        id
        title
        slug
        url
        startDate
        endDate
        ... on communications_Event {
          id
          summary: commonRichTextTwo
          description: commonRichText
          image: commonAssetHeroImageSingle {
            url
          }
        }
        ... on submission_Event {
          id
          summary: commonRichTextTwo
          description: commonRichText
          image: commonAssetHeroImageSingle {
            url
            ... on placeholders_Asset {
              id
              altText:alt
            }
            ... on heroImages_Asset {
              id
              altText:commonPlainTextTwo
            }
          }
        }
      }
    }
  }
`;
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
    tabletMin: 768,
    tabletMax: 1023,
    desktopMin: 1024,
};
const ELEMENT_NAME = 'umd-calendar-feed';
const template = document.createElement('template');
const CALENDAR_PRODUCTION_URL = 'https://calendar.umd-staging.com/';
const CONTAINER_CLASS = 'umd-calendar-feed-container';
const EVENT_CONTAINER_CLASS = 'umd-calendar-feed-event-container';
const EVENT_IMAGE_CONTAINER_CLASS = 'umd-calendar-feed-event-image-container';
const EVENT_TEXT_CONTAINER_CLASS = 'umd-calendar-feed-event-text-container';
const EVENT_TEXT_DATE_CLASS = 'umd-calendar-feed-event-text-date';
const EVENT_TEXT_TITLE_CLASS = 'umd-calendar-feed-event-text-title';
const DATA_CONTAINER_AMOUNT = 'data-event-amount';
template.innerHTML = `
  <style>

    :host {
      position: relative !important;
      display: block;
    }

    :host * {
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      padding: 0;
      margin: 0;
    }

    :host img {
      max-width: 100% !important;
    }

    .${CONTAINER_CLASS} {
       display: grid;
       grid-template-columns: 1fr;
       grid-gap: 40px 0;
     }

     @media (min-width: ${Breakpoints.tabletMin}px) {
       .${CONTAINER_CLASS} {
         grid-gap: 0 30px;
       }
     }

     @media (min-width: ${Breakpoints.tabletMin}px) {
       [${DATA_CONTAINER_AMOUNT}="1"] {
         grid-template-columns: 1fr ;
       }
     }

     @media (min-width: ${Breakpoints.tabletMin}px) {
       [${DATA_CONTAINER_AMOUNT}="2"] {
         grid-template-columns: 1fr 1fr;
       }
     }

    @media (min-width: ${Breakpoints.tabletMin}px) {
      [${DATA_CONTAINER_AMOUNT}="3"] {
        grid-template-columns: 1fr 1fr 1fr;
      }
    }

    [${DATA_CONTAINER_AMOUNT}="3"] > div {
     
    }

    .${EVENT_CONTAINER_CLASS} {
      border: 1px solid ${Colors.grayLight};
    }

    .${EVENT_IMAGE_CONTAINER_CLASS} {
      aspect-ratio: 16/9;
    }

    .${EVENT_IMAGE_CONTAINER_CLASS} > a {
      height: 100%;
      display: block;
      overflow: hidden;
    }

    .${EVENT_IMAGE_CONTAINER_CLASS} > a:hover img,
    .${EVENT_IMAGE_CONTAINER_CLASS} > a:focus img {
      scale: 1.05;

    }

    .${EVENT_IMAGE_CONTAINER_CLASS} img {
      object-fit: cover;
      object-position: center;
      height: 100%;
      width: 100%;
      scale: 1.0;
      transition: scale 0.3s ease-in-out;
    }

    .${EVENT_TEXT_CONTAINER_CLASS} {
      border-top: 1px solid ${Colors.grayLight};
      padding: 30px 20px;
    }

    .${EVENT_TEXT_CONTAINER_CLASS} p {
      line-height: 1.4em;
      font-size: 16px;
    }

    p.${EVENT_TEXT_TITLE_CLASS} {
      font-size: 20px;
      line-height: 1.2em;
      font-weight: 700;
      color: ${Colors.grayDark};
      margin-bottom: 20px;
    }

    .${EVENT_TEXT_TITLE_CLASS} a {
      color: currentColor;
      text-decoration: none;
      transition: color 0.3s ease-in-out;
    }

    .${EVENT_TEXT_TITLE_CLASS} a:hover,
    .${EVENT_TEXT_TITLE_CLASS} a:focus {
      color: ${Colors.redDark};
    }

    .${EVENT_TEXT_DATE_CLASS} {
      margin-bottom: 20px;
      font-weight: 600;
    }

    .${EVENT_TEXT_DATE_CLASS} > div:first-child {
      margin-bottom: 5px;
    }
  
  </style>
`;
const MakeContainer = ({ eventAmount }) => {
    const container = document.createElement('div');
    container.classList.add(CONTAINER_CLASS);
    container.setAttribute(DATA_CONTAINER_AMOUNT, eventAmount.toString());
    return container;
};
const MakeImageContainer = (event) => {
    const imageContainer = document.createElement('div');
    const link = document.createElement('a');
    const image = document.createElement('img');
    imageContainer.classList.add(EVENT_IMAGE_CONTAINER_CLASS);
    link.setAttribute('href', event.url);
    link.setAttribute('rel', 'noopener noreferrer');
    link.setAttribute('target', '_blank');
    image.setAttribute('src', `${CALENDAR_PRODUCTION_URL}${event.image[0].url}`);
    image.setAttribute('alt', event.image[0].altText);
    console.log(event);
    link.appendChild(image);
    imageContainer.appendChild(link);
    return imageContainer;
};
const MakeDate = (event) => {
    const dateWrapper = document.createElement('div');
    const firstRow = document.createElement('div');
    const secondRow = document.createElement('div');
    const startDay = document.createElement('p');
    const endDay = document.createElement('p');
    const startTime = document.createElement('time');
    const endTime = document.createElement('time');
    const startDate = new Date(event.startDate);
    const endDate = new Date(event.endDate);
    const isSameDay = startDate.getDay() === endDate.getDay();
    dateWrapper.classList.add(EVENT_TEXT_DATE_CLASS);
    startDate.setTime(startDate.getTime() + 4 * 60 * 60 * 1000);
    endDate.setTime(endDate.getTime() + 4 * 60 * 60 * 1000);
    startTime.setAttribute('datetime', startDate.toUTCString());
    endTime.setAttribute('datetime', endDate.toUTCString());
    startDay.innerHTML = `${startDate.toDateString()}`;
    endDay.innerHTML = `${endDate.toDateString()}`;
    startTime.innerHTML = `${startDate.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
    })}`;
    endTime.innerHTML = ` ${endDate.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
    })}`;
    if (isSameDay) {
        firstRow.innerHTML = `${startDay.innerHTML}`;
        secondRow.innerHTML = `${startTime.outerHTML} - ${endTime.outerHTML}`;
    }
    else {
        firstRow.innerHTML = `${startDay.innerHTML} ${startTime.outerHTML}`;
        secondRow.innerHTML = `${endDay.innerHTML} ${endTime.outerHTML}`;
    }
    // Time Row
    dateWrapper.appendChild(firstRow);
    dateWrapper.appendChild(secondRow);
    return dateWrapper;
};
const MakeTextContainer = (event) => {
    const parser = new DOMParser();
    const textContainer = document.createElement('div');
    const eventTitle = document.createElement('p');
    const link = document.createElement('a');
    const summaryText = parser.parseFromString(event.summary, 'text/html');
    const date = MakeDate(event);
    textContainer.classList.add(EVENT_TEXT_CONTAINER_CLASS);
    eventTitle.classList.add(EVENT_TEXT_TITLE_CLASS);
    link.setAttribute('href', event.url);
    link.setAttribute('rel', 'noopener noreferrer');
    link.setAttribute('target', '_blank');
    link.textContent = event.title;
    eventTitle.appendChild(link);
    textContainer.appendChild(eventTitle);
    textContainer.appendChild(date);
    textContainer.appendChild(summaryText.body);
    return textContainer;
};
const MakeEvent = (event) => {
    const eventContainer = document.createElement('div');
    const image = MakeImageContainer(event);
    const text = MakeTextContainer(event);
    eventContainer.classList.add(EVENT_CONTAINER_CLASS);
    eventContainer.appendChild(image);
    eventContainer.appendChild(text);
    return eventContainer;
};
const fetchEntries = async ({ variables, token, }) => {
    const response = await fetch(`${CALENDAR_PRODUCTION_URL}/graphql`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            query: EventsQuery,
            variables,
        }),
    });
    const responseData = await response.json();
    if (responseData.errors) {
        responseData.errors.forEach((error) => console.error(error.message));
    }
    if (responseData && responseData.data) {
        const data = responseData.data;
        if (data.solspace_calendar && data.solspace_calendar.events) {
            return data.solspace_calendar.events;
        }
        else {
            console.log('Solspace calendar events not found');
        }
    }
    else {
        console.log('No data found');
    }
};
export default class CalendarFeedElement extends HTMLElement {
    constructor() {
        super();
        this._token = null;
        this._categories = null;
        this._shadow = this.attachShadow({ mode: 'open' });
        this._shadow.appendChild(template.content.cloneNode(true));
    }
    static get observedAttributes() {
        return ['token', 'categories'];
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'token' && newValue) {
            this._token = newValue;
        }
        if (name === 'categories' && newValue) {
            this._categories = newValue;
        }
    }
    connectedCallback() {
        if (!this._token || this._token === null) {
            console.error('No token provided');
            return;
        }
        if (!this._categories || this._categories === null) {
            console.error('No filters provided for calendar feed');
        }
        const addEvents = async () => {
            const variables = {};
            if (this._categories) {
                variables.related = [this._categories];
            }
            const data = await fetchEntries({
                variables: variables,
                token: this._token,
            });
            const container = MakeContainer({ eventAmount: data.length });
            data.forEach((event) => {
                const eventElement = MakeEvent(event);
                container.appendChild(eventElement);
            });
            this._shadow.appendChild(container);
        };
        addEvents();
    }
}
if (!window.customElements.get(ELEMENT_NAME)) {
    window.CalendarFeedElement = CalendarFeedElement;
    window.customElements.define(ELEMENT_NAME, CalendarFeedElement);
}
//# sourceMappingURL=index.js.map
import React from "react";

const SvgTemplate = (props) => {
  switch (props.id) {
    case "pause":
      return (
        <span className="icon">
          <svg
            className="icon__pause"
            width="38"
            height="41"
            viewBox="0 0 38 41"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.0924 8.26923V32.7193M24.0924 8.26923V32.7193"
              stroke="#EAF0FF"
              strokeWidth="3"
            />
          </svg>
        </span>
      );
    case "arrow_next-icon":
      return (
        <span className="icon">
          <svg
            className="icon__arrow-next"
            width="30"
            height="33"
            viewBox="0 0 30 33"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.3606 5.92942L4.28033 4.74447C3.82797 4.39336 3.21518 4.33043 2.7009 4.58227C2.18662 4.83411 1.8606 5.35678 1.8606 5.92942H3.3606ZM3.3606 27.0589H1.8606C1.8606 27.6316 2.18662 28.1542 2.7009 28.4061C3.21518 28.6579 3.82797 28.595 4.28033 28.2439L3.3606 27.0589ZM16.9718 16.4942L17.8915 17.6791C18.2576 17.395 18.4718 16.9576 18.4718 16.4942C18.4718 16.0308 18.2576 15.5934 17.8915 15.3092L16.9718 16.4942ZM1.8606 5.92942V27.0589H4.8606V5.92942H1.8606ZM4.28033 28.2439L17.8915 17.6791L16.0521 15.3092L2.44086 25.874L4.28033 28.2439ZM17.8915 15.3092L4.28033 4.74447L2.44086 7.11436L16.0521 17.6791L17.8915 15.3092ZM25.1941 4.87294V28.1154H28.1941V4.87294H25.1941Z"
              fill="#EAF0FF"
            />
          </svg>
        </span>
      );
    case "arrow_prev_icon":
      return (
        <span className="icon">
          <svg
            width="30"
            height="33"
            viewBox="0 0 30 33"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M26.8241 27.0589L25.9044 28.2439C26.3567 28.595 26.9695 28.6579 27.4838 28.4061C27.9981 28.1542 28.3241 27.6316 28.3241 27.0589H26.8241ZM26.8241 5.92941H28.3241C28.3241 5.35677 27.9981 4.8341 27.4838 4.58226C26.9695 4.33042 26.3567 4.39335 25.9044 4.74446L26.8241 5.92941ZM13.213 16.4942L12.2933 15.3092C11.9272 15.5934 11.713 16.0308 11.713 16.4942C11.713 16.9576 11.9272 17.395 12.2933 17.6791L13.213 16.4942ZM28.3241 27.0589V5.92941H25.3241V27.0589H28.3241ZM25.9044 4.74446L12.2933 15.3092L14.1327 17.6791L27.7438 7.11435L25.9044 4.74446ZM12.2933 17.6791L25.9044 28.2439L27.7438 25.874L14.1327 15.3092L12.2933 17.6791ZM4.99079 28.1154V4.87293H1.99079V28.1154H4.99079Z"
              fill="#EAF0FF"
            />
          </svg>
        </span>
      );
    case "menu":
      return (
        <span className="icon">
          <svg
            className="icon__menu"
            width="25"
            height="12"
            viewBox="0 0 25 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 1.55798H24.0199" stroke="#EAF0FF" strokeWidth="2" />
            <path
              d="M0 10.0503L24.0198 10.0503"
              stroke="#EAF0FF"
              strokeWidth="2"
            />
          </svg>
        </span>
      );
    case "search":
      return (
        <span className="icon">
          <svg
            width="20"
            height="21"
            viewBox="0 0 20 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 19.8041L13.8571 14.6613M8.71429 17.2327C4.4538 17.2327 1 13.7789 1 9.51842C1 5.25794 4.4538 1.80414 8.71429 1.80414C12.9748 1.80414 16.4286 5.25794 16.4286 9.51842C16.4286 13.7789 12.9748 17.2327 8.71429 17.2327Z"
              stroke="#EAF0FF"
              strokeWidth="2"
            />
          </svg>
        </span>
      );
    default:
      return <svg className="empty"></svg>;
  }
};

export default SvgTemplate;

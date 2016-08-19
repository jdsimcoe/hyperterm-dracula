// Constants
const backgroundColor = '#292A2B';
const foregroundColor = '#f8f8f2';
const darkerBackground = '#222324';
const borderColor = '#333';

// Colors
const RED = '#ff5555';
const GREEN = '#50fa7b';
const ORANGE = '#ffb86c';
const LIGHT_ORANGE = '#ffcc95';
const BLUE = '#6272a4';
const LIGHT_BLUE = '#7384b9';
const PINK = '#ff79c6';
const LIGHT_PINK = '#FF9AC1';
const CYAN = '#8be9fd';
const PURPLE = '#bd93f9';
const LIGHT_GRAY = foregroundColor;
const MEDIUM_GRAY = '#666666';
const WHITE = '#FFFFFF';

const colors = {
    black: backgroundColor,
    red: RED,
    green: GREEN,
    yellow: ORANGE,
    blue: BLUE,
    magenta: PINK,
    cyan: CYAN,
	orange: PURPLE,
    white: LIGHT_GRAY,
    lightRed: RED,
    lightGreen: GREEN,
    lightYellow: LIGHT_ORANGE,
    lightBlue: LIGHT_BLUE,
    lightMagenta: LIGHT_PINK,
    lightCyan: CYAN,
    lightWhite: WHITE
};

// Apply theme
exports.decorateConfig = (config) => (
    Object.assign({}, config, {
        backgroundColor,
        foregroundColor,
        borderColor: borderColor,
        cursorColor: foregroundColor,
        colors,
        css: `
      ${config.css || ''}
	  .terms_term x-row{
		  height: 24px;
	  }
      /* Highlight active tab by making rest of nav darker */
      .tabs_list {
        background-color: ${darkerBackground} !important;
      }
      /* Set tab colors */
      .tab_tab {
        color: ${foregroundColor} !important;
        background-color: ${darkerBackground} !important;
        border: none !important;
        border-right: 1px solid transparent !important;
        border-left: 1px solid transparent !important;
      }
      /* Hide bottom border if tab is active, make bg lighter */
      .tab_active {
        background-color: ${backgroundColor} !important;
        height: calc(100% + 1px);
        border-left: 1px solid ${borderColor} !important;
        border-right: 1px solid ${borderColor} !important;
      }
      .tab_tab:last-child {
        border-right: 1px solid transparent !important;
      }
      /* Hide hardcoded black bottom border */
      .tab_active:before {
        border-bottom: none !important;
      }
      .tab_text {
        border-color: transparent !important;
      }
    `
    })
);

// Development middleware for HMR
exports.middleware = () => (next) => (action) => {
    /* eslint-disable no-param-reassign, default-case */
    switch (action.type) {
        case 'CONFIG_LOAD':
        case 'CONFIG_RELOAD':
            action.config.foregroundColor = foregroundColor;
            action.config.backgroundColor = backgroundColor;
            action.config.cursorColor = foregroundColor;
            action.config.colors = colors;
    }
    next(action);
};

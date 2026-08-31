import { createGlobalStyle } from 'styled-components';
import { envy } from '../theme/envy';

export default createGlobalStyle<{ theme: any }>`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
    font-family: '${props => props.theme.fontFamily || 'Roboto'}', 'Segoe UI', sans-serif;
  }

  html {
    color-scheme: normal !important;
  }

  body {
    background: transparent;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow: hidden;
    user-select: none;
  }

  body.preview {
    background:
      radial-gradient(1200px 720px at 72% 38%, rgba(0, 229, 255, 0.08), transparent 55%),
      radial-gradient(900px 600px at 20% 80%, rgba(0, 168, 190, 0.08), transparent 50%),
      linear-gradient(180deg, #10161c 0%, #05070a 100%);
  }

  button {
    cursor: pointer;
    outline: 0;
    font-family: inherit;
  }

  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: rgba(0, 229, 255, 0.35);
    border-radius: 999px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${envy.cyan};
  }

  @keyframes envy-appear {
    from {
      opacity: 0;
      transform: translateX(-16px);
    }
    to {
      opacity: 1;
      transform: none;
    }
  }

  @keyframes envy-fade {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  .appearance-enter {
    animation: envy-appear 180ms ease-out both;
  }

  .appearance-modal-enter {
    animation: envy-fade 160ms ease-out both;
  }
`;

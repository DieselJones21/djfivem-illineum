import styled from 'styled-components';
import { envy, rgb } from '../../theme/envy';

export const Overlay = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  background: rgba(0, 0, 0, 0.72);
  z-index: 40;
`;

export const Wrapper = styled.div`
  width: min(480px, 90vw);
  background: ${envy.bgRaised};
  border: ${envy.border};
  border-radius: ${props => props.theme.borderRadius || '14px'};
  box-shadow: ${envy.panelShadow};
  color: ${props => rgb(props.theme.fontColor, '244, 247, 250')};
  overflow: hidden;
  text-align: left;
`;

export const Header = styled.div`
  background: ${envy.headerGradient};
  border-bottom: 1px solid rgba(0, 229, 255, 0.28);
  padding: 14px 16px;
  position: relative;

  p {
    font-size: 16px;
    font-weight: 800;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    margin: 0;
  }

  &::after {
    content: '';
    position: absolute;
    left: 16px;
    right: 16px;
    bottom: 0;
    height: 2px;
    background: linear-gradient(
      90deg,
      transparent,
      ${props => rgb(props.theme.primaryBackground, '0, 229, 255')},
      transparent
    );
    box-shadow: 0 0 12px rgba(0, 229, 255, 0.7);
  }
`;

export const Body = styled.div`
  padding: 16px;
  color: ${envy.muted};
  font-size: 14px;
  line-height: 1.45;

  span {
    display: block;
  }
`;

export const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
  padding: 0 16px 16px;

  button {
    min-height: 36px;
    min-width: 96px;
    padding: 8px 14px;
    border-radius: ${props => props.theme.borderRadius || '10px'};
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    cursor: pointer;
    transition: box-shadow 120ms ease, border-color 120ms ease, background 120ms ease;
  }

  button.accept {
    color: ${envy.ink};
    background: ${props => rgb(props.theme.primaryBackground, '0, 229, 255')};
    border: 1px solid ${props => rgb(props.theme.primaryBackground, '0, 229, 255')};
    box-shadow: ${envy.glow};

    &:hover {
      box-shadow: ${envy.glowStrong};
    }
  }

  button.decline {
    color: ${props => rgb(props.theme.fontColor, '244, 247, 250')};
    background: ${envy.item};
    border: ${envy.border};
    box-shadow: ${envy.insetChrome};

    &:hover {
      background: ${envy.itemHover};
      border-color: ${props => rgb(props.theme.primaryBackground, '0, 229, 255')};
      box-shadow: ${envy.glow};
    }
  }
`;

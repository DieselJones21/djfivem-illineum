import styled from 'styled-components';
import { envy, rgb } from '../../theme/envy';

export const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  overflow: hidden;
  padding: 4.5vh 1.6vw;
  gap: 12px;
`;

export const Container = styled.div`
  height: 91vh;
  width: 340px;
  max-width: 340px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  background: ${envy.bg};
  border: ${envy.border};
  border-radius: ${props => props.theme.borderRadius || '14px'};
  box-shadow: ${envy.panelShadow};
  overflow: hidden;
  position: relative;
`;

export const PanelHeader = styled.header`
  flex-shrink: 0;
  padding: 12px 16px 14px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4px;
  background: ${envy.headerGradient};
  border-bottom: 1px solid rgba(0, 229, 255, 0.28);
  position: relative;

  &::after {
    content: '';
    position: absolute;
    left: 16px;
    right: 16px;
    bottom: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, ${rgb(undefined, '0, 229, 255')}, transparent);
    background: linear-gradient(
      90deg,
      transparent,
      ${props => rgb(props.theme.primaryBackground, '0, 229, 255')},
      transparent
    );
    box-shadow: 0 0 12px rgba(0, 229, 255, 0.7);
  }
`;

export const KickerRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`;

export const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const Crown = styled.span`
  width: 10px;
  height: 10px;
  clip-path: polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%);
  background: ${envy.chromeGradient};
  box-shadow: 0 0 8px ${envy.cyan};
  flex-shrink: 0;
`;

export const Kicker = styled.span`
  color: ${props => rgb(props.theme.primaryBackground, '0, 229, 255')};
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  text-shadow: 0 0 12px rgba(0, 229, 255, 0.55);
`;

export const Heading = styled.h1`
  font-size: 20px;
  line-height: 1.15;
  font-weight: 800;
  color: ${props => rgb(props.theme.fontColor, '244, 247, 250')};
  text-transform: uppercase;
  letter-spacing: 0.04em;
  text-shadow: 0 2px 12px rgba(0, 0, 0, 0.45);
`;

export const PanelBody = styled.div`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: stretch;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${props => rgb(props.theme.primaryBackground, '0, 229, 255', 0.35)};
    border-radius: 999px;
  }
`;

export const FlexWrapper = styled.div`
  width: 100%;
  display: flex;

  > div {
    & + div {
      margin-left: 10px;
    }
  }
`;

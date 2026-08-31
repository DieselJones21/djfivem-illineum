import { useState, useRef, useEffect, ReactElement, useCallback, ReactNode } from 'react';
import styled, { css } from 'styled-components';
import {
  FaVideo,
  FaStreetView,
  FaUndo,
  FaRedo,
  FaSmile,
  FaMale,
  FaShoePrints,
  FaSave,
  FaTimes,
  FaTshirt,
  FaHatCowboy,
  FaSocks,
} from 'react-icons/fa';
import { GiClothes } from 'react-icons/gi';

import { CameraState, ClothesState, RotateState } from './interfaces';
import { envy, rgb } from '../../theme/envy';

interface ToggleButtonProps {
  active: boolean;
}

interface ToggleOptionProps {
  active: boolean;
  onClick: () => void;
  children?: ReactNode;
}

interface ExtendendContainerProps {
  width: number;
}

interface ExtendendOptionProps {
  icon: ReactElement;
  children?: ReactNode;
}

interface OptionsProps {
  camera: CameraState;
  rotate: RotateState;
  clothes: ClothesState;
  handleSetClothes: (key: keyof ClothesState) => void;
  handleSetCamera: (key: keyof CameraState) => void;
  handleTurnAround: () => void;
  handleRotateLeft: () => void;
  handleRotateRight: () => void;
  handleSave: () => void;
  handleExit: () => void;
  enableExit: boolean;
}

const Container = styled.div`
  height: 91vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 10px;
  background: ${envy.bg};
  border: ${envy.border};
  border-radius: ${props => props.theme.borderRadius || '14px'};
  box-shadow: ${envy.panelShadow};

  > * {
    & + * {
      margin-top: 8px;
    }
  }
`;

const iconButton = css`
  height: 40px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: ${envy.border};
  border-radius: ${props => props.theme.borderRadius || '10px'};
  box-shadow: ${envy.insetChrome};
  transition: background 120ms ease, border-color 120ms ease, box-shadow 120ms ease, color 120ms ease;
  color: ${props => rgb(props.theme.fontColor, '244, 247, 250', 0.92)};
  background: ${envy.item};
`;

const ToggleButton = styled.button<ToggleButtonProps>`
  ${iconButton}

  &:hover {
    color: ${props => rgb(props.theme.fontColor, '244, 247, 250')};
    background: ${envy.itemHover};
    border-color: ${props => rgb(props.theme.primaryBackground, '0, 229, 255')};
    box-shadow: ${envy.glow};
    ${props => (props.theme.scaleOnHover ? 'transform: scale(1.05);' : '')}
  }

  &:active {
    transform: scale(0.94);
  }

  ${({ active }) =>
    active &&
    css`
      color: ${envy.ink};
      background: ${props => rgb(props.theme.primaryBackgroundSelected, '0, 229, 255')};
      border-color: ${props => rgb(props.theme.primaryBackgroundSelected, '0, 229, 255')};
      box-shadow: ${envy.glowStrong};

      &:hover {
        color: ${envy.ink};
        background: ${props => rgb(props.theme.primaryBackgroundSelected, '0, 229, 255')};
      }
    `}
`;

const Option = styled.button<{ accent?: boolean; danger?: boolean }>`
  ${iconButton}
  flex-shrink: 0;
  position: relative;

  ${({ accent }) =>
    accent &&
    css`
      color: ${envy.ink};
      background: ${props => rgb(props.theme.primaryBackground, '0, 229, 255')};
      border-color: ${props => rgb(props.theme.primaryBackground, '0, 229, 255')};
      box-shadow: ${envy.glow};
    `}

  ${({ danger }) =>
    danger &&
    css`
      color: ${envy.danger};
      border-color: rgba(255, 92, 122, 0.55);
    `}

  &:hover {
    color: ${props => (props.accent ? envy.ink : rgb(props.theme.fontColorHover, '244, 247, 250'))};
    background: ${props =>
      props.danger ? 'rgba(255, 92, 122, 0.12)' : props.accent ? rgb(props.theme.primaryBackground, '0, 229, 255') : envy.itemHover};
    border-color: ${props =>
      props.danger ? envy.danger : rgb(props.theme.primaryBackground, '0, 229, 255')};
    box-shadow: ${envy.glow};
    ${props => (props.theme.scaleOnHover ? 'transform: scale(1.05);' : '')}
  }

  &:active {
    transform: scale(0.94);
  }
`;

const ExtendedContainer = styled.div<ExtendendContainerProps>`
  height: 40px;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  width: ${({ width }) => `${width + 40}px`};
  transition: width 0.3s;
  overflow: hidden;
`;

const ExtendedIcon = styled.div`
  ${iconButton}
  flex-shrink: 0;
  color: ${props => rgb(props.theme.primaryBackground, '0, 229, 255')};
`;

const ExtendedChildren = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  padding-left: 8px;

  > * {
    & + * {
      margin-left: 8px;
    }
  }
`;

const ToggleOption: React.FC<ToggleOptionProps> = ({ children, active, onClick }) => {
  return (
    <ToggleButton type="button" active={active} onClick={onClick}>
      {children}
    </ToggleButton>
  );
};

const ExtendedOption: React.FC<ExtendendOptionProps> = ({ children, icon }) => {
  const [extended, setExtended] = useState(true);

  const [width, setWidth] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      setWidth(ref.current.offsetWidth);
      setExtended(false);
    }
  }, [ref, setWidth]);

  const handleMouseEnter = useCallback(() => {
    setExtended(true);
  }, [setExtended]);

  const handleMouseLeave = useCallback(() => {
    setExtended(false);
  }, [setExtended]);

  return (
    <ExtendedContainer width={extended ? width : 0} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <ExtendedIcon>{icon}</ExtendedIcon>
      <ExtendedChildren ref={ref}>{children}</ExtendedChildren>
    </ExtendedContainer>
  );
};

const Options: React.FC<OptionsProps> = ({
  camera,
  rotate,
  clothes,
  handleSetClothes,
  handleSetCamera,
  handleTurnAround,
  handleRotateLeft,
  handleRotateRight,
  handleExit,
  handleSave,
  enableExit,
}) => {
  return (
    <Container>
      <ExtendedOption icon={<FaVideo size={18} />}>
        <ToggleOption active={camera.head} onClick={() => handleSetCamera('head')}>
          <FaSmile size={18} />
        </ToggleOption>
        <ToggleOption active={camera.body} onClick={() => handleSetCamera('body')}>
          <FaMale size={18} />
        </ToggleOption>
        <ToggleOption active={camera.bottom} onClick={() => handleSetCamera('bottom')}>
          <FaShoePrints size={18} />
        </ToggleOption>
      </ExtendedOption>
      <ExtendedOption icon={<GiClothes size={18} />}>
        <ToggleOption active={clothes.head} onClick={() => handleSetClothes('head')}>
          <FaHatCowboy size={18} />
        </ToggleOption>
        <ToggleOption active={clothes.body} onClick={() => handleSetClothes('body')}>
          <FaTshirt size={18} />
        </ToggleOption>
        <ToggleOption active={clothes.bottom} onClick={() => handleSetClothes('bottom')}>
          <FaSocks size={18} />
        </ToggleOption>
      </ExtendedOption>
      <Option onClick={handleTurnAround}>
        <FaStreetView size={18} />
      </Option>
      <ToggleOption active={rotate.left} onClick={handleRotateLeft}>
        <FaRedo size={18} />
      </ToggleOption>
      <ToggleOption active={rotate.right} onClick={handleRotateRight}>
        <FaUndo size={18} />
      </ToggleOption>
      <Option accent onClick={handleSave}>
        <FaSave size={18} />
      </Option>
      {enableExit && (
        <Option danger onClick={handleExit}>
          <FaTimes size={18} />
        </Option>
      )}
    </Container>
  );
};

export default Options;

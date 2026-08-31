import { useCallback } from 'react';
import styled, { css } from 'styled-components';
import { envy, rgb } from '../../../theme/envy';

interface ColorInputProps {
  title?: string;
  colors?: number[][];
  defaultValue?: number;
  clientValue?: number;
  onChange: (value: number) => void;
}

interface ButtonProps {
  selected: boolean;
}

const Container = styled.div`
  width: 100%;

  > span {
    width: 100%;
    display: flex;
    justify-content: space-between;
    font-weight: 600;
    letter-spacing: 0.04em;
    color: ${envy.chromeMid};
    font-size: 12px;
  }

  > div {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: flex-start;
    margin-top: 10px;
    gap: 3px;
  }
`;

const Swatch = styled.button<ButtonProps>`
  height: 18px;
  width: 18px;
  border: 2px solid rgba(0, 0, 0, 0.35);
  border-radius: 4px;
  margin: 0;

  &:hover {
    border: 2px solid ${props => rgb(props.theme.primaryBackground, '0, 229, 255', 0.7)};
    box-shadow: ${envy.glow};
    ${props => (props.theme.scaleOnHover ? 'transform: scale(1.1);' : '')}
  }

  ${({ selected }) =>
    selected &&
    css`
      border: 2px solid ${envy.cyan};
      box-shadow: ${envy.glowStrong};
    `}
`;

const ColorInput: React.FC<ColorInputProps> = ({ title, colors = [], defaultValue, clientValue, onChange }) => {
  const selectColor = useCallback(
    (color: number) => {
      onChange(color);
    },
    [onChange],
  );

  return (
    <Container>
      <span>
        <small>{`${title}: ${defaultValue}`}</small>
        <small>{clientValue}</small>
      </span>
      <div>
        {colors.map((color, index) => (
          <Swatch
            key={index}
            style={{ backgroundColor: `rgb(${color[0]}, ${color[1]}, ${color[2]})` }}
            selected={defaultValue === index}
            onClick={() => selectColor(index)}
          />
        ))}
      </div>
    </Container>
  );
};

export default ColorInput;

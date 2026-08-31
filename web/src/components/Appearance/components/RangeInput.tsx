import { useCallback, useRef } from 'react';
import styled from 'styled-components';
import { envy, rgb } from '../../../theme/envy';

interface RangeInputProps {
  title?: string;
  min: number;
  max: number;
  factor?: number;
  defaultValue?: number;
  clientValue?: number;
  onChange: (value: number) => void;
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
    display: flex;
    align-items: center;
    position: relative;
    margin-top: 10px;

    > small {
      font-weight: 600;
      font-size: 10px;
      color: ${envy.muted};
      min-width: 18px;
    }
  }

  input[type='range'] {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 8px;
    background: rgba(255, 255, 255, 0.08);
    outline: none;
    opacity: 1;
    border-radius: 999px;
    margin: 0 10px;
  }

  input[type='range']::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 16px;
    height: 16px;
    background: ${envy.chromeHi};
    cursor: pointer;
    border-radius: 999px;
    border: 2px solid ${props => rgb(props.theme.primaryBackground, '0, 229, 255')};
    box-shadow: ${envy.glow};
  }

  input[type='range']::-webkit-slider-runnable-track {
    height: 8px;
    border-radius: 999px;
  }
`;

const RangeInput: React.FC<RangeInputProps> = ({
  min,
  max,
  factor = 1,
  title,
  defaultValue = 1,
  clientValue,
  onChange,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleContainerClick = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  const handleChange = useCallback(
    (e: { target: { value: string } }) => {
      const parsedValue = parseFloat(e.target.value);
      onChange(parsedValue);
    },
    [onChange],
  );

  const percent = ((Number(defaultValue) - min) / (max - min || 1)) * 100;

  return (
    <Container onClick={handleContainerClick}>
      <span>
        <small>
          {title}: {defaultValue}
        </small>
        <small>{clientValue}</small>
      </span>
      <div>
        <small>{min}</small>
        <input
          type="range"
          ref={inputRef}
          value={defaultValue}
          min={min}
          max={max}
          step={factor}
          onChange={handleChange}
          style={{
            background: `linear-gradient(90deg, ${envy.cyanDeep} 0%, ${envy.cyan} ${percent}%, rgba(255,255,255,0.08) ${percent}%)`,
          }}
        />
        <small>{max}</small>
      </div>
    </Container>
  );
};

export default RangeInput;

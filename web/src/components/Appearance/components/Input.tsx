import { useCallback, useRef } from 'react';
import styled from 'styled-components';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { envy, rgb } from '../../../theme/envy';

interface InputProps {
  title?: string;
  min?: number;
  max?: number;
  blacklisted?: number[];
  defaultValue: number;
  clientValue: number;
  onChange: (value: number) => void;
}

const Container = styled.div`
  min-width: 0;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin-top: ${({ title }) => (title ? '5px' : '0')};

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
    min-width: 0;
    height: 34px;
    display: flex;
    align-items: center;
    margin-top: 8px;

    button {
      height: 100%;
      min-width: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: ${props => rgb(props.theme.primaryBackground, '0, 229, 255')};
      outline: 0;
      border: ${envy.border};
      border-radius: 8px;
      background: ${envy.item};
      box-shadow: ${envy.insetChrome};
      transition: background 120ms ease, box-shadow 120ms ease, border-color 120ms ease;

      &:hover {
        color: ${props => rgb(props.theme.fontColorHover, '244, 247, 250')};
        background: ${envy.itemHover};
        border-color: ${props => rgb(props.theme.primaryBackground, '0, 229, 255')};
        box-shadow: ${envy.glow};
        ${props => (props.theme.smoothBackgroundTransition ? 'transition: background 0.2s;' : '')}
        ${props => (props.theme.scaleOnHover ? 'transform: scale(1.05);' : '')}
      }
    }

    input {
      min-width: 0;
      height: 100%;
      flex-grow: 1;
      flex-shrink: 1;
      text-align: center;
      font-size: 13px;
      font-weight: 600;
      color: ${props => rgb(props.theme.fontColor, '244, 247, 250')};
      border: ${envy.border};
      border-radius: 8px;
      margin: 0 4px;
      background: ${props => rgb(props.theme.secondaryBackground, '6, 8, 12', 0.9)};
      box-shadow: ${envy.insetChrome};

      &:focus {
        border-color: ${props => rgb(props.theme.primaryBackground, '0, 229, 255')};
        box-shadow: ${envy.glow};
      }

      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
    }
  }
`;

const Input: React.FC<InputProps> = ({
  title,
  min = 0,
  max = 255,
  blacklisted = [],
  defaultValue,
  clientValue,
  onChange,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleContainerClick = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  const isBlacklisted = function (_value: number, list: number[]) {
    for (let i = 0; i < list.length; i++) {
      if (list[i] == _value) {
        return true;
      }
    }
    return false;
  };

  const normalize = function (_value: number) {
    if (_value < min) {
      _value = max;
    } else if (_value > max) {
      _value = min;
    }

    return _value;
  };

  const checkBlacklisted = function (_value: number, list: number[], factor: number) {
    if (factor === 0) {
      if (!isBlacklisted(_value, list)) {
        return normalize(_value);
      }
      factor = _value > defaultValue ? 1 : -1;
    }

    do {
      _value = normalize(_value + factor);
    } while (isBlacklisted(_value, list));
    return _value;
  };

  const getSafeValue = useCallback(
    (_value: number, factor: number) => {
      let safeValue = _value;

      return checkBlacklisted(safeValue, blacklisted, factor);
    },
    [min, max, blacklisted],
  );

  const handleChange = useCallback(
    (_value: any, factor: number) => {
      let parsedValue;

      if (!_value && _value !== 0) return;

      if (Number.isNaN(_value)) return;

      if (typeof _value === 'string') {
        parsedValue = parseInt(_value);
      } else {
        parsedValue = _value;
      }

      const safeValue = getSafeValue(parsedValue, factor);

      onChange(safeValue);
    },
    [getSafeValue, onChange],
  );

  return (
    <Container onClick={handleContainerClick}>
      <span>
        <small>{title}</small>
        <small>
          {clientValue} / {max}
        </small>
      </span>
      <div>
        <button type="button" onClick={() => handleChange(defaultValue, -1)}>
          <FiChevronLeft strokeWidth={3} />
        </button>
        <input type="number" ref={inputRef} value={defaultValue} onChange={e => handleChange(e.target.value, 0)} />
        <button type="button" onClick={() => handleChange(defaultValue, 1)}>
          <FiChevronRight strokeWidth={3} />
        </button>
      </div>
    </Container>
  );
};

export default Input;

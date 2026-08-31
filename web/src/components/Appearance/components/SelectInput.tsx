import { useContext, useMemo, useRef } from 'react';
import styled, { ThemeContext } from 'styled-components';
import Select from 'react-select';
import { envy } from '../../../theme/envy';
import { getSelectStyles } from '../../../theme/envy';

interface SelectInputProps {
  title: string;
  items: string[];
  defaultValue: string;
  clientValue: string;
  onChange: (value: string) => void;
}

const Container = styled.div`
  min-width: 0;
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  > span {
    width: 100%;
    display: flex;
    justify-content: space-between;
    font-weight: 600;
    letter-spacing: 0.04em;
    color: ${envy.chromeMid};
    font-size: 12px;
  }
`;

const SelectInput = ({ title, items, defaultValue, clientValue, onChange }: SelectInputProps) => {
  const selectRef = useRef<any>(null);
  const themeContext = useContext(ThemeContext);
  const styles = useMemo(() => getSelectStyles(themeContext), [themeContext]);

  const handleChange = (event: any, { action }: any): void => {
    if (action === 'select-option') {
      onChange(event.value);
    }
  };

  const onMenuOpen = () => {
    setTimeout(() => {
      const selectedEl = document.getElementsByClassName('Select' + title + '__option--is-selected')[0];
      if (selectedEl) {
        selectedEl.scrollIntoView({ behavior: 'auto', block: 'start', inline: 'nearest' });
      }
    }, 100);
  };

  return (
    <Container>
      <span>
        <small>{title}</small>
        <small>{clientValue}</small>
      </span>
      <Select
        ref={selectRef}
        styles={styles}
        options={items.map(item => ({ value: item, label: item }))}
        value={{ value: defaultValue, label: defaultValue }}
        onChange={handleChange}
        onMenuOpen={onMenuOpen}
        className={'Select' + title}
        classNamePrefix={'Select' + title}
        menuPortalTarget={document.body}
      />
    </Container>
  );
};

export default SelectInput;

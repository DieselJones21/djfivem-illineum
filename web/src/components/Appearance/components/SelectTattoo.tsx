import { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import styled, { ThemeContext } from 'styled-components';
import Select from 'react-select';
import { useNuiState } from '../../../hooks/nuiState';
import Button from './Button';
import { Tattoo } from '../interfaces';
import RangeInput from './RangeInput';
import { TattoosSettings } from '../interfaces';
import { getSelectStyles } from '../../../theme/envy';

interface SelectTattooProps {
  items: Tattoo[];
  tattoosApplied: Tattoo[] | null;
  handleApplyTattoo: (value: Tattoo, opacity: number) => void;
  handlePreviewTattoo: (value: Tattoo, opacity: number) => void;
  handleDeleteTattoo: (value: Tattoo) => void;
  settings: TattoosSettings;
}

const Container = styled.div`
  min-width: 0;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 10px;

  > section {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }
`;

const SelectTattoo = ({
  items,
  tattoosApplied,
  handleApplyTattoo,
  handlePreviewTattoo,
  handleDeleteTattoo,
  settings,
}: SelectTattooProps) => {
  const defaultOpacity = 0.1;
  const selectRef = useRef<any>(null);
  const [currentTattoo, setCurrentTattoo] = useState<Tattoo>(items[0]);
  const [opacity, setOpacity] = useState<number>(defaultOpacity);
  const { label } = currentTattoo;
  const { locales } = useNuiState();
  const themeContext = useContext(ThemeContext);
  const styles = useMemo(() => getSelectStyles(themeContext), [themeContext]);

  const clientOpacity = useCallback(() => {
    if (!tattoosApplied) return defaultOpacity;
    const { name } = currentTattoo;
    for (let i = 0; i < tattoosApplied.length; i++) {
      const { name: nameApplied } = tattoosApplied[i];
      if (nameApplied === name) {
        return tattoosApplied[i].opacity ?? defaultOpacity;
      }
    }

    return defaultOpacity;
  }, [currentTattoo, tattoosApplied])();

  useEffect(() => {
    setOpacity(clientOpacity);
  }, [clientOpacity]);

  const handleChange = (event: any, { action }: any): void => {
    if (action === 'select-option') {
      handlePreviewTattoo(event.value, opacity);
      setCurrentTattoo(event.value);
    }
  };

  const handleChangeOpacity = useCallback(
    (value: number) => {
      setOpacity(value);
      handlePreviewTattoo(currentTattoo, value);
    },
    [currentTattoo],
  );

  const onMenuOpen = () => {
    setTimeout(() => {
      const selectedEl = document.getElementsByClassName(
        'TattooDropdown' + items[0].zone + '__option--is-selected',
      )[0];
      if (selectedEl) {
        selectedEl.scrollIntoView({ behavior: 'auto', block: 'start', inline: 'nearest' });
      }
    }, 100);
  };

  const isTattooApplied = useCallback(() => {
    if (!tattoosApplied) return false;
    const { name } = currentTattoo;
    for (let i = 0; i < tattoosApplied.length; i++) {
      const { name: nameApplied } = tattoosApplied[i];
      if (nameApplied === name) return true;
    }

    return false;
  }, [tattoosApplied, currentTattoo])();

  if (!locales) {
    return null;
  }

  return (
    <Container>
      <Select
        ref={selectRef}
        styles={styles}
        options={items.map(item => ({ value: item, label: item.label }))}
        value={{ value: currentTattoo, label }}
        onChange={handleChange}
        onMenuOpen={onMenuOpen}
        className={'TattooDropdown' + items[0].zone}
        classNamePrefix={'TattooDropdown' + items[0].zone}
        menuPortalTarget={document.body}
        menuShouldScrollIntoView={true}
      />
      <RangeInput
        title={locales.tattoos.opacity}
        min={settings.opacity.min}
        max={settings.opacity.max}
        factor={settings.opacity.factor}
        defaultValue={opacity}
        clientValue={clientOpacity}
        onChange={value => handleChangeOpacity(value)}
      />
      <section>
        {isTattooApplied ? (
          <Button variant="danger" onClick={() => handleDeleteTattoo(currentTattoo)}>
            {locales.tattoos.delete}
          </Button>
        ) : (
          <Button variant="filled" onClick={() => handleApplyTattoo(currentTattoo, opacity)}>
            {locales.tattoos.apply}
          </Button>
        )}
      </section>
    </Container>
  );
};

export default SelectTattoo;

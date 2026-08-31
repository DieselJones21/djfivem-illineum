/** Visual tokens matching DieselJones21/djfivem-oxlib (Envy ox_lib). */

export const envyPalette = [
  '#E7FFFF',
  '#B4FBFF',
  '#7CF5FF',
  '#3DEAFF',
  '#12E0FF',
  '#00D4F0',
  '#00C0DC',
  '#00A4BC',
  '#008498',
  '#006070',
] as const;

export const envy = {
  cyan: '#00E5FF',
  cyanSoft: '#7AFFF8',
  cyanDeep: '#00A8BE',
  chromeHi: '#F4F7FA',
  chromeMid: '#C5CDD6',
  chromeLo: '#7A8590',
  text: '#F4F7FA',
  muted: '#9AA8B3',
  danger: '#FF5C7A',
  success: '#3DFFC8',
  warning: '#FFD166',
  ink: '#061014',
  bg: 'rgba(6, 8, 12, 0.94)',
  bgRaised: 'rgba(10, 14, 20, 0.96)',
  item: 'rgba(12, 16, 22, 0.92)',
  itemHover: 'rgba(0, 229, 255, 0.10)',
  itemActive: 'rgba(0, 229, 255, 0.16)',
  radius: 14,
  radiusSm: 10,
  border: '1px solid rgba(0, 229, 255, 0.42)',
  borderStrong: '1px solid rgba(0, 229, 255, 0.78)',
  glow: '0 0 22px rgba(0, 229, 255, 0.22)',
  glowStrong: '0 0 28px rgba(0, 229, 255, 0.42)',
  insetChrome: 'inset 0 1px 0 rgba(255, 255, 255, 0.16), inset 0 -1px 0 rgba(0, 0, 0, 0.45)',
  panelShadow:
    '0 18px 48px rgba(0, 0, 0, 0.55), 0 0 24px rgba(0, 229, 255, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.12)',
  headerGradient: 'linear-gradient(180deg, rgba(36, 44, 54, 0.96) 0%, rgba(10, 13, 18, 0.98) 100%)',
  chromeGradient: 'linear-gradient(180deg, #F7FAFC 0%, #C5CDD6 42%, #8A949E 58%, #E8EEF4 100%)',
};

export const envyThemeLua = {
  id: 'envy',
  borderRadius: '14px',
  fontColor: '244, 247, 250',
  fontColorHover: '244, 247, 250',
  fontColorSelected: '6, 16, 20',
  fontFamily: 'Roboto',
  primaryBackground: '0, 229, 255',
  primaryBackgroundSelected: '0, 229, 255',
  secondaryBackground: '6, 8, 12',
  scaleOnHover: false,
  sectionFontWeight: '800',
  smoothBackgroundTransition: true,
};

export const rgb = (value: string | undefined, fallback: string, alpha?: number): string => {
  const color = value || fallback;
  if (alpha === undefined) {
    return `rgb(${color})`;
  }
  return `rgba(${color}, ${alpha})`;
};

export const getSelectStyles = (theme: any): any => {
  const accent = theme?.primaryBackground || '0, 229, 255';
  const bg = theme?.secondaryBackground || '6, 8, 12';
  const text = theme?.fontColor || '244, 247, 250';
  const radius = theme?.borderRadius || '10px';

  return {
    control: (styles: any, state: any) => ({
      ...styles,
      marginTop: '8px',
      minHeight: 36,
      background: rgb(bg, '6, 8, 12', 0.9),
      fontSize: '13px',
      fontWeight: 500,
      color: rgb(text, '244, 247, 250'),
      border: state.isFocused ? `1px solid ${rgb(accent, '0, 229, 255')}` : envy.border,
      outline: 'none',
      boxShadow: state.isFocused ? envy.glow : envy.insetChrome,
      borderRadius: radius,
      cursor: 'pointer',
      '&:hover': {
        borderColor: rgb(accent, '0, 229, 255'),
      },
    }),
    placeholder: (styles: any) => ({
      ...styles,
      fontSize: '13px',
      color: envy.muted,
    }),
    input: (styles: any) => ({
      ...styles,
      fontSize: '13px',
      color: rgb(text, '244, 247, 250'),
    }),
    singleValue: (styles: any) => ({
      ...styles,
      fontSize: '13px',
      color: rgb(text, '244, 247, 250'),
      border: 'none',
      outline: 'none',
    }),
    indicatorSeparator: () => ({
      display: 'none',
    }),
    dropdownIndicator: (styles: any) => ({
      ...styles,
      color: rgb(accent, '0, 229, 255'),
      '&:hover': {
        color: envy.cyanSoft,
      },
    }),
    menuPortal: (styles: any) => ({
      ...styles,
      color: rgb(text, '244, 247, 250'),
      zIndex: 9999,
    }),
    menu: (styles: any) => ({
      ...styles,
      background: envy.bgRaised,
      border: envy.border,
      boxShadow: envy.panelShadow,
      borderRadius: radius,
      overflow: 'hidden',
      marginTop: 6,
    }),
    menuList: (styles: any) => ({
      ...styles,
      background: 'transparent',
      padding: 6,
      '&::-webkit-scrollbar': {
        width: '6px',
      },
      '&::-webkit-scrollbar-track': {
        background: 'none',
      },
      '&::-webkit-scrollbar-thumb': {
        borderRadius: '999px',
        background: rgb(accent, '0, 229, 255', 0.45),
      },
    }),
    option: (styles: any, { isFocused, isSelected }: any) => ({
      ...styles,
      borderRadius: 8,
      width: '100%',
      fontSize: 13,
      fontWeight: isSelected ? 700 : 500,
      color: isSelected ? rgb(accent, '0, 229, 255') : rgb(text, '244, 247, 250'),
      background: isSelected ? envy.itemActive : isFocused ? envy.itemHover : 'transparent',
      cursor: 'pointer',
    }),
  };
};

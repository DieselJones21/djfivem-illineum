import { ReactNode } from 'react';
import styled from 'styled-components';
import { envy, rgb } from '../../../theme/envy';

interface ButtonProps {
  children: string | ReactNode;
  margin?: string;
  width?: string;
  onClick: () => void;
  variant?: 'default' | 'filled' | 'danger';
}

const CustomButton = styled.span<ButtonProps>`
  padding: 8px 14px;
  margin: ${props => props?.margin || '0px'};
  width: ${props => props?.width || 'auto'};
  text-align: center;
  border-radius: ${props => props.theme.borderRadius || '10px'};
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  font-size: 12px;
  cursor: pointer;
  transition: box-shadow 120ms ease, border-color 120ms ease, background 120ms ease;

  ${props => {
    if (props.variant === 'filled') {
      return `
        color: ${envy.ink};
        background: ${rgb(props.theme.primaryBackground, '0, 229, 255')};
        border: 1px solid ${rgb(props.theme.primaryBackground, '0, 229, 255')};
        box-shadow: ${envy.glow};
        &:hover {
          box-shadow: ${envy.glowStrong};
        }
      `;
    }
    if (props.variant === 'danger') {
      return `
        color: ${envy.danger};
        background: ${envy.item};
        border: 1px solid rgba(255, 92, 122, 0.55);
        box-shadow: ${envy.insetChrome};
        &:hover {
          background: rgba(255, 92, 122, 0.12);
          box-shadow: 0 0 18px rgba(255, 92, 122, 0.25);
        }
      `;
    }
    return `
      color: ${rgb(props.theme.fontColor, '244, 247, 250', 0.95)};
      background: ${envy.item};
      border: ${envy.border};
      box-shadow: ${envy.insetChrome};
      &:hover {
        background: ${envy.itemHover};
        border-color: ${rgb(props.theme.primaryBackground, '0, 229, 255')};
        box-shadow: ${envy.glow};
      }
    `;
  }}
`;

const Button = ({ children, onClick, margin, width, variant = 'default' }: ButtonProps) => {
  return (
    <CustomButton onClick={onClick} margin={margin} width={width} variant={variant}>
      {children}
    </CustomButton>
  );
};

export default Button;

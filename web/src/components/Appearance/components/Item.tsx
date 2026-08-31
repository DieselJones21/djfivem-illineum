import styled from 'styled-components';
import { ReactNode } from 'react';
import { envy, rgb } from '../../../theme/envy';

interface ItemProps {
  title?: string;
  children?: ReactNode;
}

const Container = styled.div`
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  padding: 10px;
  border-radius: ${props => props.theme.borderRadius || '10px'};
  background: ${envy.item};
  border: ${envy.border};
  box-shadow: ${envy.insetChrome};

  span {
    color: ${props => rgb(props.theme.fontColor, '244, 247, 250')};
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }
`;

const Inputs = styled.div`
  width: 100%;
  display: inline-flex;
  flex-wrap: wrap;

  margin-top: ${props => (props as any).hasTitle ? '10px' : '0'};

  > div {
    & + div {
      margin-top: 10px;
    }
  }
`;

const Item: React.FC<ItemProps> = ({ children, title }) => {
  return (
    <Container>
      {title && <span>{title}</span>}
      <Inputs style={{ marginTop: title ? 10 : 0 }}>{children}</Inputs>
    </Container>
  );
};

export default Item;

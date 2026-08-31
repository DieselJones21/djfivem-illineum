import { useState, useEffect, useRef, ReactNode } from 'react';
import styled, { css } from 'styled-components';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { useSpring, animated } from 'react-spring';
import { envy, rgb } from '../../../theme/envy';

interface SectionProps {
  title: string;
  deps?: any[];
  children?: ReactNode;
  defaultOpen?: boolean;
}

interface HeaderProps {
  active: boolean;
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  color: ${props => rgb(props.theme.fontColor, '244, 247, 250')};
  user-select: none;

  & + div {
    margin-top: 8px;
  }
`;

const Header = styled.div<HeaderProps>`
  width: 100%;
  min-height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  border-radius: ${props => props.theme.borderRadius || '10px'};
  z-index: 2;
  background: ${envy.item};
  border: ${envy.border};
  box-shadow: ${envy.insetChrome};
  transition: background 120ms ease, border-color 120ms ease, box-shadow 120ms ease;
  cursor: pointer;

  &:hover {
    background: ${envy.itemHover};
    border-color: ${props => rgb(props.theme.primaryBackground, '0, 229, 255')};
    box-shadow: ${envy.glow};
    ${props => (props.theme.scaleOnHover ? 'transform: scale(1.02);' : '')}
  }

  ${({ active }) =>
    active &&
    css`
      background: ${envy.itemActive};
      border: ${envy.borderStrong};
      box-shadow: ${envy.glow};
      &:hover {
        background: ${envy.itemActive};
      }
    `}

  span {
    font-size: 13px;
    font-weight: ${props => props.theme.sectionFontWeight || '800'};
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  svg {
    color: ${props => rgb(props.theme.primaryBackground, '0, 229, 255')};
    flex-shrink: 0;
  }
`;

const Items = styled.div`
  padding: 0 0 4px 0;
  overflow: hidden;
`;

const Section: React.FC<SectionProps> = ({ children, title, deps = [], defaultOpen = false }) => {
  const [active, setActive] = useState(defaultOpen);

  const [height, setHeight] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  const props = useSpring({
    height: active ? height : 0,
    opacity: active ? 1 : 0,
  });

  useEffect(() => {
    if (ref.current) {
      setHeight(ref.current.offsetHeight);
    }
  }, [ref, setHeight]);

  useEffect(() => {
    if (ref.current) {
      setHeight(ref.current.offsetHeight);
    }
  }, [ref, setHeight, deps]);

  return (
    <Container>
      <Header active={active} onClick={() => setActive(state => !state)}>
        <span>{title}</span>
        {active ? <FiChevronUp size={18} /> : <FiChevronDown size={18} />}
      </Header>

      <animated.div style={{ ...props, overflow: 'hidden' }}>
        <Items ref={ref}>{children}</Items>
      </animated.div>
    </Container>
  );
};

export default Section;

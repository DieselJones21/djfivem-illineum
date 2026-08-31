import { Overlay, Wrapper, Header, Body, Buttons } from './styles';

interface ModalProps {
  title: string;
  description: string;
  accept: string;
  decline: string;
  handleAccept: () => Promise<void> | void;
  handleDecline: () => Promise<void> | void;
}

const Modal = ({ title, description, accept, decline, handleAccept, handleDecline }: ModalProps) => {
  return (
    <Overlay>
      <Wrapper>
        <Header>
          <p>{title}</p>
        </Header>
        <Body>
          <span>{description}</span>
        </Body>
        <Buttons>
          <button type="button" className="decline" onClick={handleDecline}>
            {decline}
          </button>
          <button type="button" className="accept" onClick={handleAccept}>
            {accept}
          </button>
        </Buttons>
      </Wrapper>
    </Overlay>
  );
};

export default Modal;

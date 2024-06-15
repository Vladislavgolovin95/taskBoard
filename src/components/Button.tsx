import { IButton } from '../types/types';
import styled from 'styled-components';

export const Button: React.FC<IButton> = (props) => {
  const { onClick, text } = props;
  return <Btn onClick={onClick}> {text} </Btn>;
};

const Btn = styled.button`
  margin: auto;
  width: 80px;
  padding: 3px;
  border: 1px solid black;
  border-radius: 5px;
  cursor: pointer;
  background: transparent;
  color: black;
  &:hover {
    opacity: 0.7;
  }
`;

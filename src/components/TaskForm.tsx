import { useState } from 'react';
import styled from 'styled-components';
import { ITaskForm } from '../types/types';
import { Button } from './Button';

export const TaskForm: React.FC<ITaskForm> = (props) => {
  const { name, placeholder, onSubmit } = props;
  const [title, setTitle] = useState('');

  const onSubmitTask = () => {
    setTitle('');
    onSubmit(title);
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') {
      onSubmitTask();
    }
  };

  return (
    <FormWrapper>
      <InputField
        type="text"
        name={name}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
      />
      <Button onClick={onSubmitTask} text="Добавить" />
    </FormWrapper>
  );
};

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto 20px;
  width: 400px;
  height: 60px;
  padding: 5px;
  text-align: center;
  border: 1px solid black;
  border-radius: 5px;
`;
const InputField = styled.input`
  margin-bottom: 5px;
  height: 25px;
  padding: 2px;
  border-radius: 5px;
  font-size: 15px;
  background: transparent;
  outline: none;
  border: none;
  border-bottom: 1px solid;
`;

import { useState } from 'react';
import styled from 'styled-components';
import { ITaskForm } from 'types/types';
import { Button } from 'components/Button';

export const TaskForm: React.FC<ITaskForm> = (props) => {
  const { name, placeholder, onSubmit } = props;
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState(1);

  const onSubmitTask = () => {
    setTitle('');
    setPriority(1);
    onSubmit(title, priority);
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') {
      onSubmitTask();
    }
  };

  return (
    <Form>
      <InputField
        type="text"
        name={name}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
      />
      <ActionWrapper>
        <InputPriority
          type="range"
          min="1"
          max="5"
          value={priority}
          onChange={(e) => setPriority(parseInt(e.target.value))}
        />
        <ValuePriority>Приоритет: {priority}</ValuePriority>
        <Button onClick={onSubmitTask} text="Добавить" />
      </ActionWrapper>
    </Form>
  );
};

const Form = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto 20px;
  width: 400px;
  height: 80px;
  padding: 5px;
  text-align: center;
  border: 1px solid black;
  border-radius: 5px;
`;
const InputField = styled.input`
  margin-bottom: 20px;
  height: 25px;
  padding: 2px;
  border-radius: 5px;
  font-size: 15px;
  background: transparent;
  outline: none;
  border: none;
  border-bottom: 1px solid;
`;
const ActionWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  gap: 40px;
`;
const InputPriority = styled.input`
  position: relative;
  width: 100px;
  cursor: pointer;
  &:before {
    position: absolute;
    content: '1';
    top: 4px;
    left: -7px;
  }
  &:after {
    position: absolute;
    content: '5';
    top: 4px;
    left: 101px;
  }
`;
const ValuePriority = styled.span`
  font-weight: 600;
`;

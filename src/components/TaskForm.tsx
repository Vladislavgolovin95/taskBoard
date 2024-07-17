import { useState } from 'react';
import styled from 'styled-components';
import { ITaskForm } from 'types/types';
import { Button } from 'components/Button';
import { Container, TextField } from '@mui/material';

export const TaskForm: React.FC<ITaskForm> = (props) => {
  const { name, onSubmit } = props;
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
    <Container sx={{ mt: '5px', mb: '30px' }}>
      <TextField
        type="search"
        name={name}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={handleKeyDown}
        multiline
        fullWidth
        label="задача"
        variant="standard"
        sx={{ mb: '5px' }}
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
    </Container>
  );
};

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

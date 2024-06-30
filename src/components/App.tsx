import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { addTaskToFirestore, getTasksToFirestore, removeTaskToFirestore, updateTaskToFirestore } from 'api/api';
import { TaskColumn } from 'components/TaskColumn';
import { TaskForm } from 'components/TaskForm';
import { STATUSES } from 'constants/constants';
import { ITask } from 'types/types';

export const App: React.FC = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);

  useEffect(() => {
    getTasksToFirestore().then((res) => setTasks(res));
  }, []);

  const onCreateTask = (title: string, priority: number) => {
    if (title) {
      addTaskToFirestore({
        id: uuidv4(),
        title: title,
        priority: priority,
        status: 'TODO',
      });
      getTasksToFirestore().then((res) => setTasks(res));
    }
  };

  const onStatusChange = async (id: string, newStatus: string): Promise<void> => {
    await updateTaskToFirestore(id, newStatus);
    await getTasksToFirestore().then((res) => setTasks(res));
  };

  const onRemoveTask = async (id: string): Promise<void> => {
    await removeTaskToFirestore(id);
    await getTasksToFirestore().then((res) => setTasks(res));
  };

  return (
    <AppWrapper>
      <TaskForm name="title" placeholder="Задача" onSubmit={onCreateTask} />
      <Columns>
        {STATUSES.map((status) => (
          <TaskColumn
            key={status}
            tasks={tasks}
            statusName={status}
            onRemoveTask={onRemoveTask}
            onStatusChange={onStatusChange}
          />
        ))}
      </Columns>
    </AppWrapper>
  );
};

const AppWrapper = styled.div`
  margin: 0 auto;
  padding: 10px;
  height: 100vh;
  max-width: 1150px;
`;
const Columns = styled.div`
  display: flex;
  justify-content: space-around;
`;

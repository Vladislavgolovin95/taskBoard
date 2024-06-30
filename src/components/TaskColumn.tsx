import styled from 'styled-components';
import { ITasksColumn } from 'types/types';
import { STATUSES } from 'constants/constants';
import { Button } from 'components/Button';

export const TaskColumn: React.FC<ITasksColumn> = (props) => {
  const { tasks, statusName, onRemoveTask, onStatusChange } = props;
  return (
    <TaskColumnWrapper>
      <Title>{statusName}</Title>
      {tasks
        .filter((task) => task.status === statusName)
        .sort((a, b) => b.priority - a.priority)
        .map((task) => (
          <TaskCard key={task.id}>
            <Subtitle>{task.title}</Subtitle>
            <ActionWrapper>
              <Select defaultValue={statusName} onChange={(e) => onStatusChange(task.id, e.target.value)}>
                {STATUSES.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </Select>
              <p>Приоритет {task.priority}</p>
              <Button onClick={() => onRemoveTask(task.id)} text="Удалить" />
            </ActionWrapper>
          </TaskCard>
        ))}
    </TaskColumnWrapper>
  );
};

const TaskColumnWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  min-width: 300px;
  text-align: center;
`;
const TaskCard = styled.li`
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  width: 300px;
  padding: 5px;
  gap: 20px;
  border-radius: 5px;
  text-align: center;
  background-color: #07f2ee;
`;
const Select = styled.select`
  //margin-right: 120px;
  width: 80px;
  border-radius: 5px;
  text-align: center;
  background: transparent;
  cursor: pointer;
`;
const Title = styled.h2`
  margin-bottom: 10px;
  text-decoration: underline;
`;
const Subtitle = styled.h3`
  margin-bottom: 5px;
`;
const ActionWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

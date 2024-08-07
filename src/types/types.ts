export interface ITask {
  id: string;
  title: string;
  status: string;
  priority: number;
}

export interface ITasksColumn {
  tasks: ITask[];
  statusName: string;
  onRemoveTask: (id: string) => void;
  onStatusChange: (id: string, newTask: string) => void;
}

export interface ITaskForm {
  name: string;
  onSubmit: (title: string, priority: number) => void;
}

export interface IButton {
  text: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

import dayjs from '@utils/libs/dayjs';

export type Task = {
  id: string;
  title: string;
  description: string | null;
  is_done: boolean;
  timestamp: string;
  created_at: string;
  user_id: string;
};

let tasks: Task[] = [
  {
    id: 'task-1',
    title: 'Close off Case #012920- RODRIGUES, Amiguel',
    description:
      'Closing off this case since this application has been cancelled. No one really understand how this case could possibly be cancelled. The options and the documents within this document were totally a guaranteed for a success!',
    timestamp: dayjs().add(2, 'day').toISOString(),
    created_at: dayjs().toISOString(),
    is_done: false,
    user_id: 'u125',
  },
  {
    id: 'task-2',
    title:
      'Set up documentation report for several Cases : Case 145443, Case 192829 and Case 182203',
    description:
      'All Cases must include all payment transactions, all documents and forms filled. All conversations in comments and messages in channels and emails should be provided as well in.',
    timestamp: dayjs().add(4, 'day').toISOString(),
    created_at: dayjs().toISOString(),
    is_done: false,
    user_id: 'u125',
  },
  {
    id: 'task-3',
    title: 'Set up appointment with Dr Blake',
    description: null,
    timestamp: dayjs().add(10, 'day').toISOString(),
    created_at: dayjs().toISOString(),
    is_done: false,
    user_id: 'u125',
  },
  {
    id: 'task-4',
    title: 'Contact Mr Caleb - video conference?',
    description: null,
    timestamp: dayjs().add(2, 'day').toISOString(),
    created_at: dayjs().toISOString(),
    is_done: true,
    user_id: 'u125',
  },
  {
    id: 'task-5',
    title: 'Assign 3 homework to Client A',
    description: null,
    timestamp: dayjs().add(2, 'day').toISOString(),
    created_at: dayjs().toISOString(),
    is_done: true,
    user_id: 'u125',
  },
];

const TaskService = {
  getTasks(userId: string): Promise<Task[]> {
    const result = tasks.filter(({ user_id }) => user_id === userId);
    return new Promise((resolve) => {
      setTimeout(() => resolve(result), 1000 * 3);
    });
  },

  updateTaskById(
    taskId: string,
    payload: Partial<Task>,
  ): Promise<Task | undefined | null> {
    const currentChat = tasks.find((task) => task.id === taskId);

    if (!currentChat) {
      throw new Error('chat not found');
    }

    tasks = tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          ...payload,
        };
      }

      return task;
    });
    const updatedChat = tasks.find((task) => task.id === taskId);

    return new Promise((resolve) => {
      setTimeout(() => resolve(updatedChat), 1000 * 3);
    });
  },

  deleteTaskById(taskId: string): Promise<void> {
    tasks = tasks.filter((task) => task.id !== taskId);

    return new Promise((resolve) => {
      setTimeout(() => resolve(), 1000 * 3);
    });
  },
};

export default TaskService;

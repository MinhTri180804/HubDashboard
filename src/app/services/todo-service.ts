import { Injectable } from '@angular/core';
import { TodoInfo } from '../types/todo';
import { StateTodoEnum } from '../enums/stateTodoEnum';
import { EmployeeInfo } from '../types/employee';
import { TagInfo } from '../types/tag';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  todos: TodoInfo[] = [...mockTodoPending];

  constructor() {}

  getTodos() {
    return this.todos;
  }

  addTodo(todo: TodoInfo) {
    this.todos.push(todo);
  }

  removeTodo(todo: TodoInfo) {
    this.todos = this.todos.filter((item) => item.id !== todo.id);
  }

  updateStateTodo(index: number, state: StateTodoEnum) {
    this.todos[index].state = state;
  }

  getTodoByState(state: StateTodoEnum) {
    return this.todos.filter((item) => item.state === state);
  }

  updateSubTodo(todoId: string, subTodoId: string, isDone: boolean) {
    const todo = this.todos.find((todo) => todo.id === todoId);
    if (todo) {
      const subTodo = todo.subTodo?.find((subTodo) => subTodo.id === subTodoId);
      if (subTodo) {
        subTodo.isDone = isDone;
        this.todos = [...this.todos];
      }
    }
  }
}

const mockEmployees: EmployeeInfo[] = [
  { name: 'Nguyễn Văn An', avatar: 'https://i.pravatar.cc/40?img=1' },
  { name: 'Trần Thị Bình', avatar: 'https://i.pravatar.cc/40?img=2' },
  { name: 'Lê Hoàng Cường', avatar: 'https://i.pravatar.cc/40?img=3' },
  { name: 'Phạm Thị Dung', avatar: 'https://i.pravatar.cc/40?img=4' },
  { name: 'Hoàng Văn Em', avatar: 'https://i.pravatar.cc/40?img=5' },
  { name: 'Vũ Thị Phương', avatar: 'https://i.pravatar.cc/40?img=6' },
  { name: 'Đặng Minh Giang', avatar: 'https://i.pravatar.cc/40?img=7' },
  { name: 'Ngô Thị Hạnh', avatar: 'https://i.pravatar.cc/40?img=8' },
  { name: 'Bùi Văn Ích', avatar: 'https://i.pravatar.cc/40?img=9' },
  { name: 'Lương Thị Kim', avatar: 'https://i.pravatar.cc/40?img=10' },
];

// Mock tags với màu sắc đẹp
const mockTags: TagInfo[] = [
  { name: 'Frontend', color: '#3B82F6' },
  { name: 'Backend', color: '#10B981' },
  { name: 'Database', color: '#F59E0B' },
  { name: 'UI/UX', color: '#EC4899' },
  { name: 'Testing', color: '#8B5CF6' },
  { name: 'Bug', color: '#EF4444' },
  { name: 'Feature', color: '#06B6D4' },
  { name: 'API', color: '#84CC16' },
  { name: 'Performance', color: '#F97316' },
  { name: 'Security', color: '#6B7280' },
  { name: 'Mobile', color: '#14B8A6' },
  { name: 'Urgent', color: '#DC2626' },
  { name: 'Enhancement', color: '#7C3AED' },
  { name: 'Documentation', color: '#059669' },
];

// Helper function để random items từ array
const getRandomItems = <T>(array: T[], min: number, max: number): T[] => {
  const count = Math.floor(Math.random() * (max - min + 1)) + min;
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const getRandomDate = (daysFromNow: number, dayRange: number): Date => {
  const baseDate = new Date();
  const randomDays = Math.floor(Math.random() * dayRange) - dayRange / 2;
  baseDate.setDate(baseDate.getDate() + daysFromNow + randomDays);
  return baseDate;
};

// Mock data cho TODO (Pending)
export const mockTodoPending: TodoInfo[] = [
  {
    id: 'todo-1',
    name: 'Thiết kế giao diện trang chủ mới',
    by: mockEmployees[0],
    deadline: getRandomDate(7, 5),
    state: StateTodoEnum.TODO,
    tags: [mockTags[3], mockTags[6]], // UI/UX, Feature
    doneAt: null,
    createdAt: getRandomDate(-3, 2),
    subTodo: [
      { id: 'sub-1-1', name: 'Wireframe trang chủ', isDone: false },
      { id: 'sub-1-2', name: 'Mockup chi tiết', isDone: false },
      { id: 'sub-1-3', name: 'Review với team', isDone: false },
    ],
  },
  {
    id: 'todo-2',
    name: 'Tích hợp API thanh toán',
    by: mockEmployees[2],
    deadline: getRandomDate(10, 3),
    state: StateTodoEnum.TODO,
    tags: [mockTags[1], mockTags[7]], // Backend, API
    doneAt: null,
    createdAt: getRandomDate(-2, 1),
    subTodo: [
      { id: 'sub-2-1', name: 'Research payment gateway', isDone: true },
      { id: 'sub-2-2', name: 'Tạo API endpoint', isDone: false },
      { id: 'sub-2-3', name: 'Test payment flow', isDone: false },
    ],
  },
  {
    id: 'todo-3',
    name: 'Sửa lỗi responsive mobile',
    by: mockEmployees[1],
    deadline: getRandomDate(3, 2),
    state: StateTodoEnum.TODO,
    tags: [mockTags[0], mockTags[5], mockTags[10]], // Frontend, Bug, Mobile
    doneAt: null,
    createdAt: getRandomDate(-1, 1),
    subTodo: [
      { id: 'sub-3-1', name: 'Kiểm tra trên iPhone', isDone: false },
      { id: 'sub-3-2', name: 'Kiểm tra trên Android', isDone: false },
    ],
  },
  {
    id: 'todo-4',
    name: 'Tối ưu hóa database queries',
    by: mockEmployees[4],
    deadline: getRandomDate(12, 4),
    state: StateTodoEnum.TODO,
    tags: [mockTags[2], mockTags[8]], // Database, Performance
    doneAt: null,
    createdAt: getRandomDate(-4, 2),
    subTodo: [
      { id: 'sub-4-1', name: 'Analyze slow queries', isDone: true },
      { id: 'sub-4-2', name: 'Add database indexes', isDone: false },
      { id: 'sub-4-3', name: 'Optimize join operations', isDone: false },
      { id: 'sub-4-4', name: 'Performance testing', isDone: false },
    ],
  },
  {
    id: 'todo-5',
    name: 'Viết tài liệu API documentation',
    by: mockEmployees[6],
    deadline: getRandomDate(15, 5),
    state: StateTodoEnum.TODO,
    tags: [mockTags[13], mockTags[7]], // Documentation, API
    doneAt: null,
    createdAt: getRandomDate(-2, 1),
    subTodo: [
      { id: 'sub-5-1', name: 'List all endpoints', isDone: true },
      { id: 'sub-5-2', name: 'Write endpoint details', isDone: false },
      { id: 'sub-5-3', name: 'Add examples', isDone: false },
    ],
  },
  {
    id: 'todo-6',
    name: 'Cải thiện bảo mật authentication',
    by: mockEmployees[8],
    deadline: getRandomDate(8, 3),
    state: StateTodoEnum.TODO,
    tags: [mockTags[9], mockTags[11]], // Security, Urgent
    doneAt: null,
    createdAt: getRandomDate(-1, 1),
    subTodo: [
      { id: 'sub-6-1', name: 'Audit current auth system', isDone: false },
      { id: 'sub-6-2', name: 'Implement 2FA', isDone: false },
      { id: 'sub-6-3', name: 'Security testing', isDone: false },
    ],
  },
  {
    id: 'todo-7',
    name: 'Xây dựng component library',
    by: mockEmployees[3],
    deadline: getRandomDate(20, 7),
    state: StateTodoEnum.TODO,
    tags: [mockTags[0], mockTags[6]], // Frontend, Feature
    doneAt: null,
    createdAt: getRandomDate(-5, 2),
    subTodo: [
      { id: 'sub-7-1', name: 'Button components', isDone: false },
      { id: 'sub-7-2', name: 'Form components', isDone: false },
      { id: 'sub-7-3', name: 'Layout components', isDone: false },
      { id: 'sub-7-4', name: 'Storybook setup', isDone: false },
    ],
  },
  {
    id: 'todo-8',
    name: 'Setup CI/CD pipeline',
    by: mockEmployees[7],
    deadline: getRandomDate(14, 4),
    state: StateTodoEnum.TODO,
    tags: [mockTags[12], mockTags[6]], // Enhancement, Feature
    doneAt: null,
    createdAt: getRandomDate(-3, 2),
    subTodo: [
      { id: 'sub-8-1', name: 'Configure build pipeline', isDone: false },
      { id: 'sub-8-2', name: 'Setup automated testing', isDone: false },
      { id: 'sub-8-3', name: 'Configure deployment', isDone: false },
    ],
  },
  {
    id: 'todo-9',
    name: 'Nghiên cứu và implement caching',
    by: mockEmployees[5],
    deadline: getRandomDate(18, 6),
    state: StateTodoEnum.TODO,
    tags: [mockTags[8], mockTags[1]], // Performance, Backend
    doneAt: null,
    createdAt: getRandomDate(-4, 2),
    subTodo: [
      { id: 'sub-9-1', name: 'Research caching strategies', isDone: true },
      { id: 'sub-9-2', name: 'Implement Redis caching', isDone: false },
      { id: 'sub-9-3', name: 'Cache invalidation logic', isDone: false },
    ],
  },
  {
    id: 'todo-10',
    name: 'Tạo dashboard analytics',
    by: mockEmployees[9],
    deadline: getRandomDate(25, 8),
    state: StateTodoEnum.TODO,
    tags: [mockTags[0], mockTags[3], mockTags[6]], // Frontend, UI/UX, Feature
    doneAt: null,
    createdAt: getRandomDate(-6, 3),
    subTodo: [
      { id: 'sub-10-1', name: 'Design dashboard layout', isDone: false },
      { id: 'sub-10-2', name: 'Integrate chart library', isDone: false },
      { id: 'sub-10-3', name: 'Connect to analytics API', isDone: false },
      { id: 'sub-10-4', name: 'Add filters and controls', isDone: false },
    ],
  },
];

// Mock data cho IN_PROCESS
export const mockTodoInProcess: TodoInfo[] = [
  {
    id: 'process-1',
    name: 'Phát triển tính năng chat real-time',
    by: mockEmployees[1],
    deadline: getRandomDate(5, 3),
    state: StateTodoEnum.IN_PROCESS,
    tags: [mockTags[0], mockTags[1], mockTags[6]], // Frontend, Backend, Feature
    doneAt: null,
    createdAt: getRandomDate(-7, 2),
    subTodo: [
      { id: 'sub-p1-1', name: 'Setup WebSocket server', isDone: true },
      { id: 'sub-p1-2', name: 'Frontend chat interface', isDone: true },
      { id: 'sub-p1-3', name: 'Message persistence', isDone: false },
      { id: 'sub-p1-4', name: 'Online status indicator', isDone: false },
    ],
  },
  {
    id: 'process-2',
    name: 'Migrate database to PostgreSQL',
    by: mockEmployees[4],
    deadline: getRandomDate(8, 4),
    state: StateTodoEnum.IN_PROCESS,
    tags: [mockTags[2], mockTags[11]], // Database, Urgent
    doneAt: null,
    createdAt: getRandomDate(-10, 3),
    subTodo: [
      { id: 'sub-p2-1', name: 'Backup current database', isDone: true },
      { id: 'sub-p2-2', name: 'Setup PostgreSQL server', isDone: true },
      { id: 'sub-p2-3', name: 'Migrate schema', isDone: true },
      { id: 'sub-p2-4', name: 'Migrate data', isDone: false },
      { id: 'sub-p2-5', name: 'Update application config', isDone: false },
    ],
  },
  {
    id: 'process-3',
    name: 'Implement unit tests cho core modules',
    by: mockEmployees[7],
    deadline: getRandomDate(6, 2),
    state: StateTodoEnum.IN_PROCESS,
    tags: [mockTags[4], mockTags[12]], // Testing, Enhancement
    doneAt: null,
    createdAt: getRandomDate(-8, 2),
    subTodo: [
      { id: 'sub-p3-1', name: 'Setup testing framework', isDone: true },
      { id: 'sub-p3-2', name: 'Test user service', isDone: true },
      { id: 'sub-p3-3', name: 'Test auth module', isDone: false },
      { id: 'sub-p3-4', name: 'Test payment module', isDone: false },
    ],
  },
  {
    id: 'process-4',
    name: 'Redesign product listing page',
    by: mockEmployees[3],
    deadline: getRandomDate(4, 2),
    state: StateTodoEnum.IN_PROCESS,
    tags: [mockTags[3], mockTags[0]], // UI/UX, Frontend
    doneAt: null,
    createdAt: getRandomDate(-9, 3),
    subTodo: [
      { id: 'sub-p4-1', name: 'User research', isDone: true },
      { id: 'sub-p4-2', name: 'Create new wireframes', isDone: true },
      { id: 'sub-p4-3', name: 'Develop new components', isDone: false },
      { id: 'sub-p4-4', name: 'A/B testing', isDone: false },
    ],
  },
  {
    id: 'process-5',
    name: 'Tối ưu SEO cho website',
    by: mockEmployees[6],
    deadline: getRandomDate(9, 3),
    state: StateTodoEnum.IN_PROCESS,
    tags: [mockTags[0], mockTags[8]], // Frontend, Performance
    doneAt: null,
    createdAt: getRandomDate(-12, 4),
    subTodo: [
      { id: 'sub-p5-1', name: 'SEO audit', isDone: true },
      { id: 'sub-p5-2', name: 'Optimize meta tags', isDone: true },
      { id: 'sub-p5-3', name: 'Improve page loading speed', isDone: false },
      { id: 'sub-p5-4', name: 'Generate sitemap', isDone: false },
    ],
  },
  {
    id: 'process-6',
    name: 'Xây dựng notification system',
    by: mockEmployees[2],
    deadline: getRandomDate(7, 3),
    state: StateTodoEnum.IN_PROCESS,
    tags: [mockTags[1], mockTags[6]], // Backend, Feature
    doneAt: null,
    createdAt: getRandomDate(-6, 2),
    subTodo: [
      { id: 'sub-p6-1', name: 'Design notification schema', isDone: true },
      { id: 'sub-p6-2', name: 'Email notifications', isDone: true },
      { id: 'sub-p6-3', name: 'Push notifications', isDone: false },
      { id: 'sub-p6-4', name: 'In-app notifications', isDone: false },
    ],
  },
  {
    id: 'process-7',
    name: 'Phát triển mobile app với React Native',
    by: mockEmployees[8],
    deadline: getRandomDate(30, 10),
    state: StateTodoEnum.IN_PROCESS,
    tags: [mockTags[10], mockTags[6]], // Mobile, Feature
    doneAt: null,
    createdAt: getRandomDate(-15, 5),
    subTodo: [
      { id: 'sub-p7-1', name: 'Setup React Native project', isDone: true },
      { id: 'sub-p7-2', name: 'Navigation setup', isDone: true },
      { id: 'sub-p7-3', name: 'Authentication screens', isDone: true },
      { id: 'sub-p7-4', name: 'Main app screens', isDone: false },
      { id: 'sub-p7-5', name: 'API integration', isDone: false },
    ],
  },
  {
    id: 'process-8',
    name: 'Implement dark mode theme',
    by: mockEmployees[0],
    deadline: getRandomDate(3, 1),
    state: StateTodoEnum.IN_PROCESS,
    tags: [mockTags[0], mockTags[3], mockTags[12]], // Frontend, UI/UX, Enhancement
    doneAt: null,
    createdAt: getRandomDate(-5, 2),
    subTodo: [
      { id: 'sub-p8-1', name: 'Define color palette', isDone: true },
      { id: 'sub-p8-2', name: 'Update CSS variables', isDone: true },
      { id: 'sub-p8-3', name: 'Theme toggle component', isDone: false },
      { id: 'sub-p8-4', name: 'Test all components', isDone: false },
    ],
  },
  {
    id: 'process-9',
    name: 'Cải thiện error handling',
    by: mockEmployees[5],
    deadline: getRandomDate(6, 2),
    state: StateTodoEnum.IN_PROCESS,
    tags: [mockTags[1], mockTags[5]], // Backend, Bug
    doneAt: null,
    createdAt: getRandomDate(-8, 3),
    subTodo: [
      { id: 'sub-p9-1', name: 'Global error handler', isDone: true },
      { id: 'sub-p9-2', name: 'Error logging system', isDone: true },
      { id: 'sub-p9-3', name: 'User-friendly error messages', isDone: false },
      { id: 'sub-p9-4', name: 'Error recovery mechanisms', isDone: false },
    ],
  },
  {
    id: 'process-10',
    name: 'Tạo admin dashboard',
    by: mockEmployees[9],
    deadline: getRandomDate(12, 4),
    state: StateTodoEnum.IN_PROCESS,
    tags: [mockTags[0], mockTags[3], mockTags[6]], // Frontend, UI/UX, Feature
    doneAt: null,
    createdAt: getRandomDate(-11, 4),
    subTodo: [
      { id: 'sub-p10-1', name: 'User management interface', isDone: true },
      { id: 'sub-p10-2', name: 'System statistics', isDone: true },
      { id: 'sub-p10-3', name: 'Content management', isDone: false },
      { id: 'sub-p10-4', name: 'System settings', isDone: false },
    ],
  },
];

// Mock data cho DONE
export const mockTodoDone: TodoInfo[] = [
  {
    id: 'done-1',
    name: 'Setup project infrastructure',
    by: mockEmployees[2],
    deadline: getRandomDate(-5, 2),
    state: StateTodoEnum.DONE,
    tags: [mockTags[12], mockTags[6]], // Enhancement, Feature
    doneAt: getRandomDate(-2, 1),
    createdAt: getRandomDate(-20, 3),
    subTodo: [
      { id: 'sub-d1-1', name: 'Initialize Git repository', isDone: true },
      { id: 'sub-d1-2', name: 'Setup development environment', isDone: true },
      { id: 'sub-d1-3', name: 'Configure build tools', isDone: true },
      { id: 'sub-d1-4', name: 'Setup linting and formatting', isDone: true },
    ],
  },
  {
    id: 'done-2',
    name: 'Implement user authentication',
    by: mockEmployees[4],
    deadline: getRandomDate(-8, 3),
    state: StateTodoEnum.DONE,
    tags: [mockTags[9], mockTags[1]], // Security, Backend
    doneAt: getRandomDate(-3, 1),
    createdAt: getRandomDate(-25, 5),
    subTodo: [
      { id: 'sub-d2-1', name: 'JWT token system', isDone: true },
      { id: 'sub-d2-2', name: 'Login/Register API', isDone: true },
      { id: 'sub-d2-3', name: 'Password encryption', isDone: true },
      { id: 'sub-d2-4', name: 'Session management', isDone: true },
    ],
  },
  {
    id: 'done-3',
    name: 'Design system và brand identity',
    by: mockEmployees[3],
    deadline: getRandomDate(-12, 4),
    state: StateTodoEnum.DONE,
    tags: [mockTags[3]], // UI/UX
    doneAt: getRandomDate(-4, 2),
    createdAt: getRandomDate(-30, 5),
    subTodo: [
      { id: 'sub-d3-1', name: 'Color palette definition', isDone: true },
      { id: 'sub-d3-2', name: 'Typography system', isDone: true },
      { id: 'sub-d3-3', name: 'Logo and brand assets', isDone: true },
      { id: 'sub-d3-4', name: 'Component style guide', isDone: true },
    ],
  },
  {
    id: 'done-4',
    name: 'Tạo responsive header component',
    by: mockEmployees[0],
    deadline: getRandomDate(-10, 3),
    state: StateTodoEnum.DONE,
    tags: [mockTags[0], mockTags[10]], // Frontend, Mobile
    doneAt: getRandomDate(-5, 2),
    createdAt: getRandomDate(-18, 4),
    subTodo: [
      { id: 'sub-d4-1', name: 'Desktop header layout', isDone: true },
      { id: 'sub-d4-2', name: 'Mobile hamburger menu', isDone: true },
      { id: 'sub-d4-3', name: 'Responsive breakpoints', isDone: true },
    ],
  },
  {
    id: 'done-5',
    name: 'Database schema design',
    by: mockEmployees[7],
    deadline: getRandomDate(-15, 4),
    state: StateTodoEnum.DONE,
    tags: [mockTags[2]], // Database
    doneAt: getRandomDate(-7, 2),
    createdAt: getRandomDate(-35, 7),
    subTodo: [
      { id: 'sub-d5-1', name: 'Entity relationship diagram', isDone: true },
      { id: 'sub-d5-2', name: 'Table structures', isDone: true },
      { id: 'sub-d5-3', name: 'Indexes and constraints', isDone: true },
      { id: 'sub-d5-4', name: 'Migration scripts', isDone: true },
    ],
  },
  {
    id: 'done-6',
    name: 'Implement email service',
    by: mockEmployees[6],
    deadline: getRandomDate(-7, 2),
    state: StateTodoEnum.DONE,
    tags: [mockTags[1], mockTags[7]], // Backend, API
    doneAt: getRandomDate(-1, 1),
    createdAt: getRandomDate(-22, 4),
    subTodo: [
      { id: 'sub-d6-1', name: 'SMTP configuration', isDone: true },
      { id: 'sub-d6-2', name: 'Email templates', isDone: true },
      { id: 'sub-d6-3', name: 'Queue system', isDone: true },
    ],
  },
  {
    id: 'done-7',
    name: 'Form validation library',
    by: mockEmployees[1],
    deadline: getRandomDate(-13, 3),
    state: StateTodoEnum.DONE,
    tags: [mockTags[0], mockTags[12]], // Frontend, Enhancement
    doneAt: getRandomDate(-6, 2),
    createdAt: getRandomDate(-28, 5),
    subTodo: [
      { id: 'sub-d7-1', name: 'Validation rules engine', isDone: true },
      { id: 'sub-d7-2', name: 'Error message system', isDone: true },
      { id: 'sub-d7-3', name: 'Real-time validation', isDone: true },
      { id: 'sub-d7-4', name: 'Custom validators', isDone: true },
    ],
  },
  {
    id: 'done-8',
    name: 'API rate limiting',
    by: mockEmployees[8],
    deadline: getRandomDate(-9, 3),
    state: StateTodoEnum.DONE,
    tags: [mockTags[9], mockTags[1]], // Security, Backend
    doneAt: getRandomDate(-3, 1),
    createdAt: getRandomDate(-24, 4),
    subTodo: [
      { id: 'sub-d8-1', name: 'Rate limiting middleware', isDone: true },
      { id: 'sub-d8-2', name: 'Redis integration', isDone: true },
      { id: 'sub-d8-3', name: 'Different limits per endpoint', isDone: true },
    ],
  },
  {
    id: 'done-9',
    name: 'Image upload và processing',
    by: mockEmployees[5],
    deadline: getRandomDate(-11, 4),
    state: StateTodoEnum.DONE,
    tags: [mockTags[1], mockTags[6]], // Backend, Feature
    doneAt: getRandomDate(-4, 2),
    createdAt: getRandomDate(-26, 5),
    subTodo: [
      { id: 'sub-d9-1', name: 'File upload API', isDone: true },
      { id: 'sub-d9-2', name: 'Image compression', isDone: true },
      { id: 'sub-d9-3', name: 'Multiple format support', isDone: true },
      { id: 'sub-d9-4', name: 'Cloud storage integration', isDone: true },
    ],
  },
  {
    id: 'done-10',
    name: 'Performance monitoring setup',
    by: mockEmployees[9],
    deadline: getRandomDate(-14, 4),
    state: StateTodoEnum.DONE,
    tags: [mockTags[8], mockTags[12]], // Performance, Enhancement
    doneAt: getRandomDate(-8, 3),
    createdAt: getRandomDate(-32, 6),
    subTodo: [
      { id: 'sub-d10-1', name: 'Application monitoring', isDone: true },
      { id: 'sub-d10-2', name: 'Database performance tracking', isDone: true },
      { id: 'sub-d10-3', name: 'Error tracking', isDone: true },
      { id: 'sub-d10-4', name: 'Performance alerts', isDone: true },
    ],
  },
];

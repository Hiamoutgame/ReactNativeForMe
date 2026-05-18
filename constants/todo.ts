export type Todo = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: number;
};

export const TODO_STORAGE_KEY = "Asm1_SE193308_TodoList";

export const todoPalette = {
  ink: "#24211D",
  muted: "#756F66",
  paper: "#FBF7EF",
  panel: "#FFFFFF",
  line: "#E6DDD0",
  primary: "#2F5D50",
  primarySoft: "#DDEBE5",
  accent: "#D9863D",
  accentSoft: "#F8E4D2",
  danger: "#C6534B",
  dangerSoft: "#F7DDDA",
  success: "#4F8A5F",
  successSoft: "#E1EFDF",
};

export const todoRadius = {
  sm: 8,
  md: 14,
  lg: 22,
};

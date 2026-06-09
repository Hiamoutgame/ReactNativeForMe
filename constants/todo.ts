export type Todo = {
  id: string;
  title: string;
  detail?: string; // Add detail based on the design
  completed: boolean;
  createdAt: number;
};

export const TODO_STORAGE_KEY = "Asm1_SE193308_TodoList";

export const todoPalette = {
  primary: "#9395D3",
  backgroundLight: "#D6D7EF",
  backgroundWhite: "#FFFFFF",
  textDark: "#000000",
  textLight: "#8A8A8A",
  white: "#FFFFFF",
  
  ink: "#000000",
  muted: "#8A8A8A",
  paper: "#FFFFFF",
  line: "#D9D9D9",
};

export const todoRadius = {
  sm: 8,
  md: 12,
  lg: 28,
};

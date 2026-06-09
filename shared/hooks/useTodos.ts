import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";
import { useCallback, useEffect, useMemo, useState } from "react";

import { Todo, TODO_STORAGE_KEY } from "@/constants/todo";

type UseTodosResult = {
  todos: Todo[];
  completedCount: number;
  remainingCount: number;
  isLoading: boolean;
  addTodo: (title: string) => void;
  updateTodo: (id: string, title: string) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
};

export function useTodos(): UseTodosResult {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasHydrated, setHasHydrated] = useState(false); // hasHydrated is used to prevent overwriting loaded todos when they are being set for the first time. After the first load, it will be set to true and allow saving to Async Storage on every change.

  const loadTodos = useCallback(async () => {
    try {
      const storedValue = await AsyncStorage.getItem(TODO_STORAGE_KEY);
      if (!storedValue) {
        return;
      }

      const parsedTodos = JSON.parse(storedValue) as Todo[];
      if (Array.isArray(parsedTodos)) {
        setTodos(parsedTodos);
      }
    } catch (error) {
      console.warn("Can not load todos from Async Storage", error);
    } finally {
      setIsLoading(false);
      setHasHydrated(true);
    }
  }, []);

  useEffect(() => {
    loadTodos();
  }, [loadTodos]);

  useFocusEffect(
    useCallback(() => {
      loadTodos();
    }, [loadTodos]),
  );

  useEffect(() => {
    if (!hasHydrated) {
      return;
    }

    AsyncStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(todos)).catch(
      (error) => {
        console.warn("Can not save todos to Async Storage", error);
      },
    );
  }, [hasHydrated, todos]);

  const addTodo = useCallback((title: string) => {
    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      return;
    }

    setTodos((currentTodos) => [
      {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        title: trimmedTitle,
        completed: false,
        createdAt: Date.now(),
      },
      ...currentTodos,
    ]);
  }, []);

  const updateTodo = useCallback((id: string, title: string) => {
    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      return;
    }

    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === id ? { ...todo, title: trimmedTitle } : todo,
      ),
    );
  }, []);

  const toggleTodo = useCallback((id: string) => {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  }, []);

  const deleteTodo = useCallback((id: string) => {
    setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== id));
  }, []);

  const completedCount = useMemo(
    () => todos.filter((todo) => todo.completed).length,
    [todos],
  );

  return {
    todos,
    completedCount,
    remainingCount: todos.length - completedCount,
    isLoading,
    addTodo,
    updateTodo,
    toggleTodo,
    deleteTodo,
  };
}

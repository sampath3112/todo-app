import React, { useState } from 'react';
import { IonContent, IonHeader, IonToolbar, IonTitle, IonList, IonItem, IonLabel, IonInput, IonButton, IonModal } from '@ionic/react';

interface Task {
  id: number;
  text: string;
}

const Todo: React.FC = () => {
  const [todos, setTodos] = useState<Task[]>([]);
  const [newTodo, setNewTodo] = useState<string>('');
  const [editTodo, setEditTodo] = useState<Task>({ id: 0, text: '' });
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      const newTask: Task = {
        id: todos.length + 1,
        text: newTodo,
      };
      setTodos([...todos, newTask]);
      setNewTodo('');
      setShowModal(false);
    }
  };

  const deleteTodo = (task: Task) => {
    const updatedTodos = todos.filter((todo) => todo.id !== task.id);
    setTodos(updatedTodos);
  };

  const handleEditTodo = (task: Task) => {
    setEditTodo(task);
    setShowEditModal(true);
  };

  const updateTodo = () => {
    if (editTodo.text.trim() !== '') {
      const updatedTodos = todos.map((todo) => {
        if (todo.id === editTodo.id) {
          return { ...todo, text: editTodo.text };
        }
        return todo;
      });
      setTodos(updatedTodos);
      setShowEditModal(false);
    }
  };

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Todo App</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {todos.map((todo) => (
            <IonItem key={todo.id}>
              <IonLabel>{todo.text}</IonLabel>
              <IonButton onClick={() => deleteTodo(todo)}>Delete</IonButton>
              <IonButton onClick={() => handleEditTodo(todo)}>Edit</IonButton>
            </IonItem>
          ))}
        </IonList>
        <IonButton onClick={() => setShowModal(true)}>Add Todo</IonButton>

        <IonModal isOpen={showModal}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Add Todo</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonList>
              <IonItem>
                <IonInput value={newTodo} onIonChange={(e) => setNewTodo(e.detail.value!)} placeholder="Enter a new todo"></IonInput>
              </IonItem>
            </IonList>
            <IonButton onClick={addTodo}>Save</IonButton>
            <IonButton onClick={() => setShowModal(false)}>Cancel</IonButton>
          </IonContent>
        </IonModal>

        <IonModal isOpen={showEditModal}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Edit Todo</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonList>
              <IonItem>
                <IonInput
                  value={editTodo.text}
                  onIonChange={(e) => setEditTodo({ ...editTodo, text: e.detail.value! })}
                  placeholder="Enter the updated todo"
                ></IonInput>
              </IonItem>
            </IonList>
            <IonButton onClick={updateTodo}>Save</IonButton>
            <IonButton onClick={() => setShowEditModal(false)}>Cancel</IonButton>
          </IonContent>
        </IonModal>
      </IonContent>
    </>
  );
};

export default Todo;

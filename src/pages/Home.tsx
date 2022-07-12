import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';


export interface EditTextArgs {
  taskId: number;
  taskNewTitle: string;
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const tarefa = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    }

    if(tasks.find(item => item.title === newTaskTitle)) {
      Alert.alert(
        'Hey There 👋',
        'You already have a task with this name.')
    }else {
      setTasks([...tasks, tarefa])
    }
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map(task => ({ ...task }));

    const taskToBeMarkedAsDone = updatedTasks.find( item => item.id === id);

    if(!taskToBeMarkedAsDone)
    return;

    taskToBeMarkedAsDone.done = !taskToBeMarkedAsDone.done;
    setTasks(updatedTasks)
  }


  function handleEditTask({taskNewTitle, taskId} : EditTextArgs) {
    const updatedTasks = tasks.map(task => ({ ...task }))

    const taskToBeUpdated = updatedTasks.find(item => item.id === taskId)

    if(!taskToBeUpdated)
    return;

    taskToBeUpdated.title = taskNewTitle

    setTasks(updatedTasks)
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      "Remove Task",
      "Are you sure about removing this task?",
      [
        {
          text: "No",
          style: "cancel"
        },
        { text: "Yes", onPress: () => setTasks(tasks.filter(
          tarefa => tarefa.id !== id
        ))
        }
      ]
    )
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})
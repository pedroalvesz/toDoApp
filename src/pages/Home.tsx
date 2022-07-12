import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';


export interface EditTextArgs {
  taskId: number;
  taskNewTitle: string;
}

// mesma funcionalidade que a interface
//type EditTextArgs {
// taskId: number;
// taskNewTitle: string;
//}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const tarefa = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    }

    // verificar se o newTaskTitle é igual a algum tarefa.title dentro do estado no momento = task
    if(tasks.find(item => item.title === newTaskTitle)) {
    }else {
      setTasks([...tasks, tarefa])
    }
  }

  function handleToggleTaskDone(id: number) {

    // Lógica de desestruturar o array para poder manipular ele sem quebrar a imutabilidade do react
    const updatedTasks = tasks.map(task => ({ ...task }));

    const taskToBeMarkedAsDone = updatedTasks.find( item => item.id === id);

    if(!taskToBeMarkedAsDone)
    return;

    taskToBeMarkedAsDone.done = !taskToBeMarkedAsDone.done;
    setTasks(updatedTasks)
  }

  //importar um objeto com nome EditTextArgs
  function handleEditTask({taskNewTitle, taskId} : EditTextArgs) {
    //Desestruturo o array
    //Procuro nele alguma task com o mesmo id que eu to passando,
    //Se não for undefined( se ele achar )
    //modifica o tasktobeupdated para o novo nome e adiciona ao estado
    const updatedTasks = tasks.map(task => ({ ...task }))

    const taskToBeUpdated = updatedTasks.find(item => item.id === taskId)

    if(!taskToBeUpdated)
    return;

    taskToBeUpdated.title = taskNewTitle

    setTasks(updatedTasks)
  }

  function handleRemoveTask(id: number) {
    //os elementos que eu vou retornar no estado / renderizar na tela são os que forem diferentes desse id
    Alert.alert(
      "Remover item",
      "Tem certeza que você deseja remover esse item?",
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
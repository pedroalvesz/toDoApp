import React, { useEffect, useRef, useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import trashIcon from '../assets/icons/trash/trash.png';
import editIcon from '../assets/icons/edit/edit.png';
import { EditTextArgs } from "../pages/Home";
import { Task } from "./TasksList"
import { createIconSet } from "react-native-vector-icons";


interface TasksListProps {
  task: Task;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: ({taskNewTitle, taskId} : EditTextArgs) => void;
}

export function TaskItem({task, toggleTaskDone, removeTask, editTask} : TasksListProps) {

  const [isEditing, setIsEditing] = useState(false);
  const [saveEditedText, setSaveEditedText] = useState(task.title)
  const textInputRef = useRef<TextInput>(null)

  function handleStartEditing () {
    setIsEditing(true)
  }

  function handleCancelEditing () {
    setIsEditing(false),
    setSaveEditedText(task.title)
  }

  function HandleSubmitEditing () {
    setIsEditing(false),
    editTask({taskId: task.id, taskNewTitle: saveEditedText})
  }

  useEffect(() => {
    if (textInputRef.current) {
      if (isEditing) {
        textInputRef.current.focus();
      } else {
        textInputRef.current.blur();
      }
    }
  }, [isEditing])
  
  return(
    <View style={styles.container} >
      <View>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress= {() => toggleTaskDone(task.id)}
        >
          <View style={task.done ? styles.taskMarkerDone : styles.taskMarker} >
            { task.done && (
              <Icon 
                name="check"
                size={12}
                color="#FFF"
              />
            )}
          </View>

          <TextInput
          style={task.done ? styles.taskTextDone : styles.taskText}
          value={saveEditedText}
          onChangeText={setSaveEditedText}
          editable={isEditing}
          onSubmitEditing={HandleSubmitEditing}
          ref={textInputRef}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.iconContainer}>
      {isEditing ? (
        <TouchableOpacity
          onPress={handleCancelEditing}
          >
          <Icon name="x" size={24} color="#b2b2b2" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={handleStartEditing}
          >
          <Image source={editIcon} />
        </TouchableOpacity>
      ) }
        <View
          style={styles.iconDivider}
          />
        <TouchableOpacity
        onPress={() => removeTask(task.id)}
        disabled={isEditing}
        >
        <Image
        style={{opacity: isEditing ? 0.2 : 1}} 
        source={trashIcon} />
        </TouchableOpacity>
      </View>

  </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingRight: 20,
  },
  iconDivider: {
    height: 24,
    width: 1,
    backgroundColor: 'rgba(196, 196, 196, 0.24)',
    marginHorizontal: 12,
  },
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 2,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium'
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium'
  }
})
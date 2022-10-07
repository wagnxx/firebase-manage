import React, { ReactChildren, useMemo, useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import TaskContextProvider, { useTaskContext } from '../../context/TaskContext'
import TaskContainer from './TaskContainer'
interface iProps {
  children?: ReactChildren
  isInContext?: boolean
}


export default () => {
  return <TaskContextProvider>
    <HomeDropDragArea />
  </TaskContextProvider>
}


function HomeDropDragArea(props: iProps) {

  const {
    taskList,
    ondragend
  } = useTaskContext()



  return (
    <DragDropContext
      onDragEnd={(result: any) => ondragend(result)}
    >
      <div
        className="c-home"
        style={{
          display: 'flex',
          padding: '1rem',
          gap: '1rem'
        }}>

        {
          taskList.map((task, index) => (
            <TaskContainer
              key={index}
              taskList={task.list}
              droppableId={task.id}
            />

          ))
        }



      </div>
    </DragDropContext >
  )
}

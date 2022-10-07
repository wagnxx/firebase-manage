import React, { createContext, ReactChild, ReactChildren, useContext, useMemo, useState } from 'react'

interface iTaskProps {
  children: ReactChild
}



interface iItem {
  id: string
  name: string
  content?: string
}
interface iItemTask {
  id: string
  list: iItem[]
  setState: Function
}
interface iTaskContext {
  taskA: iItem[]
  taskB: iItem[]
  taskList: iItemTask[]
  ondragend: Function
}

// type iItemArray = iItem[]

const TaskContext = createContext<iTaskContext>({
  taskA: [],
  taskB: [],
  taskList: [],
  ondragend: () => { }
})

// export
export const useTaskContext = () => useContext(TaskContext)

// initial data

const taskAList = [
  {
    id: 'task-a-1',
    name: 'task-a-1'
  },
  {
    id: 'task-a-2',
    name: 'task-a-2'
  },
]
const taskBList = [
  {
    id: 'task-b-1',
    name: 'task-b-1'
  },
  {
    id: 'task-b-2',
    name: 'task-b-2'
  },
]


const reorder = (list: any, startIndex: number, endIndex: number): Array<any> => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const insertRowTolist = (list: any, index: number, row: any): Array<any> => {
  const result = Array.from(list);
  // const [removed] = result.splice(startIndex, 1);
  result.splice(index, 0, row);

  return result;
};

export default function TaskContextProvider({ children }: iTaskProps) {
  const [taskA, setTaskA] = useState(taskAList)
  const [taskB, setTaskB] = useState(taskBList)

  const taskList = useMemo(() => {
    return [
      {
        id: 'Task-a',
        list: taskA,
        setState: setTaskA
      },
      {
        id: 'Task-b',
        list: taskB,
        setState: setTaskB
      }
    ]
  }, [taskA, taskB])

  const ondragend = (result: any) => {
    if (!result.destination) {
      return;
    }

    // TODO
    const sourceId = result.source.droppableId;
    const destinationId = result.destination.droppableId;
    const curTask = taskList.find(t => t.id === sourceId)
    const destinationTask = taskList.find(t => t.id === destinationId)

    if (result.destination.droppableId == result.source.droppableId) {
      // 同一个 droppable 中移动
      curTask?.setState((preList: any) => {
        return reorder(
          preList,
          result.source.index, // 被拖动的 index
          result.destination.index // droped index
        )
      })


    } else {
      // 移动到另外一个 droppable 中
      destinationTask?.setState((preTask: any) => {
        return insertRowTolist(
          preTask,
          result.destination.index, // droped index
          curTask?.list[
          result.source.index // 被拖动的 index
          ]
        )
      })
      curTask?.setState((preTask: any) => {
        return preTask.filter((t: any, index: number) => index !== result.source.index)
      })
    }
    // 注： setstate 要改变source 打他

  }

  const value = {
    taskA,
    taskB,
    taskList,
    ondragend
  }

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  )
}

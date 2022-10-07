import React from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd'

export default function TaskContainer(
  { taskList, droppableId }: any
) {
  return (
    <div style={{ border: '1px solid #ddd', padding: '10px' }}>
      <h2>{droppableId}</h2>
      <hr />
      <Droppable droppableId={droppableId}>

        {
          (provided) => {

            return (
              <div ref={provided.innerRef}
                {...provided.droppableProps}>
                {
                  taskList.map((task: any, index: number) => (
                    <Draggable key={index} draggableId={task.id} index={index}>
                      {
                        provided => {
                          return <div
                            {...provided.dragHandleProps}
                            {...provided.draggableProps}
                            ref={provided.innerRef}
                          >
                            {task.name}
                          </div>
                        }
                      }
                    </Draggable>
                  ))

                }
              </div>
            )


          }
        }
      </Droppable>
    </div>
  )
}
// import React from 'react'
// import { Draggable, Droppable } from 'react-beautiful-dnd'

// export default function TaskContainer(
//   { taskList, droppableId }: any
// ) {
//   return (
//     <div style={{ border: '1px solid #ddd', padding: '10px' }}>
//       <h2>{droppableId}</h2>
//       <hr />
//       {

//         taskList.map((task: any, index: number) => (
//           <Droppable droppableId={task.id} type={droppableId} key={index}>
//             {
//               () => {
//                 return <Draggable key={index} draggableId={task.id} index={index}>
//                   {
//                     provided => {
//                       return <div
//                         {...provided.dragHandleProps}
//                         {...provided.draggableProps}
//                         ref={provided.innerRef}
//                       >
//                         {task.name}
//                       </div>
//                     }
//                   }
//                 </Draggable>
//               }
//             }
//           </Droppable>
//         ))

//       }

//     </div>
//   )
// }

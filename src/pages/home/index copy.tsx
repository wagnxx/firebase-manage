import React, { useCallback, useState, Component } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './index.css'
// import { type } from 'os';

type item = {name: string, id: string}
type items = Array<item>

const reorder = (list:items, startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};
const grid = 8;

const getItemStyle = (isDragging: boolean, draggableStyle?: object) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle
});

const getListStyle = (isDraggingOver:boolean) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: 250
});
export default function Home(){
  // using useCallback is optional
  const [items, setItems] = useState([
    { name: 'item1' , id:'k-1'},
    { name: 'item2' , id:'k-2'},
    { name: 'item3' , id:'k-3'},
    { name: 'item4' , id:'k-4'},

  ])
  // state = {
  //   items:[
  //     { name: 'item1' , id:'k-1'},
  //     { name: 'item2' , id:'k-2'},
  //     { name: 'item3' , id:'k-3'},
  //     { name: 'item4' , id:'k-4'},
  
  //   ]
  // }


  // const onBeforeCapture = useCallback(() => {
  //   /*...*/
  // }, []);
  // const onBeforeDragStart = useCallback(() => {
  //   /*...*/
  // }, []);
  // const onDragStart = useCallback(() => {
  //   /*...*/
  // }, []);
  // const onDragUpdate = useCallback(() => {
  //   /*...*/
  // }, []);
  const onDragEnd = useCallback((result: any) => {
    // the only one that is required
    if (!result.destination) {
      return;
    }
    const newItems = reorder(
      items,
      result.source.index,
      result.destination.index
    );

    setItems(newItems)
  }, []);

  // onDragEnd(result:any) {
  //   // dropped outside the list
  //   if (!result.destination) {
  //     return;
  //   }

  //   const items = reorder(
  //     this.state.items,
  //     result.source.index,
  //     result.destination.index
  //   );

  //   this.setState({
  //     items
  //   });
  // }

  return (
    <div className="c-home">
      <h2 className="page-title">book staff</h2>
      <div className="page-content">
        <div className="file-list">
          <DragDropContext
            // onBeforeCapture={onBeforeCapture}
            // onBeforeDragStart={onBeforeDragStart}
            // onDragStart={onDragStart}
            // onDragUpdate={onDragUpdate}
            onDragEnd={onDragEnd}
          >

            <Droppable droppableId="droppable-1" type="PERSON">
              {(provided, snapshot) => {
                
                return   <div

                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
                {...provided.droppableProps}
              >
                {provided.placeholder}
                {

                  // console.log(provided.placeholder)

                  items.map((item: any, index: number) => (
                    <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        // style={getItemStyle(
                        //   snapshot.isDragging,
                        //   // provided.draggableProps.style
                        // )}
                      >
                        {item.name}
                      </div>
                    )}
                  </Draggable>
                  ))
                }

              </div>
              }}


            </Droppable>

            {/* <Draggable draggableId="draggable-2" index={1}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  <h4>My draggable2</h4>
                </div>
              )}
            </Draggable> */}

            {/* <div className="file-item">Book1</div>
          <div className="file-item">Book1</div> */}
          </DragDropContext>
        </div>
      </div>
    </div>
  )
}

 
// import styled from "@emotion/styled";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// // import { type } from "os";
// import { memo, useState } from "react";
// import React from "react";
// // import type { Quote as QuoteType } from "../types";

// type QuoteType = {
//   id: string
//   content: string
// }

// type QuoteListType = Array<QuoteType>
// type QuoteListProps = {
//   quotes: QuoteListType,
//   children?: any
// }

// type QuoteProps = {
//   quote: QuoteType
//    index: number
// }

// const initial = Array.from({ length: 10 }, (v, k) => k).map(k => {
//   const custom: QuoteType = {
//     id: `id-${k}`,
//     content: `Quote ${k}`
//   };

//   return custom;
// });

// const grid = 8;
// const reorder = (list: Array<any>, startIndex: number, endIndex: number) => {
//   const result = Array.from(list);
//   const [removed] = result.splice(startIndex, 1);
//   result.splice(endIndex, 0, removed);

//   return result;
// };

// const QuoteItem = styled.div`
//   width: 200px;
//   border: 1px solid grey;
//   margin-bottom: ${grid}px;
//   background-color: lightblue;
//   padding: ${grid}px;
// `;

// function Quote({ quote, index }: QuoteProps) {
//   return (
//     <Draggable draggableId={quote.id} index={index}>
//       {provided => (
//         <QuoteItem
//           ref={provided.innerRef}
//           {...provided.draggableProps}
//           {...provided.dragHandleProps}
//         >
//           {quote.content}
//         </QuoteItem>
//       )}
//     </Draggable>
//   );
// }

// const QuoteListGeneral = ({quotes}: QuoteListProps) => {
//   // const quotes = quotes;
//   return quotes.map((quote: QuoteType, index: number) => (
//     <Quote quote={quote} index={index} key={quote.id} />
//   ));
// }

// const QuoteList = ({quotes}: QuoteListProps) => {
//   // const quotes = quotes;
//   return <>
//   {
//     quotes.map((quote: QuoteType, index: number) => (
//       <Quote quote={quote} index={index} key={quote.id} />
//     ))
//   }
//   </>
// }


// function QuoteApp() {
//   const [state, setState] = useState({ quotes: initial });

//   function onDragEnd(result: any) {
//     if (!result.destination) {
//       return;
//     }

//     if (result.destination.index === result.source.index) {
//       return;
//     }

//     const quotes = reorder(
//       state.quotes,
//       result.source.index,
//       result.destination.index
//     );

//     setState({ quotes });
//   }

//   return (
//     <DragDropContext onDragEnd={onDragEnd}>
//       <Droppable droppableId="list">
//         {provided => (
//           <div ref={provided.innerRef} {...provided.droppableProps}>
//             <QuoteList quotes={state.quotes} />
//             {provided.placeholder}
//           </div>
//         )}
//       </Droppable>
//     </DragDropContext>
//   );
// }


// export default  QuoteApp
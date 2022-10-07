import React, { useCallback, useState } from 'react'
import NavBar from './NavBar'
import { Container } from 'react-bootstrap'
import AddFolderButton from './components/AddFolderButton'
import useFolder, { iFile, iFolderState } from '../../hoos/useFolders'
import Folder from './Folder'
import FolderBreadcrumbs from './FolderBreadcrumbs'
import { useLocation, useParams } from 'react-router-dom'
import AddFileButton from './AddFileButton'
import File from './File'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'

interface iLocatonState {
  folder: iFolderState | undefined
}

export default function Dashboard() {
  const params = useParams()
  const location = useLocation()
  const state: iLocatonState = location.state as iLocatonState || { folder: undefined }


  const { folder, childFolders, childFiles } = useFolder(params.folderId, state?.folder)

  const onDragEnd = useCallback((result: any) => {
    // the only one that is required
    if (!result.destination) {
      return;
    }
    // const newItems = reorder(
    //   items,
    //   result.source.index,
    //   result.destination.index
    // );

    // setItems(newItems)
  }, []);

  // component jsx
  return (
    <>
      <NavBar />
      <Container fluid>
        <div className="d-flex align-items-center justify-content-between">
          <FolderBreadcrumbs currentFolder={folder} />
          <div>

            <AddFileButton currentFolder={folder} />
            <AddFolderButton currentFolder={folder} />
          </div>
        </div>

        {/* draggable area  start */}
        <DragDropContext
          onDragEnd={onDragEnd}
        >
          {/* {
            childFolders && childFolders?.length
              ? childFolders.map((childFolder: iFolderState, index: number) => (
                <Droppable droppableId={`${index}`} key={index}>
                  {
                    (provided, snapshot) => {

                      return <div key={index}
                        style={{ maxWidth: '240px' }}
                        ref={provided.innerRef}
                        // style={getListStyle(snapshot.isDraggingOver)}
                        {...provided.droppableProps}
                        className="p-2"
                      >
                        {provided.placeholder}
                        {
                          childFolder &&
                          <Folder folder={childFolder} />
                        }

                      </div>
                    }
                  }
                </Droppable>
              ))

              : null
          } */}



          {
            (childFolders?.length && childFiles?.length) ? <hr /> : null
          }

          <div className="d-flex flex-wrap">

            {/* {childFiles && childFiles?.length ? childFiles.map((childFile: iFile, index: number) => (
              <Draggable
                key={childFile.id}
                draggableId={childFile.id}
                index={index}
              >
                {(provided, snapshot) => {
                  return (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{ maxWidth: '240px' }}
                      className="p-2"
                    >
                      {
                        childFile &&
                        <File file={childFile} />
                      }

                    </div>
                  )
                }}

              </Draggable>
            ))

              : 'childFile::Null'
            } */}
            <Draggable draggableId="draggable-2" index={1}>
              {(provided, snapshot) => {
                return (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{ maxWidth: '240px' }}
                    className="p-2"
                  >
                    {
                     2
                    }

                  </div>
                )
              }}
            </Draggable>
          </div>

        </DragDropContext>
        {/* draggable area  end */}
      </Container>
    </>
  )
}

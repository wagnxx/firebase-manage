import React, { useState } from 'react'
import NavBar from './NavBar'
import { Alert, Button, Card, Container } from 'react-bootstrap'
import AddFolderButton from './components/AddFolderButton'
import { useAuth } from '../../context/AuthContext'
import useFolder, { iFile, iFolderState } from '../../hoos/useFolders'
import Folder from './Folder'
import FolderBreadcrumbs from './FolderBreadcrumbs'
import { useLocation, useParams } from 'react-router-dom'
import AddFileButton from './AddFileButton'
import File from './File'

interface iLocatonState {
  folder: iFolderState | undefined
}

export default function Dashboard() {

  // const [error, seterror] = useState('')

  // const {  logout } = useAuth()
  const params = useParams()
  const location = useLocation()
  const state: iLocatonState = location.state as iLocatonState || { folder: undefined }

  // test folderID 3tbLlFDAoziLyO2SrMyr

  const { folder, childFolders, childFiles } = useFolder(params.folderId, state?.folder)

  console.log('childFiles', childFiles)
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
        <div className="d-flex flex-wrap">
          {
            childFolders && childFolders?.length ? childFolders.map((childFolder: iFolderState, index: number) => (


              <div key={index}
                style={{ maxWidth: '240px' }}
                className="p-2"
              >
                {
                  childFolder &&
                  <Folder folder={childFolder} />
                }

              </div>
            ))

              : null
          }
        </div>


        {
          (childFolders?.length && childFiles?.length) ? <hr /> : null
        }

        <div className="d-flex flex-wrap">

          {childFiles && childFiles?.length ? childFiles.map((childFile: iFile, index: number) => (
            <div key={index}
              style={{ maxWidth: '240px' }}
              className="p-2"
            >
              {
                childFile &&
                <File file={childFile} />
              }

            </div>
          ))

            : 'childFile::Null'
          }
        </div>
      </Container>
    </>
  )
}

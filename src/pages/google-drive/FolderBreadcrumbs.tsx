import React from 'react'
import { Breadcrumb } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'

import { iFolderState, ROOT_FOLDER } from '../../hoos/useFolders'
interface iProps {
  currentFolder?: iFolderState
}
export default function FolderBreadcrumbs({ currentFolder }: iProps) {
  // return  <div>2234</div>

  const navigate = useNavigate()

  let path: Array<iFolderState> = currentFolder === ROOT_FOLDER ? [] : [ROOT_FOLDER]
  if (currentFolder && currentFolder?.path) {
    path = [...path, ...currentFolder.path, currentFolder]
  }

  // if (!path.length) {
  //   path.push(ROOT_FOLDER)
  // }

  /**
   *
   *
    root: []  fack folder
    Root1 []
      Child: [Root1]
        GrandChild: [Root1, Child]
   *
   */


  // const newMap = path.map(folder => {
  //   return {
  //     to: folder.id ? `/folder/${folder.id}'}` : '/',
  //     state: { folder }
  //   }

  // })
  // console.log('newMap', newMap)

  return (
    <div>
      <Breadcrumb
        className="flex-grow-1"
        listProps={
          {
            className: 'bg-white pl-0 m-0'
          }
        }
      >
        {
          path.length ? path.map((folder: iFolderState, index) => (
            <Breadcrumb.Item
              className="text-truncate d-inline-block"
              key={index}
              // linkAs={Link}
              style={{
                maxWidth: '150px'
              }}
              // href={`/folder/${folder.id}'}`}
              // linkProps={{
              //   to: folder.id ? `/folder/${folder.id}'}` : '/',
              //   state: { folder }
              // }}
              onClick={(e) => {
                e.preventDefault()
                navigate(
                  folder?.id ? `/folder/${folder?.id}` : '/',
                  {
                    // replace: `/folder/${folder?.id}`,
                    state: { folder }
                  }
                )
              }}
            >
              {folder?.name}
            </Breadcrumb.Item>

          ))
            :
            < Breadcrumb.Item
              className="text-truncate d-inline-block"
              // linkAs={Link}
              style={{
                maxWidth: '150px'
              }}
              href='/'
            >
              ~
            </Breadcrumb.Item>
        }
      </Breadcrumb>
    </div >
  )
}

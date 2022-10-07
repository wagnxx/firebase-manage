import { faFolder } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { forwardRef } from 'react'
import { Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'

import { iFolderState } from '../../hoos/useFolders'

interface iProps {
  folder: iFolderState
}

export default function Folder({ folder }: iProps) {
  // return <h2>folder  comp</h2>
  const navigate = useNavigate()
  return (
    <Button
      // to={`/folder/${folder?.id}`}
      onClick={() => navigate(
        folder?.id ? `/folder/${folder?.id}` : '/',
        {
          // replace: `/folder/${folder?.id}`,
          state: { folder }
        })}
      variant="outline-dark"
      className="text-truncate w-100"

    >
      <FontAwesomeIcon icon={faFolder} className="mr-4" />
      {
        folder.name
      }
    </Button>
  )
}

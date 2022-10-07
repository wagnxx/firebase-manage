import { faFile } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { iFile } from '../../hoos/useFolders'

interface iProps {
  file: iFile
}

export default function File({ file }: iProps) {
  return (
    <a
      href={file.url}
      title={file.id}
      target="_blank"
      className="btn btn-outline-dark text-truncate w-100"
    >
      <FontAwesomeIcon icon={faFile} />
      {file.name}

    </a>
  )
}

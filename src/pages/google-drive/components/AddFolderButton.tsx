import React, { FormEvent, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolderPlus } from '@fortawesome/free-solid-svg-icons'
import { Button, Form, Modal } from 'react-bootstrap'
import { database } from '../../../firebase'
import { useAuth } from '../../../context/AuthContext'
import { ROOT_FOLDER } from '../../../hoos/useFolders'

type iFolder = {
  currentFolder: any
}

export default function AddFolderButton({ currentFolder }: iFolder) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const { currentUser } = useAuth()


  function openModal() {
    setOpen(true)
  }
  function closeModal() {
    setOpen(false)
  }
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!currentFolder) return

    /**
     *
     *
      root: []  fack folder
      Root1 []
        Child: [Root1]
          GrandChild: [Root1, Child]
     *
     */

    debugger

    const path = [...currentFolder.path]
    if (currentFolder) {
      path.push({
        name: currentFolder.name,
        id: currentFolder.id
      })
    }

    database.addDoc(database.folders, {
      name,
      userId: currentUser?.uid,
      parentId: currentFolder.id,
      path,
      createdAt: database.getCurrentTimestamp(),
    })
      .then(res => {
        //upadate folder in effect of onSnapshot
      })

    setName('')
    closeModal()
  }
  return (
    <>
      <Button onClick={openModal} variant="outline-successs" size="lg">
        <FontAwesomeIcon icon={faFolderPlus} />
      </Button>
      <Modal show={open} onHide={closeModal}>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Folder Name</Form.Label>
              <Form.Control
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary"
              onClick={closeModal}
            >
              Close
            </Button>
            <Button variant="success"
              type="submit"
            >
              Add Folder
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  )
}

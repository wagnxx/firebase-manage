import { faFileUpload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { v4 as uuidV4 } from 'uuid'
import { FieldPath } from 'firebase/firestore'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { Form, ProgressBar, Toast } from 'react-bootstrap'
import { useAuth } from '../../context/AuthContext'
import { database } from '../../firebase'
import { ROOT_FOLDER } from '../../hoos/useFolders'
import ReactDOM from 'react-dom'



type iFolder = {
  currentFolder: any
}
type iUploadingFiles = {
  id: string
  name: string
  progress: number
  error: boolean
}

export default function AddFileButton({ currentFolder }: iFolder) {
  const { currentUser } = useAuth()
  if (!currentUser) return null

  // use hooks
  const [uploadingFiles, setUploadingFiles] = useState<iUploadingFiles[]>([])

  function handleUpload(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]

    if (!currentFolder || !file) return
    const id = uuidV4()
    setUploadingFiles(preUploadingFiles => [
      ...preUploadingFiles,
      {
        id,
        name: file.name,
        progress: 0,
        error: false
      }
    ])

    let currentFolderPath = currentFolder.path.map((folder: any) => folder.name)
    currentFolderPath = currentFolderPath.filter(Boolean)
    const parentPath = currentFolderPath.length > 0
      ?
      ` ${currentFolderPath.join('/')}/${file.name}`
      : ''
    const filePath = currentFolder === ROOT_FOLDER
      ? `${parentPath}/${file.name}`
      : `${parentPath}/${currentFolder.name}/${file.name}`
    // TODO  upload

    const { getStorage, ref, uploadBytesResumable, getDownloadURL } = database

    const storage = getStorage();

    // // Create the file metadata
    // /** @type {any} */
    // const metadata = {
    //   contentType: 'image/jpeg'
    // };

    // Upload file and metadata to the object 'images/mountains.jpg'
    const storageRef = ref(storage, '/files/' + currentUser?.uid + '/' + filePath);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on('state_changed',
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }

        setUploadingFiles(preUploadingFiles => {
          return preUploadingFiles.map(uploadFile => {
            if (uploadFile.id == id) {
              return { ...uploadFile, progress }
            }
            return uploadFile
          })
        })
      },
      (error) => {
        setUploadingFiles(preUploadingFiles => {
          return preUploadingFiles.map(uploadFile => {
            if (uploadFile.id == id) {
              return { ...uploadFile, error: true }
            }
            return uploadFile
          })
        })
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
          case 'storage/canceled':
            // User canceled the upload
            break;

          // ...

          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      () => {
        setUploadingFiles(preUploadingFiles => {
          return preUploadingFiles.filter(uploadFile => {
            return uploadFile.id !== id;
          })
        })
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
          database.addDoc(database.files, {
            url: downloadURL,
            name: file.name,
            createdAt: database.getCurrentTimestamp(),
            folderId: currentFolder.id,
            userId: currentUser?.uid
          })
        });
      }
    );
  }



  return (
    <>
      <label className="btn btn-outline-success btn-sm m-0 mr-2">
        <FontAwesomeIcon icon={faFileUpload} />
        <input
          type="file"
          onChange={handleUpload}
          style={{
            opacity: 0,
            position: 'absolute',
            left: '-9999990px'
          }}
        />

      </label>

      {
        uploadingFiles.length ?
          ReactDOM.createPortal(
            <div
              style={{
                position: 'absolute',
                bottom: '1rem',
                right: '1rem',
                maxWidth: '250px'
              }}
            >
              {
                uploadingFiles.map(file => (
                  <Toast key={file.id}
                    onClose={() => {
                      setUploadingFiles(prevUploadingFiles => {
                        return prevUploadingFiles.filter(uploadFile => {
                          return uploadFile.id !== file.id
                        })
                      })
                    }}
                  >
                    <Toast.Header
                      className="text-truncate w-100 d-block"
                      closeButton={file.error}
                    >
                      {file.name}
                    </Toast.Header>
                    <Toast.Body>
                      <ProgressBar
                        variant={file.error ? 'danger' : 'primary'}
                        now={file.error ? 100 : file.progress * 100}
                        label={
                          file.error ? 'Error' :
                            `${Math.round(file.progress) * 100} / %`
                        }
                      />
                    </Toast.Body>
                  </Toast>
                ))
              }
            </div>,
            document.body
          )
          : null
      }

    </>
  )
}

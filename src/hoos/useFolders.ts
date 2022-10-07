import { ActionCodeOperation } from "firebase/auth";
import { onSnapshot, where } from "firebase/firestore";
import React, { useEffect, useReducer } from "react";
import { findDOMNode } from "react-dom";
import { useAuth } from "../context/AuthContext";
import { database } from "../firebase";

// INTERFACE 

export interface iFile {
  // fileId: string | null
  // file: string | null
  id: string
  name: string
  url: string
}


interface iFolder {
  id?: string
  folderId?: string
  name?: string

  folder?: iFolder
  path?: iFolder[]
  childFolders?: iFolder[]
  childFiles?: iFile[]
}


export interface iFolderState extends iFolder {

}

interface iActionPayload {
  id?: string
  folderId?: string
  name?: string
  folder?: iFolder
  childFolders?: iFolder[]
  childFiles?: iFile[]
}

interface iAction {
  type: string
  payload: iFolderState
}

// ACITNS
const ACTIONS = {
  SELECT_FOLDER: 'select-folder',
  UPDATE_FOLDER: 'update-folder',
  SET_CHILD_FOLDERS: 'set-child-folders',
  SET_CHILD_FILES: 'set-child-fiels'
}

export const ROOT_FOLDER = { name: 'Root', id: '', path: [] }

const reducer = (state: iFolderState, { type, payload }: iAction) => {

  switch (type) {
    case ACTIONS.SELECT_FOLDER:
      return {
        folderId: payload?.folderId,
        folder: payload?.folder,
        childFiles: [],
        childFolders: []

      }

    case ACTIONS.UPDATE_FOLDER:
      return {
        ...state,
        folder: payload.folder
      }

    case ACTIONS.SET_CHILD_FOLDERS:
      return {
        ...state,
        childFolders: payload.childFolders
      }

    case ACTIONS.SET_CHILD_FILES:
      return {
        ...state,
        childFiles: payload.childFiles
      }

    default:
      return state
  }

}

// main func
export default function useFolder(folderId: string = '', folder?: iFolderState | undefined) {

  const [state, dispatch] = useReducer(reducer, {
    folderId,
    folder,
    childFolders: [],
    childFiles: []
  })

  const { currentUser } = useAuth()

  // effect list
  useEffect(() => {
    dispatch({
      type: ACTIONS.SELECT_FOLDER,
      payload: {
        folderId,
        folder
      }
    })
  }, [folderId, folder])

  useEffect(() => {
    // todo db
    if (!folderId) {
      dispatch({
        type: ACTIONS.UPDATE_FOLDER,
        payload: {
          folder: ROOT_FOLDER
        }
      })
      return
    }
    database.getDoc('folders', folderId)
      .then(doc => {
        // console.log('doc.data:::', database.formatDoc(doc))
        dispatch({
          type: ACTIONS.UPDATE_FOLDER,
          payload: {
            folder: database.formatDoc(doc)
          }
        })
      })
      .catch(() => {
        dispatch({
          type: ACTIONS.UPDATE_FOLDER,
          payload: {
            folder: ROOT_FOLDER
          }
        })
      })
  }, [folderId])


  useEffect(() => {
    // if (!folderId || !currentUser) return
    const q = database.query(
      database.folders,
      where('parentId', '==', folderId),
      where('userId', '==', currentUser?.uid)
    )

    onSnapshot(q, snashots => {
      if (!snashots.docs) return;
      dispatch({
        type: ACTIONS.SET_CHILD_FOLDERS,
        payload: {
          childFolders: snashots.docs?.map(database.formatDoc)
          // childFolders:[]
        }
      })
    })

    // database.getDocs(q)
    //   .then(snashots => {
    //     if (!snashots.docs) return;
    //     dispatch({
    //       type: ACTIONS.SET_CHILD_FOLDERS,
    //       payload: {
    //         childFolders: snashots.docs?.map(database.formatDoc)
    //         // childFolders:[]
    //       }
    //     })
    //   })
  }, [folderId, currentUser])

  useEffect(() => {
    // if (!folderId || !currentUser) return
    const q = database.query(
      database.files,
      where('folderId', '==', folderId),
      where('userId', '==', currentUser?.uid)
    )

    onSnapshot(q, snashots => {
      if (!snashots.docs) return;
      dispatch({
        type: ACTIONS.SET_CHILD_FILES,
        payload: {
          childFiles: snashots.docs?.map(database.formatDoc)
          // childFolders:[]
        }
      })
    })

  }, [folderId, currentUser])




  return state
}

import { useEffect, useReducer } from "react";
import { database, db } from "../firebase/firebase";
import {
  addDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
// import { orderByChild, query } from "firebase/database";
const ACTIONS = {
  SELECT_FOLDER: "select-folder",
  UPDATE_FOLDER: "update-folder",
  SET_CHILD_FOLDERS: "set-child-folders",
  SET_CHILD_FILES: "set-child-files",
  SET_LOADING: "set-loading",
};

export const ROOT_FOLDER = { name: "Root", id: null, path: [] };
function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.SELECT_FOLDER:
      return {
        folderId: payload.folderId,
        folder: payload.folder,
        childFolders: [],
        childFiles: [],
      };
    case ACTIONS.UPDATE_FOLDER:
      return {
        ...state,
        folder: payload.folder,
      };

    case ACTIONS.SET_CHILD_FOLDERS:
      return {
        ...state,
        childFolders: payload.childFolders,
        isFoldersLoading: false,
      };
    case ACTIONS.SET_CHILD_FILES:
      return {
        ...state,
        childFiles: payload.childFiles,
        isFilesLoading: false,
      };
    case ACTIONS.SET_LOADING:
      return {
        ...state,
        isFoldersLoading: payload.isFoldersLoading,
        isFilesLoading: payload.isFilesLoading,
      };
    default:
      return state;
  }
}

export const useFolder = (folderId = null, folder = null) => {
  const [state, dispatch] = useReducer(reducer, {
    folderId,
    folder: null,
    childFolders: [],
    childFiles: [],
    isFoldersLoading: true,
    isFilesLoading: true,
  });

  async function getFolder() {
    const docRef = doc(db, "folders", folderId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // console.log("Document data:", docSnap.data());
      // console.log("Document data:", database.formatedDoc(docSnap));
      return dispatch({
        type: ACTIONS.UPDATE_FOLDER,
        payload: { folder: database.formatedDoc(docSnap) },
      });
    } else {
      throw new Error("No such document!");

      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }

  useEffect(() => {
    dispatch({ type: ACTIONS.SELECT_FOLDER, payload: { folder, folderId } });
  }, [folder, folderId]);

  useEffect(() => {
    if (folderId == null) {
      return dispatch({
        type: ACTIONS.UPDATE_FOLDER,
        payload: { folder: ROOT_FOLDER },
      });
    }

    getFolder().catch((error) => {
      return dispatch({
        type: ACTIONS.UPDATE_FOLDER,
        payload: { folder: ROOT_FOLDER, isFoldersLoading: false },
      });
      console.log("Error getting document:", error);
    });
  }, [folderId]);

  // For getting child folders
  useEffect(() => {
    let q = query(
      database.folders,
      where("parentId", "==", folderId)
      // orderBy("createdAt")
    );
    dispatch({
      type: ACTIONS.SET_LOADING,
      payload: { isFoldersLoading: true, isFilesLoading: true },
    });

    // getDocs(q)
    return onSnapshot(q, (querySnapshot) => {
      dispatch({
        type: ACTIONS.SET_CHILD_FOLDERS,
        payload: {
          childFolders: querySnapshot.docs.map(database.formatedDoc),
          isFoldersLoading: false,
        },
      });
    });
  }, [folderId]);

  // For getting child files
  useEffect(() => {
    let q = query(
      database.files,
      where("folderId", "==", folderId)
      // orderBy("createdAt")
    );

    dispatch({
      type: ACTIONS.SET_LOADING,
      payload: { isFoldersLoading: true, isFilesLoading: true },
    });
    // getDocs(q)
    return onSnapshot(q, (querySnapshot) => {
      dispatch({
        type: ACTIONS.SET_CHILD_FILES,
        payload: {
          childFiles: querySnapshot.docs.map(database.formatedDoc),
          isFilesLoading: false,
        },
      });
    });
  }, [folderId]);

  return state;
};

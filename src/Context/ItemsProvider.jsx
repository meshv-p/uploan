import { getStorage, ref, getMetadata } from "firebase/storage";
import React, { useContext, useEffect, useState } from 'react'
import { ROOT_FOLDER, useFolder } from "../hooks/useFolder";

const ItemsContext = React.createContext()

export function useItems() {
  return useContext(ItemsContext)
}
export const ItemsProvider = ({ children }) => {
  const [items, setItems] = React.useState([])
  const [item, setItem] = React.useState(null)
  const [itemInfo, setItemInfo] = useState(null)
  const [sideBarShow, setSideBarShow] = useState(false)

  // Get metadata properties from firebase storage
  function getInformation(item) {
    const storage = getStorage();
    const storageRef = ref(storage, `files/${item.ref}`);
    getMetadata(storageRef).then((metadata) => {
      // Metadata now contains the metadata for 'images/forest.jpg'
      console.log(metadata)
      setItemInfo(metadata)
    }
    ).catch((error) => {
      // Uh-oh, an error occurred!
      console.log(error)
    }
    );

    // getMetadata(forestRef)
    //   .then((metadata) => {
    //     // Metadata now contains the metadata for 'images/forest.jpg'
    //   })
    //   .catch((error) => {
    //     // Uh-oh, an error occurred!
    //   });

  }


  useEffect(() => {
    console.log(item);
    item && getInformation(item)

  }, [items, item])



  useEffect(() => {
    console.log(items);


  }, [items])


  let value = {
    items,
    setItems,
    item,
    setItem,
    itemInfo,
    setItemInfo,
    sideBarShow,
    setSideBarShow,



    getInformation
  }
  return (
    <ItemsContext.Provider value={value}>
      {children}
    </ItemsContext.Provider>
  )
}

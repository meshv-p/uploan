import React, { useContext, useEffect } from 'react'

const ItemsContext = React.createContext()

export function useItems() {
  return useContext(ItemsContext)
}
export const ItemsProvider = ({ children }) => {
  const [items, setItems] = React.useState([])


  useEffect(() => {
    console.log(items);


  }, [items])


  let value = {
    items,
    setItems,
  }
  return (
    <ItemsContext.Provider value={value}>
      {children}
    </ItemsContext.Provider>
  )
}

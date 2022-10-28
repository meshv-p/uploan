import React, { useState } from 'react'
import { FolderIcon } from "@heroicons/react/solid"
import { useItems } from '../Context/ItemsProvider'
import { ROOT_FOLDER } from '../hooks/useFolder'

export const File = ({ file, folder }) => {
    const [active, setActive] = useState(false)
    let { setItems, setItem } = useItems()

    return (
        <li key={file.name} className={`item p-1 ${active ? 'border-indigo-500  border-2' : ''} relative rounded border hover:border-indigo-400  group-aria-selected:border-indigo-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500`}>
            {/* <a href={file.url} target="_blank" rel="noopener noreferrer"> */}
            <div onClick={() => {
                //select file and show selected border
                if (active) {
                    setItem(null)
                    // setItems(prev => prev.filter(item => item.name !== file.name))
                    setActive(false)
                }
                else {
                    //add file reference to items array
                    const filePath =
                        folder === ROOT_FOLDER
                            ? `${folder.path.join("/")}/${file.name}`
                            : `${folder.path.join("/")}/${folder.name}/${file.name}`
                    console.log(filePath)

                    // setItems(prev => [...prev,
                    // {
                    //     ...file,
                    //     ref: filePath
                    // }
                    // ])
                    setItem(pre => ({ ...file, ref: filePath }))
                    setActive(true)
                }

            }}
                onDoubleClick={() => {
                    //open file  in new tab
                    window.open(file.url, "_blank")



                    console.log('double clicked');

                }}
            >

                <div className="group  block w-44 h-44 aspect-w-10 aspect-h-7 rounded-lg  overflow-hidden">
                    <img src={file.url} alt="Loading.." loading='lazy' className=" object-cover pointer-events-none group-hover:opacity-75" />
                    <button type="button" className="absolute inset-0 focus:outline-none">
                        <span className="sr-only">View details for {file.title}</span>
                    </button>
                </div>
                <div className="py-1">
                    <div className="relative rounded-lg    px-2 py-2 shadow-sm flex items-center space-x-3 hover:border-gray-400 ">
                        <div className="flex-shrink-0">
                            <span className="sr-only">Icon</span>
                            <FolderIcon className="h-6 w-6" aria-hidden="true" />

                            {/* <img className="h-10 w-10 rounded-full" src={person.imageUrl} alt="" /> */}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="focus:outline-none">
                                <span className="absolute inset-0" aria-hidden="true" />
                                <p className=" block text-sm font-medium text-gray-900 w-24  truncate pointer-events-none">{file.name}</p>
                                <p className="block text-sm font-medium text-gray-500 pointer-events-none">{file.size}</p>
                            </div>
                        </div>
                    </div>



                </div>
            </div>

        </li >
    )
}

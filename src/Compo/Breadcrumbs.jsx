import { ChevronRightIcon } from '@heroicons/react/solid'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ROOT_FOLDER } from '../hooks/useFolder'

export const Breadcrumbs = ({ currentFolder }) => {
    let path = currentFolder === ROOT_FOLDER ? [] : [ROOT_FOLDER]

    if (currentFolder) {
        path = [...path, ...currentFolder?.path]
    }


    return (
        <div className='flex items-center'>
            {
                path && path.map((folder, index) => (
                    <li key={folder.index}>
                        <div className="flex items-center" >
                            <Link to={folder.id ? `/folder/${folder.id}` : '/'}
                                state={{ folder: { ...folder, path: path.slice(1, index) } }}
                                className="ml-1 text-sm font-medium text-gray-500 hover:text-gray-700">
                                {folder?.name}
                            </Link>
                            <ChevronRightIcon className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
                        </div>
                    </li>
                ))
            }
            {
                currentFolder &&
                <div>{currentFolder.name}</div>
            }



        </div>
    )
}

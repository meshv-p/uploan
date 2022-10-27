import React from 'react'
import { DotsVerticalIcon, FolderIcon } from '@heroicons/react/solid'
import { Link } from 'react-router-dom'
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}
export const Folder = ({ childFolder }) => {
    return (
        <li key={childFolder.name} className="col-span-1 flex shadow-sm rounded-md  hover:border-indigo-400 hover:border ">
            <div
                className='flex-shrink-0 flex items-center justify-center w-16 text-black text-sm font-medium rounded-l-md bg-slate-200 '
            >
                <FolderIcon className="h-6 w-6" aria-hidden="true" />
                <span className="sr-only">View notifications</span>
                {/* {childFolder.initials} */}
            </div>
            <div className=" p-1 flex-1 flex items-center justify-between border-t border-r border-b border-gray-200  bg-white rounded-r-md truncate">
                <div className="flex-1 px-4 py-2 text-sm truncate">
                    <Link to={`/folder/${childFolder.id}`}

                        state={{ folder: childFolder }}
                        className="text-gray-900 font-medium hover:text-gray-600 truncate max-w-sm">
                        {childFolder.name}
                    </Link>
                    {/* <p className="text-gray-500">{(childFolder.createdAt).toDate().toDateString()} </p> */}
                </div>
                <div className="flex-shrink-0 pr-2">
                    <button
                        type="button"
                        className="w-8 h-8 bg-white inline-flex items-center justify-center text-gray-400 rounded-full bg-transparent hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        <span className="sr-only">Open options</span>
                        <DotsVerticalIcon className="w-5 h-5" aria-hidden="true" />
                    </button>
                </div>
            </div>
        </li>
    )
}

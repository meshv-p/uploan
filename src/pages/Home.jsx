import React from 'react'
import { Folders } from '../Compo/Folders'
import { Files } from '../Compo/Files'
import AddFolder from '../Compo/AddFolder'
import { useFolder } from '../hooks/useFolder'
import { useLocation, useParams } from 'react-router-dom'
import { Breadcrumbs } from '../Compo/Breadcrumbs'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'
import {

    InformationCircleIcon,

    ViewListIcon,

} from '@heroicons/react/outline'
import { AddFileButton } from '../Compo/AddFileButton'

export const Home = () => {
    let { folderId } = useParams()
    let { state } = useLocation()
    console.log(state)
    let { folder, childFolders, childFiles } = useFolder(folderId, state?.folder);
    try {

        console.log(folder)
    } catch (error) {
        console.log(error);
    }
    return (
        <>

            {/* Bread */}
            <div className="md:pl-64 flex flex-col flex-1">
                <main className="flex-1">

                    <div className="py-6">
                        <div className="px-6">
                            <nav className="sm:hidden" aria-label="Back">
                                <a href="#" className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700">
                                    <ChevronLeftIcon className="flex-shrink-0 -ml-1 mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                                    Back
                                </a>
                            </nav>
                            <nav className="hidden sm:flex mb-4 flex justify-between" aria-label="Breadcrumb">
                                <ol className="flex items-center space-x-4">
                                    <Breadcrumbs currentFolder={folder} />


                                    {/* <li>
                                        <div className="flex">
                                            <a href="#" className="text-sm font-medium text-gray-500 hover:text-gray-700">
                                                Jobs
                                            </a>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="flex items-center">
                                            <ChevronRightIcon className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
                                            <a href="#" className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">
                                                Engineering
                                            </a>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="flex items-center">
                                            <ChevronRightIcon className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
                                            <a href="#" aria-current="page" className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">
                                                Back End Developer
                                            </a>
                                        </div>
                                    </li> */}
                                </ol>
                                <div className="option ml-4 flex-shrink-0 flex items-start space-x-4">
                                    <div className="ml-4 flex items-center md:ml-6">
                                        <button
                                            type="button"
                                            className="bg-white rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
                                            <ViewListIcon className="h-6 w-6" aria-hidden="true" />
                                            <span className="sr-only">List View</span>
                                        </button>
                                    </div>
                                    <div className="ml-4 flex items-center md:ml-6">
                                        <button
                                            type="button"
                                            className="bg-white rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
                                            <InformationCircleIcon className="h-6 w-6" aria-hidden="true" />
                                            <span className="sr-only">Information</span>
                                        </button>
                                    </div>
                                </div>
                            </nav>
                            <hr />
                        </div>



                        {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
    </div> */}
                        {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Replace with your content 
        <div className="py-4">
            <div className="border-4 border-dashed border-gray-200 rounded-lg h-96" />
        </div>
        {/* /End replace *
    </div> */}
                    </div>
                </main>
            </div>
            <div className=' md:pl-64 flex flex-col flex-1 pl-2'>
                <div className=" px-6 mt-2 md:flex md:items-center md:justify-between">

                    <div className="flex-1 min-w-0">
                        <h2 className="text-xl mb-2 font-bold leading-6 text-gray-900 sm:text-2xl sm:truncate">Folders</h2>
                        <hr />
                    </div>
                    <div className="mt-4 flex-shrink-0 flex md:mt-0 md:ml-4">
                        {/* <button
                        type="button"
                        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Make new folder
                    </button> */}
                        <AddFolder currentFolder={folder} />
                        {/* <Modal /> */}
                        {/* <button
                        type="button"
                        className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Publish
                    </button> */}
                    </div>
                </div>

                {/* TODO: Folders go heres */}
                <div className=" px-6 mt-2 md:flex md:items-center md:justify-between">
                    <Folders folders={childFolders} />
                </div>


                <div className=" px-6 mt-7 md:flex md:items-center md:justify-between">
                    <div className="flex-1 min-w-0">
                        <h2 className="text-xl mb-2 font-bold leading-7 text-gray-900 sm:text-2xl sm:truncate">Files</h2>
                        <hr />
                    </div>
                    <div className="mt-4 flex-shrink-0 flex md:mt-0 md:ml-4">
                        <AddFileButton currentFolder={folder} />
                        {/* <button
                            type="button"
                            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Upload new file
                        </button> */}
                        {/* <button
                        type="button"
                        className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Publish
                    </button> */}
                    </div>
                </div>

                {/* TODO: Folders go heres */}
                <div className=" px-6 mt-2 md:flex md:items-center md:justify-between">
                    <Files childFiles={childFiles} />
                </div>
            </div>

        </>
    )
}
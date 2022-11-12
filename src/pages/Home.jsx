import React, { useEffect, useState } from 'react'
import { Folders } from '../Compo/Folders'
import { Files } from '../Compo/Files'
import AddFolder from '../Compo/AddFolder'
import { ROOT_FOLDER, useFolder } from '../hooks/useFolder'
import { useLocation, useParams } from 'react-router-dom'
import { Breadcrumbs } from '../Compo/Breadcrumbs'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'
import {

    InformationCircleIcon,

    ShareIcon,

    TrashIcon,

    ViewListIcon,

} from '@heroicons/react/outline'
import { AddFileButton } from '../Compo/AddFileButton'
// import DragSelect from 'dragselect'
import { useItems } from '../Context/ItemsProvider'
import { doc, deleteDoc } from "firebase/firestore";
import { db, storage } from '../firebase/firebase'
import { deleteObject, ref } from 'firebase/storage'
import AsideBar from '../Compo/AsideBar'
import { Skeleton } from '@mui/material'
import Modal from '../Compo/Modal'

export const Home = () => {
    let { folderId } = useParams()
    let { state } = useLocation()
    // console.log(state)
    let f = useFolder(folderId, state)
    let { folder, childFolders, childFiles, isFilesLoading, isFoldersLoading } = useFolder(folderId, state?.folder);
    const [isModalOpen, setIsModalOpen] = useState(false)

    let { setItems, items, item, getInformation, setSideBarShow, sideBarShow, setItem } = useItems()

    useEffect(() => {
        console.log(isFilesLoading, isFoldersLoading, f);
        //     console.log(document?.getElementsByClassName('folder'));
        //     let ds = new DragSelect({
        //         selectables: document.getElementsByClassName('folder'),
        //     });
        //     ds.subscribe('callback', ({ items, event }) => {
        //         console.log(items, event)
        //     })
        //     // returns all currently selected nodes:
        //     console.log(ds.getSelection());
        // }, [])
        // useEffect(() => {
        // //     console.log(selectedFolder)
        // let ds = new DragSelect({
        //     selectables: document.getElementsByClassName('item'),
        //     draggability: false,
        //     area: document.getElementById('items')
        // });
        // let i = []
        // ds.subscribe('dragstart', ({ items, event, isDragging, isDraggingKeyboard }) => {
        //     console.log(items, event, isDragging, isDraggingKeyboard)
        //     setItems(items)


        //     console.log(items);
        // })
        // returns all currently selected nodes:

    }, [])

    async function handleDelete() {

        if (item) {
            const storageRef = ref(storage, `files/${item.ref}`);
            await deleteObject(storageRef)
            const docRef = doc(db, "files", item.id);
            await deleteDoc(docRef);
            setItem(null)
            return
        }

        // check url in items
        if (items[0].url) {
            // delete file
            console.log('delete file');
            // delete file from firebase
            await deleteDoc(doc(db, "files", items[0].id));
            // delete file from storage
            await deleteObject(ref(storage, items[0].url));
            // delete file from items
            setItems(items.filter(item => item.id !== items[0].id))

            console.log('dele')
        } else {

            await deleteDoc(doc(db, "folders", items[0].id));

            setItems(items.filter(item => item.id !== items[0].id))
        }
    }

    function handleShare() {

        if (item) {
            console.log(item)
            // setIsModalOpen(true)
            navigator.share({
                title: item.name,
                text: 'Check out this file',
                url: item.url,
            })
            // navigator.clipboard.writeText(`${item.url}`)
            // return
        }


        console.log('share')
    }

    return (
        <>

            {/* Bread */}
            <div className="md:pl-64 flex flex-col flex-1">
                <main className="flex-1">

                    <div className="py-6">
                        <div className="px-6">
                            {/* <nav className="sm:hidden" aria-label="Back">
                                <a href="#" className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700">
                                    <ChevronLeftIcon className="flex-shrink-0 -ml-1 mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                                    Back
                                </a>
                            </nav> */}
                            <nav className=" sm:flex mb-4 flex justify-between" aria-label="Breadcrumb">
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
                                {
                                    isModalOpen && <Modal
                                        title={`Share '${item.name}'`}
                                        open={isModalOpen}
                                        setOpen={setIsModalOpen}
                                    >
                                        {/* Share links or copy link */}
                                        <div className="flex flex-col items-center justify-center">

                                            {/* For share */}

                                            Share links or copy link

                                            <div className="flex">
                                                <div className="flex flex-row items-center justify-center">

                                                    {/* For copy link button */}
                                                    <button
                                                        onClick={() => navigator.clipboard.writeText(`${item.url}`)}
                                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                                                    >
                                                        {/* TODO: on click text change to done */}
                                                        Copy link
                                                    </button>

                                                    {/* For link share with navigation  button*/}
                                                    <button
                                                        onClick={() => handleShare()}
                                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                                                    >
                                                        Share
                                                    </button>

                                                </div>
                                            </div>


                                        </div>
                                    </Modal>
                                }
                                <div className="option ml-4 flex-shrink-0 flex items-start space-x-4">
                                    {
                                        (item || items?.length > 0) &&
                                        (<>
                                            <div className="ml-4 flex items-center md:ml-6 gap-1">
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        console.log(items)
                                                        // handleDelete()
                                                        setIsModalOpen(true)
                                                        // handleShare()
                                                    }

                                                    }
                                                    className="bg-white rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                >
                                                    <ShareIcon className="h-6 w-6" aria-hidden="true" />
                                                    <span className="sr-only">Delete</span>
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        console.log(items)
                                                        handleDelete()
                                                    }

                                                    }
                                                    className="bg-white rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                >
                                                    <TrashIcon className="h-6 w-6" aria-hidden="true" />
                                                    <span className="sr-only">Delete</span>
                                                </button>

                                            </div>
                                            <hr
                                                className="h-6 w-px bg-gray-200 flex-shrink-0"
                                            />
                                        </>

                                        )
                                    }

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
                                            onClick={() => {
                                                setSideBarShow(!sideBarShow)
                                                //first make ref to folder

                                                // const filePath =
                                                //     folder === ROOT_FOLDER
                                                //         ? `${folder.path.join("/")}/${item.name}`
                                                //         : `${folder.path.join("/")}/${folder.name}/${item.name}`
                                                // console.log(filePath)
                                                // const folderRef = ref(storage, `files/${filePath}`)
                                                // console.log(folderRef)
                                                // getInformation(item)
                                            }}
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


                    </div>
                </main >
            </div >
            <div className='flex flex-row ' id='items'>
                <div className="md:pl-64 flex flex-col flex-1 pl-2">

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
                        {/* <Skeleton variant="rounded" width={210} height={60} /> */}

                        <Folders folders={childFolders} isFoldersLoading={isFoldersLoading} />
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

                        <Files childFiles={childFiles} folder={folder} isFilesLoading={isFilesLoading} />
                    </div>

                </div>
                <AsideBar />

            </div>

        </>
    )
}

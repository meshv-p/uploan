/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState } from 'react'
import { Transition } from '@headlessui/react'
import { CheckCircleIcon, ChevronDownIcon, ExclamationCircleIcon, XCircleIcon } from '@heroicons/react/outline'
import { FolderIcon, XIcon } from '@heroicons/react/solid'

export default function Toaster({ show, fileList, setShow }) {
    // const [show, setShow] = useState(true)

    return (
        <>
            {/* Global notification live region, render this permanently at the end of the document */}
            <div
                aria-live="assertive"
                className="fixed right-0 bottom-0 w-96 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start"
            >
                <div className="w-full flex flex-col items-center space-y-4 sm:items-end">
                    {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
                    <Transition
                        show={show}
                        as={Fragment}
                        enter="transform ease-out duration-300 transition"
                        enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
                        enterTo="translate-y-0 opacity-100 sm:translate-x-0"
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
                            <div className="p-4">
                                <div className="flex items-start">
                                    {/* <div className="flex-shrink-0">
                                        <CheckCircleIcon className="h-6 w-6 text-green-400" aria-hidden="true" />
                                    </div> */}
                                    <div className="ml-3 w-0 flex-1 pt-0.5">
                                        <p className="text-sm font-medium text-gray-900">Uploading Files</p>
                                        {/* <p className="mt-1 text-sm text-gray-500">Anyone with a link can now view this file.</p> */}
                                        {/* List */}

                                        <div className="flow-root mt-6">
                                            <ul role="list" className="-my-5 divide-y divide-gray-200">

                                                {
                                                    fileList && fileList.map((file, index) => (
                                                        <li key={index} className="py-4">
                                                            <div className="flex items-center space-x-4">
                                                                <div className="text-black">
                                                                    <FolderIcon className="h-6 w-6" aria-hidden="true" />
                                                                    <span className="sr-only">View notifications</span>
                                                                </div>
                                                                <div className="flex-1 min-w-0">
                                                                    <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                                                                    <div class="w-full bg-gray-200 h-1 flex my-1">
                                                                        <div class={`bg-${file.error ? 'red' : 'blue'}-600 h-1`} style={{ width: `${file.progress}%` }}></div>
                                                                        {/* <p className="text-sm text-gray-500 ">10%</p> */}

                                                                    </div>
                                                                </div>

                                                                <div>
                                                                    <button
                                                                        type="button"
                                                                        className="bg-white rounded-full p-1  hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-indigo-500"
                                                                    >
                                                                        {
                                                                            file.progress !== 100 ?
                                                                                (<div className="border border-gray-400 rounded-full flex justify-center   p-1">
                                                                                    <span className='text-xs p-0.5'>{file.progress}%</span>
                                                                                </div>)
                                                                                :
                                                                                file.error ? (<ExclamationCircleIcon className="h-6 w-6 text-red-400" aria-hidden="true" />) : (<CheckCircleIcon className="h-6 w-6 text-green-400" aria-hidden="true" />)
                                                                        }
                                                                        {/* <CheckCircleIcon className="h-5 w-5 text-green-600" aria-hidden="true" /> */}
                                                                        {/* <ExclamationCircleIcon className="h-5 w-5 text-red-600" aria-hidden="true" /> */}
                                                                        {/* <div className="border border-gray-400 rounded-full flex justify-center   p-1">
                                                                            <span className='text-xs p-0.5'>{file.progress}%</span>
                                                                        </div> */}
                                                                        {/* <InformationCircleIcon className="h-6 w-6" aria-hidden="true" /> */}
                                                                        <span className="sr-only">Information</span>
                                                                    </button>

                                                                </div>
                                                            </div>
                                                        </li>
                                                    ))

                                                }


                                                {/* <li key='s' className="py-4">
                                                    <div className="flex items-center space-x-4">
                                                        <div className="text-black">
                                                            <FolderIcon className="h-6 w-6" aria-hidden="true" />
                                                            <span className="sr-only">View notifications</span>
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <p className="text-sm font-medium text-gray-900 truncate">File Name</p>
                                                            <div class="w-full bg-gray-200 h-1 flex my-1">
                                                                <div class="bg-blue-600 h-1" style={{ width: " 10%" }}></div>
                                                                {/* <p className="text-sm text-gray-500 ">10%</p> 

                                                            </div>
                                                        </div>

                                                        <div>
                                                            <button
                                                                type="button"
                                                                className="bg-white rounded-full p-1  hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-indigo-500"
                                                            >
                                                                {/* <CheckCircleIcon className="h-5 w-5 text-green-600" aria-hidden="true" /> 
                                                                {/* <ExclamationCircleIcon className="h-5 w-5 text-red-600" aria-hidden="true" /> 
                                                                <div className="border border-gray-400 rounded-full flex justify-center   p-1">
                                                                    <span className='text-xs p-0.5'>10%</span>
                                                                </div>
                                                                {/* <InformationCircleIcon className="h-6 w-6" aria-hidden="true" /> *
                                                                <span className="sr-only">Information</span>
                                                            </button>

                                                        </div>
                                                    </div>
                                                </li>
                                                <li key='s' className="py-4">
                                                    <div className="flex items-center space-x-4">
                                                        <div className="text-black">
                                                            {/* <img className="h-8 w-8 rounded-full" src={person.imageUrl} alt="" /> 

                                                            <FolderIcon className="h-6 w-6" aria-hidden="true" />
                                                            <span className="sr-only">View notifications</span>
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <p className="text-sm font-medium text-gray-900 truncate">name</p>
                                                            <p className="text-sm text-gray-500 truncate">per</p>
                                                        </div>
                                                        <div>
                                                            <a
                                                                href="#"
                                                                className="inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50"
                                                            >
                                                                View
                                                            </a>
                                                        </div>
                                                    </div>
                                                </li> */}
                                            </ul>
                                        </div>
                                        <div className="mt-6">
                                            <a
                                                href="#"
                                                className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                            >
                                                View all
                                            </a>
                                        </div>
                                    </div>
                                    <div className="ml-4 flex-shrink-0 flex justify-center">
                                        {/* <button
                                            className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                            onClick={() => {
                                                setShow(false)
                                            }}
                                        >
                                            <span className="sr-only">Close</span>
                                            <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
                                        </button> */}
                                        <button
                                            className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                            onClick={() => {
                                                setShow(false)
                                            }}
                                        >
                                            <span className="sr-only">Close</span>
                                            <XIcon className="h-5 w-5" aria-hidden="true" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Transition>
                </div>
            </div>
        </>
    )
}
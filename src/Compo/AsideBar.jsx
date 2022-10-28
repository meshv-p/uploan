/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/
import { Fragment, useEffect, useState } from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
import {
    CogIcon,
    CollectionIcon,
    HeartIcon,
    HomeIcon,
    MenuAlt2Icon,
    PhotographIcon,
    PlusSmIcon as PlusSmIconOutline,
    UserGroupIcon,
    ViewGridIcon as ViewGridIconOutline,
    XIcon,
    CubeIcon
} from '@heroicons/react/outline'
import {

    PencilIcon,
    PlusSmIcon as PlusSmIconSolid,
    SearchIcon,
    ViewGridIcon as ViewGridIconSolid,
    ViewListIcon,
} from '@heroicons/react/solid'
import { useItems } from '../Context/ItemsProvider'


let currentFile = {
    name: 'IMG_4985.HEIC',
    size: '3.9 MB',
    source:
        'https://firebasestorage.googleapis.com/v0/b/blog-4c391.appspot.com/o/files%2FIMG_20211215_145212_566.jpg?alt=media&token=b73154cd-74e7-41fe-82df-c8f2cab7c5d6',
    information: {
        'Uploaded by': 'Marie Culver',
        Created: 'June 8, 2020',
        'Last modified': 'June 8, 2020',
        Dimensions: '4032 x 3024',
        Resolution: '72 x 72',
    },
    sharedWith: [
        // {
        //     id: 1,
        //     name: 'Aimee Douglas',
        //     imageUrl:
        //         'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=1024&h=1024&q=80',
        // },
        // {
        //     id: 2,
        //     name: 'Andrea McMillan',
        //     imageUrl:
        //         'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixqx=oilqXxSqey&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        // },
    ],
}

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function AsideBar() {
    // const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    let { itemInfo, items, item, sideBarShow, setSideBarShow } = useItems()
    // currentFile = itemInfo




    return (
        <>
            {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-50">
        <body class="h-full overflow-hidden">
        ```
      */}
            <div className="h-full flex">


                {/* Content area */}
                {/* <div className="flex-1 flex flex-col overflow-hidden"> */}


                {/* Main content */}
                {/* <div className="flex-1 flex items-stretch overflow-hidden"> */}


                {/* Details sidebar */}
                {
                    sideBarShow && (item ? (
                        <aside className="hidden w-96 bg-white p-3 border-l border-gray-200 overflow-y-auto lg:block">
                            <div className="pb-16 space-y-6">
                                <div>
                                    <div className="block w-full aspect-w-5 aspect-h-5 rounded-lg overflow-hidden">
                                        <img src={item?.source || item?.url} alt="" className="object-cover w-96 h-72" />
                                    </div>
                                    <div className="mt-4 flex items-start justify-between">
                                        <div>
                                            <h2 className="text-lg font-medium text-gray-900">
                                                <span className="sr-only">Details for </span>
                                                {item.name}
                                            </h2>
                                            <p className="text-sm font-medium text-gray-500">{item.size}</p>
                                        </div>
                                        <button
                                            type="button"
                                            className="ml-4 bg-white rounded-full h-8 w-8 flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        >
                                            <HeartIcon className="h-6 w-6" aria-hidden="true" />
                                            <span className="sr-only">Favorite</span>
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-medium text-gray-900">Information</h3>
                                    <dl className="mt-2 border-t border-b border-gray-200 divide-y divide-gray-200">
                                        {/* {Object.keys(currentFile?.information).map((key) => (
                                            <div key={key} className="py-3 flex justify-between text-sm font-medium">
                                                <dt className="text-gray-500">{key}</dt>
                                                <dd className="text-gray-900">{currentFile.information[key]}</dd>
                                            </div>
                                        ))} */}
                                        <div className="py-3 flex justify-between text-sm font-medium">
                                            <dt className="text-gray-500">Type</dt>
                                            <dd className="text-gray-900">{item.contentType}</dd>
                                        </div>
                                        <div className="py-3 flex justify-between text-sm font-medium">
                                            <dt className="text-gray-500">Created</dt>
                                            <dd className="text-gray-900">{item.timeCreated}</dd>
                                        </div>
                                        <div className="py-3 flex justify-between text-sm font-medium">
                                            <dt className="text-gray-500">Last modified</dt>
                                            <dd className="text-gray-900">{item.updated}</dd>
                                        </div>
                                    </dl>
                                </div>

                                <div>
                                    <h3 className="font-medium text-gray-900">Shared with</h3>
                                    <ul role="list" className="mt-2 border-t border-b border-gray-200 divide-y divide-gray-200">
                                        {item?.sharedWith?.map((person) => (
                                            <li key={person.id} className="py-3 flex justify-between items-center">
                                                <div className="flex items-center">
                                                    <img src={person.imageUrl} alt="" className="w-8 h-8 rounded-full" />
                                                    <p className="ml-4 text-sm font-medium text-gray-900">{person.name}</p>
                                                </div>
                                                <button
                                                    type="button"
                                                    className="ml-6 bg-white rounded-md text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                >
                                                    Remove<span className="sr-only"> {person.name}</span>
                                                </button>
                                            </li>
                                        ))}
                                        <li className="py-2 flex justify-between items-center">
                                            <button
                                                type="button"
                                                className="group -ml-1 bg-white p-1 rounded-md flex items-center focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            >
                                                <span className="w-8 h-8 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400">
                                                    <PlusSmIconSolid className="h-5 w-5" aria-hidden="true" />
                                                </span>
                                                <span className="ml-4 text-sm font-medium text-indigo-600 group-hover:text-indigo-500">
                                                    Share
                                                </span>
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                                <div className="flex">
                                    {/* <button
                                        type="button"
                                        className="flex-1 bg-indigo-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        onClick={() => {
                                            window.open(item.url);
                                        }}

                                    > */}
                                    {/* Download */}
                                    <a href={item.url} download>
                                        Download
                                    </a>
                                    {/* </button> */}
                                    <button
                                        type="button"
                                        className="flex-1 ml-3 bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </aside>
                    ) :
                        <Transition.Root show={sideBarShow} as={Fragment}>
                            <Transition.Child
                                as={Fragment}
                                enter="transition ease-in-out duration-300 transform"
                                enterFrom="translate-x-10"
                                enterTo="translate-x-10"
                                leave="transition ease-in-out duration-300 transform"
                                leaveFrom="translate-x-10"
                                leaveTo="translate-x-full"
                            >

                                <aside className="hidden w-96 bg-white p-3 border-l border-gray-200 overflow-y-auto lg:block">
                                    <nav>
                                        <div className="flex justify-between p-1">
                                            <h1 className='text-lg font-bold'>Folders</h1>
                                            <div className="icon">
                                                {/* close icon */}
                                                <button
                                                    type="button"
                                                    className="ml-4 bg-white rounded-full h-8 w-8 flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                    onClick={() => setSideBarShow(false)}
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-6 w-6"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M6 18L18 6M6 6l12 12"
                                                        />
                                                    </svg>

                                                </button>


                                            </div>
                                        </div>

                                        <hr />
                                    </nav>
                                    <div className="p-1 pb-16 space-y-6 flex flex-col items-center justify-center pt-6">
                                        <div className=" w-full aspect-w-5 aspect-h-5 rounded-lg overflow-hidden flex items-center justify-center">
                                            <CubeIcon className='w-44 h-44 text-sm font-thin text-indigo-600' />
                                            {/* <img src={currentFile?.source || item?.url} alt="" className="object-cover w-96 h-72" /> */}
                                        </div>
                                        <span className=''>
                                            Select an item to see details
                                        </span>
                                    </div>
                                </aside>

                            </Transition.Child>
                        </Transition.Root>

                    )
                }

                {/* </div> */}
                {/* </div> */}
            </div>
        </>
    )
}
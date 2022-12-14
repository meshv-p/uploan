/* This example requires Tailwind CSS v2.0+ */
import { Skeleton } from '@mui/material'
import { Folder } from './Folder'

const projects = [
    { name: 'Graph API', initials: 'GA', href: '#', members: 16, bgColor: 'bg-pink-600' },
    { name: 'Component Design', initials: 'CD', href: '#', members: 12, bgColor: 'bg-purple-600' },
    { name: 'Templates', initials: 'T', href: '#', members: 16, bgColor: 'bg-yellow-500' },
    { name: 'React Components', initials: 'RC', href: '#', members: 8, bgColor: 'bg-green-500' },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export function Folders({ folders, isFoldersLoading }) {
    return (
        <div>
            {/* <h2 className="text-gray-500 text-xs font-medium uppercase tracking-wide">Pinned Projects</h2> */}
            <ul role="list" className="folders mt-3 grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4" id='folders'>
                {
                    isFoldersLoading ?
                        <>
                            <Skeleton variant="rounded" width={210} height={60} animation="wave" />
                            <Skeleton variant="rounded" width={210} height={60} animation="wave" />
                            <Skeleton variant="rounded" width={210} height={60} animation="wave" />

                        </>
                        :

                        folders.length > 0 ?

                            folders.map((childFolder) => (

                                <Folder childFolder={childFolder} key={childFolder.name} />
                            ))

                            :
                            <div className="flex"> No folders in this folder </div>


                }
            </ul>
        </div>
    )
}
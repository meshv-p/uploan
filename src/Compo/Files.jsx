import { Box, Skeleton } from "@mui/material"
import { File } from "./File"
// const files = [
//   {
//     title: 'IMG_4985.HEIC',
//     size: '3.9 MB',
//     source:
//       'https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80',
//   },
//   // More files...
// ]

export function Files({ childFiles, folder, isFilesLoading }) {
  return (
    <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8 ">
      {
        isFilesLoading ?

          <div className="flex">
            <Box sx={{ width: 210, marginRight: 0.5, my: 1 }}>
              <Skeleton variant="rounded" width={210} height={218} />
              <Box sx={{ pt: 0.5 }}>
                <Skeleton animation="wave" />
                <Skeleton width="60%" animation="wave" />
              </Box>
            </Box>
          </div>
          :

          childFiles.length > 0 ?

            childFiles && childFiles.map((file) => (

              <File file={file} key={file.id} folder={folder} />
            ))
            :
            <div className="flex"> No files in this folder </div>


      }
    </ul>
  )
}
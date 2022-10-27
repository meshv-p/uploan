import { addDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from 'firebase/storage';
import React, { useState } from 'react'
import { database, storage } from '../firebase/firebase';
import { ROOT_FOLDER } from '../hooks/useFolder';
import Toaster from './Toaster';

export const AddFileButton = ({ currentFolder }) => {
    const [uploadingFiles, setUploadingFiles] = useState([])
    const [show, setShow] = useState(false)


    function handlUpload(e) {
        setShow(true)
        const file = e.target.files[0];
        console.log(file);

        if (currentFolder == null || file == null) return;
        let id = Math.floor(Math.random() * 10000)
        setUploadingFiles(prevUploadingFiles => [
            ...prevUploadingFiles,
            {
                id,
                name: file.name,
                progress: 0,
                error: false

            }

        ])


        const filePath =
            currentFolder === ROOT_FOLDER
                ? `${currentFolder.path.join("/")}/${file.name}`
                : `${currentFolder.path.join("/")}/${currentFolder.name}/${file.name}`

        const uploadFile = ref(storage, `/files/${filePath}`);

        let uploadTask = uploadBytesResumable(uploadFile, file);


        uploadTask.on('state_changed', (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = Math.floor((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            console.log('Upload is ' + progress + '% done');
            setUploadingFiles(prevUploadingFiles => {
                return prevUploadingFiles.map(uploadFile => {
                    if (uploadFile.id === id) {
                        return { ...uploadFile, progress }
                    }
                    return uploadFile
                })
            })
            switch (snapshot.state) {
                case 'paused':
                    console.log('Upload is paused');
                    break;
                case 'running':
                    console.log('Upload is running');
                    break;
            }
        }
            , (error) => {
                // Handle unsuccessful uploads
                setUploadingFiles(prevUploadingFiles => {
                    return prevUploadingFiles.map(uploadFile => {
                        if (uploadFile.id === id) {
                            return { ...uploadFile, error: true, progress: 100 }
                        }
                        return uploadFile
                    })
                })
            }
            , () => {

                // 

                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    addDoc(database.files,
                        {
                            url: downloadURL,
                            name: file.name,
                            createdAt: database.getCurrentTimeStamp(),
                            folderId: currentFolder.id,
                            userId: '1'
                        }
                    ).then((res) => {
                        console.log('file added', res)
                    }
                    ).catch((err) => {
                        console.log('error adding file', err)
                    })
                });
            }
        );


    }

    return (
        <>
            <label htmlFor='file'>

                <div
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Upload new file
                </div>

                <input type="file" name="file" id="file" style={{
                    opacity: 0,
                    position: 'absolute',
                    left: '-9999px'

                }}
                    onChange={handlUpload}

                />
            </label>
            {
                // uploadingFiles.length > 0 &&
                true && <Toaster fileList={uploadingFiles} show={show} setShow={setShow} />
                // <div className="bg-white rounded-lg shadow-lg p-4">
                //     <h1 className="text-gray-500 text-lg font-medium">Uploading files</h1>
                //     <div className="flex items-center space-x-4 mt-4">
                //         {uploadingFiles.map(file => (
                //             <div key={file.id} className="flex flex-col items-center">

                //                 <p className="text-sm text-gray-500">{file.name}</p>
                //                 <p className="text-sm text-gray-500">{file.progress}%</p>
                //             </div>
                //         ))}
                //     </div>
                // </div>



            }
        </>
    )
}

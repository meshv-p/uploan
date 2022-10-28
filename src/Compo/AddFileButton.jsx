import { addDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable, } from 'firebase/storage';
import React, { useEffect, useState } from 'react'
import { database, storage } from '../firebase/firebase';
import { ROOT_FOLDER } from '../hooks/useFolder';
import Toaster from './Toaster';

export const AddFileButton = ({ currentFolder }) => {
    const [uploadingFiles, setUploadingFiles] = useState([
        // {
        //     id: 1,
        //     name: 'file1',
        //     progress: 20,
        //     error: false
        // }
    ])
    const [show, setShow] = useState(true)
    const [uploadTask, setUploadTask] = useState()
    let uploadTaskRef = React.useRef()
    // let uploadTask;


    async function handlUpload(e) {
        setShow(true)
        const file = e.target.files[0];
        // console.log(file);

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

        let uT = uploadBytesResumable(uploadFile, file);
        uploadTaskRef.current = uT
        setUploadTask(uT)
        // await setUploadTask(await uploadBytesResumable(uploadFile, file))
        console.log(uploadTaskRef)



        uT.on('state_changed', (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = Math.floor((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            // console.log('Upload is ' + progress + '% done');
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
                console.log(error, error.serverResponse)
                // setUploadingFiles(prevUploadingFiles => {
                //     return prevUploadingFiles.map(uploadFile => {
                //         if (uploadFile.id === id) {
                //             return { ...uploadFile, error: false, progress: 100 }
                //         }
                //         return uploadFile
                //     })
                // })
            }
            , () => {

                // 

                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                getDownloadURL(uT.snapshot.ref).then((downloadURL) => {
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


        // setTimeout(() => {

        //     console.log('upload pause');
        //     uploadTask.pause();

        // }, 2000);

    }

    // useEffect(() => {
    //     console.log(uploadTask, 'uload task')
    //     setTimeout(() => {
    //         uploadTask && console.log('pausing/ res')
    //         uploadTask && uploadTask.pause()
    //     }, 2000);
    //     // console.log(handlePause);
    // }, [uploadTask])


    // function handlePause() {
    //     console.log(uploadTask)
    //     uploadTask.pause()
    // }

    // function handleResume() {
    //     uploadTask.resume()
    // }


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
                uploadingFiles.length > 0 &&
                <Toaster fileList={uploadingFiles} show={show} setShow={setShow} handlePause={() => {
                    console.log(uploadTaskRef, 'pause')
                    try {
                        uploadTaskRef.current.pause()
                        // uploadTask.pause()
                    } catch (error) {
                        console.log(error, 'is');
                    }
                }} handleResume={() => {

                    console.log('resume', uploadTaskRef)
                    uploadTaskRef.current.resume()
                }} />




            }
        </>
    )
}

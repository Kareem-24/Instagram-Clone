import { on, off } from '../app/features/modal/modalReducer'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useRef, useState } from 'react'
import { CameraIcon } from '@heroicons/react/solid'
import { useDispatch, useSelector } from 'react-redux'
import { db, storage } from '../firebase'
import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore'
import { useSession } from 'next-auth/react'
import { ref, getDownloadURL, uploadString } from 'firebase/storage'

function modal() {
  const { data: session } = useSession()
  const filePickerRef = useRef(null)
  const [selectedFile, setSelectedFile] = useState(null)
  const [loading, setLoading] = useState(null)
  const modal = useSelector((state) => state.modal.value)
  const captionRef = useRef(null)
  const dispatch = useDispatch()

  const handleClose = () => {
    setSelectedFile(null)
    return dispatch(off())
  }
  const uploadPost = async () => {
    if (loading) return

    setLoading(true)
    //adding a document to the database
    const docRef = await addDoc(collection(db, 'posts'), {
      username: session.user.username,
      caption: captionRef.current.value,
      profileImg: session.user.image,
      timestamp: serverTimestamp(),
    })
    // uploading the document to firebase with the post ID
    const imageRef = ref(storage, `posts/${docRef.id}/image`)
    await uploadString(imageRef, selectedFile, 'data_url').then(
      async (snapshot) => {
        const downloadURL = await getDownloadURL(imageRef)
        // get a download URL from firebase storage and update the original post with image
        await updateDoc(doc(db, 'posts', docRef.id), {
          image: downloadURL,
        })
      }
    )
    dispatch(off())
    setLoading(false)
    setSelectedFile(null)
  }

  const addImageToPost = (e) => {
    const reader = new FileReader()
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0])
    }
    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result)
    }
  }

  return (
    <Transition.Root show={modal} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 overflow-y-auto"
        onClose={handleClose}
      >
        <div className="flex min-h-[800px] items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:min-h-screen sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          {/* this element is to trick the browser into centering the modal content */}
          <span
            className="hidden sm:inline-block sm:h-screen sm:align-middle"
            arin-aria-hidden="true"
          >
            &#8203
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div
              className="inline-block transform overflow-hidden rounded-lg
             bg-white px-4 pt-5 pb-4 text-left align-bottom shadow-xl 
             transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6 sm:align-middle"
            >
              <div>
                {selectedFile ? (
                  <img
                    src={selectedFile}
                    alt=""
                    onClick={() => setSelectedFile(null)}
                    className="w-full cursor-pointer object-contain"
                  />
                ) : (
                  <div
                    onClick={() => filePickerRef.current.click()}
                    className="mx-auto flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-red-100"
                  >
                    <CameraIcon
                      className="h-6 w-6 text-red-600"
                      aria-hidden="true"
                    />
                  </div>
                )}

                <div>
                  <div className=" mt-3 text-center">
                    <Dialog.Title
                      as="h3"
                      className="mb-3 text-lg font-medium leading-6 text-gray-900"
                    >
                      Upload a photo
                    </Dialog.Title>
                    <div>
                      <input
                        ref={filePickerRef}
                        type="file"
                        hidden
                        onChange={addImageToPost}
                      />
                    </div>
                    <div>
                      <input
                        ref={captionRef}
                        type="text"
                        placeholder="please enter a caption ..."
                        className="w-full border-none text-center focus:ring-0"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-5 sm:mt-6">
                  <button
                    type="button"
                    onClick={uploadPost}
                    disabled={!selectedFile}
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600
                     px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none
                      focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:cursor-not-allowed
                       disabled:bg-gray-300 hover:disabled:bg-gray-300 sm:text-sm"
                  >
                    {loading ? 'Uploading...' : 'Upload Post'}
                  </button>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default modal

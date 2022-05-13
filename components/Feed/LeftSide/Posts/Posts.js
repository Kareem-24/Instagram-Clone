import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '../../../../firebase'
import Post from './Post'

function Posts() {
  const [newPosts, setNewPosts] = useState([])
  const [photos, setPhotos] = useState([])

  useEffect(
    () =>
      onSnapshot(
        query(collection(db, 'posts'), orderBy('timestamp', 'desc')),
        (snapshot) => {
          setNewPosts(snapshot.docs)
        }
      ),
    [db]
  )

  return (
    <div>
      {newPosts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          userImg={post.data().profileImg}
          username={post.data().username}
          img={post.data().image}
          caption={post.data().caption}
        />
      ))}

      {photos.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          userImg={post.data().profileImg}
          username={post.data().username}
          img={post.data().imageSrc}
          caption={post.data().caption}
        />
      ))}
    </div>
  )
}

export default Posts

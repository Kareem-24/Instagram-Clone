import Stories from './LeftSide/Stories/Stories'
import Posts from './LeftSide/Posts/Posts'
import MiniProfile from './RightSide/MiniProfile'
import Suggestions from './RightSide/Suggestions'
import { useSession } from 'next-auth/react'
function Feed() {
  const { data: session } = useSession()
  return (
    <main
      className={`mx-auto grid grid-cols-1 sm:max-w-xl md:max-w-3xl
      md:grid-cols-2 xl:max-w-4xl xl:grid-cols-3 ${
        !session && ' !max-w-2xl !grid-cols-1'
      }`}
    >
      {/*  Section */}
      <section className="col-span-2">
        {session && <Stories />}
        <Posts />
      </section>

      {session && (
        <section className="hidden md:col-span-1 xl:inline-grid">
          <div className="top-15 fixed">
            <MiniProfile />
            <Suggestions />
          </div>
        </section>
      )}
    </main>
  )
}

export default Feed

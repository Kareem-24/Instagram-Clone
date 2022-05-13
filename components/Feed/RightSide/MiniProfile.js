import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'

function MiniProfile({ provider }) {
  const { data: session } = useSession()
  const router = useRouter()
  const handelSwitch = () => {
    router.push('/auth/signin')
  }

  return (
    <div className="relative mt-14 ml-10  flex items-center">
      <div>
        <img
          src={session?.user.image}
          className=" p-{2px}  mr-3 h-16 w-16 rounded-full border "
        />
      </div>

      <div className="">
        <h2>{session?.user.username}</h2>
      </div>
      <div className="ml-14">
        <button
          className="text-semibold text-sm text-blue-400"
          onClick={handelSwitch}
        >
          Switch
        </button>
      </div>
    </div> 
  )
}

export default MiniProfile

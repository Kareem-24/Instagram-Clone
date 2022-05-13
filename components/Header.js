import Image from 'next/image'
import Logo from '../public/images/Instagram_logo.svg.png'
import Logo2 from '../public/images/logo2.png'
import {
  SearchIcon,
  PlusCircleIcon,
  UserGroupIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from '@heroicons/react/outline'
import { HomeIcon } from '@heroicons/react/solid'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { on } from '../app/features/modal/modalReducer'
import { useDispatch } from 'react-redux'
function Header() {
  const { data: session } = useSession()
  const router = useRouter()
  const dispatch = useDispatch()
  return (
    <div className="sticky top-0 z-50 border-b bg-white shadow-sm">
      <div className="mx-5 flex max-w-4xl justify-between lg:mx-auto">
        {/* i'm gonna split my header to three divs { left,middle,right} */}

        {/* left section (Logo) */}
        <div
          className="relative hidden w-24 cursor-pointer lg:inline-grid"
          onClick={() => router.push('/')}
        >
          <Image src={Logo} layout="fill" objectFit="contain" />
        </div>

        <div
          className="relative w-8 flex-shrink-0 cursor-pointer lg:hidden"
          onClick={() => router.push('/')}
        >
          <Image
            src={Logo2}
            layout="fill"
            objectFit="contain"
            priority="true"
          />
        </div>
        {/* middle section (search bar) */}
        <div className="mx-w-xs">
          <div className="relative mt-1 rounded-md p-3">
            <div className="pointer-events-none absolute inset-y-0 flex  items-center pl-3">
              <SearchIcon className="f h-5 w-5 text-gray-500" />
            </div>
            <input
              type="text"
              placeholder="search"
              className="block w-full rounded-md border-none bg-gray-200 pl-10 focus:border-none focus:ring-black sm:text-sm"
            />
          </div>
        </div>
        {/* Right section (Icons) */}
        <div className="flex items-center justify-end space-x-4">
          <HomeIcon className="navBtn" onClick={() => router.push('/')} />
          {session ? (
            <>
              <div className="relative">
                <PaperAirplaneIcon className="navBtn rotate-45" />
                <div className="absolute -top-1 -right-1 flex h-4 w-4 animate-pulse items-center justify-center rounded-full bg-red-500 text-xs text-white">
                  3
                </div>
              </div>
              <PlusCircleIcon
                className="navBtn"
                onClick={() => dispatch(on())}
              />
              <UserGroupIcon className="navBtn" />
              <HeartIcon className="navBtn" />
              <div className="h-8 w-8 cursor-pointer">
                <img
                  onClick={signOut}
                  src={session.user.image}
                  className=" rounded-full"
                />
              </div>
            </>
          ) : (
            <button
              onClick={signIn}
              className="rounded-md bg-blue-500 py-1 px-3 text-white"
            >
              Log In
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Header

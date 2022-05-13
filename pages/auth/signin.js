import { getProviders, signIn as signINtoProviders } from 'next-auth/react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Header from '../../components/Header'
import iphone from '../../public/images/iphone-with-profile.jpg'
function signIn({ providers }) {
  const [emailAddress, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const isInvaild = password === '' || emailAddress === ''

  useEffect(() => {
    document.title = 'Log In-Instagram'
  }, [])
  
  return (
    <>
      {Object.values(providers).map((provider) => (
        <div key={provider.name} className="h-screen bg-slate-50">
          <Header />
          <div className=" mx-auto flex max-w-screen-sm items-center ">
            <div className="flex w-3/5">
              <Image src={iphone} alt="" />
            </div>
            <div className="flex w-2/5 flex-col pr-2">
              <div className="flex w-full justify-center">
                <img
                  src="/../../../images/Instagram_logo.svg.png"
                  className="mt-2 mb-4 w-6/12 "
                />
              </div>
              {error && <p className="mb-4 text-xs text-red-600">{error}</p>}
              <form method="post">
                <input
                  aria-label="Enter your email address"
                  type="text"
                  placeholder="Email address"
                  className="ml-1  mb-2 h-2 w-full rounded-sm py-5  px-4 text-sm focus:border-none focus:ring-blue-600"
                  onChange={(e) => setEmailAddress(e.target.value)}
                />
                <input
                  aria-label="Enter your Password"
                  type="password"
                  placeholder="Password"
                  className="ml-1  mb-2 h-2 w-full rounded-sm py-5  px-4 text-sm focus:border-none focus:ring-blue-600"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  disabled={isInvaild}
                  type="submit"
                  className={`ml-1 mb-4 w-full rounded-sm bg-blue-600 py-2 text-white  ${
                    isInvaild && 'opacity-50'
                  }`}
                >
                  {' '}
                  Log In{' '}
                </button>
              </form>
              <button
                onClick={() =>
                  signINtoProviders(provider.id, { callbackUrl: '/' })
                }
                className="ml-1 mb-2 w-full rounded-sm bg-blue-600 py-2 text-white"
              >
                Log In with {provider.name}
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}

//server side render
export async function getServerSideProps() {
  const providers = await getProviders()
  return {
    props: {
      providers,
    },
  }
}

export default signIn

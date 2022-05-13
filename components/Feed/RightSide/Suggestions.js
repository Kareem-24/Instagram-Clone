import faker from '@faker-js/faker'
import { useEffect, useState } from 'react'
function Suggestions() {
  const [suggestions, setSuggestions] = useState([])

  useEffect(() => {
    const suggestions = [...Array(5)].map((_, i) => ({
      ...faker.helpers.contextualCard(),
      id: i,
    }))
    setSuggestions(suggestions)
  }, [])
  return (
    <div className="mt-4 ml-10">
      <div className="mb-5 flex justify-between text-sm ">
        <h3 className="font-semibold text-gray-500">Suggestions for you </h3>
        <button className="text-blue-400 text-semibold">See All</button>
      </div>
      {suggestions.map((profile) => (
        <div
          key={profile.id}
          className="mt-3 flex items-center justify-between"
        >
          <img
            src={profile.avatar}
            alt=""
            className="p-{2px} h-10 w-10 rounded-full border "
          />
          <div className="ml-3 flex-1">
            <h2 className="flex-1 text-xs font-semibold">{profile.username}</h2>
          </div>
          <button className="text-xs text-blue-400 font-semibold">Follow</button>
        </div>
      ))}
    </div>
  )
}

export default Suggestions

function story({ img, username }) {
  return (
    <div>
      <img
        className="p-{1.5px} border-3 h-14 w-14transform cursor-pointer
        rounded-full border-red-500 object-contain transition duration-200
          ease-out hover:scale-110 border-2 "
        src={img}
        alt=""
      />
      <p className="w-14 truncate text-center text-xs">{username}</p>
    </div>
  )
}

export default story

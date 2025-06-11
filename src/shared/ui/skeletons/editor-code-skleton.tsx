const EditorCodeSkeleton = () => {
  return (
    <div className="border-2 border-gray-800 overflow-clip rounded-md flex flex-col animate-pulse">
      <div className="p-2 flex gap-2 items-center">
        <div className="h-4 bg-base rounded w-1/4" />
        <div className="h-4 bg-base rounded w-1/4" />
      </div>
      <div className="flex-1 bg-base" />
    </div>
  )
}

export default EditorCodeSkeleton

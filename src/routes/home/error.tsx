import { isRouteErrorResponse } from 'react-router'
import { useRouteError } from 'react-router'

const ErrorHomeBoundary = () => {
  const error = useRouteError()

  if (isRouteErrorResponse(error)) {
    return (
      <div className="p-6">
        <h1 className="font-bold text-2xl text-red-600">Error {error.status}</h1>
        <p className="mt-2 text-gray-700">{error.data?.message ?? 'Something went wrong.'}</p>
      </div>
    )
  }

  return (
    <div className="p-6">
      <h1 className="font-bold text-2xl text-red-600">Unexpected Error</h1>
      <p className="mt-2 text-gray-700">{(error as Error)?.message ?? 'Unknown error occurred.'}</p>
    </div>
  )
}

export default ErrorHomeBoundary

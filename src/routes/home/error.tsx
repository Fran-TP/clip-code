import { isRouteErrorResponse } from 'react-router'
import { useRouteError } from 'react-router'

const ErrorHomeBondary = () => {
  const error = useRouteError()

  if (isRouteErrorResponse(error)) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold text-red-600">
          Error {error.status}
        </h1>
        <p className="mt-2 text-gray-700">
          {error.data?.message ?? 'Something went wrong.'}
        </p>
      </div>
    )
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-red-600">Unexpected Error</h1>
      <p className="mt-2 text-gray-700">
        {(error as Error)?.message ?? 'Unknown error occurred.'}
      </p>
    </div>
  )
}

export default ErrorHomeBondary

import { useEffect } from 'react'
import { useNavigation } from 'react-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({
  showSpinner: false
})

const Progressbar = () => {
  const navigationStatus = useNavigation()
  const isNavigating = Boolean(navigationStatus.location)

  useEffect(() => {
    if (isNavigating) {
      NProgress.start()
    }

    return () => {
      NProgress.done()
    }
  }, [isNavigating])

  return null
}

export default Progressbar

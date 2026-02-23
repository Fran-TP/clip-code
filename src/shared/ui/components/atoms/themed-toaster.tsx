import { useTheme } from '@shared/context/theme-context'
import { Toaster } from 'sonner'

const ThemedToaster = () => {
  const { resolved } = useTheme()

  return <Toaster closeButton theme={resolved} />
}

export default ThemedToaster

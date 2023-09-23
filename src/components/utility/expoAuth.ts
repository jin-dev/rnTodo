import * as LocalAuthentication from 'expo-local-authentication'

async function checkHardware() {
  try {
    const compatible = await LocalAuthentication.hasHardwareAsync()
    return compatible
  } catch (e) {
    console.log(e)
  }
}

function onAuthenticate(): Promise<boolean> {
  const auth = LocalAuthentication.authenticateAsync({
    promptMessage: 'Authenticate',
    fallbackLabel: 'Enter Password',
  })
  return auth
    .then((result) => {
      return result?.success || false
    })
    .catch((e) => {
      console.log(e)
      return false
    })
}

export { onAuthenticate, checkHardware }

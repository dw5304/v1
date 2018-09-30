const config = (env) => {
  if (process.env[env]) {
    return process.env[env]
  } else {
    throw new Error(`Enviroment variable ${env} doesn't exist. Review your .env file`)
  }
}

export default config

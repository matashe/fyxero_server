import jsonwebtoken from 'jsonwebtoken'

export const signJwt = (payload: any, options?: jsonwebtoken.SignOptions) => {
  const privateKey = process.env.ENC_PRIVATE_KEY as string

  try {
    return jsonwebtoken.sign(payload, privateKey, options)
  } catch (error) {
    throw new Error(`Error signing JWT: ${error}`)
  }
}

export const verifyJwt = (token: string) => {
  const publicKey = process.env.ENC_PUBLIC_KEY as string

  try {
    return jsonwebtoken.verify(token, publicKey)
  } catch (error) {
    throw new Error(`Error verifying JWT: ${error}`)
  }
}

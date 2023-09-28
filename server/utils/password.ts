import bcrypt from 'bcryptjs'

/**
 * Hashes a raw password using bcrypt.
 * @param raw The raw password to hash.
 * @returns A Promise that resolves to the hashed password.
 */
export async function hash(raw: string) {
  return await bcrypt.hash(raw, 10)
}

/**
 * Verifies a raw password against a hashed password using bcrypt.
 * @param raw The raw password to verify.
 * @param hash The hashed password to compare against.
 * @returns A Promise that resolves to a boolean indicating whether the passwords match.
 */
export async function verify(raw: string, hash: string) {
  return await bcrypt.compare(raw, hash)
}

#!/usr/bin/env node
/**
 * Sets the portal sign-in. Asks for a username and a password (the password is
 * not shown as you type), stores only a scrypt hash of it in .env.local, and
 * prints the same three lines to paste into Vercel's environment settings.
 *
 *   npm run admin:password
 */
import { randomBytes, scryptSync } from "node:crypto"
import { existsSync, readFileSync, writeFileSync } from "node:fs"
import { createInterface } from "node:readline"

const rl = createInterface({ input: process.stdin, output: process.stdout, terminal: Boolean(process.stdin.isTTY) })
const lines = rl[Symbol.asyncIterator]()
let muted = false
rl._writeToOutput = (text) => { if (!muted) process.stdout.write(text) }
const ask = async (question, hidden = false) => {
  process.stdout.write(question)
  muted = hidden
  const { value = "" } = await lines.next()
  muted = false
  if (hidden) process.stdout.write("\n")
  return value.trim()
}

const username = await ask("Admin username: ")
const password = await ask("New password (12+ characters): ", true)
rl.close()
if (!/^[a-zA-Z0-9._-]{3,40}$/.test(username)) throw new Error("Use 3 to 40 letters, numbers, dots, dashes or underscores.")
if (password.length < 12) throw new Error("Use at least 12 characters.")

const salt = randomBytes(16)
const hash = scryptSync(password, salt, 64)
const values = {
  ADMIN_USERNAME: username,
  ADMIN_PASSWORD_HASH: `scrypt:${salt.toString("hex")}:${hash.toString("hex")}`,
  ADMIN_SESSION_SECRET: randomBytes(32).toString("hex"),
}

const file = ".env.local"
let content = existsSync(file) ? readFileSync(file, "utf8") : ""
for (const [key, value] of Object.entries(values)) {
  const line = `${key}=${value}`
  content = new RegExp(`^${key}=.*$`, "m").test(content) ? content.replace(new RegExp(`^${key}=.*$`, "m"), line) : `${content.replace(/\n?$/, "\n")}${line}\n`
}
writeFileSync(file, content.replace(/^\n/, ""))

console.log(`\nSaved to ${file}. Restart "npm run dev" to use it.`)
console.log("For the live site, add these in Vercel > Settings > Environment Variables:\n")
for (const [key, value] of Object.entries(values)) console.log(`${key}=${value}`)
console.log("\nChanging the session secret signs everyone out.")

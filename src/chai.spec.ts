import { tmpdir } from "os"
import { join } from "path"
import * as pify from "pify"
import * as fse from "fs-extra"

const chai = require("chai")
const chaiAsPromised = require("chai-as-promised")
chai.use(chaiAsPromised)

export { expect } from "chai"

export const pfs = pify(require("fs"))
export const ptmp = pify(require("tmp"))

require("source-map-support").install()

export function times<T>(n: number, f: ((idx: number) => T)): T[] {
  return Array(n)
    .fill(undefined)
    .map((_, i) => f(i))
}

export const testDir = join(__dirname, "..", "test")

/**
 * Copy a test image to a tmp directory and return the path
 */
export async function testImg(name: string = "img.jpg"): Promise<string> {
  const dir = join(tmpdir(), (Math.random() * 1000000).toFixed() + "-" + name)
  await fse.mkdir(dir)
  const dest = join(dir, name)
  return new Promise<string>((res, rej) =>
    fse.copyFile(join(testDir, name), dest, err => (err ? rej(err) : res(dest)))
  )
}

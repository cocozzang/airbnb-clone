import { PrismaClient } from '@prisma/client'

declare global {
  var prisma: PrismaClient | undefined
}

const client = globalThis.prisma || new PrismaClient()
if (process.env.NODE_ENV !== 'production') globalThis.prisma = client

export default client

// next 개발환경에서 reloading시 PrismaClient instance가 반복되어 생성되는 것을 막기위한 코드입니다.

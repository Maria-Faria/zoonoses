import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function insertToken(user_id: string, refreshToken: string) {
  const userToken = await prisma.userTokens.create({
    data: {
      user_id,
      refreshToken
    },
    select: {
      user_id: true,
      refreshToken: true
    }
  });

  return userToken;
}

export async function getUserToken(user_id: string) {
  const userToken = await prisma.userTokens.findUnique({
    where: {
      user_id
    },
    select: {
      refreshToken: true
    }
  });

  return userToken;
}

export async function deleteUserToken(refreshToken: string) {
  await prisma.userTokens.delete({
    where: {refreshToken}
  });
}

export async function deleteUserTokenById(user_id: string) {
  await prisma.userTokens.deleteMany({
    where: {user_id}
  });
}

export async function getRefreshToken(refreshToken: string) {
  const userToken = await prisma.userTokens.findUnique({
    where: {refreshToken},
    select: {
      refreshToken: true
    }
  });

  return userToken;
}
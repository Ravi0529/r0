"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";

async function syncCurrentUserRecord() {
  const { userId } = await auth();

  if (!userId) return null;

  const clerkUser = await currentUser();

  if (!clerkUser) return null;

  const email =
    clerkUser.primaryEmailAddress?.emailAddress ??
    clerkUser.emailAddresses[0]?.emailAddress ??
    null;

  const name =
    clerkUser.fullName ??
    ([clerkUser.firstName, clerkUser.lastName].filter(Boolean).join(" ") ||
      null);

  return prisma.user.upsert({
    where: {
      clerkId: userId,
    },
    create: {
      clerkId: userId,
      email,
      firstName: clerkUser.firstName,
      lastName: clerkUser.lastName,
      name,
      imageUrl: clerkUser.imageUrl,
    },
    update: {
      email,
      firstName: clerkUser.firstName,
      lastName: clerkUser.lastName,
      name,
      imageUrl: clerkUser.imageUrl,
    },
    select: {
      id: true,
      email: true,
      name: true,
      imageUrl: true,
      clerkId: true,
    },
  });
}

export async function onBoardUser() {
  await syncCurrentUserRecord();
}

export const getCurrentUser = async () => {
  try {
    return await syncCurrentUserRecord();
  } catch (error) {
    console.error("Error fetching current user:", error);
    return null;
  }
};

import "dotenv/config";
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function insertAdmin() {
  await prisma.admin.create({
    data: {
      name: "Sachiko03",
      password: "sachiko",
    },
  });
}

async function insertDiary() {
  await prisma.diary.createMany({
    data: [
      {
        dateTime: new Date(),
        title: "Roboto",
        content: "blha blha blha",
        like: 1,
        laugh: 2,
        cry: 3,
      },
      {
        dateTime: new Date(),
        title: "Poppins",
        content: "blha blha blha",
        like: 0,
        laugh: 0,
        cry: 4,
      },
    ],
  });
}

async function insertComments() {
  await prisma.comment.createMany({
    data: [
      {
        dateTime: new Date(),
        content: "You're right.",
        diaryId: 1,
      },
      {
        dateTime: new Date(),
        content: "I know right.",
        diaryId: 1,
      },
    ],
  });
}

async function deleteAll(table: Uncapitalize<Prisma.ModelName>) {
  // @ts-ignore
  await prisma[table].deleteMany({});
}

async function main() {
  {
    await deleteAll("comment");
    await deleteAll("diary");
    await deleteAll("admin");
  }

  {
    // Independent
    await insertAdmin();
    await insertDiary();
    await insertComments();
  }
}

main();

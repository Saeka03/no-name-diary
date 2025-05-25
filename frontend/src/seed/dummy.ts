import "dotenv/config";
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function insertUser() {
  await prisma.user.create({
    data: {
      id: "f558cd5c-af2d-4fe1-a106-4d1d5dfa747d",
      diaries: {
        create: [
          {
            dateTime: new Date(),
            title: "Roboto",
            content: "blah blah blah",
            like: 1,
            laugh: 2,
            cry: 3,
          },
          {
            dateTime: new Date(),
            title: "Poppins",
            content: "blah blah blah",
            like: 0,
            laugh: 0,
            cry: 4,
          },
        ],
      },
    },
  });
}

async function deleteAll(table: Uncapitalize<Prisma.ModelName>) {
  // @ts-ignore
  await prisma[table].deleteMany({});
}

async function main() {
  {
    await deleteAll("diary");
    await deleteAll("user");
  }

  {
    // Independent
    await insertUser();
  }
}

main();

import { prisma } from "../../../lib/prisma";

export async function GET() {
  try {
    const diaries = await prisma.diary.findMany({
      include: { comment: true },
    });

    return Response.json({ diaries }, { status: 200 });
  } catch (error) {
    return Response.json({ error: `${error}` }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const body = await req.json();
  if (!body.dateTime || !body.title || !body.content) {
    return Response.json({ message: "Values are not found" }, { status: 400 });
  }
  
  try {
    const diary = await prisma.diary.create({
      data: {
        dateTime: body.dateTime,
        title: body.title,
        content: body.content,
        like: 0,
        laugh: 0,
        cry: 0,
      },
    });

    return Response.json({ diary }, { status: 200 });
  } catch (error) {
    return Response.json({ error: `${error}` }, { status: 500 });
  }
}

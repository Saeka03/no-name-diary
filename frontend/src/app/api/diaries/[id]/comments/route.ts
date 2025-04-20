import { prisma } from "../../../../../lib/prisma";

export async function GET(req: Request, context: any) {
  try {
    const { params } = context;
    const diaryId = parseInt(params.id);

    const comments = await prisma.comment.findMany({
      where: { diaryId },
      include: { diary: true },
    });

    return Response.json({ comments }, { status: 200 });
  } catch (error) {
    return Response.json({ error: `${error}` }, { status: 500 });
  }
}

export async function POST(req: Request, context: any) {
  const body = await req.json();
  if (!body.dateTime || !body.content) {
    return Response.json({ message: "Values are not found" }, { status: 400 });
  }

  try {
    const { params } = context;
    const diaryId = parseInt(params.id);

    const comment = await prisma.comment.create({
      data: {
        dateTime: body.dateTime,
        content: body.content,
        diaryId,
      },
    });

    return Response.json({ comment }, { status: 200 });
  } catch (error) {
    return Response.json({ error: `${error}` }, { status: 500 });
  }
}

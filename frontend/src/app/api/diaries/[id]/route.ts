import { prisma } from "../../../../lib/prisma";

export async function GET(req: Request, context: any) {
  try {
    const { params } = context;
    const id = parseInt((await params).id);

    const diary = await prisma.diary.findFirst({
      where: { id },
      include: { comment: true },
    });

    return Response.json({ diary }, { status: 200 });
  } catch (error) {
    return Response.json({ error: `${error}` }, { status: 500 });
  }
}

export async function DELETE(req: Request, context: any) {
  try {
    const { params } = context;
    const id = parseInt((await params).id);

    return await prisma.$transaction(async (tx) => {
      await tx.comment.deleteMany({
        where: { diaryId: id },
      });

      const deletedDiary = await tx.diary.delete({
        where: { id },
      });

      return Response.json({ deletedDiary }, { status: 200 });
    });
  } catch (error) {
    return Response.json({ error: `${error}` }, { status: 500 });
  }
}

export async function PUT(req: Request, context: any) {
  try {
    const { params } = context;
    const id = parseInt((await params).id);
    const body = await req.json();
    if (!body.title || !body.content) {
      return Response.json(
        { message: "Values are not found" },
        { status: 400 }
      );
    }

    return await prisma.$transaction(async (tx) => {
      const updateDiary = await tx.diary.update({
        where: { id },
        data: {
          title: body.title,
          content: body.content,
        },
      });

      return Response.json({ updateDiary }, { status: 200 });
    });
  } catch (error) {
    return Response.json({ error: `${error}` }, { status: 500 });
  }
}

export async function PATCH(req: Request, context: any) {
  try {
    const { params } = context;
    const id = parseInt((await params).id);
    const body = await req.json();
    if (!body.type) {
      return Response.json(
        { message: "Values are not found" },
        { status: 400 }
      );
    }

    if (body.type === "like") {
      return await prisma.$transaction(async (tx) => {
        const updateDiary = await tx.diary.update({
          where: { id },
          data: {
            like: { increment: 1 },
          },
        });

        return Response.json({ updateDiary }, { status: 200 });
      });
    } else if (body.type === "laugh") {
      return await prisma.$transaction(async (tx) => {
        const updateDiary = await tx.diary.update({
          where: { id },
          data: {
            laugh: { increment: 1 },
          },
        });

        return Response.json({ updateDiary }, { status: 200 });
      });
    } else if (body.type === "cry") {
      return await prisma.$transaction(async (tx) => {
        const updateDiary = await tx.diary.update({
          where: { id },
          data: {
            cry: { increment: 1 },
          },
        });

        return Response.json({ updateDiary }, { status: 200 });
      });
    }
  } catch (error) {
    return Response.json({ error: `${error}` }, { status: 500 });
  }
}

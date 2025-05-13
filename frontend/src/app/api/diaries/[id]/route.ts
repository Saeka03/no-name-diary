import { prisma } from "../../../../lib/prisma";

export async function GET(req: Request, context: any) {
  try {
    const { params } = context;

    const id = parseInt(params.id);

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

    const id = parseInt(params.id);

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

export async function PATCH(req: Request, context: any) {
  try {
    const { params } = context;
    const id = parseInt(params.id);
    const body = await req.json();
    if (
      !body.title ||
      !body.content ||
      !body.like ||
      !body.laugh ||
      !body.cry
    ) {
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
          like: body.like,
          laugh: body.laugh,
          cry: body.cry,
        },
      });

      return Response.json({ updateDiary }, { status: 200 });
    });
  } catch (error) {
    return Response.json({ error: `${error}` }, { status: 500 });
  }
}

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

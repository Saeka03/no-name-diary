import { prisma } from "../../../../../../lib/prisma";

export async function DELETE(req: Request, context: any) {
  try {
    const { params } = context;
    const commentId = parseInt(params.commentId);

    const deletedComment = await prisma.comment.delete({
      where: { id: commentId },
    });
    return Response.json({ deletedComment }, { status: 200 });
  } catch (error) {
    return Response.json({ error: `${error}` }, { status: 500 });
  }
}

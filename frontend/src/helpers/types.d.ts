type DiaryType = {
  id: string;
  date: Date;
  title: string;
  content: string;
  like: number;
  laugh: number;
  cry: number;
  comment: CommentType[];
  adminId: string;
};

type CommentType = {
  id: number;
  date: Date;
  content: string;
};

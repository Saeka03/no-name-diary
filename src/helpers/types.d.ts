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
  id: string;
  date: Date;
  content: string;
};

type RealTimeDiaryType = {
  id: string;
  dateTime: Date;
  title: string;
  content: string;
  like: number;
  laugh: number;
  cry: number;
  comment: CommentType[];
  adminId: string;
};

type RealTimeCommentType = {
  id: string;
  dateTime: Date;
  content: string;
};

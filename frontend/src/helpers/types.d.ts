type DiaryType = {
  id: number;
  dateTime: Date;
  title: string;
  content: string;
  like: number;
  laugh: number;
  cry: number;
  comment: CommentType[];
};

type CommentType = {
  id: number;
  dateTime: Date;
  content: string;
};

type DiaryStateType = {
  id: string;
  date: Date;
  title: string;
  content: string;
  like: number;
  laugh: number;
  cry: number;
  comment: CommentType[];
};

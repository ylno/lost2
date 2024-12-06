export type Email = {
  id: number;
  from: string;
  from_email: string;
  to: string;
  to_email: string;
  subject: string;
  date: Date;
  content: string;
  unread: boolean;
};

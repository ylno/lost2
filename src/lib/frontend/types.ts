export type Email = {
  id: string;
  from: string;
  from_email: string;
  to: string;
  to_email: string;
  subject: string;
  date: Date;
  content: string;
  unread: boolean;
};

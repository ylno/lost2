import { Email } from "@/lib/frontend/types";
function generateTestData(
  count: number,
  to: string = "Tim Cook",
  to_email: string = "tim@dosenmatrosen.de",
): Email[] {
  const names = [
    "Mike James",
    "Anna Smith",
    "John Doe",
    "Jane Miller",
    "Tom Hanks",
  ];
  const emails = [
    "test@test.de",
    "user1@example.com",
    "user2@example.com",
    "test2@test.de",
  ];
  const subjects = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "Praesent commodo cursus magna, vel scelerisque nisl consectetur.",
    "Curabitur blandit tempus porttitor.",
    "Aenean lacinia bibendum nulla sed consectetur.",
    "Nulla vitae elit libero, a pharetra augue.",
  ];
  const lorem =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ".repeat(5);

  const testData: Email[] = [];

  for (let i = 0; i < count; i++) {
    testData.push({
      id: i,
      from: names[Math.floor(Math.random() * names.length)],
      from_email: emails[Math.floor(Math.random() * emails.length)],
      to,
      to_email,
      subject: subjects[Math.floor(Math.random() * subjects.length)],
      date: new Date(
        Date.now() - Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 365),
      ), // Zufälliges Datum im letzten Jahr
      content: lorem,
      unread: Math.random() > 0.5,
    });
  }

  return testData;
}

export function generateEMails() {
  return generateTestData(40).sort((a, b) => (a.date > b.date ? -1 : 1));
}

export const emails = generateTestData(40).sort((a, b) =>
  a.date > b.date ? -1 : 1,
);

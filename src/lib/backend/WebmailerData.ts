export type Email = string;

export type Mail = {
  subject: string;
  from: Email;
  to: Email[];
  body: string;
  date: Date;
};

export const Maillist: Mail[] = [
  {
    subject: "Testmail1",
    from: "test@example.com",
    to: ["tim@geocaching.com"],
    body: "Das ist eine Testmail",
    date: new Date("2024-05-01 17:00:00"),
  },
  {
    subject: "Testmail2",
    from: "test@example.com",
    to: ["tim@geocaching.com"],
    body: "2Das ist eine Testmail",
    date: new Date("2024-05-01 17:00:00"),
  },
  {
    subject: "Testmail3",
    from: "test@example.com",
    to: ["tim@geocaching.com"],
    body: "3Das ist eine Testmail",
    date: new Date("2024-05-01 17:00:00"),
  },
  {
    subject: "Testmail4",
    from: "test@example.com",
    to: ["tim@geocaching.com"],
    body: "4Das ist eine Testmail",
    date: new Date("2024-05-01 17:00:00"),
  },
  {
    subject: "Testmail5",
    from: "test@example.com",
    to: ["tim@geocaching.com"],
    body: "5Das ist eine Testmail",
    date: new Date("2024-05-01 17:00:00"),
  },
  {
    subject: "Testmail6",
    from: "test@example.com",
    to: ["tim@geocaching.com"],
    body: "6Das ist eine Testmail",
    date: new Date("2024-05-01 17:00:00"),
  },
  {
    subject: "Testmail6",
    from: "test@example.com",
    to: ["tim@geocaching.com"],
    body: "7Das ist eine Testmail",
    date: new Date("2024-05-01 17:00:00"),
  },
];

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import dayjs from "dayjs";
import { useState } from "react";
import MailModal from "@/components/mail/mail-modal";
import { Email } from "@/components/mail/types";

interface ListProps {
  emails: Email[];
}

export default function List({ emails }: ListProps) {
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);

  return (
    <>
      <ul role="list" className="divide-y divide-gray-200">
        {emails.map((email) => (
          <li key={email.id} className="flex justify-between gap-x-2 py-2">
            <div
              className={`flex-shrink-0 w-2 h-2 rounded-full mt-2 ${email.unread && "bg-blue-500"}`}
            ></div>
            <div className="flex-auto min-w-0 gap-x-4">
              <div className="min-w-0 flex-auto">
                <p className="text-sm/6 font-semibold text-gray-900">
                  <a
                    onClick={() => setSelectedEmail(email)}
                    className="hover:underline"
                  >
                    {email.from}
                  </a>
                </p>
                <p className="mt-1 flex text-sm/5 font-medium text-gray-700">
                  <a
                    onClick={() => setSelectedEmail(email)}
                    className="truncate hover:underline"
                  >
                    {email.subject}
                  </a>
                </p>
                <p
                  onClick={() => setSelectedEmail(email)}
                  className="mt-1  text-xs/5 text-gray-500 line-clamp-2"
                >
                  {email.content}
                </p>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-x-6">
              <div className="hidden sm:flex sm:flex-col sm:items-end">
                <p className="text-sm/6 text-gray-900">
                  {dayjs(email.date).format("DD.MM.YYYY HH:mm")}
                </p>
              </div>
              <Menu as="div" className="relative flex-none">
                <MenuButton className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                  <span className="sr-only">Open options</span>
                  <EllipsisVerticalIcon aria-hidden="true" className="size-5" />
                </MenuButton>
                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  <MenuItem>
                    <a
                      href="#"
                      className="block px-3 py-1 text-sm/6 text-gray-900 data-[focus]:bg-gray-50 data-[focus]:outline-none"
                    >
                      View profile
                      <span className="sr-only">, {email.from}</span>
                    </a>
                  </MenuItem>
                  <MenuItem>
                    <a
                      href="#"
                      className="block px-3 py-1 text-sm/6 text-gray-900 data-[focus]:bg-gray-50 data-[focus]:outline-none"
                    >
                      Message<span className="sr-only">, {email.from}</span>
                    </a>
                  </MenuItem>
                </MenuItems>
              </Menu>
            </div>
          </li>
        ))}
      </ul>
      {selectedEmail && (
        <MailModal
          email={selectedEmail}
          setOpen={() => setSelectedEmail(null)}
        />
      )}
    </>
  );
}

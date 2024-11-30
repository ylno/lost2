import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { emails } from "@/lib/frontend/data";
import dayjs from "dayjs";
import { useState } from "react";
import { CheckIcon } from "@heroicons/react/24/outline";

export default function List() {
  const [mailModalIsopen, setMailModalIsopen] = useState(false);

  return (
    <>
      <ul role="list" className="divide-y divide-gray-100">
        {emails.map((email) => (
          <li key={email.id} className="flex justify-between gap-x-6 py-5">
            <div className="flex min-w-0 gap-x-4">
              <div className="min-w-0 flex-auto">
                <p className="text-sm/6 font-semibold text-gray-900">
                  <a href="" className="hover:underline">
                    {email.from}
                  </a>
                </p>
                <p className="mt-1 flex text-sm/5 font-medium text-gray-700">
                  <a
                    onClick={() => setMailModalIsopen(true)}
                    className="truncate hover:underline"
                  >
                    {email.subject}
                  </a>
                </p>
                <p className="mt-1  text-xs/5 text-gray-500 line-clamp-2">
                  {email.content}
                </p>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-x-6">
              <div className="hidden sm:flex sm:flex-col sm:items-end">
                <p className="text-sm/6 text-gray-900">
                  {dayjs(email.date).format("DD.MM.YYYY HH:mm")}
                </p>
                {/*{email.lastSeen ? (*/}
                {/*  <p className="mt-1 text-xs/5 text-gray-500">*/}
                {/*    Last seen{" "}*/}
                {/*    <time dateTime={email.lastSeenDateTime}>*/}
                {/*      {email.lastSeen}*/}
                {/*    </time>*/}
                {/*  </p>*/}
                {/*) : (*/}
                {/*  <div className="mt-1 flex items-center gap-x-1.5">*/}
                {/*    <div className="flex-none rounded-full bg-emerald-500/20 p-1">*/}
                {/*      <div className="size-1.5 rounded-full bg-emerald-500" />*/}
                {/*    </div>*/}
                {/*    <p className="text-xs/5 text-gray-500">Online</p>*/}
                {/*  </div>*/}
                {/*)}*/}
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
      <MailModal open={mailModalIsopen} setOpen={setMailModalIsopen} />
    </>
  );
}

function MailModal({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  return (
    <Dialog onClose={setOpen} open={open} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="">
              <div className="p-4 border-b">
                <div className="flex">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-800 font-bold">
                      TK
                    </div>
                    <div className="ml-4">
                      <h2 className="text-lg font-semibold">Tim Cook</h2>
                      <p className="text-sm text-gray-500">test@test.de</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-2 ml-auto">
                    22. November 2024 um 07:08
                  </p>
                </div>
                <h3 className="mt-4 text-sm font-medium text-gray-800">
                  This is the email subject
                </h3>
                <p className="text-sm text-gray-500">
                  An: Elon Murks &lt;elon.murks@test.de&gt;
                  {/*Kopie: & 2 weitere*/}
                </p>
              </div>
              <div className="p-4 text-sm text-gray-800">
                <p>Good Morning Tim,</p>
                <p className="mt-4">This is a valuable content of an emails</p>
                <p className="mt-4">
                  I wish you a pleasent day
                  <br />
                  Example
                </p>
              </div>
              <div className="p-4 border-t text-sm text-blue-500">
                <a onClick={() => setOpen(false)} className="hover:underline">
                  close
                </a>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

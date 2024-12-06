import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  TransitionChild,
} from "@headlessui/react";
import {
  Cog6ToothIcon,
  DocumentIcon,
  InboxIcon,
  PaperAirplaneIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import React, { useMemo } from "react";
import { Email } from "@/lib/frontend/types";

type Props = {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  emails: Email[];
  activeFolder: string;
  setActiveFolder: (activeFolder: string) => void;
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const navigationInput = [
  { name: "Inbox", href: "#", icon: InboxIcon, current: true, newBadge: 0 },
  {
    name: "Sent",
    href: "#",
    icon: PaperAirplaneIcon,
    current: false,
    newBadge: 0,
  },
  { name: "Draft", href: "#", icon: DocumentIcon, current: false, newBadge: 0 },
  { name: "Trash", href: "#", icon: TrashIcon, current: false, newBadge: 0 },
];
const filters = [
  { id: 1, name: "Important", href: "#", initial: "I", current: false },
  { id: 2, name: "Newest", href: "#", initial: "N", current: false },
];

export default function Sidebar({
  sidebarOpen,
  setSidebarOpen,
  emails,
  activeFolder,
  setActiveFolder,
}: Props) {
  const navigation = useMemo(() => {
    return navigationInput.map((nav) => {
      if (nav.name === "Inbox") {
        return {
          ...nav,
          newBadge: emails ? emails.filter((email) => email.unread).length : 0,
        };
      }
      return nav;
    });
  }, [emails]);

  return (
    <>
      <Dialog
        open={sidebarOpen}
        onClose={setSidebarOpen}
        className="relative z-50 lg:hidden"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
        />

        <div className="fixed inset-0 flex">
          <DialogPanel
            transition
            className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full"
          >
            <TransitionChild>
              <div className="absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0">
                <button
                  type="button"
                  onClick={() => setSidebarOpen(false)}
                  className="-m-2.5 p-2.5"
                >
                  <span className="sr-only">Close sidebar</span>
                  <XMarkIcon aria-hidden="true" className="size-6 text-white" />
                </button>
              </div>
            </TransitionChild>
            {/* Sidebar component, swap this element with another sidebar if you like */}
            <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
              <div className="flex h-16 shrink-0 items-center">
                <img
                  alt="Webmailer"
                  src="mailicon.png"
                  className="h-8 w-auto"
                />{" "}
                Spamurai Webmailer
              </div>
              <nav className="flex flex-1 flex-col">
                <ul role="list" className="flex flex-1 flex-col gap-y-7">
                  <li>
                    <ul role="list" className="-mx-2 space-y-1">
                      {navigation.map((item) => (
                        <li key={item.name}>
                          <a
                            onClick={() => setActiveFolder(item.name)}
                            className={classNames(
                              item.name == activeFolder
                                ? "bg-gray-50 text-indigo-600"
                                : "text-gray-700 hover:bg-gray-50 hover:text-indigo-600",
                              "group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold",
                            )}
                          >
                            <item.icon
                              aria-hidden="true"
                              className={classNames(
                                item.name == activeFolder
                                  ? "text-indigo-600"
                                  : "text-gray-400 group-hover:text-indigo-600",
                                "size-6 shrink-0",
                              )}
                            />
                            {item.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </li>
                  <li>
                    <div className="text-xs/6 font-semibold text-gray-400">
                      Filters
                    </div>
                    <ul role="list" className="-mx-2 mt-2 space-y-1">
                      {filters.map((filter) => (
                        <li key={filter.name}>
                          <a
                            href={filter.href}
                            className={classNames(
                              filter.current
                                ? "bg-gray-50 text-indigo-600"
                                : "text-gray-700 hover:bg-gray-50 hover:text-indigo-600",
                              "group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold",
                            )}
                          >
                            <span
                              className={classNames(
                                filter.current
                                  ? "border-indigo-600 text-indigo-600"
                                  : "border-gray-200 text-gray-400 group-hover:border-indigo-600 group-hover:text-indigo-600",
                                "flex size-6 shrink-0 items-center justify-center rounded-lg border bg-white text-[0.625rem] font-medium",
                              )}
                            >
                              {filter.initial}
                            </span>
                            <span className="truncate">{filter.name}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </li>
                  <li className="mt-auto">
                    <a
                      href="#"
                      className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
                    >
                      <Cog6ToothIcon
                        aria-hidden="true"
                        className="size-6 shrink-0 text-gray-400 group-hover:text-indigo-600"
                      />
                      Settings
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
          <div className="flex h-16 shrink-0 items-center">
            <img alt="Webmailer" src="mailicon.png" className="h-16 w-auto" />
            Spamurai Webmailer
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <a
                        onClick={() => setActiveFolder(item.name)}
                        className={classNames(
                          item.name == activeFolder
                            ? "bg-gray-50 text-indigo-600"
                            : "text-gray-700 hover:bg-gray-50 hover:text-indigo-600",
                          "group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold",
                        )}
                      >
                        <item.icon
                          aria-hidden="true"
                          className={classNames(
                            item.name == activeFolder
                              ? "text-indigo-600"
                              : "text-gray-400 group-hover:text-indigo-600",
                            "size-6 shrink-0",
                          )}
                        />
                        {item.name}
                        {item.newBadge > 0 && (
                          <span className="inline-flex items-center rounded-full bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                            {item.newBadge}
                          </span>
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
              <li>
                <div className="text-xs/6 font-semibold text-gray-400">
                  Filter
                </div>
                <ul role="list" className="-mx-2 mt-2 space-y-1">
                  {filters.map((team) => (
                    <li key={team.name}>
                      <a
                        href={team.href}
                        className={classNames(
                          team.name == activeFolder
                            ? "bg-gray-50 text-indigo-600"
                            : "text-gray-700 hover:bg-gray-50 hover:text-indigo-600",
                          "group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold",
                        )}
                      >
                        <span
                          className={classNames(
                            team.name == activeFolder
                              ? "border-indigo-600 text-indigo-600"
                              : "border-gray-200 text-gray-400 group-hover:border-indigo-600 group-hover:text-indigo-600",
                            "flex size-6 shrink-0 items-center justify-center rounded-lg border bg-white text-[0.625rem] font-medium",
                          )}
                        >
                          {team.initial}
                        </span>
                        <span className="truncate">{team.name}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
              <li className="mt-auto">
                <a
                  href="#"
                  className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
                >
                  <Cog6ToothIcon
                    aria-hidden="true"
                    className="size-6 shrink-0 text-gray-400 group-hover:text-indigo-600"
                  />
                  Settings
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}

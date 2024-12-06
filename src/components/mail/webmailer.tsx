"use client";

import React, { useMemo, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  TransitionChild,
} from "@headlessui/react";
import {
  Bars3Icon,
  BellIcon,
  Cog6ToothIcon,
  DocumentIcon,
  InboxIcon,
  PaperAirplaneIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";
import List from "@/components/mail/List";
import { MailService } from "@/lib/frontend/MailService";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/mail/Header";
import Sidebar from "@/components/mail/sidebar";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

type Props = {
  mailService: MailService;
};

export default function Webmailer({ mailService }: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeFolder, setActiveFolder] = useState("Inbox");

  const { data: emails, isLoading } = useQuery({
    queryKey: ["mails"],
    queryFn: () => mailService.getMails(),
  });

  return (
    <>
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        emails={emails || []}
      />
      <div className="lg:pl-72">
        <Header setSidebarOpen={setSidebarOpen} />
        <main className="py-2">
          <div className="px-4 sm:px-6 lg:px-5">
            {emails && <List emails={emails} />}
          </div>
        </main>
      </div>
    </>
  );
}

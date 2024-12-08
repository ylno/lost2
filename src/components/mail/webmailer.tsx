"use client";

import React, { useState } from "react";
import List from "@/components/mail/List";
import { MailService } from "@/lib/frontend/MailService";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/mail/Header";
import Sidebar from "@/components/mail/sidebar";

type Props = {
  mailService: MailService;
};

export default function Webmailer({ mailService }: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeFolder, setActiveFolder] = useState("Inbox");

  const {
    data: emails,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["mails", activeFolder],
    queryFn: () => mailService.getMailsByFolder(activeFolder),
  });

  return (
    <>
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        setActiveFolder={setActiveFolder}
        activeFolder={activeFolder}
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

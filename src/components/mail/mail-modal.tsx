import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { Email } from "@/components/webmailer/types";
import dayjs from "dayjs";
import { getInitials } from "@/lib/frontend/service";

type Props = {
  setOpen: (open: boolean) => void;
  email: Email;
};

export default function MailModal({ email, setOpen }: Props) {
  return (
    <Dialog onClose={setOpen} open={true} className="relative z-10">
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
                      {getInitials(email.from)}
                    </div>
                    <div className="ml-4">
                      <h2 className="text-lg font-semibold">{email.from}</h2>
                      <p className="text-sm text-gray-500">
                        {email.from_email}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-2 ml-auto">
                    {dayjs(email.date).format("DD.MM.YYYY HH:mm")}
                  </p>
                </div>
                <h3 className="mt-4 text-sm font-medium text-gray-800">
                  {email.subject}
                </h3>
                <p className="text-sm text-gray-500">
                  An: {email.to} &lt;{email.to}&gt;
                  {/*Kopie: & 2 weitere*/}
                </p>
              </div>
              <div className="p-4 text-sm text-gray-800">
                <div>{email.content}</div>
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

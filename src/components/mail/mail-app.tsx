import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Webmailer from "@/components/mail/webmailer";
import { mailService } from "@/lib/frontend/MailService";

const queryClient = new QueryClient();

export default function MailApp() {
  return (
    <QueryClientProvider client={queryClient}>
      <Webmailer mailService={mailService} />
    </QueryClientProvider>
  );
}

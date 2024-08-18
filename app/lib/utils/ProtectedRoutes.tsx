"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import LoadingScreen from "@/app/lib/components/Loading";
import { useSession } from "next-auth/react";
import { userCanAccessEvent } from "./userCanAccessEvent";
import { HttpClient } from "../Http/HttpClient";
import Notification from "../components/Notification";

const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [isVerifying, setIsVerifying] = useState(true);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  useEffect(() => {
    const checkAccess = async () => {
      const eventRoutes = /^\/event\/(\d+)\/(.+)/;
      const adminRoutes = /^\/admin/;

      if (eventRoutes.test(pathname) ) {
        const match = pathname.match(eventRoutes);
        if (match) {
          const eventId = parseInt(match[1]);

          if (session?.user) {
            try {
              const http = HttpClient.getInstance();
              const resp = await http.post('api/userInfo', { email: session.user?.email });
              session.user = resp.data.user;

              const accessible = userCanAccessEvent(eventId, session.user.eventsAvailable);

              if (!accessible) {
                setNotificationMessage("No tienes permiso para acceder a esta página");
                setNotificationOpen(true);
                router.replace('/landing');
                return; // Early return to prevent further processing
              }
            } catch (error) {
              console.error("Error fetching user info:", error);
              setNotificationMessage("Error fetching user info");
              setNotificationOpen(true);
              router.replace('/landing');
              return; // Early return to prevent further processing
            }
          }
        }
      }

      // if (adminRoutes.test(pathname)){

      // }

      setIsVerifying(false); // Set verification status to false once checks are done
    };

    checkAccess();
  }, [pathname, router, session]);

  const handleNotificationClose = () => {
    setNotificationOpen(false);
  };

  if (isVerifying) {
    return <LoadingScreen />;
  }

  return (
    <>
      {children}
      <Notification
        message={notificationMessage}
        open={notificationOpen}
        onClose={handleNotificationClose}
        snackbarColor="red" // Assuming you want red for error messages
      />
    </>
  );
};

export default ProtectedRoutes;

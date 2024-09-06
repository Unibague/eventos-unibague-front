'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import LoadingScreen from '@/app/lib/components/Loading';
import { useSession } from 'next-auth/react';
import { userCanAccessEvent } from './userCanAccessEvent';
import Notification from '../components/Notification';
import { Role } from '../types';
import { getEvent } from './api/getEvent';

// Custom hook for notification
const useNotification = () => {
  const [notification, setNotification] = useState({
    open: false,
    message: '',
  });
  const showNotification = (message: string) =>
    setNotification({ open: true, message });
  const closeNotification = () => setNotification({ open: false, message: '' });
  return { notification, showNotification, closeNotification };
};

const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isVerifying, setIsVerifying] = useState(true);
  const { notification, showNotification, closeNotification } =
    useNotification();
  const { data: session, update: refetchSession } = useSession();

  const checkEventAccess = async (eventId: number) => {
    const event = await getEvent(eventId);
    if (!event?.restrictedAccess) return true;

    if (!session?.user) {
      router.replace('/auth/login');
      return false;
    }
    if (!session.user.id) return false;
    return userCanAccessEvent(eventId, session.user.accessibleEvents);
  };

  const checkAdminAccess = () => {
    if (!session?.user) return false;
    return (
      session.user.roles?.some((role: Role) => role.name === 'admin') ?? false
    );
  };

  useEffect(() => {
    const checkAccess = async () => {
      const eventRoutes = /^\/event\/(\d+)\/(.+)/;
      const adminRoutes = /^\/admin/;
      if (eventRoutes.test(pathname)) {
        const match = pathname.match(eventRoutes);
        if (match) {
          const eventId = parseInt(match[1]);
          const canAccess = await checkEventAccess(eventId);
          if (!canAccess) {
            showNotification("You don't have access to this resource");
            router.replace('/landing');
            return;
          }
        }
      } else if (adminRoutes.test(pathname)) {
        if (!checkAdminAccess()) {
          showNotification("You don't have access to this resource");
          router.replace('/landing');
          return;
        }
      }
      setIsVerifying(false);
    };

    // // Early return if session is null or session.user.id is undefined
    // if (session === null || session.user?.id === undefined) {
    //   return;// Set to false to stop showing loading screen
    // }

    // else{
      
    // }

    //Only do this if the user is not logged or there's already a logged user!
    if (session == null || session.user?.id !== undefined) {
      checkAccess();
    }

    else{
      refetchSession();
    }
      
  }, [pathname, router, session]);

  if (isVerifying) return <LoadingScreen />;

  return (
    <>
      {children}
      <Notification
        message={notification.message}
        open={notification.open}
        onClose={closeNotification}
        snackbarColor="red"
      />
    </>
  );
};

export default ProtectedRoutes;
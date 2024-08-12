'use client'

import { useState, useEffect, useRef } from 'react';
import { HttpClient } from '@/app/lib/Http/HttpClient';
import { convertSnakeToCamel } from '@/app/lib/utils';

export const useNotification = (eventId, hasClickedBell) => {
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const [initialFetchDone, setInitialFetchDone] = useState(false);
  const previousMessagesRef = useRef([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const http = HttpClient.getInstance();
        const response = await http.get(`/api/event/${eventId}/messages`);
        const newMessages = response.data.map(item => convertSnakeToCamel(item));

        console.log('Fetched new messages:', newMessages);
        console.log('Previous messages:', previousMessagesRef.current);

        if (!initialFetchDone) {
          // Initial fetch
          previousMessagesRef.current = newMessages;
          setHasNewMessage(false); // No new messages on initial load
          setInitialFetchDone(true);
          return;
        }

        // Check for new messages
        const newMessageExists = newMessages.length > previousMessagesRef.current.length;
        setHasNewMessage(newMessageExists && !hasClickedBell);

        // Update previous messages
        previousMessagesRef.current = newMessages;
      } catch (error) {
        console.error('Failed to fetch messages:', error);
      }
    };

    fetchNotifications(); // Fetch immediately on mount

    // Fetch notifications every 15 seconds if the user has clicked the bell icon and hasNewMessage is true
    const interval = setInterval(() => {
      if (hasClickedBell && hasNewMessage) {
        fetchNotifications();
      }
    }, 15000);

    return () => clearInterval(interval);
  }, [eventId, hasClickedBell, hasNewMessage, initialFetchDone]);

  return { hasNewMessage };
};

import { HttpClient } from "../../Http/HttpClient";
import { convertSnakeToCamel } from "../snakeToCamelCase";
import {Event} from '@/app/lib/types'

export async function getEvent(eventId: number)  {
    try {
      const http = HttpClient.getInstance();
      let response = await http.get(`/api/events/${eventId}`);
      const event:Event = convertSnakeToCamel(response.data);
      return event
    } catch (error) {
      console.error('Failed to fetch events:', error);
      return null;
    }
  }
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt'; 
import { HttpClient } from './app/lib/Http/HttpClient';
import { convertSnakeToCamel } from './app/lib/utils';
import { Event } from './app/lib/types';

export async function middleware(request: NextRequest) {

// const url = request.nextUrl;    
// const pathname = url.pathname;

// const token = await getToken({
//     req: request,
//     secret: process.env.NEXTAUTH_SECRET,
// });


// const userAccessibleEvents= token?.eventsAvailable;
// const match = pathname.match(/^\/event\/(\d+)\/(.+)/);

// console.log("worked");


//   if (match) {

//     const eventId = parseInt(match[1]); 
//     const http = HttpClient.getInstance();
//     let response = await http.get(`/api/events/${eventId}`);
//     const event: Event = convertSnakeToCamel(response.data);
//     const canAccessEvent = userAccessibleEvents.some(element => element.event_id === event.id);

//     if(!canAccessEvent){
//         console.log("worked");

//         return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/landing`);
//     }

//     else{
//         return NextResponse.next();
//       }
// }



return NextResponse.next();

//   

//   const userAccessibleEvents= token?.eventsAvailable;

//   console.log(userAccessibleEvents);

//   const url = request.nextUrl;
//   const pathname = url.pathname;
//   const match = pathname.match(/^\/event\/(\d+)\/(.+)/);

//   if (match) {
//     const eventId = parseInt(match[1]); 
//     const canAccessEvent = userAccessibleEvents.some(element => element.event_id === eventId);

//     if(!canAccessEvent){
//         return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/landing`);
//     }

    // 
  }


export const config = {
  matcher: ['/event/:path*'],
};

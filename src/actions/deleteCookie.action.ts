// app/actions/deleteCookieAction.js
'use server'; // Mark this as a server action

import { cookies } from 'next/headers'; // Import the Next.js cookies API

export async function deleteCookieAction() {
  const cookieStore = cookies(); // Access the cookie store

  // Set the cookie to an empty value and expire it immediately
  cookieStore.set('theme', '', {
    path: '/',
    expires: new Date(0), // Set expiration to a past date to remove the cookie
  });
}

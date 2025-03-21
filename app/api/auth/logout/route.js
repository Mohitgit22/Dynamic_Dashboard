import { NextResponse } from 'next/server';

export async function POST(req) {
  // Clear the token cookie
  const response =  NextResponse.json({ message: 'Logout successful' }, {status: 200});
  response.cookies.set('token', '', { // Set the token to an empty string
        httpOnly: true,
        path: '/',
        expires: new Date(0), // Set the expiry date to the past
      })
    return response;
}

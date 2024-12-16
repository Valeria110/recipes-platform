const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export function getUserToken(tokenType: string) {
  const cookies = window.document.cookie.split(';');
  for (const cookie of cookies) {
    const trimmedCookie = cookie.trim();
    if (trimmedCookie.startsWith(`${tokenType}=`)) {
      return trimmedCookie.split('=')[1];
    }
  }
  return null;
}

export const isLoggedIn = async (accessToken: string, refreshToken: string) => {
  if (!accessToken) {
    console.error('Access token is not provided');
    return false;
  }

  try {
    const response = await fetch(`${BASE_URL}/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        refreshToken,
      }),
    });

    if (!response.ok) {
      console.error('Error refreshing token:', response.statusText);
      return false;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    return false;
  }
};

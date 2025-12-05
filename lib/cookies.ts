// lib/cookies.ts
const CART_COOKIE_NAME = 'cartId';

export function getCartCookie(): string | null {
  if (typeof document === 'undefined') {
    console.warn("Attempted to get cookie outside of browser environment.");
    return null;
  }
  try {
    const cookieString = document.cookie;
    const match = cookieString.match(new RegExp('(^| )' + CART_COOKIE_NAME + '=([^;]+)'));
    return match ? decodeURIComponent(match[2]) : null;
  } catch (e) {
    console.error("Error reading cart cookie:", e);
    return null;
  }
}

export function setCartCookie(cartId: string, expiresDays: number = 30) {
  if (typeof document === 'undefined') {
    console.warn("Attempted to set cookie outside of browser environment.");
    return;
  }
  const date = new Date();
  date.setTime(date.getTime() + (expiresDays * 24 * 60 * 60 * 1000));
  const expires = "expires=" + date.toUTCString();
  document.cookie = `<span class="math-inline">\{CART\_COOKIE\_NAME\}\=</span>{encodeURIComponent(cartId)};${expires};path=/;SameSite=Lax`;
}

export function removeCartCookie() {
  if (typeof document === 'undefined') {
    console.warn("Attempted to remove cookie outside of browser environment.");
    return;
  }
  document.cookie = `${CART_COOKIE_NAME}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;SameSite=Lax`;
}
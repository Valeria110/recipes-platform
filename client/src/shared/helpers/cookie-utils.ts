export function setCookie(name: string, value: string, maxAge = 604800) {
  document.cookie = `${name}=${value}; path=/; max-age=${maxAge}; SameSite=Lax`;
}

export function deleteCookie(name: string) {
  document.cookie = `${name}=; max-age=-1; SameSite=Lax`;
}

export function isSessionExpired(session: {
  expiresAt: Date | string;
}): boolean {
  return new Date(session.expiresAt) < new Date();
}

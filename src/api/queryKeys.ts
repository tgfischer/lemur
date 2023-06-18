export const queryKeys = {
  getUser: (jwt: string) => ["user", jwt],
  getUsers: (jwts: string[]) => ["user", jwts],
} as const;

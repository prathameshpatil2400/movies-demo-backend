export type JwtPayloadType = {
  userId: string;
  iat: number;
  exp: number;
  iss: string;
  sub: string;
  aud: string;
};

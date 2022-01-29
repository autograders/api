export const JWTConfig = {
  secret: process.env.JWT_SECRET || 'id89U!Hy33do9s2pBnPZ',
  signOptions: {
    expiresIn: 60 * 60 * 24 * 7 // 7 days
  }
};

export const accessTokenConfig = {
  secret: process.env.JWT_SECRET_KEY || 'secret',
  expiresIn: process.env.TOKEN_EXPIRE_TIME || '1h',
};

export const refreshTokenConfig = {
  secret: process.env.JWT_SECRET_REFRESH_KEY || 'refresh-secret',
  expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME || '24h',
};

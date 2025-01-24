FROM node:lts-alpine3.20
WORKDIR /app
COPY package*.json ./
# COPY ./prisma /server/prisma
# RUN apk add --no-cache openssl
RUN npm install
COPY . .
RUN npm run build
RUN npx prisma generate
EXPOSE 4000
CMD ["npm", "run", "start:prod"]

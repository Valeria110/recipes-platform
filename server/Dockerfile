FROM node:lts-alpine3.20
WORKDIR /server
COPY package*.json /server
COPY ./prisma /server/prisma
# RUN apk add --no-cache openssl
RUN npm install
RUN npx prisma generate
COPY . /server
CMD ["npm", "run", "start"]
EXPOSE 4000

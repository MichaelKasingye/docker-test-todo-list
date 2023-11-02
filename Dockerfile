FROM node:16-alpine
WORKDIR /src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 9000
CMD npm run dev
# CMD ["npm","dev"]
# CMD ["npm","start"]
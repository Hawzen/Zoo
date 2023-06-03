FROM node:14

WORKDIR /zoo

# npm config/install
COPY ./zoo/package*.json ./
RUN npm install
COPY ./zoo .

EXPOSE 3000

CMD [ "npm", "start" ]
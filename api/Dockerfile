FROM node:16-alpine
WORKDIR /app

COPY . /app

EXPOSE 5000

# run these commands
RUN ["npm", "ci"]
CMD ["npm", "start"]
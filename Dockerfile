# node base image
FROM node:22-slim

# install pnpm globally
RUN npm install -g pnpm

# setup up the working directory
WORKDIR /app

# copy package files
COPY package.json pnpm-lock.yaml ./

# install dependencies
RUN pnpm install

# copy rest of project files
COPY . .

# startup cmd
CMD ["pnpm", "dev"]
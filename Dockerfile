FROM node:6.10
MAINTAINER RD17 "http://rdseventeen.com"

# Set a timezone
ENV TZ=Europe/Moscow
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Bundle app source
COPY . /usr/src/app

CMD node dist --port=${port}
EXPOSE 8080
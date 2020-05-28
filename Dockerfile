FROM nginx:1.12-alpine
ADD ./build /usr/share/nginx/html
ADD ./devops/nginx.conf /etc/nginx/conf.d/default.conf
ADD ./devops/start.sh /start.sh
RUN chmod u+x /start.sh
EXPOSE 3000
ENV ENVIRONMENT="{}"

CMD /start.sh
FROM klakegg/hugo:0.101.0-ext-ubuntu AS builder

# Add package.json before rest of repo for caching
COPY package.json package-lock.json .nvmrc /src/
RUN npm ci

COPY . /src

RUN npm run build

FROM nginxinc/nginx-unprivileged:1.23-alpine
EXPOSE 8080
# The URL of the backend service, see https://github.com/acend/website-backend
ENV BACKEND_URL=http://acend-website-backend:8000


COPY --from=builder  /src/dist /usr/share/nginx/html
COPY --from=builder  /src/nginx.conf.template /etc/nginx/templates/default.conf.template

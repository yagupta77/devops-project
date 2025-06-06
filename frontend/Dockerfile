FROM nginx:alpine

# Copy built Vite app
COPY dist /usr/share/nginx/html

# Optional: add custom NGINX config for React SPA
COPY conf.d/default.conf /etc/nginx/conf.d/default.conf

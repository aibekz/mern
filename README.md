# Moji Cafe

Moji Cafe is a small MERN-stack sample app (MongoDB, Express, React, Node) that demonstrates a menu, shopping cart, and order history for users.

Quick start

- Install dependencies:

```bash
npm install
```

- Run the client in development (starts React dev server):

```bash
npm start
```

- Run the API server (set env vars `DATABASE_URL` and `SECRET` first). Example using macOS zsh:

```bash
export DATABASE_URL="mongodb://localhost:27017/moji-cafe"
export SECRET="your_jwt_secret"
node server.js
```

Build for production

```bash
npm run build
# serve the build via the API server which already serves the /build directory
node server.js
```

Notes

- The client proxies API requests to port 3001 during development (see `package.json`).
- Keep `SECRET` private — do not commit it to source control.

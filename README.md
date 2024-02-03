![logo](./public/logo.svg)

# Ouranos

Your friendly Bluesky client for the web. Made with Next.js.

## Getting Started

Install NPM packages in the project directory.

```bash
npm install
```

Run `npm run dev` and open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The following environment variables are required:

- `NEXTAUTH_SECRET` (generate one using `openssl rand -base64 32` or visit [https://generate-secret.vercel.app/32](https://generate-secret.vercel.app/32)). You won't need to prefix it with `NEXT_PUBLIC` if you are deploying to Vercel.
- `NEXTAUTH_URL` (`http://localhost:3000` while running locally. You won't need this variable in production if you're deploying to Vercel.)

To make changes, you can create a new branch and merge with development, or push directly to development. When you are ready to deploy, you can merge into preview (staging) or main (production) branches, which will automatically build and deploy to Vercel.

## Project Roadmap

Latest changes and updates are added to `Ouranos Roadmap` under [Projects](https://github.com/users/pdelfan/projects/1).

## FAQ

Please visit [https://useouranos.app/about](https://useouranos.app/about).

## License

MIT License

## Running

You can install the dependencies with `npm install` or your preferred package manager.
Additionally, you also need to set the following environment variables:
  - `REDIS_URL`: URL to a redis instance.
  - `CRON_SECRET`: Secure token to authenticate the cron worker responsible for daily updates.

```bash
# set the environment variables, you will of course need real values here
REDIS_URL=xxxxxx
CRON_SECRET=xxxxxxx

# start the development server
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production build:

```bash
npm run build
```

You can preview the production build with `npm run preview`.
To deploy somewhere other than Vercel, you will need to install the appropriate [adapter](https://kit.svelte.dev/docs/adapters)
for your target environment and setup a cron job as defined in `vercel.json`.

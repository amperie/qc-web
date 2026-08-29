# Quant Crucible Website

Static one-page landing site for Quant Crucible.

## Cloudflare Pages

Use these settings:

```txt
Build command: none
Build output directory: /
```

If Cloudflare requires a command, use:

```txt
Build command: npx wrangler pages deploy .
```

For Git-backed Pages deploys, connect the repository and leave the project as a plain static site.

## Domain

After the Pages project is deployed, add these custom domains in Cloudflare Pages:

```txt
quant-crucible.com
www.quant-crucible.com
```

Then make sure the domain uses Cloudflare nameservers at the registrar.

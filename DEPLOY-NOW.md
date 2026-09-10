# Deploy now (two options, each ~1 minute)

Both need one login step that only a human can do (browser OAuth). Everything else is prepared.

## A. Netlify — the real deployment (lead form + function work)

From `/Users/mac/mft-website`:

```bash
npx --yes netlify-cli login
```
(opens the browser once; approve with Ahmed's Netlify account or create one)

```bash
npx --yes netlify-cli deploy --prod --dir=dist --functions=functions
```
Answer "Create & configure a new site", pick any team, site name e.g. `mft-website`.
The command prints the live URL: `https://mft-website.netlify.app`.
`dist/` is already the production build; `netlify.toml` sets the Odoo lead route.

Later, to auto-deploy on every push: Netlify → Add new site → Import from Git → `Smart-Egypt-Group/mft-website` (private repo, already on GitHub).

## B. GitHub Pages — preview (lead form posts directly to Odoo CRM, `FORM_MODE=odoo-direct`)

The `gh-pages` branch (built with base path `/mft-website`) is already pushed to the private repo.
GitHub's free plan refuses Pages on private repos (verified: HTTP 422), so publish a public copy of the
built output — it contains nothing that is not already on the site itself:

```bash
gh repo create Smart-Egypt-Group/mft-website-preview --public --source=/Users/mac/mft-website-ghpages --push
```

Then the base path must match the new repo name, so rebuild and push once more:

```bash
cd /Users/mac/mft-website && SITE_URL=https://smart-egypt-group.github.io/mft-website-preview BASE_PATH=/mft-website-preview FORM_MODE=odoo-direct node build.js && rm -f dist/_redirects && cp -R dist/. /Users/mac/mft-website-ghpages/ && git -C /Users/mac/mft-website-ghpages add -A && git -C /Users/mac/mft-website-ghpages commit -qm "preview" && git -C /Users/mac/mft-website-ghpages push -u origin gh-pages:main && gh api -X POST repos/Smart-Egypt-Group/mft-website-preview/pages -f build_type=legacy -f 'source[branch]=main' -f 'source[path]=/'
```

URL after ~1 minute: `https://smart-egypt-group.github.io/mft-website-preview/`

Option A (Netlify) is simpler and is the real deployment; prefer it.

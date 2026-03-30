## Requirements

- Node.js `24.13.1` (see [`.tool-versions`](.tool-versions) for [asdf](https://asdf-vm.com/) users)

## Running

```
npm i
npm run dev
```

## Testing

Run the test suite locally:

```
npm test
```

## CI

Tests run automatically on every push and pull request via GitHub Actions (see [`.github/workflows/ci.yml`](.github/workflows/ci.yml)).

## CD

Deploy happens automatically to [render](https://disciplina-devops.onrender.com). Keep in mind that this is a free account. So it might delay up to 1 minute to have a response on the first request.

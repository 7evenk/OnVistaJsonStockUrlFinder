# onvista Stock URL Finder
- Runtime lives in extension/; load that directory in Chrome. Keep tests/tools/docs and artwork outside it.
- Run npm test, npm run check and npm run build with Node 24+. npm test uses synthetic service-worker regression tests; it does not prove live OnVista compatibility.
- Preserve functionality, permissions, versions and Store status in structural changes.
- Do not commit or push without explicit user authorization. Credentials only in Git Credential Manager.
- Use ../agent-foundation/tools/gh-repo.ps1 after reading its docs/github-auth.md. Repository-specific access is unavailable; the coordinating migration issue is google-tasks-filter#5.

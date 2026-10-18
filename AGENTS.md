# onvista Stock URL Finder
- Runtime lives in extension/; load that directory in Chrome. Keep tests/tools/docs and artwork outside it.
- Run npm test, npm run check and npm run build with Node 24+. npm test uses synthetic service-worker regression tests; it does not prove live OnVista compatibility.
- Preserve functionality, permissions, versions and Store status in structural changes.
- Do not commit or push without explicit user authorization. Credentials only in Git Credential Manager.
- Use ../agent-foundation/tools/gh-repo.ps1 after reading its docs/github-auth.md. Repository-specific access is unavailable; the coordinating migration issue is google-tasks-filter#5.
## AnyAutomation website coordination

- AnyAutomation is English first and intended for an international audience. This applies to new AnyAutomation website content; preserve existing product UI languages and maintained translations.
- For changes to public features, availability, permissions, privacy, compatibility or installation, review whether the public product pages need updating. Internal fixes with no public impact do not require a website edit.
- The future public product website is AnyAutomation/anyautomation-web, locally at ../anyautomation-web. Product source code, technical documentation and changelogs stay in this product repository; public descriptions, screenshots, requirements, release status and Store/download links belong in the website repository.
- Until an explicitly approved migration is complete, continue reviewing and maintaining the existing English and German product/privacy pages in ../7evenk.github.io. Preparing AnyAutomation pages does not replace this transitional responsibility. After migration, use the approved AnyAutomation pages and preserve legacy URLs according to the migration plan.
- Read each target repository's AGENTS.md before editing, inspect current files and preserve unrelated changes. Cross-repository work requires available, authorized access; never broaden credentials or permissions automatically.
- Prepare matching English AnyAutomation content changes when applicable. If the page does not exist yet, provide an English content draft and proposed page location; do not choose the website stack or create its infrastructure from this product task.
- If repository access is unavailable, give a concrete handoff identifying the product, affected pages, verified behavior changes, release status, links and screenshots/assets needed. State which website updates remain pending; do not claim synchronization is complete.
- Distinguish planned, private test, beta, prepared, submitted and published releases. A successful build or Store submission does not establish public availability.
- Report website impact and any prepared or pending changes in the task handoff. Commits, pushes, deployment, Store publication, redirects and changes to public Store/support/privacy URLs require explicit user authorization. Do not message another chat without explicit user authorization.

# Dayflow frontend preview

This is a frontend-only HRMS preview with fictional demo data. It is not yet suitable for production HR data, payroll processing, or employee authentication.

The UI follows the official Dayflow design system with the newer "Heritage Depth" visual layer from the supplied reference screenshots: forest navigation, warm cream workspace, sage actions, serif HR headings, sharper surfaces, and soft 3D elevation while keeping professional enterprise tables and demo-data safeguards.

## Run locally

```powershell
& 'C:\Users\ADMIN\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe' -m http.server 4173
```

Open `http://localhost:4173`.

## Validate

```powershell
& 'C:\Users\ADMIN\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe' tests/validate-static.mjs
```

## Required before production

- Firebase Authentication with Admin/HR-created accounts only
- Firestore and Storage security rules, plus role enforcement through trusted server-side functions
- Password reset, verification, session management, and audit logging
- Country-specific payroll rules and an approved payment workflow
- Security headers, a production hosting configuration, monitoring, backups, and end-to-end tests

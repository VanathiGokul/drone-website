# Secure Coding Practices Evaluation Checklist
> Based on **OWASP Secure Coding Practices Checklist (v2.0.1)**  
> **Target Project:** CITPL India Web (`frontend`, `backend`, `strapi`, `database`, `deployment`)  
> **Evaluation Date:** September 4, 2026  
> **Auditor/Reviewer:** Security Architecture & Code Review Audit  
> **Current Status / Version:** Local Codebase Audit (Complete)  

---

## 📊 Evaluation Scorecard & Summary

| Category | Total Checks | Compliant (✅) | Partially Compliant (⚠️) | Non-Compliant (❌) | Not Applicable (N/A) | Notes / Major Risks |
| :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| **1. Input Validation** | 16 | 7 | 4 | 5 | 0 | Ad-hoc validation, unbounded lengths, HTML injection in email mailers. |
| **2. Output Encoding** | 6 | 5 | 0 | 1 | 0 | React JSX escapes safely; HTML Injection flaw in nodemailer templates. |
| **3. Authentication & Password Mgmt** | 35 | 12 | 5 | 16 | 2 | **CRITICAL**: `/api/contact/leads` unauthenticated; hardcoded secrets in Git; no MFA. |
| **4. Session Management** | 20 | 9 | 5 | 4 | 2 | Stateless 24h JWTs without revocation/blocklist; Strapi admin cookie missing `Secure`. |
| **5. Access Control** | 24 | 12 | 5 | 7 | 0 | Customer leads exposed; IDOR on file deletion; unthrottled contact form. |
| **6. Cryptographic Practices** | 6 | 3 | 0 | 3 | 0 | Hardcoded fallback secrets in configs; `Math.random()` used for IDs. |
| **7. Error Handling & Logging** | 24 | 7 | 3 | 13 | 1 | `err.message` leaked in 500 responses; no unified logger; failed auth not logged. |
| **8. Data Protection** | 12 | 3 | 4 | 5 | 0 | Customer leads stored in plaintext JSON; production source maps (`.map`) enabled. |
| **9. Communication Security** | 8 | 4 | 1 | 3 | 0 | **CRITICAL**: Remote PostgreSQL uses `DATABASE_SSL=false`; SMTP cert check disabled. |
| **10. System Configuration** | 16 | 8 | 5 | 3 | 0 | Docker containers run as root; `X-Powered-By: Strapi` exposed; shared dev/prod DB. |
| **11. Database Security** | 12 | 4 | 4 | 3 | 1 | Cleartext DB transit (`ssl: false`); DB password in Git; single shared DB user. |
| **12. File Management** | 14 | 5 | 4 | 5 | 0 | Local web storage; no magic byte check; SVG uploads permitted (stored XSS). |
| **13. Memory Management** | 9 | 4 | 1 | 3 | 1 | 256MB body limits in Strapi; in-memory `loginAttempts` Map lacks TTL eviction. |
| **14. General Coding Practices** | 12 | 6 | 3 | 2 | 1 | Synchronous non-atomic file writes on JSON DB; containers run as root. |
| **TOTAL** | **214** | **89** | **44** | **73** | **8** | **Strict Compliance: 43.2% (Weighted: 53.9%)** |

### Status Legend
- **`[PASS]` / `✅` Compliant**: Implemented and verified according to secure best practices.
- **`[WARN]` / `⚠️` Partially Compliant**: Implemented with gaps, edge cases, or inconsistent coverage.
- **`[FAIL]` / `❌` Non-Compliant**: Not implemented, insecure, or introduces a known security risk.
- **`[N/A]` / `⚪` Not Applicable**: Irrelevant for the technology stack or environment (rationale required).

---

## 1. Input Validation

| # | Check Item | Status | Scope / Component | Code Review Guidance & Evidence | Findings / File Reference | Action Required |
|---|------------|--------|-------------------|---------------------------------|---------------------------|-----------------|
| 1.1 | Conduct all data validation on a trusted system (e.g., The server) | `[ ]` | Backend / Strapi | Never rely solely on client-side (browser) validation. Verify validations occur in server controllers/middlewares/schemas (e.g., Zod, Joi, class-validator). | | |
| 1.2 | Identify all data sources and classify into trusted/untrusted. Validate all untrusted sources (DB, external APIs, files) | `[ ]` | Backend / Strapi / DB | Check incoming request bodies, query params, headers, webhook payloads, file streams, and third-party API responses. | | |
| 1.3 | Centralized input validation routine for the application | `[ ]` | Backend / Strapi | Look for shared validation middleware, global DTO validators, or centralized schema registries instead of ad-hoc checks. | | |
| 1.4 | Specify proper character sets, such as UTF-8, for all sources of input | `[ ]` | Server / DB / HTTP Headers | Inspect HTTP headers (`Content-Type: application/json; charset=utf-8`), DB connection collation (UTF8MB4/UTF8), and HTML meta tags. | | |
| 1.5 | Encode data to a common character set before validating (Canonicalize) | `[ ]` | Backend / Middlewares | Ensure inputs are canonicalized prior to validation routines to prevent obfuscation bypasses. | | |
| 1.6 | All validation failures should result in input rejection | `[ ]` | Backend / Strapi | Reject malformed or invalid inputs immediately with `400 Bad Request`. Do not attempt to "auto-fix" or truncate insecure payloads. | | |
| 1.7 | Determine if system supports UTF-8 extended char sets; validate after UTF-8 decoding | `[ ]` | Backend / Framework | Verify URL decoding / unicode normalization happens before validation patterns run. | | |
| 1.8 | Validate all client-provided data before processing (parameters, URLs, HTTP headers, cookies) | `[ ]` | Frontend / Backend / Strapi | Inspect request headers (Cookie, User-Agent, Referer) and ensure unverified header inputs are not passed directly to business logic. | | |
| 1.9 | Verify that header values in both requests and responses contain only ASCII characters | `[ ]` | Backend / Reverse Proxy | Protect against HTTP response splitting / header injection. Ensure custom response headers do not inject non-ASCII or CRLF characters. | | |
| 1.10 | Validate data from redirects | `[ ]` | Frontend / Backend | Check Open Redirect scenarios: validate redirect target URLs against an explicit domain whitelist. | | |
| 1.11 | Validate for expected data types | `[ ]` | Backend / Strapi | Enforce strict types (numbers, booleans, string formats, arrays, UUIDs) using strict parsers. | | |
| 1.12 | Validate data range | `[ ]` | Backend / Strapi | Check numeric bounds (e.g., min/max pagination limit, price >= 0, valid date ranges). | | |
| 1.13 | Validate data length | `[ ]` | Backend / Strapi | Ensure string fields have maximum length constraints (e.g. usernames <= 50, comments <= 1000) to prevent ReDoS / memory attacks. | | |
| 1.14 | Validate all input against an allowlist ("white list") of allowed characters whenever possible | `[ ]` | Backend / Strapi | Prefer positive character allowlists (e.g. `^[a-zA-Z0-9_-]+$`) over negative denylists. | | |
| 1.15 | Implement additional controls if hazardous characters (`< > ' " % ( ) & + \ \' \"`) are required | `[ ]` | Backend / Frontend | When rich text or symbols are allowed, ensure contextual output encoding, DOMPurify sanitization, and safe parser APIs. | | |
| 1.16 | Discretely check for null bytes (`%00`), newlines (`%0d`, `%0a`, `\r`, `\n`), and path traversal (`../`, `..\`, `%c0%ae%c0%ae/`) | `[ ]` | Backend / File Uploads | Ensure file names, path parameters, and query fields reject null bytes, CRLF injections, and directory traversal sequences. | | |

---

## 2. Output Encoding

| # | Check Item | Status | Scope / Component | Code Review Guidance & Evidence | Findings / File Reference | Action Required |
|---|------------|--------|-------------------|---------------------------------|---------------------------|-----------------|
| 2.1 | Conduct all encoding on a trusted system (e.g., The server) | `[ ]` | Backend / SSR Frontend | Data rendered to HTML/client should be encoded by trusted server/SSR layers or framework-native escaping. | | |
| 2.2 | Utilize a standard, tested routine for each type of outbound encoding | `[ ]` | Frontend / Backend | Use standard contextual encoding libraries (e.g., React's default JSX escaping, `he`, `dompurify`). Avoid custom regex replacers. | | |
| 2.3 | Contextually output encode all data returned to the client outside trust boundary (HTML, JS, CSS, attributes) | `[ ]` | Frontend (React/Next) | Search for `dangerouslySetInnerHTML`, `innerHTML`, `document.write`, `eval()`, or unquoted attribute interpolation. | | |
| 2.4 | Encode all characters unless they are known to be safe for the intended interpreter | `[ ]` | Frontend / Backend | Verify standard encoding rules for JSON responses, CSV export routines, or XML parsers. | | |
| 2.5 | Contextually sanitize all output of untrusted data to queries for SQL, XML, and LDAP | `[ ]` | Backend / Strapi / DB | Ensure all SQL uses parameterized queries / ORM bindings. Avoid string concatenation in raw queries. | | |
| 2.6 | Sanitize all output of untrusted data to operating system commands | `[ ]` | Backend | Search for `child_process.exec()`, `execSync()`, `spawn()` with `shell: true`. Disallow passing untrusted input to shells; use `execFile` with argument arrays if necessary. | | |

---

## 3. Authentication & Password Management

| # | Check Item | Status | Scope / Component | Code Review Guidance & Evidence | Findings / File Reference | Action Required |
|---|------------|--------|-------------------|---------------------------------|---------------------------|-----------------|
| 3.1 | Require authentication for all pages and resources, except those specifically public | `[ ]` | Backend / Strapi / Frontend | Check API route guards, middleware rules, and Strapi permissions (Users & Permissions plugin). Verify default-deny. | | |
| 3.2 | All authentication controls must be enforced on a trusted system (e.g., The server) | `[ ]` | Backend / Strapi | Verify tokens and login credentials are authenticated strictly on the server, not via client-side boolean checks. | | |
| 3.3 | Establish and utilize standard, tested authentication services whenever possible | `[ ]` | Backend / Strapi | Use industry standards (OAuth2, OIDC, JWT with RS256/HS256, Strapi Auth). Do not roll custom cryptography or auth protocols. | | |
| 3.4 | Centralized implementation for all authentication controls | `[ ]` | Backend / Middlewares | Verify all authenticated endpoints pass through a single, unified auth middleware/guard. | | |
| 3.5 | Segregate authentication logic from the resource requested; use redirection to/from auth control | `[ ]` | Frontend / Backend | Protected routes must intercept unauthenticated requests and redirect to login, preserving intended return URL securely. | | |
| 3.6 | All authentication controls should fail securely | `[ ]` | Backend / Auth Handlers | In case of exceptions or missing parameters during auth processing, default to denying access (`401 Unauthorized`). | | |
| 3.7 | Administrative & account management functions must be at least as secure as primary auth | `[ ]` | Strapi Admin / Backend | Verify admin consoles have equal or stricter authentication, rate limiting, and session controls. | | |
| 3.8 | Credential store: use cryptographically strong one-way salted hashes (bcrypt, Argon2, scrypt; avoid MD5/SHA1) | `[ ]` | DB / Strapi / Backend | Inspect password hashing mechanism in database/Strapi. Verify Argon2id or bcrypt (work factor >= 10-12). | | |
| 3.9 | Password hashing must be implemented on a trusted system (e.g., The server) | `[ ]` | Backend / Strapi | Passwords must be hashed server-side before persisting into the DB. | | |
| 3.10 | Validate auth data only on completion of all data input | `[ ]` | Backend / Auth | Avoid timing leaks by validating username and password together without early return hints. | | |
| 3.11 | Generic auth failure messages: "Invalid username and/or password" (identical in UI & API) | `[ ]` | Backend / Auth / Frontend | Ensure login endpoints return identical response codes and messages for non-existent users and invalid passwords. | | |
| 3.12 | Utilize authentication for external systems involving sensitive info | `[ ]` | Backend Integrations | Check outgoing API calls to third-party services (payment gateways, mailers, microservices); ensure authenticated API tokens/mTLS. | | |
| 3.13 | Credentials for external services must be encrypted/protected on server; NEVER in source code | `[ ]` | Environment / Repo | Check `.env`, `docker-compose.yml`, repo commits. Confirm no hardcoded API keys, DB passwords, or secrets exist in Git. | | |
| 3.14 | Use only HTTP POST requests to transmit authentication credentials | `[ ]` | Frontend / Backend | Ensure login, registration, and password change endpoints use POST/PUT request bodies, never query parameters. | | |
| 3.15 | Send passwords only over encrypted connections (TLS); temporary passwords with email resets as limited exception | `[ ]` | Backend / Mailers | Plaintext passwords must never be emailed or transmitted over HTTP. Reset flows must use temporary cryptographic tokens. | | |
| 3.16 | Enforce password complexity requirements (alphabetic, numeric, special characters) | `[ ]` | Backend / Auth Validation | Verify password validation rules require letters, numbers, and special characters. | | |
| 3.17 | Enforce password length requirements (min 8 chars, 16 recommended, or passphrases) | `[ ]` | Backend / Auth Validation | Check minimum character length constraints on signup and password reset schemas. | | |
| 3.18 | Password entry obscured on user screen (`type="password"`) | `[ ]` | Frontend Forms | Inspect all password input tags across user and admin portals. | | |
| 3.19 | Enforce account locking/throttling after established number of invalid login attempts (e.g. 5 attempts) | `[ ]` | Backend / Rate Limiting | Verify rate limiting or lockouts on `/auth/login`, `/api/token` (e.g., using `express-rate-limit`, Redis limiter, or Strapi limiter). | | |
| 3.20 | Password reset & changing operations require same level of controls as account creation | `[ ]` | Backend / Auth | Require current password confirmation when updating passwords. Ensure reset tokens are single-use. | | |
| 3.21 | Password reset questions (if used) should support sufficiently random answers | `[ ]` | Backend / Auth | Discourage security questions; if implemented, ensure answers are treated like passwords (hashed, salted, unpredictable). | | |
| 3.22 | Email-based resets only sent to pre-registered address with temporary link/password | `[ ]` | Backend / Strapi / Mailer | Verify email reset sends tokens only to verified, registered emails. Do not reveal if email exists. | | |
| 3.23 | Temporary passwords and links should have a short expiration time (e.g. 15-60 minutes) | `[ ]` | Backend / Strapi / Mailer | Check expiration time (TTL) configured for reset tokens. | | |
| 3.24 | Enforce changing of temporary passwords on next use | `[ ]` | Backend / Auth | Users logged in via admin-issued temporary passwords must be forced to set a new password before accessing the system. | | |
| 3.25 | Notify users when a password reset occurs | `[ ]` | Backend / Mailer | Send confirmation email immediately upon successful password change. | | |
| 3.26 | Prevent password re-use | `[ ]` | Backend / Auth DB | Keep password history hash table if policy demands preventing the last N passwords from being re-used. | | |
| 3.27 | Passwords should be at least one day old before they can be changed (if preventing rapid re-use) | `[ ]` | Backend / Auth | Policy-specific: prevents cycling through history in one sitting. | | |
| 3.28 | Enforce password changes based on policy; time between resets administratively controlled | `[ ]` | Backend / Auth Policy | Review policy regarding password expiry intervals. | | |
| 3.29 | Disable "remember me" functionality for password fields (or implement securely via tokens) | `[ ]` | Frontend / Forms | Check browser autofill/remember settings (`autocomplete="current-password"` vs insecure storage). | | |
| 3.30 | Report last use (successful or unsuccessful) to user at next successful login | `[ ]` | Backend / Frontend UI | Display "Last logged in at [Timestamp] from [IP]" on user dashboard. | | |
| 3.31 | Implement monitoring for attacks against multiple user accounts using the same password (password spraying) | `[ ]` | Backend / Logs / SIEM | Monitor aggregate failed logins across all accounts from single IPs/subnets. | | |
| 3.32 | Change all vendor-supplied default passwords and user IDs or disable associated accounts | `[ ]` | DB / Strapi / Containers | Ensure Strapi admin, Postgres `postgres` user, and server SSH accounts do not use default passwords. | | |
| 3.33 | Re-authenticate users prior to performing critical operations (email change, payment, deletion) | `[ ]` | Backend / API | Check if sensitive settings require password re-entry or 2FA challenge. | | |
| 3.34 | Use Multi-Factor Authentication (MFA/2FA) for highly sensitive or high-value accounts | `[ ]` | Strapi Admin / Backend | Check TOTP / SMS / WebAuthn availability for admin portal and privileged users. | | |
| 3.35 | Inspect third-party code used for authentication to ensure no malicious code or vulnerabilities | `[ ]` | Dependencies (`npm audit`) | Audit auth packages (`passport`, `next-auth`, `@strapi/plugin-users-permissions`, `jsonwebtoken`). | | |

---

## 4. Session Management

| # | Check Item | Status | Scope / Component | Code Review Guidance & Evidence | Findings / File Reference | Action Required |
|---|------------|--------|-------------------|---------------------------------|---------------------------|-----------------|
| 4.1 | Use server or framework's session management controls; application only recognizes these IDs | `[ ]` | Backend / Strapi | Verify built-in session / JWT handlers are used rather than custom token generators. | | |
| 4.2 | Session identifier creation must always be done on a trusted system (e.g., The server) | `[ ]` | Backend / Strapi | Session IDs / JWTs must be signed and issued exclusively by server-side secrets. | | |
| 4.3 | Session management controls use well-vetted algorithms ensuring sufficient randomness | `[ ]` | Backend / Token Gen | Verify random token generators use cryptographically secure PRNGs (`crypto.randomBytes()`). | | |
| 4.4 | Set domain and path for cookies containing authenticated session IDs appropriately | `[ ]` | Backend / Cookie Config | Inspect cookie flags: `Path=/`, strict `Domain` scope (avoid broad parent domain exposure unless needed). | | |
| 4.5 | Logout functionality should fully terminate the associated session or connection | `[ ]` | Backend / Frontend | Ensure logout invalidates server-side session, revokes refresh token, or blacklists JWT where appropriate. | | |
| 4.6 | Logout functionality should be available from all pages protected by authorization | `[ ]` | Frontend UI / Layout | Verify logout button/action is globally accessible in header/nav of protected views. | | |
| 4.7 | Establish a session inactivity timeout as short as possible (no more than several hours) | `[ ]` | Backend / JWT / Strapi | Inspect session / token TTL (e.g., access token 15m - 1h, refresh token inactivity expiration). | | |
| 4.8 | Disallow persistent logins and enforce periodic session terminations even when active | `[ ]` | Backend / Auth Policy | Enforce maximum absolute session lifetime (e.g., re-login required every 7-14 days). | | |
| 4.9 | If session was established before login, close that session and establish a new session after login | `[ ]` | Backend / Session | Prevent Session Fixation: regenerate session ID / issue fresh JWT upon successful login. | | |
| 4.10 | Generate a new session identifier on any re-authentication | `[ ]` | Backend / Auth Handlers | Ensure session tokens are rotated when privileges or identities change. | | |
| 4.11 | Do not allow concurrent logins with the same user ID (if required by security policy) | `[ ]` | Backend / Session Store | Check if single-session enforcement is required; if so, verify session table tracks active sessions per user. | | |
| 4.12 | Do not expose session identifiers in URLs, error messages, or logs | `[ ]` | Backend / Logging / URLs | Confirm session tokens / JWTs are never placed in URL query params (`?token=...`), log files, or error traces. | | |
| 4.13 | Protect server-side session data from unauthorized access by other users of the server | `[ ]` | Backend / Redis / DB | Ensure Redis or DB session tables enforce strict file/network access permissions. | | |
| 4.14 | Generate a new session identifier and deactivate the old one periodically | `[ ]` | Backend / Refresh Tokens | Verify refresh token rotation mechanisms (issue new refresh token upon each refresh). | | |
| 4.15 | Generate new session identifier if connection changes between HTTP and HTTPS (consistently enforce HTTPS) | `[ ]` | Reverse Proxy / Server | Enforce HTTPS everywhere; redirect HTTP to HTTPS immediately. | | |
| 4.16 | Supplement session management with per-session strong random CSRF tokens for sensitive state-changing operations | `[ ]` | Backend / Middlewares | If using cookie-based authentication, verify CSRF protection (Double Submit Cookie, `csurf`, or SameSite cookies). | | |
| 4.17 | Supplement session management for highly sensitive operations with per-request tokens | `[ ]` | Backend / High-Value Ops | Single-use nonces or re-authentication challenges on money transfers or account deletion. | | |
| 4.18 | Set `Secure` attribute for cookies transmitted over TLS | `[ ]` | Backend / Cookie Config | Inspect cookie configuration: verify `secure: true` in production environment. | | |
| 4.19 | Set cookies with `HttpOnly` attribute unless specifically required by client scripts | `[ ]` | Backend / Cookie Config | Confirm authentication cookies have `httpOnly: true` to prevent theft via XSS. | | |
| 4.20 | Set `SameSite` attribute for cookies (`Lax` or `Strict`) | `[ ]` | Backend / Cookie Config | Confirm `sameSite: 'lax'` or `'strict'` is set on session cookies to defend against CSRF. | | |

---

## 5. Access Control

| # | Check Item | Status | Scope / Component | Code Review Guidance & Evidence | Findings / File Reference | Action Required |
|---|------------|--------|-------------------|---------------------------------|---------------------------|-----------------|
| 5.1 | Use only trusted system objects (e.g. server-side session objects) for authorization decisions | `[ ]` | Backend / Strapi | Derive user identity and role from verified JWT/session on server, NEVER from client request payload (e.g. `req.body.role`). | | |
| 5.2 | Use a single site-wide component to check access authorization | `[ ]` | Backend / Middleware | Implement centralized RBAC/ABAC guards or middleware across all route handlers. | | |
| 5.3 | Access controls should fail securely (Default Deny) | `[ ]` | Backend / Strapi | If permission is not explicitly granted, deny access by default (`403 Forbidden`). | | |
| 5.4 | Deny all access if application cannot access its security configuration information | `[ ]` | Backend / Startup | Fail app startup or halt execution if auth DB, secret keys, or permission configs are unreachable. | | |
| 5.5 | Enforce authorization controls on every request (server scripts, includes, AJAX/API endpoints) | `[ ]` | Backend / API Routes | Audit all REST/GraphQL endpoints; ensure no unprotected internal endpoints exist. | | |
| 5.6 | Segregate privileged logic from other application code | `[ ]` | Backend / Strapi | Keep admin controllers, elevated operations, and background worker jobs separated from public APIs. | | |
| 5.7 | Restrict access to files or resources, including those outside direct control, to authorized users | `[ ]` | Backend / Storage | Check static file serving and private media downloads. Verify ACLs before streaming files. | | |
| 5.8 | Restrict access to protected URLs to only authorized users | `[ ]` | Frontend / Backend | Protect both client-side route navigation and backing API endpoints. | | |
| 5.9 | Restrict access to protected functions to only authorized users | `[ ]` | Backend / Services | Validate user permissions at the service/business logic layer, not just the controller layer. | | |
| 5.10 | Restrict Direct Object References (IDOR prevention) to only authorized users | `[ ]` | Backend / APIs | For queries like `/api/order/:id` or `/api/user/:id`, ensure the query explicitly checks `ownerId == currentUser.id` or user is admin. | | |
| 5.11 | Restrict access to services to only authorized users | `[ ]` | Microservices / Internal APIs | Secure internal microservice calls or background queues with mutual auth or internal API keys. | | |
| 5.12 | Restrict access to application data to only authorized users | `[ ]` | Backend / ORM Queries | Verify multi-tenant / user data isolation at the DB query level. | | |
| 5.13 | Restrict access to user and data attributes and policy information used by access controls | `[ ]` | Backend / Strapi | Users must not be able to elevate their own role (`role: 'admin'`) or modify access control tables. | | |
| 5.14 | Restrict access to security-relevant configuration information to authorized users only | `[ ]` | Strapi Admin / Config APIs | Ensure `.env`, runtime configurations, and feature flags cannot be read or changed by normal users. | | |
| 5.15 | Server-side implementation and presentation-layer representations of access rules must match | `[ ]` | Frontend / Backend | If a button is hidden on frontend for a role, the backend API MUST also forbid that action. | | |
| 5.16 | If state data must be stored on client, use encryption and server-side integrity checking | `[ ]` | Frontend / Cookies / Storage | Verify client state tokens (e.g. JWT) are cryptographically signed with HMAC/RSA. | | |
| 5.17 | Enforce application logic flows to comply with business rules | `[ ]` | Backend / Workflows | Ensure multi-step processes (e.g., checkout, KYC, approvals) cannot be bypassed by skipping steps. | | |
| 5.18 | Rate limit transactions per user/device in a given time period to deter automated attacks | `[ ]` | Backend / Reverse Proxy | Apply rate limiting per IP / user token to sensitive business actions (orders, message sending, search). | | |
| 5.19 | Use `Referer` header as supplemental check only; never as sole authorization check | `[ ]` | Backend / Middlewares | Verify authorization does not rely on `req.headers.referer` (which can be omitted or spoofed). | | |
| 5.20 | Periodically re-validate user's authorization in long sessions; logout on privilege change | `[ ]` | Backend / JWT / Sessions | Revoke or refresh tokens immediately if user's role is demoted or account is locked. | | |
| 5.21 | Implement account auditing and disable unused accounts (e.g. 30 days of inactivity) | `[ ]` | Admin / DB cron | Review policies and automated scripts for deactivating dormant accounts. | | |
| 5.22 | Support disabling accounts and terminating active sessions when authorization ceases | `[ ]` | Backend / Auth / Strapi | An admin disabling an account must instantly invalidate active JWTs/sessions. | | |
| 5.23 | Service accounts / external connection accounts must have least privilege | `[ ]` | DB / Cloud APIs | DB users and third-party API keys should only have access to required schemas/resources. | | |
| 5.24 | Document application's Access Control Policy (business rules, roles, data types, criteria) | `[ ]` | Documentation | Verify presence of documented matrix of roles vs permissions for the application. | | |

---

## 6. Cryptographic Practices

| # | Check Item | Status | Scope / Component | Code Review Guidance & Evidence | Findings / File Reference | Action Required |
|---|------------|--------|-------------------|---------------------------------|---------------------------|-----------------|
| 6.1 | All cryptographic functions used to protect secrets implemented on a trusted system (server) | `[ ]` | Backend / Strapi | Encryption/decryption of confidential data must occur on server, never exposed in client JS. | | |
| 6.2 | Protect master secrets from unauthorized access | `[ ]` | Infrastructure / Secrets | Master keys (JWT secrets, encryption keys) stored in environment variables, secret managers, or vault; restrictive permissions (`chmod 600`). | | |
| 6.3 | Cryptographic modules should fail securely | `[ ]` | Backend / Crypto | If crypto operation fails, cleanly throw error and reject transaction without leaking partial output. | | |
| 6.4 | Generate all random numbers, tokens, file names, GUIDs using approved CSPRNGs | `[ ]` | Backend / Frontend | Use `crypto.randomBytes()`, `crypto.randomUUID()`. DO NOT use `Math.random()` for security-sensitive values. | | |
| 6.5 | Cryptographic modules compliant with FIPS 140-2 or modern standards (AES-GCM, SHA-256+, RSA-2048+) | `[ ]` | Backend / Crypto | Inspect algorithms used in project: AES-256-GCM, ChaCha20-Poly1305. Avoid DES, RC4, 3DES, MD5, SHA1. | | |
| 6.6 | Establish and utilize a policy and process for cryptographic key management | `[ ]` | Infrastructure / Docs | Verify key generation, storage, distribution, rotation intervals, and revocation procedures. | | |

---

## 7. Error Handling & Logging

| # | Check Item | Status | Scope / Component | Code Review Guidance & Evidence | Findings / File Reference | Action Required |
|---|------------|--------|-------------------|---------------------------------|---------------------------|-----------------|
| 7.1 | Do not disclose sensitive information in error responses (system details, session IDs, accounts) | `[ ]` | Backend / Strapi / API | Ensure API errors return clean messages (e.g. `{"error": "An internal error occurred"}`) without DB details. | | |
| 7.2 | Use error handlers that do not display debugging or stack trace information | `[ ]` | Backend / Express / Next | Verify `NODE_ENV=production` disables stack traces. Check global error middleware. | | |
| 7.3 | Implement generic error messages and use custom error pages | `[ ]` | Frontend / Backend | Custom 404, 500 pages in Next.js / frontend; generic status messages in API responses. | | |
| 7.4 | Application handles errors gracefully and does not rely on default server configuration | `[ ]` | Backend / Frontend | Ensure uncaught exceptions / unhandled promise rejections are caught and handled cleanly. | | |
| 7.5 | Properly free allocated memory when error conditions occur | `[ ]` | Backend | Ensure streams, DB connections, or file descriptors are closed in `finally` blocks. | | |
| 7.6 | Error handling logic associated with security controls must deny access by default | `[ ]` | Backend / Auth Guards | Catch blocks in authorization middleware must return 401/403, never proceed to `next()`. | | |
| 7.7 | All logging controls implemented on a trusted system (server) | `[ ]` | Backend / Infrastructure | Client logs should not be trusted for audit trails; server records authoritative security events. | | |
| 7.8 | Logging controls support both success and failure of specified security events | `[ ]` | Backend / Auth / Admin | Log successful logins, failed logins, role changes, privilege escalations. | | |
| 7.9 | Ensure logs contain important event data (timestamp, actor ID, IP, event type, status) | `[ ]` | Backend / Logger | Verify log format provides sufficient forensics without logging PII/secrets. | | |
| 7.10 | Prevent Log Injection: ensure untrusted data does not execute as code in log viewers | `[ ]` | Backend / Logger | Sanitize CRLF (`\r`, `\n`) and HTML/script tags from user inputs before writing to log streams. | | |
| 7.11 | Restrict access to logs to only authorized individuals | `[ ]` | Infrastructure / File Perms | Ensure log files / monitoring dashboards (Grafana, Kibana, Datadog) require authentication and RBAC. | | |
| 7.12 | Utilize a master routine / unified logger for all logging operations (e.g., Winston, Pino) | `[ ]` | Backend / Strapi | Replace stray `console.log` calls with structured logging library with appropriate log levels. | | |
| 7.13 | Do not store sensitive information in logs (passwords, tokens, cards, full PII) | `[ ]` | Backend / Logger | Implement log masking/redaction for fields like `password`, `token`, `authorization`, `creditCard`. | | |
| 7.14 | Ensure a mechanism exists to conduct log analysis | `[ ]` | Infrastructure / Ops | Check if logs are aggregated, searchable, and monitored for alerts. | | |
| 7.15 | Log all input validation failures | `[ ]` | Backend / Validation | Log validation rejections with endpoint name and client IP for intrusion detection. | | |
| 7.16 | Log all authentication attempts, especially failures | `[ ]` | Backend / Auth | Track failed attempts, unrecognized usernames, and repeated failures. | | |
| 7.17 | Log all access control failures | `[ ]` | Backend / Authorization | Log 403 Forbidden attempts to access unauthorized resources. | | |
| 7.18 | Log all apparent tampering events (CSRF mismatch, signature failures, state alterations) | `[ ]` | Backend / Security | Alert on HMAC/checksum mismatches or invalid tokens. | | |
| 7.19 | Log attempts to connect with invalid or expired session tokens | `[ ]` | Backend / Auth Guard | Log expired or malformed JWT attempts. | | |
| 7.20 | Log all system exceptions | `[ ]` | Backend / Server | Capture unhandled errors and 5xx exceptions with context. | | |
| 7.21 | Log all administrative functions, including security configuration changes | `[ ]` | Strapi / Admin Panel | Audit trail for role modifications, user creation/deletion, policy updates. | | |
| 7.22 | Log all backend TLS connection failures | `[ ]` | Backend / HTTP Clients | Log certificate validation errors or TLS negotiation drops to upstream services. | | |
| 7.23 | Log cryptographic module failures | `[ ]` | Backend / Crypto | Capture key generation, encryption, or decryption errors. | | |
| 7.24 | Use cryptographic hash function to validate log entry integrity (where required) | `[ ]` | Logging Infrastructure | Tamper-evident logging or write-once-read-many (WORM) storage for compliance. | | |

---

## 8. Data Protection

| # | Check Item | Status | Scope / Component | Code Review Guidance & Evidence | Findings / File Reference | Action Required |
|---|------------|--------|-------------------|---------------------------------|---------------------------|-----------------|
| 8.1 | Implement least privilege: restrict users to only necessary functionality, data, and system info | `[ ]` | All Layers | Review Strapi roles, backend API scopes, and frontend permission gating. | | |
| 8.2 | Protect cached/temporary copies of sensitive data on server; purge working files immediately | `[ ]` | Backend / Temp Files | Clean up uploaded files in `/tmp` after processing; set secure directory permissions (`0700`). | | |
| 8.3 | Encrypt highly sensitive stored information (auth credentials, PII) using vetted algorithms | `[ ]` | Database / Backend | Verify field-level encryption for sensitive user data (tax IDs, banking info, API secrets). | | |
| 8.4 | Protect server-side source code from being downloaded by a user | `[ ]` | Server / Web Server Config | Ensure `.git`, `.env`, `.ts`, configuration files are not served as static assets by Nginx/Express. | | |
| 8.5 | Do not store passwords, connection strings, or sensitive data in plaintext on client side | `[ ]` | Frontend / Mobile / HTML | Inspect `localStorage`, `sessionStorage`, client cookies, Redux/state stores for tokens or secrets. | | |
| 8.6 | Remove comments in user-accessible production code that may reveal backend or sensitive info | `[ ]` | Frontend Build (Webpack/Vite/Next) | Ensure production build pipeline strips JavaScript comments, internal endpoints, and staging URLs. | | |
| 8.7 | Remove unnecessary application and system documentation accessible to attackers | `[ ]` | Web Root / Public Dir | Check `/public` directory for README files, architectural specs, API documentation left publicly accessible. | | |
| 8.8 | Do not include sensitive information in HTTP GET request parameters | `[ ]` | Frontend / Backend APIs | Check query strings: tokens, passwords, SSNs, personal data must not be in URLs (they appear in logs, referrers, history). | | |
| 8.9 | Disable autocomplete on forms expected to contain sensitive info (`autocomplete="off"`) | `[ ]` | Frontend Forms | Check inputs for credit card, OTP, SSN, or sensitive identification data. | | |
| 8.10 | Disable client-side caching on pages containing sensitive information | `[ ]` | Backend / Response Headers | Set `Cache-Control: no-store, no-cache, must-revalidate` and `Pragma: no-cache` for sensitive API responses. | | |
| 8.11 | Support removal of sensitive data when no longer required (data retention / right to be forgotten) | `[ ]` | Backend / DB Cron | Implement mechanisms to delete or anonymize expired user data according to GDPR/DPDP policies. | | |
| 8.12 | Implement appropriate access controls for sensitive data stored on server (files, cache) | `[ ]` | Server OS / DB / S3 | Ensure file uploads and cache directories have strict OS permissions or private S3 bucket policies. | | |

---

## 9. Communication Security

| # | Check Item | Status | Scope / Component | Code Review Guidance & Evidence | Findings / File Reference | Action Required |
|---|------------|--------|-------------------|---------------------------------|---------------------------|-----------------|
| 9.1 | Implement encryption for transmission of all sensitive information (TLS everywhere) | `[ ]` | Infrastructure / Nginx | All traffic across public internet must be over HTTPS / TLS 1.2+. | | |
| 9.2 | TLS certificates should be valid, correct domain name, not expired, with intermediate certs | `[ ]` | Infrastructure / SSL | Verify Let's Encrypt / custom cert configuration and automated renewal. | | |
| 9.3 | Failed TLS connections should not fall back to an insecure connection | `[ ]` | Infrastructure / Client Code | Disallow plain HTTP fallback; reject unencrypted transport. | | |
| 9.4 | Utilize TLS connections for all authenticated content and sensitive information | `[ ]` | Frontend / Backend | Ensure complete site uses HTTPS, not just the login page. | | |
| 9.5 | Utilize TLS for connections to external systems involving sensitive info or functions | `[ ]` | Backend / Third-party APIs | Verify external HTTP clients (Axios, Fetch) strictly use `https://` URLs and enforce cert validation. | | |
| 9.6 | Utilize a single standard TLS implementation configured appropriately (strong ciphers) | `[ ]` | Reverse Proxy / Nginx | Disable outdated protocols (SSLv3, TLS 1.0, TLS 1.1) and insecure cipher suites. | | |
| 9.7 | Specify character encodings for all connections | `[ ]` | HTTP Headers | Ensure `Content-Type: text/html; charset=UTF-8` or `application/json; charset=UTF-8` on all responses. | | |
| 9.8 | Filter parameters containing sensitive information from HTTP Referer when linking to external sites | `[ ]` | Frontend / HTTP Headers | Set `Referrer-Policy: strict-origin-when-cross-origin` or `no-referrer`. Use `rel="noopener noreferrer"` on external links. | | |

---

## 10. System Configuration

| # | Check Item | Status | Scope / Component | Code Review Guidance & Evidence | Findings / File Reference | Action Required |
|---|------------|--------|-------------------|---------------------------------|---------------------------|-----------------|
| 10.1 | Ensure servers, frameworks, and system components run the latest approved version | `[ ]` | Docker / Node.js / OS | Check `package.json`, Dockerfile base images (Node LTS, Alpine updates). | | |
| 10.2 | Ensure servers, frameworks, and system components have all patches issued for version in use | `[ ]` | OS / Dependencies | Run `npm audit` and vulnerability scanners (Snyk, Trivy). | | |
| 10.3 | Turn off directory listings | `[ ]` | Nginx / Web Server | Ensure `autoindex off;` in Nginx / Apache and static file middlewares do not serve directory indices. | | |
| 10.4 | Restrict web server, process, and service accounts to least privileges possible | `[ ]` | Docker / OS | Run Node.js container as non-root user (`USER node`). Avoid running backend services as `root`. | | |
| 10.5 | When exceptions occur, fail securely | `[ ]` | Backend / App Lifecycle | Application should exit gracefully or recover without leaving database or files in an open/insecure state. | | |
| 10.6 | Remove all unnecessary functionality and files | `[ ]` | Codebase / Repo | Delete dead code, unused endpoints, temporary test scripts, unused packages from `package.json`. | | |
| 10.7 | Remove test code or any functionality not intended for production prior to deployment | `[ ]` | Codebase / Build Pipeline | Verify mock routes, seed endpoints, or test harnesses are excluded from production builds. | | |
| 10.8 | Prevent disclosure of directory structure in `robots.txt` | `[ ]` | Frontend / Public | Do not enumerate sensitive hidden admin directories in `robots.txt`. Restrict parent paths cleanly. | | |
| 10.9 | Define which HTTP methods (GET, POST, etc.) application supports per route | `[ ]` | Backend / Routing | Explicitly register route methods. Reject unexpected methods with `405 Method Not Allowed`. | | |
| 10.10 | Disable unnecessary HTTP methods (WebDAV, TRACE, TRACK) | `[ ]` | Web Server / Nginx | Disable `TRACE` and `TRACK` to prevent Cross-Site Tracing (XST). | | |
| 10.11 | Ensure both HTTP 1.0 and 1.1 (and HTTP/2) are configured consistently | `[ ]` | Web Server / Proxy | Verify protocol handling differences do not expose request smuggling vulnerabilities. | | |
| 10.12 | Remove unnecessary info from HTTP response headers (OS, web server, framework versions) | `[ ]` | Backend / Reverse Proxy | Remove `X-Powered-By: Express` / `X-Powered-By: Strapi` / `Server` version banner (use `helmet.hidePoweredBy()`). | | |
| 10.13 | Security configuration store should be exportable in human-readable form for auditing | `[ ]` | Config / Documentation | Maintain documented and reviewable configuration manifests (e.g. sanitized config dumps). | | |
| 10.14 | Implement asset management system and register system components and software | `[ ]` | DevOps / Inventory | Track inventory of servers, cloud databases, domains, third-party services. | | |
| 10.15 | Isolate development environments from production network | `[ ]` | DevOps / Infrastructure | Ensure dev/test environments cannot connect directly to production databases or internal networks. | | |
| 10.16 | Implement software change control system to manage and record changes in dev & prod | `[ ]` | Git / CI/CD | Follow Git release workflow (`AGENTS.md` rules: merge to `Production` via PR/merge, no direct commits). | | |

---

## 11. Database Security

| # | Check Item | Status | Scope / Component | Code Review Guidance & Evidence | Findings / File Reference | Action Required |
|---|------------|--------|-------------------|---------------------------------|---------------------------|-----------------|
| 11.1 | Use strongly typed parameterized queries | `[ ]` | Backend / Strapi / DB Queries | Ensure all SQL queries use parameterized placeholders (`$1`, `?`) or ORM query builders (Prisma, Knex, TypeORM). | | |
| 11.2 | Utilize input validation and output encoding; do not execute DB command if validation fails | `[ ]` | Backend / DB Layer | Validate data types before binding to database query parameters. | | |
| 11.3 | Ensure variables bound to queries are strongly typed | `[ ]` | Backend / TypeScript | Use TypeScript types, DTOs, and runtime type checking before DB layer calls. | | |
| 11.4 | Application should use lowest possible level of privilege when accessing database | `[ ]` | DB Config / Postgres | DB user should not be superuser (`postgres`). Restrict to schema-level CRUD permissions. | | |
| 11.5 | Use secure credentials for database access | `[ ]` | Environment / Config | Verify strong, non-default passwords for DB users; enforce SSL/TLS when connecting over networks. | | |
| 11.6 | Connection strings must NOT be hardcoded in application; store encrypted in separate config | `[ ]` | Environment / Config | Verify DB credentials come from environment variables (`process.env.DATABASE_URL`), never committed to git. | | |
| 11.7 | Use stored procedures / views to abstract data access and restrict base table access (where appropriate) | `[ ]` | Database Schema | Evaluate if sensitive operations benefit from DB-level encapsulation. | | |
| 11.8 | Close database connections as soon as possible (utilize connection pooling properly) | `[ ]` | Backend / DB Pool | Ensure connection pool configuration (min/max connections, idle timeout) cleans up connections properly. | | |
| 11.9 | Remove or change all default database administrative passwords; use strong passwords / MFA | `[ ]` | Database Server | Ensure default `postgres` password is changed and not exposed externally without firewall protection. | | |
| 11.10 | Turn off unnecessary database functionality (sample schemas, unused stored procedures/extensions) | `[ ]` | Database Server | Drop default templates, sample databases, and unused Postgres extensions. | | |
| 11.11 | Disable any default database accounts not required to support business | `[ ]` | Database Server | Audit `pg_user` and remove unneeded default accounts. | | |
| 11.12 | Connect to database with different credentials for every trust distinction (e.g. read-only, app user, admin) | `[ ]` | Backend / DB Config | Use separate database roles for background reporting (read-only) vs web app vs migration runner. | | |

---

## 12. File Management

| # | Check Item | Status | Scope / Component | Code Review Guidance & Evidence | Findings / File Reference | Action Required |
|---|------------|--------|-------------------|---------------------------------|---------------------------|-----------------|
| 12.1 | Do not pass user-supplied data directly to any dynamic include function | `[ ]` | Backend | Search for dynamic `require()`, `import()`, or `fs.readFile()` using user inputs. Prevent Local File Inclusion (LFI). | | |
| 12.2 | Require authentication before allowing a file to be uploaded | `[ ]` | Backend / Upload Routes | Verify file upload endpoints (`/api/upload`, media endpoints) strictly require valid auth tokens. | | |
| 12.3 | Limit file types that can be uploaded to only types needed for business purposes | `[ ]` | Backend / Strapi Upload | Enforce strict MIME-type and extension allowlist (e.g., only `.jpg`, `.png`, `.pdf`). Reject executables (`.exe`, `.sh`, `.php`, `.js`, `.html`). | | |
| 12.4 | Validate uploaded files are expected type by checking file headers (magic bytes), not just extension | `[ ]` | Backend / Upload Middleware | Use magic number validation (e.g. `file-type` package) to verify actual file binary content matches extension. | | |
| 12.5 | Do not save files in same web context as application (use content server, object storage, or DB) | `[ ]` | Upload Storage / S3 / CDN | Store uploaded media in AWS S3, Cloudinary, or dedicated isolated storage, NOT inside web server doc root. | | |
| 12.6 | Prevent or restrict uploading of any file that may be interpreted by web server | `[ ]` | Web Server / Uploads | Ensure upload directories cannot execute `.php`, `.cgi`, `.js`, `.html`, or `.svg` (which may contain XSS). | | |
| 12.7 | Turn off execution privileges on file upload directories | `[ ]` | Server OS / Nginx | Set upload directories to `noexec` mount or configure web server: `location /uploads { ... no-exec ... }`. | | |
| 12.8 | Implement safe uploading in UNIX by mounting target directory as logical drive / chroot | `[ ]` | Infrastructure / Docker | Isolate file processing in dedicated containers or restricted filesystem volumes. | | |
| 12.9 | When referencing existing files, use an allowlist of allowed names; reject or use default | `[ ]` | Backend / File Service | Validate file identifiers against an internal ID or allowlist rather than accepting raw filenames. | | |
| 12.10 | Do not pass user-supplied data into a dynamic redirect (accept only validated relative paths) | `[ ]` | Backend / Frontend | Prevent Open Redirect: validate target URL against allowed relative paths or domain whitelist. | | |
| 12.11 | Do not pass directory or file paths from client; use index values mapped to pre-defined paths | `[ ]` | Backend / Downloads | Use UUIDs or DB IDs (e.g. `/files/download/:fileId`) mapped in the database rather than `/download?path=/var/data/...`. | | |
| 12.12 | Never send absolute file path to the client | `[ ]` | Backend / API Responses | Check API responses; do not expose internal server paths like `/var/www/...` or `/Users/...`. | | |
| 12.13 | Ensure application files and resources are read-only | `[ ]` | Server OS / Docker | Application source code files should have read-only permissions for the runtime process (`chmod -R 555`). | | |
| 12.14 | Scan user-uploaded files for viruses and malware | `[ ]` | Backend / Pipeline | Integrate ClamAV or cloud virus scanning API before storing or distributing uploaded files. | | |

---

## 13. Memory Management

| # | Check Item | Status | Scope / Component | Code Review Guidance & Evidence | Findings / File Reference | Action Required |
|---|------------|--------|-------------------|---------------------------------|---------------------------|-----------------|
| 13.1 | Utilize input and output control for untrusted data | `[ ]` | Backend / Streams / Buffers | Restrict maximum payload body sizes (e.g., `express.json({ limit: '1mb' })`) to prevent memory exhaustion DoS. | | |
| 13.2 | Double check that buffer is as large as specified | `[ ]` | Node.js Buffer Ops | Check `Buffer.alloc()` vs `Buffer.allocUnsafe()`. Avoid uninitialized buffers that leak memory contents. | | |
| 13.3 | Check function string copy byte limits and ensure NULL-termination (native / C-bindings) | `[ ]` | Native Addons (if any) | If using C/C++ native Node addons or WebAssembly, verify bounds and string termination. | | |
| 13.4 | Check buffer boundaries in loops to ensure no out-of-bounds writing | `[ ]` | Stream/Buffer Processing | Audit custom parsing loops handling binary data or multipart streams. | | |
| 13.5 | Truncate all input strings to reasonable length before passing to copy/concatenation | `[ ]` | Backend / Validation | Enforce string length validation early to prevent high memory consumption and ReDoS. | | |
| 13.6 | Specifically close resources; do not rely solely on garbage collection (DB connections, file handles) | `[ ]` | Backend Services | Ensure file streams, database clients, and sockets are explicitly closed in `finally` blocks or stream pipelines. | | |
| 13.7 | Use non-executable stacks when available (DEP / NX) | `[ ]` | OS / Container | Standard OS / Docker security flags (e.g. modern 64-bit Linux kernels enforce NX by default). | | |
| 13.8 | Avoid use of known vulnerable functions | `[ ]` | Backend / Native Code | Avoid deprecated/dangerous runtime functions or vulnerable npm packages. | | |
| 13.9 | Properly free allocated memory upon completion of functions and at all exit points | `[ ]` | Backend / Event Listeners | Watch for Node.js memory leaks: unremoved EventEmitter listeners, global arrays growing indefinitely, unclosed streams. | | |

---

## 14. General Coding Practices

| # | Check Item | Status | Scope / Component | Code Review Guidance & Evidence | Findings / File Reference | Action Required |
|---|------------|--------|-------------------|---------------------------------|---------------------------|-----------------|
| 14.1 | Use tested and approved managed code rather than creating new unmanaged code | `[ ]` | Backend / Frontend | Prefer well-maintained libraries and standard runtime APIs over low-level custom implementations. | | |
| 14.2 | Utilize task-specific built-in APIs to conduct OS tasks; do not issue commands directly to OS shells | `[ ]` | Backend | Use Node's `fs` or `path` modules rather than executing `exec("rm -rf ...")` or shell scripts. | | |
| 14.3 | Use checksums or hashes to verify integrity of interpreted code, libraries, executables, configs | `[ ]` | Dependencies / CI/CD | Commit `package-lock.json` with integrity hashes; verify build artifact integrity. | | |
| 14.4 | Utilize locking or synchronization mechanisms to prevent race conditions | `[ ]` | Backend / DB Transactions | Use database transactions (`SERIALIZABLE` or `SELECT ... FOR UPDATE`) or distributed locks (Redis Redlock) on critical balances/inventories. | | |
| 14.5 | Protect shared variables and resources from inappropriate concurrent access | `[ ]` | Backend Services | Avoid global mutable state in Node.js server instances across concurrent requests. | | |
| 14.6 | Explicitly initialize all variables and data stores during declaration or before first usage | `[ ]` | Codebase | Ensure strict TypeScript `noImplicitAny` and `strictNullChecks` to avoid undefined state bugs. | | |
| 14.7 | In cases where app runs with elevated privileges, raise as late as possible and drop as soon as possible | `[ ]` | Scripts / Container Setup | If startup scripts require root (e.g. binding ports), drop privileges to user `node` before starting the server. | | |
| 14.8 | Avoid calculation errors: understand data types, byte sizes, precision, signed/unsigned, NaN, overflow | `[ ]` | Backend / Financial Ops | In JavaScript, use `BigInt` or specialized decimal libraries (e.g., `decimal.js`) for currency and floating-point math. | | |
| 14.9 | Do not pass user-supplied data to any dynamic execution function | `[ ]` | Frontend / Backend | Prohibit `eval()`, `new Function()`, `setTimeout(string)`, `vm.runInThisContext()` with user-supplied data. | | |
| 14.10 | Restrict users from generating new code or altering existing code | `[ ]` | Backend / Application | Disallow runtime template evaluation or code compilation from user input. | | |
| 14.11 | Review all secondary applications, third-party code, and libraries for business necessity and safety | `[ ]` | Dependencies | Perform regular dependency reviews; remove unnecessary dependencies; run `npm audit` in CI/CD pipeline. | | |
| 14.12 | Implement safe updating: use cryptographic signatures and encrypted channels for code updates | `[ ]` | CI/CD / Deployment | Pull code via SSH / HTTPS only; verify Docker image digests; sign releases where applicable. | | |

---

## 🎯 Codebase Evaluation Workflow

To conduct a security review of this codebase using this checklist:

### Step 1: Pre-Audit Setup & Tooling
Run the following automated checks to gather initial security telemetry:
```bash
# 1. Audit frontend dependencies
cd frontend && npm audit

# 2. Audit backend/Strapi dependencies
cd ../strapi && npm audit # or backend directory

# 3. Check for exposed secrets or hardcoded credentials
git grep -i -E "(password|secret|apikey|api_key|token|private_key)" -- ":!package-lock.json" ":!*.md"

# 4. Search for hazardous dynamic code execution
git grep -E "(eval\(|new Function\(|dangerouslySetInnerHTML|child_process)"
```

### Step 2: Component-by-Component Walkthrough
1. **Frontend (`frontend/`)**: Focus on **Input Validation** (1.8), **Output Encoding** (2.3), **Session Management** (4.18-4.20), **Data Protection** (8.5-8.9).
2. **Strapi CMS (`strapi/`)**: Focus on **Authentication** (3.1, 3.8, 3.19), **Access Control** (5.1-5.14), **File Management** (12.2-12.7), **Database Security** (11.1-11.6).
3. **Backend APIs (`backend/`)**: Focus on **Input Validation** (1.1-1.16), **Access Control / IDOR** (5.10), **Error Handling & Logging** (7.1-7.20), **Race Conditions** (14.4).
4. **Database (`98.70.45.43:5432 / citpl_web_dev`)**: Verify **Database Security** (11.4 - least privilege, 11.6 - secure config in env).
5. **Deployment & Docker (`docker-compose.yml`, Nginx)**: Verify **System Configuration** (10.1-10.12), **Communication Security** (9.1-9.6).

### Step 3: Record Findings & Assign Actions
- Mark each item as `[PASS]`, `[WARN]`, `[FAIL]`, or `[N/A]`.
- Note down specific file paths and line numbers under **Findings / File Reference**.
- Add actionable remediation steps under **Action Required**.
- Calculate final compliance percentage in the **Evaluation Scorecard**.

---

## 📑 Full Comprehensive Audit Report
A complete technical evaluation detailing every finding, code line references, Proof-of-Concept risks, and remediation roadmap is available in the audit artifact:
- [OWASP Secure Coding Practices Evaluation & Verification Report](file:///Users/vishvav-120049/.gemini/antigravity/brain/580fbc96-70b5-4472-b7e6-e3c9f90ac169/secure_coding_audit_report.md)


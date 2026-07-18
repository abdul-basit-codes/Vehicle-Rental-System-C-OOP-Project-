# Security Policy

## Known Vulnerabilities

### XSS Risk in Customer Input
Customer names and phone numbers are rendered via template literals in `index.html`. For production use, sanitize inputs before DOM insertion.

### In-Memory API State
The Vercel serverless API stores data in memory. Data resets on cold start. For production, use a database.

### CORS
API endpoints use `Access-Control-Allow-Origin: *`. Restrict to your domain in production.

## Recommendations

- Sanitize all user inputs before rendering
- Use a database for persistent storage
- Restrict CORS origins
- Add rate limiting to API endpoints

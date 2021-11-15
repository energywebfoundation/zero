# Configuration

Zero components instances are configured with the env variables described below.

## Frontend

### API_BASE_URL

Defines base URL of the backend REST API. UI is going to use it to generate URLs to be requested. For
example: `https://api.mydomain.com/api`.

**Warning!** Backend always exposes API under `/api` path and it needs to be included.

## Backend

### NODE_ENV:

default: `development`. Should be set to `production` on production

### LOG_LEVELS:

default: `log,error,warn,debug,verbose`

Defines verbosity level of the application log messages.

For production recommended value is `log,error,warn`

### DATABASE_URL:

Database connection URL, for example: `postgresql://postgres:postgres@db:5432/zero`.

### SMTP_URL:

SMTP server to be used for sending emails to the users. For example: `smtp://mailserver:1025`

### UI_BASE_URL:

A base URL of the Frontend. Used to generate for example links in email confirmation messages. For
example: `http://ui.mydomain.com`

### JWT_SECRET:

A secret string used to sign and validate access tokens.

**Warning!!! This needs to be kept secret and protected.** Changing this value will result with all logged-in users
being logged out immediately after backend application restarted. When changed, all running instances need to be
restarted simultaneously.

### JWT_TTL:

Expiration time of access tokens. For example: `1d` `24h`. When access token expires user needs to resubmit credentials.

### CORS_ORIGIN:

A value of the `Access-Control-Allow-Origin` http response header. Needs to be set to the URL frontend is served from.
For example: `http://ui.mydomain.com`, `*`. If correctly set to only frontend base URL, drastically reduces risk
of [CSRF](https://owasp.org/www-community/attacks/csrf) type attacks. If not set correctly, web browser can refuse to make
connections to the backend REST API. Use browser developer tools to diagnose it.

### CORS_MAX_AGE:

Determines time in seconds for how long CORS headers will be cached in web browser.

### EMAIL_CONFIRMATION_TTL:

Expiration time in seconds of email confirmation links.

default: `86400`

### AWS_BUCKET
An AWS S3 bucket for user files storage.

Required, no default value.

### AWS_REGION
An AWS S3 region of a bucket.

Required, no default value.

### AWS_ACCESS_KEY_ID
An AWS S3 access key with object create and set ACL privileges

Required, no default value.

### AWS_SECRET_ACCESS_KEY
An AWS secret related to the access key

Required, no default value.

### FILES_BASE_URL
Base URL for a files. Used to generate files urls. Should poing to the /files backend endpoing,
for example `http://localhost:3333/api/files`

default: `http://localhost:3333/api/files`

### UPLOADED_FILE_SIZE_LIMIT:

Uploaded file size limit in bytes.

default: `200000`

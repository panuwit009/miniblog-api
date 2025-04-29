## Requirements

- Node.js 20+
- npm 10+
- Docker & Docker Compose

## Features

- **Create Post** — Add a new blog post
- **Read Posts** — Fetch all posts or a specific post
- **Update Post** — Edit an existing post
- **Delete Post** — Remove a post from the database
- **Unit Tests** — Ensure API endpoints work as expected

## How to Run

### 📦 Running with Docker

1. Clone this repository:

    ```bash
    git clone https://github.com/panuwit009/miniblog-api.git
    cd miniblog-api
    ```

2. Copy `.env.docker.example` to `.env`:

    ```bash
    cp .env.docker.example .env
    ```
    Then set up your `POSTGRES_USER`, `POSTGRES_PASSWORD`, and `POSTGRES_DB` values in the `.env` file.

3. Start the application with Docker Compose:

    ```bash
    docker-compose up --build
    ```
    This will automatically:
    - Build the app
    - Set up the PostgreSQL database
    - Run `init.sql` to create the necessary tables
    - Start the backend API on port `3000`

4. Test the API:

    The API will be available at:  
    [http://localhost:3000/api/blog](http://localhost:3000/api/blog)

    You can test the endpoints using tools like `Postman` or `curl`.

# Baldwinson HQ - Backend

Go-based API backend for Baldwinson HQ.

## Tech Stack

- Go 1.23
- [ConnectRPC](https://connectrpc.com/) - Type-safe RPC framework (gRPC-compatible)
- [Buf](https://buf.build/) - Protocol buffer tooling
- PostgreSQL 16 - Database
- Docker - Containerization

## Project Structure

```
├── cmd/
│   └── api/          # Application entrypoint
├── gen/              # Generated protobuf/Connect code
├── internal/
│   ├── config/       # Configuration loading
│   ├── database/     # Database connection
│   ├── domains/      # Business logic by domain
│   │   └── waitlist/ # Waitlist domain (service + repository)
│   ├── interceptor/  # RPC interceptors
│   └── server/       # HTTP server setup
└── proto/            # Protobuf definitions
```

## Getting Started

### Prerequisites

- Go 1.23+
- PostgreSQL (or use Docker Compose from root)
- [Buf CLI](https://buf.build/docs/installation) (for proto generation)

### Running Locally

```sh
# Start PostgreSQL via Docker Compose (from project root)
docker compose up postgres -d

# Run the API
go run ./cmd/api
```

API runs on port `8080` by default.

### With Docker

```sh
docker build -t baldwinson-api .
docker run -p 8080:8080 -e DATABASE_URL="..." baldwinson-api
```

## Environment Variables

| Variable       | Description                    | Default |
| :------------- | :----------------------------- | :------ |
| `DATABASE_URL` | PostgreSQL connection string   | -       |
| `PORT`         | Server port                    | `8080`  |

## Protobuf Generation

```sh
buf generate
```

Generated code is output to `gen/`.

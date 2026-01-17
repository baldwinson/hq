# Baldwinson HQ

A full-stack web application with an Astro frontend and Go backend.

**Live:** [www.baldwinson.com](https://www.baldwinson.com)

## Project Structure

```
├── astro/          # Frontend - Astro + TailwindCSS
├── backend/        # Backend - Go API with ConnectRPC
├── docker-compose.yml
└── docs/
```

## Tech Stack

**Frontend (`astro/`)**
- [Astro](https://astro.build/) - Static site generator
- [TailwindCSS](https://tailwindcss.com/) v4 - Styling
- [Lucide](https://lucide.dev/) - Icons
- Deployed on Vercel

**Backend (`backend/`)**
- Go 1.23
- [ConnectRPC](https://connectrpc.com/) - Type-safe RPC framework
- PostgreSQL 16 - Database
- [Buf](https://buf.build/) - Protocol buffer tooling

## Getting Started

### Prerequisites

- Docker & Docker Compose
- Node.js & pnpm (for frontend development)
- Go 1.23+ (for backend development)

### Running with Docker

```sh
docker compose up -d
```

This starts:
- **API** on port 8080
- **PostgreSQL** on port 5433

### Local Development

**Frontend:**
```sh
cd astro
pnpm install
pnpm dev
```

**Backend:**
```sh
cd backend
go run ./cmd/api
```

## Environment Variables

Copy `.env.example` files and configure as needed:
- `astro/.env.example` → `astro/.env`

Key variables:
- `DATABASE_URL` - PostgreSQL connection string
- `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB` - Database credentials

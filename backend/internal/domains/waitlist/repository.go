package waitlist

import (
	"context"
	"database/sql"
)

type Repository struct {
	db *sql.DB
}

func NewRepository(db *sql.DB) *Repository {
	return &Repository{db: db}
}

type SubscribeParams struct {
	Email     string
	IPAddress string
	UserAgent string
}

func (r *Repository) Subscribe(ctx context.Context, params SubscribeParams) error {
	_, err := r.db.ExecContext(ctx,
		`INSERT INTO waitlist (email, source, ip_address, user_agent) 
		 VALUES ($1, $2, $3, $4) 
		 ON CONFLICT (email) DO NOTHING`,
		params.Email, "ethics", params.IPAddress, params.UserAgent,
	)
	return err
}

func (r *Repository) Migrate(ctx context.Context) error {
	_, err := r.db.ExecContext(ctx, `
		CREATE TABLE IF NOT EXISTS waitlist (
			id SERIAL PRIMARY KEY,
			email VARCHAR(255) UNIQUE NOT NULL,
			source VARCHAR(100),
			ip_address INET,
			user_agent TEXT,
			created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
		);
		CREATE INDEX IF NOT EXISTS idx_waitlist_ip_address ON waitlist(ip_address);
		CREATE INDEX IF NOT EXISTS idx_waitlist_created_at ON waitlist(created_at)
	`)
	return err
}

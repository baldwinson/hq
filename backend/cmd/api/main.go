package main

import (
	"context"
	"log/slog"
	"os"

	"github.com/baldwinson/hq/backend/internal/config"
	"github.com/baldwinson/hq/backend/internal/database"
	"github.com/baldwinson/hq/backend/internal/domains/waitlist"
	"github.com/baldwinson/hq/backend/internal/server"
)

func main() {
	slog.SetDefault(slog.New(slog.NewJSONHandler(os.Stdout, nil)))

	cfg, err := config.Load()
	if err != nil {
		slog.Error("failed to load config", slog.String("error", err.Error()))
		os.Exit(1)
	}

	db, err := database.Connect(cfg.DatabaseURL)
	if err != nil {
		slog.Error("failed to connect to database", slog.String("error", err.Error()))
		os.Exit(1)
	}
	defer db.Close()

	waitlistRepo := waitlist.NewRepository(db)
	if err := waitlistRepo.Migrate(context.Background()); err != nil {
		slog.Error("failed to run migrations", slog.String("error", err.Error()))
		os.Exit(1)
	}

	waitlistSvc := waitlist.NewService(waitlistRepo)

	srv := server.New(cfg.Port)
	srv.RegisterWaitlistService(waitlistSvc)

	if err := srv.ListenAndServe(); err != nil {
		slog.Error("server error", slog.String("error", err.Error()))
		os.Exit(1)
	}
}

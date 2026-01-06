package server

import (
	"context"
	"fmt"
	"log/slog"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"connectrpc.com/connect"
	"golang.org/x/net/http2"
	"golang.org/x/net/http2/h2c"

	"github.com/baldwinson/hq/backend/gen/baldwinson/ethics/v1/ethicsv1connect"
	"github.com/baldwinson/hq/backend/internal/interceptor"
)

type Server struct {
	httpServer *http.Server
	mux        *http.ServeMux
}

func New(port string) *Server {
	mux := http.NewServeMux()

	mux.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("ok"))
	})

	return &Server{
		httpServer: &http.Server{
			Addr:         fmt.Sprintf(":%s", port),
			Handler:      h2c.NewHandler(mux, &http2.Server{}),
			ReadTimeout:  10 * time.Second,
			WriteTimeout: 10 * time.Second,
			IdleTimeout:  120 * time.Second,
		},
		mux: mux,
	}
}

func (s *Server) RegisterWaitlistService(svc ethicsv1connect.WaitlistServiceHandler) {
	interceptors := connect.WithInterceptors(
		interceptor.NewRecoveryInterceptor(),
		interceptor.NewLoggingInterceptor(),
	)

	path, handler := ethicsv1connect.NewWaitlistServiceHandler(svc, interceptors)
	s.mux.Handle(path, handler)
}

func (s *Server) ListenAndServe() error {
	errCh := make(chan error, 1)

	go func() {
		slog.Info("server starting", slog.String("addr", s.httpServer.Addr))
		if err := s.httpServer.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			errCh <- err
		}
	}()

	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)

	select {
	case err := <-errCh:
		return err
	case sig := <-quit:
		slog.Info("shutting down", slog.String("signal", sig.String()))
	}

	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()

	return s.httpServer.Shutdown(ctx)
}

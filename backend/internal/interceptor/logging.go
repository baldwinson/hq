package interceptor

import (
	"context"
	"log/slog"
	"time"

	"connectrpc.com/connect"
)

func NewLoggingInterceptor() connect.UnaryInterceptorFunc {
	return func(next connect.UnaryFunc) connect.UnaryFunc {
		return func(ctx context.Context, req connect.AnyRequest) (connect.AnyResponse, error) {
			start := time.Now()

			resp, err := next(ctx, req)

			duration := time.Since(start)

			attrs := []any{
				slog.String("procedure", req.Spec().Procedure),
				slog.Duration("duration", duration),
			}

			if err != nil {
				attrs = append(attrs, slog.String("error", err.Error()))
				slog.Error("request failed", attrs...)
			} else {
				slog.Info("request completed", attrs...)
			}

			return resp, err
		}
	}
}

package interceptor

import (
	"context"
	"log/slog"

	"connectrpc.com/connect"
)

func NewRecoveryInterceptor() connect.UnaryInterceptorFunc {
	return func(next connect.UnaryFunc) connect.UnaryFunc {
		return func(ctx context.Context, req connect.AnyRequest) (resp connect.AnyResponse, err error) {
			defer func() {
				if r := recover(); r != nil {
					slog.Error("panic recovered", slog.Any("panic", r), slog.String("procedure", req.Spec().Procedure))
					err = connect.NewError(connect.CodeInternal, nil)
				}
			}()
			return next(ctx, req)
		}
	}
}

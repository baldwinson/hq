package waitlist

import (
	"context"
	"regexp"

	"connectrpc.com/connect"

	ethicsv1 "github.com/baldwinson/hq/backend/gen/baldwinson/ethics/v1"
)

var emailRegex = regexp.MustCompile(`^[^\s@]+@[^\s@]+\.[^\s@]+$`)

type Service struct {
	repo *Repository
}

func NewService(repo *Repository) *Service {
	return &Service{repo: repo}
}

func (s *Service) Subscribe(ctx context.Context, req *connect.Request[ethicsv1.SubscribeRequest]) (*connect.Response[ethicsv1.SubscribeResponse], error) {
	email := req.Msg.GetEmail()

	if email == "" {
		return nil, connect.NewError(connect.CodeInvalidArgument, nil)
	}

	if !emailRegex.MatchString(email) {
		return nil, connect.NewError(connect.CodeInvalidArgument, nil)
	}

	if err := s.repo.Subscribe(ctx, email); err != nil {
		return nil, connect.NewError(connect.CodeInternal, err)
	}

	return connect.NewResponse(&ethicsv1.SubscribeResponse{
		Message: "Thank you. We'll notify you when the first publication is available.",
	}), nil
}

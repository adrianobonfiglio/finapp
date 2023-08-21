package users

type UserAuth struct {
	Token           string `json:"token"`
	TokenExpiration int64  `json:"expirationDate"`
}

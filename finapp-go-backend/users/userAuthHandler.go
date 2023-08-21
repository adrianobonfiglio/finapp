package users

import (
	"encoding/json"
	"net/http"
	"time"

	"github.com/dgrijalva/jwt-go"
)

func Authenticate(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var user User

	err := json.NewDecoder(r.Body).Decode(&user)

	user = findUserPass(user.Email, user.Pass)

	if (err != nil || user == User{}) {
		writeAnauthorizedResponse(w)
		return
	}

	userAuth, err := generateAuthToken(user)

	json, err := json.Marshal(userAuth)

	if err != nil {
		writeAnauthorizedResponse(w)
		return
	}
	w.Write(json)
}

func writeAnauthorizedResponse(w http.ResponseWriter) {
	w.WriteHeader(http.StatusUnauthorized)
}

func generateAuthToken(user User) (UserAuth, error) {
	token := jwt.New(jwt.SigningMethodHS256)
	tokenExpiration := time.Now().Add(time.Minute * 40).Unix()

	// Set claims (user information)
	claims := token.Claims.(jwt.MapClaims)
	claims["user_id"] = user.ID
	claims["exp"] = tokenExpiration // Token expiration time

	tokenString, err := token.SignedString([]byte("THIS_is_A_SECURE_secrect_KEY"))
	if err != nil {
		return UserAuth{}, err
	}

	return UserAuth{Token: tokenString, TokenExpiration: tokenExpiration}, nil
}

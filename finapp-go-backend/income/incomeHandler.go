package income

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
)

func convertIdToUint(id string) (uint, error) {
	num, err := strconv.Atoi(id)
	if err != nil {
		return uint(num), err
	}
	return uint(num), nil
}

func GetAllHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)

	resp, err := json.Marshal(getAll())

	if err != nil {
		w.WriteHeader(http.StatusNotFound)
	}

	w.Write(resp)
}

func CreateHandler(w http.ResponseWriter, r *http.Request) {
	var income Income
	err := json.NewDecoder(r.Body).Decode(&income)
	if err != nil {
		fmt.Print(err)
	}
	save(income)
}

func EditHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	vars := mux.Vars(r)
	var income Income
	id := vars["id"]

	convertedID, err := convertIdToUint(id)

	err = json.NewDecoder(r.Body).Decode(&income)

	if err != nil {
		fmt.Println(err)
	}
	exp, error := update(convertedID, income)
	if error != nil {
		fmt.Println(err)
		w.WriteHeader(http.StatusNotFound)
		return
	}
	json, error := json.Marshal(exp)
	w.Write(json)
}

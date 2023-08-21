package payments

import (
	"encoding/json"
	"fmt"
	"log"
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
	json, error := json.Marshal(getAll())
	if error != nil {
	}
	w.Write(json)
}

func FindOneHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	vars := mux.Vars(r)
	var payment *Payment
	id := vars["id"]

	convertedID, err := convertIdToUint(id)

	if err == nil {
		payment, err = findOne(convertedID)
	}

	if err != nil {
		w.WriteHeader(http.StatusNotFound)
		return
	}
	json, err := json.Marshal(payment)
	w.Write(json)
}

func EditHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	vars := mux.Vars(r)
	var payment Payment
	id := vars["id"]

	convertedID, err := convertIdToUint(id)

	err = json.NewDecoder(r.Body).Decode(&payment)

	if err != nil {
		fmt.Println(err)
	}
	exp, error := update(convertedID, payment)
	if error != nil {
		fmt.Println(err)
		w.WriteHeader(http.StatusNotFound)
		return
	}
	json, error := json.Marshal(exp)
	w.Write(json)
}

func CreateHandler(w http.ResponseWriter, r *http.Request) {
	var payment Payment
	err := json.NewDecoder(r.Body).Decode(&payment)
	if err != nil {
		log.Print(err)
	}
	save(payment)
}

func DeleteHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	err := delete(vars["id"])
	if err != nil {
		w.WriteHeader(http.StatusNotFound)
	}
	w.WriteHeader(http.StatusNoContent)
}

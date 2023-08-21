package expenses

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

	month := r.URL.Query().Get("month")
	year := r.URL.Query().Get("year")

	var resp []byte
	var err error
	var monthNum int
	var yearNum int

	if month != "" {
		monthNum, err = strconv.Atoi(month)
		yearNum, err = strconv.Atoi(year)
		resp, err = json.Marshal(getExepensesPaymentsByMonth(monthNum, yearNum))
	} else {
		resp, err = json.Marshal(getAll())
	}

	if err != nil {
		w.WriteHeader(http.StatusNotFound)
	}

	w.Write(resp)
}

func FindOneHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	vars := mux.Vars(r)
	var expense *Expense
	id := vars["id"]

	convertedID, err := convertIdToUint(id)

	if err == nil {
		expense, err = findOne(convertedID)
	}

	if err != nil {
		w.WriteHeader(http.StatusNotFound)
		return
	}
	json, err := json.Marshal(expense)
	w.Write(json)
}

func EditHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	vars := mux.Vars(r)
	var expense Expense
	id := vars["id"]

	convertedID, err := convertIdToUint(id)

	err = json.NewDecoder(r.Body).Decode(&expense)

	if err != nil {
		fmt.Println(err)
	}
	exp, error := update(convertedID, expense)
	if error != nil {
		fmt.Println(err)
		w.WriteHeader(http.StatusNotFound)
		return
	}
	json, error := json.Marshal(exp)
	w.Write(json)
}

func CreateHandler(w http.ResponseWriter, r *http.Request) {
	var expense Expense
	err := json.NewDecoder(r.Body).Decode(&expense)
	if err != nil {
		log.Print(err)
	}
	save(expense)
}

func DeleteHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	err := delete(vars["id"])
	if err != nil {
		w.WriteHeader(http.StatusNotFound)
	}
	w.WriteHeader(http.StatusNoContent)
}

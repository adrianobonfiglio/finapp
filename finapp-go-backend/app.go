package main

import (
	"log"
	"net/http"
	"test/app/common"
	"test/app/dashboard"
	"test/app/expenses"
	"test/app/income"
	"test/app/models"
	"test/app/payments"
	"test/app/users"

	"github.com/gorilla/mux"
)

func main() {
	r := mux.NewRouter()

	// EXPENSES
	r.HandleFunc("/expenses", expenses.GetAllHandler).Methods(http.MethodGet, http.MethodOptions)
	r.HandleFunc("/expenses/{id}", expenses.FindOneHandler).Methods(http.MethodGet, http.MethodOptions)
	r.HandleFunc("/expenses/{id}", expenses.EditHandler).Methods(http.MethodPut, http.MethodOptions)
	r.HandleFunc("/expenses/{id}", expenses.DeleteHandler).Methods(http.MethodDelete, http.MethodOptions)
	r.HandleFunc("/expenses", expenses.CreateHandler).Methods(http.MethodPost, http.MethodOptions)

	//PAYMENTS
	r.HandleFunc("/payments", payments.GetAllHandler).Methods("GET")
	r.HandleFunc("/payments/{id}", payments.FindOneHandler).Methods("GET")
	r.HandleFunc("/payments/{id}", payments.EditHandler).Methods("PUT")
	r.HandleFunc("/payments/{id}", payments.DeleteHandler).Methods("DELETE")
	r.HandleFunc("/payments", payments.CreateHandler).Methods("POST")

	//USERS
	r.HandleFunc("/auth", users.Authenticate).Methods("POST")

	//INCOME
	r.HandleFunc("/incomes", income.GetAllHandler).Methods(http.MethodGet, http.MethodOptions)
	r.HandleFunc("/incomes", income.CreateHandler).Methods(http.MethodPost, http.MethodOptions)
	r.HandleFunc("/incomes/{id}", income.EditHandler).Methods(http.MethodPut, http.MethodOptions)

	//DASHBOARD
	r.HandleFunc("/dashboard/month-spend", dashboard.FindMonthSpend).Methods(http.MethodGet, http.MethodOptions)

	r.Use(common.CorsHandler, common.LoginHandler)

	srv := &http.Server{
		Handler: r,
		Addr:    "localhost:8081",
	}

	db := common.OpenDB()

	db.AutoMigrate(&models.Expense{}, &models.Payment{}, &users.User{}, &models.Income{})
	users.CreateBaseUsers()

	log.Fatal(srv.ListenAndServe())
}

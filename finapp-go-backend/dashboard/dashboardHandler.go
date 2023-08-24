package dashboard

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"
	"time"
)

func FindMonthSpend(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	monthParam := r.URL.Query().Get("month")
	yearParam := r.URL.Query().Get("year")

	var month int
	var year int
	var err error
	var resp []byte

	if monthParam == "" && yearParam == "" {
		month = int(time.Now().Month())
		year = int(time.Now().Year())
	} else {
		month, err = strconv.Atoi(monthParam)
		year, err = strconv.Atoi(yearParam)
	}

	monthSpend := MonthResult(month, year)
	resp, err = json.Marshal(&monthSpend)
	fmt.Println(monthSpend)

	if err != nil {
		http.Error(w, "400", http.StatusBadRequest)
	}
	w.Write(resp)
}

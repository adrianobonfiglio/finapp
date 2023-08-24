package dashboard

import (
	"test/app/income"
	"test/app/payments"
	"time"
)

type MonthSpend struct {
	TotalIncome   float32 `json:"totalIncome"`
	TotalPayments float32 `json:"totalPayments"`
	Month         int     `json:"month"`
	Year          int     `json:"year"`
	Result        float32 `json:"result"`
}

func MonthResult(month, year int) *MonthSpend {
	firstMonthDay := time.Date(year, time.Month(month), 1, 0, 0, 0, 0, time.UTC)
	lastMonthDay := firstMonthDay.AddDate(0, 1, -1)
	totalSpend := payments.GetTotalSpendByMonth(firstMonthDay, lastMonthDay)
	totalIncome := income.GetTotalIncomeByMonth(firstMonthDay, lastMonthDay)

	return &MonthSpend{Month: int(firstMonthDay.Month()),
		Year: firstMonthDay.Year(), TotalIncome: totalIncome,
		TotalPayments: totalSpend, Result: totalIncome - totalSpend}

}

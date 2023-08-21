package common

import (
	"database/sql"
	"log"
	"os"
	"time"

	_ "github.com/mattn/go-sqlite3"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

func GetDB() (db *sql.DB, err error) {
	db, err = sql.Open("sqlite3", "./db.db")
	if err != nil {
		log.Println("erro no DB", err)
	}
	return
}

func OpenDB() gorm.DB {
	db, err := gorm.Open(sqlite.Open("db.db"), &gorm.Config{
		Logger: dbLogger,
	})
	if err != nil {
		panic("failed to connect database")
	}
	return *db
}

var dbLogger = logger.New(
	log.New(os.Stdout, "\r\n", log.LstdFlags), // io writer
	logger.Config{
		SlowThreshold:             time.Second, // Slow SQL threshold
		LogLevel:                  logger.Info, // Log level
		IgnoreRecordNotFoundError: true,        // Ignore ErrRecordNotFound error for logger
		ParameterizedQueries:      true,        // Don't include params in the SQL log
		Colorful:                  false,
	},
)

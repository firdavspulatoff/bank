package main

import (
	"bank/db"
	"bank/webserver"

	lvn "github.com/Lavina-Tech-LLC/lavinagopackage/v2"
)

func main() {
	db.Migrate()

	go webserver.Start()

	lvn.WaitExitSignal()
}

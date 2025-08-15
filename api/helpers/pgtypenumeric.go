package helpers

import (
	"fmt"

	"github.com/jackc/pgx/v5/pgtype"
)

func FloatToPgNumeric(val float64) (pgtype.Numeric, error) {
	var num pgtype.Numeric
	str := fmt.Sprintf("%.2f", val) // keep two decimal places
	if err := num.Scan(str); err != nil {
		return pgtype.Numeric{}, err
	}
	return num, nil
}

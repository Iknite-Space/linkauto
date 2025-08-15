package helpers

import (
	"fmt"
	"time"

	"github.com/jackc/pgx/v5/pgtype"
)

func ParsePgTimeString(value string) (pgtype.Time, error) {
	layouts := []string{
		time.RFC3339, // e.g., 2025-08-15T14:30:00Z
		"15:04:05",   // HH:MM:SS
		"15:04",      // HH:MM
	}

	var parsed time.Time
	var err error

	for _, layout := range layouts {
		parsed, err = time.Parse(layout, value)
		if err == nil {
			return pgtype.Time{
				Microseconds: int64(parsed.Hour())*3600_000_000 +
					int64(parsed.Minute())*60_000_000 +
					int64(parsed.Second())*1_000_000 +
					int64(parsed.Nanosecond()/1000),
				Valid: true,
			}, nil
		}
	}

	return pgtype.Time{}, fmt.Errorf("invalid time format: %s", value)
}

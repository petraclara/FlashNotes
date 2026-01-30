package functions

import(
	"os"
	"time"
	"json"
)

func loadMemory() Memory {
	data, err := os.ReadFile("memory.json")
	if err != nil {
		return Memory{}
	}
	var mem Memory
	json.Unmarshal(data, &mem)
	return mem
}

func saveSession(topic, level string, cards []FlashCard) {
	mem := loadMemory()
	mem.Sessions = append(mem.Sessions, Session{
		Topic:     topic,
		Level:     level,
		Cards:     cards,
		Timestamp: time.Now().Format(time.RFC3339),
	})

	data, _ := json.MarshalIndent(mem, "", "  ")
	os.WriteFile("memory.json", data, 0644)
}

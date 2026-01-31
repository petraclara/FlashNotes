package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"strconv"
	"time"

	"github.com/openai/openai-go/v2"
	"github.com/openai/openai-go/v2/option"
    "github.com/joho/godotenv"
)


  // MODELS

type GenerateRequest struct {
	Topic string `json:"topic"`
	Level string `json:"level"`
	CardCount int    `json:"cardCount"`
}

type CardStats struct {
	Attempts   int  `json:"attempts"`
	Correct    int  `json:"correct"`
	LastResult bool `json:"lastResult"`
}

type AnswerRequest struct {
	Topic   string `json:"topic"`
	CardID  int    `json:"cardId"`
	Correct bool   `json:"correct"`
}


type FlashCard struct {
	ID       int       `json:"id"`
	Question string    `json:"question"`
	Answer   string    `json:"answer"`
	Stats    CardStats `json:"stats"`
}


type GenerateResponse struct {
	Cards []FlashCard `json:"cards"`
}

type ClarifyRequest struct {
	Topic    string `json:"topic"`
	Question string `json:"question"`
}

type SessionStats struct {
	Attempts int `json:"attempts"`
	Correct  int `json:"correct"`
}


type Session struct {
	Topic     string        `json:"topic"`
	Level     string        `json:"level"`
	Cards     []FlashCard   `json:"cards"`
	Stats     SessionStats  `json:"stats"`
	Timestamp string        `json:"timestamp"`
}

type Memory struct {
	Sessions []Session `json:"sessions"`
}

type Request struct {
	Template string `json:"template"`
	Input    string `json:"input"`
}

type Response struct {
	Output string `json:"output"`
}

func enableCORS(w http.ResponseWriter, r *http.Request) bool {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusOK)
		return true
	}
	return false
}


  // PROMPTS

func flashNotesPrompt(topic, level string, count int) string {
	return `
You are Flash Notes, an AI study agent for active recall.

Rules:
- Generate flashcards as question-answer pairs
- Adapt difficulty to the education level
- Questions must test understanding
- Answers must be short and clear
- No explanations unless asked later

Topic: ` + topic + `
Education Level: ` + level + `

Generate exactly ` + strconv.Itoa(count) + ` flashcards.

Return ONLY valid JSON:
[
  { "question": "...", "answer": "..." }
]
`
}

func clarifyPrompt(topic, question string) string {
	return `
You are Flash Notes.

Explain ONLY what is being asked.
Keep it short and clear.

Topic: ` + topic + `
Question: ` + question + `
`
}


  // MEMORY HELPERS

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
	Topic: topic,
	Level: level,
	Cards: cards,
	Stats: SessionStats{
		Attempts: 0,
		Correct:  0,
	},
	Timestamp: time.Now().Format(time.RFC3339),
})


	data, _ := json.MarshalIndent(mem, "", "  ")
	_ = os.WriteFile("memory.json", data, 0644)
}


func main() {
    err := godotenv.Load()
if err != nil {
	log.Println("No .env file found")
}

    fmt.Println("API KEY:", os.Getenv("OPENROUTER_API_KEY"))


	apiKey := os.Getenv("OPENROUTER_API_KEY")
	if apiKey == "" {
		log.Fatal("OPENROUTER_API_KEY is required")
	}

	client := openai.NewClient(
		option.WithBaseURL("https://openrouter.ai/api/v1"),
		option.WithAPIKey(apiKey),
	)

	spaceSystemPrompt := `RULES:
- Output EXACTLY 8 words
- Output ONLY general knowledge
- No explanations
- No punctuation`

	// ---------- /chat ---------- 
	http.HandleFunc("/chat", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.Header().Set("Access-Control-Allow-Origin", "*")
        if enableCORS(w, r) {
		return
	}

		if r.Method != http.MethodPost {
			http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
			return
		}

		var req Request
		json.NewDecoder(r.Body).Decode(&req)

		messages := []openai.ChatCompletionMessageParamUnion{
			openai.SystemMessage(spaceSystemPrompt),
			openai.UserMessage(req.Input),
		}

		params := openai.ChatCompletionNewParams{
			Model:    "meta-llama/llama-3.1-8b-instruct",
			Messages: messages,
		}

		res, err := client.Chat.Completions.New(context.Background(), params)
		if err != nil {
			http.Error(w, err.Error(), 500)
			return
		}

		json.NewEncoder(w).Encode(Response{
			Output: res.Choices[0].Message.Content,
		})
	})

	// ---------- /generate ---------- 
	http.HandleFunc("/generate", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.Header().Set("Access-Control-Allow-Origin", "*")

        if enableCORS(w, r) {
		return
	}

		if r.Method != http.MethodPost {
			http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
			return
		}

		var req GenerateRequest
		json.NewDecoder(r.Body).Decode(&req)

		count := req.CardCount
if count <= 0 {
	count = 4 // safe default
}

prompt := flashNotesPrompt(req.Topic, req.Level, count)


		params := openai.ChatCompletionNewParams{
			Model: "meta-llama/llama-3.1-8b-instruct",
			Messages: []openai.ChatCompletionMessageParamUnion{
				openai.SystemMessage(prompt),
			},
		}

		res, err := client.Chat.Completions.New(context.Background(), params)
		if err != nil {
			http.Error(w, err.Error(), 500)
			return
		}

		var rawCards []struct {
	Question string `json:"question"`
	Answer   string `json:"answer"`
}

if err := json.Unmarshal([]byte(res.Choices[0].Message.Content), &rawCards); err != nil {
	http.Error(w, "Invalid model output", 500)
	return
}

cards := make([]FlashCard, len(rawCards))
for i, c := range rawCards {
	cards[i] = FlashCard{
		ID:       i + 1,
		Question: c.Question,
		Answer:   c.Answer,
		Stats: CardStats{
			Attempts:   0,
			Correct:    0,
			LastResult: false,
		},
	}
}

		saveSession(req.Topic, req.Level, cards)
		json.NewEncoder(w).Encode(GenerateResponse{Cards: cards})
	})

	// ---------- /clarify ----------
	http.HandleFunc("/clarify", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.Header().Set("Access-Control-Allow-Origin", "*")
        if enableCORS(w, r) {
		return
	}

		if r.Method != http.MethodPost {
			http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
			return
		}

		var req ClarifyRequest
		json.NewDecoder(r.Body).Decode(&req)

		params := openai.ChatCompletionNewParams{
			Model: "meta-llama/llama-3.1-8b-instruct",
			Messages: []openai.ChatCompletionMessageParamUnion{
				openai.SystemMessage(clarifyPrompt(req.Topic, req.Question)),
			},
		}

		res, err := client.Chat.Completions.New(context.Background(), params)
		if err != nil {// ✅ REQUIRED
			http.Error(w, err.Error(), 500)
			return
		}

		json.NewEncoder(w).Encode(map[string]string{
			"clarification": res.Choices[0].Message.Content,
		})
	})

	http.HandleFunc("/answer", func(w http.ResponseWriter, r *http.Request) {
	if enableCORS(w, r) {
		return
	}

	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req AnswerRequest
	json.NewDecoder(r.Body).Decode(&req)

	mem := loadMemory()

	for si := range mem.Sessions {
		if mem.Sessions[si].Topic == req.Topic {
			mem.Sessions[si].Stats.Attempts++
			if req.Correct {
				mem.Sessions[si].Stats.Correct++
			}

			for ci := range mem.Sessions[si].Cards {
				if mem.Sessions[si].Cards[ci].ID == req.CardID {
					card := &mem.Sessions[si].Cards[ci]
					card.Stats.Attempts++
					if req.Correct {
						card.Stats.Correct++
					}
					card.Stats.LastResult = req.Correct
					break
				}
			}
			break
		}
	}

	data, _ := json.MarshalIndent(mem, "", "  ")
	_ = os.WriteFile("memory.json", data, 0644)

	w.WriteHeader(http.StatusOK)
})


	// ---------- /history ----------
	http.HandleFunc("/history", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.Header().Set("Access-Control-Allow-Origin", "*")
        if enableCORS(w, r) {
		return
	}

		if r.Method != http.MethodGet {
			http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
			return
		}

		json.NewEncoder(w).Encode(loadMemory())
	})

	fmt.Println("Server running on :8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}

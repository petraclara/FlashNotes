package main

	import (
    "log"
    "context"
    "encoding/json"
    "net/http"
    "os"
    // "bufio"
    "fmt"
    "github.com/openai/openai-go/v2"
    "github.com/openai/openai-go/v2/option"
		)

type Request struct {
    Template string `json:"template"`
    Input string `json:"input"`
}

type Response struct {
    Output string `json:"output"`
}

func main() {
    // scanner := bufio.NewScanner(os.Stdin)
	apikey := os.Getenv("OPENROUTER_API_KEY")
	if apikey == ""{
	log.Fatal("api key is required")
	}
	url := "https://openrouter.ai/api/v1"

client := openai.NewClient(
    option.WithBaseURL(url),
    option.WithAPIKey(apikey),
    )
    
spaceSystemPrompt := `
RULES (must follow exactly):
- Output MUST be valid JSON
- Output MUST contain a key called "questions"
- "questions" MUST be an array
- Each item MUST be an object with keys "question", "answer", "details"
- "question" MUST be EXACTLY 8 words
- "answer" MUST be a concise correct answer to the question
- "details" MUST be an object containing:
    - "examples": an array of short real-world examples (if any)
    - "difficulty": one of Beginner, Intermediate, Advanced
    - "categories": an array of relevant categories
    - "source": a link to the resource on the internet
    - "lastReviewed": a string for last reviewed date
- Use ONLY general knowledge
- No punctuation inside the question text
- No explanations
- No extra keys
- No extra text outside JSON

EXAMPLE OUTPUT:
{
  "questions": [
    {
      "question": "What causes tides on Earth oceans primarily",
      "answer": "The gravitational pull of the Moon and Sun",
      "details": {
        "examples": [
          "High tide occurs when the Moon is overhead",
          "Tides affect fishing and coastal activities"
        ],
        "difficulty": "Intermediate",
        "categories": ["Geography", "Astronomy", "Physics"],
        "source": "https://en.wikipedia.org/wiki/Newton%27s_law_of_universal_gravitation",
        "lastReviewed": "2026-01-30"
      }
    }
  ]
}
`


    http.HandleFunc("/chat", func(w http.ResponseWriter, r *http.Request) {
       
		w.Header().Set("Content-Type", "application/json")
w.Header().Set("Access-Control-Allow-Origin", "*")
w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

if r.Method == http.MethodOptions {
    w.WriteHeader(http.StatusOK)
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
        model := "meta-llama/llama-3.1-8b-instruct"
        fmt.Println("whats your question?")
        // scanner.Scan()
        // name := scanner.Text()
        // messages = append(messages, openai.UserMessage(name))

        params := openai.ChatCompletionNewParams {
            Model : model,
            Messages : messages,
        }

        res,err := client.Chat.Completions.New(context.Background(), params)
        
        if err != nil {
            http.Error(w, err.Error(), 500)
        }

        json.NewEncoder(w).Encode(Response{
            Output: res.Choices[0].Message.Content,
        })
    })

    log.Println("Server running on :8080")
    log.Fatal(http.ListenAndServe(":8080", nil))
}




package main

	import ("log"
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
    
        spaceSystemPrompt := `RULES (must follow):
- Output EXACTLY 8 words
- Output ONLY general knowledge
- No explanations
- No punctuation
- No extra text`

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

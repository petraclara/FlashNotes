# 🤖 Terminal Chat Buddy (Powered by OpenRouter + Go)

Welcome to your **tiny but mighty terminal chatbot**!  
This Go project lets you ask questions directly from your command line and get answers from an LLM via **OpenRouter** using the **OpenAI Go SDK**.

No browser.  
No UI.  
Just vibes, Go, and AI. 🚀

---

## ✨ What This Does

- 📟 Prompts you for a question in the terminal  
- 🧠 Sends it to an LLM (DeepSeek R1 — free tier!)
- 💬 Prints the AI’s response back to you
- ⚡ Simple, fast, and hackable

Think of it as **ChatGPT, but living in your terminal**.

---

## 🧩 How It Works

1. You type a question
2. The program sends it to OpenRouter’s API
3. The model thinks really hard (hopefully)
4. The answer appears in your terminal

All in about ~50 lines of Go. Clean and simple.

---

## 🛠 Requirements

- Go 1.20+
- An **OpenRouter API key**
- Internet connection 🌍

---

## 🔑 Setup

### 1. Clone the repo
```bash
git clone https://github.com/Geremi57/terminal-chat-buddy
cd terminal-chat-buddy


2. Install dependencies
go mod tidy

3. Set your API key

⚠️ Do NOT hardcode API keys in real projects
```

Recommended approach:

export OPENROUTER_API_KEY="sk-or-v1-..."


Update the code:

apikey := os.Getenv("OPENROUTER_API_KEY")

▶️ Run It
go run main.go


You’ll see:

whats your question?


Ask anything:

Why is Go so fast?


✨ Instant AI answer.

🤖 Model Used
deepseek/deepseek-r1-0528:free


Free, powerful, and easy to swap.
Change models by editing this line:

model := "deepseek/deepseek-r1-0528:free"

🧪 Example Output
whats your question?
Explain goroutines like I’m five

Goroutines are like tiny helpers that can do work at the same time...

🧠 Fun Ideas to Extend This

💬 Multi-turn chat memory

🌈 Terminal colors & formatting

🔁 Stream responses token-by-token

🧰 Tool / function calling

📦 Turn it into a real CLI tool

⚠️ Disclaimer

This is a learning/demo project.
Don’t commit secrets.
Don’t trust AI blindly.
Do have fun.

❤️ Final Words

If you like Go, terminals, and AI APIs —
you’re going to have a great time here.

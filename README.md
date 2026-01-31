# FlashNotes, a tool for everyone

```markdown
# FlashNotes 🎓

> AI-Powered Smart Flashcards for Modern Students

FlashNotes is an intelligent flashcard application that helps students study and prepare for exams using AI-generated content. The application leverages modern web technologies with a Go backend and React frontend to create a seamless study experience.

## 🚀 Features

- **AI-Generated Flashcards**: Automatically create study cards using OpenRouter AI
- **Smart Study Sessions**: Interactive card flipping with smooth animations
- **Manual Card Creation**: Add custom flashcards for specific topics
- **Responsive Design**: Study on any device - desktop, tablet, or mobile
- **Persistent Storage**: Save and manage your flashcard decks
- **Study Progress Tracking**: Monitor your learning journey

## 🏗️ Architecture

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   React Frontend │────▶│   Go Backend    │────▶│   OpenRouter AI  │
│   (Vite + React) │     │   (Gin/Fiber)   │     │   (LLM Gateway)  │
└─────────────────┘     └─────────────────┘     └─────────────────┘
         │                        │                        │
         │                        │                        │
         ▼                        ▼                        ▼
   User Interface          Business Logic           AI Generation
   Animations             Data Processing          Content Creation
   State Management       API Orchestration        Prompt Engineering
```

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI Library
- **Vite** - Build tool & Dev server
- **CSS3** - Styling with modern features
- **React Hooks** - State management

### Backend
- **Go 1.21+** - High-performance backend
- **Gin/Fiber** - Web framework
- **OpenRouter API** - AI model gateway
- **SQLite/PostgreSQL** - Database (optional)

### DevOps
- **Docker** - Containerization
- **GitHub Actions** - CI/CD
- **Environment Variables** - Secure configuration

## 📦 Installation

### Prerequisites
- Go 1.21+ installed
- Node.js 18+ and npm/yarn installed
- OpenRouter API key (get from [openrouter.ai](https://openrouter.ai))

### Backend Setup
```bash
# Clone the repository
git clone https://github.com/yourusername/flashnotes.git
cd flashnotes/backend

# Install dependencies
go mod download

# Set up environment variables
cp .env.example .env
# Edit .env with your OpenRouter API key

# Run the backend server
go run main.go
```

### Frontend Setup
```bash
cd frontend

# Install dependencies
npm install  # or yarn install

# Start development server
npm run dev  # or yarn dev
```

## 🔧 Configuration

### Environment Variables

**Backend (.env):**
```env
OPENROUTER_API_KEY=your_api_key_here
PORT=8080
ENVIRONMENT=development
CORS_ORIGIN=http://localhost:5173
```

**Frontend (.env):**
```env
VITE_API_URL=http://localhost:8080/api
VITE_APP_NAME=FlashNotes
```

## 🚀 Usage

1. **Start the application:**
   ```bash
   # Terminal 1 - Start backend
   cd backend && go run main.go
   
   # Terminal 2 - Start frontend
   cd frontend && npm run dev
   ```

2. **Access the application:**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:8080

3. **Create your first flashcards:**
   - Click "Generate with AI" to create AI-powered cards
   - Use "Add Card" for manual creation
   - Click cards to flip and reveal answers
   - Use navigation buttons to move through your deck

## 📚 API Endpoints

### Flashcard Management
- `GET /api/flashcards` - Get all flashcards
- `POST /api/flashcards` - Create new flashcard
- `GET /api/flashcards/:id` - Get specific flashcard
- `PUT /api/flashcards/:id` - Update flashcard
- `DELETE /api/flashcards/:id` - Delete flashcard

### AI Generation
- `POST /api/ai/generate` - Generate flashcards from topic
  ```json
  {
    "topic": "Machine Learning",
    "count": 5,
    "difficulty": "beginner"
  }
  ```

### Study Sessions
- `POST /api/study/session` - Start study session
- `POST /api/study/progress` - Update study progress

## 🤖 AI Integration

FlashNotes uses OpenRouter to access various AI models for content generation:

```go
// Example prompt for AI generation
prompt := `Generate ${count} flashcards about ${topic} at ${difficulty} level.
Format: Q: [question] | A: [answer]
Make questions conceptual and answers explanatory.`
```

## 📁 Project Structure

```
flashnotes/
├── backend/
│   ├── cmd/
│   │   └── server/
│   │       └── main.go
│   ├── internal/
│   │   ├── handlers/
│   │   ├── models/
│   │   ├── services/
│   │   └── ai/
│   ├── pkg/
│   │   ├── config/
│   │   └── database/
│   ├── go.mod
│   └── go.sum
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
├── docker/
│   ├── Dockerfile.backend
│   └── Dockerfile.frontend
├── docker-compose.yml
├── README.md
└── .gitignore
```

## 🐳 Docker Deployment

```bash
# Build and run with Docker Compose
docker-compose up --build

# Or build individually
docker build -f docker/Dockerfile.backend -t flashnotes-backend .
docker build -f docker/Dockerfile.frontend -t flashnotes-frontend .
```

## 🧪 Testing

```bash
# Backend tests
cd backend
go test ./...

# Frontend tests
cd frontend
npm test

# Run all tests
make test
```

## 📈 Performance

- **Backend**: Handles 1000+ concurrent users with Go's goroutines
- **Frontend**: <100ms first contentful paint with Vite
- **AI Calls**: Cached responses to reduce API costs and latency
- **Database**: Optimized queries for flashcard retrieval

## 🔒 Security

- API key encryption for OpenRouter
- CORS configuration for frontend-backend communication
- Input validation and sanitization
- Rate limiting on AI generation endpoints
- Environment-based configuration

## 🚧 Development Roadmap

- [x] Basic flashcard CRUD
- [x] AI integration
- [ ] Spaced repetition algorithm
- [ ] Multiple card decks
- [ ] Progress analytics
- [ ] Mobile app (React Native)
- [ ] Collaborative studying
- [ ] Export to PDF/Anki

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- OpenRouter for AI model access
- Vite team for excellent build tooling
- Go community for robust backend tools
- All contributors and testers

## 📞 Support

For support, email support@flashnotes.dev or open an issue in the GitHub repository.

---

Built with ❤️ for students everywhere by Team Purple Haze
```
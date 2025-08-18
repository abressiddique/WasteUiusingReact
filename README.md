
# Install dependencies first (only needed on Colab/Notebook)
# !pip install langchain openai faiss-cpu langchain-community langchain-huggingface

from langchain_openai import ChatOpenAI
from langchain.prompts import ChatPromptTemplate
from langchain.chains import LLMChain, SequentialChain
from langchain.memory import ConversationBufferMemory
from langchain.agents import initialize_agent, Tool
from langchain_community.utilities import WikipediaAPIWrapper
from langchain_community.vectorstores import FAISS
from langchain_community.embeddings import HuggingFaceEmbeddings
import os

# ========== 1. LLM ==========
llm = ChatOpenAI(model="gpt-3.5-turbo", temperature=0.7)

# ========== 2. Prompt Templates ==========
research_prompt = ChatPromptTemplate.from_template(
    "Find the latest information about {topic} from Wikipedia and summarize it in 5 bullet points."
)

email_prompt = ChatPromptTemplate.from_template(
    "Write a professional email to {recipient} summarizing the following research:\n{research_summary}"
)

# ========== 3. Chains ==========
research_chain = LLMChain(llm=llm, prompt=research_prompt, output_key="research_summary")
email_chain = LLMChain(llm=llm, prompt=email_prompt, output_key="email")

# SequentialChain links them: research -> email
pipeline = SequentialChain(
    chains=[research_chain, email_chain],
    input_variables=["topic", "recipient"],
    output_variables=["research_summary", "email"]
)

# ========== 4. Memory ==========
memory = ConversationBufferMemory(memory_key="chat_history", return_messages=True)

# ========== 5. Tools for Agents ==========
wiki = WikipediaAPIWrapper()
search_tool = Tool(
    name="Wikipedia Search",
    func=wiki.run,
    description="Useful for getting info about a topic from Wikipedia"
)

# ========== 6. Agent ==========
agent = initialize_agent(
    tools=[search_tool],
    llm=llm,
    agent="chat-conversational-react-description",
    memory=memory,
    verbose=True
)

# ========== 7. Vector Store (Knowledge Base) ==========
embeddings = HuggingFaceEmbeddings()
docs = ["LangChain is a framework for building LLM-powered apps.",
        "LangGraph extends LangChain for stateful multi-agent workflows.",
        "Vector databases help with semantic search and RAG."]

vectorstore = FAISS.from_texts(docs, embeddings)

# ========== 8. Using Everything Together ==========
print("----- Step 1: Sequential Chain (Research + Email) -----")
output = pipeline.run({"topic": "LangChain", "recipient": "CTO of Manal"})
print(output)

print("\n----- Step 2: Agent Calling Wikipedia Tool -----")
response = agent.run("Tell me something about LangGraph")
print(response)

print("\n----- Step 3: Vectorstore Semantic Search -----")
query = "What is LangGraph?"
docs = vectorstore.similarity_search(query, k=2)
for d in docs:
    print(d.page_content)

print("\n----- Step 4: Memory in Action -----")
agent.run("Who did I just ask about?")

# ♻️ Wewantwaste Skip Selector Redesign (Frontend React Challenge)

Dear REMWaste HR and Resh C.,

Thank you very much for this opportunity to demonstrate my front-end development skills through this React coding challenge.

This project is a **complete redesign** of the "Choose Your Skip Size" page from [wewantwaste.co.uk](https://wewantwaste.co.uk), rebuilt with a focus on clean, maintainable React code, responsive design, and improved UI/UX — while preserving the original functionality.

> 🔗 [Live Demo (CodeSandbox)](https://codesandbox.io/p/github/abressiddique/WasteUiusingReact)

> 🔗 [GitHub Repository](https://github.com/abressiddique/WasteUiusingReact)

---

## 📸 Screenshots

### 🖥️ Desktop View

![Desktop View](https://github.com/user-attachments/assets/5fb0a55a-6ae9-4224-8343-f762ff864de6)

### 📱 Mobile View

![Mobile View](https://github.com/user-attachments/assets/77a08b6d-5c04-4bed-b969-438716ed3db7)



---

## 🎯 Objective

The goal was to redesign the skip size selection page with a fresh look and feel, using the live API for skip options:

`https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft`

---

## 🚀 Features

- Fully redesigned and modernized UI
- Dynamic skip data fetched from the provided API
- Mobile-first, fully responsive layout for desktop and mobile browsers
- Accessible design with semantic HTML and clear focus states
- Clean and modular React components for maintainability
- Smooth user interaction with visual feedback on skip selection

---

## ⚙️ Technologies Used

| Category      | Technologies                             |
|---------------|----------------------------------------|
| Frontend      | React.js                              |
| Styling       | Tailwind CSS / Custom CSS              |
| Data Fetching | Fetch API                             |
| Deployment    | CodeSandbox / GitHub Pages             |

---

## 🛠️ How to Run Locally

```bash
git clone https://github.com/abressiddique/WasteUiusingReact.git
cd WasteUiusingReact
npm install
npm start
````

Or use the live CodeSandbox link above to test immediately.

---

## 📱 Responsive Design Approach

* Mobile-first design using flexible layouts
* Media queries for tablet and desktop breakpoints
* Fluid components adapting to screen size changes
* Clear visual feedback for interactive elements

---

## 🙏 A Note of Gratitude

I sincerely appreciate the chance to complete this task and share my approach to frontend development with REMWaste. This challenge was a great opportunity to combine API integration, responsive design, and React best practices.

I look forward to the possibility of discussing my work further during the next stages of the interview process.

---

## 📬 Contact Information

**Abres Siddique**
Email: [abressiddique@gmail.com](mailto:abressiddique@gmail.com)
Portfolio: [https://abressiddique.github.io/Abress-Portfolio/](https://abressiddique.github.io/Abress-Portfolio/)
GitHub: [https://github.com/abressiddique](https://github.com/abressiddique)

---

Thank you again for your time and consideration.

Best regards,
Abres Siddique

```

https://codesandbox.io/p/devbox/nifty-wiles-s6rjw5?workspaceId=ws_7CD2T753Dba926Gsx3ARW8

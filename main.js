// --- Three.js 3D Hero Background ---
// --- Chatbot Floating Icon and Window Logic ---

// Get DOM elements
const chatbotIcon = document.getElementById("chatbot-icon");
const chatbotWindow = document.getElementById("chatbot-window");
const closeBtn = document.getElementById("close-btn");
const chatbotBody = chatbotWindow.querySelector(".chatbot-body");

// Show chatbot window when icon is clicked
chatbotIcon.addEventListener("click", () => {
  chatbotWindow.classList.add("active");
  chatbotBody.style.display = "flex";
});

// Close chatbot window
closeBtn.addEventListener("click", () => {
  chatbotWindow.classList.remove("active");
  chatbotBody.style.display = "flex";
});

// --- Simple Chatbot Logic ---
const simpleChatForm = document.getElementById("chatForm");
const userInput = document.getElementById("userInput");
const chatWindowDiv = document.getElementById("chatWindow");

// Conversation history for the chatbot
let messages = [
  {
    role: "system",
    content: `Serve as Ali, the guide for the Afghanistan Association Club at Georgetown University, assisting international students in navigating Georgetown University life, addressing common challenges, and providing support for specific questions. Review and synthesize information from the club’s official website blogs to ensure familiarity with relevant topics and events. When answering questions, take the following systematic approach:

- Begin by identifying and reasoning through the main concern or challenge the student is facing.
- Incorporate information from the club’s blogs, drawing on relevant articles and insights to personalize and enrich your guidance.
- Suggest actionable solutions, resources, or strategies specifically tailored for international students at Georgetown.
- If a question concerns future events, use details from the club’s website or prior announcements to provide accurate and timely information.
- Maintain a welcoming, informative, and student-centered tone throughout.

Output Format:
- Respond in paragraph form, 3-8 sentences per answer, directly addressing the student’s query. 
- For event-specific questions, include: event name, date, location (if known), a brief description, and registration or participation details.
- When referencing website blog content, cite the article title and summarize the key point supporting your response.

Example 1  
Input: "Ali, I’m struggling to make friends as an international student. What should I do?"  
Output:  
Reasoning: Many international students feel isolated due to cultural differences and unfamiliar environments. Drawing on our blog "Finding Community at Georgetown," building relationships starts by participating in campus organizations like the Afghanistan Association Club, attending social events, and joining student interest groups.  
Response: I understand making friends in a new country can feel daunting, but you’re not alone. According to our blog "Finding Community at Georgetown," joining clubs such as ours, attending mixers, and participating in Georgetown-sponsored activities are excellent ways to connect. I suggest coming to our next event, where you’ll meet other international students. Also, don’t hesitate to reach out to your professors and classmates—they’re usually very welcoming!

Example 2  
Input: "What events does the Afghanistan Association Club have planned this month?"  
Output:  
Reasoning: Regular club events foster community and engagement among students. Referring to the recent event calendar on our blog, it appears we have a cultural night scheduled, plus a study group session.
Response: This month, we have two upcoming events. First, our "Afghan Culture Night" on March 14 at the ICC Galleria, which will feature food, music, and traditional performances—registration details are on our website. We’re also organizing a study group session for midterms on March 21 in Lauinger Library (Room 312). We hope you’ll join us!

Important Reminders:
- Always start with reasoning about the challenge, referencing blog content when appropriate, before giving a direct answer.
- Always present your guidance or conclusions last.
- Use information from club blogs and official event postings wherever possible.
- Maintain a friendly and supportive tone. 

(Task objective reminder: Serve as ‘Ali’, guide for Afghanistan Association Club at Georgetown University. Help international students navigate the university, tackle challenges, and answer questions about club events using details from the club’s blogs and resources.)`,
  },
];

// Helper to add a message to the chat window
function addMessage(text, sender) {
  const msgDiv = document.createElement("div");
  msgDiv.className = "msg " + sender;

  // Convert markdown-style links to HTML clickable links for beginners
  // Example: ([prnewswire.com](https://...))
  const linkRegex = /\(\[([^\]]+)\]\((https?:\/\/[^\)]+)\)\)/g;
  let htmlText = text.replace(linkRegex, (match, label, url) => {
    return `<a href="${url}" target="_blank" rel="noopener">${label}</a>`;
  });

  // Basic markdown formatting for readability
  // Bold: **text**
  htmlText = htmlText.replace(/\*\*([^\*]+)\*\*/g, '<strong>$1</strong>');
  // Italic: *text*
  htmlText = htmlText.replace(/\*([^\*]+)\*/g, '<em>$1</em>');
  // Simple line breaks
  htmlText = htmlText.replace(/\n/g, '<br>');

  // Set HTML so links and formatting are visible
  msgDiv.innerHTML = htmlText;
  chatWindowDiv.appendChild(msgDiv);
  chatWindowDiv.scrollTop = chatWindowDiv.scrollHeight;
}

// Handle form submit
simpleChatForm.addEventListener("submit", async function (e) {
  e.preventDefault();
  const message = userInput.value.trim();
  if (!message) return;
  addMessage(message, "user");
  userInput.value = "";

  // Add user message to conversation history
  messages.push({ role: "user", content: message });

  // Fetch reply from Cloudflare Worker API
  try {
    // Show a loading message while waiting for the API
    addMessage("...", "ai");
    const response = await fetch("https://loreal-chatbot.za209.workers.dev/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messages }),
    });
    // Remove the loading message
    const loadingMsg = chatWindowDiv.querySelector(".msg.ai:last-child");
    if (loadingMsg && loadingMsg.textContent === "...") {
      chatWindowDiv.removeChild(loadingMsg);
    }
    if (!response.ok) {
      addMessage("Sorry, there was a problem. Please try again later.", "ai");
      return;
    }
    const data = await response.json();
    // Try to get the reply from OpenAI's response structure (choices[0].message.content)
    let replyText = "";
    if (
      data.choices &&
      data.choices[0] &&
      data.choices[0].message &&
      data.choices[0].message.content
    ) {
      replyText = data.choices[0].message.content;
    } else if (data.reply) {
      replyText = data.reply;
    } else {
      replyText = "Sorry, I didn't understand that.";
    }
    addMessage(replyText, "ai");
    // Add assistant reply to conversation history
    messages.push({ role: "assistant", content: replyText });
  } catch (error) {
    // Remove the loading message if error
    const loadingMsg = chatWindowDiv.querySelector(".msg.ai:last-child");
    if (loadingMsg && loadingMsg.textContent === "...") {
      chatWindowDiv.removeChild(loadingMsg);
    }
    addMessage("Sorry, there was a problem connecting to the chatbot.", "ai");
  }
});


window.addEventListener('DOMContentLoaded', () => {
  // Remove the 3D sphere from the hero background
  // If you want to keep Three.js for other effects, leave the setup, but don't add any geometry

  const container = document.getElementById('three-hero-bg');
  if (!container) return;

  // Scene setup
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    container.offsetWidth / container.offsetHeight,
    0.1,
    1000
  );
  camera.position.z = 3;

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setClearColor(0x000000, 0); // transparent
  renderer.setSize(container.offsetWidth, container.offsetHeight);
  container.appendChild(renderer.domElement);

  // Responsive resize
  window.addEventListener('resize', () => {
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    camera.aspect = container.offsetWidth / container.offsetHeight;
    camera.updateProjectionMatrix();
  });

  // No geometry added, so nothing will be rendered except a transparent canvas

  // Animation loop (optional, can be removed if not needed)
  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }
  animate();
});

// Hamburger menu toggle
document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.getElementById('menu-toggle');
  const navButtons = document.querySelector('.nav-buttons');
  if (menuToggle && navButtons) {
    menuToggle.addEventListener('click', function() {
      navButtons.classList.toggle('active');
    });
    // Optional: close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!menuToggle.contains(e.target) && !navButtons.contains(e.target)) {
        navButtons.classList.remove('active');
      }
    });
  }
});

window.addEventListener('scroll', function() {
  const navButtons = document.querySelector('.nav-buttons');
  if (window.scrollY > 50) {
    navButtons.classList.add('scrolled');
  } else {
    navButtons.classList.remove('scrolled');
  }
});

// Chatbot functionality
document.getElementById('chatbot-icon').onclick = function() {
  document.getElementById('chatbot-window').classList.add('active');
};
document.getElementById('close-btn').onclick = function() {
  document.getElementById('chatbot-window').classList.remove('active');
};



document.addEventListener("DOMContentLoaded", () => {
  const mobileMenuBtn = document.getElementById("mobile-menu");
  const mainNav = document.getElementById("main-nav");
  const headerLinks = document.querySelectorAll("header nav a");
  const logo = document.querySelector(".logo");
  const startBtn = document.getElementById("start-practice-btn");
  const quizSection = document.getElementById("quiz");
  const quizWrapper = document.getElementById("quiz-wrapper");
  const sectionsToHide = document.querySelectorAll(".hero, .features, .stats, .contact, .about");
  const header = document.querySelector("header");
  const footer = document.querySelector("footer");
  const homeSection = document.getElementById("home");
//asitti eeggannon gaaffii kee barreessi
  const questions = [
    {
      question: "Which sentence is grammatically correct?",
      options: ["He go to school every day.", "He goes to school every day.", "He going to school every day.", "He gone to school every day."],
      answer: 1
    },
    {
      question: "Choose the synonym of 'begin'.",
      options: ["Start", "End", "Close", "Stop"],
      answer: 0
    },
    {
      question: "Identify the correct preposition: 'She is good ___ English.'",
      options: ["in", "on", "at", "for"],
      answer: 2
    },
    {
      question: "What is the meaning of the word 'generous'?",
      options: ["Unkind and rude", "Willing to give and share", "Very serious", "Lazy or careless"],
      answer: 1
    },
    {
      question: "Read and answer: 'The sun rises in the east.' — What type of sentence is this?",
      options: ["Interrogative", "Imperative", "Declarative", "Exclamatory"],
      answer: 2
    }
  ];

  quizSection.style.display = "none";

  mobileMenuBtn.addEventListener("click", () => {
    mainNav.classList.toggle("active");
  });

  headerLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        sectionsToHide.forEach(s => (s.style.display = "block"));
        quizSection.style.display = "none";
        targetSection.scrollIntoView({ behavior: "smooth" });
        if (mainNav.classList.contains("active")) mainNav.classList.remove("active");
      }
    });
  });

  logo.addEventListener("click", () => {
    sectionsToHide.forEach(s => (s.style.display = "block"));
    quizSection.style.display = "none";
    homeSection.scrollIntoView({ behavior: "smooth" });
    if (mainNav.classList.contains("active")) mainNav.classList.remove("active");
  });

  startBtn.addEventListener("click", () => {
    sectionsToHide.forEach(s => (s.style.display = "none"));
    header.style.display = "flex";
    footer.style.display = "block";
    quizSection.style.display = "block";
    quizSection.scrollIntoView({ behavior: "smooth" });
    startQuiz(quizWrapper);
  });

  function startQuiz(container) {
    let index = 0;
    let score = 0;
    const selectedAnswers = Array(questions.length).fill(null);

    const renderQuestion = () => {
      const q = questions[index];
      const selected = selectedAnswers[index];
      const progressPercent = (index / questions.length) * 100;

      container.innerHTML = `
        <div class="quiz-container fade-in">
          <div class="quiz-top">
            <button class="prev-btn nav-btn" ${index === 0 ? "disabled" : ""}>
              <i class="fas fa-arrow-left"></i> Previous
            </button>
            <span class="progress">Question ${index + 1} of ${questions.length}</span>
          </div>
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${progressPercent}%"></div>
          </div>
          <div class="question-header">English Exam Practice</div>
          <div class="question-text">${q.question}</div>
          <div class="options-grid">
            ${q.options.map((opt, i) => `
              <button class="option-btn-modern ${selected === i ? "selected" : ""}" data-index="${i}">
                <span class="option-letter">${String.fromCharCode(65 + i)}</span>
                <span class="option-text">${opt}</span>
              </button>
            `).join("")}
          </div>
          <div class="quiz-controls">
            <button class="prev-btn nav-btn" ${index === 0 ? "disabled" : ""}>
              <i class="fas fa-arrow-left"></i> Previous
            </button>
            <button class="submit-btn" ${selected === null ? "disabled" : ""}>
              ${index < questions.length - 1 ? 'Next Question <i class="fas fa-arrow-right"></i>' : 'Submit Exam <i class="fas fa-check"></i>'}
            </button>
          </div>
        </div>
      `;

      const optionBtns = container.querySelectorAll(".option-btn-modern");
      optionBtns.forEach(btn => {
        btn.addEventListener("click", () => {
          optionBtns.forEach(b => b.classList.remove("selected"));
          btn.classList.add("selected");
          selectedAnswers[index] = parseInt(btn.dataset.index);
          container.querySelector(".submit-btn").disabled = false;
        });
      });

      container.querySelector(".submit-btn").addEventListener("click", () => {
        if (selectedAnswers[index] === questions[index].answer) score++;
        if (index < questions.length - 1) {
          index++;
          renderQuestion();
        } else {
          showResult();
        }
      });

      const prevBtns = container.querySelectorAll(".prev-btn");
      prevBtns.forEach(prevBtn => {
        prevBtn.addEventListener("click", () => {
          if (index > 0) {
            index--;
            renderQuestion();
          }
        });
      });
    };

    const showResult = () => {
      const percentage = (score / questions.length) * 100;
      let message, icon;

      if (percentage >= 80) {
        message = "Excellent work! 💪 You're exam ready.";
        icon = "fas fa-trophy";
      } else if (percentage >= 60) {
        message = "Good job! You're on the right track.";
        icon = "fas fa-star";
      } else {
        message = "Keep practicing! 🌱 Every try makes you better.";
        icon = "fas fa-seedling";
      }

      container.innerHTML = `
        <div class="result-card fade-in">
          <div class="result-icon">
            <i class="${icon}"></i>
          </div>
          <h2>🎯 Your Final Score: ${score} / ${questions.length}</h2>
          <p>${message}</p>
          <button class="restart-btn" id="restart-btn">
            <i class="fas fa-redo"></i> Restart Practice
          </button>
        </div>
      `;

      document.getElementById("restart-btn").addEventListener("click", () => {
        sectionsToHide.forEach(s => (s.style.display = "block"));
        startQuiz(container);
      });
    };

    renderQuestion();
  }

  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Thank you for your message! We'll get back to you soon.");
      contactForm.reset();
    });
  }
});


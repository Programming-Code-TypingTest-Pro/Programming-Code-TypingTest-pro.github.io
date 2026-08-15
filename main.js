// ==========================================
// BACKGROUND ANIMATION (Common for all pages)
// ==========================================
const canvas = document.getElementById("hackerBg");
if (canvas) {
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const codeLines = [
      "function hackSystem() {",
      "  access_granted = true;",
      "  bypassFirewall();",
      "  injectPayload();",
      "}",
      "console.log('Access Granted');",
      "while(true){ execute(); }",
      "if(user === admin){ unlock(); }"
    ];
    let lines = [];
    for (let i = 0; i < 25; i++) {
      lines.push({
        text: codeLines[Math.floor(Math.random() * codeLines.length)],
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speed: 1 + Math.random() * 2,
        opacity: Math.random()
      });
    }

    function getColorByTime() {
      let time = Math.floor(Date.now() / 5000) % 5;
      switch (time) {
        case 0:
          const colors = ["red", "lime", "blue", "white"];
          return colors[Math.floor(Math.random() * colors.length)];
        case 1: return "lime";
        case 2: return "red";
        case 3: return "blue";
        case 4: return "white";
      }
    }

    function draw() {
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = "16px monospace";
      lines.forEach(line => {
        let color = getColorByTime();
        ctx.shadowColor = color;
        ctx.shadowBlur = 10;
        let opacity = 0.3 + Math.random() * 0.7;
        ctx.fillStyle = color;
        ctx.globalAlpha = opacity;
        ctx.fillText(line.text, line.x, line.y);
        ctx.globalAlpha = 1;
        line.x += line.speed;
        if (line.x > canvas.width) {
          line.x = -200;
          line.y = Math.random() * canvas.height;
        }
        line.opacity = Math.random();
      });
      requestAnimationFrame(draw);
    }
    draw();
}

// ==========================================
// GLOBAL VARIABLES & UTILS
// ==========================================
const languages = ["English","Python","Java","JavaS_t","TypeS_t","C++","C#","R","Go","PHP","Dart","Rust","Swift","Kotlin","HTML","CSS","Node.js","SQL","Bash","PowerShell","Ruby","Scal","Matlab","Julia","Lua","Perl","VB.NET","F#","Haskell","Elixir","Erlang","COBOL","Fortran","Groovy","Clojure","OCaml","Prolog","Ada","Nim","Zig","Solidity","Assembly","Objective-C"];

let selectedProjects = [];
let selectedCode = "";
let time = 120;
let timerInterval;
let currentLang = "";
let currentProject = "";
let timerEnabled = localStorage.getItem("timerEnabled") !== "false";
let keyboardEnabled = localStorage.getItem("keyboardEnabled") !== "false";

// ==========================================
// PAGE INITIALIZATION LOGIC
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    
    // 1. SABSE PEHLE THEME CHECK KAREIN (Har page ke liye lagoo hoga)
    const isLightMode = localStorage.getItem("isLightMode") === "true";
    
    if (isLightMode) {
        document.body.classList.add("light-mode");
        document.body.classList.add("no-bg");
    } else {
        document.body.classList.remove("light-mode");
        document.body.classList.remove("no-bg");
    }

    // Update Dark Mode button text (agar page par available hai, jaise index.html)
    const darkBtn = document.getElementById("darkBtn");
    if (darkBtn) {
        darkBtn.innerText = isLightMode ? "Light Mode" : "Dark Mode";
    }

    // --- NAYA SHINE CHECK CODE YAHAN SE SHURU HOTA HAI ---
    const shineStopped = localStorage.getItem("shineStopped") === "true";
    if (shineStopped) {
        document.body.classList.add("stop-shine");
    } else {
        document.body.classList.remove("stop-shine");
    }
    const shineBtn = document.getElementById("shineBtn");
    if (shineBtn) {
        shineBtn.innerText = shineStopped ? "Shine ON" : "Shine OFF";
    }
    // --- YAHAN TAK ---

    // 2. PHIR PAGE-SPECIFIC LOGIC CHALAYEIN
    if (document.getElementById("page1")) {
        initPage1();
    } else if (document.getElementById("page2")) {
        initPage2();
    } else if (document.getElementById("page3")) {
        initPage3();
    } else if (document.getElementById("page4")) {
        initPage4();
    }

    startShineEffect();
});


// ==========================================
// PAGE 1 LOGIC (index.html)
// ==========================================
function initPage1() {
    const langDiv = document.getElementById("languages");
    if(langDiv) {
        languages.forEach(lang => {
          let btn = document.createElement("button");
          if(lang === "Python" || lang === "Java" || lang === "C++" || lang === "R" || lang === "Go" || lang === "Swift" || lang === "PHP" || lang === "Dart" || lang === "Rust" || lang === "JavaS_t" || lang === "TypeS_t" || lang === "Kotlin" || lang === "C#" || lang === "English"){  
            btn.innerText = "⭐" + lang;
          } else {
            btn.innerText = lang;
          }
          btn.onclick = () => selectLang(lang);
          langDiv.appendChild(btn);
        });
    }
}

function selectLang(lang) {
    // Save selected language to localStorage
    localStorage.setItem("selectedLanguage", lang);
    // Redirect to Page 2
    window.location.href = "page2.html";
}

// ==========================================
// PAGE 2 LOGIC (page2.html)
// ==========================================
function initPage2() {
    currentLang = localStorage.getItem("selectedLanguage");
    
    if (!currentLang) {
        // If no language is selected, go back to home
        window.location.href = "index.html";
        return;
    }

    document.getElementById("langTitle").innerText = currentLang;
    selectedProjects = generateProjects(currentLang);
    let projDiv = document.getElementById("projects");
    projDiv.innerHTML = "";

    // Heading 1
    let h1 = document.createElement("div");
    h1.className = "sectionTitle";
    h1.innerHTML = `
    <div class="line line1"></div>
    <div class="line line2"></div>
    <div class="line line3"></div>
    <div class="line line4"></div>
    <h2>🔥 Typing Test Projects (Hard)</h2>
    `;
    projDiv.appendChild(h1);

    let p1 = document.createElement("p");
    p1.innerText = " Test Type Hard Projects, Check Your Speed To Complate Coding Test";
    p1.style.gridColumn = "1 / -1";
    projDiv.appendChild(p1);

    selectedProjects.forEach((p, index) => {
      if (p.section) {
        let h = document.createElement("div");
        h.className = "sectionTitle";
        h.innerHTML = `
          <div class="line line1"></div>
          <div class="line line2"></div>
          <div class="line line3"></div>
          <div class="line line4"></div>
          <h2>📂 ${p.section.toUpperCase()}</h2>
        `;
        projDiv.appendChild(h);
        return; 
      }

      if (index === 5) {
        let h2 = document.createElement("div");
        h2.className = "sectionTitle";
        h2.innerHTML = `
          <div class="line line1"></div>
          <div class="line line2"></div>
          <div class="line line3"></div>
          <div class="line line4"></div>
          <h2>🚀 Big Projects (Timer OFF To Use)</h2>
        `;
        projDiv.appendChild(h2);

        let p2 = document.createElement("p");
        p2.innerText = "💡Practic Projects = Working on 6 to 10 long typing projects? Turn Off the Timer and type at your own pace. Go Home = Menu Button / Setting Tab = Click Timer OFF.";
        p2.style.gridColumn = "1 / -1";
        projDiv.appendChild(p2);
      }

      let btn = document.createElement("button");
      btn.innerText = p.name;
      btn.onclick = () => startTestRedirect(p);
      projDiv.appendChild(btn);
    });

    let h3 = document.createElement("div");
    h3.className = "sectionTitle";
    h3.innerHTML = `
    <div class="line line1"></div>
    <div class="line line2"></div>
    <div class="line line3"></div>
    <div class="line line4"></div>
    <h2>Complete Programming Language code💫</h2>
    `;
    projDiv.appendChild(h3);

    let p3 = document.createElement("p");
    p3.innerText = "...";
    p3.style.gridColumn = "1 / -1";
    projDiv.appendChild(p3);
}

function startTestRedirect(p) {
    // Save project details to localStorage
    localStorage.setItem("currentProjectName", p.name);
    localStorage.setItem("currentProjectCode", p.code);
    // Redirect to Page 3
    window.location.href = "page3.html";
}


// ==========================================
// PAGE 3 LOGIC (page3.html)
// ==========================================
function initPage3() {
    currentProject = localStorage.getItem("currentProjectName");
    selectedCode = localStorage.getItem("currentProjectCode");
    currentLang = localStorage.getItem("selectedLanguage");

    if (!selectedCode || !currentLang) {
        window.location.href = "index.html";
        return;
    }

    // Get Timer and Keyboard preferences from localStorage if saved, else use defaults
    let savedTimerPref = localStorage.getItem("timerEnabled");
    if(savedTimerPref !== null) timerEnabled = savedTimerPref === "true";
    
    let savedKeyboardPref = localStorage.getItem("keyboardEnabled");
    if(savedKeyboardPref !== null) keyboardEnabled = savedKeyboardPref === "true";

    createKeyboard();
    let kbBox = document.getElementById("keyboardBox");
    if (kbBox) {
        if (!keyboardEnabled) {
    kbBox.style.display = "none";
} else {
    kbBox.style.display = "flex";
    kbBox.style.visibility = "visible";
    kbBox.style.opacity = "1";
}
    }

    document.getElementById("testTitle").innerText = currentLang + " - " + currentProject;
    time = 120;
    updateTimer();
    initTypingBox();
    renderText("");
    
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
      if (timerEnabled) {
        time--;
        updateTimer();
        if (time <= 0) {
          clearInterval(timerInterval);
          finishTestRedirect();
        }
      }
    }, 1000);
}

function createKeyboard() {
  const keyboard = document.getElementById("keyboardBox");
  if(!keyboard) return;
  keyboard.innerHTML = ""; // Pehle ka sab clear karo

  // 👈 NAYA ADDITION: Ek "Handle" banana jisko pakad kar drag karenge
let dragHandle = document.createElement("div");

dragHandle.id = "keyboardDragHandle";

dragHandle.innerHTML = `
  <span>⇇</span>
  <b>MOVE</b>
  <span>⇉</span>
`;

keyboard.appendChild(dragHandle);

 const layout = [
  ["esc","f1","f2","f3","f4","f5","f6","f7","f8","f9","f10",],
  // ... (Baaki keys ka array aapka same rahega yahan) ...
  [
    {main:"`",shift:"~"},{main:"1",shift:"!"},{main:"2",shift:"@"},{main:"3",shift:"#"},
    {main:"4",shift:"$"},{main:"5",shift:"%"},{main:"6",shift:"^"},{main:"7",shift:"&"},
    {main:"8",shift:"*"},{main:"9",shift:"("},{main:"0",shift:")"},{main:"-",shift:"_"},
    {main:"=",shift:"+"},{main:"",shift:"₹"},"back"
  ],
  [
    "tab","q","w","e","r","t","y","u","i","o","p",
    {main:"[",shift:"{"},{main:"]",shift:"}"},{main:"\\",shift:"|"}
  ],
  [
    "caps","a","s","d","f","g","h","j","k","l",
    {main:";",shift:":"},{main:"'",shift:'"'},"enter"
  ],
  [
    "shift","fn","z","x","c","v","b","n","m",
    {main:",",shift:"<"},{main:".",shift:">"},{main:"/",shift:"?"},"shift"
  ],
  ["ctrl","fn","win","alt","space","alt","ctrl"]
];

layout.forEach(row => {
  let rowDiv = document.createElement("div");
  rowDiv.className = "row";
  row.forEach(key => {
    let div = document.createElement("div");
    div.className = "key";
    if (typeof key === "object") {
      div.innerHTML = `<span class="top">${key.shift}</span><br><span class="bottom">${key.main}</span>`;
      div.setAttribute("data-key", key.main);
      div.setAttribute("data-shift", key.shift);
    } else {
      div.innerText = key;
      div.setAttribute("data-key", key);
    }
    rowDiv.appendChild(div);
  });
  keyboard.appendChild(rowDiv);
});

// 👈 Yahan dragHandle pass karein taaki drag wahan se ho, poore keyboard ko move kare
makeDraggable(keyboard, dragHandle);
}


// ==========================================
// DRAGGABLE KEYBOARD LOGIC (UPDATED)
// ==========================================
function makeDraggable(element, handle) {
    let startX = 0;
    let startY = 0;
    let startLeft = 0;
    let startTop = 0;
    let dragging = false;

    if (!handle) handle = element;

    handle.style.touchAction = "none";

    handle.addEventListener("pointerdown", function(e) {
        e.preventDefault();

        dragging = true;

        const rect = element.getBoundingClientRect();

        startX = e.clientX;
        startY = e.clientY;
        startLeft = rect.left;
        startTop = rect.top;

        handle.setPointerCapture(e.pointerId);
        handle.style.cursor = "grabbing";
    });

    handle.addEventListener("pointermove", function(e) {
        if (!dragging) return;

        e.preventDefault();

        let newLeft = startLeft + (e.clientX - startX);
        let newTop = startTop + (e.clientY - startY);

        element.style.setProperty("left", newLeft + "px", "important");
        element.style.setProperty("top", newTop + "px", "important");

        element.style.setProperty("right", "auto", "important");
        element.style.setProperty("bottom", "auto", "important");
    });

    handle.addEventListener("pointerup", function(e) {
        dragging = false;
        handle.style.cursor = "grab";

        try {
            handle.releasePointerCapture(e.pointerId);
        } catch(err) {}
    });

    handle.addEventListener("pointercancel", function(e) {
        dragging = false;
        handle.style.cursor = "grab";
    });
}

function endExam(){
  clearInterval(timerInterval);
  let typed = document.getElementById("inputBox").value;
  // We can pass a flag to localStorage to indicate exam wasn't finished
  if(typed.length < selectedCode.length){
     localStorage.setItem("examIncomplete", "true");
  } else {
     localStorage.setItem("examIncomplete", "false");
  }
  finishTestRedirect();
}

function initTypingBox() {
  typingBox = document.getElementById("typingBox");
  inputBox = document.getElementById("inputBox");
  if(!inputBox || !typingBox) return;
  
  inputBox.value = "";
  inputBox.focus();
  typingBox.onclick = () => inputBox.focus();
  
  // Remove old listeners to prevent duplicates
  inputBox.replaceWith(inputBox.cloneNode(true));
  inputBox = document.getElementById("inputBox");
  
  inputBox.addEventListener("input", function() {
      renderText(this.value);
  });

  inputBox.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      let cursorPos = inputBox.selectionStart;
      let value = inputBox.value;
      let beforeCursor = value.substring(0, cursorPos);
      let currentLineIndex = beforeCursor.split("\n").length - 1;
      let codeLines = selectedCode.split("\n");
      let nextLine = codeLines[currentLineIndex + 1] || "";
      let indentMatch = nextLine.match(/^\s*/);
      let indent = indentMatch ? indentMatch[0] : "";
      let newText = value.substring(0, cursorPos) + "\n" + indent + value.substring(cursorPos);
      inputBox.value = newText;
      let newCursorPos = cursorPos + 1 + indent.length;
      inputBox.selectionStart = inputBox.selectionEnd = newCursorPos;
      renderText(inputBox.value);
    }
  });
}

function renderText(userInput) {
  let result = "";
  for (let i = 0; i < selectedCode.length; i++) {
    let originalChar = selectedCode[i];
    let typedChar = userInput[i];
    if (typedChar === "\r") typedChar = "\n";
    if (i < userInput.length) {
      if (typedChar && typedChar.toLowerCase() === originalChar.toLowerCase()) {
        result += '<span class="correct">' + originalChar + '</span>';
      } else {
        result += '<span class="incorrect">' + originalChar + '</span>';
      }
    } else {
      result += '<span class="pending">' + originalChar + '</span>';
    }
  }
  typingBox.innerHTML = result + '<span class="cursor"></span>';
  highlightNextKey(userInput);
}

function highlightNextKey(userInput) {
  const text = selectedCode;
  if(userInput.length >= text.length) return;
  const nextChar = text[userInput.length];
  let next = nextChar;
  if (next === " ") next = "space";
  if (next === "\n") next = "enter";
  document.querySelectorAll(".key").forEach(key => {
    key.classList.remove("active");
    const main = key.getAttribute("data-key");
    const shift = key.getAttribute("data-shift");
    if (next === main || next === shift) {
      key.classList.add("active");
    }
  });
}

function updateTimer(){
  let min = Math.floor(time / 60);
  let sec = time % 60;
  let timerEl = document.getElementById("timer");
  if(timerEl) timerEl.innerText = `${min}:${sec < 10 ? "0"+sec : sec}`;
}

function finishTestRedirect(){
  let typed = document.getElementById("inputBox").value;
  let correct = 0;
  for(let i=0; i<typed.length; i++){
    if (typed[i] && typed[i].toLowerCase() === selectedCode[i].toLowerCase()) {
      correct++;
    }
  }
  let accuracy = Math.round((correct/selectedCode.length)*100);
  let progress = Math.round((typed.length / selectedCode.length) * 100);
  if(progress > 100) progress = 100;
  let chars = typed.length;
  let timeTaken = (120 - time) / 60; 
  if(timeTaken <= 0) timeTaken = 1/60; 
  let wpm = Math.round((chars / 5) / timeTaken);
  let displayWPM = Math.max(0, progress - 12);
  let mistakes = typed.length - correct;
  if(mistakes < 0) mistakes = 0;
  let wpmPercent = Math.min(displayWPM, 100);
  let mistakePercent = Math.min(mistakes, 100);

  // Save results to localStorage
  localStorage.setItem("resProgress", progress);
  localStorage.setItem("resWpmPercent", wpmPercent);
  localStorage.setItem("resAccuracy", accuracy);
  localStorage.setItem("resMistakePercent", mistakePercent);
  localStorage.setItem("resDisplayWPM", displayWPM);
  
  // Redirect to Page 4
  window.location.href = "page4.html";
}

// Global Shift+Enter listener
document.addEventListener("keydown", function(e) {
  // Only trigger if on page 3
  if (document.getElementById("page3") && e.shiftKey && e.key === "Enter") {
    e.preventDefault();
    endExam();
  }
});


// ==========================================
// PAGE 4 LOGIC (page4.html)
// ==========================================
function initPage4() {
    let progress = localStorage.getItem("resProgress") || 0;
    let wpmPercent = localStorage.getItem("resWpmPercent") || 0;
    let accuracy = localStorage.getItem("resAccuracy") || 0;
    let mistakePercent = localStorage.getItem("resMistakePercent") || 0;
    let displayWPM = localStorage.getItem("resDisplayWPM") || 0;
    let incomplete = localStorage.getItem("examIncomplete") === "true";

    let resultText = document.getElementById("resultText");
    
    if(incomplete) {
        resultText.innerHTML = "⚠️ Exam Not Complete";
    } else {
        if(accuracy >= 80){
          resultText.innerHTML = "🏆 Excellent!";
        } else if(accuracy >= 50){
          resultText.innerHTML = "👍 Pass!";
        } else {
          resultText.innerHTML = "❌ Try Again";
        }
    }

    setTimeout(()=>{
      animateBar("speedBar", progress);
      animateBar("wpmBar", wpmPercent);
      animateBar("accBar", accuracy);
      animateBar("mistakeBar", mistakePercent);
    }, 300);

    let scoreEl = document.getElementById("score");
    if(scoreEl) {
        scoreEl.innerText = `Speed: ${progress}% | WPM: ${displayWPM}% | Accuracy: ${accuracy}% | Mistakes: ${mistakePercent}%`;
    }
}

function animateBar(id, target){
    let bar = document.getElementById(id);
    if(!bar) return;
    let txt = bar.querySelector(".percent");
    let value = 0;
    let timer = setInterval(()=>{
        if(value >= target){
            clearInterval(timer);
        } else {
            value++;
            bar.style.width = value + "%";
            if(txt) txt.innerText = value + "%";
        }
    }, 8);
}

function restart(){
  // Restart means go back to page 3 and type again
  window.location.href = "page3.html";
}


// ==========================================
// MENU & GLOBAL FUNCTIONS
// ==========================================

function toggleMenu() {
  let menu = document.getElementById("menuBox");
  if(menu) {
      menu.style.display = (menu.style.display === "flex") ? "none" : "flex";
  }
}

function openBlog() {
  window.location.href = "blog.html";
}
function openAbout() {
  window.location.href = "about.html";
}

function toggleDarkMode() {
    const isCurrentlyLight =
        document.body.classList.contains("light-mode");

    const newLightMode = !isCurrentlyLight;

    document.body.classList.toggle("light-mode", newLightMode);
    document.body.classList.toggle("no-bg", newLightMode);

    localStorage.setItem(
        "isLightMode",
        newLightMode
    );

    const btn = document.getElementById("darkBtn");

    if (btn) {
        btn.innerText =
            newLightMode ? "Light Mode" : "Dark Mode";
    }
}

function toggleTimer() {
    timerEnabled = !timerEnabled;

    localStorage.setItem(
        "timerEnabled",
        timerEnabled
    );

    const btn = document.getElementById("timerBtn");

    if (btn) {
        btn.innerText =
            timerEnabled ? "Timer ON" : "Timer OFF";
    }
}

function toggleKeyboard() {
    keyboardEnabled = !keyboardEnabled;

    localStorage.setItem(
        "keyboardEnabled",
        keyboardEnabled
    );

    const keyboard =
        document.getElementById("keyboardBox");

    const btn =
        document.getElementById("keyboardBtn");

    if (keyboardEnabled) {

        if (keyboard) {
            keyboard.style.setProperty(
                "display",
                "flex",
                "important"
            );

            keyboard.style.visibility = "visible";
            keyboard.style.opacity = "1";
        }

        if (btn) {
            btn.innerText = "Keyboard ON";
        }

    } else {

        if (keyboard) {
            keyboard.style.setProperty(
                "display",
                "none",
                "important"
            );
        }

        if (btn) {
            btn.innerText = "Keyboard OFF";
        }
    }
}

document.addEventListener("click", function(e) {
  let menu = document.getElementById("menuBox");
  let menuBtn = document.getElementById("menuBtn");
  if (menu && menuBtn && !menu.contains(e.target) && !menuBtn.contains(e.target)) {
    menu.style.display = "none";
  }
});

function filterLanguages() {
  let input = document.getElementById("searchBox");
  if(!input) return;
  let val = input.value.toLowerCase();
  let buttons = document.querySelectorAll("#languages button");
  let suggestionsBox = document.getElementById("suggestions");
  suggestionsBox.innerHTML = "";
  suggestionsBox.style.display = "none";
  
  buttons.forEach(btn => {
    let text = btn.innerText.toLowerCase();
    if (text.includes(val)) {
      btn.style.display = "block";
      if (val.length > 0) {
        let div = document.createElement("div");
        div.className = "suggestion-item";
        div.innerText = btn.innerText;
        div.onclick = () => {
          btn.click(); 
        };
        suggestionsBox.appendChild(div);
        suggestionsBox.style.display = "block";
      }
    } else {
      btn.style.display = "none";
    }
  });
}

function filterProjects() {
  let input = document.getElementById("projectSearch");
  if(!input) return;
  let val = input.value.toLowerCase();
  let buttons = document.querySelectorAll("#projects button");
  let suggestionsBox = document.getElementById("projectSuggestions");
  suggestionsBox.innerHTML = "";
  suggestionsBox.style.display = "none";
  
  buttons.forEach(btn => {
    let text = btn.innerText.toLowerCase();
    if (text.includes(val)) {
      btn.style.display = "block";
      if (val.length > 0) {
        let div = document.createElement("div");
        div.className = "suggestion-item";
        div.innerText = btn.innerText;
        div.onclick = () => {
          btn.click(); 
        };
        suggestionsBox.appendChild(div);
        suggestionsBox.style.display = "block";
      }
    } else {
      btn.style.display = "none";
    }
  });
}

function startShineEffect() {
    const btn = document.querySelector(".get-free-btn");
    if(!btn) return;
    const shine1 = btn.querySelector(".shine1");
    const shine2 = btn.querySelector(".shine2");
    
    function startShine() {
      if(!shine1 || !shine2) return;
      shine1.style.transition = "none";
      shine1.style.left = "-60%";
      setTimeout(() => {
        shine1.style.transition = "left 1.2s linear";
        shine1.style.left = "120%";
      }, 50);
      
      shine2.style.transition = "none";
      shine2.style.right = "-60%";
      setTimeout(() => {
        shine2.style.transition = "right 1.2s linear";
        shine2.style.right = "120%";
      }, 50);
    }
    setInterval(startShine, 3000);
    startShine();
}


// ==========================================
// SHINE TOGGLE LOGIC
// ==========================================
function toggleShine() {
    const isCurrentlyStopped = document.body.classList.contains("stop-shine");
    const newShineStopped = !isCurrentlyStopped;

    // Body par class lagaye ya hataye
    document.body.classList.toggle("stop-shine", newShineStopped);

    // Preferance ko save karein
    localStorage.setItem("shineStopped", newShineStopped);

    // Button ka text update karein
    const btn = document.getElementById("shineBtn");
    if (btn) {
        btn.innerText = newShineStopped ? "Shine ON" : "Shine OFF";
    }
}








  function checkSpeedLevel(wpm) {
    const display = document.getElementById("speedResultDisplay");
    let message = "";
    let colorStyle = "";

    if (wpm <= 45) {
      message = "🎯 " + wpm + " WPM: Beginner Developer Level! Focus on consistent daily practice.";
      colorStyle = "#ff9900";
    } else if (wpm <= 75) {
      message = "🔥 " + wpm + " WPM: Good Developer Tier! Your coding flow is smooth and active.";
      colorStyle = "#00f0ff";
    } else {
      message = "👑 " + wpm + " WPM: Pro Coding Machine Tier! Lightning-fast syntax execution!";
      colorStyle = "#ff3366";
    }

    display.style.color = colorStyle;
    display.style.transform = "scale(1.05)";
    display.innerText = message;
    
    setTimeout(() => {
      display.style.transform = "scale(1)";
    }, 200);
  }


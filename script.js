

class MyFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <footer>
        <row>
          <column>
            <button id="toggleTailButton">Toggle Tail</button>
          </column>
          <column>
            <p class="text">Background Themes</p>
            <button onclick="setCurrentBackgroundTheme('avoidRed')">Avoid Red Theme</button>
            <button onclick="setCurrentBackgroundTheme('none')">No Theme</button>
          </column>
        <row>
        <p>&copy 2026</p>
      </footer>
    `;
  }
}

class MyNav extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<nav>
      <ul>
        <li><a href="index.html">Home</a></li>
        <li class="dropdown">
          <a href="projectsPage.html">Projects</a>
          <ul class="dropdown-content">
            <li><a href="itchio.html">Itch.io</a></li>
            <li><a href="github.html">Github</a></li>
          </ul>
        </li>
        <li><a href="resume.html">Resume</a></li>
        <li><a href="effects.html">Effects</a></li>
      </ul>
    </nav>`;
  }
}
customElements.define('my-footer', MyFooter);
customElements.define('my-nav', MyNav);

let mouseX = window.innerWidth / 2;
let mouseYClient = window.innerHeight / 2;
let mouseYPage = window.innerHeight / 2;

// image position
let followX = mouseX;
let followY = mouseYPage;

let hasTail = localStorage.getItem("hasTail") === 'true';
localStorage.setItem("hasTail", hasTail);

let tail = null;

let avoidRedBackgroundImgs = `url('images/backgrounds/avoidRedTheme/red.png'), url('images/backgrounds/avoidRedTheme/green.png'), url('images/backgrounds/avoidRedTheme/blue.png')`;
let everlastingDriftBackgroundImgs = `url('images/ship.png'), url('images/backgrounds/avoidRedTheme/green.png'), url('images/backgrounds/avoidRedTheme/blue.png')`;
let horizontalDivideBackgroundImgs = `url('images/backgrounds/horizontalDivide/black.png'), url('images/backgrounds/horizontalDivide/grey.png')`;


let currentBackgroundTheme = localStorage.getItem("currentBackgroundTheme");
localStorage.setItem("currentBackgroundTheme", currentBackgroundTheme);


function setBackgroundImgsBasedOnTheme() {
  if (currentBackgroundTheme === "avoidRed") {
    document.body.style.backgroundImage = avoidRedBackgroundImgs;
    document.documentElement.style.setProperty('--backgroundColor', '#00557a');
    document.documentElement.style.setProperty('--textColor', 'lightblue');
  } else if (currentBackgroundTheme === "everlastingDrift") {
    document.body.style.backgroundImage = everlastingDriftBackgroundImgs;
    document.documentElement.style.setProperty('--backgroundColor', '#00ff00');
    document.documentElement.style.setProperty('--textColor', '#000000');
  } else if (currentBackgroundTheme === "horizontalDivide") {
    document.body.style.backgroundImage = horizontalDivideBackgroundImgs;
    document.documentElement.style.setProperty('--backgroundColor', '#ffffff');
    document.documentElement.style.setProperty('--textColor', '#000000');
  } else {
    document.body.style.backgroundImage = 'none';
    document.documentElement.style.setProperty('--backgroundColor', '#ffffff');
    document.documentElement.style.setProperty('--textColor', '#000000');
  }
}

function setCurrentBackgroundTheme(theme) {
  currentBackgroundTheme = theme;
  localStorage.setItem("currentBackgroundTheme", currentBackgroundTheme);
  setBackgroundImgsBasedOnTheme();
}

setBackgroundImgsBasedOnTheme();

function createFollow() {
  tail = document.createElement("img");
  tail.id = "follow";
  tail.src = "images/ship.png";
  tail.alt = "follow";
  document.body.appendChild(tail);
}

if (localStorage.getItem("hasTail") === 'true') {
  createFollow();
}

document.addEventListener("mousemove", (e) => {
  // cursor position
  mouseX = e.clientX;
  mouseYClient = e.clientY;
  mouseYPage = e.pageY;
  if (localStorage.getItem("hasTail") === 'true') {
    const smoke = document.createElement("div");
    smoke.className = "smoke";

    smoke.style.left = tail.style.left;
    smoke.style.top = tail.style.top;

    document.body.appendChild(smoke);

    setTimeout(() => {
      smoke.remove();
    }, 500);

  }

  const x = mouseX / window.innerWidth;
  const y = mouseYClient / window.innerHeight;

  // Adjust strength of movement (parallax effect)
  const strength1 = -1000; // front background
  const strength2 = -750; // mid background
  const strength3 = -500; // back background

  const bg1X = x * strength1;
  const bg1Y = y * strength1;

  const bg2X = x * strength2;
  const bg2Y = y * strength2;
  const bg3X = x * strength3;
  const bg3Y = y * strength3;

  document.body.style.backgroundPosition =
    `${bg1X}px ${bg1Y}px, ${bg2X}px ${bg2Y}px, ${bg3X}px ${bg3Y}px`;

});

function update() {
  if (localStorage.getItem("hasTail") === 'true') {
    followX += (mouseX - followX) * .05;
    followY += (mouseYPage - followY) * .05;

    const rect = tail.getBoundingClientRect();
    const cx = followX;
    const cy = followY;

    const angle = Math.atan2(mouseYPage - cy, mouseX - cx);
    const deg = angle * 180 / Math.PI;

    tail.style.left = (followX - rect.width / 2) + "px";
    tail.style.top = (followY - rect.height / 2) + "px";
    tail.style.transform = `rotate(${deg}deg)`;
  }
  requestAnimationFrame(update);
}

update();

const tailButton = document.getElementById("toggleTailButton")

if (tailButton != null) {
  tailButton.addEventListener("click", () => {
    hasTail = !hasTail;
    localStorage.setItem("hasTail", hasTail);
    if (hasTail) {
      createFollow();
    } else {
      tail.remove();
    }
  });
}


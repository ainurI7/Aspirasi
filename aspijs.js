// DATABASE LOCAL
let users = JSON.parse(localStorage.getItem("users")) || [];
let aspirasi = JSON.parse(localStorage.getItem("aspirasi")) || [];
let currentUser = localStorage.getItem("currentUser");

// INIT
if (currentUser) {
  showMain();
}

// NAVIGATION
function showRegister() {
  document.getElementById("loginPage").classList.add("hidden");
  document.getElementById("registerPage").classList.remove("hidden");
}

function showLogin() {
  document.getElementById("registerPage").classList.add("hidden");
  document.getElementById("loginPage").classList.remove("hidden");
}

function showMain() {
  document.getElementById("loginPage").classList.add("hidden");
  document.getElementById("registerPage").classList.add("hidden");
  document.getElementById("mainPage").classList.remove("hidden");

  document.getElementById("welcome").innerText = "Halo, " + currentUser;
  tampilkanAspirasi();
}

// REGISTER
function register() {
  let u = document.getElementById("regUser").value;
  let p = document.getElementById("regPass").value;

  if (!u || !p) return alert("Isi semua!");

  users.push({username: u, password: p});
  localStorage.setItem("users", JSON.stringify(users));

  alert("Berhasil daftar!");
  showLogin();
}

// LOGIN
function login() {
  let u = document.getElementById("loginUser").value;
  let p = document.getElementById("loginPass").value;

  let user = users.find(x => x.username === u && x.password === p);

  if (user) {
    localStorage.setItem("currentUser", u);
    currentUser = u;
    showMain();
  } else {
    alert("Login gagal!");
  }
}

// LOGOUT
function logout() {
  localStorage.removeItem("currentUser");
  location.reload();
}

// TAMBAH ASPIRASI
function tambahAspirasi() {
  let isi = document.getElementById("aspirasi").value;

  if (!isi) return alert("Tidak boleh kosong!");

  aspirasi.push({
    user: currentUser,
    isi: isi,
    like: 0
  });

  localStorage.setItem("aspirasi", JSON.stringify(aspirasi));
  document.getElementById("aspirasi").value = "";
  tampilkanAspirasi();
}

// TAMPILKAN
function tampilkanAspirasi() {
  let html = "";

  aspirasi.slice().reverse().forEach((a, i) => {
    html += `
      <div class="card">
        <strong>${a.user}</strong>
        <p>${a.isi}</p>
        <button class="like-btn" onclick="like(${aspirasi.length - 1 - i})">
          👍 Like (${a.like})
        </button>
      </div>
    `;
  });

  document.getElementById("listAspirasi").innerHTML = html;
}

// LIKE
function like(i) {
  aspirasi[i].like++;
  localStorage.setItem("aspirasi", JSON.stringify(aspirasi));
  tampilkanAspirasi();
}
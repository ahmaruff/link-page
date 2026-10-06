// ===== DATA =====
// Setiap link adalah object. Semua link disimpan dalam satu array.
const links = [
    { id: 1, title: "GitHub", url: "https://github.com/ahmaruff", category: "sosmed", icon: "🐙" },
    { id: 2, title: "Instagram", url: "https://instagram.com/ahmaruff", category: "sosmed", icon: "📸" },
    { id: 3, title: "LinkedIn", url: "https://linkedin.com/in/ahmaruff", category: "sosmed", icon: "💼" },
    { id: 4, title: "Portofolio", url: "https://ahmaruff.github.io/blog/portfolio/", category: "project", icon: "🎨" },
    { id: 5, title: "Link Page Ini (Repo)", url: "https://github.com/ahmaruff/link-page", category: "project", icon: "🧩" },
    { id: 6, title: "Catatan Kursus", url: "https://ahmaruff.github.io/blog/writing/", category: "project", icon: "📓" },
    { id: 7, title: "Email", url: "mailto:halo@example.com", category: "kontak", icon: "✉️" },
    { id: 8, title: "WhatsApp", url: "https://wa.me/6281234567890", category: "kontak", icon: "💬" }
];


// ===== STYLE =====
// Class Tailwind untuk kartu link (sama dengan versi HTML di Pertemuan 2)
const CARD_CLASSES = "flex items-center justify-center gap-3 rounded-xl bg-white px-5 py-4 font-medium shadow-sm ring-1 ring-slate-200 transition duration-200 hover:-translate-y-0.5 hover:bg-slate-900 hover:text-white hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-slate-900 dark:ring-slate-800 dark:hover:bg-slate-100 dark:hover:text-slate-900 dark:focus-visible:outline-indigo-400 motion-reduce:transition-none motion-reduce:hover:translate-y-0";

// ===== FUNGSI RENDER =====
function createLinkItem(link) {
    const item = document.createElement("li");
    const anchor = document.createElement("a");

    anchor.href = link.url;
    anchor.className = CARD_CLASSES;

    // Link ke website lain dibuka di tab baru. mailto: tidak perlu.
    if (link.url.startsWith("http")) {
        anchor.target = "_blank";
        anchor.rel = "noopener noreferrer";
    }

    const icon = document.createElement("span");
    icon.setAttribute("aria-hidden", "true");
    icon.textContent = link.icon;

    anchor.appendChild(icon);
    anchor.appendChild(document.createTextNode(" " + link.title));
    item.appendChild(anchor);

    return item;
}

const linkList = document.querySelector("#link-list");

function renderLinks(category) {
    // 1. Kosongkan daftar lama
    linkList.innerHTML = "";

    // 2. Tambahkan link yang cocok dengan kategori
    links.forEach(function (link) {
        if (category === "semua" || link.category === category) {
            linkList.appendChild(createLinkItem(link));
        }
    });
}

// ===== FILTER =====
const filterTabs = document.querySelector("#filter-tabs");
const tabButtons = filterTabs.querySelectorAll("button");

function handleFilterClick(clickedButton) {
    // 1. Tandai tombol aktif
    tabButtons.forEach(function (button) {
        if (button === clickedButton) {
            button.setAttribute("aria-pressed", "true");
        } else {
            button.setAttribute("aria-pressed", "false");
        }
    });

    // 2. Simpan kategori aktif
    currentCategory = clickedButton.dataset.category;

    // 3. Gambar ulang daftar
    renderLinks(currentCategory);

    // PAIN: jangan lupa dua baris di bawah ini!
    updateCount();
    updateEmptyState();
}

tabButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        handleFilterClick(button);
    });
});

// ===== TEMA =====
const themeToggle = document.querySelector("#theme-toggle");

// Menyesuaikan ikon dan label tombol dengan tema yang sedang aktif
function updateThemeButton() {
    const isDark = document.documentElement.classList.contains("dark");

    if (isDark) {
        themeToggle.textContent = "☀️";
        themeToggle.setAttribute("aria-label", "Ganti ke mode terang");
    } else {
        themeToggle.textContent = "🌙";
        themeToggle.setAttribute("aria-label", "Ganti ke mode gelap");
    }
}

themeToggle.addEventListener("click", function () {
    // toggle() menambah class jika belum ada, menghapus jika sudah ada.
    // Hasilnya true kalau class "dark" sekarang terpasang.
    const isDark = document.documentElement.classList.toggle("dark");

    // Simpan pilihan agar bertahan setelah reload
    localStorage.setItem("linkpage:theme", isDark ? "dark" : "light");

    updateThemeButton();
});

// ===== STATE MANUAL =====
// Kategori aktif harus kita simpan sendiri di variabel ini,
// dan harus selalu sama dengan tombol tab yang sedang berwarna aktif.
let currentCategory = "semua";

// ===== COUNTER & EMPTY STATE =====
const linkCount = document.querySelector("#link-count");
const emptyState = document.querySelector("#empty-state");

function updateCount() {
    const total = linkList.children.length;
    linkCount.textContent = "Menampilkan " + total + " link";
}

function updateEmptyState() {
    if (linkList.children.length === 0) {
        emptyState.classList.remove("hidden");
    } else {
        emptyState.classList.add("hidden");
    }
}


// ===== FORM TAMBAH LINK =====
const addLinkForm = document.querySelector("#add-link-form");
const formError = document.querySelector("#form-error");

function showFormError(message) {
    formError.textContent = message;
    formError.classList.remove("hidden");
}

function hideFormError() {
    formError.textContent = "";
    formError.classList.add("hidden");
}

function isValidUrl(url) {
    return url.startsWith("http://") || url.startsWith("https://") || url.startsWith("mailto:");
}

addLinkForm.addEventListener("submit", function (event) {
    event.preventDefault(); // cegah halaman reload saat form dikirim

    const title = document.querySelector("#link-title").value.trim();
    const url = document.querySelector("#link-url").value.trim();
    const category = document.querySelector("#link-category").value;

    if (title === "") {
        showFormError("Judul tidak boleh kosong.");
        return;
    }
    if (!isValidUrl(url)) {
        showFormError("URL harus diawali http://, https://, atau mailto:");
        return;
    }

    hideFormError();

    // 1. Tambahkan ke data
    links.push({ id: Date.now(), title: title, url: url, category: category, icon: "🔗" });

    // 2. Kosongkan form
    addLinkForm.reset();

    // 3. Perbarui tampilan
    renderLinks(currentCategory);
    updateCount();
    updateEmptyState();
});

// ===== MULAI =====
renderLinks("semua");
updateCount();        // PAIN: jangan lupa!
updateEmptyState();   // PAIN: jangan lupa!
updateThemeButton();
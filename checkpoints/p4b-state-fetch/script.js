// ===== STYLE =====
const CARD_CLASSES = "flex items-center justify-center gap-3 rounded-xl bg-white px-5 py-4 font-medium shadow-sm ring-1 ring-slate-200 transition duration-200 hover:-translate-y-0.5 hover:bg-slate-900 hover:text-white hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-slate-900 dark:ring-slate-800 dark:hover:bg-slate-100 dark:hover:text-slate-900 dark:focus-visible:outline-indigo-400 motion-reduce:transition-none motion-reduce:hover:translate-y-0";

const TAB_CLASSES = "rounded-full bg-white px-4 py-1.5 text-sm font-medium text-slate-700 ring-1 ring-slate-200 aria-pressed:bg-indigo-600 aria-pressed:text-white aria-pressed:ring-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-slate-900 dark:text-slate-200 dark:ring-slate-800 dark:focus-visible:outline-indigo-400";

const MESSAGE_CLASSES = "rounded-xl bg-white px-5 py-4 text-center text-sm text-slate-500 ring-1 ring-slate-200 dark:bg-slate-900 dark:text-slate-400 dark:ring-slate-800";

// ===== STATE =====
const state = {
    links: [],
    activeCategory: "semua",
    theme: document.documentElement.classList.contains("dark") ? "dark" : "light",
    status: "loading"   // "loading" | "ready" | "error"
};


// Satu-satunya pintu untuk mengubah data
function setState(changes) {
    Object.assign(state, changes);
    render();
}

// HELPERs
// Mengubah karakter spesial HTML menjadi teks biasa, supaya input pengguna
// (misalnya "<script>") tidak dijalankan sebagai kode. Ini mencegah serangan XSS.
function escapeHtml(text) {
    return String(text)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

// ===== KOMPONEN =====
// Komponen = function yang menerima data dan mengembalikan string HTML
function LinkCard(link) {
    let extraAttributes = "";
    if (link.url.startsWith("http")) {
        extraAttributes = ' target="_blank" rel="noopener noreferrer"';
    }

    return `
        <li>
            <a href="${escapeHtml(link.url)}"${extraAttributes} class="${CARD_CLASSES}">
                <span aria-hidden="true">${escapeHtml(link.icon)}</span> ${escapeHtml(link.title)}
            </a>
        </li>`;
}

function EmptyState() {
    return `<li class="${MESSAGE_CLASSES}">Belum ada link di kategori ini.</li>`;
}

function LoadingState() {
    return `<li class="${MESSAGE_CLASSES}">Memuat…</li>`;
}

function ErrorState() {
    return `<li class="${MESSAGE_CLASSES}">Gagal memuat data. Buka lewat Live Server atau situs yang sudah di-deploy.</li>`;
}

// behaviour
function getVisibleLinks(state) {
    if (state.activeCategory === "semua") {
        return state.links;
    }
    return state.links.filter(function (link) {
        return link.category === state.activeCategory;
    });
}

function LinkList(state) {
    if (state.status === "loading") {
        return LoadingState();
    }
    if (state.status === "error") {
        return ErrorState();
    }

    const visibleLinks = getVisibleLinks(state);

   if (visibleLinks.length === 0) {
        return EmptyState();
    }

    return visibleLinks
        .map(function (link) {
            return LinkCard(link);
        })
        .join("");
}

const TABS = [
    { category: "semua", label: "Semua" },
    { category: "sosmed", label: "Sosmed" },
    { category: "project", label: "Project" },
    { category: "kontak", label: "Kontak" }
];

function FilterTabs(state) {
    return TABS.map(function (tab) {
        const isActive = tab.category === state.activeCategory;
        return `
        <button type="button" data-action="filter" data-category="${tab.category}"
            aria-pressed="${isActive}" class="${TAB_CLASSES}">${tab.label}</button>`;
    }).join("");
}

function LinkCount(state) {
    if (state.status !== "ready") {
        return "";
    }
    return "Menampilkan " + getVisibleLinks(state).length + " link";
}

// ===== RENDER =====
const filterTabs = document.querySelector("#filter-tabs");
const linkList = document.querySelector("#link-list");
const linkCount = document.querySelector("#link-count");
const themeToggle = document.querySelector("#theme-toggle");

function renderTheme() {
    const isDark = state.theme === "dark";
    document.documentElement.classList.toggle("dark", isDark); // true = pasang, false = lepas
    themeToggle.textContent = isDark ? "☀️" : "🌙";
    themeToggle.setAttribute("aria-label", isDark ? "Ganti ke mode terang" : "Ganti ke mode gelap");
}

function render() {
    filterTabs.innerHTML = FilterTabs(state);
    linkList.innerHTML = LinkList(state);
    linkCount.textContent = LinkCount(state);
    renderTheme();
}

// ===== EVENT =====
// Event delegation: pasang SATU listener di wadah tab (#filter-tabs).
// Tombol di dalamnya digambar ulang terus, tetapi wadahnya tidak,
// sehingga listener ini tetap hidup.
filterTabs.addEventListener("click", function (event) {
    const button = event.target.closest("[data-action='filter']");
    if (button === null) {
        return; // yang diklik bukan tombol filter
    }
    setState({ activeCategory: button.dataset.category });
});

themeToggle.addEventListener("click", function () {
    const newTheme = state.theme === "dark" ? "light" : "dark";
    localStorage.setItem("linkpage:theme", newTheme);
    setState({ theme: newTheme });
});

// FORM HANDLING
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
    event.preventDefault();

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
    addLinkForm.reset();

    // Buat array BARU berisi semua link lama ditambah link baru.
    // CATATAN: link yang ditambahkan hanya hidup di memori browser dan hilang saat reload.
    const newLink = { id: Date.now(), title: title, url: url, category: category, icon: "🔗" };
    setState({ links: [...state.links, newLink] });
});


// ===== DATA =====
async function loadLinks() {
    try {
        const response = await fetch("data/links.json");

        if (!response.ok) {
            throw new Error("Status " + response.status);
        }

        const links = await response.json();
        setState({ links: links, status: "ready" });
    } catch (error) {
        setState({ status: "error" });
    }
}

// ===== MULAI =====
render();      // tampilkan "Memuat…" dulu
loadLinks();   // lalu ambil datanya
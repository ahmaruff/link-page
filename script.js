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

// ===== MULAI =====
renderLinks("semua");
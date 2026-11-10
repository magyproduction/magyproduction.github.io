/* ============================================================
   Magy Production — script comun (toate paginile)
   Editezi aici: CONFIG (contact), VIDEOS (portofoliu), TESTIMONIALS.
   ============================================================ */

(() => {
const CONFIG = {
  email: "contact@magyproduction.ro",
  instagram: "bagel.magy",
  // număr WhatsApp în format internațional, doar cifre (ex. "40712345678").
  // Gol = butonul WhatsApp nu apare, formularul trimite pe email.
  whatsapp: "40728072003",
  // fișier showreel (ex. "/videos/showreel.mp4"). Gol = butonul „Showreel” nu apare.
  showreel: "/videos/showreel.mp4",
};

/* categorii: cheie -> etichetă RO / EN */
const CATS = {
  clinici:    { ro: "Clinici",    en: "Clinics" },
  branduri:   { ro: "Branduri",   en: "Brands" },
  horeca:     { ro: "HoReCa",     en: "Hospitality" },
  auto:       { ro: "Automotive", en: "Automotive" },
  evenimente: { ro: "Evenimente", en: "Events" },
  cinematic:  { ro: "Cinematic",  en: "Cinematic" },
  personal:   { ro: "Personal",   en: "Personal" },
};

/* ------------------------------------------------------------
   PORTOFOLIU — ordinea de aici e ordinea de pe site.
   slug = numele fișierului din /videos (fără .mp4); coperta e /assets/posters/<slug>.webp
   wide: true = film orizontal pe toată lățimea; d = durata în secunde
   ------------------------------------------------------------ */
const VIDEOS = [
  { slug: "cueno",            title: "Cueno",                                   cats: ["cinematic"],            wide: true, d: 110 },
  { slug: "flanco-1",         title: "Flanco — Black Friday I",                 cats: ["branduri"],             d: 33 },
  { slug: "autoklass-1",      title: "Autoklass — I",                           cats: ["auto"],                 d: 50 },
  { slug: "dentalite",        title: "Dentalite",                               cats: ["clinici"],              d: 27 },
  { slug: "eclipsa-cocktail", title: "Eclipsa — Cocktail",                      cats: ["horeca"],               d: 29 },
  { slug: "kinetolin",        title: { ro: "Kinetolin — Film de prezentare", en: "Kinetolin — Brand film" }, cats: ["cinematic", "clinici"], wide: true, d: 178 },
  { slug: "dj-dia-best-of",   title: "DJ Dia — Best Of",                        cats: ["evenimente"],           d: 31 },
  { slug: "sephora-clarins",  title: "Sephora × Clarins",                       cats: ["branduri"],             d: 104 },
  { slug: "bcs-vopsitorie",   title: { ro: "BCS Performance — Vopsitorie", en: "BCS Performance — Paint shop" }, cats: ["auto"], d: 28 },
  { slug: "bks-atelier",      title: "BKS — Atelier",                           cats: ["branduri"],             d: 32 },
  { slug: "dr-smile-cas",     title: "Dr. Smile — CAS",                         cats: ["clinici"],              d: 22 },
  { slug: "bks-cine",         title: "BKS — Cinematic",                         cats: ["cinematic"],            wide: true, d: 84 },
  { slug: "osteopat",         title: { ro: "Osteopatie — Hipertonia", en: "Osteopathy — Hypertonia" }, cats: ["clinici"], d: 36 },
  { slug: "eclipsa-burger",   title: "Eclipsa — Burger",                        cats: ["horeca"],               d: 34 },
  { slug: "bcs-z-1",          title: "BCS Z — Vol. I",                          cats: ["auto"],                 d: 55 },
  { slug: "prive",            title: "Privé",                                   cats: ["evenimente"],           d: 30 },
  { slug: "flanco-5",         title: "Flanco — Black Friday II",                cats: ["branduri"],             d: 41 },
  { slug: "ferma",            title: { ro: "Fermă — Tractor", en: "Farm — Tractor" }, cats: ["branduri"],     d: 14 },
  { slug: "rocca-5",          title: "La Rocca — I",                            cats: ["horeca"],               d: 33 },
  { slug: "autoklass-7",      title: "Autoklass — II",                          cats: ["auto"],                 d: 32 },
  { slug: "dj-dia-crazy",     title: "DJ Dia — Crazy",                          cats: ["evenimente"],           d: 26 },
  { slug: "k-drona",          title: { ro: "Aerial — Dronă", en: "Aerial — Drone" }, cats: ["auto"],          d: 47 },
  { slug: "siri-im-back",     title: "Siri — I'm Back",                         cats: ["personal"],             wide: true, d: 31 },
  { slug: "dr-smile",         title: "Dr. Smile",                               cats: ["clinici"],              d: 41 },
  { slug: "paul",             title: "Paul",                                    cats: ["branduri"],             d: 72 },
  { slug: "rocca-23",         title: "La Rocca — II",                           cats: ["horeca"],               d: 23 },
  { slug: "bcs-z-3",          title: "BCS Z — Vol. II",                         cats: ["auto"],                 d: 64 },
  { slug: "said-1",           title: "Said — I",                                cats: ["branduri"],             d: 17 },
  { slug: "dj-dia-brasov",    title: "DJ Dia — Brașov",                         cats: ["evenimente"],           d: 28 },
  { slug: "gradinita",        title: { ro: "Grădiniță — Deschidere", en: "Kindergarten — Opening" }, cats: ["branduri"], d: 82 },
  { slug: "la-rocca",         title: "La Rocca — III",                          cats: ["horeca"],               d: 17 },
  { slug: "said-2",           title: "Said — II",                               cats: ["branduri"],             d: 19 },
  { slug: "said-3",           title: "Said — III",                              cats: ["branduri"],             d: 30 },
  { slug: "the-bts",          title: "Behind the Scenes",                       cats: ["personal"],             d: 56 },
];

/* Testimoniale — apar pe site doar dacă lista nu e goală.
   { text: "…", name: "Nume", role: "Firmă / funcție" } */
const TESTIMONIALS = [];

/* ============================================================ */
const LANG = (document.documentElement.lang || "ro").slice(0, 2) === "en" ? "en" : "ro";
const T = {
  ro: { all: "Toate", projects: n => n + (n === 1 ? " proiect" : " proiecte"), showAll: n => `Arată toate (${n})`,
        close: "Închide", want: "Vreau un video ca ăsta →", menu: "Meniu",
        mailSubject: "Cerere ofertă video", hello: "Salut! Aș vrea o ofertă:",
        fName: "Nume", fType: "Tip proiect", fWhen: "Când", fMsg: "Detalii", fRef: "Exemplu de pe site" },
  en: { all: "All", projects: n => n + (n === 1 ? " project" : " projects"), showAll: n => `Show all (${n})`,
        close: "Close", want: "I want a video like this →", menu: "Menu",
        mailSubject: "Video quote request", hello: "Hi! I'd like a quote:",
        fName: "Name", fType: "Project type", fWhen: "When", fMsg: "Details", fRef: "Example from the site" },
}[LANG];
const ROOT = LANG === "en" ? "/en/" : "/";
const tr = v => typeof v === "object" ? (v[LANG] || v.ro) : v;
const catName = k => (CATS[k] || { ro: k, en: k })[LANG];
const byId = id => VIDEOS.find(v => v.slug === id);
const fmtDur = s => Math.floor(s / 60) + ":" + String(Math.round(s % 60)).padStart(2, "0");
const canHover = matchMedia("(hover:hover) and (pointer:fine)").matches;
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- NAV + meniu mobil ---------- */
function initNav(){
  const bar = document.querySelector(".topbar");
  if (!bar) return;
  const onScroll = () => bar.classList.toggle("scrolled", scrollY > 40);
  addEventListener("scroll", onScroll, { passive: true }); onScroll();

  const links = [...bar.querySelectorAll(".navlinks a")];
  const btn = document.createElement("button");
  btn.className = "burger"; btn.setAttribute("aria-label", T.menu); btn.setAttribute("aria-expanded", "false");
  btn.innerHTML = "<span></span><span></span><span></span>";
  bar.appendChild(btn);

  const m = document.createElement("nav");
  m.className = "mnav"; m.setAttribute("aria-label", T.menu);
  const big = links.filter(a => !a.classList.contains("lang"));
  big.forEach(a => { const c = a.cloneNode(true); c.className = a.classList.contains("on") ? "on" : ""; c.querySelectorAll("b").forEach(b => b.remove()); m.appendChild(c); });
  const small = document.createElement("div"); small.className = "small";
  (LANG === "ro" ? NICHES_RO : NICHES_EN).forEach(([href, label]) => {
    const a = document.createElement("a"); a.href = href; a.textContent = label; small.appendChild(a);
  });
  const lang = links.find(a => a.classList.contains("lang"));
  if (lang){ const c = lang.cloneNode(true); c.className = ""; small.appendChild(c); }
  m.appendChild(small);
  document.body.appendChild(m);

  const toggle = open => {
    document.documentElement.classList.toggle("menu-open", open);
    btn.setAttribute("aria-expanded", String(open));
  };
  btn.onclick = () => toggle(!document.documentElement.classList.contains("menu-open"));
  m.addEventListener("click", e => { if (e.target.closest("a")) toggle(false); });
  addEventListener("keydown", e => { if (e.key === "Escape") toggle(false); });
}
const NICHES_RO = [["/video-clinici/", "Video clinici"], ["/video-auto/", "Video auto"], ["/video-evenimente/", "Video evenimente"],
                   ["/video-restaurante/", "Video restaurante"], ["/reels-branduri/", "Reels branduri"]];
const NICHES_EN = [["/en/#reels", "Reels"], ["/en/#filme", "Films"], ["/en/#clienti", "Clients"], ["/en/#contact", "Contact"]];

/* ---------- LIGHTBOX ---------- */
let lb;
function ensureLightbox(){
  if (lb) return lb;
  const el = document.createElement("div");
  el.className = "lightbox";
  el.innerHTML = `<div class="lb-title"></div><button class="close" aria-label="${T.close}">✕</button>
    <div class="player"></div><div class="lb-cta"><a class="btn" href="#">${T.want}</a></div>`;
  document.body.appendChild(el);
  lb = { el, title: el.querySelector(".lb-title"), player: el.querySelector(".player"), cta: el.querySelector(".lb-cta a") };
  const close = () => { el.classList.remove("open"); lb.player.innerHTML = ""; document.body.style.overflow = ""; };
  el.querySelector(".close").onclick = close;
  el.onclick = e => { if (e.target === el) close(); };
  addEventListener("keydown", e => { if (e.key === "Escape" && el.classList.contains("open")) close(); });
  return lb;
}
function openVideo(v){
  const L = ensureLightbox();
  L.player.className = "player" + (v.wide || v.horizontal ? "" : " vertical");
  L.player.innerHTML = "";
  const vid = document.createElement("video");
  vid.src = v.file || `/videos/${v.slug}.mp4`; vid.poster = v.poster || `/assets/posters/${v.slug}.webp`;
  vid.controls = true; vid.autoplay = true; vid.playsInline = true;
  L.player.appendChild(vid);
  L.title.textContent = tr(v.title);
  const ref = v.slug ? "?ref=" + encodeURIComponent(v.slug) : "";
  L.cta.href = LANG === "en" ? "/en/" + ref + "#contact" : "/contact/" + ref;
  L.cta.parentElement.style.display = v.noCta ? "none" : "";
  L.el.classList.add("open");
  document.body.style.overflow = "hidden";
}

/* ---------- GRID ---------- */
const PLAY_SVG = '<svg width="20" height="20" viewBox="0 0 24 24" fill="#f4ecd8"><path d="M8 5v14l11-7z"/></svg>';
function makeCard(v, i){
  const card = document.createElement("div");
  card.className = "card" + (v.wide ? " wide" : "");
  card.style.transitionDelay = (i % 4) * 60 + "ms";
  card.tabIndex = 0; card.setAttribute("role", "button"); card.setAttribute("aria-label", tr(v.title));
  card.innerHTML = `<img loading="lazy" decoding="async" alt="" src="/assets/posters/${v.slug}.webp">
    <div class="veil"></div><div class="dur">${fmtDur(v.d)}</div><div class="play">${PLAY_SVG}</div>
    <div class="info"><div class="title"></div><span class="cat"></span></div>`;
  card.querySelector(".title").textContent = tr(v.title);
  card.querySelector(".cat").textContent = v.cats.map(catName).join(" · ");
  if (canHover && !reduceMotion){
    let vid = null;
    card.onmouseenter = () => {
      if (!vid){
        vid = document.createElement("video");
        vid.src = `/videos/${v.slug}.mp4`; vid.muted = true; vid.loop = true; vid.playsInline = true; vid.preload = "auto";
        vid.addEventListener("playing", () => card.classList.add("playing"));
        card.insertBefore(vid, card.children[1]);
      }
      vid.play().catch(() => {});
    };
    card.onmouseleave = () => { if (vid){ vid.pause(); card.classList.remove("playing"); vid.currentTime = 0; } };
  }
  card.onclick = () => openVideo(v);
  card.onkeydown = e => { if (e.key === "Enter" || e.key === " "){ e.preventDefault(); openVideo(v); } };
  return card;
}
const cardObs = "IntersectionObserver" in window ? new IntersectionObserver(es => {
  es.forEach(e => { if (e.isIntersecting){ e.target.classList.add("in"); cardObs.unobserve(e.target); } });
}, { threshold: 0.08 }) : null;

/* initPortfolio(gridEl, { filtersEl, cats: ["clinici"], limit: 16 }) */
function initPortfolio(grid, opts = {}){
  if (!grid) return;
  const base = opts.cats ? VIDEOS.filter(v => v.cats.some(c => opts.cats.includes(c))) : VIDEOS;
  let active = "all", expanded = !opts.limit;
  const moreWrap = document.createElement("div"); moreWrap.className = "more";
  grid.after(moreWrap);

  function renderFilters(){
    const f = opts.filtersEl; if (!f) return;
    const keys = ["all", ...Object.keys(CATS).filter(k => base.some(v => v.cats.includes(k)))];
    f.innerHTML = "";
    keys.forEach(k => {
      const b = document.createElement("button");
      b.textContent = k === "all" ? T.all : catName(k);
      b.className = k === active ? "active" : "";
      b.onclick = () => { active = k; expanded = k !== "all" || !opts.limit; renderFilters(); renderGrid(); };
      f.appendChild(b);
    });
    const c = document.createElement("span"); c.className = "count";
    c.textContent = T.projects(list().length); f.appendChild(c);
  }
  const list = () => base.filter(v => active === "all" || v.cats.includes(active));
  function renderGrid(){
    grid.innerHTML = "";
    const all = list(), shown = expanded ? all : all.slice(0, opts.limit);
    shown.forEach((v, i) => { const c = makeCard(v, i); grid.appendChild(c); cardObs ? cardObs.observe(c) : c.classList.add("in"); });
    moreWrap.innerHTML = "";
    if (shown.length < all.length){
      const b = document.createElement("button"); b.className = "btn"; b.textContent = T.showAll(all.length);
      b.onclick = () => { expanded = true; renderGrid(); };
      moreWrap.appendChild(b);
    }
  }
  renderFilters(); renderGrid();
}

/* ---------- butoane data-play="slug" (studii de caz, showreel) ---------- */
function initPlayButtons(){
  document.querySelectorAll("[data-play]").forEach(el => {
    el.addEventListener("click", e => {
      e.preventDefault();
      const k = el.dataset.play;
      if (k === "showreel") openVideo({ slug: "", file: CONFIG.showreel, poster: "/assets/posters/showreel.webp", title: "Showreel", wide: true, noCta: false });
      else { const v = byId(k); if (v) openVideo(v); }
    });
  });
  document.querySelectorAll("[data-showreel]").forEach(el => { el.hidden = !CONFIG.showreel; });
}

/* ---------- TESTIMONIALE ---------- */
function initQuotes(){
  const sec = document.querySelector("[data-quotes]");
  if (!sec) return;
  if (!TESTIMONIALS.length){ sec.hidden = true; return; }
  const box = sec.querySelector(".quotes");
  TESTIMONIALS.forEach(q => {
    const d = document.createElement("div"); d.className = "quote";
    d.innerHTML = "<p></p><span></span>";
    d.querySelector("p").textContent = tr(q.text);
    d.querySelector("span").textContent = q.name + (q.role ? " — " + tr(q.role) : "");
    box.appendChild(d);
  });
}

/* ---------- WHATSAPP + linkuri contact ---------- */
const WA_SVG = '<svg viewBox="0 0 32 32" fill="#fff" aria-hidden="true"><path d="M16 3C9 3 3.3 8.6 3.3 15.6c0 2.4.7 4.7 1.9 6.7L3 29l6.9-2.1c1.9 1 4 1.6 6.1 1.6 7 0 12.7-5.7 12.7-12.7S23 3 16 3zm0 23.2c-1.9 0-3.8-.5-5.4-1.5l-.4-.2-4.1 1.2 1.2-4-.3-.4c-1.1-1.7-1.7-3.6-1.7-5.6C5.3 9.8 10.1 5 16 5s10.7 4.8 10.7 10.6S21.9 26.2 16 26.2zm5.9-7.9c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.4-.5-2.6-1.6-1-.9-1.6-1.9-1.8-2.2-.2-.3 0-.5.1-.7l.5-.6c.2-.2.2-.3.3-.6.1-.2 0-.4 0-.6-.1-.2-.7-1.7-1-2.3-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.8s1.2 3.2 1.4 3.5c.2.2 2.4 3.6 5.7 5 .8.3 1.4.5 1.9.7.8.3 1.6.2 2.2.1.7-.1 1.9-.8 2.2-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.3-.6-.4z"/></svg>';
const waLink = text => `https://wa.me/${CONFIG.whatsapp}` + (text ? "?text=" + encodeURIComponent(text) : "");
function initContactBits(){
  if (CONFIG.whatsapp && !document.querySelector(".wa")){
    const a = document.createElement("a");
    a.className = "wa"; a.href = waLink(LANG === "en" ? "Hi Magy! " : "Salut Magy! "); a.target = "_blank"; a.rel = "noopener";
    a.setAttribute("aria-label", "WhatsApp"); a.innerHTML = WA_SVG;
    document.body.appendChild(a);
  }
  document.querySelectorAll("[data-wa]").forEach(el => {
    if (!CONFIG.whatsapp){ el.hidden = true; return; }
    if (el.tagName === "A") el.href = waLink(el.dataset.wa || "");
  });
  document.querySelectorAll("[data-wa-number]").forEach(el => {
    const n = CONFIG.whatsapp;
    el.textContent = n.startsWith("40") ? "0" + n.slice(2).replace(/(\d{3})(\d{3})(\d{3})/, "$1 $2 $3") : "+" + n;
  });
}

/* ---------- FORMULAR BRIEF (fără server: compune mesaj WhatsApp / email) ---------- */
function initBrief(){
  const form = document.querySelector("form.brief");
  if (!form) return;
  const q = new URLSearchParams(location.search);
  const ref = q.get("ref"), tip = q.get("tip");
  if (tip && form.tip){ [...form.tip.options].forEach(o => { if (o.value === tip) form.tip.value = tip; }); }
  if (ref && byId(ref) && form.ref){ form.ref.value = tr(byId(ref).title); form.ref.closest("label").hidden = false; }
  const compose = () => {
    const f = form.elements, lines = [T.hello, ""];
    const add = (k, v) => { if (v && v.trim()) lines.push(`${k}: ${v.trim()}`); };
    add(T.fName, f.nume.value); add(T.fType, f.tip.value); add(T.fWhen, f.cand.value);
    if (f.ref && !f.ref.closest("label").hidden) add(T.fRef, f.ref.value);
    if (f.mesaj.value.trim()) lines.push("", f.mesaj.value.trim());
    return lines.join("\n");
  };
  form.querySelectorAll("[data-send]").forEach(b => {
    if (b.dataset.send === "wa" && !CONFIG.whatsapp){ b.hidden = true; return; }
    b.addEventListener("click", e => {
      e.preventDefault();
      if (!form.reportValidity()) return;
      const text = compose();
      if (b.dataset.send === "wa") window.open(waLink(text), "_blank", "noopener");
      else location.href = `mailto:${CONFIG.email}?subject=${encodeURIComponent(T.mailSubject + (form.tip.value ? " — " + form.tip.value : ""))}&body=${encodeURIComponent(text)}`;
    });
  });
}

/* butoane data-tip: dacă formularul e pe aceeași pagină, alege tipul și sari la el */
function initTipLinks(){
  const form = document.querySelector("form.brief");
  if (!form) return;
  document.querySelectorAll("[data-tip]").forEach(a => a.addEventListener("click", e => {
    e.preventDefault();
    [...form.tip.options].forEach(o => { if (o.value === a.dataset.tip) form.tip.value = o.value; });
    const box = form.closest("section") || form;
    if (window.__lenis) window.__lenis.scrollTo(box, { offset: -40 }); else box.scrollIntoView({ behavior: "smooth" });
  }));
}

/* ---------- lenis (scroll lin) — doar unde e cerut ---------- */
function initLenis(){
  if (reduceMotion || !document.documentElement.hasAttribute("data-lenis")) return;
  const s = document.createElement("script");
  s.src = "https://unpkg.com/lenis@1/dist/lenis.min.js";
  s.onload = () => {
    if (!window.Lenis) return;
    const lenis = new Lenis({ lerp: 0.09 });
    window.__lenis = lenis;
    document.documentElement.classList.add("lenis", "lenis-smooth");
    const raf = t => { lenis.raf(t); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
  };
  document.head.appendChild(s);
}

initNav();
initPlayButtons();
initQuotes();
initContactBits();
initBrief();
initTipLinks();
initLenis();
document.querySelectorAll("[data-portfolio]").forEach(g => {
  const cats = g.dataset.portfolio ? g.dataset.portfolio.split(",") : null;
  initPortfolio(g, { cats, filtersEl: g.dataset.filters ? document.getElementById(g.dataset.filters) : null,
                     limit: g.dataset.limit ? +g.dataset.limit : 0 });
});

window.Magy = { openVideo, VIDEOS, CONFIG };
})();

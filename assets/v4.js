/* Magy Production — prima pagină, reels, feed, pagini de client. Se încarcă după /assets/site.js (folosește window.Magy). */
(() => {
const M = window.Magy; if (!M) return;
const V = M.VIDEOS;
const EN = (document.documentElement.lang || "ro").startsWith("en");
const CAT = EN ? { clinici: "Clinics", branduri: "Brands", horeca: "Hospitality", auto: "Automotive", evenimente: "Events", cinematic: "Cinematic", personal: "Personal" }
               : { clinici: "Clinici", branduri: "Branduri", horeca: "HoReCa", auto: "Automotive", evenimente: "Evenimente", cinematic: "Cinematic", personal: "Personal" };
const TX = EN ? { all: "All", want: "I want a video like this →", on: "Sound on", off: "Sound off", close: "Close", sound: "Sound", play: "▶ Play" }
              : { all: "Toate", want: "Vreau un video ca ăsta →", on: "Sunet pornit", off: "Sunet oprit", close: "Închide", sound: "Sunet", play: "▶ Play" };
const refLink = slug => EN ? `/en/?ref=${encodeURIComponent(slug)}#contact` : `/contact/?ref=${encodeURIComponent(slug)}`;
const byId = id => V.find(v => v.slug === id);
const title = v => typeof v.title === "object" ? (EN ? v.title.en : v.title.ro) : v.title;
const tcode = (s, fps = 30) => { const f = Math.floor(s * fps); const ff = f % fps, ss = Math.floor(f / fps);
  return [Math.floor(ss / 3600), Math.floor(ss / 60) % 60, ss % 60, ff].map(n => String(n).padStart(2, "0")).join(":"); };
const dur = s => Math.floor(s / 60) + ":" + String(Math.round(s % 60)).padStart(2, "0");
const canHover = matchMedia("(hover:hover) and (pointer:fine)").matches;
const clipNo = v => "A" + String(V.indexOf(v) + 1).padStart(3, "0");

/* ---------- HERO: showreel (fără sunet) + timecode ---------- */
const hv = document.querySelector(".hero video");
if (hv){
  const tc = document.querySelector(".hud .tc");
  const tick = () => { if (tc) tc.textContent = "TC " + tcode(hv.currentTime || 0); requestAnimationFrame(tick); };
  requestAnimationFrame(tick);
}

/* ---------- FEED pe tot ecranul ---------- */
let feed, feedList, feedObs, soundOn = false, current = null;
function buildFeed(){
  feed = document.createElement("div"); feed.className = "feed";
  feed.innerHTML = `<div class="bar"><span class="mono cnt"></span><div style="display:flex;gap:8px"><button class="snd" aria-label="${TX.sound}">🔇</button><button class="x" aria-label="${TX.close}">✕</button></div></div><div class="list"></div>`;
  document.body.appendChild(feed); feedList = feed.querySelector(".list");
  feed.querySelector(".x").onclick = closeFeed;
  feed.querySelector(".snd").onclick = () => toggleSound();
  addEventListener("keydown", e => {
    if (!feed.classList.contains("open")) return;
    if (e.key === "Escape") closeFeed();
    if (e.key === "ArrowDown" || e.key === "ArrowUp"){ e.preventDefault(); feedList.scrollBy({ top: (e.key === "ArrowDown" ? 1 : -1) * innerHeight, behavior: "smooth" }); }
    if (e.key === " " && current){ e.preventDefault(); current.paused ? current.play() : current.pause(); }
  });
}
function toggleSound(force){
  soundOn = force === undefined ? !soundOn : force;
  feed.querySelector(".snd").textContent = soundOn ? "🔊" : "🔇";
  feed.querySelectorAll("video").forEach(v => v.muted = !soundOn);
  if (current) { const h = current.closest(".item").querySelector(".muted-hint"); h.textContent = soundOn ? TX.on : TX.off; h.classList.add("show"); setTimeout(() => h.classList.remove("show"), 900); }
}
function openFeed(list, start){
  if (!feed) buildFeed();
  feedList.innerHTML = ""; if (feedObs) feedObs.disconnect();
  list.forEach((v, i) => {
    const it = document.createElement("section"); it.className = "item"; it.dataset.i = i;
    it.innerHTML = `<div class="stage9"><div class="progress"><i></i></div><video playsinline loop preload="none" poster="/assets/posters/${v.slug}.webp"></video>
      <div class="tap"></div><div class="muted-hint mono"></div>
      <div class="ov"><b></b><span class="mono"></span><a class="btn" href="${refLink(v.slug)}">${TX.want}</a></div></div>`;
    it.querySelector("b").textContent = title(v);
    it.querySelector(".ov .mono").textContent = clipNo(v) + " · " + v.cats.map(c => CAT[c]).join(" · ") + " · " + dur(v.d);
    const vid = it.querySelector("video"); vid.dataset.src = `/videos/${v.slug}.mp4`; vid.muted = !soundOn;
    vid.addEventListener("timeupdate", () => { if (vid.duration) it.querySelector(".progress i").style.width = (vid.currentTime / vid.duration * 100) + "%"; });
    it.querySelector(".tap").onclick = () => toggleSound();
    feedList.appendChild(it);
  });
  const load = el => { const v = el && el.querySelector("video"); if (v && !v.src) { v.src = v.dataset.src; v.preload = "auto"; } };
  feedObs = new IntersectionObserver(es => es.forEach(e => {
    const vid = e.target.querySelector("video");
    if (e.isIntersecting && e.intersectionRatio > .6){
      load(e.target); load(e.target.nextElementSibling);
      current = vid; vid.muted = !soundOn; vid.play().catch(() => {});
      feed.querySelector(".cnt").textContent = (+e.target.dataset.i + 1) + " / " + list.length;
    } else { vid.pause(); }
  }), { root: feedList, threshold: [0, .6, 1] });
  feedList.querySelectorAll(".item").forEach(el => feedObs.observe(el));
  feed.classList.add("open"); document.documentElement.style.overflow = "hidden";
  const target = feedList.children[start || 0];
  requestAnimationFrame(() => { feedList.scrollTop = target.offsetTop; });
}
function closeFeed(){
  feed.classList.remove("open"); document.documentElement.style.overflow = "";
  feed.querySelectorAll("video").forEach(v => { v.pause(); v.removeAttribute("src"); v.load(); });
  current = null;
}

/* ---------- șir de telefoane ---------- */
function phoneCard(v, onOpen){
  const el = document.createElement("div"); el.className = "phone"; el.tabIndex = 0; el.setAttribute("role", "button"); el.setAttribute("aria-label", title(v));
  el.innerHTML = `<div class="scr"><div class="notch"></div><img loading="lazy" alt="" src="/assets/posters/${v.slug}.webp"><div class="lab"><b></b><span class="mono"></span></div></div>
    <div class="meta mono"><span><i>●</i> ${clipNo(v)}</span><span>${dur(v.d)}</span></div>`;
  el.querySelector("b").textContent = title(v);
  el.querySelector(".lab .mono").textContent = v.cats.map(c => CAT[c]).join(" · ");
  let vid = null;
  el.play = () => { if (!vid){ vid = document.createElement("video"); vid.muted = true; vid.loop = true; vid.playsInline = true; vid.src = `/videos/${v.slug}.mp4`;
      vid.addEventListener("playing", () => el.classList.add("live")); el.querySelector(".scr").insertBefore(vid, el.querySelector(".lab")); }
    vid.play().catch(() => {}); };
  el.stop = () => { if (vid){ vid.pause(); el.classList.remove("live"); } };
  if (canHover){ el.onmouseenter = el.play; el.onmouseleave = el.stop; }
  el.onclick = onOpen; el.onkeydown = e => { if (e.key === "Enter") onOpen(); };
  return el;
}
document.querySelectorAll("[data-phones]").forEach(strip => {
  const only = strip.dataset.phones ? strip.dataset.phones.split(",") : null;
  const chips = strip.dataset.chips ? document.getElementById(strip.dataset.chips) : null;
  const all = only ? only.map(byId).filter(Boolean) : V.filter(v => !v.wide);
  let active = "all";
  let touchObs = null;
  function render(){
    const list = all.filter(v => active === "all" || v.cats.includes(active));
    strip.innerHTML = ""; if (touchObs) touchObs.disconnect();
    list.forEach((v, i) => strip.appendChild(phoneCard(v, () => openFeed(list, i))));
    if (!canHover){   // pe telefon pornește clipul din mijlocul șirului
      touchObs = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && e.intersectionRatio > .7 ? e.target.play() : e.target.stop()),
        { root: strip, threshold: [0, .7] });
      strip.querySelectorAll(".phone").forEach(p => touchObs.observe(p));
    }
    strip.scrollLeft = 0;
  }
  if (chips){
    const keys = ["all", ...Object.keys(CAT).filter(k => all.some(v => v.cats.includes(k)))];
    keys.forEach(k => { const b = document.createElement("button"); b.textContent = k === "all" ? TX.all : CAT[k]; if (k === active) b.className = "on";
      b.onclick = () => { active = k; chips.querySelectorAll("button").forEach(x => x.classList.toggle("on", x === b)); render(); }; chips.appendChild(b); });
  }
  const nav = strip.nextElementSibling && strip.nextElementSibling.classList.contains("phones-nav") ? strip.nextElementSibling : null;
  if (nav){ const step = () => strip.querySelector(".phone").offsetWidth + 20;
    nav.querySelector(".prev").onclick = () => strip.scrollBy({ left: -2 * step(), behavior: "smooth" });
    nav.querySelector(".next").onclick = () => strip.scrollBy({ left: 2 * step(), behavior: "smooth" }); }
  render();
});

/* ---------- filme orizontale ---------- */
document.querySelectorAll("[data-films]").forEach(box => {
  const list = box.dataset.films ? box.dataset.films.split(",").map(byId).filter(Boolean) : V.filter(v => v.wide);
  list.forEach(v => {
    const el = document.createElement("div"); el.className = "film";
    el.innerHTML = `<img loading="lazy" alt="" src="/assets/posters/${v.slug}.webp"><div class="top mono"><span>${clipNo(v)}</span><span>2.39:1 · ${dur(v.d)}</span></div>
      <div class="lab"><b></b><span class="mono">${TX.play}</span></div>`;
    el.querySelector("b").textContent = title(v);
    let vid = null;
    if (canHover){
      el.onmouseenter = () => { if (!vid){ vid = document.createElement("video"); vid.muted = true; vid.loop = true; vid.playsInline = true; vid.src = `/videos/${v.slug}.mp4`;
        vid.addEventListener("playing", () => el.classList.add("live")); el.insertBefore(vid, el.children[1]); } vid.play().catch(() => {}); };
      el.onmouseleave = () => { if (vid){ vid.pause(); el.classList.remove("live"); } };
    }
    el.onclick = () => M.openVideo(v);
    box.appendChild(el);
  });
});

/* ---------- color grading pe video ---------- */
document.querySelectorAll(".vba").forEach(box => {
  const [raw, gr] = box.querySelectorAll("video"), line = box.querySelector(".line");
  const set = x => { const r = box.getBoundingClientRect(); const p = Math.max(2, Math.min(98, (x - r.left) / r.width * 100));
    gr.style.clipPath = `inset(0 0 0 ${p}%)`; line.style.left = p + "%"; };
  let drag = false;
  box.addEventListener("pointerdown", e => { drag = true; box.setPointerCapture(e.pointerId); set(e.clientX); });
  box.addEventListener("pointermove", e => { if (drag) set(e.clientX); });
  ["pointerup", "pointercancel"].forEach(ev => box.addEventListener(ev, () => drag = false));
  gr.addEventListener("timeupdate", () => { if (Math.abs(raw.currentTime - gr.currentTime) > .06) raw.currentTime = gr.currentTime; });
  const io = new IntersectionObserver(es => es.forEach(e => { [raw, gr].forEach(v => e.isIntersecting ? v.play().catch(() => {}) : v.pause()); }), { threshold: .3 });
  io.observe(box);
});
})();

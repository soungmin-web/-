/* 세무회계 연담 – 공통 스크립트
   메뉴, 푸터, 오른쪽 아래 고정 버튼은 여기서 한 번만 정의하고 모든 페이지에 똑같이 넣습니다.
   메뉴 이름이나 연락처를 바꿀 때는 이 파일의 '설정' 부분만 고치면 됩니다. */

/* ===== 설정 ===== */
const SITE = {
  name: "세무회계 연담",
  ceo: "홍정민",
  tel: "010-5556-1394",
  email: "hongtax_62@naver.com",
  address: "서울특별시 영등포구 문래동6가 33 에이스엔에스타워 606호",
  blog: "https://blog.naver.com/hongtax62",
  blogId: "hongtax62",
  // 카카오톡 채널 주소 (예: https://pf.kakao.com/_xxxxxx). 비워두면 '채널 검색 안내'가 표시됩니다.
  kakao: "",
};

const NAV = [
  { key: "home", label: "HOME", href: "index.html" },
  { key: "about", label: "회사 소개", href: "about.html" },
  { key: "member", label: "세무사 소개", href: "member.html" },
  { key: "business", label: "업무 분야", href: "business.html", sub: [
    { label: "기장대리", href: "business.html#bookkeeping" },
    { label: "조세불복", href: "business.html#appeal" },
    { label: "양도소득세", href: "business.html#transfer" },
    { label: "상속세", href: "business.html#inheritance" },
    { label: "증여세", href: "business.html#gift" },
  ]},
  { key: "location", label: "오시는 길", href: "location.html" },
];

/* ===== 아이콘 ===== */
const ICON = {
  kakao: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 3.2C6.6 3.2 2.2 6.7 2.2 11c0 2.8 1.8 5.2 4.6 6.6l-.9 3.4c-.1.3.3.6.6.4l4.1-2.7c.5.1 1 .1 1.5.1 5.4 0 9.8-3.5 9.8-7.8S17.4 3.2 12 3.2z"/></svg>',
  naver: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M15.6 4v8.3L8.9 4H4v16h4.4v-8.3L15.1 20H20V4z"/></svg>',
  tel: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/></svg>',
  mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
};

/* ===== 공통 화면 요소 넣기 ===== */
const $ = (s, el = document) => el.querySelector(s);
const PAGE = document.body.dataset.page || "home";
const telHref = "tel:" + SITE.tel.replace(/-/g, "");

function buildHeader() {
  const items = NAV.map(n => `
    <li>
      <a href="${n.href}" class="${n.key === PAGE ? "active" : ""}">${n.label}</a>
      ${n.sub ? `<ul class="sub">${n.sub.map(s => `<li><a href="${s.href}">${s.label}</a></li>`).join("")}</ul>` : ""}
    </li>`).join("");
  const h = document.createElement("header");
  h.className = "site-header";
  h.innerHTML = `
    <div class="wrap nav">
      <a href="index.html" class="brand" aria-label="${SITE.name} 홈">
        <img src="assets/logo.png" alt="">
        <span><b>${SITE.name}</b><small>TAX &amp; ACCOUNTING</small></span>
      </a>
      <ul class="menu" id="menu">
        ${items}
        <li class="cta"><a href="contact.html" class="btn btn-gold">상담 예약</a></li>
      </ul>
      <button class="burger" id="burger" aria-label="메뉴 열기" aria-expanded="false" aria-controls="menu">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
      </button>
    </div>`;
  document.body.prepend(h);
}

function buildFooter() {
  const f = document.createElement("footer");
  f.className = "site-footer";
  f.innerHTML = `
    <div class="wrap">
      <div>
        <div class="brand"><img src="assets/logo.png" alt=""><span><b>${SITE.name}</b><small>TAX &amp; ACCOUNTING</small></span></div>
        <p>대표 세무사 ${SITE.ceo}</p>
        <p>${SITE.address}</p>
        <p>Tel <a href="${telHref}">${SITE.tel}</a> · Email <a href="mailto:${SITE.email}">${SITE.email}</a></p>
      </div>
      <div style="align-self:flex-end">
        <nav class="foot-nav">${NAV.map(n => `<a href="${n.href}">${n.label}</a>`).join("")}<a href="contact.html">상담 예약</a></nav>
        <p>© ${new Date().getFullYear()} ${SITE.name}. All rights reserved.</p>
      </div>
    </div>`;
  document.body.append(f);
}

function buildFloating() {
  const d = document.createElement("div");
  d.className = "float-sns";
  d.innerHTML = `
    <a href="#" class="kakao kakao-link" aria-label="카카오톡 채널 상담">${ICON.kakao}<span class="label">카카오톡 상담</span></a>
    <a href="${SITE.blog}" class="naver" target="_blank" rel="noopener" aria-label="네이버 블로그">${ICON.naver}<span class="label">네이버 블로그</span></a>`;
  document.body.append(d);
  const t = document.createElement("div");
  t.className = "toast"; t.id = "toast"; t.setAttribute("role", "status");
  document.body.append(t);
}

buildHeader(); buildFooter(); buildFloating();

const toast = (msg) => { const t = $("#toast"); t.textContent = msg; t.classList.add("show"); clearTimeout(t._h); t._h = setTimeout(() => t.classList.remove("show"), 3000); };

/* ===== 헤더 동작 ===== */
const header = $(".site-header");
const onScroll = () => header.classList.toggle("solid", scrollY > 40);
addEventListener("scroll", onScroll, { passive: true }); onScroll();
const burger = $("#burger"), menu = $("#menu");
const closeMenu = () => { menu.classList.remove("open"); header.classList.remove("menu-open"); burger.setAttribute("aria-expanded", false); };
burger.addEventListener("click", () => {
  const open = menu.classList.toggle("open");
  header.classList.toggle("menu-open", open);
  burger.setAttribute("aria-expanded", open);
});
menu.addEventListener("click", e => { if (e.target.closest("a")) closeMenu(); });

/* ===== 등장 애니메이션 ===== */
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: .12 });
document.querySelectorAll(".reveal").forEach(el => io.observe(el));

/* ===== 카카오톡 ===== */
document.querySelectorAll(".kakao-link").forEach(a => {
  if (SITE.kakao) { a.href = SITE.kakao; a.target = "_blank"; a.rel = "noopener"; }
  else a.addEventListener("click", e => {
    e.preventDefault();
    try { navigator.clipboard.writeText(SITE.name).catch(() => {}); } catch (_) {}
    toast(`카카오톡에서 '${SITE.name}' 채널을 검색해 주세요. (채널명이 복사되었습니다)`);
  });
});

/* ===== 주소 복사 ===== */
const copyBtn = $("#copyAddr");
if (copyBtn) copyBtn.addEventListener("click", () => {
  try { navigator.clipboard.writeText(SITE.address).then(() => toast("주소가 복사되었습니다."), () => toast(SITE.address)); } catch (_) { toast(SITE.address); }
});

/* ===== 업무 분야: 하위 메뉴 표시 ===== */
const subnav = $(".subnav");
if (subnav) {
  const links = [...subnav.querySelectorAll("a")];
  const secs = links.map(a => document.querySelector(a.getAttribute("href"))).filter(Boolean);
  const mark = () => {
    let cur = secs[0];
    secs.forEach(s => { if (s.getBoundingClientRect().top < 200) cur = s; });
    links.forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + cur.id));
  };
  addEventListener("scroll", mark, { passive: true }); mark();
}

/* ===== 상담 예약 ===== */
const form = $("#form");
if (form) {
  const topic = new URLSearchParams(location.search).get("topic");
  if (topic) form.topic.value = topic;
  form.addEventListener("submit", e => {
    e.preventDefault();
    const name = form.name.value.trim(), tel = form.tel.value.trim();
    if (!name || !tel) { toast("성함과 연락처를 입력해 주세요."); (name ? form.tel : form.name).focus(); return; }
    if (!$("#f-agree").checked) { toast("개인정보 수집 및 이용에 동의해 주세요."); return; }
    const subject = `[상담 예약] ${form.topic.value} - ${name}`;
    const body = `성함: ${name}\n연락처: ${tel}\n상담 분야: ${form.topic.value}\n희망 상담일: ${form.date.value || "협의"}\n\n문의 내용:\n${form.msg.value.trim() || "-"}\n`;
    location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    toast("이메일 창이 열립니다. 내용을 확인한 뒤 보내기를 눌러 주세요.");
  });
}

/* ===== 블로그 자동 연동 (홈) =====
   네이버 블로그 RSS를 공개 변환 서비스(rss2json → allorigins 순서)로 불러옵니다.
   둘 다 실패하면 assets/posts.js 에 저장해 둔 글을 보여줍니다. */
const postsBox = $("#posts");
if (postsBox) {
  const RSS_URL = `https://rss.blog.naver.com/${SITE.blogId}.xml`;
  const FALLBACK = window.FALLBACK_POSTS || [];
  let POSTS = [], CUR = "all";
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const clean = html => {
    const d = document.createElement("div"); d.innerHTML = html || "";
    return d.textContent.replace(/^안녕하세요\.[^.]*입니다\.\s*어려운 세법을[^.]*\.\s*/, "").replace(/\s+/g, " ").trim();
  };
  const imgOf = html => ((html || "").match(/<img[^>]+src="([^"]+)"/) || [])[1] || "";
  const ymd = v => {
    const s = String(v);
    if (/^\d{4}-\d{2}-\d{2}/.test(s)) return s.slice(0, 10);
    const d = new Date(s);
    return isNaN(d) ? "" : `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  };
  const norm = p => ({ ...p, u: String(p.u).split("?")[0] });
  const withTimeout = (pr, ms) => Promise.race([pr, new Promise((_, r) => setTimeout(() => r(new Error("timeout")), ms))]);

  async function viaRss2json() {
    const r = await withTimeout(fetch("https://api.rss2json.com/v1/api.json?rss_url=" + encodeURIComponent(RSS_URL)), 7000);
    const j = await r.json();
    if (j.status !== "ok") throw new Error("rss2json");
    return j.items.map(it => ({ t: it.title, u: it.guid || it.link, c: (it.categories || [])[0] || "", d: ymd(it.pubDate), s: clean(it.description).slice(0, 110) + "…", i: it.thumbnail || imgOf(it.description) }));
  }
  async function viaAllOrigins() {
    const r = await withTimeout(fetch("https://api.allorigins.win/raw?url=" + encodeURIComponent(RSS_URL)), 7000);
    const xml = new DOMParser().parseFromString(await r.text(), "text/xml");
    const items = [...xml.querySelectorAll("item")];
    if (!items.length) throw new Error("allorigins");
    const g = (it, t) => it.getElementsByTagName(t)[0]?.textContent?.trim() || "";
    return items.map(it => ({ t: g(it, "title"), u: g(it, "guid") || g(it, "link"), c: g(it, "category"), d: ymd(g(it, "pubDate")), s: clean(g(it, "description")).slice(0, 110) + "…", i: imgOf(g(it, "description")) }));
  }
  const merge = live => {
    const map = new Map();
    [...live, ...FALLBACK].map(norm).forEach(p => { if (!map.has(p.u)) map.set(p.u, p); });
    return [...map.values()].sort((a, b) => b.d.localeCompare(a.d));
  };
  const render = () => {
    const list = POSTS.filter(p => CUR === "all" || p.c === CUR).slice(0, 6);
    postsBox.innerHTML = list.length ? list.map(p => `
      <a class="post" href="${esc(p.u)}" target="_blank" rel="noopener">
        <div class="thumb">
          <div class="ph"><img src="assets/logo.png" alt=""></div>
          ${p.i ? `<img src="${esc(p.i)}" alt="" loading="lazy" referrerpolicy="no-referrer" onerror="this.remove()">` : ""}
        </div>
        <div class="post-body">
          ${p.c ? `<span class="cat">${esc(p.c)}</span>` : ""}
          <h3>${esc(p.t.replace(/^\[문래동 세무사\]\s*/, ""))}</h3>
          <p>${esc(p.s)}</p>
          <time>${esc(p.d)}</time>
        </div>
      </a>`).join("") : `<p style="color:var(--muted)">아직 글이 없습니다. <a href="${SITE.blog}" target="_blank" rel="noopener" style="color:var(--sand)">블로그에서 보기 →</a></p>`;
  };
  document.querySelectorAll(".tab").forEach(b => b.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach(x => x.setAttribute("aria-selected", x === b));
    CUR = b.dataset.cat; render();
  }));
  (async () => {
    POSTS = merge([]); render();
    let live = [];
    for (const src of [viaRss2json, viaAllOrigins]) {
      try { live = await src(); if (live.length) break; } catch (e) {}
    }
    const sync = $("#sync"), txt = $("#syncText");
    if (live.length) {
      POSTS = merge(live); render();
      sync.classList.add("live");
      txt.textContent = `블로그와 자동 연동 중 · 최신 글 ${POSTS[0].d}`;
    } else {
      txt.textContent = "지금은 블로그 최신 글을 불러오지 못해 저장된 글을 보여드리고 있어요.";
    }
  })();
}

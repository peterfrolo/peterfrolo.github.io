// year
document.getElementById("year").textContent = new Date().getFullYear();

// mobile menu
const menuBtn = document.getElementById("menuBtn");
const nav = document.querySelector(".nav");
menuBtn?.addEventListener("click", () => {
  const open = nav.classList.toggle("isOpen");
  menuBtn.setAttribute("aria-expanded", String(open));
});

// filtering
const chips = Array.from(document.querySelectorAll(".chip"));
const tiles = Array.from(document.querySelectorAll(".tile"));

chips.forEach(chip => {
  chip.addEventListener("click", () => {
    chips.forEach(c => {
      c.classList.remove("isActive");
      c.setAttribute("aria-selected", "false");
    });
    chip.classList.add("isActive");
    chip.setAttribute("aria-selected", "true");

    const filter = chip.dataset.filter;
    tiles.forEach(t => {
      const tags = (t.dataset.tags || "").split(" ").filter(Boolean);
      const show = filter === "all" || tags.includes(filter);
      t.classList.toggle("isHidden", !show);
    });
  });
});

// lightbox
const lb = document.getElementById("lightbox");
const lbImg = document.getElementById("lbImg");
const lbClose = document.getElementById("lbClose");

tiles.forEach(t => {
  t.addEventListener("click", () => {
    const img = t.querySelector("img");
    if (!img) return;
    lbImg.src = img.src;
    lbImg.alt = img.alt || "Fotografia";
    lb.showModal();
  });
});

lbClose?.addEventListener("click", () => lb.close());
lb?.addEventListener("click", (e) => {
  const rect = lbImg.getBoundingClientRect();
  const inImg =
    e.clientX >= rect.left && e.clientX <= rect.right &&
    e.clientY >= rect.top && e.clientY <= rect.bottom;
  if (!inImg) lb.close();
});

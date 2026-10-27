(() => {
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

  // Mobile navigation stays keyboard-friendly and closes after a destination is chosen.
  const menuToggle = $(".menu-toggle");
  const mobileMenu = $("#mobile-menu");

  const closeMenu = () => {
    if (!menuToggle || !mobileMenu) return;
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    mobileMenu.hidden = true;
    document.body.classList.remove("menu-open");
  };

  menuToggle?.addEventListener("click", () => {
    if (!mobileMenu) return;
    const shouldOpen = menuToggle.getAttribute("aria-expanded") !== "true";
    menuToggle.setAttribute("aria-expanded", String(shouldOpen));
    menuToggle.setAttribute("aria-label", shouldOpen ? "Close navigation" : "Open navigation");
    mobileMenu.hidden = !shouldOpen;
    document.body.classList.toggle("menu-open", shouldOpen);
  });

  $$("#mobile-menu a").forEach((link) => link.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  // Text-only example switcher. These are editorial examples, not product screenshots.
  const examples = {
    love: {
      kicker: "A LITTLE LOVE NOTE",
      title: "to my favourite person,",
      message: "I made you a tiny corner of the internet. A place for the little things that somehow mean everything.",
      signoff: "always, me.",
      index: "01 — LOVE NOTE"
    },
    birthday: {
      kicker: "ANOTHER TRIP AROUND THE SUN",
      title: "today is all about you.",
      message: "A little collection of good memories, ridiculous jokes, and all the reasons the world is better with you in it.",
      signoff: "your biggest fan.",
      index: "02 — BIRTHDAY"
    },
    memories: {
      kicker: "THE LITTLE THINGS WE KEEP",
      title: "remember this one?",
      message: "The ordinary days that turned into our favourite stories. A place to keep the moments that still make me smile.",
      signoff: "more memories soon.",
      index: "03 — PHOTO STORY"
    },
    "just-because": {
      kicker: "NO OCCASION NEEDED",
      title: "just wanted you to know.",
      message: "There doesn't have to be a big reason. Sometimes someone makes life better, and they deserve to hear it.",
      signoff: "that's all. that's everything.",
      index: "04 — JUST BECAUSE"
    }
  };

  const exampleButtons = $$(".template-option[data-example]");
  const sampleFields = {
    kicker: $("#sample-kicker"),
    title: $("#sample-title"),
    message: $("#sample-message"),
    signoff: $("#sample-signoff"),
    index: $("#sample-index")
  };

  exampleButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const example = examples[button.dataset.example];
      if (!example) return;

      exampleButtons.forEach((item) => {
        const isActive = item === button;
        item.classList.toggle("is-active", isActive);
        item.setAttribute("aria-pressed", String(isActive));
      });

      Object.entries(sampleFields).forEach(([key, element]) => {
        if (element) element.textContent = example[key];
      });
    });
  });
})();
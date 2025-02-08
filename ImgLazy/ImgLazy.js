class ImgLazy extends HTMLElement {
  constructor() {
    super();
    this.img = null;
    this.observer = null;
    this.intersectionObserver = null;
    this.isLoaded = false;
  }

  static get observedAttributes() {
    return ["src"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "src" && this.img && !this.isLoaded) {
      this.img.setAttribute("data-src", newValue);
    }
  }

  connectedCallback() {
    const src = this.getAttribute("src");
    if (!src) {
      console.warn("ImgLazy: No src attribute provided");
      return;
    }

    this.setupImage(src);
    this.setupMutationObserver();
    this.setupIntersectionObserver();

    this.appendChild(this.img);
    this.intersectionObserver.observe(this);
  }

  setupImage(src) {
    this.img = document.createElement("img");
    this.img.setAttribute("data-src", src);

    // Copy all attributes except src to the img element
    Array.from(this.attributes)
      .filter((attr) => attr.name !== "src")
      .forEach((attr) => this.img.setAttribute(attr.name, attr.value));
  }

  setupMutationObserver() {
    this.observer = new MutationObserver((mutations) => {
      mutations
        .filter((mutation) => mutation.type === "attributes" && !this.isLoaded)
        .forEach((mutation) => {
          const attr = mutation.attributeName;
          if (attr !== "src") {
            this.img.setAttribute(attr, this.getAttribute(attr));
          }
        });
    });

    this.observer.observe(this, { attributes: true });
  }

  setupIntersectionObserver() {
    this.intersectionObserver = new IntersectionObserver((entries) => {
      const isIntersecting = entries.some((entry) => entry.isIntersecting);
      if (isIntersecting && !this.isLoaded) {
        this.loadImage();
        this.intersectionObserver.unobserve(this);
      }
    });
  }

  loadImage() {
    if (!this.img) {
      console.warn("ImgLazy: No img element found");
      return;
    }
    const src = this.img.getAttribute("data-src");
    if (!src) {
      console.warn("ImgLazy: No data-src attribute found");
      return;
    }
    this.img.src = src;
    this.isLoaded = true;
    this.img.removeAttribute("data-src");
  }

  disconnectedCallback() {
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
      this.intersectionObserver = null;
    }
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
    this.img = null;
    this.isLoaded = false;
  }
}

customElements.define("img-lazy", ImgLazy);

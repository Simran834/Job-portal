document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll("header.nav nav a");
  links.forEach(link => {
    if (link.getAttribute("href") === location.pathname.split("/").pop()) {
      link.classList.add("active");
    }
  });
});

/*
 * @name         Gmail Simple Copy Email Body Button
 * @namespace    https://m.shubbar.ca/
 * @version      1.1
 * @description  Adds a button to copy the email body in Gmail, saving more time and clicks
 * @author       Mustafa Shubbar
 * @match        https://mail.google.com/*
 * @grant        none
 * @run-at       document-idle
 */

function addCopyButton() {
  if (document.getElementById("copy-email-body-btn")) return;

  const emailBody = document.querySelector("div.a3s");
  if (!emailBody || !emailBody.parentElement) return;

  const btn = document.createElement("button");
  btn.id = "copy-email-body-btn";
  btn.innerText = "📆 One Click Body Copy";
  btn.style.marginBottom = "8px";
  btn.style.padding = "6px 12px";
  btn.style.fontSize = "13px";
  btn.style.background = "#0D9488";
  btn.style.color = "white";
  btn.style.border = "none";
  btn.style.borderRadius = "4px";
  btn.style.cursor = "pointer";

  btn.onclick = () => {
    const clone = emailBody.cloneNode(true);
    const scripts = clone.querySelectorAll("script, style");
    scripts.forEach((el) => el.remove());
    const text = clone.innerText || "";
    navigator.clipboard.writeText(text).then(() => {
      btn.innerText = "✅ Copied!";
      setTimeout(() => (btn.innerText = "📆 One Click Body Copy"), 1500);
    });
  };

  // Insert before the email body
  const wrapper = document.createElement("div");
  wrapper.style.display = "flex";
  wrapper.style.justifyContent = "flex-end";
  wrapper.style.marginBottom = "6px";
  wrapper.appendChild(btn);
  emailBody.parentElement.insertBefore(wrapper, emailBody);
}

function watchEmailChanges() {
  const mainArea = document.querySelector("div[role='main']");
  if (!mainArea) return;

  const observer = new MutationObserver(() => {
    setTimeout(addCopyButton, 500);
  });

  observer.observe(mainArea, {
    childList: true,
    subtree: true,
  });
}

// Initial run
window.addEventListener("load", () => {
  setTimeout(() => {
    addCopyButton();
    watchEmailChanges();
  }, 1500);
});

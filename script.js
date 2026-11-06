// ECLIPSE MC website settings
// Minecraft server address
const SERVER_IP = "rex-1.drexhost.in:19101";
const STORE_TICKET_URL = "https://discord.com/channels/1548373104718254283/1549390117133746269";

const products = {
  ranks: [
    {name:"Elite", price:"₹69", usd:"$0.79", detail:"Monthly rank", type:"MONTHLY RANK"},
    {name:"Knight", price:"₹179", usd:"$2.09", detail:"Monthly rank", type:"MONTHLY RANK"},
    {name:"Royal", price:"₹299", usd:"$3.49", detail:"Monthly rank", type:"MONTHLY RANK"},
    {name:"Imperial", price:"₹489", usd:"$5.69", detail:"Monthly rank", type:"MONTHLY RANK"},
    {name:"Warrior", price:"₹569", usd:"$6.59", detail:"Monthly rank", type:"MONTHLY RANK"}
  ],
  special: [
    {name:"ECLIPSE", price:"₹799", usd:"$9.29", detail:"Permanent rank · 5 available per season", type:"SPECIAL EDITION", limited:true}
  ],
  coins: [
    {name:"700 Coins", price:"₹39", usd:"$0.49", detail:"ECLIPSE Coins", type:"COIN PACKAGE"},
    {name:"1,750 Coins", price:"₹89", usd:"$1.09", detail:"ECLIPSE Coins", type:"COIN PACKAGE"},
    {name:"3,700 Coins", price:"₹179", usd:"$2.09", detail:"ECLIPSE Coins", type:"COIN PACKAGE"},
    {name:"7,600 Coins", price:"₹359", usd:"$4.19", detail:"ECLIPSE Coins", type:"COIN PACKAGE"},
    {name:"11,500 Coins", price:"₹539", usd:"$6.19", detail:"ECLIPSE Coins", type:"COIN PACKAGE"},
    {name:"15,800 Coins", price:"₹709", usd:"$8.09", detail:"ECLIPSE Coins", type:"COIN PACKAGE"}
  ]
};

const grid = document.getElementById("productGrid");

function showProducts(category) {
  if (!grid || !products[category]) return;
  grid.innerHTML = products[category].map(item => `
    <article class="product-card">
      ${item.limited ? '<span class="limited">✦ LIMITED · 5 / SEASON</span>' : ''}
      <div class="product-type">${item.type}</div>
      <h3>${item.name}</h3>
      <div class="price">${item.price} <small>/ ${item.usd}</small></div>
      <p class="product-desc">${item.detail}${category === "ranks" ? " · 30 days" : ""}</p>
      <button class="buy-button" type="button" data-product="${item.name}">BUY NOW ↗</button>
    </article>`).join("");
}

showProducts("ranks");

document.querySelectorAll(".tab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    showProducts(tab.dataset.tab);
  });
});

if (grid) {
  grid.addEventListener("click", event => {
    const button = event.target.closest("[data-product]");
    if (!button) return;
    const product = button.dataset.product;
    // Opens the Discord store-ticket channel. It does not create a ticket automatically.
    window.open(STORE_TICKET_URL, "_blank", "noopener");
  });
}

const toast = document.getElementById("toast");

function notify(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2300);
}

const copyButton = document.getElementById("copyIp");
if (copyButton) {
  copyButton.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(SERVER_IP);
      notify("Server IP copied!");
    } catch {
      notify("Server IP: " + SERVER_IP);
    }
  });
}

const serverIpText = document.getElementById("serverIpText");
if (serverIpText) serverIpText.textContent = "SERVER IP: " + SERVER_IP;

const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");
if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => nav.classList.toggle("open"));
  nav.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => nav.classList.remove("open"));
  });
}

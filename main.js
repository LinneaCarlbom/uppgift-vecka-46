// Starta Pixi och lägg dess canvas på sidan
const app = new PIXI.Application();
await app.init({ resizeTo: window, background: "#5a2dff" });
document.body.appendChild(app.canvas);

const dots = new PIXI.Graphics();
app.stage.addChild(dots);

// En funktion som gör om ett värde (0 = kallt, 1 = varmt) till en färg
function heatColor(t) {
  if (t < 0.25) return 0x2a0a6b; // mörklila
  if (t < 0.5)  return 0xa000a0; // magenta
  if (t < 0.75) return 0xff3b00; // rödorange
  if (t < 0.9)  return 0xffb000; // gul
  return 0xffffff;               // vitt
}

// Kommer ihåg var musen är
const mouse = { x: 0, y: 0 };
window.addEventListener("pointermove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});


// Varje bildruta: ett rutnät av prickar som växer när musen är nära
app.ticker.add(() => {
  dots.clear();
  for (let x = 0; x < app.screen.width; x += 30) {
    for (let y = 0; y < app.screen.height; y += 30) {
      const distance = Math.hypot(x - mouse.x, y - mouse.y);

      // Värde mellan 0 och 1 beroende på avstånd till musen
      const heat = Math.max(0, 1 - distance / 300);

      dots.circle(x, y, 2 + heat * 8);
      dots.fill(heatColor(heat)); // fill efter varje cirkel, så varje prick får sin egen färg
    }
  }
});


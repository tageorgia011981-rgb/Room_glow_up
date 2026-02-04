<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>

<title>Room Glow Up</title>

<!-- GOOGLE FONT: LIMELIGHT -->
<link href="https://fonts.googleapis.com/css2?family=LimeLight&display=swap" rel="stylesheet">

<style>
/* ================================
   CORE RESET
================================ */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html, body {
  width: 100%;
  height: 100%;
  background-color: #000;
  font-family: Arial, Helvetica, sans-serif;
}

/* ================================
   LOCKED STUDIO BACKGROUND
================================ */
body {
  background-image: url("Assets/backgroundG&Blk.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

/* ================================
   HEADER
================================ */
header {
  width: 100%;
  background: linear-gradient(to bottom, #162127, #0C1519);
  border-bottom: 1px solid #0C1519;
  position: relative;
  z-index: 10;
}

/* ================================
   MAIN HEADER BAR
================================ */
.header-main {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 34px 28px 10px;
}

/* HOLLYWOOD-STYLE TITLE */
.site-title {
  font-family: 'LimeLight', cursive;
  color: #CF9D7B;
  font-size: 72px;
  letter-spacing: 6px;
  text-align: center;
  text-transform: uppercase;
  text-shadow:
    0 2px 0 rgba(0,0,0,0.6),
    0 6px 18px rgba(0,0,0,0.65),
    0 0 10px rgba(207,157,123,0.35);
}

/* ================================
   TAGLINE
================================ */
.header-tagline {
  display: flex;
  justify-content: center;
  padding: 6px 28px 20px;
}

.header-tagline span {
  font-family: 'LimeLight', cursive;
  color: #CF9D7B;
  font-size: 26px;
  letter-spacing: 3px;
  opacity: 0.9;
}

/* ================================
   NAV BAR
================================ */
.sub-header {
  display: flex;
  justify-content: center;
  gap: 18px;
  padding: 14px 0 18px;
  border-top: 1px solid #0C1519;
}

/* ================================
   LIBRARY FILE LABEL TAB
================================ */
.nav-tab {
  position: relative;
  min-width: 160px;
  padding: 14px 16px 12px;
  text-align: center;
  color: #000; /* old-style typewriter black */
  font-family: 'Courier New', Courier, monospace;
  font-weight: bold;
  font-size: 16px;
  letter-spacing: 1px;
  cursor: pointer;

  /* Gunmetal drawer base */
  background: linear-gradient(
    to bottom,
    #1E2B31,
    #0C1519
  );

  border-radius: 3px;

  /* Depth */
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,0.08),
    inset 0 -2px 3px rgba(0,0,0,0.6),
    0 4px 8px rgba(0,0,0,0.7);

  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

/* Metal lip / pull edge */
.nav-tab::before {
  content: "";
  position: absolute;
  left: 10%;
  right: 10%;
  bottom: -6px;
  height: 8px;

  background: linear-gradient(
    to bottom,
    #CFD2D4,
    #8A8E91
  );

  border-radius: 0 0 3px 3px;

  box-shadow:
    inset 0 1px 0 rgba(255,255,255,0.6),
    0 3px 4px rgba(0,0,0,0.7);
}

/* Screw holes */
.nav-tab::after {
  content: "•      •";
  position: absolute;
  top: 6px;
  left: 0;
  right: 0;
  font-size: 10px;
  letter-spacing: 26px;
  text-align: center;
  color: #CF9D7B;
  opacity: 0.8;
}

/* Hover: lift like a real pull */
.nav-tab:hover {
  transform: translateY(-3px);
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,0.1),
    inset 0 -2px 4px rgba(0,0,0,0.7),
    0 8px 14px rgba(0,0,0,0.85);
}

/* Active state */
.nav-tab.active {
  box-shadow:
    inset 0 0 0 1px #CF9D7B,
    inset 0 -2px 4px rgba(0,0,0,0.7),
    0 6px 12px rgba(0,0,0,0.8);
}

/* ================================
   STAGE AREA
================================ */
#stage {
  width: 100%;
  height: calc(100vh - 240px);
  display: flex;
  align-items: center;
  justify-content: center;
}

.stage-placeholder {
  color: #CF9D7B;
  opacity: 0.35;
  letter-spacing: 1px;
  font-size: 14px;
}

/* ================================
   RAIN HALLWAY CLASSES (LOCKED)
================================ */
.rain-hallway-1,
.rain-hallway-2 {
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  background-color: #000;
}

.rain-hallway-1 { background-image: url("Assets/rain1.jpg"); }
.rain-hallway-2 { background-image: url("Assets/rain2.jpg"); }

</style>
</head>

<body>

<header>

  <div class="header-main">
    <div class="site-title">Room Glow Up</div>
  </div>

  <div class="header-tagline">
    <span>Where Your Dream Space Comes To Life</span>
  </div>

  <div class="sub-header">
    <div class="nav-tab active">Rooms</div>
    <div class="nav-tab">Furniture Catalog</div>
    <div class="nav-tab">Decor Closet</div>
    <div class="nav-tab">Inspirational Walkthru</div>
    <div class="nav-tab">Save / Checkout</div>
  </div>

</header>

<main id="stage">
  <div class="stage-placeholder">
    STAGE READY — AWAITING INTERACTIONS
  </div>
</main>

</body>
</html>

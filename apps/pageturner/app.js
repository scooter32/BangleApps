/*  Bangle.js 2 — Swipe Page Turner
 *  --------------------------------
 *  Horizontal swipe  ->  Volume Up / Volume Down   (media keys)
 *  Vertical swipe    ->  Arrow Up / Arrow Down      (keyboard keys)
 *  Physical button   ->  Space                      (keyboard key)
 *
 *  Sends the action to a paired device as a Bluetooth HID keyboard,
 *  and shows the latest action on the watch screen.
 *
 *  IMPORTANT: HID can't be enabled on an active wireless connection.
 *  Upload this, disconnect from the IDE, then pair the Bangle as a
 *  keyboard from your Palma's Bluetooth settings.
 */

// ---------------------------------------------------------------
//  KEY MAP  — edit here after you test which keys your apps accept
// ---------------------------------------------------------------
//  For the two keyboard-key directions (vertical swipe + button),
//  change kb.KEY.UP / kb.KEY.DOWN / kb.KEY.SPACE to whatever works.
//  Handy alternatives: kb.KEY.LEFT, kb.KEY.RIGHT, kb.KEY.PAGE_UP,
//  kb.KEY.PAGE_DOWN.  (Volume keys are handled separately below.)

var kb = require("ble_hid_keyboard");

var MAP = {
  swipeLeft:  { type: "media", code: "VOLDOWN", label: "Vol \u2013  (prev)" },
  swipeRight: { type: "media", code: "VOLUP",   label: "Vol +  (next)" },
  swipeUp:    { type: "key",   key: kb.KEY.UP,   label: "Arrow Up" },
  swipeDown:  { type: "key",   key: kb.KEY.DOWN, label: "Arrow Down" },
  button:     { type: "key",   key: kb.KEY.SPACE, label: "Space" }
};

// ---------------------------------------------------------------
//  HID report setup
// ---------------------------------------------------------------
//  Volume keys are "Consumer Control" keys, not normal keyboard
//  keys, so we register a second HID report for them alongside the
//  keyboard report. Report ID 1 = keyboard, Report ID 2 = consumer.

var HID_KEYBOARD = [
  0x05, 0x01, 0x09, 0x06, 0xA1, 0x01, 0x85, 0x01,
  0x05, 0x07, 0x19, 0xE0, 0x29, 0xE7, 0x15, 0x00,
  0x25, 0x01, 0x75, 0x01, 0x95, 0x08, 0x81, 0x02,
  0x95, 0x01, 0x75, 0x08, 0x81, 0x03, 0x95, 0x06,
  0x75, 0x08, 0x15, 0x00, 0x25, 0x65, 0x05, 0x07,
  0x19, 0x00, 0x29, 0x65, 0x81, 0x00, 0xC0
];

var HID_CONSUMER = [
  0x05, 0x0C, 0x09, 0x01, 0xA1, 0x01, 0x85, 0x02,
  0x15, 0x00, 0x25, 0x01, 0x75, 0x01, 0x95, 0x02,
  0x09, 0xE9, 0x09, 0xEA, 0x81, 0x02, 0x95, 0x06,
  0x81, 0x01, 0xC0
];

var hidReport = HID_KEYBOARD.concat(HID_CONSUMER);

function setupHID() {
  try {
    NRF.setServices(undefined, { hid: hidReport });
  } catch (e) {
    // setServices can throw if a connection is active; safe to ignore,
    // it takes effect once disconnected and re-paired.
  }
}

// ---------------------------------------------------------------
//  Senders
// ---------------------------------------------------------------
var busy = false;

// Standard keyboard key. Report ID 1, format: [id, mods, key]
function sendKey(code) {
  if (busy) return;
  busy = true;
  try {
    NRF.sendHIDReport([1, 0, code, 0, 0, 0, 0, 0], function () {
      NRF.sendHIDReport([1, 0, 0, 0, 0, 0, 0, 0], function () {
        busy = false;
      });
    });
  } catch (e) { busy = false; }
}

// Consumer/media key. Report ID 2, one bit per control:
//   bit0 = Volume Up (0x01), bit1 = Volume Down (0x02)
function sendMedia(which) {
  if (busy) return;
  busy = true;
  var bits = (which === "VOLUP") ? 0x01 : 0x02;
  try {
    NRF.sendHIDReport([2, bits], function () {
      NRF.sendHIDReport([2, 0], function () {
        busy = false;
      });
    });
  } catch (e) { busy = false; }
}

function doAction(a) {
  if (!a) return;
  if (a.type === "media") sendMedia(a.code);
  else sendKey(a.key);
  Bangle.buzz(40);      // short confirming buzz
  showAction(a.label);
}

// ---------------------------------------------------------------
//  Screen
// ---------------------------------------------------------------
var lastAction = "Ready";
var lastTime = "";

function showAction(label) {
  lastAction = label;
  var d = new Date();
  lastTime = ("0" + d.getHours()).substr(-2) + ":" +
             ("0" + d.getMinutes()).substr(-2) + ":" +
             ("0" + d.getSeconds()).substr(-2);
  draw();
}

function draw() {
  g.clear();
  g.setFontAlign(0, 0);

  // title
  g.setFont("6x8", 2);
  g.drawString("Page Turner", g.getWidth() / 2, 26);

  // connection state
  g.setFont("6x8", 1);
  var connected = NRF.getSecurityStatus().connected;
  g.drawString(connected ? "Connected" : "Not paired",
               g.getWidth() / 2, 46);

  // last action — the big readout
  g.setFont("Vector", 28);
  g.drawString(lastAction, g.getWidth() / 2, g.getHeight() / 2 + 6);

  // timestamp of last action
  g.setFont("6x8", 1);
  g.drawString(lastTime, g.getWidth() / 2, g.getHeight() - 34);

  // hint strip
  g.drawString("< vol >   ^ up/dn v   btn=spc",
               g.getWidth() / 2, g.getHeight() - 16);

  g.flip();
}

// ---------------------------------------------------------------
//  Input handlers
// ---------------------------------------------------------------
//  On Bangle.js 2 the swipe event gives (lr, ud):
//    lr = -1 left, 1 right ;  ud = -1 up, 1 down
Bangle.on("swipe", function (lr, ud) {
  if (lr === -1)      doAction(MAP.swipeLeft);
  else if (lr === 1)  doAction(MAP.swipeRight);
  else if (ud === -1) doAction(MAP.swipeUp);
  else if (ud === 1)  doAction(MAP.swipeDown);
});

// Physical button -> Space
setWatch(function () {
  doAction(MAP.button);
}, BTN, { edge: "rising", repeat: true, debounce: 50 });

// Redraw on connect/disconnect so the status line stays honest
NRF.on("connect", draw);
NRF.on("disconnect", draw);

// ---------------------------------------------------------------
//  Boot
// ---------------------------------------------------------------
function onInit() {
  setupHID();
  Bangle.setLCDTimeout(0);   // keep screen on while reading; set to
                             // e.g. 30 to save battery if you prefer
  draw();
}

onInit();

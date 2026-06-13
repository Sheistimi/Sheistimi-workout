import { useState, useEffect, useRef } from "react";

// ── PIN LOCK ─────────────────────────────────────────────────────
const CORRECT_PIN = "2420";

function PinLock({ onUnlock }) {
  const [pin, setPin] = useState("");
  const [shake, setShake] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const handlePress = (val) => {
    if (pin.length >= 4) return;
    const newPin = pin + val;
    setPin(newPin);
    if (newPin.length === 4) {
      setTimeout(() => {
        if (newPin === CORRECT_PIN) {
          onUnlock();
        } else {
          setShake(true);
          setAttempts(a => a + 1);
          setTimeout(() => { setShake(false); setPin(""); }, 600);
        }
      }, 200);
    }
  };

  const handleDelete = () => setPin(p => p.slice(0, -1));

  const keys = ["1","2","3","4","5","6","7","8","9","","0","⌫"];

  return (
    <div style={{ minHeight: "100vh", background: "#0D0F1A", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "'Inter', sans-serif" }}>
      <svg width="52" height="36" viewBox="0 0 52 36" style={{ marginBottom: 16 }}>
        <ellipse cx="11" cy="26" rx="9" ry="16" fill="#1E6FFF" transform="rotate(-22 11 26)" />
        <ellipse cx="41" cy="26" rx="9" ry="16" fill="#1E6FFF" transform="rotate(22 41 26)" />
        <ellipse cx="11" cy="26" rx="5" ry="10" fill="#5BA4FF" transform="rotate(-22 11 26)" />
        <ellipse cx="41" cy="26" rx="5" ry="10" fill="#5BA4FF" transform="rotate(22 41 26)" />
      </svg>
      <p style={{ color: "#5BA4FF", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", fontWeight: 700, marginBottom: 4 }}>Timi's Workout 💙</p>
      <p style={{ color: "#F0F4FF", fontSize: 18, fontWeight: 800, marginBottom: 32 }}>Enter PIN</p>

      {/* PIN dots */}
      <div style={{ display: "flex", gap: 16, marginBottom: 40, animation: shake ? "shake 0.4s ease" : "none" }}>
        {[0,1,2,3].map(i => (
          <div key={i} style={{ width: 16, height: 16, borderRadius: "50%", background: i < pin.length ? "#1E6FFF" : "#1E2240", border: "2px solid #1E6FFF", transition: "background 0.15s" }} />
        ))}
      </div>

      {attempts > 0 && (
        <p style={{ color: "#FF4FA3", fontSize: 12, marginBottom: 16, fontWeight: 600 }}>Wrong PIN. Try again 🔒</p>
      )}

      {/* Keypad */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 72px)", gap: 12 }}>
        {keys.map((key, i) => (
          <button key={i} onClick={() => key === "⌫" ? handleDelete() : key !== "" ? handlePress(key) : null}
            style={{ width: 72, height: 72, borderRadius: 20, border: `1px solid #1E2240`, background: key === "" ? "transparent" : key === "⌫" ? "#1E2240" : "#131629", color: "#F0F4FF", fontSize: key === "⌫" ? 22 : 24, fontWeight: 700, cursor: key === "" ? "default" : "pointer", transition: "all 0.1s", fontFamily: "'Inter', sans-serif" }}>
            {key}
          </button>
        ))}
      </div>

      <style>{`
        @keyframes shake { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-10px)} 40%{transform:translateX(10px)} 60%{transform:translateX(-10px)} 80%{transform:translateX(10px)} }
      `}</style>
    </div>
  );
}

// ── STITCH PALETTE ───────────────────────────────────────────────
const S = {
  bg: "#0D0F1A", card: "#131629", border: "#1E2240",
  blue: "#1E6FFF", lightBlue: "#5BA4FF", purple: "#7B2FFF",
  teal: "#00D4C8", pink: "#FF4FA3", yellow: "#FFD600",
  white: "#F0F4FF", muted: "#6B7280",
};

// ── HYPE MESSAGES (shown on open) ───────────────────────────────
const hypeMessages = [
  "Hey Timi! Let's get that bumbum rounder today 🍑🔥",
  "Good to see you Timi! Time to build that body 💪💙",
  "Timi's in the building! Let's get it queen 👑🔥",
  "Hey beauty! Your body is being built one rep at a time ✨",
  "Welcome back Timi! That waist isn't snatching itself 😌💙",
  "Let's GO Timi! Today's workout is waiting for you 🔥",
  "Hey queen! Stitch believes in you and so do I 💙🍑",
  "Timi showed up! That's already half the battle 👑✨",
];

// ── EXERCISE COMPLIMENTS ─────────────────────────────────────────
const compliments = {
  "hip thrust": [
    "You feel that?! That's your glutes WAKING UP 🍑🔥 Every thrust = a rounder bum. Science.",
    "The burn means it's WORKING queen 🙌 Your bumbum is being sculpted right this second",
    "Feel the squeeze at the top! SQUEEZE IT! That's where the magic happens 🍑✨",
    "Your glutes are screaming because they're getting BIGGER 📈 That's not pain, that's progress",
    "That burn you're feeling? That's your bum thanking you in advance 🙏🍑🔥",
    "You're literally sculpting your body in real time ✨ This is the work Timi",
    "Round, high, sculpted — that's what these are building 🍑📈",
    "Hip thrust queen energy 👑 Your posterior chain is being BUILT",
  ],
  "romanian deadlift": [
    "Feel that hamstring stretch? That's LENGTH and STRENGTH being built babe 💪",
    "Slow and controlled = maximum gains. You're doing it perfectly ✨",
    "That pull behind your knees? That's your hamstrings growing 📈🔥",
    "Romanian queen behaviour 👑 The hinge is everything and you're NAILING it",
    "Longer, leaner, stronger legs — that's what every rep is building 💅",
  ],
  "bulgarian split squat": [
    "This is genuinely one of the hardest exercises in the gym and you are DOING IT 👑🔥",
    "One leg at a time Timi, one empire at a time 💪",
    "Bulgarians build the BEST glutes of any exercise. Fact. 🍑📈",
    "Every shaky rep counts. Don't you dare stop now 🔥",
    "Leg day villain behaviour and we LOVE to see it 😤👑",
  ],
  "squat": [
    "The queen of exercises being done by THE queen 👑🔥",
    "Depth is everything! Get low and feel those glutes activate 🍑🔥",
    "Every squat is a step closer to those thicc quads and round glutes 🦵🍑📈",
    "Knees out, chest up, PUSH through that floor like you mean it! 🔥",
    "Quad goals AND glute goals being built simultaneously 💅",
  ],
  "leg press": [
    "Load it up and PUSH queen 🔥 Push through your heels for maximum glute activation 🍑",
    "More weight = more muscle = more results 📈✨",
    "Leg press never lies — and neither do your gains 🔥👑",
  ],
  "walking lunge": [
    "One step at a time and you're BUILDING 🔥",
    "You're literally walking toward your goals right now 👑",
    "Every lunge = one step closer to those legs 🔥💅",
  ],
  "leg extension": [
    "Isolation mode: quad edition 🦵🔥",
    "Feel the peak squeeze at the top? That's the quad popping 💪",
    "Quad definition incoming ✨📈",
  ],
  "glute bridge": [
    "Squeeze those glutes at the TOP Timi 🍑🔥",
    "Every bridge = a rounder, higher bum 📈",
    "Activate, squeeze, hold. YES! 💪",
  ],
  "cable kickback": [
    "Kick it back and FEEL that glute contract 🍑🔥 That squeeze is everything",
    "Every kick = rounder booty. Period. Keep going 🍑📈🔥",
    "Isolating those glutes like a professional 👑💅",
  ],
  "hip abduction": [
    "Outer glutes being FIRED and BUILT right now 🍑🔥",
    "Side glutes getting sculpted = wider hips = more curves ✨",
    "Hip abduction queen 👑 Building those curves one rep at a time 🍑📈",
  ],
  "lying leg curl": [
    "Hamstrings are getting BUILT right now 🦵🔥",
    "Curl it up slow and feel every fibre 💪",
    "Curl, hold, lower. Perfection ✨",
  ],
  "calf raise": [
    "Full leg queen — not skipping the calves 🦵🔥",
    "Rise slow, lower slow, feel every inch ✨",
    "The most overlooked muscle getting attention today 🔥👑",
  ],
  "deadlift": [
    "THE deadlift. The full body queen exercise and you are LIFTING IT 👑🔥",
    "Every single muscle in your body is working right now Timi. That's POWER 💪",
    "Deadlifts build the body. Full stop. And you're doing them 🔥📈",
    "That's not just a lift. That's full body transformation 👑💅",
    "Deadlift days are character building days 💪🔥",
  ],
  "bent over row": [
    "Back thickness being BUILT right now 💪🔥 Feel that squeeze between your shoulder blades",
    "Your back is going to look INCREDIBLE Timi. Trust the process 👑🔥",
    "Every row = a stronger, more defined back ✨",
  ],
  "lat pulldown": [
    "Lats loading… that V-shape is coming 🔥",
    "Pull to your chest and squeeze at the bottom ✨",
    "Feel those lats spreading? Width incoming 👑",
  ],
  "seated cable row": [
    "Mid-back definition is being built RIGHT NOW 📈",
    "Pull it in and own that contraction 👑",
  ],
  "overhead press": [
    "Shoulders being BUILT overhead queen 🔥",
    "Boulder shoulders incoming 💪📈",
    "Every press = more defined, stronger shoulders 💅",
  ],
  "lateral raise": [
    "Those medial delts are ON FIRE 🔥",
    "Lateral raises = shoulder WIDTH queen 📈",
    "The burn in your shoulders? That's them getting rounder 💪",
  ],
  "face pull": [
    "Rear delts and rotator cuff — the underrated combo 💪🔥",
    "The least glamorous exercise with the most important results 📈",
  ],
  "rear delt": [
    "Rear delts being BUILT — your posture will thank you 🔥",
    "That shoulder roundness comes from rear delt work ✨",
  ],
  "pull-up": [
    "PULL-UPS?! You are built different Timi 👑🔥",
    "Your lats are doing the MOST and we love it 💪",
    "Pull-ups separate the girls from the women. You chose woman. 👑",
  ],
  "plank": [
    "Core of STEEL being forged right now 🔥 Don't drop those hips Timi",
    "Every second = a tighter, flatter tummy 📈",
    "Flat tummy progress happening RIGHT NOW 💅✨",
    "Hold it! That waist isn't going to snatch itself 😌",
  ],
  "hanging leg raise": [
    "Lower abs being CARVED right now 🔥 Control the swing",
    "This is the hard one. That's why it WORKS ✨",
    "Lower ab definition incoming 📈🔥",
  ],
  "woodchopper": [
    "The woodchopper is quietly snatching your waist 🔥💅",
    "Obliques being sculpted = waist definition incoming ✨",
    "Waist snatching in progress. Do not disturb 😌👑",
  ],
  "bench press": [
    "Chest queen 👑 Feel those pecs contracting? That's them being BUILT 🔥",
    "Every press = stronger, firmer chest 💪📈",
    "Bench press is giving main character energy 💅🔥",
  ],
  "incline": [
    "Upper chest being sculpted right now ✨🔥",
    "Incline hits different and you KNOW it 💪",
  ],
  "cable fl": [
    "Stretch and squeeze — that's chest definition 🔥",
    "Cables keep tension the whole way through queen 💪",
  ],
  "curl": [
    "Bicep queen 💪🔥 Squeeze at the TOP — that's where the muscle grows",
    "Arms getting more defined with every curl ✨📈",
    "Those arms are NOT playing today 💅🔥",
  ],
  "skull crusher": [
    "Triceps being carved right now 💪🔥",
    "Skull crushers = horseshoe triceps. Building yours 📈",
  ],
  "tricep": [
    "Triceps make up 2/3 of your arm — PUSH 🔥",
    "Tricep definition is being built right now ✨",
  ],
  "default": [
    "Yasss queen, you absolutely ate that set! 👑✨",
    "Come on Timi, you got this and then some! 💅🔥",
    "Okayyy we are CLOCKING IT! 🕐✨ That set was immaculate",
    "That body is being BUILT and you're the architect 🔥📈",
    "Look at you showing UP and showing OUT! 🍑✨",
    "You are LITERALLY that girl today 🌟🔥",
    "No days off for main characters 👸🏾🔥",
    "Every set is a deposit into your body bank 💸📈",
    "That bumbum is not building itself — but you are 🍑🔥",
    "Ohana means nobody skips sets. And you never do 💙✨",
    "You didn't come this far to only come this far 🔥👑",
    "Stitch would be so proud of you right now 💙🔥",
  ],
};

const recentShown = {};
function pickCompliment(exerciseName) {
  const lower = exerciseName.toLowerCase();
  let pool = compliments.default;
  for (const [key, p] of Object.entries(compliments)) {
    if (key !== "default" && lower.includes(key)) { pool = p; break; }
  }
  const key = lower;
  if (!recentShown[key]) recentShown[key] = [];
  const recent = recentShown[key];
  const available = pool.map((_, i) => i).filter(i => !recent.includes(i));
  const choices = available.length > 0 ? available : pool.map((_, i) => i);
  const idx = choices[Math.floor(Math.random() * choices.length)];
  recentShown[key] = [...recent.slice(-4), idx];
  return pool[idx];
}

// ── WORKOUT PLAN ────────────────────────────────────────────────
const workoutPlan = {
  1: { day: "Monday", title: "Back & Shoulders 💪",
    color: S.blue, accent: S.lightBlue, rest: false,
    exercises: [
      { name: "Bent Over Rows", sets: 4, reps: "8" },
      { name: "Lat Pulldowns", sets: 3, reps: "10" },
      { name: "Seated Cable Rows", sets: 3, reps: "10" },
      { name: "Overhead Press", sets: 3, reps: "8" },
      { name: "Lateral Raises", sets: 3, reps: "15" },
      { name: "Rear Delt Flies", sets: 3, reps: "15" },
      { name: "Face Pulls", sets: 3, reps: "15" },
    ], cardio: { machine: "Stationary Bike", duration: 20, type: "Steady — moderate resistance" }},
  2: { day: "Tuesday", title: "Glutes & Hamstrings 🍑",
    color: S.pink, accent: "#FF9FD0", rest: false,
    exercises: [
      { name: "Hip Thrusts", sets: 4, reps: "8–10" },
      { name: "Romanian Deadlifts", sets: 4, reps: "8" },
      { name: "Bulgarian Split Squats", sets: 3, reps: "10/leg" },
      { name: "Lying Leg Curls", sets: 3, reps: "12" },
      { name: "Cable Kickbacks", sets: 3, reps: "12/leg" },
      { name: "Hip Abduction Machine", sets: 3, reps: "15" },
    ], cardio: { machine: "Treadmill Incline Walk", duration: 20, type: "Incline 8–10 • Speed 5–6" }},
  3: { day: "Wednesday", title: "Rest Day 😴",
    color: S.teal, accent: "#80EDE8", rest: true, exercises: [], cardio: null },
  4: { day: "Thursday", title: "Chest & Arms 💥",
    color: S.purple, accent: "#B57BFF", rest: false,
    exercises: [
      { name: "Bench Press", sets: 4, reps: "8" },
      { name: "Incline Dumbbell Press", sets: 3, reps: "10" },
      { name: "Cable Flyes", sets: 3, reps: "12" },
      { name: "Barbell / Dumbbell Curls", sets: 3, reps: "12" },
      { name: "Hammer Curls", sets: 3, reps: "12" },
      { name: "Skull Crushers", sets: 3, reps: "10" },
      { name: "Tricep Pushdowns", sets: 3, reps: "12" },
    ], cardio: { machine: "Stationary Bike", duration: 15, type: "HIIT — 30 sec sprint / 30 sec rest" }},
  5: { day: "Friday", title: "Quads, Calves & Glutes 🦵",
    color: S.teal, accent: "#80EDE8", rest: false,
    exercises: [
      { name: "Back Squats", sets: 4, reps: "8" },
      { name: "Leg Press", sets: 4, reps: "10" },
      { name: "Walking Lunges", sets: 3, reps: "12/leg" },
      { name: "Leg Extensions", sets: 3, reps: "15" },
      { name: "Glute Bridges (lighter)", sets: 3, reps: "15" },
      { name: "Calf Raises", sets: 4, reps: "15" },
    ], cardio: { machine: "Treadmill Incline Walk", duration: 20, type: "Low incline — easy on tired legs" }},
  6: { day: "Saturday", title: "Deadlifts, Back & Core 🔥",
    color: S.yellow, accent: "#FFE566", rest: false,
    exercises: [
      { name: "Deadlifts", sets: 4, reps: "6–8" },
      { name: "Bent Over Rows (lighter)", sets: 3, reps: "8" },
      { name: "Pull-ups / Assisted Pull-ups", sets: 3, reps: "10" },
      { name: "Hanging Leg Raises", sets: 3, reps: "12" },
      { name: "Cable Woodchoppers", sets: 3, reps: "12/side" },
      { name: "Plank", sets: 3, reps: "45 sec" },
    ], cardio: { machine: "Treadmill Incline Walk", duration: 20, type: "Easy pace — cool down" }},
  0: { day: "Sunday", title: "Rest Day 😴",
    color: S.teal, accent: "#80EDE8", rest: true, exercises: [], cardio: null },
};

const DAY_LABELS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
const WATER_GOAL = 8;
const quotes = {
  1: "A strong back is the foundation of everything.",
  2: "Build the body you deserve, one rep at a time. 🍑",
  3: "Rest is not quitting. Rest is winning.",
  4: "Strong chest, strong everything.",
  5: "Quads don't grow from wishing. They grow from squatting.",
  6: "Deadlifts build the whole body. No exceptions.",
  0: "Muscles grow on rest days. You earned this.",
};

function ls(k, f) { try { return JSON.parse(localStorage.getItem(k) ?? "null") ?? f; } catch { return f; } }
function ss(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} }

// ── STITCH EARS ──────────────────────────────────────────────────
function StitchEars() {
  return (
    <svg width="52" height="36" viewBox="0 0 52 36">
      <ellipse cx="11" cy="26" rx="9" ry="16" fill="#1E6FFF" transform="rotate(-22 11 26)" />
      <ellipse cx="41" cy="26" rx="9" ry="16" fill="#1E6FFF" transform="rotate(22 41 26)" />
      <ellipse cx="11" cy="26" rx="5" ry="10" fill="#5BA4FF" transform="rotate(-22 11 26)" />
      <ellipse cx="41" cy="26" rx="5" ry="10" fill="#5BA4FF" transform="rotate(22 41 26)" />
    </svg>
  );
}

// ── WATER TRACKER ────────────────────────────────────────────────
function WaterTracker({ color, accent }) {
  const todayKey = `water_${new Date().toISOString().split("T")[0]}`;
  const [glasses, setGlasses] = useState(() => ls(todayKey, 0));
  const add = () => { const n = Math.min(glasses + 1, WATER_GOAL); setGlasses(n); ss(todayKey, n); };
  const rem = () => { const n = Math.max(glasses - 1, 0); setGlasses(n); ss(todayKey, n); };
  const pct = Math.round((glasses / WATER_GOAL) * 100);
  return (
    <div style={{ margin: "12px 16px 0", background: S.card, border: `1px solid ${color}44`, borderRadius: 16, padding: "14px 16px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <div>
          <p style={{ margin: 0, fontSize: 10, color: S.muted, textTransform: "uppercase", letterSpacing: 2 }}>💧 Water Intake</p>
          <p style={{ margin: "3px 0 0", fontSize: 13, color: glasses >= WATER_GOAL ? S.teal : S.white, fontWeight: 700 }}>
            {glasses}/{WATER_GOAL} glasses {glasses >= WATER_GOAL ? "✓ Goal reached!" : ""}
          </p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={rem} style={{ width: 32, height: 32, borderRadius: 8, border: `1px solid ${S.border}`, background: S.bg, color: S.muted, fontSize: 18, cursor: "pointer", fontWeight: 700 }}>−</button>
          <button onClick={add} style={{ width: 32, height: 32, borderRadius: 8, border: `1px solid ${color}`, background: `${color}22`, color: accent, fontSize: 18, cursor: "pointer", fontWeight: 700 }}>+</button>
        </div>
      </div>
      <div style={{ height: 5, background: S.border, borderRadius: 3, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${pct}%`, background: `linear-gradient(90deg, ${S.teal}, ${S.blue})`, borderRadius: 3, transition: "width 0.3s" }} />
      </div>
      <div style={{ display: "flex", gap: 4, marginTop: 8 }}>
        {Array.from({ length: WATER_GOAL }).map((_, i) => <span key={i} style={{ fontSize: 14, opacity: i < glasses ? 1 : 0.2 }}>💧</span>)}
      </div>
      {glasses === 0 && <p style={{ margin: "6px 0 0", fontSize: 11, color: S.muted }}>Tap + every time you drink a glass 💧 Stay hydrated babe!</p>}
      {glasses > 0 && glasses < WATER_GOAL && <p style={{ margin: "6px 0 0", fontSize: 11, color: S.muted }}>{WATER_GOAL - glasses} more to go — hydration is part of the glow-up! ✨</p>}
    </div>
  );
}

// ── HISTORY TAB ──────────────────────────────────────────────────
function HistoryTab() {
  const history = ls("timi_history", {});
  const entries = Object.entries(history).sort((a, b) => b[0].localeCompare(a[0])).slice(0, 14);
  return (
    <div style={{ padding: "0 16px" }}>
      <p style={{ color: S.muted, fontSize: 13, marginBottom: 16 }}>Last 2 weeks 📅</p>
      {entries.length === 0 ? (
        <div style={{ textAlign: "center", padding: "50px 0", color: S.muted }}>
          <div style={{ fontSize: 52 }}>🏋️‍♀️</div>
          <p style={{ marginTop: 14, fontSize: 15 }}>No history yet Timi — go crush a workout!</p>
        </div>
      ) : entries.map(([date, rec]) => {
        const pct = rec.total > 0 ? Math.round((rec.done / rec.total) * 100) : 0;
        const w = workoutPlan[rec.dayIndex];
        const displayDate = new Date(date + "T12:00:00").toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" });
        return (
          <div key={date} style={{ background: S.card, border: `1px solid ${S.border}`, borderRadius: 14, padding: "14px 16px", marginBottom: 10 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <div>
                <p style={{ margin: 0, fontWeight: 700, fontSize: 14, color: w?.accent || S.teal }}>{rec.title}</p>
                <p style={{ margin: "2px 0 0", fontSize: 12, color: S.muted }}>{displayDate}</p>
              </div>
              <span style={{ fontSize: 12, fontWeight: 700, color: pct === 100 ? S.teal : S.muted }}>{pct === 100 ? "✓ Done!" : `${pct}%`}</span>
            </div>
            <div style={{ height: 4, background: S.border, borderRadius: 3, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${pct}%`, background: `linear-gradient(90deg, ${w?.color || S.blue}, ${w?.accent || S.lightBlue})`, borderRadius: 3 }} />
            </div>
            <p style={{ margin: "6px 0 0", fontSize: 11, color: S.muted }}>{rec.done}/{rec.total} sets completed</p>
          </div>
        );
      })}
    </div>
  );
}

// ── MAIN APP ─────────────────────────────────────────────────────
export default function App() {
  const [unlocked, setUnlocked] = useState(() => !!sessionStorage.getItem("timi_unlocked"));
  if (!unlocked) return <PinLock onUnlock={() => { sessionStorage.setItem("timi_unlocked", "1"); setUnlocked(true); }} />;

  const todayIndex = new Date().getDay();
  const todayDateStr = new Date().toISOString().split("T")[0];
  const [hype] = useState(() => hypeMessages[Math.floor(Math.random() * hypeMessages.length)]);
  const [showHype, setShowHype] = useState(true);
  const [tab, setTab] = useState("today");
  const [selectedDay, setSelectedDay] = useState(todayIndex);
  const [completedSets, setCompletedSets] = useState(() => ls(`timi_sets_${todayIndex}`, {}));
  const [restTimer, setRestTimer] = useState(false);
  const [restTimeLeft, setRestTimeLeft] = useState(0);
  const [cardioStarted, setCardioStarted] = useState(false);
  const [cardioTimeLeft, setCardioTimeLeft] = useState(0);
  const [compliment, setCompliment] = useState(null);
  const restRef = useRef(null);
  const cardioRef = useRef(null);
  const complimentTimer = useRef(null);
  const hypeTimer = useRef(null);

  const workout = workoutPlan[selectedDay];
  const { color, accent } = workout;

  // Auto hide hype message after 3 seconds
  useEffect(() => {
    hypeTimer.current = setTimeout(() => setShowHype(false), 3500);
    return () => clearTimeout(hypeTimer.current);
  }, []);

  useEffect(() => {
    setCompletedSets(ls(`timi_sets_${selectedDay}`, {}));
    setRestTimer(false); setRestTimeLeft(0);
    setCardioStarted(false); setCardioTimeLeft(0);
    clearInterval(restRef.current); clearInterval(cardioRef.current);
  }, [selectedDay]);

  useEffect(() => {
    ss(`timi_sets_${selectedDay}`, completedSets);
    const total = workout.exercises.reduce((a, e) => a + e.sets, 0);
    const done = Object.values(completedSets).filter(Boolean).length;
    if (selectedDay === todayIndex) {
      const h = ls("timi_history", {});
      h[todayDateStr] = { dayIndex: todayIndex, title: workout.title, done, total };
      ss("timi_history", h);
    }
  }, [completedSets]);

  const isSetDone = (ei, si) => !!completedSets[`${ei}-${si}`];
  const exDone = (ei, t) => Array.from({ length: t }).filter((_, s) => isSetDone(ei, s)).length;
  const totalSets = workout.exercises.reduce((a, e) => a + e.sets, 0);
  const doneSets = workout.exercises.reduce((a, e, i) => a + exDone(i, e.sets), 0);
  const progress = totalSets > 0 ? Math.round((doneSets / totalSets) * 100) : 0;

  const toggleSet = (ei, si, name) => {
    const key = `${ei}-${si}`;
    setCompletedSets(prev => {
      const wasChecked = !!prev[key];
      if (!wasChecked) { startRestTimer(); showComplimentFor(name); }
      return { ...prev, [key]: !wasChecked };
    });
  };

  const showComplimentFor = (exName) => {
    setCompliment(pickCompliment(exName));
    clearTimeout(complimentTimer.current);
    complimentTimer.current = setTimeout(() => setCompliment(null), 5000);
  };

  const startRestTimer = (secs = 90) => {
    clearInterval(restRef.current);
    setRestTimeLeft(secs); setRestTimer(true);
    restRef.current = setInterval(() => setRestTimeLeft(p => { if (p <= 1) { clearInterval(restRef.current); setRestTimer(false); return 0; } return p - 1; }), 1000);
  };

  const startCardio = () => {
    if (!workout.cardio) return;
    const secs = workout.cardio.duration * 60;
    setCardioTimeLeft(secs); setCardioStarted(true);
    cardioRef.current = setInterval(() => setCardioTimeLeft(p => { if (p <= 1) { clearInterval(cardioRef.current); setCardioStarted(false); return 0; } return p - 1; }), 1000);
  };

  const stopCardio = () => { clearInterval(cardioRef.current); setCardioStarted(false); setCardioTimeLeft(0); };
  const fmt = s => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  useEffect(() => () => { clearInterval(restRef.current); clearInterval(cardioRef.current); clearTimeout(complimentTimer.current); clearTimeout(hypeTimer.current); }, []);

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: S.bg, minHeight: "100vh", color: S.white, paddingBottom: 100, maxWidth: 480, margin: "0 auto", position: "relative" }}>

      {/* Hype message on open */}
      {showHype && (
        <div onClick={() => setShowHype(false)} style={{
          position: "fixed", inset: 0, background: "rgba(13,15,26,0.95)", zIndex: 9999,
          display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", padding: 32,
        }}>
          <StitchEars />
          <p style={{ fontSize: 22, fontWeight: 900, color: S.white, textAlign: "center", marginTop: 20, lineHeight: 1.4 }}>{hype}</p>
          <p style={{ color: S.muted, fontSize: 13, marginTop: 16 }}>Tap anywhere to start 💙</p>
        </div>
      )}

      {/* Compliment Toast — Bottom */}
      {compliment && (
        <div style={{
          position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)",
          background: `linear-gradient(135deg, ${color}, ${S.purple})`,
          color: "#fff", borderRadius: 22, padding: "14px 22px",
          fontSize: 13, fontWeight: 700, zIndex: 9998,
          boxShadow: `0 8px 32px ${color}66`,
          maxWidth: "88vw", textAlign: "center", lineHeight: 1.6,
          animation: "slideUp 0.35s cubic-bezier(.36,1.56,.64,1)",
        }}>{compliment}</div>
      )}

      {/* Header */}
      <div style={{ background: `linear-gradient(160deg, ${color}30 0%, ${S.bg} 100%)`, padding: "18px 20px 14px", borderBottom: `1px solid ${S.border}` }}>
        <StitchEars />
        <p style={{ margin: "10px 0 0", fontSize: 11, letterSpacing: 3, color: accent, textTransform: "uppercase", fontWeight: 700 }}>Timi's Workout 💙</p>
        <h1 style={{ margin: "4px 0 0", fontSize: 22, fontWeight: 900, color: S.white, lineHeight: 1.2 }}>{workout.title}</h1>
        <p style={{ margin: "3px 0 0", fontSize: 12, color: S.muted }}>{workout.day} · {new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</p>
        <div style={{ marginTop: 10, background: `${color}18`, borderLeft: `3px solid ${color}`, borderRadius: "0 10px 10px 0", padding: "9px 12px" }}>
          <p style={{ margin: 0, fontSize: 12, color: S.white, fontStyle: "italic" }}>"{quotes[selectedDay]}"</p>
          <p style={{ margin: "3px 0 0", fontSize: 11, color: S.muted }}>Ohana means nobody skips leg day 💙</p>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", borderBottom: `1px solid ${S.border}` }}>
        {["today", "history"].map(t => (
          <button key={t} onClick={() => setTab(t)} style={{ flex: 1, padding: "12px 0", background: "none", border: "none", borderBottom: tab === t ? `2px solid ${color}` : "2px solid transparent", color: tab === t ? accent : S.muted, fontWeight: tab === t ? 700 : 500, fontSize: 13, cursor: "pointer" }}>
            {t === "today" ? "📋 Today" : "📅 History"}
          </button>
        ))}
      </div>

      {tab === "history" ? <div style={{ paddingTop: 16 }}><HistoryTab /></div> : (
        <>
          {/* Day Selector */}
          <div style={{ display: "flex", gap: 6, padding: "12px 16px", overflowX: "auto" }}>
            {DAY_LABELS.map((label, idx) => {
              const w = workoutPlan[idx];
              const isToday = idx === todayIndex;
              const isSel = idx === selectedDay;
              return (
                <button key={idx} onClick={() => setSelectedDay(idx)} style={{ flex: "0 0 auto", padding: "7px 13px", borderRadius: 20, border: isSel ? `2px solid ${w.color}` : `2px solid ${S.border}`, background: isSel ? `${w.color}25` : S.card, color: isSel ? w.accent : S.muted, fontWeight: isToday ? 800 : 500, fontSize: 12, cursor: "pointer", position: "relative" }}>
                  {label}
                  {isToday && <span style={{ position: "absolute", top: 2, right: 3, width: 5, height: 5, borderRadius: "50%", background: w.color }} />}
                </button>
              );
            })}
          </div>

          {workout.rest ? (
            <div style={{ margin: "50px 20px", textAlign: "center" }}>
              <div style={{ fontSize: 72 }}>😴</div>
              <p style={{ fontSize: 22, fontWeight: 800, color: accent, marginTop: 12 }}>Rest & Recover Timi</p>
              <p style={{ color: S.muted, fontSize: 14 }}>Muscles grow on rest days. You earned this 💙</p>
              <WaterTracker color={color} accent={accent} />
            </div>
          ) : (
            <>
              {totalSets > 0 && (
                <div style={{ padding: "4px 16px 12px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    <span style={{ fontSize: 12, color: S.muted }}>Progress</span>
                    <span style={{ fontSize: 12, color: accent, fontWeight: 700 }}>{progress}% · {doneSets}/{totalSets} sets</span>
                  </div>
                  <div style={{ height: 7, background: S.border, borderRadius: 4, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${progress}%`, background: `linear-gradient(90deg, ${color}, ${accent})`, borderRadius: 4, transition: "width 0.4s" }} />
                  </div>
                  {progress === 100 && <p style={{ margin: "8px 0 0", textAlign: "center", fontSize: 13, color: S.teal, fontWeight: 700 }}>🎉 WORKOUT COMPLETE! That's how it's done Timi!!</p>}
                </div>
              )}

              {restTimer && (
                <div style={{ margin: "0 16px 12px", background: S.card, border: `1px solid ${color}55`, borderRadius: 14, padding: "13px 18px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div>
                    <p style={{ margin: 0, fontSize: 10, color: S.muted, textTransform: "uppercase", letterSpacing: 2 }}>Rest Timer</p>
                    <p style={{ margin: "4px 0 0", fontSize: 32, fontWeight: 900, color: accent }}>{fmt(restTimeLeft)}</p>
                  </div>
                  <button onClick={() => { clearInterval(restRef.current); setRestTimer(false); }} style={{ background: `${color}22`, border: `1px solid ${color}`, color: accent, borderRadius: 10, padding: "8px 16px", fontSize: 12, cursor: "pointer", fontWeight: 600 }}>Skip ⏭</button>
                </div>
              )}

              <div style={{ padding: "0 16px" }}>
                {workout.exercises.map((ex, i) => {
                  const done = exDone(i, ex.sets);
                  const allDone = done === ex.sets;
                  return (
                    <div key={i} style={{ background: allDone ? `${color}15` : S.card, border: `1px solid ${allDone ? color : S.border}`, borderRadius: 16, padding: "14px 16px", marginBottom: 10, transition: "all 0.2s" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                        <div>
                          <p style={{ margin: 0, fontWeight: 700, fontSize: 14, color: allDone ? accent : S.white }}>{allDone ? "✓ " : ""}{ex.name}</p>
                          <p style={{ margin: "3px 0 0", fontSize: 11, color: S.muted }}>{ex.sets} sets × {ex.reps} reps</p>
                        </div>
                        <span style={{ fontSize: 11, color: allDone ? accent : S.muted, fontWeight: 700 }}>{done}/{ex.sets}</span>
                      </div>
                      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                        {Array.from({ length: ex.sets }).map((_, s) => {
                          const checked = isSetDone(i, s);
                          return (
                            <button key={s} onClick={() => toggleSet(i, s, ex.name)} style={{ width: 44, height: 44, borderRadius: 12, border: checked ? `2px solid ${color}` : `2px solid ${S.border}`, background: checked ? `linear-gradient(135deg, ${color}, ${S.purple})` : S.bg, color: checked ? "#fff" : S.muted, fontWeight: 800, fontSize: 14, cursor: "pointer", transition: "all 0.15s", boxShadow: checked ? `0 4px 12px ${color}55` : "none" }}>
                              {checked ? "✓" : s + 1}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>

              <WaterTracker color={color} accent={accent} />

              {workout.cardio && (
                <div style={{ margin: "12px 16px 0", background: S.card, border: `1px solid ${color}44`, borderRadius: 16, padding: 16 }}>
                  <p style={{ margin: "0 0 2px", fontSize: 10, color: S.muted, textTransform: "uppercase", letterSpacing: 2 }}>Cardio 🏃‍♀️</p>
                  <p style={{ margin: "0 0 2px", fontWeight: 700, fontSize: 15, color: S.white }}>{workout.cardio.machine}</p>
                  <p style={{ margin: "0 0 14px", fontSize: 12, color: S.muted }}>{workout.cardio.type}</p>
                  {cardioStarted ? (
                    <div style={{ textAlign: "center" }}>
                      <p style={{ fontSize: 44, fontWeight: 900, color: accent, margin: "0 0 12px" }}>{fmt(cardioTimeLeft)}</p>
                      <button onClick={stopCardio} style={{ background: S.border, border: "none", color: S.white, borderRadius: 12, padding: "10px 28px", fontSize: 14, cursor: "pointer", fontWeight: 600 }}>Stop</button>
                    </div>
                  ) : (
                    <button onClick={startCardio} style={{ width: "100%", padding: "13px", borderRadius: 12, border: "none", background: `linear-gradient(135deg, ${color}, ${S.purple})`, color: "#fff", fontWeight: 800, fontSize: 14, cursor: "pointer" }}>
                      Start {workout.cardio.duration} min Timer 🚀
                    </button>
                  )}
                </div>
              )}
            </>
          )}
        </>
      )}

      <style>{`
        @keyframes slideUp { from { opacity:0; transform:translateX(-50%) translateY(20px); } to { opacity:1; transform:translateX(-50%) translateY(0); } }
        * { box-sizing: border-box; } ::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}
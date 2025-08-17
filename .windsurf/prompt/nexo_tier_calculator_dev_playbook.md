
# Nexo Tier Calculator – Developer Playbook (Docker + Nginx + Live‑Reload)

> British English. This is a **step‑by‑step build guide** for implementing the tier calculator in the environment you described: static HTML/CSS/JS served via **Nginx** inside Docker, with **live-server** for hot reloading, orchestrated by **Docker Compose** and started by a `start.sh` script.

---

## 0) Scope & Goals

- Build a browser‑based calculator that compares **Base, Silver, Gold, Platinum** Nexo tiers.
- Quantifies the trade‑off between **tying up capital in NEXO** (to lower borrow APR) versus **retaining BTC exposure**.
- Supports LTV‑banded APRs (especially **Platinum** with three bands; optional **Gold** minimum APR if LTV rules later confirmed).
- All business parameters editable in a single **`defaults.json`** (no rebuild required).
- No backend: **static site** only.

Non‑goals (for this phase): authentication, persistence, charting, mobile polish beyond basic responsive layout.

---

## 1) Folder Structure

```
tier_calc/
├─ docker-compose.yml
├─ Dockerfile
├─ nginx.conf
├─ start.sh
├─ static/
│  ├─ index.html
│  ├─ styles.css
│  ├─ app.js
│  └─ data/
│     └─ defaults.json
└─ README.md (optional)
```

Hot reload watches **`./static/**`** via the Compose volume mount.

---

## 2) Business Rules (Configurable)

### 2.1 Tiers & Minimum NEXO Allocation
We use the **minimum** NEXO requirement within each band to maximise BTC exposure:

- **Base**: up to 1% NEXO → **use 0%** minimum
- **Silver**: **1%** NEXO
- **Gold**: **5%** NEXO
- **Platinum**: **10%** NEXO

### 2.2 Borrow APRs (given; confirm when you have official docs)
- **Base**: **18.9%**
- **Silver**: **17.9%**
- **Gold**: **13.9%** (there *may* be a **5.9% minimum** under a specific LTV rule — to be confirmed)
- **Platinum**: **banded by LTV**, **2.9% (min)** up to **10.9% (max)**, with **three** bands (exact mid‑band APR & thresholds to confirm).

> We’ll parameterise all APRs and LTV thresholds in `defaults.json` with placeholders you can edit later.

### 2.3 Inputs (user‑editable at runtime)
- `totalCapital` (e.g., 100000)
- `loanToValue` (e.g., **0.50** for 50%)
- `btcChangePct` (e.g., **0.25** for +25% over the period)
- `years` (e.g., **1**)
- `nexoPriceChangePct` (default **0**; change later if you want to model NEXO MTM)
- `ltvBandMethod`: `"start" | "end" | "average"` (how to choose an APR band)

### 2.4 Calculations (per tier)
1. `nexoRequiredValue = totalCapital * minTierNexoPct`
2. `btcInitialValue = totalCapital - nexoRequiredValue`
3. `btcFinalValue = btcInitialValue * (1 + btcChangePct)`
4. `nexoFinalValue = nexoRequiredValue * (1 + nexoPriceChangePct)`
5. `loanAmount = totalCapital * loanToValue`
6. LTVs:
   - `ltvStart = loanAmount / btcInitialValue`
   - `ltvEnd   = loanAmount / btcFinalValue`
   - `ltvAvg   = (ltvStart + ltvEnd) / 2`
   - `ltvForRate = pick(start|end|avg)` by `ltvBandMethod`
7. Select **Borrow APR** for the tier (flat or LTV‑banded).
8. `interestAccrued = loanAmount * borrowApr * years`
9. `btcPnL  = btcFinalValue  - btcInitialValue`
10. `nexoPnL = nexoFinalValue - nexoRequiredValue`
11. **`netPnL = btcPnL + nexoPnL - interestAccrued`**
12. `ltvIndicator = "Improved"` if `ltvEnd < ltvStart` else `"Worsened"`

---

## 3) Config: `static/data/defaults.json`

Paste and **edit placeholders** as you firm up the rules.

```json
{
  "inputs": {
    "totalCapital": 100000,
    "loanToValue": 0.5,
    "btcChangePct": 0.25,
    "years": 1,
    "nexoPriceChangePct": 0,
    "ltvBandMethod": "start"
  },
  "tiers": {
    "Base":    { "minNexoPct": 0.0,  "rates": { "flat": 0.189 } },
    "Silver":  { "minNexoPct": 0.01, "rates": { "flat": 0.179 } },
    "Gold":    {
      "minNexoPct": 0.05,
      "rates": {
        "flat": 0.139,
        "bands": [
          { "maxLtv": 0.20, "apr": 0.059 },  // OPTIONAL: only if confirmed
          { "maxLtv": 1.00, "apr": 0.139 }
        ]
      }
    },
    "Platinum": {
      "minNexoPct": 0.10,
      "rates": {
        "bands": [
          { "maxLtv": 0.20, "apr": 0.029 },
          { "maxLtv": 0.50, "apr": 0.070 },  // TODO: placeholder mid band
          { "maxLtv": 1.00, "apr": 0.109 }
        ]
      }
    }
  },
  "assumptions": [
    "Gold 5.9% APR may require LTV <= 20% (placeholder; confirm).",
    "Platinum mid band APR and threshold currently placeholders (0.07 up to 50% LTV).",
    "NEXO token price change default is 0% for logic checks.",
    "We use the MIN NEXO % of each band to maximise BTC exposure."
  ]
}
```

> With this structure you can change bands/rates without altering code.

---

## 4) Front End

### 4.1 `static/index.html`

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Nexo Tier Calculator</title>
  <link rel="stylesheet" href="styles.css" />
</head>
<body>
  <main>
    <h1>Nexo Tier Calculator</h1>

    <section class="inputs">
      <div class="row">
        <label for="totalCapital">Total capital ($)</label>
        <input id="totalCapital" type="number" step="100" />
      </div>
      <div class="row">
        <label for="ltv">Loan‑to‑Value</label>
        <input id="ltv" type="number" step="0.01" min="0" max="1" />
      </div>
      <div class="row">
        <label for="btcChangePct">BTC change (%)</label>
        <input id="btcChangePct" type="number" step="0.01" />
      </div>
      <div class="row">
        <label for="nexoChangePct">NEXO change (%)</label>
        <input id="nexoChangePct" type="number" step="0.01" />
      </div>
      <div class="row">
        <label for="years">Years</label>
        <input id="years" type="number" step="0.25" min="0" />
      </div>
      <div class="row">
        <label for="ltvMethod">LTV band method</label>
        <select id="ltvMethod">
          <option value="start">Start</option>
          <option value="end">End</option>
          <option value="average">Average</option>
        </select>
      </div>
      <button id="recalc">Recalculate</button>
    </section>

    <section class="results">
      <table id="results">
        <thead>
          <tr>
            <th>Tier</th>
            <th>Min NEXO %</th>
            <th>Borrow APR</th>
            <th>NEXO Req ($)</th>
            <th>BTC Start ($)</th>
            <th>BTC End ($)</th>
            <th>Interest ($)</th>
            <th>BTC PnL ($)</th>
            <th>NEXO PnL ($)</th>
            <th>Net PnL ($)</th>
            <th>LTV Start</th>
            <th>LTV End</th>
            <th>Band Used</th>
            <th>LTV Indicator</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>

      <details class="assumptions">
        <summary>Assumptions / To Confirm</summary>
        <ul id="assumptions"></ul>
      </details>
    </section>
  </main>

  <script src="app.js"></script>
</body>
</html>
```

### 4.2 `static/styles.css`

```css
:root { --gap: .75rem; }
body { font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; margin: 2rem; }
h1 { margin-bottom: 1rem; }
.inputs { display: grid; gap: var(--gap); max-width: 720px; margin-bottom: 1rem; }
.inputs .row { display: grid; grid-template-columns: 220px 1fr; gap: .5rem; align-items: center; }
button { padding: .5rem .9rem; cursor: pointer; }
table { border-collapse: collapse; width: 100%; }
th, td { border: 1px solid #ddd; padding: .5rem; text-align: right; }
th:first-child, td:first-child { text-align: left; }
thead th { background: #f6f7f9; }
tbody tr:nth-child(odd) { background: #fafafa; }
.assumptions { margin-top: 1rem; }
```

### 4.3 `static/app.js`

```js
(async function () {
  const fmt = (n, d=2) => Number.isFinite(n) ? n.toLocaleString(undefined, {minimumFractionDigits:d, maximumFractionDigits:d}) : "—";
  const pct = (n) => Number.isFinite(n) ? (n*100).toFixed(2) + "%" : "—";
  const $  = (id) => document.getElementById(id);

  // Load config
  const cfg = await fetch("./data/defaults.json").then(r => r.json());

  // Seed inputs
  $("#totalCapital").value = cfg.inputs.totalCapital;
  $("#ltv").value          = cfg.inputs.loanToValue;
  $("#btcChangePct").value = cfg.inputs.btcChangePct * 100;
  $("#nexoChangePct").value= cfg.inputs.nexoPriceChangePct * 100;
  $("#years").value        = cfg.inputs.years;
  $("#ltvMethod").value    = cfg.inputs.ltvBandMethod;

  // Render assumptions list
  const ul = document.getElementById("assumptions");
  (cfg.assumptions || []).forEach(s => {
    const li = document.createElement("li");
    li.textContent = s;
    ul.appendChild(li);
  });

  // Helpers
  function pickApr(tier, ltv) {
    const rates = tier.rates;
    if (rates.flat != null) return rates.flat;
    if (rates.bands && rates.bands.length) {
      const m = rates.bands.find(b => ltv <= b.maxLtv) ?? rates.bands[rates.bands.length-1];
      return m.apr;
    }
    return NaN;
  }

  function calcOne(tierName, inputs) {
    const tier = cfg.tiers[tierName];
    const minPct = tier.minNexoPct;

    const totalCapital = inputs.totalCapital;
    const loanToValue  = inputs.loanToValue;
    const btcChange    = inputs.btcChangePct;
    const nexoChange   = inputs.nexoPriceChangePct;
    const years        = inputs.years;

    const nexoRequired = totalCapital * minPct;
    const btcStart     = totalCapital - nexoRequired;
    const btcEnd       = btcStart * (1 + btcChange);
    const nexoEnd      = nexoRequired * (1 + nexoChange);

    const loan = totalCapital * loanToValue;

    const ltvStart = loan / btcStart;
    const ltvEnd   = loan / btcEnd;
    const ltvAvg   = (ltvStart + ltvEnd) / 2;
    const ltvForRate = inputs.ltvBandMethod === "start" ? ltvStart :
                       inputs.ltvBandMethod === "end" ? ltvEnd : ltvAvg;

    const apr = pickApr(tier, ltvForRate);

    const interest = loan * apr * years;
    const btcPnL   = btcEnd  - btcStart;
    const nexoPnL  = nexoEnd - nexoRequired;
    const netPnL   = btcPnL + nexoPnL - interest;

    const bandUsed = (() => {
      if (!tier.rates.bands) return "flat";
      const b = tier.rates.bands.find(b => ltvForRate <= b.maxLtv) ?? tier.rates.bands[tier.rates.bands.length-1];
      return `<=${pct(b.maxLtv)} APR=${pct(b.apr)}`;
    })();

    return { tierName, minPct, apr, nexoRequired, btcStart, btcEnd, interest, btcPnL, nexoPnL, netPnL, ltvStart, ltvEnd, bandUsed,
      ltvIndicator: ltvEnd < ltvStart ? "Improved" : "Worsened" };
  }

  function readInputs() {
    return {
      totalCapital:       parseFloat($("#totalCapital").value || "0"),
      loanToValue:        parseFloat($("#ltv").value || "0"),
      btcChangePct:       parseFloat($("#btcChangePct").value || "0") / 100,
      nexoPriceChangePct: parseFloat($("#nexoChangePct").value || "0") / 100,
      years:              parseFloat($("#years").value || "0"),
      ltvBandMethod:      $("#ltvMethod").value
    };
  }

  function render() {
    const inputs = readInputs();
    const tbody = document.querySelector("#results tbody");
    tbody.innerHTML = "";
    ["Base","Silver","Gold","Platinum"].forEach(name => {
      const r = calcOne(name, inputs);
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${r.tierName}</td>
        <td>${pct(r.minPct)}</td>
        <td>${pct(r.apr)}</td>
        <td>${fmt(r.nexoRequired)}</td>
        <td>${fmt(r.btcStart)}</td>
        <td>${fmt(r.btcEnd)}</td>
        <td>${fmt(r.interest)}</td>
        <td>${fmt(r.btcPnL)}</td>
        <td>${fmt(r.nexoPnL)}</td>
        <td><strong>${fmt(r.netPnL)}</strong></td>
        <td>${pct(r.ltvStart)}</td>
        <td>${pct(r.ltvEnd)}</td>
        <td>${r.bandUsed}</td>
        <td>${r.ltvIndicator}</td>`;
      tbody.appendChild(tr);
    });
  }

  document.getElementById("recalc").addEventListener("click", render);
  render();
})();
```

---

## 5) Container & Server

### 5.1 `start.sh` (entrypoint; keep nginx in foreground)

```sh
#!/usr/bin/env sh
set -e

# Start live-server in background for hot reload
live-server /usr/share/nginx/html --host=0.0.0.0 --port=35729 --wait=200 &

# Start nginx in foreground
nginx -g 'daemon off;'
```

Make it executable: `chmod +x start.sh` (Compose build step handles this).

### 5.2 `Dockerfile`

```dockerfile
FROM nginx:alpine

# Install Node + live-server for hot reload
RUN apk add --no-cache nodejs npm bash  && npm install -g live-server

# Nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Static files (Compose will mount for dev)
COPY static /usr/share/nginx/html

# Start script
COPY start.sh /start.sh
RUN chmod +x /start.sh

EXPOSE 80 35729
CMD ["/start.sh"]
```

### 5.3 `nginx.conf`

```nginx
worker_processes 1;

events { worker_connections 1024; }

http {
  include       /etc/nginx/mime.types;
  default_type  application/octet-stream;
  sendfile      on;
  keepalive_timeout 65;

  server {
    listen 80;
    server_name _;

    root /usr/share/nginx/html;
    index index.html;

    location / {
      try_files $uri $uri/ /index.html;
    }
  }
}
```

### 5.4 `docker-compose.yml`

```yaml
version: "3.9"
services:
  web:
    build: .
    ports:
      - "80:80"
      - "35729:35729"   # live-server
    volumes:
      - ./static:/usr/share/nginx/html
    restart: unless-stopped
```

---

## 6) How to Run

```bash
docker-compose up --build
# open http://localhost
```

Any changes in `static/` hot‑reload automatically.

---

## 7) Baseline Sanity Test (with our defaults)

Use:
- totalCapital = **100,000**
- loanToValue = **0.50** → loan = **50,000**
- btcChangePct = **+25%**
- years = **1**
- nexoPriceChangePct = **0%**
- ltvBandMethod = **start**

Expected (rounded to nearest $10 for readability; NEXO PnL = 0 as price change is 0%):

| Tier      | NEXO % | BTC Start | BTC End  | APR   | Interest | BTC PnL | **Net PnL** |
|-----------|--------|-----------|----------|-------|----------|---------|-------------|
| Base      | 0%     | 100,000   | 125,000  | 18.9% | 9,450    | 25,000  | **15,550**  |
| Silver    | 1%     | 99,000    | 123,750  | 17.9% | 8,950    | 24,750  | **15,800**  |
| Gold      | 5%     | 95,000    | 118,750  | 13.9% | 6,950    | 23,750  | **16,800**  |
| Platinum* | 10%    | 90,000    | 112,500  | 10.9% | 5,450    | 22,500  | **17,050**  |

\*Assumes **start LTV = 55.6%** ⇒ falls in the **>50%** band for Platinum (APR 10.9%). If you choose `"average"` LTV and land <= 50%, use the **mid band** APR once confirmed.

Quick doubles‑check math (example: Base):
- Interest = 50,000 × 0.189 × 1 = **9,450**
- Net = 25,000 − 9,450 = **15,550** ✅

---

## 8) Developer Checklist (Assumptions vs Data)

Add/confirm these in `defaults.json` and the UI `<details>` list:

- [ ] Min NEXO % per tier (Base=0, Silver=1%, Gold=5%, Platinum=10%) — **confirmed**
- [ ] Base APR 18.9% — **confirmed**
- [ ] Silver APR 17.9% — **confirmed**
- [ ] Gold APR 13.9% — **confirmed**
- [ ] Gold minimum APR 5.9% — **requires rule & threshold**
- [ ] Platinum bands — **2.9% min, 10.9% max; mid APR & exact thresholds to confirm**
- [ ] LTV band method default (`start`) — **confirmed**
- [ ] NEXO price change default 0% — **confirmed/adjust as needed**

---

## 9) Acceptance Criteria

- User can edit inputs and recalc results instantly.
- Results table shows all four tiers with **Net PnL**, interest, LTVs, and band used.
- All APRs and thresholds are **only** read from `defaults.json` (no hard‑coding in JS).
- Baseline sanity outputs match the table in section 7 (within rounding).
- No console errors; hot reload works via `live-server`.
- Build/run works via `docker-compose up --build` and serves on `http://localhost`.

---

## 10) Next Enhancements (optional)

- Add scenario presets (bear/base/bull) as buttons.
- CSV export of the results table.
- A tiny chart of Net PnL vs BTC change for each tier.
- Persist last inputs to `localStorage` (still static).

---

**End of Playbook.** Commit this file to the repo and proceed.

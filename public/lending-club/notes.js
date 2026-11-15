var D = window.DATA;

var NS = "http://www.w3.org/2000/svg";

function el(name, attrs) {
  const node = document.createElementNS(NS, name);
  for (const [key, value] of Object.entries(attrs)) node.setAttribute(key, String(value));
  return node;
}

function pct(x, digits = 1) {
  return (x * 100).toFixed(digits) + "%";
}

function money(x) {
  return "$" + x.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function dollars(x) {
  if (x >= 1000) return "$" + Math.round(x / 1000) + "k";
  return "$" + Math.round(x);
}

function clear(node) {
  while (node.firstChild) node.removeChild(node.firstChild);
}

function scale(value, a0, a1, b0, b1) {
  return b0 + ((value - a0) / (a1 - a0)) * (b1 - b0);
}

function text(parent, value, x, y, anchor) {
  const node = el("text", { x, y, class: "tick", "text-anchor": anchor || "middle" });
  node.textContent = value;
  parent.appendChild(node);
}

function fillCounts() {
  const n = D.n.toLocaleString("en-US");
  document.getElementById("n-loans").textContent = n;
  document.getElementById("n-loans-2").textContent = n;
  document.getElementById("n-val").textContent = D.n_validation.toLocaleString("en-US");
  document.getElementById("default-pct").textContent = pct(D.default_rate);
  document.getElementById("majority-pct").textContent = pct(D.majority_accuracy);
}

function drawBins() {
  const key = document.getElementById("bin-feature").value;
  const spec = D.bins[key];
  document.getElementById("bin-note").textContent = spec.note;
  const svg = document.getElementById("bin-chart");
  clear(svg);
  const rows = spec.rows;
  const pad = { l: 52, r: 16, t: 16, b: 36 };
  const w = 680;
  const h = 300;
  const x0 = rows[0].x;
  const x1 = rows[rows.length - 1].x;
  const y1 = 0.32;
  const X = (x) => scale(x, x0, x1, pad.l, w - pad.r);
  const Y = (y) => scale(y, 0, y1, h - pad.b, pad.t);
  svg.appendChild(el("line", { x1: pad.l, y1: Y(0), x2: w - pad.r, y2: Y(0), class: "axis" }));
  [0, 0.1, 0.2, 0.3].forEach((tick) => {
    svg.appendChild(el("line", { x1: pad.l, y1: Y(tick), x2: w - pad.r, y2: Y(tick), class: "axis" }));
    text(svg, pct(tick, 0), pad.l - 8, Y(tick) + 4, "end");
  });
  const points = rows.map((row) => X(row.x) + "," + Y(row.rate)).join(" ");
  svg.appendChild(el("polyline", { points, class: "series" }));
  rows.forEach((row) => {
    svg.appendChild(el("circle", { cx: X(row.x), cy: Y(row.rate), r: 4, class: "dot" }));
  });
  const format = spec.axis === "dollars" ? dollars : spec.axis === "percent" ? (x) => x.toFixed(0) + "%" : (x) => x.toFixed(0);
  text(svg, format(rows[0].x), X(rows[0].x), h - 14, "start");
  text(svg, format(rows[rows.length - 1].x), X(rows[rows.length - 1].x), h - 14, "end");
  text(svg, spec.label, (pad.l + w - pad.r) / 2, h - 2, "middle");
}

function renderGradeTable() {
  const body = document.querySelector("#grade-table tbody");
  const grades = [...new Set(D.grade_term.map((row) => row.grade))];
  grades.forEach((grade) => {
    const a = D.grade_term.find((row) => row.grade === grade && row.term === 36);
    const b = D.grade_term.find((row) => row.grade === grade && row.term === 60);
    const tr = document.createElement("tr");
    const gap = (b.rate - a.rate) * 100;
    const sign = gap >= 0 ? "+" : "−";
    tr.innerHTML = `<td>${grade}</td><td>${pct(a.rate)}</td><td>${pct(b.rate)}</td><td>${sign}${Math.abs(gap).toFixed(1)} pp</td><td>${b.n.toLocaleString("en-US")}</td>`;
    body.appendChild(tr);
  });
}

function curveKey() {
  const grade = document.querySelector("#grade-buttons button[aria-pressed='true']").dataset.grade;
  const term = document.querySelector("#term-buttons button[aria-pressed='true']").dataset.term;
  const amount = document.getElementById("amount").value;
  return { grade, term, amount, key: `${grade}|${term}|${amount}` };
}

function drawCurve() {
  const { grade, term, amount, key } = curveKey();
  const index = Number(document.getElementById("income").value);
  const income = D.incomes[index];
  document.getElementById("income-out").textContent = dollars(income);
  const probs = D.curves[key];
  const svg = document.getElementById("curve-chart");
  clear(svg);
  const pad = { l: 52, r: 16, t: 16, b: 36 };
  const w = 680;
  const h = 320;
  const y1 = 0.7;
  const X = (x) => scale(x, D.incomes[0], D.incomes[D.incomes.length - 1], pad.l, w - pad.r);
  const Y = (y) => scale(y, 0, y1, h - pad.b, pad.t);
  [0, 0.167, 0.5].forEach((level) => {
    const klass = level === 0.167 ? "pay" : "guide";
    svg.appendChild(el("line", { x1: pad.l, y1: Y(level), x2: w - pad.r, y2: Y(level), class: klass }));
  });
  text(svg, "50%", w - pad.r, Y(0.5) - 6, "end");
  text(svg, "0.167", w - pad.r, Y(0.167) - 6, "end");
  text(svg, "0", pad.l - 8, Y(0) + 4, "end");
  const points = probs.map((p, i) => X(D.incomes[i]) + "," + Y(p)).join(" ");
  svg.appendChild(el("polyline", { points, class: "series" }));
  const p = probs[index];
  svg.appendChild(el("line", { x1: X(income), y1: Y(0), x2: X(income), y2: Y(p), class: "guide" }));
  svg.appendChild(el("circle", { cx: X(income), cy: Y(p), r: 5, class: "dot" }));
  text(svg, "$20k", X(D.incomes[0]), h - 14, "start");
  text(svg, "$150k", X(D.incomes[D.incomes.length - 1]), h - 14, "end");
  text(svg, "Income", (pad.l + w - pad.r) / 2, h - 2, "middle");
  const funded = p <= D.break_even;
  const score = Math.log(p / (1 - p));
  document.getElementById("curve-readout").textContent =
    `Grade ${grade}, ${term} months, income ${dollars(income)}, loan amount ${dollars(Number(amount))}. ` +
    `Score ${score.toFixed(2)}. Probability of charge-off ${pct(p)}. ` +
    (funded
      ? "The $15 / $75 rule funds this profile."
      : "The $15 / $75 rule leaves this profile unfunded.");
}

function nearestCut(value) {
  let best = D.thresholds[0];
  let gap = Infinity;
  D.thresholds.forEach((row) => {
    const next = Math.abs(row.threshold - value);
    if (next < gap) {
      gap = next;
      best = row;
    }
  });
  return best;
}

function drawCutoff() {
  const value = Number(document.getElementById("cutoff").value);
  const row = nearestCut(value);
  document.getElementById("cut-out").textContent = row.threshold.toFixed(4);
  const svg = document.getElementById("cut-chart");
  clear(svg);
  const pad = { l: 52, r: 16 };
  const w = 680;
  const x0 = 0;
  const x1 = 0.25;
  const X = (x) => scale(x, x0, x1, pad.l, w - pad.r);
  const histTop = 16;
  const histBot = 180;
  const maxCount = Math.max(...D.histogram.repaid, ...D.histogram.defaulted);
  const HY = (count) => scale(count, 0, maxCount, histBot, histTop);
  const edges = D.histogram.edges;
  for (let i = 0; i < D.histogram.repaid.length; i += 1) {
    if (edges[i] >= 0.25) continue;
    const x = X(edges[i]);
    const width = Math.max(1, X(edges[i + 1]) - x - 1);
    svg.appendChild(el("rect", {
      x, y: HY(D.histogram.repaid[i]), width, height: histBot - HY(D.histogram.repaid[i]), class: "repaid",
    }));
    svg.appendChild(el("rect", {
      x, y: HY(D.histogram.defaulted[i]), width, height: histBot - HY(D.histogram.defaulted[i]), class: "charged",
    }));
  }
  text(svg, "Validation loans", pad.l, 12, "start");

  const profitTop = 214;
  const profitBot = 400;
  const PY = (profit) => scale(profit, 0, 5, profitBot, profitTop);
  [0, 2, 4].forEach((tick) => {
    svg.appendChild(el("line", { x1: pad.l, y1: PY(tick), x2: w - pad.r, y2: PY(tick), class: "axis" }));
    text(svg, "$" + tick, pad.l - 8, PY(tick) + 4, "end");
  });
  const points = D.thresholds
    .filter((item) => item.threshold <= 0.5)
    .map((item) => X(item.threshold) + "," + PY(item.profit_per_candidate))
    .join(" ");
  svg.appendChild(el("polyline", { points, class: "profit" }));
  const mark = D.chosen_threshold;
  svg.appendChild(el("line", { x1: X(mark), y1: histTop, x2: X(mark), y2: profitBot, class: "chosen" }));
  svg.appendChild(el("line", { x1: X(row.threshold), y1: histTop, x2: X(row.threshold), y2: profitBot, class: "pay" }));
  text(svg, "0", X(0), 424, "start");
  text(svg, "25%", X(0.25), 424, "end");
  text(svg, "Probability of charge-off", (pad.l + w - pad.r) / 2, 436, "middle");
  const atChoice = Math.abs(row.threshold - mark) < 0.0001;
  document.getElementById("cut-readout").textContent =
    `Cutoff ${(row.threshold * 100).toFixed(2)}%: profit ${money(row.profit_per_candidate)} per candidate loan ` +
    `(${money(row.total_profit)}), ${row.n_funded.toLocaleString("en-US")} loans funded ` +
    `(${pct(row.funded_share, 1)}).` +
    (atChoice ? " This is the validation peak, 16.25%." : "");
}

function nearestRow(rows, value, key) {
  let best = rows[0];
  let gap = Infinity;
  rows.forEach((row) => {
    const next = Math.abs(row[key] - value);
    if (next < gap) {
      gap = next;
      best = row;
    }
  });
  return best;
}

function drawPortfolio() {
  const value = Number(document.getElementById("portfolio-n").value);
  const row = nearestRow(D.portfolio, value, "n");
  document.getElementById("portfolio-out").textContent = row.n.toLocaleString("en-US");
  const svg = document.getElementById("portfolio-chart");
  clear(svg);
  const pad = { l: 52, r: 16 };
  const w = 680;
  const n0 = D.portfolio[0].n;
  const n1 = D.portfolio[D.portfolio.length - 1].n;
  const X = (n) => scale(n, n0, n1, pad.l, w - pad.r);
  const retTop = 16;
  const retBot = 180;
  const returns = D.portfolio.map((item) => item.return);
  const rMax = Math.max(...returns);
  const RY = (r) => scale(r, 0.08, Math.max(0.32, rMax), retBot, retTop);
  const profitTop = 214;
  const profitBot = 400;
  const pMax = Math.max(...D.portfolio.map((item) => item.profit));
  const PY = (p) => scale(p, 0, pMax, profitBot, profitTop);
  [0.10, 0.20, 0.30].forEach((tick) => {
    if (tick > rMax + 0.02) return;
    svg.appendChild(el("line", { x1: pad.l, y1: RY(tick), x2: w - pad.r, y2: RY(tick), class: "axis" }));
    text(svg, pct(tick, 0), pad.l - 8, RY(tick) + 4, "end");
  });
  svg.appendChild(el("polyline", {
    points: D.portfolio.map((item) => X(item.n) + "," + RY(item.return)).join(" "),
    class: "series",
  }));
  [0, pMax / 2, pMax].forEach((tick) => {
    svg.appendChild(el("line", { x1: pad.l, y1: PY(tick), x2: w - pad.r, y2: PY(tick), class: "axis" }));
    text(svg, "$" + Math.round(tick), pad.l - 8, PY(tick) + 4, "end");
  });
  svg.appendChild(el("polyline", {
    points: D.portfolio.map((item) => X(item.n) + "," + PY(item.profit)).join(" "),
    class: "profit",
  }));
  svg.appendChild(el("line", { x1: X(700), y1: retTop, x2: X(700), y2: profitBot, class: "chosen" }));
  svg.appendChild(el("line", { x1: X(row.n), y1: retTop, x2: X(row.n), y2: profitBot, class: "pay" }));
  text(svg, "n", (pad.l + w - pad.r) / 2, 424, "middle");
  document.getElementById("portfolio-readout").textContent =
    `Top ${row.n.toLocaleString("en-US")} loans: realised return ${pct(row.return)}, ` +
    `profit ${money(row.profit)} on $${row.n.toLocaleString("en-US")}.` +
    (row.n === 700 ? " This is the portfolio of 700 loans." : "");
}

function drawLoss() {
  const value = Number(document.getElementById("loss").value);
  const row = nearestRow(D.loss, value, "loss");
  document.getElementById("loss-out").textContent = pct(row.loss, 0);
  const svg = document.getElementById("loss-chart");
  clear(svg);
  const pad = { l: 52, r: 16, t: 16, b: 36 };
  const w = 680;
  const h = 280;
  const X = (x) => scale(x, 0.30, 0.90, pad.l, w - pad.r);
  const Y = (y) => scale(y, 0.10, 0.32, h - pad.b, pad.t);
  [0.15, 0.20, 0.25, 0.30].forEach((tick) => {
    svg.appendChild(el("line", { x1: pad.l, y1: Y(tick), x2: w - pad.r, y2: Y(tick), class: "axis" }));
    text(svg, pct(tick, 0), pad.l - 8, Y(tick) + 4, "end");
  });
  svg.appendChild(el("polyline", {
    points: D.loss.map((item) => X(item.loss) + "," + Y(item.return)).join(" "),
    class: "series",
  }));
  svg.appendChild(el("line", { x1: X(0.60), y1: pad.t, x2: X(0.60), y2: h - pad.b, class: "chosen" }));
  svg.appendChild(el("line", { x1: X(row.loss), y1: pad.t, x2: X(row.loss), y2: Y(row.return), class: "pay" }));
  svg.appendChild(el("circle", { cx: X(row.loss), cy: Y(row.return), r: 5, class: "dot" }));
  text(svg, "30%", X(0.30), h - 14, "start");
  text(svg, "90%", X(0.90), h - 14, "end");
  text(svg, "Loss if the loan defaults", (pad.l + w - pad.r) / 2, h - 2, "middle");
  document.getElementById("loss-readout").textContent =
    `The same 700 loans, if a default loses ${pct(row.loss, 0)}: realised return ${pct(row.return)}, ` +
    `profit ${money(row.profit)}.`;
}

function drawCost() {
  const value = Number(document.getElementById("cost").value);
  const row = nearestRow(D.cost, value, "c");
  document.getElementById("cost-out").textContent = "$" + Math.round(row.c).toLocaleString("en-US");
  const svg = document.getElementById("cost-chart");
  clear(svg);
  const pad = { l: 52, r: 16, t: 16, b: 36 };
  const w = 680;
  const h = 280;
  const X = (x) => scale(x, 0, 6000, pad.l, w - pad.r);
  const Y = (y) => scale(y, -0.02, 0.13, h - pad.b, pad.t);
  [0, 0.05, 0.10].forEach((tick) => {
    svg.appendChild(el("line", { x1: pad.l, y1: Y(tick), x2: w - pad.r, y2: Y(tick), class: "axis" }));
    text(svg, pct(tick, 0), pad.l - 8, Y(tick) + 4, "end");
  });
  svg.appendChild(el("polyline", {
    points: D.cost.map((item) => X(item.c) + "," + Y(item.return)).join(" "),
    class: "series",
  }));
  svg.appendChild(el("line", { x1: X(D.c_star), y1: pad.t, x2: X(D.c_star), y2: h - pad.b, class: "chosen" }));
  svg.appendChild(el("line", { x1: X(row.c), y1: pad.t, x2: X(row.c), y2: Y(row.return), class: "pay" }));
  svg.appendChild(el("circle", { cx: X(row.c), cy: Y(row.return), r: 5, class: "dot" }));
  text(svg, "$0", X(0), h - 14, "start");
  text(svg, "$6,000", X(6000), h - 14, "end");
  text(svg, "Collection cost C", (pad.l + w - pad.r) / 2, h - 2, "middle");
  document.getElementById("cost-readout").textContent =
    `At C = $${Math.round(row.c).toLocaleString("en-US")}, the mean return on $1 in every validation loan is ${pct(row.return)}. ` +
    `The break-even cost is $${Math.round(D.c_star).toLocaleString("en-US")}.`;
}

function renderStage() {
  const body = document.querySelector("#stage-table tbody");
  D.stage.forEach((row) => {
    const tr = document.createElement("tr");
    if (row.id === D.chosen.id) tr.className = "chosen";
    let gate = "Pass";
    if (row.baseline) gate = "Baseline";
    else if (!row.passed) gate = "Fail";
    else if (row.id === "spline_l1") gate = "Pass, best";
    tr.innerHTML =
      `<td>${row.label}</td><td>${row.roc_auc.toFixed(3)}</td><td>${row.brier.toFixed(3)}</td>` +
      `<td>${gate}</td><td>${row.threshold.toFixed(4)}</td><td>${money(row.profit_per_candidate)}</td>`;
    body.appendChild(tr);
  });
}

function renderTest() {
  const t = D.test;
  const rows = [
    ["ROC-AUC", t.roc_auc, t.baseline_roc_auc],
    ["PR-AUC", t.pr_auc, t.baseline_pr_auc],
    ["Gini", t.gini, 0],
    ["KS", t.ks, 0],
    ["Brier", t.brier, t.baseline_brier],
    ["Log loss", t.log_loss, t.baseline_log_loss],
    ["Precision", t.precision, 0],
    ["Recall", t.recall, 0],
    ["F1", t.f1, 0],
    ["Specificity", t.specificity, 1],
    ["Profit per candidate", t.profit_per_candidate, t.baseline_profit_per_candidate],
  ];
  const body = document.querySelector("#test-table tbody");
  rows.forEach(([label, a, b]) => {
    const tr = document.createElement("tr");
    const format = label.startsWith("Profit") ? money : (x) => x.toFixed(3);
    tr.innerHTML = `<td>${label}</td><td>${format(a)}</td><td>${format(b)}</td>`;
    body.appendChild(tr);
  });
  document.getElementById("test-prose").textContent =
    `The constant score funds every test loan, because the training default rate is below 0.1725. ` +
    `Spline L1 funds ${pct(t.funded_share, 0)} of them and makes ${money(t.profit_per_candidate)} per candidate ` +
    `(${money(t.total_profit)}) against ${money(t.baseline_profit_per_candidate)} (${money(t.baseline_total_profit)}).`;
}

function bindPressed(container, onChange) {
  container.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button) return;
    container.querySelectorAll("button").forEach((item) => item.setAttribute("aria-pressed", "false"));
    button.setAttribute("aria-pressed", "true");
    onChange();
  });
}

function initControls() {
  const feature = document.getElementById("bin-feature");
  Object.entries(D.bins).forEach(([key, spec]) => {
    const option = document.createElement("option");
    option.value = key;
    option.textContent = spec.label;
    feature.appendChild(option);
  });
  feature.addEventListener("change", drawBins);

  const grades = document.getElementById("grade-buttons");
  list("ABCDEFG").forEach((grade, i) => {
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.grade = grade;
    button.textContent = grade;
    button.setAttribute("aria-pressed", i === 1 ? "true" : "false");
    grades.appendChild(button);
  });
  bindPressed(grades, drawCurve);

  const terms = document.getElementById("term-buttons");
  [["36", "36 months"], ["60", "60 months"]].forEach(([term, label], i) => {
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.term = term;
    button.textContent = label;
    button.setAttribute("aria-pressed", i === 0 ? "true" : "false");
    terms.appendChild(button);
  });
  bindPressed(terms, drawCurve);

  const amount = document.getElementById("amount");
  D.amounts.forEach((value) => {
    const option = document.createElement("option");
    option.value = String(value);
    option.textContent = dollars(value);
    if (value === 10000) option.selected = true;
    amount.appendChild(option);
  });
  amount.addEventListener("change", drawCurve);
  const income = document.getElementById("income");
  income.max = String(D.incomes.length - 1);
  let nearest = 0;
  D.incomes.forEach((value, index) => {
    if (Math.abs(value - D.median_income) < Math.abs(D.incomes[nearest] - D.median_income)) nearest = index;
  });
  income.value = String(nearest);
  income.addEventListener("input", drawCurve);
  document.getElementById("cutoff").addEventListener("input", drawCutoff);
  const nSlider = document.getElementById("portfolio-n");
  nSlider.min = String(D.portfolio[0].n);
  nSlider.max = String(D.portfolio[D.portfolio.length - 1].n);
  nSlider.value = "700";
  document.getElementById("portfolio-n").addEventListener("input", drawPortfolio);
  document.getElementById("loss").addEventListener("input", drawLoss);
  document.getElementById("cost").addEventListener("input", drawCost);
}

function list(text) {
  return text.split("");
}

initControls();
drawBins();
drawCurve();
drawCutoff();
drawPortfolio();
drawLoss();
drawCost();

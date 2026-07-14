"use client";

import { useMemo, useState } from "react";

const companies = [
  { name: "Recursion", ticker: "RXRX", model: "Platform + pipeline", stage: "Phase II", focus: "TechBio at scale", signal: "Public", score: 86 },
  { name: "Schrödinger", ticker: "SDGR", model: "Software + pipeline", stage: "Phase I", focus: "Physics-led design", signal: "Public", score: 82 },
  { name: "Insilico Medicine", ticker: "Private", model: "Platform + pipeline", stage: "Phase III", focus: "Generative chemistry", signal: "Late-stage", score: 91 },
  { name: "Isomorphic Labs", ticker: "Private", model: "Partner-led", stage: "Discovery", focus: "Structure prediction", signal: "Strategic", score: 88 },
  { name: "Generate:Biomedicines", ticker: "Private", model: "Platform + pipeline", stage: "Phase I", focus: "Generative biology", signal: "Clinical", score: 84 },
  { name: "XtalPi", ticker: "2228.HK", model: "Platform + services", stage: "Clinical", focus: "Robotics + physics", signal: "Public", score: 78 },
];

const stages = [
  { n: "01", title: "Target discovery", text: "Find disease biology worth pursuing.", state: "AI advantage" },
  { n: "02", title: "Hit discovery", text: "Search vast chemical and protein spaces.", state: "AI advantage" },
  { n: "03", title: "Lead optimization", text: "Balance potency, safety and exposure.", state: "AI advantage" },
  { n: "04", title: "Preclinical", text: "Validate efficacy and toxicology in models.", state: "Bottleneck" },
  { n: "05", title: "Clinical trials", text: "Prove safety and benefit in people.", state: "Value inflection" },
];

const briefs = [
  { date: "JUL 14", tag: "MARKET", title: "The sector is shifting from platform stories to clinical proof", text: "Programs with differentiated human data increasingly set the valuation ceiling; discovery speed alone is no longer enough." },
  { date: "JUL 11", tag: "PIPELINE", title: "Late-stage assets are becoming the cleanest benchmark", text: "Phase II and III readouts now provide a clearer test of whether AI-originated molecules translate into better medicines." },
  { date: "JUL 08", tag: "DEALS", title: "Large-pharma partnerships remain the strongest external validation", text: "Upfront economics, target selection rights and milestone quality matter more than headline deal value." },
];

type View = "Briefing" | "Pipeline" | "Companies" | "Diligence";

export default function Home() {
  const [view, setView] = useState<View>("Briefing");
  const [query, setQuery] = useState("");
  const [watching, setWatching] = useState<string[]>(["Insilico Medicine", "Recursion"]);

  const filtered = useMemo(() => companies.filter((c) => `${c.name} ${c.ticker} ${c.focus}`.toLowerCase().includes(query.toLowerCase())), [query]);
  const toggle = (name: string) => setWatching((items) => items.includes(name) ? items.filter((x) => x !== name) : [...items, name]);

  return (
    <main className="shell">
      <aside className="sidebar">
        <div className="brand"><span className="brandMark">A·D</span><div><strong>Atlas Drug AI</strong><small>Research workstation</small></div></div>
        <nav aria-label="Primary navigation">
          <p className="navLabel">Workspace</p>
          {(["Briefing", "Pipeline", "Companies", "Diligence"] as View[]).map((item, i) => (
            <button key={item} className={view === item ? "navItem active" : "navItem"} onClick={() => setView(item)}><span>{["◫", "⌁", "◎", "◇"][i]}</span>{item}</button>
          ))}
          <p className="navLabel second">Saved</p>
          <button className="navItem" onClick={() => setView("Companies")}><span>☆</span>Watchlist <em>{watching.length}</em></button>
        </nav>
        <div className="sideNote"><span className="pulse" /> Research snapshot<br/><small>Updated 14 Jul 2026</small></div>
        <div className="profile"><span>KW</span><div><b>Kaelyn Wen</b><small>Private workspace</small></div><button aria-label="Workspace settings">•••</button></div>
      </aside>

      <section className="workspace">
        <header className="topbar"><div><span>AI DRUG DISCOVERY</span><b>/</b><strong>{view}</strong></div><div className="topActions"><button className="iconBtn" aria-label="Search" onClick={() => setView("Companies")}>⌕</button><button className="newBtn" onClick={() => setView("Diligence")}>+ New diligence note</button></div></header>

        {view === "Briefing" && <div className="page">
          <div className="hero">
            <div><p className="eyebrow">INVESTMENT INTELLIGENCE / WEEK 29</p><h1>Where biology meets<br/><em>machine intelligence.</em></h1><p className="lede">A decision-grade view of the companies, clinical assets and strategic signals shaping AI-native drug discovery.</p><div className="heroActions"><button onClick={() => setView("Companies")}>Explore companies <span>→</span></button><button className="textBtn" onClick={() => setView("Pipeline")}>View pipeline map</button></div></div>
            <div className="signalCard"><div className="signalTop"><span>SECTOR SIGNAL</span><b>Constructive</b></div><div className="signalGauge"><span/><i>72</i></div><p>Clinical validation is improving while public-market expectations remain disciplined.</p><div className="signalMeta"><div><b>173+</b><span>Clinical programs</span></div><div><b>Phase III</b><span>Frontier stage</span></div></div></div>
          </div>

          <div className="sectionHead"><div><p className="eyebrow">TODAY’S READ</p><h2>What matters now</h2></div><button onClick={() => setView("Diligence")}>Open research memo →</button></div>
          <div className="briefGrid">{briefs.map((b, i) => <article className={i === 0 ? "brief featured" : "brief"} key={b.title}><div className="briefMeta"><span>{b.date}</span><b>{b.tag}</b></div><h3>{b.title}</h3><p>{b.text}</p><button aria-label={`Read ${b.title}`}>Read analysis <span>↗</span></button></article>)}</div>

          <div className="bottomGrid"><div className="panel"><div className="panelHead"><div><p className="eyebrow">VALUE CHAIN</p><h2>Where AI creates leverage</h2></div><button onClick={() => setView("Pipeline")}>Full map</button></div><div className="leverage"><div><span>Discovery</span><b style={{width:"92%"}}/><em>High</em></div><div><span>Preclinical</span><b style={{width:"64%"}}/><em>Medium</em></div><div><span>Clinical</span><b style={{width:"38%"}}/><em>Emerging</em></div></div></div>
          <div className="panel watchPanel"><div className="panelHead"><div><p className="eyebrow">WATCHLIST</p><h2>Priority names</h2></div><button onClick={() => setView("Companies")}>View all</button></div>{companies.filter(c => watching.includes(c.name)).map(c => <div className="watchRow" key={c.name}><span>{c.name.slice(0,2).toUpperCase()}</span><div><b>{c.name}</b><small>{c.focus}</small></div><em>{c.score}</em></div>)}</div></div>
        </div>}

        {view === "Pipeline" && <div className="page"><div className="pageTitle"><p className="eyebrow">FROM IDEA TO MEDICINE</p><h1>Pipeline intelligence</h1><p>AI compresses discovery. Biology still controls the clock.</p></div><div className="stageList">{stages.map((s) => <article key={s.n}><span>{s.n}</span><div><small>{s.state}</small><h2>{s.title}</h2><p>{s.text}</p></div><b>→</b></article>)}</div><div className="insight"><span>THE CORE DILIGENCE QUESTION</span><p>Does the platform create a repeatable advantage that survives contact with human biology?</p></div></div>}

        {view === "Companies" && <div className="page"><div className="pageTitle rowTitle"><div><p className="eyebrow">COMPANY UNIVERSE</p><h1>AI-native leaders</h1><p>Screen platforms by clinical maturity, business model and strategic signal.</p></div><label className="search"><span>⌕</span><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search companies…" /></label></div><div className="companyTable"><div className="tr head"><span>Company</span><span>Model</span><span>Stage</span><span>Focus</span><span>Score</span><span/></div>{filtered.map(c => <div className="tr" key={c.name}><span className="company"><i>{c.name.slice(0,2).toUpperCase()}</i><b>{c.name}<small>{c.ticker}</small></b></span><span>{c.model}</span><span><em className="stagePill">{c.stage}</em></span><span>{c.focus}</span><span className="score">{c.score}</span><button className={watching.includes(c.name) ? "star saved" : "star"} onClick={() => toggle(c.name)} aria-label={`Toggle ${c.name} watchlist`}>★</button></div>)}</div></div>}

        {view === "Diligence" && <div className="page"><div className="pageTitle"><p className="eyebrow">INVESTMENT COMMITTEE</p><h1>Diligence framework</h1><p>Separate durable platform advantage from compelling scientific storytelling.</p></div><div className="questionGrid">{[
          ["01", "Data advantage", "Is the training data proprietary, relevant and compounding—or merely large?"],
          ["02", "Experimental loop", "How quickly does wet-lab feedback improve the model and change decisions?"],
          ["03", "Clinical translation", "Which claims are supported by human evidence rather than retrospective benchmarks?"],
          ["04", "Economics", "Do retained rights, upfronts and milestones create attractive risk-adjusted value?"],
          ["05", "Defensibility", "Can talent, data, automation and partnerships resist platform commoditization?"],
          ["06", "Capital path", "What milestone unlocks the next financing, partnership or credible exit?"],
        ].map(q => <article key={q[0]}><span>{q[0]}</span><h2>{q[1]}</h2><p>{q[2]}</p><button>Add evidence +</button></article>)}</div></div>}
      </section>
    </main>
  );
}

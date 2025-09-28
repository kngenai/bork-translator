
'use client';
import { useMemo, useState } from 'react';

const BREEDS = ["Labrador Retriever","Golden Retriever","German Shepherd","French Bulldog","Beagle","Poodle","Husky","Border Collie","Corgi","Dachshund","Shiba","Australian Shepherd","Boxer","Rottweiler","Great Dane"];
const COUNT = ["One bork","Two borks","Pack chorus"];
const PITCH = ["Squeaky","Middle","Thunder"];
const URGENCY = ["Casual sniff","Snack request","Snack emergency"];
const SQUIRREL = ["0%","50%","100%"];

const BORK_TRANSLATIONS = [
  "I loudly informed the couch that it’s suspicious. Couch did not deny.",
  "Emergency update: I can see the bottom of my bowl. Morale is low.",
  "Doorbell rang inside my soul; I saved us with twelve heroic borks.",
  "Walk was successful. I sniffed everything twice in case it changed.",
  "I hid a crumb under the rug for later. This is called meal prep.",
  "Please escort me to the yard so I may legally sprint in circles.",
  "I did not dig a hole. The yard simply came pre-holed.",
  "Human, I require belly rubs to maintain optimal fluff levels.",
  "I saw a squirrel and briefly became wind. Legs did not consult brain.",
  "You dropped food. I was there. A story of bravery and crumbs.",
  "This sock is now my emotional support noodle. Do not reclaim.",
  "Sunbeam acquired. I am charging to 100% loaf.",
  "The vacuum made eye contact. I retaliated with firm borks.",
  "Package arrived. I yelled it into submission. You’re welcome.",
  "If I sit, treat? If I tilt head, two treat? We can negotiate.",
  "Time is fake; dinner is real; serve the crunchy circle snacks.",
  "I have buried nothing in the couch. Do not check the couch.",
  "Zoomies initiated. Household may experience strong winds.",
  "I heard cheese open from three ZIP codes away. Deploy snacks.",
  "The neighbor dog sent a memo: ‘WOOF.’ I replied: ‘BORK BORK.’"
];

const GIFS = {
  zoomies: [
    "https://media.giphy.com/media/5GoVLqeAOo6PK/giphy.gif",
    "https://media.giphy.com/media/l3vQX4UQGsQ0FvGso/giphy.gif",
    "https://media.giphy.com/media/xT0xeuOy2Fcl9vDGiA/giphy.gif"
  ],
  squirrel: [
    "https://media.giphy.com/media/3o7aD6v1ZC9z3WQJfi/giphy.gif",
    "https://media.giphy.com/media/3otPoGfKpV5znEYGw8/giphy.gif"
  ],
  snack: [
    "https://media.giphy.com/media/3o6Zt8MgUuvSbkZYWc/giphy.gif",
    "https://media.giphy.com/media/3o6Zt6ML6BklcajjsA/giphy.gif"
  ],
  casual: [
    "https://media.giphy.com/media/26BRv0ThflsHCqDrG/giphy.gif",
    "https://media.giphy.com/media/3oEduSbSGpGaRX2Vri/giphy.gif",
    "https://media.giphy.com/media/26ufdipQqU2lhNA4g/giphy.gif"
  ]
};

function pick(arr){ return arr[Math.floor(Math.random()*arr.length)]; }
function pickGif({ urgency, squirrel, zoomies }){
  if (urgency === "Snack emergency" || urgency === "Snack request") return pick(GIFS.snack);
  if (squirrel === "100%") return pick(GIFS.squirrel);
  if (zoomies >= 7) return pick(GIFS.zoomies);
  return pick(GIFS.casual);
}

function mascotEmoji(breed) {
  const b = (breed||'').toLowerCase();
  if (b.includes('corgi')) return '🦊';
  if (b.includes('husky')) return '🐺';
  if (b.includes('shiba')) return '🐕';
  return '🐶';
}

export default function Page() {
  const [breed, setBreed] = useState('');
  const [count, setCount] = useState('One bork');
  const [pitch, setPitch] = useState('Middle');
  const [urgency, setUrgency] = useState('Casual sniff');
  const [squirrel, setSquirrel] = useState('0%');
  const [zoomies, setZoomies] = useState(5);
  const [gifsOn, setGifsOn] = useState(true);
  const [translation, setTranslation] = useState('—');
  const [gifUrl, setGifUrl] = useState('');

  const emoji = useMemo(() => mascotEmoji(breed || ''), [breed]);

  function randomize() {
    const nb = BREEDS[Math.floor(Math.random()*BREEDS.length)];
    const nc = COUNT[Math.floor(Math.random()*COUNT.length)];
    const np = PITCH[Math.floor(Math.random()*PITCH.length)];
    const nu = URGENCY[Math.floor(Math.random()*URGENCY.length)];
    const ns = SQUIRREL[Math.floor(Math.random()*SQUIRREL.length)];
    const nz = Math.floor(Math.random()*11);
    setBreed(nb); setCount(nc); setPitch(np); setUrgency(nu); setSquirrel(ns); setZoomies(nz);
  }

  function translate() {
    const line = pick(BORK_TRANSLATIONS);
    setTranslation(line);
    if (gifsOn) setGifUrl(pickGif({ urgency, squirrel, zoomies }));
  }

  return (
    <div>
      <header className="sticky">
        <div className="container" style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:12,padding:'16px 24px'}}>
          <div className="brand">
            <div className="logo" aria-hidden>{emoji}</div>
            <div>
              <div className="title">Dog Bork Translator</div>
              <div className="subtitle">Entertainment only. Certified in Bork‑itecture, minor in Zoomology.</div>
            </div>
          </div>
          <span className="pill">Bork means hello!</span>
        </div>
      </header>

      <main className="container">
        <div className="grid two">
          <section className="card">
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:12, marginBottom: 8}}>
              <div>
                <h2>Describe the bork</h2>
                <p className="muted">Pick a breed, dial the <strong>Bork‑Meter</strong>, then hit Translate.</p>
              </div>
              <button className="btn" onClick={randomize}>🔀 Randomize</button>
            </div>

            <div className="row two">
              <div>
                <label htmlFor="breed">Dog breed</label>
                <select id="breed" value={breed} onChange={e=>setBreed(e.target.value)}>
                  <option value="">Select a breed</option>
                  {BREEDS.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>

              <div>
                <label>Bork count</label>
                <div className="seg">
                  {COUNT.map(c => (
                    <button key={c} className={"btn "+(c===count?'is-active':'')} onClick={()=>setCount(c)}>{c}</button>
                  ))}
                </div>
              </div>

              <div>
                <label>Pitch</label>
                <div className="seg">
                  {PITCH.map(p => (
                    <button key={p} className={"btn "+(p===pitch?'is-active':'')} onClick={()=>setPitch(p)}>{p}</button>
                  ))}
                </div>
              </div>

              <div>
                <label>Urgency</label>
                <div className="seg">
                  {URGENCY.map(u => (
                    <button key={u} className={"btn "+(u===urgency?'is-active':'')} onClick={()=>setUrgency(u)}>{u}</button>
                  ))}
                </div>
              </div>

              <div>
                <label>Squirrel %</label>
                <div className="seg">
                  {SQUIRREL.map(s => (
                    <button key={s} className={"btn "+(s===squirrel?'is-active':'')} onClick={()=>setSquirrel(s)}>{s}</button>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="zoomies">Zoomies</label>
                <input id="zoomies" type="range" min={0} max={10} value={zoomies} onChange={e=>setZoomies(parseInt(e.target.value))} style={{width:'100%'}} />
                <div className="subtitle" style={{textAlign:'right'}}>{zoomies}/10</div>
              </div>
            </div>
          </section>

          <section className="card">
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:12, marginBottom: 8}}>
              <h2>Translator</h2>
              <div style={{display:'flex',alignItems:'center',gap:12}}>
                <label className="switch">
                  <input type="checkbox" checked={gifsOn} onChange={e=>setGifsOn(e.target.checked)} />
                  <span>GIFs on</span>
                </label>
                <button className="btn primary" onClick={translate}>✨ Translate</button>
              </div>
            </div>

            <div className="output">
              <div className="subtitle">Output</div>
              <p style={{marginTop:6, lineHeight:1.6}}>{translation}</p>
              {gifsOn && gifUrl && (
                <div className="gifwrap">
                  <img src={gifUrl} alt="Fun dog GIF illustrating the bork vibe" />
                </div>
              )}
            </div>
          </section>
        </div>

        <section className="card" style={{marginTop:24}}>
          <div style={{display:'flex',gap:10}}>
            <div aria-hidden>ℹ️</div>
            <p className="subtitle">This is a just‑for‑fun translator. For serious conversations, please address your dog using full sentences and snacks.</p>
          </div>
        </section>
      </main>

      <footer>
        <div>© {new Date().getFullYear()} Bark‑Web. All rights reserved. Powered by wigglebutts.</div>
        <div style={{marginTop:6}}>v1.2 • Built with Next.js • Now with extra Borks</div>
      </footer>
    </div>
  );
}

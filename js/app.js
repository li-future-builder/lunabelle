/* ═════════════════════════ DATA ═════════════════════════ */
const MEDITATIONS=[
 {id:1,title:"Soft Morning Light",cat:"Morning Energy",dur:10,lvl:"gentle",scene:"dawn",emoji:"🌅",desc:"Wake slowly. Let the day arrive like sunlight through curtains.",sound:null},
 {id:2,title:"Rose Petal Confidence",cat:"Confidence",dur:10,lvl:"gentle",scene:"garden",emoji:"🌸",desc:"A tender practice for standing a little taller, softly.",sound:"wind"},
 {id:3,title:"The Quiet Ocean",cat:"Calm",dur:15,lvl:"all levels",scene:"ocean",emoji:"🌊",desc:"Breathe with the tide until your thoughts grow quiet.",sound:"ocean"},
 {id:4,title:"Moonlit Bedroom",cat:"Sleep",dur:20,lvl:"all levels",scene:"moon",emoji:"🌙",desc:"A lullaby for your mind, drifting toward deep rest.",sound:"rain"},
 {id:5,title:"Pink Cloud Drift",cat:"Anxiety Relief",dur:10,lvl:"beginner",scene:"clouds",emoji:"☁️",desc:"For heavy days. Float a little lighter, one breath at a time.",sound:"wind"},
 {id:6,title:"Heart Reset",cat:"Emotional Reset",dur:15,lvl:"all levels",scene:"candle",emoji:"🕯️",desc:"Put everything down for a while. You can pick it up later.",sound:null},
 {id:7,title:"Garden of Self-Love",cat:"Self-Love",dur:15,lvl:"gentle",scene:"garden",emoji:"🌷",desc:"Speak kindly to yourself. Mean it, even a little.",sound:"wind"},
 {id:8,title:"Rainy Window",cat:"Healing",dur:20,lvl:"all levels",scene:"rain",emoji:"🌧️",desc:"Let the rain hold what you can't hold right now.",sound:"rain"},
 {id:9,title:"Dreamy Galaxy",cat:"Night Meditation",dur:30,lvl:"deep",scene:"galaxy",emoji:"🌌",desc:"A long journey through starlight into deep sleep.",sound:"brown"},
 {id:10,title:"Golden Focus",cat:"Focus",dur:10,lvl:"gentle",scene:"dawn",emoji:"✨",desc:"Clear the fog. One soft, steady point of attention.",sound:null},
 {id:11,title:"Satin Stillness",cat:"Deep Relaxation",dur:20,lvl:"deep",scene:"candle",emoji:"🦢",desc:"Unwind every knot. Luxurious, slow, complete rest.",sound:null},
 {id:12,title:"Mirror, Mirror",cat:"Self-Confidence",dur:5,lvl:"beginner",scene:"clouds",emoji:"🪞",desc:"Five minutes to meet yourself with kindness.",sound:null}
];
const CATS=["All","Self-Love","Confidence","Calm","Sleep","Anxiety Relief","Emotional Reset","Morning Energy","Healing","Deep Relaxation","Night Meditation","Focus","Self-Confidence"];
const CAT_ICONS={
 "Self-Love":"🌸","Confidence":"🎀","Calm":"🦢","Sleep":"🌙","Anxiety Relief":"☁️",
 "Emotional Reset":"💗","Morning Energy":"✨","Healing":"🌷","Deep Relaxation":"🕯️",
 "Night Meditation":"🌌","Focus":"💫","Self-Confidence":"🪞"
};
const MANTRAS=["I am safe in this moment.","I allow myself to slow down.","I trust myself.","I am becoming the person I want to be.","I deserve peaceful moments.","My mind can rest.","I choose peace over pressure.","I am enough.","Softness is not weakness.","I give myself permission to begin again.","My breath is my anchor.","I am held, even now."];
const AFFS={
 "Self-Love":["I treat myself like someone I love.","My heart is worth gentle words.","I am not too much. I am just right."],
 "Confidence":["I can be nervous and still shine.","Quiet confidence looks beautiful on me.","I don't need to be perfect to be powerful."],
 "School & Work":["I do my best, and that is enough.","One small step still counts as progress.","My mind is clear and my effort matters."],
 "Relationships":["I love softly and receive love softly.","The right people feel like calm.","I am whole, with or without anyone's approval."],
 "Growth":["Becoming takes time, and I'm in no rush.","Every version of me deserves compassion.","I bloom at my own pace."],
 "Peace":["I release what I cannot control.","Nothing is urgent in this moment.","My peace is my priority."],
 "Morning":["Today, I choose softness over stress.","A new day, a gentle start.","I welcome today with an open heart."],
 "Night":["I did enough today.","My worries can wait until morning.","Rest is productive too."],
 "Future Self":["My future self is already proud of me.","Good things are quietly on their way.","I am building a life I love, slowly."],
 "Personal Goals":["Small steps, repeated, become magic.","I keep my promises to myself.","Discipline, but make it gentle."]
};
const INTENTIONS=["I want to feel calmer.","I want to sleep better.","I want more confidence.","I want to practice self-love.","I want to focus.","I want to release stress."];
const INTENTION_CATEGORY={
 "I want to feel calmer.":"Calm",
 "I want to sleep better.":"Sleep",
 "I want more confidence.":"Confidence",
 "I want to practice self-love.":"Self-Love",
 "I want to focus.":"Focus",
 "I want to release stress.":"Emotional Reset"
};
const J_PROMPTS=["How am I feeling today?","What am I grateful for?","What do I need right now?","What am I letting go of?","What am I proud of?"];
const MOODS=[{e:"🌧",l:"heavy"},{e:"🌥",l:"meh"},{e:"🌤",l:"okay"},{e:"🌷",l:"good"},{e:"✨",l:"glowing"}];
const SCENES={moon:"scene-moon",clouds:"scene-clouds",garden:"scene-garden",ocean:"scene-ocean",galaxy:"scene-galaxy",candle:"scene-candle",rain:"scene-rain",dawn:"scene-dawn"};
const BREATHS={box:{name:"box breathing · 4-4-4-4",phases:[["Inhale",4],["Hold",4],["Exhale",4],["Rest",4]]},f478:{name:"4-7-8 · sleep wind-down",phases:[["Inhale",4],["Hold",7],["Exhale",8]]},deep:{name:"deep belly breath",phases:[["Inhale",4],["Exhale",6]]}};

/* ═════════════════════════ STORAGE (private, local only) ═════════════════════════ */
const DB={
 get(k,d){try{const v=localStorage.getItem("lunabelle."+k);return v?JSON.parse(v):d}catch(e){return d}},
 set(k,v){localStorage.setItem("lunabelle."+k,JSON.stringify(v))},
 all(){const o={};for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);if(k.startsWith("lunabelle."))o[k]=localStorage.getItem(k)}return o},
 wipe(){Object.keys(DB.all()).forEach(k=>localStorage.removeItem(k))}
};
let favs=DB.get("favs",[]),favMantras=DB.get("favMantras",[]),entries=DB.get("entries",[]),
    moodLog=DB.get("mood",{}),progress=DB.get("progress",{sessions:0,seconds:0,streak:{last:null,count:0},days:{}}),
    settings=DB.get("settings",{analytics:false,motion:false}),intention=DB.get("intention",null),name=DB.get("name","");

/* ═════════════════════════ HELPERS ═════════════════════════ */
const $=s=>document.querySelector(s);
function toast(m){const t=$("#toast");t.textContent=m;t.classList.add("show");clearTimeout(t._t);t._t=setTimeout(()=>t.classList.remove("show"),2400)}
function fmt(s){s=Math.max(0,Math.round(s));return Math.floor(s/60)+":"+String(s%60).padStart(2,"0")}
function todayKey(){return new Date().toISOString().slice(0,10)}
function greeting(){const h=new Date().getHours();const g=h<12?"Good morning":h<19?"Good afternoon":"Good evening";$("#greetingName").textContent=name?g+", "+name:g}

/* ═════════════════════════ AUDIO ENGINE (original, generated) ═════════════════════════ */
const AE={ctx:null,music:null,nature:null,active:{},
 init(){if(this.ctx)return;this.ctx=new(window.AudioContext||window.webkitAudioContext)();
  this.music=this.ctx.createGain();this._mv=($("#volMusic")?$("#volMusic").value:45)/100*.9;this.music.gain.value=this._mv;this.music.connect(this.ctx.destination);
  this.nature=this.ctx.createGain();this._nv=($("#volNature")?$("#volNature").value:40)/100*.9;this.nature.gain.value=this._nv;this.nature.connect(this.ctx.destination);
  this.muted=false;
  // dreamy pad: soft detuned sines, slow breathing LFOs
  [174.61,220,261.63,329.63].forEach((f,i)=>{const o=this.ctx.createOscillator();o.type="sine";o.frequency.value=f;
   const g=this.ctx.createGain();g.gain.value=0;
   const lfo=this.ctx.createOscillator();lfo.frequency.value=.06+i*.025;
   const lg=this.ctx.createGain();lg.gain.value=.04;lfo.connect(lg);lg.connect(g.gain);
   o.connect(g);g.connect(this.music);o.start();lfo.start();g.gain.setTargetAtTime(.045,this.ctx.currentTime,4)});
  // airy shimmer bell every ~9s
  setInterval(()=>{if(AE.playing&&!document.hidden){const t=this.ctx.currentTime;const o=this.ctx.createOscillator();o.type="sine";o.frequency.value=1046.5;
   const g=this.ctx.createGain();g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.05,t+.05);g.gain.exponentialRampToValueAtTime(.0001,t+4);
   o.connect(g);g.connect(this.music);o.start(t);o.stop(t+4)}},9000);
 },
 buffer(kind){const len=this.ctx.sampleRate*3,b=this.ctx.createBuffer(1,len,this.ctx.sampleRate),d=b.getChannelData(0);let last=0;
  for(let i=0;i<len;i++){const w=Math.random()*2-1;
   if(kind==="brown"){last=(last+.02*w)/1.02;d[i]=last*3.2}
   else if(kind==="pink"){last=.98*last+.02*w;d[i]=last*3}
   else d[i]=w}
  return b},
 startSound(kind){if(!this.ctx||this.active[kind])return;const src=this.ctx.createBufferSource();src.buffer=this.buffer(kind);src.loop=true;
  const f=this.ctx.createBiquadFilter();const g=this.ctx.createGain();g.gain.value=0;
  if(kind==="rain"){f.type="bandpass";f.frequency.value=1400;f.Q.value=.6;g.gain.setTargetAtTime(.5,this.ctx.currentTime,2)}
  if(kind==="ocean"){f.type="lowpass";f.frequency.value=480;
   const lfo=this.ctx.createOscillator();lfo.frequency.value=.09;const lg=this.ctx.createGain();lg.gain.value=.35;lfo.connect(lg);lg.connect(g.gain);lfo.start();
   g.gain.setTargetAtTime(.4,this.ctx.currentTime,2)}
  if(kind==="wind"){f.type="lowpass";f.frequency.value=340;
   const lfo=this.ctx.createOscillator();lfo.frequency.value=.13;const lg=this.ctx.createGain();lg.gain.value=.5;lfo.connect(lg);lg.connect(g.gain);lfo.start();
   g.gain.setTargetAtTime(.45,this.ctx.currentTime,2)}
  if(kind==="brown"){f.type="lowpass";f.frequency.value=220;g.gain.setTargetAtTime(.55,this.ctx.currentTime,2)}
  src.connect(f);f.connect(g);g.connect(this.nature);src.start();this.active[kind]={src,g}},
 stopSound(kind){const h=this.active[kind];if(!h)return;h.g.gain.setTargetAtTime(0,this.ctx.currentTime,1.2);setTimeout(()=>{try{h.src.stop()}catch(e){}},3000);delete this.active[kind]},
 stopAllNature(){Object.keys(this.active).forEach(k=>this.stopSound(k))},
 setMuted(m){this.muted=m;if(!this.ctx)return;const t=this.ctx.currentTime;
  this.music.gain.setTargetAtTime(m?0:this._mv,t,.5);
  this.nature.gain.setTargetAtTime(m?0:this._nv,t,.5);},
 playing:false};

/* speech guidance (browser voice, local) */
function stopSpeak(){if(typeof speechSynthesis!=="undefined")speechSynthesis.cancel()}
function speak(text){if(typeof speechSynthesis==="undefined")return;const u=new SpeechSynthesisUtterance(text);
 u.rate=.88;u.pitch=1.15;u.volume=$("#volVoice").value/100;
 const v=speechSynthesis.getVoices().find(v=>/female|samantha|zira|google uk english female/i.test(v.name));if(v)u.voice=v;
 speechSynthesis.speak(u)}

/* ═════════════════════════ PLAYER ═════════════════════════ */
let currentMed=null,playing=false,elapsed=0,tickInt=null;
function openPlayer(id){currentMed=MEDITATIONS.find(m=>m.id===id);elapsed=0;
 $("#playerTitle").textContent=currentMed.emoji+" "+currentMed.title;
 $("#playerDesc").textContent=currentMed.desc+" · "+currentMed.dur+" min · "+currentMed.lvl;
 $("#timeTotal").textContent=fmt(currentMed.dur*60);setScene(currentMed.scene);
 $("#favPlayerBtn").textContent=favs.includes(id)?"♥":"♡";$("#favPlayerBtn").classList.toggle("faved",favs.includes(id));
 if(playing){playing=false;AE.playing=false;AE.setMuted(true);AE.stopAllNature();stopTick();stopSpeak();
  $("#bigPlay").textContent="▶";$("#playerShell").parentElement.classList.remove("playing")}
 $("#progFill").style.width="0%";$("#timeLeft").textContent=fmt(currentMed.dur*60);
 updateFavList();showView("player")}
function setScene(key){currentMed&&(currentMed._scene=key);
 $("#playerScene").className="player-scene "+SCENES[key];
 $("#sceneEmoji").textContent={moon:"🌙",clouds:"☁️",garden:"🌸",ocean:"🌊",galaxy:"🌌",candle:"🕯️",rain:"🌧️",dawn:"🌅"}[key];
 document.querySelectorAll(".scene-dot").forEach(d=>d.classList.toggle("active",d.dataset.scene===key))}
function togglePlay(){AE.init();if(AE.ctx.state==="suspended")AE.ctx.resume();
 playing=!playing;AE.playing=playing;
 $("#bigPlay").textContent=playing?"❚❚":"▶";$("#playerShell").parentElement.classList.toggle("playing",playing);
 AE.setMuted(!playing);
 if(playing){startTick();
  if(currentMed.sound&&!AE.active[currentMed.sound])AE.startSound(currentMed.sound);
  if($("#guideToggle").checked)speak("Welcome. "+currentMed.title+". "+currentMed.desc)}
 else{stopTick();stopSpeak()}}
function startTick(){stopTick();const total=currentMed.dur*60;tickInt=setInterval(()=>{elapsed++;
 $("#progFill").style.width=Math.min(100,elapsed/total*100)+"%";$("#timeLeft").textContent=fmt(total-elapsed);
 if(elapsed>=total)completeSession()},1000)}
function stopTick(){clearInterval(tickInt)}
function completeSession(){playing=false;AE.playing=false;AE.stopAllNature();AE.setMuted(true);stopTick();stopSpeak();
 $("#bigPlay").textContent="▶";$("#progFill").style.width="100%";
 progress.sessions++;progress.seconds+=currentMed.dur*60;
 const t=todayKey(),y=new Date(Date.now()-864e5).toISOString().slice(0,10);
 if(progress.streak.last!==t){progress.streak.count=(progress.streak.last===y)?progress.streak.count+1:1;progress.streak.last=t}
 const d=progress.days[t]||{min:0};d.min+=currentMed.dur;progress.days[t]=d;
 DB.set("progress",progress);renderProgress();
 toast("session complete ♡ you took time for yourself today");showView("meditate")}
function nextMed(d){const i=MEDITATIONS.findIndex(m=>m.id===currentMed.id);openPlayer(MEDITATIONS[(i+d+MEDITATIONS.length)%MEDITATIONS.length].id)}

/* ═════════════════════════ VIEWS & RENDER ═════════════════════════ */
function showView(v){
 if(v!=="player"&&playing)togglePlay();
 document.querySelectorAll(".view").forEach(x=>x.classList.remove("active"));
 $("#view-"+v).classList.add("active");
 document.querySelectorAll(".nav-item").forEach(n=>n.classList.toggle("active",n.dataset.view===v));
 if(v==="profile")renderProgress();if(v==="journal")renderEntries();if(v==="meditate")renderMeds(currentFilter);window.scrollTo({top:0,behavior:"smooth"})}
document.querySelectorAll(".nav-item").forEach(n=>n.onclick=()=>showView(n.dataset.view));

function renderMeds(filter="All"){$("#medGrid").innerHTML=MEDITATIONS.filter(m=>filter==="All"||m.cat===filter).map(m=>
 `<article class="card med-card" onclick="openPlayer(${m.id})" tabindex="0" role="button" aria-label="Play ${m.title}" onkeydown="if(event.key==='Enter')openPlayer(${m.id})">
  <div class="med-scene ${SCENES[m.scene]}"><span class="emoji">${m.emoji}</span><span class="play-badge">▶</span></div>
  <div class="med-body"><h3>${m.title}</h3><p style="font-size:13px;color:var(--ink-soft);margin-top:4px">${m.desc}</p>
  <div class="med-meta"><span class="pill">${m.dur} min</span><span class="pill">${m.cat}</span><span class="pill">${m.lvl}</span>
  <button class="fav-btn ${favs.includes(m.id)?"faved":""}" onclick="event.stopPropagation();toggleFavMed(${m.id})" aria-label="Favorite">${favs.includes(m.id)?"♥":"♡"}</button></div></div></article>`).join("")}
function toggleFavMed(id){favs=favs.includes(id)?favs.filter(x=>x!==id):[...favs,id];DB.set("favs",favs);
 renderMeds(currentFilter);openPlayerRefreshFav();updateFavList();toast(favs.includes(id)?"saved to favorites ♡":"removed")}
function openPlayerRefreshFav(){if(!currentMed)return;$("#favPlayerBtn").textContent=favs.includes(currentMed.id)?"♥":"♡";$("#favPlayerBtn").classList.toggle("faved",favs.includes(currentMed.id))}
function updateFavList(){const favList=MEDITATIONS.filter(m=>favs.includes(m.id));
 $("#continueRow").innerHTML=favList.length?favList.slice(0,2).map(m=>
  `<div class="card med-card" onclick="openPlayer(${m.id})"><div class="med-scene ${SCENES[m.scene]}"><span class="emoji">${m.emoji}</span></div>
  <div class="med-body"><h3>${m.title}</h3><div class="med-meta"><span class="pill">${m.dur} min</span><span class="pill">continue ♡</span></div></div></div>`).join("")
 :`<div class="card"><p class="soft-msg">favorite a meditation and it will wait for you here ♡</p></div>`;
 const targetCategory=INTENTION_CATEGORY[intention];
 const pool=targetCategory?MEDITATIONS.filter(m=>m.cat===targetCategory):MEDITATIONS;
 const reco=(pool.length?pool:MEDITATIONS).slice(0,2);
 $("#recoRow").innerHTML=reco.map(m=>`<div class="card med-card" onclick="openPlayer(${m.id})"><div class="med-scene ${SCENES[m.scene]}"><span class="emoji">${m.emoji}</span></div>
  <div class="med-body"><h3>${m.title}</h3><p style="font-size:13px;color:var(--ink-soft)">${m.desc}</p><div class="med-meta"><span class="pill">${m.dur} min</span><span class="pill">${m.cat}</span></div></div></div>`).join("")}

/* categories + scene dots */
let currentFilter="All";
$("#catChips").innerHTML=CATS.map((c,i)=>`<button class="chip ${i===0?"active":""}" data-cat="${c}">${c==="All"?"All":`${CAT_ICONS[c]} ${c}`}</button>`).join("");
document.querySelectorAll("#catChips .chip").forEach(ch=>ch.onclick=()=>{currentFilter=ch.dataset.cat;
 document.querySelectorAll("#catChips .chip").forEach(x=>x.classList.toggle("active",x===ch));renderMeds(currentFilter)});
const SCENE_EMOJI={moon:"🌙",clouds:"☁️",garden:"🌸",ocean:"🌊",galaxy:"🌌",candle:"🕯️",rain:"🌧️",dawn:"🌅"};
$("#scenePicker").innerHTML=Object.keys(SCENES).map(k=>`<button class="scene-dot ${SCENES[k]}" data-scene="${k}" aria-label="Scene ${k}">${SCENE_EMOJI[k]}</button>`).join("");
document.querySelectorAll(".scene-dot").forEach(d=>d.onclick=()=>{AE.init();if(AE.ctx.state==="suspended")AE.ctx.resume();AE.stopAllNature();setScene(d.dataset.scene);
 const snd={moon:"rain",clouds:"wind",garden:"wind",ocean:"ocean",galaxy:"brown",candle:null,rain:"rain",dawn:null}[d.dataset.scene];
 if(snd&&playing)AE.startSound(snd)});

/* player controls */
$("#bigPlay").onclick=togglePlay;$("#prevBtn").onclick=()=>nextMed(-1);$("#nextBtn").onclick=()=>nextMed(1);
$("#favPlayerBtn").onclick=()=>currentMed&&toggleFavMed(currentMed.id);
$("#volMusic").oninput=e=>{AE.init();AE._mv=e.target.value/100*.9;if(!AE.muted)AE.music.gain.value=AE._mv};
$("#volNature").oninput=e=>{AE.init();AE._nv=e.target.value/100*.9;if(!AE.muted)AE.nature.gain.value=AE._nv};
$("#quickStart").onclick=()=>openPlayer(4);

/* ═════════════════════════ MANTRAS & AFFIRMATIONS ═════════════════════════ */
let mIdx=new Date().getDate()%MANTRAS.length,affCat="Self-Love",affIdx=0;
function nextMantra(anim){mIdx=(mIdx+1)%MANTRAS.length;const el=$("#mantraMain");el.textContent=MANTRAS[mIdx];
 if(!settings.motion){el.classList.remove("reveal-anim");void el.offsetWidth;el.classList.add("reveal-anim")}
 refreshFavMantraBtn()}
function refreshFavMantraBtn(){const saved=favMantras.includes(MANTRAS[mIdx]);
 $("#favMantraBtn").textContent=saved?"♥ saved":"♡ save";$("#favMantraBtn").style.color=saved?"#E2556B":""}
function toggleFavMantra(){const t=MANTRAS[mIdx];favMantras=favMantras.includes(t)?favMantras.filter(x=>x!==t):[...favMantras,t];
 DB.set("favMantras",favMantras);refreshFavMantraBtn();renderFavMantras();
 toast(favMantras.includes(t)?"mantra saved ♡":"removed")}
function renderFavMantras(){$("#favMantrasList").innerHTML=favMantras.length?favMantras.map(t=>
 `<div class="card"><p class="mantra-text" style="font-size:18px">“${t}”</p></div>`).join("")
 :`<div class="card"><p class="soft-msg">save the mantras that hold you ♡</p></div>`}
$("#affChips").innerHTML=Object.keys(AFFS).map((c,i)=>`<button class="chip ${i===0?"active":""}" data-c="${c}">${c}</button>`).join("");
document.querySelectorAll("#affChips .chip").forEach(ch=>ch.onclick=()=>{affCat=ch.dataset.c;affIdx=0;
 document.querySelectorAll("#affChips .chip").forEach(x=>x.classList.toggle("active",x===ch));nextAffirmation()});
function nextAffirmation(){affIdx=affIdx%AFFS[affCat].length;const el=$("#affMain");
 el.textContent="“"+AFFS[affCat][affIdx]+"”";
 if(!settings.motion){el.classList.remove("reveal-anim");void el.offsetWidth;el.classList.add("reveal-anim")}}
function newAffirmation(){const cats=Object.keys(AFFS);affCat=cats[Math.floor(Math.random()*cats.length)];affIdx=Math.floor(Math.random()*3);
 $("#affMain").textContent="“"+AFFS[affCat][affIdx]+"”";
 const el=$("#affMain");if(!settings.motion){el.classList.remove("reveal-anim");void el.offsetWidth;el.classList.add("reveal-anim")}}
$("#dailyAffirm").textContent="“"+AFFS["Peace"][new Date().getDate()%3]+"”";
$("#dailyMantra").textContent="“"+MANTRAS[new Date().getDate()%MANTRAS.length]+"”";

/* ═════════════════════════ MOOD ═════════════════════════ */
$("#moodRow").innerHTML=MOODS.map((m,i)=>`<button class="mood-btn ${moodLog[todayKey()]===i?"picked":""}" onclick="pickMood(${i})" aria-label="Feeling ${m.l}">${m.e}<div style="font-size:10px;color:var(--ink-soft);letter-spacing:.08em">${m.l}</div></button>`).join("");
function pickMood(i){moodLog[todayKey()]=i;DB.set("mood",moodLog);
 document.querySelectorAll(".mood-btn").forEach((b,bi)=>b.classList.toggle("picked",bi===i));
 $("#moodMsg").textContent=["that's okay. be gentle with yourself today ♡","some days are cloudy. this one will pass ♡","a soft, steady day. that's lovely ♡","so happy for you ♡","you're glowing ✨ keep shining ♡"][i]}

/* ═════════════════════════ BREATHING ═════════════════════════ */
let breathType="box",breathOn=false,bT=null,breathIv=null;
$("#breathChips").innerHTML=Object.keys(BREATHS).map((k,i)=>`<button class="chip ${i===0?"active":""}" data-b="${k}">${BREATHS[k].name}</button>`).join("");
document.querySelectorAll("#breathChips .chip").forEach(ch=>ch.onclick=()=>{stopBreath();breathType=ch.dataset.b;
 $("#breathName").textContent=BREATHS[breathType].name;
 document.querySelectorAll("#breathChips .chip").forEach(x=>x.classList.toggle("active",x===ch));
 $("#breathPhase").textContent="ready?";$("#breathCount").textContent="press begin when you're ready ♡";
 $("#breathCircle").style.transform="scale(1)"});
function stopBreath(){breathOn=false;clearTimeout(bT);$("#breathBtn").textContent="begin"}
$("#breathBtn").onclick=()=>{if(breathOn){stopBreath();return}
 breathOn=true;$("#breathBtn").textContent="rest now";runPhase(0)};
function runPhase(i){if(!breathOn)return;const[label,secs]=BREATHS[breathType].phases[i%BREATHS[breathType].phases.length];
 const c=$("#breathCircle");$("#breathPhase").textContent=label;
 if(!settings.motion)c.style.transitionDuration=secs+"s";
 c.style.transform=(label==="Inhale")?"scale(1.45)":(label==="Exhale"?"scale(.8)":c.style.transform);
 clearInterval(breathIv);let left=secs;$("#breathCount").textContent=left+"s · in… out…";
 breathIv=setInterval(()=>{left--;if(left<=0){clearInterval(breathIv)}else $("#breathCount").textContent=left+"s"},1000);
 bT=setTimeout(()=>runPhase(i+1),secs*1000)}

/* ═════════════════════════ JOURNAL (private, local) ═════════════════════════ */
let jPrompt=J_PROMPTS[0];
$("#journalPrompts").innerHTML=J_PROMPTS.map((p,i)=>`<button class="chip ${i===0?"active":""}" data-p="${p}">${p}</button>`).join("");
document.querySelectorAll("#journalPrompts .chip").forEach(ch=>ch.onclick=()=>{jPrompt=ch.dataset.p;
 document.querySelectorAll("#journalPrompts .chip").forEach(x=>x.classList.toggle("active",x===ch))});
function saveEntry(){const t=$("#journalText").value.trim();if(!t){toast("write a little something first ♡");return}
 entries.unshift({p:jPrompt,t:t,d:new Date().toLocaleString()});DB.set("entries",entries);
 $("#journalText").value="";renderEntries();toast("kept safe, only for you 🔒")}
function delEntry(i){entries.splice(i,1);DB.set("entries",entries);renderEntries();toast("entry erased ♡")}
function renderEntries(){$("#entryList").innerHTML=entries.length?entries.map((e,i)=>
 `<div class="entry"><p class="e-date">${e.d}</p><p class="e-prompt">${e.p}</p><p class="e-text">${e.t.replace(/</g,"&lt;")}</p>
 <button class="btn-ghost" style="margin-top:8px;padding:6px 14px;font-size:11px" onclick="delEntry(${i})">erase</button></div>`).join("")
 :`<div class="card"><p class="soft-msg">your pages are blank and waiting, gently ♡</p></div>`}

/* ═════════════════════════ PROGRESS & SETTINGS ═════════════════════════ */
function renderProgress(){$("#statSessions").textContent=progress.sessions;
 $("#statMinutes").textContent=Math.round(progress.seconds/60);
 $("#statStreak").innerHTML=progress.streak.count+'<span style="font-size:18px"> days</span>';
 $("#streakMsg").textContent=progress.streak.count>0?"every little moment counts ♡":"welcome back ♡ begin whenever you're ready";
 const days=[],now=new Date();
 for(let i=6;i>=0;i--){const d=new Date(now);d.setDate(d.getDate()-i);const k=d.toISOString().slice(0,10);
  days.push({k,label:["su","mo","tu","we","th","fr","sa"][d.getDay()],min:(progress.days[k]||{min:0}).min})}
 const max=Math.max(5,...days.map(d=>d.min));
 $("#weekChart").innerHTML=days.map(d=>`<div class="bar" style="height:${Math.max(4,d.min/max*100)}%" title="${d.min} min"><span class="bar-day">${d.label}</span></div>`).join("");
 $("#intentionChips").innerHTML=INTENTIONS.map(x=>`<button class="chip ${intention===x?"active":""}" data-i="${x}">${x}</button>`).join("");
 document.querySelectorAll("#intentionChips .chip").forEach(ch=>ch.onclick=()=>{intention=ch.dataset.i;DB.set("intention",intention);
  document.querySelectorAll("#intentionChips .chip").forEach(x=>x.classList.toggle("active",x===ch));
  $("#intentionMsg").textContent="we'll gently recommend sessions for this ♡";updateFavList()});
 $("#intentionMsg").textContent=intention?"we'll gently recommend sessions for this ♡":"choose what your heart needs ♡";
 renderPrivacy()}
function renderPrivacy(){
 const rows=[
  {l:"Anonymous product analytics",d:"Only aggregated counts (sessions, completion rates, errors). Never journal entries, moods, names or anything personal. Stored locally.",k:"analytics"},
  {l:"Reduce animations",d:"Calms all motion for comfort and accessibility.",k:"motion"},
 ];
 $("#privacyCard").innerHTML=rows.map(r=>`<div class="setting-row"><div><p class="s-label">${r.l}</p><p class="s-desc">${r.d}</p></div>
  <button class="toggle ${settings[r.k]?"on":""}" role="switch" aria-checked="${settings[r.k]}" aria-label="${r.l}" onclick="toggleSetting('${r.k}')"></button></div>`).join("")+
 `<div class="setting-row"><div><p class="s-label">Export my data</p><p class="s-desc">Download everything Lunabelle stores on this device (JSON).</p></div>
  <button class="btn-ghost" onclick="exportData()">⬇ export</button></div>
 <div class="setting-row"><div><p class="s-label">Erase everything</p><p class="s-desc">Delete all local data: journal, progress, favorites, settings. Instant and permanent.</p></div>
  <button class="btn-ghost" style="color:#B34A5E" onclick="wipeData()">✕ delete all</button></div>
 <p class="privacy-note">🌙 <span><strong>Privacy by design.</strong> Lunabelle works fully without an account. Your journal, moods and progress never leave this device. There are no trackers, no ads, no third-party pixels — just you and your calm.</span></p>`}
function toggleSetting(k){settings[k]=!settings[k];DB.set("settings",settings);
 if(k==="motion"){document.body.classList.toggle("no-motion",settings.motion);$("#motionToggle").classList.toggle("active",settings.motion);$("#motionToggle").setAttribute("aria-pressed",settings.motion)}
 renderPrivacy();toast(settings[k]?"enabled ♡":"disabled")}
function exportData(){const blob=new Blob([JSON.stringify(DB.all(),null,2)],{type:"application/json"});
 const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="lunabelle-my-data.json";a.click();
 toast("your data, in your hands ♡")}
function wipeData(){if(!confirm("Erase everything? This cannot be undone."))return;DB.wipe();location.reload()}
function setName(v){name=v.trim();DB.set("name",name);greeting();toast("lovely to meet you, "+(name||"beautiful")+" ♡")}

/* ═════════════════════════ SLEEP MODE ═════════════════════════ */
$("#sleepToggle").onclick=()=>{const on=document.body.classList.toggle("sleep-mode");
 $("#sleepToggle").classList.toggle("active",on);$("#sleepToggle").setAttribute("aria-pressed",on);
 if(on){toast("sleep mode on 🌙 the night is yours")}else toast("good morning, sunshine ✨")};
$("#motionToggle").onclick=()=>toggleSetting("motion");

/* ═════════════════════════ INIT ═════════════════════════ */
function initApp(){greeting();renderMeds();updateFavList();refreshFavMantraBtn();renderFavMantras();nextAffirmation();renderEntries();renderProgress()}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",initApp);else initApp();
document.addEventListener("pointerdown",function unlockAudio(){AE.init();if(AE.ctx&&AE.ctx.state==="suspended")AE.ctx.resume()});
if(name)$("#nameInput").value=name;
if(settings.motion){document.body.classList.add("no-motion");$("#motionToggle").classList.add("active")}
document.addEventListener("keydown",e=>{if(e.key===" "&&$("#view-player").classList.contains("active")&&e.target.tagName!=="INPUT"){e.preventDefault();togglePlay()}});
if("speechSynthesis"in window)speechSynthesis.getVoices();

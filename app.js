let italianVoice=null, englishVoice=null, activeUtterances=[], slow=true, practiceMode="speak", retrievalSeconds=8, listenToken=0, listenRunning=false, listenPaused=false, listenTimeout=null, currentLibrary="grammar", currentTopic=null, itemIndex=0, sessionItems=[], pluralIndex=0, pluralSection=0;
const $=id=>document.getElementById(id);
function voices(){if(!("speechSynthesis" in window))return;const vs=speechSynthesis.getVoices();italianVoice=vs.find(v=>v.lang?.toLowerCase()==="it-it")||vs.find(v=>v.lang?.toLowerCase().startsWith("it"))||null;englishVoice=vs.find(v=>v.lang?.toLowerCase()==="en-us")||vs.find(v=>v.lang?.toLowerCase().startsWith("en"))||null}
if("speechSynthesis" in window){speechSynthesis.onvoiceschanged=voices;voices();setTimeout(voices,250)}
function speakLang(text,lang,onend){if(!("speechSynthesis" in window))return alert("Speech is not supported on this browser.");voices();const u=new SpeechSynthesisUtterance(text);u.lang=lang;u.rate=lang.startsWith("it")?(slow?.72:.92):.92;const v=lang.startsWith("it")?italianVoice:englishVoice;if(v)u.voice=v;if(onend)u.onend=onend;u.onerror=e=>{if(e.error!=="canceled"&&e.error!=="interrupted")console.warn("Speech error",e.error)};speechSynthesis.speak(u)}
function speak(text,onend){speakLang(text,"it-IT",onend)}
function show(view){["homeView","libraryView","practiceView","pluralView"].forEach(id=>$(id).classList.add("hidden"));$(view).classList.remove("hidden");if(typeof updateModeUI==="function")updateModeUI();window.scrollTo({top:0,behavior:"smooth"})}
function openLibrary(kind){currentLibrary=kind;const grammar=kind==="grammar";$("libraryEyebrow").textContent=grammar?"Course review":"Class vocabulary";$("libraryTitle").textContent=grammar?"Grammar":"Vocabulary";$("libraryDescription").textContent=grammar?"The elements of grammar will unlock a new language. Practice the different categories over and over to build fluency.":"Vocabulary from your handwritten class notes, organized for retrieval practice.";const grid=$("topicGrid");grid.innerHTML="";COURSE[kind].forEach(t=>{const b=document.createElement("button");b.className="topic-card";if(/^verbsare/.test(t.id))b.classList.add("verb-are");if(/^verbsere/.test(t.id))b.classList.add("verb-ere");if(/^verbsire/.test(t.id))b.classList.add("verb-ire");if(/reg/.test(t.id))b.classList.add("verb-regular");if(/irr/.test(t.id))b.classList.add("verb-irregular");b.innerHTML=`<strong>${t.title}</strong><span>${t.desc}</span><b>${t.items.length} prompts →</b>`;b.onclick=()=>startTopic(t,kind);grid.appendChild(b)});show("libraryView")}
function verbPatternFor(topic){
 const id=topic?.id||"";
 if(!/^verbs/.test(id))return null;
 if(id.includes("arereg"))return {title:"Regular -ARE pattern",verb:"parlare",forms:["parlo","parli","parla","parliamo","parlate","parlano"],note:"Remove -are and add: -o, -i, -a, -iamo, -ate, -ano."};
 if(id.includes("areirr"))return {title:"Irregular -ARE verbs",verb:"No single pattern",forms:null,note:"These verbs end in -are, but they do not follow one regular conjugation pattern. Learn each six-form card."};
 if(id.includes("erereg"))return {title:"Standard -ERE ending pattern",verb:"prendere",forms:["prendo","prendi","prende","prendiamo","prendete","prendono"],note:"Useful -ERE ending pattern: -o, -i, -e, -iamo, -ete, -ono. Individual verbs may still change their stem."};
 if(id.includes("ereirr"))return {title:"Irregular -ERE verbs",verb:"No single pattern",forms:null,note:"There is no single chart for this group. Learn the whole six-form card and a useful phrase."};
 if(id.includes("irereg"))return {title:"Regular -IRE pattern",verb:"dormire",forms:["dormo","dormi","dorme","dormiamo","dormite","dormono"],note:"Remove -ire and add: -o, -i, -e, -iamo, -ite, -ono."};
 if(id.includes("ireirr"))return {title:"Irregular / -ISC -IRE verbs",verb:"finire (-ISC example)",forms:["finisco","finisci","finisce","finiamo","finite","finiscono"],note:"-ISC is a high-value sub-pattern: it appears with io, tu, lui/lei and loro, not noi or voi. Other irregular -IRE verbs must be learned separately."};
 return null;
}
function renderVerbPatternChart(topic,force=false){
 const box=$("verbPatternChart"),btn=$("viewVerbPattern");if(!box||!btn)return;
 const x=verbPatternFor(topic);
 if(!x){box.classList.add("hidden");box.innerHTML="";btn.classList.add("hidden");return}
 const shouldShow=force || itemIndex===0;
 btn.classList.toggle("hidden",itemIndex===0);
 if(!shouldShow){box.classList.add("hidden");return}
 const persons=["io","tu","lui/lei","noi","voi","loro"];
 const body=x.forms?`<div class="verb-chart-grid">${persons.map((p,i)=>`<div><span>${p}</span><strong>${x.forms[i]}</strong></div>`).join("")}</div>`:`<div class="verb-chart-no-pattern">No single regular conjugation pattern</div>`;
 box.innerHTML=`<div class="verb-chart-kicker">PATTERN FIRST</div><h3>${x.title}</h3><p class="verb-chart-example">${x.verb}</p>${body}<p class="verb-chart-note">${x.note}</p>`;
 box.classList.remove("hidden");
}
$("viewVerbPattern").onclick=()=>renderVerbPatternChart(currentTopic,true);

function startTopic(topic,kind){currentTopic=topic;currentLibrary=kind;sessionItems=topic.items.slice();itemIndex=0;$("practiceCategory").textContent=kind==="grammar"?"Grammar practice":"Vocabulary practice";$("practiceTitle").textContent=topic.title;renderVerbPatternChart(topic);renderPractice();show("practiceView")}
function renderPractice(){renderVerbPatternChart(currentTopic);if($("prevPractice"))$("prevPractice").disabled=itemIndex<=0;listenToken++;const x=sessionItems[itemIndex];$("modeStatus").classList.toggle("hidden",practiceMode!=="listen");$("practiceTimerSeconds").textContent=retrievalSeconds;$("progressText").textContent=`Question ${itemIndex+1} of ${sessionItems.length}`;$("progressBar").style.width=`${((itemIndex+1)/sessionItems.length)*100}%`;$("instruction").textContent=x.i;$("prompt").textContent=x.p;
const promptIsItalian=currentLibrary==="grammar";
$("playPrompt").textContent=promptIsItalian?"🔊 Hear Italian":"🔊 Hear question";
$("hint").textContent=x.h||"";$("hint").classList.add("hidden");$("answer").textContent=x.a;$("translation").textContent=x.t||"";
const ex=$("example");
if(currentLibrary==="vocabulary" && x.e){$("exampleIt").textContent=x.e;$("exampleEn").textContent=x.et||"";ex.classList.remove("hidden");}else{ex.classList.add("hidden");}
$("microText").textContent=x.m||"";$("micro").classList.toggle("hidden",!x.m);
const c=x.c, call=$("callout");
if(c){const icons={brain:"🧠",memory:"💡",ear:"👂",practice:"🗣️",pattern:"🔎",watch:"⚠️"};$("calloutIcon").textContent=icons[c[0]]||"💡";$("calloutTitle").textContent=c[1];$("calloutText").textContent=c[2];call.className=`learning-booster ${c[0]}`;}else{call.className="learning-booster hidden";}
$("answerCard").classList.add("hidden")}
function nextPractice(markReview){
 if(markReview){const x=sessionItems[itemIndex];const saved=JSON.parse(localStorage.getItem("italian-review")||"[]");saved.push({...x,source:currentTopic?.title||"Review"});localStorage.setItem("italian-review",JSON.stringify(saved.slice(-40)))}
 itemIndex++;
 if(itemIndex>=sessionItems.length){finishPractice();return}
 renderPractice()
}
function finishPractice(){
 if(currentLibrary==="grammar" && currentTopic?.id!=="mixed"){
   const units=COURSE.grammar, idx=units.findIndex(t=>t.id===currentTopic.id), next=units[idx+1];
   $("completeTitle").textContent="Would you like to go to the next grammar practice unit?";
   $("completeCopy").textContent=next?`You finished ${currentTopic.title}. Next: ${next.title}.`:`You finished ${currentTopic.title}. This is the final grammar unit.`;
   $("completeYes").textContent=next?"Yes, next unit →":"Back to Grammar";
   $("completeModal").dataset.next=next?next.id:"";
   $("completeModal").classList.remove("hidden");
 }else{
   alert("Practice complete. Brava!");
   openLibrary(currentLibrary);
 }
}
function mixedReview(){let pool=[];COURSE.grammar.forEach(t=>pool.push(...t.items));COURSE.vocabulary.forEach(t=>pool.push(...t.items));const saved=JSON.parse(localStorage.getItem("italian-review")||"[]");pool=[...saved,...pool].sort(()=>Math.random()-.5).slice(0,10);currentTopic={title:"Mixed Review"};currentLibrary="grammar";sessionItems=pool;itemIndex=0;$("practiceCategory").textContent="Retrieval practice";$("practiceTitle").textContent="Mixed Review";renderPractice();show("practiceView")}
document.querySelectorAll("[data-open]").forEach(b=>b.onclick=()=>{const k=b.dataset.open;if(k==="plural")openPlural();else openLibrary(k)});
$("homeBtn").onclick=()=>show("homeView");$("libraryBack").onclick=()=>show("homeView");$("practiceBack").onclick=()=>openLibrary(currentLibrary);$("pluralBack").onclick=()=>show("homeView");$("reviewBtn").onclick=mixedReview;$("startMixedReview").onclick=mixedReview;
$("slowBtn").onclick=()=>{slow=!slow;$("slowBtn").textContent=`Slow audio: ${slow?"On":"Off"}`};
$("prevPractice").onclick=()=>{if(practiceMode!=="speak"||itemIndex<=0)return;itemIndex--;renderPractice()};
$("showHint").onclick=()=>$("hint").classList.toggle("hidden");$("reveal").onclick=()=>$("answerCard").classList.remove("hidden");$("skipNext").onclick=()=>nextPractice(false);$("playPrompt").onclick=()=>speak(sessionItems[itemIndex].p);$("playAnswer").onclick=()=>speak(sessionItems[itemIndex].a);$("gotIt").onclick=()=>nextPractice(false);$("needPractice").onclick=()=>nextPractice(true);
const PLURAL_ARTICLES=[{"singular": "il libro", "plural": "i libri", "hint": "masculine plural", "english": "The book → the books"}, {"singular": "la casa", "plural": "le case", "hint": "feminine plural", "english": "The house → the houses"}, {"singular": "lo studente", "plural": "gli studenti", "hint": "s + consonant", "english": "The student → the students"}, {"singular": "lo zaino", "plural": "gli zaini", "hint": "z", "english": "The backpack → the backpacks"}, {"singular": "l’amico", "plural": "gli amici", "hint": "masculine l’", "english": "The friend → the friends (masculine)"}, {"singular": "l’amica", "plural": "le amiche", "hint": "feminine l’", "english": "The friend → the friends (feminine)"}, {"singular": "l’albero", "plural": "gli alberi", "hint": "masculine l’", "english": "The tree → the trees"}, {"singular": "l’isola", "plural": "le isole", "hint": "feminine l’", "english": "The island → the islands"}, {"singular": "il ragazzo", "plural": "i ragazzi", "hint": "masculine plural", "english": "The boy → the boys"}, {"singular": "la ragazza", "plural": "le ragazze", "hint": "feminine plural", "english": "The girl → the girls"}];
const PSECTIONS=[["Article","Change the article."],["Noun","Change the noun."],["Verb","Change the verb."],["Adjective","Change the adjective."],["Plural definite articles","Choose the plural definite article."]];
function split(s){const p=s.split("→").map(x=>x.trim());return{from:p[0],to:p[1]}}
function openPlural(){pluralIndex=0;pluralSection=0;renderPlural();show("pluralView")}
function renderPlural(){
 const articleMode=pluralSection===4;
 const x=articleMode?PLURAL_ARTICLES[pluralIndex]:PLURAL_PAIRS[pluralIndex];
 const ch=articleMode?{from:x.singular,to:x.plural}:split(x.steps[pluralSection]);
 $("pluralCount").textContent=`Question ${pluralIndex+1} of ${articleMode?PLURAL_ARTICLES.length:PLURAL_PAIRS.length}`;
 $("pluralSection").value=pluralSection;
 $("pluralSingular").textContent=x.singular;
 $("pluralInstruction").textContent=PSECTIONS[pluralSection][1];
 $("pluralPrompt").textContent=`${ch.from} → ?`;
 $("pluralTarget").textContent=`${ch.from} → ${ch.to}`;
 $("pluralFull").textContent=x.plural;
 $("pluralEnglish").textContent=x.english;
 $("pluralSteps").innerHTML=articleMode?"<span class=\"chip active\">Plural definite article + noun</span>":x.steps.map((s,i)=>`<span class="chip ${i===pluralSection?"active":""}">${s}</span>`).join("");
 $("pluralAnswerCard").classList.add("hidden");$("pluralHintText").classList.add("hidden");$("pluralHintText").textContent="";
 $("pluralPrev").disabled=pluralIndex===0;
 const names=["il/la/lo/l’ → i/le/gli","gatto → gatti","è → sono","nero → neri","il→i · lo→gli · la→le · l’→gli/le"];
 $("pluralChain").innerHTML=PSECTIONS.map((sect,i)=>`<div class="chain-box ${i===pluralSection?"active":""}"><b>${i+1}. ${sect[0]}</b><small>${names[i]}</small></div>`).join("");
}

$("pluralSection").onchange=e=>{pluralSection=Number(e.target.value);pluralIndex=0;renderPlural()};$("pluralReveal").onclick=()=>$("pluralAnswerCard").classList.remove("hidden");$("playSingular").onclick=()=>speak(pluralSection===4?PLURAL_ARTICLES[pluralIndex].singular:PLURAL_PAIRS[pluralIndex].singular);$("playPlural").onclick=()=>speak(pluralSection===4?PLURAL_ARTICLES[pluralIndex].plural:PLURAL_PAIRS[pluralIndex].plural);$("playTarget").onclick=()=>speak(pluralSection===4?PLURAL_ARTICLES[pluralIndex].plural:split(PLURAL_PAIRS[pluralIndex].steps[pluralSection]).to);$("pluralHint").onclick=()=>{const x=pluralSection===4?PLURAL_ARTICLES[pluralIndex]:PLURAL_PAIRS[pluralIndex];const change=pluralSection===4?null:split(x.steps[pluralSection]);const tips=["Check the article's gender, number, and starting sound. Remember lo → gli and l’ can change differently for masculine and feminine nouns.","Look at the noun ending and any special plural spelling changes.","Match the verb to the plural subject. Here, è becomes sono.","Make the adjective agree with the plural noun in gender and number.","Check gender and starting sound: il→i, lo→gli, la→le, masculine l’→gli, feminine l’→le."];$("pluralHintText").textContent=tips[pluralSection];$("pluralHintText").classList.remove("hidden")};
$("pluralPrev").onclick=()=>{if(pluralIndex>0){pluralIndex--;renderPlural()}};
$("pluralNextQuestion").onclick=()=>{if(pluralIndex<(pluralSection===4?PLURAL_ARTICLES.length:PLURAL_PAIRS.length)-1){pluralIndex++;renderPlural()}};
show("homeView");
$("completeNo").onclick=()=>{$("completeModal").classList.add("hidden");openLibrary("grammar")};
$("completeYes").onclick=()=>{const id=$("completeModal").dataset.next;$("completeModal").classList.add("hidden");if(id){const t=COURSE.grammar.find(x=>x.id===id);startTopic(t,"grammar")}else openLibrary("grammar")};


function updateModeUI(){
 [$("speakMode"),$("globalSpeakMode")].filter(Boolean).forEach(b=>b.classList.toggle("active",practiceMode==="speak"));
 [$("listenMode"),$("globalListenMode")].filter(Boolean).forEach(b=>b.classList.toggle("active",practiceMode==="listen"));
 if($("prevPractice"))$("prevPractice").classList.toggle("hidden",practiceMode!=="speak");
 if($("skipNext"))$("skipNext").classList.toggle("hidden",practiceMode!=="speak");

 $("listenSettings").classList.toggle("hidden",practiceMode!=="listen");
 const inPractice=$("practiceView") && !$("practiceView").classList.contains("hidden");
 $("practicePlayer").classList.toggle("hidden",practiceMode!=="listen" || !inPractice);
 $("timerSeconds").textContent=retrievalSeconds;
 $("practiceTimerSeconds").textContent=retrievalSeconds;
 $("retrievalSlider").value=retrievalSeconds;
 $("listenStart").textContent=listenPaused?"▶ Resume":"▶ Start";
 $("listenPause").disabled=!listenRunning || listenPaused;
 if($("practiceView") && !$("practiceView").classList.contains("hidden")) $("modeStatus").classList.toggle("hidden",practiceMode!=="listen");
}
function stopListenTimers(){
 listenToken++;
 if(listenTimeout){clearTimeout(listenTimeout);listenTimeout=null}
 if("speechSynthesis" in window)speechSynthesis.cancel(); activeUtterances=[];
}
function setMode(mode){
 stopListenTimers(); practiceMode=mode; listenRunning=false; listenPaused=false; updateModeUI();
}
function commutePrompt(x){
 // Listen Only rule: directions are English unless the item itself is a direct Italian question.
 // A question mark does NOT mean this is a conversational question.
 // Many transformation exercises end in "→ ?" and still require the English task direction.
 // Only items explicitly marked as direct conversation may omit the English direction.
 const directQuestion=x.direct===true || x.type==="conversation";
 if(directQuestion) return [{text:x.p,lang:"it-IT"}];
 if(currentLibrary==="vocabulary") return [{text:"Say it in Italian.",lang:"en-US"},{text:x.p,lang:"en-US"}];
 const direction=(x.i||"Complete the item.").replace(/[“”]/g,'"');
 return [{text:direction,lang:"en-US"},{text:(x.p||"").replace(/^_+\s*/,""),lang:"it-IT"}];
}
function speakSequence(parts,done){
 const token=listenToken;
 if(!("speechSynthesis" in window))return alert("Speech is not supported on this browser.");
 voices();
 const valid=parts.filter(part=>part?.text);
 activeUtterances=[];
 let index=0;
 const speakNext=()=>{
   if(token!==listenToken || listenPaused || !listenRunning)return;
   if(index>=valid.length){activeUtterances=[];if(done)done();return}
   const part=valid[index++], lang=part.lang||"it-IT";
   const u=new SpeechSynthesisUtterance(part.text);
   activeUtterances.push(u); // retain reference until the full question has finished
   u.lang=lang;
   u.rate=lang.startsWith("it")?(slow?.72:.92):.92;
   const v=lang.startsWith("it")?italianVoice:englishVoice;
   if(v)u.voice=v;
   u.onend=()=>{
     if(token!==listenToken || listenPaused || !listenRunning)return;
     listenTimeout=setTimeout(speakNext,300);
   };
   u.onerror=e=>{
     if(e.error!=="canceled"&&e.error!=="interrupted")console.warn("Speech error",e.error);
     if(token===listenToken && !listenPaused && listenRunning)listenTimeout=setTimeout(speakNext,300);
   };
   speechSynthesis.speak(u);
 };
 speakNext();
}
function runListenOnly(){
 if(practiceMode!=="listen" || !listenRunning || listenPaused || !sessionItems[itemIndex])return;
 const token=listenToken, x=sessionItems[itemIndex], audioParts=commutePrompt(x);
 $("answerCard").classList.add("hidden");
 if("speechSynthesis" in window)speechSynthesis.cancel();
 activeUtterances=[];
 listenTimeout=setTimeout(()=>speakSequence(audioParts,()=>{
   if(token!==listenToken || listenPaused || !listenRunning)return;
   listenTimeout=setTimeout(()=>{
     if(token!==listenToken || listenPaused || !listenRunning)return;
     $("answerCard").classList.remove("hidden");
     speak(x.a,()=>{
       if(token!==listenToken || listenPaused || !listenRunning)return;
       listenTimeout=setTimeout(()=>{
         if(token!==listenToken || listenPaused || !listenRunning)return;
         if(itemIndex<sessionItems.length-1){
           itemIndex++;
           renderPractice();
           runListenOnly();
         }else{
           listenRunning=false;updateModeUI();finishPractice();
         }
       },2000);
     });
   },retrievalSeconds*1000);
 }),150);
}
$("globalSpeakMode").onclick=()=>setMode("speak");
$("globalListenMode").onclick=()=>setMode("listen");
$("speakMode").onclick=()=>setMode("speak");
$("listenMode").onclick=()=>setMode("listen");
$("retrievalSlider").oninput=e=>{retrievalSeconds=Math.max(3,Math.min(20,Number(e.target.value)||8));updateModeUI()};
$("listenStart").onclick=()=>{
 if(practiceMode!=="listen")return;
 if(listenPaused){listenPaused=false;listenRunning=true}else{stopListenTimers();listenRunning=true;listenPaused=false}
 updateModeUI();runListenOnly();
};
$("listenPause").onclick=()=>{
 if(!listenRunning)return;
 stopListenTimers();listenPaused=true;listenRunning=true;updateModeUI();
};
updateModeUI();

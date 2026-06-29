const fs = require('fs');
let c = fs.readFileSync("__framer_base.html", 'utf8');

// Strategy: inject CSS + a deferred JS script that runs AFTER Framer hydration
// Our JS watches for Framer elements to appear, then injects/replaces content

const css = `<style id="mc-custom">
/* Nav */
nav.framer-FygNn{display:none!important}
#mc-nav{position:fixed;top:0;left:0;width:100%;z-index:9999;background:rgba(0,0,0,0.88);backdrop-filter:blur(12px);display:flex;align-items:center;justify-content:space-between;padding:0 3rem;height:60px;border-bottom:1px solid rgba(255,255,255,0.08);}
#mc-nav .mc-logo img{height:32px;width:auto;display:block;}
#mc-nav ul{display:flex;gap:2rem;list-style:none;margin:0;padding:0;}
#mc-nav ul li a{color:#fff;text-decoration:none;font-family:'Inter',sans-serif;font-size:14px;font-weight:500;letter-spacing:-0.01em;transition:color 0.2s ease;position:relative;}
#mc-nav ul li a::after{content:'';position:absolute;bottom:-2px;left:0;width:0;height:1px;background:#E81215;transition:width 0.25s ease;}
#mc-nav ul li a:hover{color:#E81215;}
#mc-nav ul li a:hover::after{width:100%;}
/* Hero bg */
.framer-90o6xd{background:url('./assets/backgrounds/bg-1.png') center/cover no-repeat!important;border-radius:18px;min-height:500px!important;}
.framer-90o6xd>*{display:none!important;}
/* Gallery */
.mc-gallery-wrap{display:flex;flex-direction:column;gap:24px;width:100%;overflow:hidden;padding:0;}
.mc-gallery-track{display:flex;gap:16px;width:max-content;}
.mc-gallery-track.fwd{animation:gallery-fwd 40s linear infinite;}
.mc-gallery-track.rev{animation:gallery-rev 40s linear infinite;}
@keyframes gallery-fwd{from{transform:translateX(0)}to{transform:translateX(-50%)}}
@keyframes gallery-rev{from{transform:translateX(-50%)}to{transform:translateX(0)}}
.mc-gallery-track img{height:200px;width:auto;border-radius:12px;object-fit:cover;flex-shrink:0;box-shadow:0 8px 24px rgba(0,0,0,0.5);transition:transform 0.3s ease;}
.mc-gallery-track img:hover{transform:scale(1.04);}
/* Portfolio */
.mc-portfolio-wrap{display:flex;width:100%;min-height:100vh;}
.mc-portfolio-sections{flex:1;display:flex;flex-direction:column;}
.mc-portfolio-section{min-height:100vh;padding:120px 80px;display:flex;flex-direction:column;justify-content:center;border-bottom:1px solid rgba(255,255,255,0.08);}
.mc-portfolio-section h2{font-family:'Inter',sans-serif;font-size:48px;font-weight:700;color:#fff;margin:0 0 16px;}
.mc-portfolio-section p{font-family:'Inter',sans-serif;font-size:18px;color:rgba(255,255,255,0.6);margin:0;}
.mc-sticky-panel{width:300px;flex-shrink:0;position:sticky;top:60px;height:calc(100vh - 60px);background:rgba(255,255,255,0.04);border-left:1px solid rgba(255,255,255,0.1);display:flex;flex-direction:column;justify-content:center;padding:40px 24px;}
.mc-sticky-panel h3{font-family:'Inter',sans-serif;font-size:22px;font-weight:700;color:#fff;margin:0 0 8px;}
.mc-sticky-panel>p{font-family:'Inter',sans-serif;font-size:14px;color:rgba(255,255,255,0.5);margin:0 0 24px;}
.mc-sticky-tabs{display:flex;flex-direction:column;gap:8px;width:100%;}
.mc-sticky-tab{padding:10px 16px;border-radius:8px;color:rgba(255,255,255,0.5);font-family:'Inter',sans-serif;font-size:13px;font-weight:500;border:1px solid rgba(255,255,255,0.1);cursor:pointer;transition:all 0.2s ease;background:transparent;text-align:left;}
.mc-sticky-tab.active,.mc-sticky-tab:hover{color:#fff;background:rgba(232,18,21,0.15);border-color:#E81215;}
</style>`;

// Our deferred injection script - runs after Framer hydration
const imgs = [
  './assets/backgrounds/bg-1.png','./assets/backgrounds/bg-2.png',
  './assets/clients/fream.png','./assets/clients/cloud9.png',
  './assets/clients/cottontailva.png','./assets/clients/grim.png',
  './assets/clients/woops.png','./assets/clients/the-collective.png'
];
const imgTags = [...imgs,...imgs].map(s=>`<img src="${s}" alt="">`).join('');
const imgTagsRev = [...imgs,...imgs].reverse().map(s=>`<img src="${s}" alt="">`).join('');

const injectScript = `<script>
(function(){
  // Inject nav immediately
  var nav = document.createElement('nav');
  nav.id = 'mc-nav';
  nav.innerHTML = '<a class="mc-logo" href="/"><img src="./assets/logos/icon-red.png" alt="MorningCawfee"></a><ul><li><a href="/about">About</a></li><li><a href="/about#skills">Skills</a></li><li><a href="/work#work_experience">Experience</a></li><li><a href="/work#work_history">History</a></li><li><a href="/clients">Clients</a></li><li><a href="/contact">Contact</a></li></ul>';
  document.body.insertBefore(nav, document.body.firstChild);

  // Watch for Framer elements and inject after hydration
  function inject(){
    // Gallery
    var galSec = document.querySelector('.framer-1d2612y');
    if(galSec && !galSec.querySelector('.mc-gallery-wrap')){
      var galHeader = galSec.querySelector('.framer-elqo2t');
      var framerGrid = galSec.querySelector('.framer-dwe5cq');
      if(framerGrid) framerGrid.style.display='none';
      var cta = galSec.querySelector('.framer-1n2ksqx');
      if(cta) cta.style.display='none';
      var gw = document.createElement('div');
      gw.className = 'mc-gallery-wrap';
      gw.innerHTML = '<div class="mc-gallery-track fwd">${imgTags}</div><div class="mc-gallery-track rev">${imgTagsRev}</div>';
      if(galHeader && galHeader.nextSibling){
        galSec.insertBefore(gw, galHeader.nextSibling);
      } else if(galSec){
        galSec.appendChild(gw);
      }
      console.log('Gallery injected');
    }

    // Portfolio / Agents
    var agSec = document.querySelector('.framer-p36991');
    if(agSec && !agSec.querySelector('.mc-portfolio-wrap')){
      var inner = agSec.querySelector('.framer-1psahvp');
      if(inner) inner.style.display='none';
      var hdr = agSec.querySelector('.framer-bc5yxf');
      if(hdr) hdr.style.display='none';
      agSec.style.cssText += 'flex-direction:row!important;align-items:flex-start!important;gap:0!important;padding:0!important;';
      var pw = document.createElement('div');
      pw.className = 'mc-portfolio-wrap';
      pw.innerHTML = '<div class="mc-portfolio-sections"><div class="mc-portfolio-section" id="section-logos"><h2>Logos</h2><p>Brand identities crafted for streamers, esports teams, and digital creators.</p></div><div class="mc-portfolio-section" id="section-banners"><h2>Banners</h2><p>Vibrant stream overlays and social banners designed to stand out.</p></div><div class="mc-portfolio-section" id="section-posters"><h2>Posters</h2><p>High-contrast poster artwork with expressive typography and bold palettes.</p></div><div class="mc-portfolio-section" id="section-ui"><h2>UI Design</h2><p>Interface design with strong visual hierarchy and clean, functional layouts.</p></div></div><div class="mc-sticky-panel"><h3>Portfolio</h3><p>Explore the work</p><div class="mc-sticky-tabs"><div class="mc-sticky-tab active" data-target="section-logos">Logos</div><div class="mc-sticky-tab" data-target="section-banners">Banners</div><div class="mc-sticky-tab" data-target="section-posters">Posters</div><div class="mc-sticky-tab" data-target="section-ui">UI Design</div></div></div>';
      agSec.insertBefore(pw, agSec.firstChild);

      // Sticky tab scroll
      pw.querySelectorAll('.mc-sticky-tab').forEach(function(tab){
        tab.addEventListener('click',function(){ var t=document.getElementById(tab.dataset.target); if(t)t.scrollIntoView({behavior:'smooth'}); });
      });
      window.addEventListener('scroll',function(){
        var secs=document.querySelectorAll('.mc-portfolio-section');
        var tabs=document.querySelectorAll('.mc-sticky-tab');
        var mid=window.scrollY+window.innerHeight/2;
        secs.forEach(function(sec,i){ var top=sec.getBoundingClientRect().top+window.scrollY; var bot=top+sec.offsetHeight; if(mid>=top&&mid<bot){ tabs.forEach(function(t){t.classList.remove('active');}); if(tabs[i])tabs[i].classList.add('active'); } });
      },{passive:true});
      console.log('Portfolio injected');
    }
  }

  // Run after Framer hydrates (poll until elements exist)
  var attempts = 0;
  var timer = setInterval(function(){
    attempts++;
    inject();
    if(attempts > 30) clearInterval(timer);
  }, 300);
  document.addEventListener('DOMContentLoaded', inject);
  window.addEventListener('load', function(){ setTimeout(inject, 500); setTimeout(inject, 1500); });
})();
</script>`;

c = c.replace('</head>', css + '\n</head>');
c = c.replace('</body>', injectScript + '\n</body>');
fs.writeFileSync('index.html', c, 'utf8');
console.log('Build done. Size:', c.length);

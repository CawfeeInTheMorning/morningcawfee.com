const fs = require('fs');
let c = fs.readFileSync('__framer_base.html', 'utf8');

// ── 1. Page title ─────────────────────────────────────────────────────────────
c = c.replace('<title>Framer: AI website builder for professional sites</title>', '<title>MorningCawfee - Design Portfolio</title>');
c = c.split("Create a professional website with Framer’s no-code AI website builder. Design freely, manage CMS content, optimize SEO, collaborate, and publish fast.").join("Graphic Designer and UI/UX Designer with a heart for vibrance, contrast, and a little bit of fun!");
c = c.split("Create a professional website with Framer's no-code AI website builder. Design freely, manage CMS content, optimize SEO, collaborate, and publish fast.").join("Graphic Designer and UI/UX Designer with a heart for vibrance, contrast, and a little bit of fun!");

// ── 2. CSS injections ─────────────────────────────────────────────────────────
const css = `<style id="mc-custom">
/* Hide Framer nav */
nav.framer-FygNn{display:none!important}

/* Our nav */
#mc-nav{position:fixed;top:0;left:0;width:100%;z-index:9999;background:rgba(0,0,0,0.9);backdrop-filter:blur(12px);display:flex;align-items:center;justify-content:center;height:60px;border-bottom:1px solid rgba(255,255,255,0.08);}
#header{display:flex;align-items:center;justify-content:space-between;width:100%;max-width:1200px;}
#mc-nav .mc-logo img{height:32px;width:auto;display:block;}
#mc-nav ul{display:flex;gap:2rem;list-style:none;margin:0;padding:0;}
#mc-nav ul li a{color:#fff;text-decoration:none;font-family:'Inter',sans-serif;font-size:14px;font-weight:500;letter-spacing:-0.01em;transition:color 0.2s ease;position:relative;}
#mc-nav ul li a::after{content:'';position:absolute;bottom:-2px;left:0;width:0;height:1px;background:#E81215;transition:width 0.25s ease;}
#mc-nav ul li a:hover{color:#E81215;}
#mc-nav ul li a:hover::after{width:100%;}
body>div{padding-top:60px;}

/* Hero */
.framer-90o6xd{background:url('./assets/backgrounds/bg-1.png') center/cover no-repeat!important;border-radius:18px;min-height:500px!important;}
.framer-90o6xd>*{display:none!important;}

/* Gallery - constrained to nav max-width */
.banner-scroll{display:flex;flex-direction:column;gap:24px;width:100%;max-width:1200px;margin:0 auto;overflow:clip;border-radius:15px;}
.banner-scroll-track{display:flex;gap:16px;width:max-content;}
.banner-scroll-track.fwd{animation:gallery-fwd 40s linear infinite;}
.banner-scroll-track.rev{animation:gallery-rev 40s linear infinite;}
@keyframes gallery-fwd{from{transform:translateX(0)}to{transform:translateX(-50%)}}
@keyframes gallery-rev{from{transform:translateX(-50%)}to{transform:translateX(0)}}
.banner-scroll-track img{height:200px;width:auto;border-radius:12px;object-fit:cover;flex-shrink:0;box-shadow:0 8px 24px rgba(0,0,0,0.5);transition:transform 0.3s ease;}
.banner-scroll-track img:hover{transform:scale(1.04);}

/* Copyright text */
.mc-copyright{font-family:'Inter',sans-serif;font-size:13px;color:rgba(255,255,255,0.4);white-space:nowrap;}

/* Social icons in footer */
.mc-social-link{display:flex;align-items:center;justify-content:center;opacity:0.6;transition:opacity 0.2s;}
.mc-social-link:hover{opacity:1;}
.mc-social-link img{width:18px;height:18px;filter:invert(1);display:block;}

/* Remove cookie banner, footer nav */
.framer-196faza-container,.framer-1pwa3xt,.framer-1xwpxoz-container,.framer-8a26wt-container{display:none!important;}
/* Logo scroll section */
#logo-scroll{display:block;}
#logo-scroll img{height:90px;width:160px;object-fit:cover;border-radius:8px;flex-shrink:0;}
/* Shoutout box */
#shoutout-box{display:block;}
.mc-notable-title{font-family:'Inter',sans-serif;font-size:32px;font-weight:700;color:#fff;text-align:center;margin-bottom:24px;}
</style>`;
c = c.replace('</head>', css + '\n</head>');

// ── 3. Deferred JS injections (run after Framer hydration) ────────────────────
const bannerFiles=["akiroko","ardolf","cloud9","cottontail","fefe","fillian","fream","grim","hia","iridium","jessellum","jollz","keeoh","kuro","kwobus","limealicious","mari","mero","mystic","nishi","nyxi","obey","obnoctious","ohyaholla","otto","pedro","rebecca","shiro","sinder","sylvee","traid","woops"];
const allImgs=[...bannerFiles,...bannerFiles];
const fwd=allImgs.map(function(n){return '<img src="./assets/banners/'+n+'.png" alt="'+n+'">';}).join('');
const rev=[...allImgs].reverse().map(function(n){return '<img src="./assets/banners/'+n+'.png" alt="'+n+'">';}).join('');
// Social links for footer
const socials = [
  {href:'https://x.com/morningcawfee', svg:'./assets/symbols/x.svg', label:'Twitter'},
  {href:'https://www.twitch.tv/morningcawfee', svg:'./assets/symbols/twitch.svg', label:'Twitch'},
  {href:'https://github.com/CawfeeInTheMorning', svg:'./assets/symbols/github.svg', label:'GitHub'},
  {href:'https://www.behance.net/morningcawfee', svg:'./assets/symbols/behance.svg', label:'Behance'}
];
const socialHTML = socials.map(s=>`<a href="${s.href}" target="_blank" rel="noopener" class="mc-social-link" aria-label="${s.label}"><img src="${s.svg}" alt="${s.label}"></a>`).join('');

const injectScript = `<script>
(function(){
  // ── Nav ──────────────────────────────────────────────────────────────────
  var nav = document.createElement('nav');
  nav.id = 'mc-nav';
  nav.innerHTML = '<div id="header"><a class="mc-logo" href="/"><img src="./assets/icons/icon-red.png" alt="MorningCawfee"></a><ul><li><a href="/about">About</a></li><li><a href="/about#skills">Skills</a></li><li><a href="/work#work_experience">Experience</a></li><li><a href="/work#work_history">History</a></li><li><a href="/clients">Clients</a></li><li><a href="/contact">Contact</a></li></ul></div>';
  document.body.insertBefore(nav, document.body.firstChild);
  document.title='MorningCawfee - Design Portfolio';
  var md=document.querySelector('meta[name="description"]');if(md)md.setAttribute('content','Graphic Designer and UI/UX Designer with a heart for vibrance, contrast, and a little bit of fun!');

  function inject(){
    // ── Gallery ──────────────────────────────────────────────────────────
    var galSec = document.querySelector('.framer-1d2612y');
    if(galSec && !galSec.querySelector('.banner-scroll')){
      var galHeader = galSec.querySelector('.framer-elqo2t');
      ['framer-dwe5cq','framer-1n2ksqx'].forEach(function(cls){
        var el=galSec.querySelector('.'+cls); if(el) el.style.display='none';
      });
      var gw = document.createElement('div');
      gw.className = 'banner-scroll';
      gw.innerHTML = '<div class="banner-scroll-track fwd">${fwd}</div><div class="banner-scroll-track rev">${rev}</div>';
      if(galHeader && galHeader.nextSibling){ galSec.insertBefore(gw, galHeader.nextSibling); }
      else { galSec.appendChild(gw); }
    }

    // ── Footer: Follow me + our socials ──────────────────────────────────
    var n5owxb = document.querySelector('.framer-n5owxb');
    if(n5owxb && !n5owxb.dataset.mcDone){
      n5owxb.dataset.mcDone='1';
      var followText = n5owxb.querySelector('.framer-t9b48k p');
      if(followText) followText.textContent = 'Follow me';
      var iconRow = n5owxb.querySelector('.framer-17vjiow');
      if(iconRow){
        iconRow.innerHTML = '${socialHTML}';
        iconRow.style.cssText='display:flex;gap:16px;align-items:center;';
      }
    }

    // ── Footer: remove framer-zayt2w-container ───────────────────────────
    var zayt = document.querySelector('.framer-zayt2w-container');
    if(zayt) zayt.style.display='none';

    // ── Footer: framer-1kn8avf-container → copyright text ───────────────
    var avf = document.querySelector('.framer-1kn8avf-container');
    if(avf && !avf.dataset.mcDone){
      avf.dataset.mcDone='1';
      avf.innerHTML='<span class="mc-copyright">2026 MorningCawfee</span>';
    }

    // ── Footer: remove framer-h0rvu4 ────────────────────────────────────
    var h0rvu4 = document.querySelector('.framer-h0rvu4');
    if(h0rvu4) h0rvu4.style.display='none';

    // ── Footer: framer-10nqoyr → email link ─────────────────────────────
    var noyr = document.querySelector('.framer-10nqoyr');
    if(noyr && !noyr.dataset.mcDone){
      noyr.dataset.mcDone='1';
      noyr.innerHTML='<a href="mailto:morningcawfee@gmail.com" style="font-family:Inter,sans-serif;font-size:14px;color:rgba(255,255,255,0.6);text-decoration:none;">morningcawfee@gmail.com</a>';
    }
  }


    // ── Persistent DOM overrides (re-apply after Framer hydration) ─────────
    // H1 hero text
    document.querySelectorAll('h1').forEach(function(h){
      if(h.textContent.includes('Framer is the')||h.textContent.includes('AI website builder for standout sites')){
        h.textContent='Heya! My Name is MorningCawfee and this is my portfolio';
        h.dataset.mcOwned='1';
      }
    });
    // H2 gallery title
    document.querySelectorAll('h2').forEach(function(h){
      if(h.textContent.trim()==='Shipped with Framer'){ h.textContent='Some of my work'; h.dataset.mcOwned='1'; }
    });
    // Hide elements
    ['framer-1pwa3xt','framer-196faza-container','framer-1xwpxoz-container','framer-8a26wt-container'].forEach(function(cls){
      var el=document.querySelector('.'+cls); if(el) el.style.display='none';
    });
    // Footer class
    var fbar=document.querySelector('.framer-e0lfdf');
    if(fbar) fbar.classList.add('footer');
    // Logo scroll - resize images
    var lsc=document.querySelector('.framer-1ifpqum-container');
    if(lsc){
      lsc.id='logo-scroll';
      lsc.querySelectorAll('img').forEach(function(img){ img.style.cssText='height:90px;width:160px;object-fit:cover;border-radius:8px;flex-shrink:0;'; });
    }
    // Shoutout box + Notable Clients title
    var sb=document.querySelector('.framer-1b24l6d-container');
    if(sb){
      sb.id='shoutout-box';
      if(!document.querySelector('.mc-notable-title')){
        var nt=document.createElement('h2'); nt.className='mc-notable-title'; nt.textContent='Notable Clients';
        sb.parentElement.insertBefore(nt,sb);
      }
    }


  // MutationObserver to re-apply changes when Framer re-renders
  function applyPersistent(){
    document.querySelectorAll('h1').forEach(function(h){
      if(h.textContent.includes('Framer is the')||h.textContent.includes('AI website builder for standout sites'))
        h.textContent='Heya! My Name is MorningCawfee and this is my portfolio';
    });
    document.querySelectorAll('h2').forEach(function(h){
      if(h.textContent.trim()==='Shipped with Framer') h.textContent='Some of my work';
    });
    var fbar=document.querySelector('.framer-e0lfdf'); if(fbar) fbar.classList.add('footer');
    var lsc=document.querySelector('.framer-1ifpqum-container');
    if(lsc && lsc.id!=='logo-scroll'){
      lsc.id='logo-scroll';
      lsc.querySelectorAll('img').forEach(function(img){ img.style.cssText='height:90px;width:160px;object-fit:cover;border-radius:8px;flex-shrink:0;'; });
    }
    var sb=document.querySelector('.framer-1b24l6d-container');
    if(sb && sb.id!=='shoutout-box'){
      sb.id='shoutout-box';
      if(!document.querySelector('.mc-notable-title')){
        var nt=document.createElement('h2'); nt.className='mc-notable-title'; nt.textContent='Notable Clients';
        sb.parentElement.insertBefore(nt,sb);
      }
    }
  }
  var _obs_active=false;
  var observer = new MutationObserver(function(){
    if(_obs_active) return; _obs_active=true;
    requestAnimationFrame(function(){ applyPersistent(); _obs_active=false; });
  });
  observer.observe(document.body, {childList:true, subtree:true, characterData:true});

  var attempts=0;
  var timer=setInterval(function(){ attempts++; inject(); if(attempts>30) clearInterval(timer); }, 300);
  document.addEventListener('DOMContentLoaded', inject);
  window.addEventListener('load', function(){ setTimeout(inject,500); setTimeout(inject,1500); });
})();
</script>`;
c = c.replace('</body>', injectScript + '\n</body>');

fs.writeFileSync('index.html', c, 'utf8');
console.log('Build done. Size:', c.length);

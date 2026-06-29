const fs = require('fs');
let c = fs.readFileSync('__framer_base.html', 'utf8');

// ── 1. Page title, meta cleanup, OG removal ───────────────────────────────────
c = c.replace('<title>Framer: AI website builder for professional sites</title>', '<title>MorningCawfee - Design Portfolio</title>');
c = c.replace(/<link[^>]+rel="icon"[^>]*>/g, '');
c = c.replace('</title>', '</title><link rel="icon" href="./assets/icons/icon-red.png" type="image/png">');

// Remove all OG/Twitter meta tags (Framer branding)
c = c.replace(/<meta property="og:[^>]+">/g, '');
c = c.replace(/<meta name="twitter:[^>]+">/g, '');
c = c.replace(/<meta property="og:[^/]+\/>/g, '');

// Remove Framer generator/author meta
c = c.replace(/<meta name="generator"[^>]+>/g, '');
c = c.replace(/<meta name="author"[^>]+>/g, '');

// Replace description
c = c.split("Create a professional website with Framer's no-code AI website builder. Design freely, manage CMS content, optimize SEO, collaborate, and publish fast.").join("Graphic Designer and UI/UX Designer with a heart for vibrance, contrast, and a little bit of fun!");

// Replace canonical URL
c = c.replace('href="https://www.framer.com/"', 'href="https://morningcawfee.com/"');
c = c.split('"url": "https://www.framer.com"').join('"url": "https://morningcawfee.com"');
c = c.split('https://www.framer.com/').join('https://morningcawfee.com/');
c = c.split('www.framer.com/careers/').join('morningcawfee.com/');
c = c.split('www.framer.community/c/support/').join('morningcawfee.com/');
c = c.split('https://twitter.com/framer').join('https://x.com/morningcawfee');

// Inject our clean OG tags
const ourOG = [
  '<meta property="og:type" content="website">',
  '<meta property="og:title" content="MorningCawfee - Design Portfolio">',
  '<meta property="og:description" content="Graphic Designer and UI/UX Designer with a heart for vibrance, contrast, and a little bit of fun!">',
  '<meta property="og:url" content="https://morningcawfee.com/">',
  '<meta property="og:site_name" content="MorningCawfee">',
  '<meta name="twitter:card" content="summary_large_image">',
  '<meta name="twitter:title" content="MorningCawfee - Design Portfolio">',
  '<meta name="twitter:description" content="Graphic Designer and UI/UX Designer with a heart for vibrance, contrast, and a little bit of fun!">'
].join('\n');
c = c.replace('</title>', '</title>\n' + ourOG);

// ── Remove tracking, login, consent scripts ────────────────────────────────────
c = c.replace(/<meta name="google-site-verification"[^>]+>/g, '');
c = c.replace(/<script[^>]*src="https:\/\/www\.googletagmanager[^"]*"[^>]*><\/script>/g, '');
c = c.replace(/<script[^>]*>window\.dataLayer[^<]*<\/script>/g, '');
c = c.split('window.__framerLoginFetch = fetch(').join('window.__framerLoginFetch_REMOVED = false && fetch(');
c = c.replace(/<script[^>]*src="https:\/\/events\.framer\.com[^"]*"[^>]*><\/script>/g, '');
c = c.split('[Framer is hiring').join('[MorningCawfee Portfolio');
c = c.split('speculationrules').join('speculationrules-removed');
c = c.split('window.dbbRum').join('window._dbbRum_removed');
c = c.split('"Initializing Framer Analytics Anonymous"').join('"[removed]"');
// Remove Framer noscript GTM iframe
c = c.replace(/<noscript[^>]*><iframe[^>]*googletagmanager[^>]*><\/iframe><\/noscript>/g, '');

// ── Add title-lock script as first thing in <head> ────────────────────────────
const titleLock = '<script>(function(){var _t="MorningCawfee - Design Portfolio";try{Object.defineProperty(document,"title",{get:function(){return _t;},set:function(v){if(v&&!v.includes("MorningCawfee"))return;_t=v||_t;},configurable:true});}catch(e){}var _ce=console.error;console.error=function(){var a=Array.from(arguments).join(" ");if(a.includes("Hydration")||a.includes("#418")||a.includes("#422"))return;_ce.apply(console,arguments);};})();<\/script>';
c = c.replace('<head>', '<head>\n' + titleLock);

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
.banner-scroll-track.fwd{animation:gallery-fwd 80s linear infinite;}
.banner-scroll-track.rev{animation:gallery-rev 80s linear infinite;}
/* Logo boxes */
#logo-scroll{overflow:hidden;}
.mc-logo-row{display:flex;gap:20px;width:max-content;}
.mc-logo-row.fwd{animation:gallery-fwd 80s linear infinite;}
.mc-logo-row.rev{animation:gallery-rev 80s linear infinite;}
.mc-logo-box{width:450px;height:450px;border-radius:12px;display:flex;align-items:center;justify-content:center;flex-shrink:0;overflow:hidden;}
.mc-logo-box img{max-width:70%;max-height:70%;object-fit:contain;}
/* Hero cards overlay */
.mc-card-overlay{position:absolute;top:0;left:0;width:100%;height:100%;z-index:20;display:flex;align-items:center;justify-content:center;pointer-events:none;}
.hero-card-pile{position:relative;width:min(600px,60vw);height:400px;}
.hero-card{width:100%;height:auto;display:block;will-change:transform;box-shadow:0 8px 28px rgba(0,0,0,0.65);position:absolute;top:0;left:0;border-radius:8px;}
/* Hide leftover framer elements */
.framer-1fbk941-container,.framer-kpoerz{display:none!important;}
/* Shoutout box */
#shoutout-box{width:900px!important;max-width:900px!important;overflow:hidden!important;}
.framer-h0rvu4,[data-framer-name="Trust Link"]{display:none!important;}
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
/* Notable clients section — moved down 150px */
#notable-clients{margin-top:180px!important;}
.mc-notable-title{font-family:'Inter',sans-serif;font-size:32px;font-weight:700;color:#fff;text-align:center;margin-bottom:24px;position:relative;z-index:10;}
#shoutout-box{margin:0 auto!important;display:flex!important;justify-content:center!important;}
/* Hero container 16:9 aspect ratio */
.framer-imW7Y.framer-1ut0con{width:100%!important;height:auto!important;aspect-ratio:16/9!important;}
/* Social icons red on hover */
.mc-social-link:hover img{filter:invert(20%) sepia(100%) saturate(5000%) hue-rotate(340deg)!important;}
.framer-n5owxb .framer-t9b48k p{font-size:13px!important;}

/* 220s scroll speed */
.mc-logo-row.fwd{animation:gallery-fwd 220s linear infinite!important;}
.mc-logo-row.rev{animation:gallery-rev 220s linear infinite!important;}
.banner-scroll-track.fwd{animation:gallery-fwd 220s linear infinite!important;}
.banner-scroll-track.rev{animation:gallery-rev 220s linear infinite!important;}
/* notable-clients position */
#notable-clients{bottom:-64px!important;margin-top:0!important;}
/* Email link in footer */
.framer-10nqoyr a{font-size:13px!important;}
/* Hero card draggable */
.hero-card{cursor:grab!important;transition:transform 0.2s ease,box-shadow 0.2s ease!important;}
.hero-card:hover{transform:scale(1.06) rotate(var(--hcr,0deg))!important;box-shadow:0 16px 40px rgba(0,0,0,0.8)!important;}
.hero-card.dragging{cursor:grabbing!important;}
/* Nav logo 58px */
#mc-nav .mc-logo img{height:58px!important;}
/* Banner gradient top */
.banner-scroll-gradient-top{position:absolute;top:0;left:0;right:0;height:120px;background:linear-gradient(to bottom,#000 0%,rgba(0,0,0,0) 100%);z-index:1;pointer-events:none;}
/* Social buttons nav */
.mc-nav-socials{display:flex;align-items:center;gap:12px;}
.mc-nav-socials a{display:flex;align-items:center;justify-content:center;opacity:0.7;transition:opacity 0.2s;}
.mc-nav-socials a:hover{opacity:1;}
.mc-nav-socials img{width:18px;height:18px;filter:invert(1);}
.mc-contact-text{font-family:'Inter',sans-serif;font-size:14px;color:rgba(255,255,255,0.8);margin-right:8px;}
</style>`;
c = c.replace('</head>', css + '\n</head>');

// ── 3. Build logo and notable client HTML ─────────────────────────────────────
const logoFiles = require('fs').readdirSync('assets/logos').filter(f=>f.endsWith('.png')&&!f.startsWith('.'));
const logoColors = ['#F97C94','#FC211B','#F19541','#0F5AF2'];
const allLogoFiles = logoFiles.concat(logoFiles);
const logoBoxHTML = allLogoFiles.map((f,i)=>{
  const col=logoColors[i%logoColors.length];
  return '<div class="mc-logo-box" style="background:'+col+'"><img src="./assets/logos/'+f.replace(/ /g,'%20')+'" alt="logo"></div>';
}).join('');

const notableFiles = require('fs').readdirSync('assets/logos/notable clients').filter(f=>f.endsWith('.png'));
const notableBoxHTML = notableFiles.map(f=>{
  return '<img src="./assets/logos/notable%20clients/'+f.replace(/ /g,'%20')+'" alt="client" style="object-fit:contain;width:100%;height:auto;">';
}).join('');

// ── 4. Deferred JS injections (run after Framer hydration) ───────────────────
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
    // Fix favicon
    var favEl=document.querySelector('link[rel="icon"]');
    if(favEl) favEl.href='./assets/icons/icon-red.png';

    // Logo grid — two rows (fwd + rev)
    var lsc=document.querySelector('.framer-1ifpqum-container');
    if(lsc && !lsc.dataset.mcLogo){
      lsc.dataset.mcLogo='1'; lsc.id='logo-scroll';
      lsc.style.cssText='overflow:hidden;display:flex;flex-direction:column;gap:20px;';
      lsc.innerHTML='<div class="mc-logo-row fwd">${logoBoxHTML.replace(/\\/g,'\\\\')}</div>'
                  +'<div class="mc-logo-row rev">${logoBoxHTML.replace(/\\/g,'\\\\')}</div>';
    }

    // Hero card overlay — always re-inject if missing (Framer re-renders)
    var f14=document.querySelector('.framer-14tklpo');
    if(f14 && !f14.querySelector('.mc-card-overlay')){
      f14.style.position='relative';
      ['framer-1fbk941-container','framer-kpoerz'].forEach(function(cls){var el=f14.querySelector('.'+cls);if(el)el.style.display='none';});
      var ov=document.createElement('div'); ov.className='mc-card-overlay';
      var pile=document.createElement('div'); pile.className='hero-card-pile';
      pile.style.cssText='position:relative;width:min(600px,60vw);height:400px;';
      var rots=[-12,-6,-2,4,10];
      for(var ci=0;ci<5;ci++){var crd=document.createElement('img');crd.className='hero-card';crd.src='./assets/card-front.png';crd.style.zIndex=String(ci+1);pile.appendChild(crd);}
      var cards2=Array.from(pile.querySelectorAll('.hero-card'));
      cards2.forEach(function(card,i){card.style.transform='translateX(-150vw) rotate('+rots[i]+'deg)';});
      ov.appendChild(pile); f14.appendChild(ov);
      setTimeout(function(){cards2.forEach(function(card,i){setTimeout(function(){card.style.transition='transform 1.4s cubic-bezier(0.06,0.85,0.15,1)';card.style.transform='rotate('+rots[i]+'deg)';},i*360);});},300);
    }

    // Rename framer-wc4wqf -> #notable-clients
    var wc4=document.querySelector('.framer-wc4wqf');
    if(wc4 && wc4.id!=='notable-clients'){ wc4.id='notable-clients'; wc4.style.bottom='-64px'; wc4.style.position='absolute'; }

    // Add gradient to top of banner-scroll section
    var galSec2=document.querySelector('.framer-1d2612y');
    if(galSec2 && !galSec2.querySelector('.banner-scroll-gradient-top')){
      galSec2.style.position='relative';
      var grad=document.createElement('div'); grad.className='banner-scroll-gradient-top';
      galSec2.insertBefore(grad,galSec2.firstChild);
    }

    // Replace Download app button + add Contact me + social buttons
    document.querySelectorAll('p,div,span').forEach(function(el){
      if(el.textContent.trim()==='Download app' && !el.dataset.mcReplaced){
        el.dataset.mcReplaced='1';
        var container=el.closest('a')||el.closest('[data-reset="button"]');
        if(container){
          var parent=container.parentElement;
          // Add "Contact me" text before
          var contactText=document.createElement('span');contactText.className='mc-contact-text';contactText.textContent='Contact me';
          parent.insertBefore(contactText,container);
          // Replace container with social icon buttons
          var socDiv=document.createElement('div');socDiv.className='mc-nav-socials';
          [['https://x.com/morningcawfee','./assets/symbols/x.svg','Twitter'],
           ['https://www.twitch.tv/morningcawfee','./assets/symbols/twitch.svg','Twitch'],
           ['https://github.com/CawfeeInTheMorning','./assets/symbols/github.svg','GitHub'],
           ['https://www.behance.net/morningcawfee','./assets/symbols/behance.svg','Behance']
          ].forEach(function(s){var a=document.createElement('a');a.href=s[0];a.target='_blank';a.rel='noopener';a.setAttribute('aria-label',s[2]);var img=document.createElement('img');img.src=s[1];img.alt=s[2];a.appendChild(img);socDiv.appendChild(a);});
          parent.replaceChild(socDiv,container);
        }
      }
    });

    // Move Sticky Agents to left of Features
    var stickyEl=document.querySelector('[data-framer-name="Sticky Agents"]');
    var featEl=document.querySelector('[data-framer-name="Features"]');
    if(stickyEl&&featEl&&stickyEl.parentElement===featEl.parentElement&&stickyEl!==featEl.previousElementSibling){
      featEl.parentElement.insertBefore(stickyEl,featEl);
    }

    // Hero card drag interaction
    var cardPile=document.querySelector('.hero-card-pile');
    if(cardPile && !cardPile.dataset.mcDrag){
      cardPile.dataset.mcDrag='1';
      var cards=Array.from(cardPile.querySelectorAll('.hero-card'));
      var maxZ=cards.length;
      cards.forEach(function(card,idx){
        card.style.setProperty('--hcr', '0deg');
        // Hover: already handled by CSS, but set CSS var for rotate
        card.addEventListener('mouseenter',function(){
          card.style.transform='scale(1.06)';
        });
        card.addEventListener('mouseleave',function(){
          if(!card._dragging) card.style.transform=card._baseTransform||'';
        });
        card.addEventListener('mousedown',function(e){
          if(e.button!==0)return;
          // Bring to front
          maxZ++;card.style.zIndex=maxZ;
          card._dragging=true;card.style.cursor='grabbing';
          var startX=e.clientX,startY=e.clientY;
          var startL=parseInt(card.style.left||0,10)||0;
          var startT=parseInt(card.style.top||0,10)||0;
          card.style.position='absolute';
          function onMove(e2){
            var dx=e2.clientX-startX,dy=e2.clientY-startY;
            card.style.left=(startL+dx)+'px';card.style.top=(startT+dy)+'px';
          }
          function onUp(){
            card._dragging=false;card.style.cursor='grab';
            document.removeEventListener('mousemove',onMove);document.removeEventListener('mouseup',onUp);
          }
          document.addEventListener('mousemove',onMove);document.addEventListener('mouseup',onUp);
          e.preventDefault();
        });
      });
    }

    // Remove hover text on shoutout
    document.querySelectorAll('[data-framer-name="Trust Link"],.framer-h0rvu4').forEach(function(el){el.style.display='none';});

    // Shoutout box — replace all SVGs with logo images
    var sb=document.querySelector('.framer-1b24l6d-container,#shoutout-box');
    if(sb && !sb.dataset.mcShout){
      sb.dataset.mcShout='1'; sb.id='shoutout-box';
      sb.style.cssText='width:900px;max-width:900px;overflow:hidden;margin:0 auto;';
      // Find and replace the grid content
      var grid2=sb.querySelector('[data-framer-name="Grid"]')||sb.querySelector('ul')||sb;
      // Replace all SVG elements with our logos
      grid2.innerHTML='${notableBoxHTML}';
      grid2.style.cssText='display:grid;grid-template-columns:repeat(3,1fr);gap:16px;align-items:center;width:100%;height:202px;';
      if(!document.querySelector('.mc-notable-title')){var nt=document.createElement('h2');nt.className='mc-notable-title';nt.textContent='Notable Clients';sb.parentElement.insertBefore(nt,sb);}
    }

  // Persistent title override (Framer resets title ~4s after load)
  document.title='MorningCawfee - Design Portfolio';
  var favEl2=document.querySelector('link[rel="icon"]');if(favEl2)favEl2.href='./assets/icons/icon-red.png';

  // MutationObserver — re-apply ALL changes when Framer re-renders
  function applyPersistent(){
    // Title stays locked
    if(document.title!=='MorningCawfee - Design Portfolio') document.title='MorningCawfee - Design Portfolio';
    // Rename framer-wc4wqf → #notable-clients and position it
    var wc4=document.querySelector('.framer-wc4wqf');if(wc4&&wc4.id!=='notable-clients'){wc4.id='notable-clients';wc4.style.bottom='-64px';wc4.style.position='absolute';}
    // Move Sticky Agents left of Features
    var sticky=document.querySelector('[data-framer-name="Sticky Agents"]');
    var features=document.querySelector('[data-framer-name="Features"]');
    if(sticky&&features&&sticky.parentElement===features.parentElement&&sticky!==features.previousElementSibling){
      features.parentElement.insertBefore(sticky,features);
    }
    document.querySelectorAll('h1').forEach(function(h){
      if(h.textContent.includes('Framer is the')||h.textContent.includes('AI website builder for standout sites'))
        h.textContent='Heya! My Name is MorningCawfee and this is my portfolio';
    });
    document.querySelectorAll('h2').forEach(function(h){
      if(h.textContent.trim()==='Shipped with Framer') h.textContent='Some of my work';
    });
    var fbar=document.querySelector('.framer-e0lfdf'); if(fbar) fbar.classList.add('footer');
    var wc4P=document.querySelector('.framer-wc4wqf');if(wc4P&&wc4P.id!=='notable-clients')wc4P.id='notable-clients';
    // Re-inject hero cards if Framer removed them
    var f14P=document.querySelector('.framer-14tklpo');
    if(f14P && !f14P.querySelector('.mc-card-overlay')){
      ['framer-1fbk941-container','framer-kpoerz'].forEach(function(cls){var el=f14P.querySelector('.'+cls);if(el)el.style.display='none';});
      var ov2=document.createElement('div');ov2.className='mc-card-overlay';
      var pile2=document.createElement('div');pile2.className='hero-card-pile';pile2.style.cssText='position:relative;width:min(600px,60vw);height:400px;';
      var rots2=[-12,-6,-2,4,10];
      for(var ci2=0;ci2<5;ci2++){var c2=document.createElement('img');c2.className='hero-card';c2.src='./assets/card-front.png';c2.style.zIndex=String(ci2+1);pile2.appendChild(c2);}
      Array.from(pile2.querySelectorAll('.hero-card')).forEach(function(card,i){card.style.transform='rotate('+rots2[i]+'deg)';});
      ov2.appendChild(pile2);f14P.style.position='relative';f14P.appendChild(ov2);
    }
    var lscP2=document.querySelector('.framer-1ifpqum-container');
    if(lscP2 && !lscP2.dataset.mcLogo){ lscP2.dataset.mcLogo='1'; lscP2.id='logo-scroll'; lscP2.style.cssText='overflow:hidden;display:flex;flex-direction:column;gap:20px;'; lscP2.innerHTML='<div class="mc-logo-row fwd">${logoBoxHTML.replace(/\\/g,"\\\\")}</div><div class="mc-logo-row rev">${logoBoxHTML.replace(/\\/g,"\\\\")}</div>'; }
    var sb2=document.querySelector('.framer-1b24l6d-container,#shoutout-box');
    if(sb2&&!sb2.dataset.mcShout){ sb2.dataset.mcShout='1';sb2.id='shoutout-box';sb2.style.cssText='width:900px;max-width:900px;overflow:hidden;margin:0 auto;';(sb2.querySelector('[data-framer-name="Grid"]')||sb2).innerHTML='${notableBoxHTML}';(sb2.querySelector('[data-framer-name="Grid"]')||sb2).style.cssText='display:grid;grid-template-columns:repeat(3,1fr);gap:16px;align-items:center;width:100%;height:202px;';if(!document.querySelector('.mc-notable-title')){var nt2=document.createElement('h2');nt2.className='mc-notable-title';nt2.textContent='Notable Clients';sb2.parentElement.insertBefore(nt2,sb2);} }
  }
  var _obs_active=false;
  var observer = new MutationObserver(function(){
    if(_obs_active) return; _obs_active=true;
    requestAnimationFrame(function(){ applyPersistent(); _obs_active=false; });
  });
  observer.observe(document.body, {childList:true, subtree:true, characterData:true});
  // Also use setInterval to keep title locked (Framer uses async updates)
  setInterval(function(){ if(document.title!=='MorningCawfee - Design Portfolio') document.title='MorningCawfee - Design Portfolio'; var f=document.querySelector('link[rel="icon"]');if(f&&f.href.includes('framer'))f.href='./assets/icons/icon-red.png'; }, 500);

  var attempts=0;
  var timer=setInterval(function(){ attempts++; inject(); if(attempts>30) clearInterval(timer); }, 300);
  document.addEventListener('DOMContentLoaded', inject);
  window.addEventListener('load', function(){ setTimeout(inject,500); setTimeout(inject,1500); setTimeout(inject,5000); });
})();
</script>`;
c = c.replace('</body>', injectScript + '\n</body>');

fs.writeFileSync('index.html', c, 'utf8');
console.log('Build done. Size:', c.length);

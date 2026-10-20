/* menu */
(function(){
  const h=document.querySelector('.ham'),p=document.getElementById('panel');if(!h||!p)return;
  const u=o=>{h.setAttribute('aria-expanded',o);p.classList.toggle('otwarte',o)};
  h.addEventListener('click',()=>u(h.getAttribute('aria-expanded')!=='true'));
  p.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>u(false)));
})();

/* konfigurator z podgladem SVG */
(function(){
  const svg=document.getElementById('podglad');if(!svg)return;
  const st={typ:'zadaszenie',dach:'szklo',kolor:'#3a3f44',szer:5,gleb:3.5};
  const NAZWY={zadaszenie:'Zadaszenie tarasu',zabudowa:'Zabudowa tarasu',ogrod:'Ogród zimowy',dach:'Dach szklany',balkon:'Zabudowa balkonu'};
  const KOL={'#3a3f44':'antracyt RAL 7016','#f2f2ee':'biały RAL 9016','#1d1d1d':'czarny RAL 9005'};
  const pl=v=>String(v).replace('.',',');
  function rysuj(){
    const k=st.kolor, W=st.szer, D=st.gleb;
    const sx=Math.min(250,60+W*22), x0=210-sx/2, x1=210+sx/2;      // szerokosc na rysunku
    const h=110, yTop=78-Math.min(30,D*5), yFront=yTop+22+D*4, yGr=212;
    const dach=st.dach==='szklo'?'rgba(205,232,242,.55)':'rgba(240,240,232,.78)';
    const sciany=(st.typ==='zabudowa'||st.typ==='ogrod'||st.typ==='balkon');
    let s='';
    // dom
    s+='<rect x="'+(x0-30)+'" y="40" width="'+(sx+60)+'" height="'+(yGr-40)+'" fill="#e9e6df"/>';
    s+='<polygon points="'+(x0-44)+',42 210,8 '+(x1+44)+',42" fill="#5b5f63"/>';
    s+='<rect x="'+(210-38)+'" y="'+(yGr-92)+'" width="76" height="92" fill="#5c6e78"/><rect x="'+(210-36)+'" y="'+(yGr-90)+'" width="72" height="88" fill="#9ec2d3" opacity=".7"/>';
    // taras
    s+='<polygon points="'+(x0-20)+','+yGr+' '+(x1+20)+','+yGr+' '+(x1+40)+',236 '+(x0-40)+',236" fill="#b9b2a6"/>';
    // slupy
    const sl=Math.max(2,Math.round(W/3)+1);
    for(let i=0;i<sl;i++){const x=x0+i*(sx/(sl-1));s+='<rect x="'+(x-3)+'" y="'+yFront+'" width="6" height="'+(236-yFront)+'" fill="'+k+'"/>';}
    // sciany szklane
    if(sciany){s+='<rect x="'+x0+'" y="'+yFront+'" width="'+sx+'" height="'+(236-yFront)+'" fill="rgba(190,225,238,.35)" stroke="'+k+'" stroke-width="2"/>';
      for(let i=1;i<sl*2-1;i++){const x=x0+i*(sx/(sl*2-2));s+='<line x1="'+x+'" y1="'+yFront+'" x2="'+x+'" y2="236" stroke="rgba(255,255,255,.5)" stroke-width="1"/>';}}
    // dach
    s+='<polygon points="'+(x0-6)+','+yFront+' '+(x1+6)+','+yFront+' '+(x1+6)+','+(yTop+6)+' '+(x0-6)+','+(yTop+6)+'" fill="'+dach+'" stroke="'+k+'" stroke-width="4"/>';
    const kr=Math.max(3,Math.round(W/0.9));
    for(let i=1;i<kr;i++){const x=x0-6+i*((sx+12)/kr);s+='<line x1="'+x+'" y1="'+(yTop+6)+'" x2="'+x+'" y2="'+yFront+'" stroke="'+k+'" stroke-width="2.5"/>';}
    s+='<rect x="'+(x0-8)+'" y="'+(yFront-4)+'" width="'+(sx+16)+'" height="9" fill="'+k+'"/>';
    if(st.typ==='ogrod'){s+='<g fill="#f6d27a" opacity=".9">';for(let i=0;i<5;i++)s+='<circle cx="'+(x0+20+i*(sx-40)/4)+'" cy="'+(yFront+14)+'" r="3"/>';s+='</g>';}
    // wymiary
    s+='<g font-family="Inter,sans-serif" font-size="12" fill="#1f2326"><line x1="'+x0+'" y1="250" x2="'+x1+'" y2="250" stroke="#1f2326"/><rect x="'+(210-26)+'" y="242" width="52" height="16" fill="#cfe0e8"/><text x="210" y="254" text-anchor="middle">'+pl(W)+' m</text></g>';
    svg.innerHTML=s;
    const m2=Math.round(W*D*10)/10;
    document.getElementById('podsum').innerHTML='<li><span>Konstrukcja</span>'+NAZWY[st.typ]+'</li><li><span>Wymiary</span>'+pl(W)+' × '+pl(D)+' m · '+pl(m2)+' m²</li><li><span>Pokrycie</span>'+(st.dach==='szklo'?'szkło VSG':'poliwęglan, podwójny filtr UV')+'</li><li><span>Kolor</span>'+KOL[k]+'</li><li><span>Montaż</span>do 2 tygodni od zamówienia</li>';
    const t=document.getElementById('konfTekst');if(t)t.value=NAZWY[st.typ]+', '+pl(W)+' × '+pl(D)+' m ('+pl(m2)+' m²), '+(st.dach==='szklo'?'szkło VSG':'poliwęglan')+', '+KOL[k]+'.';
  }
  document.querySelectorAll('#konfigurator .chipy, #konfigurator .kolory').forEach(g=>g.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;g.querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',x===b));st[g.dataset.p]=b.dataset.v;rysuj()}));
  const sz=document.getElementById('szer'),gl=document.getElementById('gleb');
  sz.addEventListener('input',()=>{st.szer=+sz.value;document.getElementById('szerO').textContent=pl(sz.value)+(String(sz.value).includes('.')?'':',0')+' m';rysuj()});
  gl.addEventListener('input',()=>{st.gleb=+gl.value;document.getElementById('glebO').textContent=pl(gl.value)+(String(gl.value).includes('.')?'':',0')+' m';rysuj()});
  /* klik w karte oferty ustawia typ w konfiguratorze */
  document.querySelectorAll('.karta[data-typ]').forEach(a=>a.addEventListener('click',()=>{const b=document.querySelector('#konfigurator .chipy[data-p="typ"] button[data-v="'+a.dataset.typ+'"]');if(b)b.click()}));
  rysuj();
})();

/* mapa */
(function(){
  const box=document.getElementById('mapa');if(!box||!window.L)return;
  const ll=[52.2028,18.6499];
  const m=L.map(box,{scrollWheelZoom:false,tap:false}).setView(ll,7);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:18,attribution:'© OpenStreetMap'}).addTo(m);
  L.marker(ll,{icon:L.divIcon({className:'',html:'<div class="pin"></div>',iconSize:[22,22],iconAnchor:[11,22]})}).addTo(m).bindTooltip('Alutar · Koło',{direction:'top',offset:[0,-20],permanent:true});
  [[52.223,18.251,'Konin'],[52.648,19.067,'Włocławek'],[52.794,18.263,'Inowrocław'],[51.759,19.456,'Łódź'],[52.406,16.925,'Poznań']].forEach(c=>L.circleMarker([c[0],c[1]],{radius:6,color:'#e3a54a',weight:2,fillColor:'#e3a54a',fillOpacity:.5}).addTo(m).bindTooltip(c[2]));
})();

/* dolny pasek na telefonie dopiero po przewinieciu */
(function(){
  const m=document.querySelector('.mob'),t=document.querySelector('.hero-cta');if(!m)return;
  if(!t||!('IntersectionObserver' in window)){m.classList.add('widac');return}
  new IntersectionObserver(w=>w.forEach(x=>m.classList.toggle('widac',!x.isIntersecting&&x.boundingClientRect.top<0)),{threshold:0}).observe(t);
})();

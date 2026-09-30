const products=[
 {name:"2026 Bowman Chrome Baseball Hobby",category:"Baseball",stock:39,cost:174.50,price:249.99,market:268.33,change:8.4,sources:5,status:"Below market"},
 {name:"2026 Bowman Chrome Baseball Delight",category:"Baseball",stock:36,cost:238,price:329.99,market:341.49,change:4.1,sources:4,status:"Below market"},
 {name:"2026 Topps Flagship Football Hobby",category:"Football",stock:56,cost:109,price:159.99,market:156.82,change:-1.8,sources:7,status:"On market"},
 {name:"2026 Topps Chrome Star Wars Hobby",category:"Non-sport",stock:18,cost:142,price:199.99,market:184.75,change:-5.2,sources:6,status:"Above market"},
 {name:"2026 Chrome Black NFL",category:"Football",stock:12,cost:188,price:229.99,market:244.99,change:2.6,sources:4,status:"Below market"},
 {name:"2026 Chrome Black NBA",category:"Basketball",stock:12,cost:196,price:249.99,market:252.40,change:1.2,sources:3,status:"On market"},
 {name:"2026 WWE Universe Hobby",category:"Wrestling",stock:14,cost:118,price:169.99,market:161.25,change:-3.4,sources:5,status:"Above market"},
 {name:"2026 Topps Chrome MLS Hobby",category:"Soccer",stock:13,cost:84,price:119.99,market:126.55,change:6.7,sources:4,status:"Below market"}
];
const money=n=>new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",maximumFractionDigits:0}).format(n);
const body=document.querySelector("#inventory"),search=document.querySelector("#search"),filter=document.querySelector("#filter"),empty=document.querySelector("#empty");
function render(){const q=search.value.toLowerCase(),f=filter.value;const rows=products.filter(p=>(p.name+" "+p.category).toLowerCase().includes(q)&&(f==="All inventory"||p.status===f));body.innerHTML=rows.map(p=>{const d=p.market-p.price,slug=p.status.toLowerCase().replace(" ","-");return `<tr><td>${p.name}<small>${p.category} · ${p.sources} retailers</small></td><td>${p.stock}</td><td>${money(p.cost)}</td><td>${money(p.price)}</td><td><b>${money(p.market)}</b><span class="difference ${d>=0?"up":"down"}">${d>=0?"+":""}${money(d)} vs WH</span></td><td class="trend ${p.change>=0?"up":"down"}">${p.change>=0?"↗":"↘"} ${Math.abs(p.change)}%</td><td><span class="status ${slug}">${p.status}</span></td></tr>`}).join("");empty.hidden=rows.length>0}
search.addEventListener("input",render);filter.addEventListener("change",render);document.querySelector("#sync").addEventListener("click",e=>{const b=e.currentTarget;b.textContent="↻ Syncing...";setTimeout(()=>b.textContent="↻ Sync market",900)});render();

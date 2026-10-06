// Manually checked retailer observations; these are not an automatic price feed.
const MARKET_OBSERVATIONS=[
 {name:'2020 Panini Prizm Football - Hobby Box',retailer:'Steel City Collectibles',price:2474.95,currency:'USD',availability:'Not confirmed',checked:'2026-10-06',url:'https://www.steelcitycollectibles.com/i/2020-panini-prizm-football-hobby-box'},
 {name:'2020-21 Panini Revolution Basketball - Hobby Box',retailer:'Diamond Cards',price:184.94,currency:'USD',availability:'Not confirmed',checked:'2026-10-06',url:'https://www.diamondcardsonline.com/2020-21-panini-revolution-basketball-hobby-box/'},
 {name:'2020-21 Topps Finest Champions League Soccer - Hobby Box',retailer:'Steel City Collectibles',price:349.95,currency:'USD',availability:'Out of stock',checked:'2026-10-06',url:'https://www.steelcitycollectibles.com/i/2020-21-topps-finest-uefa-champions-league-soccer-hobby-box'},
 {name:'2026 Bowman Baseball - Hobby Box',retailer:'Steel City Collectibles',price:449.95,currency:'USD',availability:'Not confirmed',checked:'2026-10-06',url:'https://www.steelcitycollectibles.com/i/2026-bowman-baseball-hobby-box'},
 {name:'2026 Bowman Chrome Baseball - Hobby Box',retailer:'Steel City Collectibles',price:609.95,currency:'USD',availability:'Out of stock',checked:'2026-10-06',url:'https://www.steelcitycollectibles.com/i/2026-bowman-chrome-baseball-hobby-box'}
];
const marketName=s=>String(s).toLowerCase().replace(/[®™]/g,'').replace(/[^a-z0-9]+/g,' ').trim();
function marketCells(product,price){
 const offers=MARKET_OBSERVATIONS.filter(o=>marketName(o.name)===marketName(product.name));
 if(!offers.length)return '<td>Price not verified<small>No checked retailer listing yet</small></td><td>—</td>';
 return '<td>'+offers.map(o=>`<details><summary style="cursor:pointer;color:#69aaff;font-weight:bold">$${o.price.toFixed(2)} ⓘ</summary><strong>${escape(o.retailer)}</strong><small>${escape(o.availability)}<br>Checked ${escape(o.checked)}<br>USD · excludes shipping and tax<br>Manually checked reference</small><a href="${escape(o.url)}" target="_blank" rel="noopener noreferrer">Open retailer listing ↗</a></details>`).join('')+'</td><td>'+offers.map(o=>{
 if(o.availability==='Out of stock')return 'Excluded: out of stock';
 if(!price||price.currency!==o.currency)return '—';
 const delta=price.amount/100-o.price;return (Math.abs(delta)<0.005?'Same price':(delta>0?'+':'−')+'$'+Math.abs(delta).toFixed(2)+' ('+(delta>0?'+':'−')+Math.abs(delta/o.price*100).toFixed(2)+'%)')+'<small>Versus listed price; stock unconfirmed</small>';
 }).join('')+'</td>';
}

const BRAND = {
  orange: '#E87722', navy: '#0E2A47', steel: '#2C5F7C', sand: '#EFE9DD', grey: '#F4F4F4', cool: '#6B6F73'
};
const technicians = [
  {name:'Chris Taylor', role:'Senior Technician', branch:'VIC'},
  {name:'Daniel Moore', role:'Service Technician', branch:'VIC'},
  {name:'Mia Nguyen', role:'Maintenance Technician', branch:'VIC'},
  {name:'Lachlan Smith', role:'Apprentice', branch:'VIC'},
  {name:'Ethan Brooks', role:'Service Technician', branch:'NSW'},
  {name:'Ava Wilson', role:'Maintenance Technician', branch:'NSW'},
  {name:'Noah Patel', role:'Senior Technician', branch:'NSW'},
  {name:'Jack OBrien', role:'Apprentice', branch:'VIC'}
];
const customers = ['Altona Health Precinct','Brighton Grammar','Carlton Retail Group','Dandenong Logistics Park','Eastern Private Hospital','Frankston Civic Centre','Glen Waverley Towers','Hawthorn Medical Suites','Kingston Aquatic Centre','Monash Corporate Park','Mornington Hotel Group','Oakleigh Childcare Network','Prahran Central','Richmond Office Hub','Southbank Apartments','St Kilda Retail Plaza','Toorak Medical Centre','Werribee Council Depot'].sort();
const assetRates = [
  {type:'Split System', rate:420, hours:2.5}, {type:'Ducted System', rate:720, hours:4}, {type:'Package Unit', rate:1150, hours:6}, {type:'Chiller', rate:3200, hours:12}, {type:'Cooling Tower', rate:2400, hours:10}, {type:'Exhaust Fan', rate:280, hours:1.5}, {type:'VRF System', rate:1850, hours:8}, {type:'FCU', rate:390, hours:2}
];
function seeded(seed,min,max){const x=Math.sin(seed*999)*10000; return Math.floor((x-Math.floor(x))*(max-min+1))+min;}
const weeks=[];
for(let year=2022;year<=2026;year++){
  for(let w=1;w<=52;w++){
    const month=Math.min(12,Math.max(1,Math.ceil(w/4.33)));
    const season=month<=2||month===12?'Summer':month<=5?'Autumn':month<=8?'Winter':'Spring';
    weeks.push({id:`${year}-W${String(w).padStart(2,'0')}`, label:`Week ${w}, ${year}`, year, week:w, month, season});
  }
}
const quoteWeeks = weeks.map((p,i)=>{
  const jobs=seeded(i+1,52,128); const quotes=seeded(i+8,Math.round(jobs*.52),Math.round(jobs*1.08));
  const value=quotes*seeded(i+25,1650,6100); const approved=Math.round(value*seeded(i+40,42,74)/100); const outstanding=Math.round(value*seeded(i+55,13,35)/100);
  return {...p,jobs,quotes,value,approved,outstanding,declined:Math.max(0,value-approved-outstanding),conversion:Math.round(approved/value*100)};
});
const technicianRows = weeks.flatMap((p,pi)=>technicians.map((t,ti)=>{
  const jobs=seeded(pi*7+ti+1,5,24); const maintenance=seeded(pi*11+ti+3,2,Math.max(2,jobs-1)); const service=Math.max(0,jobs-maintenance);
  const quotes=seeded(pi*13+ti+5,Math.max(1,Math.round(jobs*.35)),Math.round(jobs*1.28)); const quoteValue=quotes*seeded(pi*17+ti+9,1200,6700); const approved=Math.round(quoteValue*seeded(pi*19+ti+4,38,78)/100);
  return {period:p.id,year:p.year,week:p.week,month:p.month,season:p.season,technician:t.name,role:t.role,branch:t.branch,jobs,maintenance,service,quotes,quoteValue,approved,outstanding:quoteValue-approved,hours:maintenance*seeded(pi+ti+31,2,7),ratio:+(quotes/jobs).toFixed(2),conversion:Math.round(approved/quoteValue*100)};
}));
const customerQuoteRows = customers.map((name,i)=>({
  customer:name, outstanding:seeded(i+60,4,32), approved:seeded(i+61,8,44), outstandingValue:seeded(i+62,18000,185000), approvedValue:seeded(i+63,24000,230000), conversion:seeded(i+64,38,82)
})).sort((a,b)=>b.outstandingValue-a.outstandingValue);
const contractCustomers = customers.map((name,i)=>({
  name, site:`${name} Main Site`, contact:['Facilities Manager','Operations Manager','Property Manager'][i%3], value:seeded(i+80,9000,74000), expiry:`2026-${String(seeded(i+81,7,12)).padStart(2,'0')}-${String(seeded(i+82,1,28)).padStart(2,'0')}`,
  assets:Array.from({length:seeded(i+85,4,15)},(_,j)=>({id:`AST-${i+1}-${j+1}`,type:assetRates[(i+j)%assetRates.length].type,location:['Roof','Plant Room','Level 1','Level 2','Kitchen','Reception'][j%6],age:seeded(i*j+11,1,18)}))
}));
const jobRows = Array.from({length:90},(_,i)=>{
  const cats=['SRV','QTES','MCC','PJTS','WTY','DLP']; const statuses=['Booked','Not Complete','Complete','Waiting Parts','On Hold']; const category=cats[i%cats.length]; const status=statuses[seeded(i+90,0,statuses.length-1)];
  const scheduled=i%10===0?'':`2026-06-${String(seeded(i+91,1,28)).padStart(2,'0')}`; const hours=category==='MCC'&&i%8===0?0:seeded(i+92,2,36); const priority=seeded(i+93,1,4);
  const flagged=!scheduled||hours===0||status==='Not Complete'||(priority===1&&!scheduled);
  return {job:`JOB-${27000+i}`,customer:customers[i%customers.length],account:['Sarah','Matt','Alex','Jordan'][i%4],category,price:seeded(i+94,650,21000),scheduled,tech:technicians[i%technicians.length].name,status,hours,priority,flagged,changed:i%13===0};
});
const leaveEmployees = ['Alex Carter','Bella Martin','Chris Taylor','Daniel Moore','Ella Harris','Mia Nguyen','Noah Patel','Ava Wilson','Jack OBrien','Lachlan Smith'].map((name,i)=>({name,department:i<2?'Admin':i<8?'Technicians':'Apprentices',entitlement:152,taken:seeded(i+120,18,112),booked:seeded(i+121,6,46),sick:seeded(i+122,0,54)}));

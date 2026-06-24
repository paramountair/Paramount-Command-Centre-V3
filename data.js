const technicians = [
  { name:'Chris Taylor', role:'Senior Technician', branch:'VIC', target:1.0 },
  { name:'Daniel Moore', role:'Service Technician', branch:'VIC', target:1.0 },
  { name:'Mia Nguyen', role:'Service Technician', branch:'VIC', target:1.0 },
  { name:'Lachlan Smith', role:'Apprentice', branch:'VIC', target:0.65 },
  { name:'Ethan Brooks', role:'Service Technician', branch:'NSW', target:1.0 },
  { name:'Ava Wilson', role:'Maintenance Technician', branch:'NSW', target:0.85 },
  { name:'Noah Patel', role:'Senior Technician', branch:'NSW', target:1.0 },
  { name:'Jack O'Brien', role:'Apprentice', branch:'VIC', target:0.65 }
];

const customers = [
  'Altona Health Precinct','Brighton Grammar','Carlton Retail Group','Dandenong Logistics Park','Eastern Private Hospital','Frankston Civic Centre','Glen Waverley Towers','Hawthorn Medical Suites','Kingston Aquatic Centre','Monash Corporate Park','Mornington Hotel Group','Oakleigh Childcare Network','Prahran Central','Richmond Office Hub','Southbank Apartments','St Kilda Retail Plaza','Toorak Medical Centre','Werribee Council Depot'
].sort();

const assets = [
  { type:'Split System', rate:420, hours:2.5 },{ type:'Ducted System', rate:720, hours:4 },{ type:'Package Unit', rate:1150, hours:6 },{ type:'Chiller', rate:3200, hours:12 },{ type:'Cooling Tower', rate:2400, hours:10 },{ type:'Exhaust Fan', rate:280, hours:1.5 },{ type:'VRF System', rate:1850, hours:8 },{ type:'FCU', rate:390, hours:2 }
];

function seededNumber(seed, min, max){
  let x = Math.sin(seed) * 10000;
  return Math.floor((x - Math.floor(x)) * (max - min + 1)) + min;
}

const periods = [];
for(let year=2022; year<=2026; year++){
  for(let w=1; w<=52; w++){
    periods.push({ id:`${year}-W${String(w).padStart(2,'0')}`, label:`Week ${w}, ${year}`, type:'Weekly', year, season: w<10||w>48?'Summer':w<23?'Autumn':w<36?'Winter':'Spring', month: Math.min(12, Math.ceil(w/4.33)) });
  }
}

const quoteRows = periods.map((p, i)=>{
  const jobs = seededNumber(i+10, 45, 115);
  const quotes = seededNumber(i+50, Math.floor(jobs*.45), Math.floor(jobs*1.15));
  const value = quotes * seededNumber(i+90, 1400, 5200);
  const approved = Math.floor(value * (seededNumber(i+130, 38, 72)/100));
  const outstanding = Math.floor(value * (seededNumber(i+170, 12, 36)/100));
  return { ...p, jobs, quotes, value, approved, outstanding, declined: Math.max(0,value-approved-outstanding), conversion: Math.round(approved/value*100) };
});

const techActivity = periods.flatMap((p, pi)=> technicians.map((t, ti)=>{
  const jobs = seededNumber(pi*17+ti, 4, 22);
  const quotes = seededNumber(pi*23+ti, Math.max(1, Math.floor(jobs*.35)), Math.ceil(jobs*1.25));
  const maintenance = seededNumber(pi*31+ti, 2, 14);
  const service = Math.max(0,jobs-maintenance);
  const quoteValue = quotes * seededNumber(pi*41+ti, 950, 6200);
  const approved = Math.floor(quoteValue * seededNumber(pi*53+ti, 35, 78)/100);
  return { period:p.id, year:p.year, season:p.season, month:p.month, technician:t.name, jobs, maintenance, service, quotes, quoteValue, approved, outstanding: quoteValue-approved, hours: maintenance*seededNumber(pi+ti,2,7), ratio: +(quotes/jobs).toFixed(2), conversion: Math.round(approved/quoteValue*100) };
}));

const jobReport = Array.from({length:80}, (_,i)=>{
  const categories=['SRV','QTES','MCC','PJTS','WTY','DLP'];
  const status=['Booked','Not Complete','Complete','Waiting Parts','On Hold'];
  const cat = categories[seededNumber(i,0,categories.length-1)];
  const hours = cat==='MCC' && i%9===0 ? 0 : seededNumber(i+5,2,38);
  const priority = seededNumber(i+11,1,4);
  const scheduled = i%11===0 ? '' : `2026-06-${String(seededNumber(i+20,1,28)).padStart(2,'0')}`;
  return { job:`JOB-${26000+i}`, customer:customers[i%customers.length], account:['Sarah','Matt','Alex','Jordan'][i%4], category:cat, price:seededNumber(i+12,650,18500), scheduled, tech:technicians[i%technicians.length].name, status:status[i%status.length], hours, priority, flagged: !scheduled || hours===0 || status[i%status.length]==='Not Complete' || (priority===1&&!scheduled) };
});

const leaveEmployees = ['Alex Carter','Bella Martin','Chris Taylor','Daniel Moore','Ella Harris','Mia Nguyen','Noah Patel','Ava Wilson','Jack OBrien','Lachlan Smith'].map((name,i)=>({
  name, department: i<2?'Admin':i<8?'Technicians':'Apprentices', entitlement:152, taken: seededNumber(i+99,22,118), booked:seededNumber(i+109,8,44), sick:seededNumber(i+119,0,54)
}));

const contractCustomers = customers.map((name,i)=>({
  name, site:`${name} Main Site`, value:seededNumber(i+200,8500,68000), expiry:`2026-${String(seededNumber(i+211,7,12)).padStart(2,'0')}-${String(seededNumber(i+212,1,28)).padStart(2,'0')}`, assets: Array.from({length:seededNumber(i+220,4,16)},(_,j)=>({ id:`AST-${i+1}-${j+1}`, type:assets[(i+j)%assets.length].type, location:['Roof','Plant Room','Level 1','Level 2','Kitchen','Reception'][j%6], age:seededNumber(i*j+7,1,18) }))
}));

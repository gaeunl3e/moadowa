'use strict';
const animals=[
['대왕고래','Balaenoptera musculus','바다','커다란 몸으로 넓은 바다를 여행하는 고래예요.','선박과의 충돌, 바다의 소음처럼 바다에서 살아가는 데 어려움을 주는 일들이 있어요.'],
['레서판다','Ailurus fulgens','숲','붉은 털과 긴 꼬리를 가진, 나무를 잘 타는 동물이에요.','숲이 줄어들고 서로 떨어지면 먹이를 찾고 다른 친구를 만나기 어려워져요.'],
['마운틴고릴라','Gorilla beringei beringei','숲','높은 산의 숲에서 무리를 이루어 살아가는 고릴라예요.','안전하게 살아갈 숲과 사람에게서 옮을 수 있는 질병으로부터의 보호가 필요해요.'],
['매부리바다거북','Eretmochelys imbricata','바다','부리처럼 뾰족한 입을 가진 바다거북이에요.','바다에 버려진 쓰레기와 어구, 해변의 변화가 거북의 삶에 영향을 줘요.'],
['바키타','Phocoena sinus','바다','눈 주위의 까만 무늬가 매력적인 작은 돌고래류예요. 멕시코 캘리포니아만 북쪽 바다에 살아요.','물고기를 잡기 위해 놓은 자망에 함께 걸리는 일이 바키타에게 큰 위협이에요. 안전한 바다를 만드는 관심과 변화가 필요해요.'],
['시베리아호랑이','Panthera tigris altaica','숲','추운 숲에서 살아가는 커다란 호랑이예요.','서식지와 먹잇감을 지키고 밀렵을 막는 일이 중요해요.'],
['아무르표범','Panthera pardus orientalis','숲','추운 지역의 숲에 사는, 아름다운 무늬의 표범이에요.','숲이 나뉘고 먹잇감이 줄어드는 일을 막아야 해요.'],
['아라비아오릭스','Oryx leucoryx','초원·사막','긴 뿔과 밝은 털을 가진 사막의 동물이에요.','안전한 서식지를 유지하고 불법 사냥을 막는 노력이 필요해요.'],
['아시아코끼리','Elephas maximus','숲','긴 코로 먹이를 집고 가족과 함께 생활하는 코끼리예요.','서식지가 줄어들면서 사람의 생활 공간과 겹치는 일이 생겨요.'],
['아프리카들개','Lycaon pictus','초원·사막','얼룩무늬 털을 가진, 무리 생활을 하는 동물이에요.','넓고 연결된 서식지와 질병으로부터의 보호가 필요해요.'],
['아홀로틀','Ambystoma mexicanum','물가','머리 양옆의 아가미가 눈에 띄는 양서류예요.','야생에서 살아갈 깨끗한 물과 서식지를 지키는 일이 필요해요.'],
['자바코뿔소','Rhinoceros sondaicus','숲','두꺼운 피부와 하나의 뿔을 가진 코뿔소예요.','한정된 서식지를 안전하게 지키고 회복하는 노력이 필요해요.'],
['자이언트판다','Ailuropoda melanoleuca','숲','대나무를 주로 먹고 산의 숲에서 살아가는 판다예요.','먹이가 되는 대나무 숲을 지키고 서식지를 연결하는 일이 중요해요.'],
['카카포','Strigops habroptilus','숲','뉴질랜드에 사는, 날지 못하는 야행성 앵무새예요.','안전한 서식지에서 천적으로부터 보호받을 수 있도록 돕는 노력이 필요해요.'],
['피그미하마','Choeropsis liberiensis','물가','서아프리카의 숲과 물가에 사는 작은 하마예요.','숲과 습지가 줄어들지 않도록 지키는 일이 필요해요.']
].map((a,i)=>({id:i+1,name:a[0],latin:a[1],habitat:a[2],intro:a[3],story:a[4]}));
const app=document.getElementById('app'), sheet=document.getElementById('sheet'),content=document.getElementById('sheet-content');
let storageOK=true, all={}, current=animals[4],toastTimer,lastRenderedRoute,photoInviteTimer;
try{const parsed=JSON.parse(localStorage.getItem('moadowa-v1')||'{}');if(parsed&&typeof parsed==='object'&&!Array.isArray(parsed))all=parsed;}catch{storageOK=false;}
function validMoney(n){return Number.isSafeInteger(n)&&n>0&&n<=100000000;}
function state(id=current.id){const s=all[id];return {goal:validMoney(s?.goal)?s.goal:0,wish:typeof s?.wish==='string'?s.wish.slice(0,60):'',records:Array.isArray(s?.records)?s.records.filter(r=>validMoney(r.amount)&&typeof r.date==='string'&&!isNaN(Date.parse(r.date))&&typeof r.id==='string'):[]};}
function persist(s){all[current.id]=s;try{localStorage.setItem('moadowa-v1',JSON.stringify(all));return true;}catch{storageOK=false;return false;}}
const won=n=>n.toLocaleString('ko-KR');
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function toast(t){const el=document.getElementById('toast');el.textContent=t;el.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('show'),3200);}
function art(a){return `assets/animals/${String(a.id).padStart(2,'0')}.svg?v=14`;}
const homeSlots=[{"var": "imgGroup", "node": "43:268", "file": "home-b46f0.svg", "x": 137.202, "y": 79.60709999999999, "w": 115.59599999999998, "h": 56.78519999999993, "iw": 115.592, "ih": 56.7761, "angle": 0}, {"var": "imgGroup1", "node": "46:414", "file": "home-c7eb0.svg", "x": 32.097, "y": 255.8928, "w": 147.73199999999997, "h": 120.2193000000002, "iw": 148.942, "ih": 43.8572, "angle": 34.36}, {"var": "imgVector", "node": "46:411", "file": "home-5cddf.svg", "x": 43.719, "y": 225.70319999999998, "w": 15.053999999999942, "h": 24.07980000000006, "iw": 15.0579, "ih": 24.0497, "angle": 0}, {"var": "imgGroup2", "node": "46:442", "file": "home-ee238.svg", "x": 66.066, "y": 226.06259999999997, "w": 58.57799999999998, "h": 23.18130000000011, "iw": 58.5586, "ih": 23.0988, "angle": 0}, {"var": "imgGroup3", "node": "46:560", "file": "home-bcc44.svg", "x": 202.60500000000002, "y": 260.0259, "w": 152.33399999999997, "h": 110.87490000000003, "iw": 142.002, "ih": 55.9491, "angle": 25.05}, {"var": "imgVector1", "node": "46:593", "file": "home-f02ec.svg", "x": 213.75900000000001, "y": 223.0077, "w": 15.053999999999997, "h": 24.07980000000006, "iw": 15.0552, "ih": 24.0497, "angle": 0}, {"var": "imgGroup4", "node": "46:579", "file": "home-a152b.svg", "x": 235.131, "y": 223.5468, "w": 60.567, "h": 23.001600000000018, "iw": 60.542, "ih": 23.0988, "angle": 0}, {"var": "imgVector2", "node": "46:808", "file": "home-396e7.svg", "x": 213.75900000000001, "y": 404.6844, "w": 15.053999999999997, "h": 23.900099999999966, "iw": 15.0552, "ih": 24.0497, "angle": 0}, {"var": "imgGroup5", "node": "46:809", "file": "home-7e614.svg", "x": 235.248, "y": 405.0438, "w": 91.221, "h": 23.18130000000011, "iw": 91.2312, "ih": 23.0896, "angle": 0}, {"var": "imgVector3", "node": "46:826", "file": "home-9ae52.svg", "x": 43.719, "y": 404.6844, "w": 15.053999999999942, "h": 23.900099999999966, "iw": 15.0552, "ih": 24.0497, "angle": 0}, {"var": "imgGroup6", "node": "46:828", "file": "home-8b35b.svg", "x": 64.974, "y": 405.0438, "w": 76.284, "h": 22.821900000000184, "iw": 76.316, "ih": 22.8404, "angle": 0}, {"var": "imgGroup7", "node": "46:851", "file": "home-8cc5d.svg", "x": 62.088, "y": 439.5462, "w": 94.10699999999999, "h": 101.71019999999993, "iw": 94.0861, "ih": 101.614, "angle": 0}, {"var": "imgGroup8", "node": "46:916", "file": "home-a2c28.svg", "x": 202.488, "y": 441.8823, "w": 143.94899999999998, "h": 102.96809999999981, "iw": 133.834, "ih": 53.2841, "angle": 23.85}, {"var": "imgVector4", "node": "46:1094", "file": "home-6746b.svg", "x": 43.719, "y": 580.6107, "w": 15.053999999999942, "h": 24.07980000000006, "iw": 15.0552, "ih": 24.0497, "angle": 0}, {"var": "imgGroup9", "node": "46:1096", "file": "home-87c19.svg", "x": 65.949, "y": 581.1498, "w": 41.34000000000003, "h": 22.82189999999993, "iw": 41.339, "ih": 22.9778, "angle": 0}, {"var": "imgGroup10", "node": "46:1107", "file": "home-21a63.svg", "x": 213.75900000000001, "y": 580.6107, "w": 15.053999999999997, "h": 24.07980000000006, "iw": 15.0552, "ih": 24.0497, "angle": 0}, {"var": "imgGroup11", "node": "46:1111", "file": "home-cd846.svg", "x": 234.0, "y": 581.1498, "w": 92.42999999999999, "h": 22.82189999999993, "iw": 92.4493, "ih": 22.8229, "angle": 0}, {"var": "imgGroup12", "node": "46:1139", "file": "home-354f0.svg", "x": 199.368, "y": 605.9484, "w": 163.683, "h": 125.61030000000002, "iw": 150.057, "ih": 65.8022, "angle": 26.38}, {"var": "imgGroup13", "node": "46:1318", "file": "home-d76d8.svg", "x": 63.999, "y": 759.2325, "w": 61.15200000000002, "h": 24.07980000000006, "iw": 61.1245, "ih": 24.0122, "angle": 0}, {"var": "imgVector5", "node": "46:1331", "file": "home-39185.svg", "x": 43.719, "y": 759.2325, "w": 15.053999999999942, "h": 24.07980000000006, "iw": 15.0552, "ih": 24.0497, "angle": 0}, {"var": "imgGroup14", "node": "47:1355", "file": "home-ae8b4.svg", "x": 213.75900000000001, "y": 759.4121999999999, "w": 15.014999999999977, "h": 23.900100000000094, "iw": 15.0054, "ih": 23.9702, "angle": 0}, {"var": "imgGroup15", "node": "47:1377", "file": "home-47cb9.svg", "x": 223.665, "y": 778.9995, "w": 106.89899999999999, "h": 118.24259999999997, "iw": 106.9, "ih": 118.191, "angle": 0}, {"var": "imgGroup16", "node": "47:1392", "file": "home-e5e4e.svg", "x": 38.649, "y": 594.6273, "w": 151.59300000000002, "h": 120.57869999999988, "iw": 139.667, "ih": 60.6205, "angle": 28.87}, {"var": "imgGroup17", "node": "47:1399", "file": "home-12ecb.svg", "x": 27.573, "y": 781.6949999999999, "w": 166.84200000000004, "h": 126.68849999999995, "iw": 163.025, "ih": 51.6908, "angle": 30.25}, {"var": "imgGroup18", "node": "53:2587", "file": "home-dfdce.svg", "x": 235.794, "y": 760.8498, "w": 87.672, "h": 22.82189999999993, "iw": 87.6696, "ih": 22.823, "angle": 0}, {"var": "imgGroup19", "node": "64:3357", "file": "home-e1838.svg", "x": 43.719, "y": 940.0106999999999, "w": 15.053999999999942, "h": 24.07979999999993, "iw": 15.0579, "ih": 24.0539, "angle": 0}, {"var": "imgGroup20", "node": "64:3375", "file": "home-d60b0.svg", "x": 64.779, "y": 940.3700999999999, "w": 81.354, "h": 23.720400000000005, "iw": 81.3564, "ih": 23.5686, "angle": 0}, {"var": "imgGroup21", "node": "64:3389", "file": "home-c89d1.svg", "x": 48.594, "y": 979.9041, "w": 117.54599999999998, "h": 89.49059999999994, "iw": 117.549, "ih": 89.4674, "angle": 0}, {"var": "imgGroup22", "node": "64:3401", "file": "home-5e657.svg", "x": 213.75900000000001, "y": 937.3151999999999, "w": 30.107999999999993, "h": 24.07980000000006, "iw": 30.1106, "ih": 24.0498, "angle": 0}, {"var": "imgGroup23", "node": "64:3405", "file": "home-53342.svg", "x": 249.639, "y": 938.034, "w": 78.66299999999998, "h": 22.82189999999993, "iw": 78.6802, "ih": 22.8418, "angle": 0}, {"var": "imgVector6", "node": "64:3458", "file": "home-a084c.svg", "x": 43.719, "y": 1118.9919, "w": 30.107999999999993, "h": 23.900099999999966, "iw": 30.1106, "ih": 24.0498, "angle": 0}, {"var": "imgGroup24", "node": "64:3462", "file": "home-b8798.svg", "x": 79.404, "y": 1117.734, "w": 47.931000000000026, "h": 26.236199999999887, "iw": 47.915, "ih": 26.315, "angle": 0}, {"var": "imgVector7", "node": "64:3479", "file": "home-61139.svg", "x": 213.75900000000001, "y": 1118.9919, "w": 30.107999999999993, "h": 23.900099999999966, "iw": 30.1106, "ih": 24.0498, "angle": 0}, {"var": "imgGroup25", "node": "64:3481", "file": "home-df44a.svg", "x": 250.224, "y": 1119.3512999999998, "w": 61.81500000000002, "h": 23.361000000000075, "iw": 61.8498, "ih": 23.3508, "angle": 0}, {"var": "imgGroup26", "node": "64:3498", "file": "home-ccd01.svg", "x": 203.073, "y": 1142.1732, "w": 153.81599999999997, "h": 124.89149999999998, "iw": 137.314, "ih": 69.3186, "angle": 27.55}, {"var": "imgGroup27", "node": "64:3572", "file": "home-f42ec.svg", "x": 32.058, "y": 1140.5558999999998, "w": 156.507, "h": 133.5171, "iw": 151.803, "ih": 56.3355, "angle": 35.23}, {"var": "imgVector8", "node": "64:3595", "file": "home-57e8f.svg", "x": 43.719, "y": 1294.9182, "w": 30.107999999999993, "h": 24.07979999999993, "iw": 30.1106, "ih": 24.0498, "angle": 0}, {"var": "imgGroup28", "node": "64:3597", "file": "home-84d42.svg", "x": 79.599, "y": 1295.2776, "w": 83.694, "h": 23.181300000000046, "iw": 83.6879, "ih": 23.1655, "angle": 0}, {"var": "imgGroup29", "node": "64:3617", "file": "home-e160e.svg", "x": 32.330999999999996, "y": 1321.5138, "w": 153.97200000000004, "h": 122.01629999999984, "iw": 136.508, "ih": 71.7752, "angle": 24.63}, {"var": "imgVector9", "node": "64:3627", "file": "home-eb3d1.svg", "x": 213.75900000000001, "y": 1294.9182, "w": 30.107999999999993, "h": 24.07979999999993, "iw": 30.1106, "ih": 24.0498, "angle": 0}, {"var": "imgGroup30", "node": "64:3629", "file": "home-3e0c7.svg", "x": 248.898, "y": 1296.1761, "w": 39.74100000000001, "h": 23.540700000000104, "iw": 39.7291, "ih": 23.6016, "angle": 0}, {"var": "imgGroup31", "node": "64:3637", "file": "home-c6a03.svg", "x": 236.41799999999998, "y": 1333.9131, "w": 89.31, "h": 97.57709999999993, "iw": 89.3133, "ih": 97.6079, "angle": 0}, {"var": "imgVector10", "node": "64:3657", "file": "home-8d015.svg", "x": 43.719, "y": 1473.8993999999998, "w": 29.639999999999976, "h": 23.72040000000007, "iw": 29.6178, "ih": 23.6562, "angle": 0}, {"var": "imgGroup32", "node": "64:3659", "file": "home-57901.svg", "x": 79.01400000000001, "y": 1473.7197, "w": 69.77099999999997, "h": 23.540699999999912, "iw": 69.7686, "ih": 23.5188, "angle": 0}, {"var": "imgGroup33", "node": "64:3672", "file": "home-0c033.svg", "x": 30.264, "y": 1493.6664, "w": 156.897, "h": 128.12609999999992, "iw": 138.152, "ih": 74.5464, "angle": 26.27}, {"var": "imgGroup34", "node": "64:3693", "file": "home-d53cd.svg", "x": 213.71999999999997, "y": 1473.7197, "w": 52.68900000000001, "h": 75.65369999999992, "iw": 52.6801, "ih": 75.7013, "angle": 0}];
function warning(){return storageOK?'':'<div class="storage-warning" role="alert">이 브라우저에서는 기록을 저장할 수 없어요. 새로고침하면 기록이 사라질 수 있어요.</div>';}
const animalDimensions={"1": [277.95, 192.55], "2": [277.95, 217.49], "3": [278.24, 285.69], "4": [278.24, 218.03], "5": [277.95, 210.64], "6": [278.24, 222.08], "7": [277.95, 206.82], "8": [278.24, 295.84], "9": [278.24, 277.74], "10": [278.24, 257.87], "11": [277.95, 210.43], "12": [277.95, 226.41], "13": [278.24, 224.38], "14": [277.95, 283.46], "15": [277.95, 226.06]};
const animalFunds=[["WWF 미국 · 대왕고래 상징입양", "상징입양", "대왕고래를 선택해 해양·야생동물 보전 활동을 후원해요. 기부금이 이 종에만 지정되는 방식은 아니에요.", "https://gifts.worldwildlife.org/gift-center/gifts/species-adoptions/Blue-Whale"], ["Red Panda Network", "레서판다 보호 단체", "레서판다와 서식지 보호, 지역사회와 함께하는 보전 활동을 후원해요.", "https://redpandanetwork.org/donate"], ["Dian Fossey Gorilla Fund", "고릴라 보호 단체", "마운틴고릴라를 포함한 고릴라 보호와 서식지 보전 활동을 후원해요.", "https://www.save.gorillafund.org/campaign/699614/donate"], ["SEE Turtles · Too Rare To Wear", "매부리바다거북 관련 사업", "매부리바다거북 등껍질 거래를 줄이는 사업과 바다거북 보호를 지원해요.", "https://www.seeturtles.org/ways-to-give"], ["Porpoise Conservation Society", "바키타 보호 · 상징입양", "바키타 상징입양을 통해 바키타를 알리고 보호하는 활동에 힘을 보탤 수 있어요.", "https://porpoise.org/save-the-vaquita/"], ["WildCats Conservation Alliance", "호랑이·아무르표범 보호", "아무르 지역을 포함해 야생 호랑이와 아무르표범을 보호하는 현장 사업을 후원해요.", "https://conservewildcats.org/donate/"], ["WildCats Conservation Alliance", "아무르표범·호랑이 보호", "아무르표범과 야생 호랑이의 서식지·현장 보전 사업을 후원해요.", "https://conservewildcats.org/donate/"], ["Phoenix Zoo · Arabian Oryx", "동물원 상징입양", "목록에서 Arabian Oryx를 선택해 상징입양할 수 있어요. 동물원의 돌봄을 돕는 후원으로, 야생 개체에 대한 지정 기부는 아니에요.", "https://www.phoenixzoo.org/support/support-what-matters-most/animal-care/care-for-animals/"], ["Fauna & Flora · Asian Elephants", "아시아코끼리 보호 모금", "아시아코끼리와 사람 사이의 충돌을 줄이고 안전한 서식지를 만드는 활동을 후원해요.", "https://www.fauna-flora.org/appeals/save-asian-elephants/"], ["Painted Dog Conservation", "아프리카들개 보호 단체", "아프리카들개 보호 활동을 후원해요. 공식 페이지에서 WCN을 통한 기부 방법을 안내해요.", "https://www.painteddog.org/donate"], ["UNAM · AdoptAxolotl", "아홀로틀 전용 후원", "멕시코 국립자치대학교의 가상입양·서식지 후원으로 아홀로틀과 소치밀코의 서식지 회복을 도와요.", "https://www.ib.unam.mx/ib/adopta-axolotl/"], ["Saving the Javan Rhino · IRF", "자바코뿔소 전용 프로젝트", "GlobalGiving의 국제코뿔소재단 프로젝트를 통해 자바코뿔소 보호를 후원할 수 있어요.", "https://www.globalgiving.org/projects/saving-the-javan-rhino/donate/"], ["Giant Panda Conservation Support Fund", "자이언트판다 전용 기금", "도쿄동물원협회의 판다 보전 기금으로 판다 보전 교육과 사육 환경·보호 활동을 지원해요.", "https://www.tokyo-zoo.net/en/ueno/giant-panda-conservation-fund/index.html"], ["DOC · Kākāpō Recovery", "카카포 전용 보호 사업", "뉴질랜드 자연보전부의 카카포 회복 사업에 기부하거나 상징입양하는 방법을 알아볼 수 있어요.", "https://www.doc.govt.nz/our-work/kakapo-recovery/get-involved/"], ["Pygmy Hippo Foundation", "피그미하마 보호 단체", "피그미하마와 서아프리카 열대우림 서식지를 보호하는 재단의 후원 경로를 안내해요.", "https://pygmyhippofoundation.org/"]];
function render(){
cancelAnimalTouchHint();
closePracticeCamera();
document.querySelector('.home-snow')?.remove();
releasePracticeUrls();
clearTimeout(photoInviteTimer);document.querySelector('.photo-invite')?.remove();
const previousRoute=lastRenderedRoute;const enteredRoute=previousRoute!==location.hash;lastRenderedRoute=location.hash;
if(location.hash==='#about'){renderAbout();return;}
const match=location.hash.match(/^#animal\/(\d+)$/);if(!match){renderHome(Boolean(enteredRoute&&previousRoute&&(previousRoute.startsWith('#animal/')||previousRoute==='#about')));return;}
current=animals.find(a=>a.id===Number(match[1]))||animals[4];const s=state(),total=s.records.reduce((n,r)=>n+r.amount,0),ratio=s.goal?Math.min(100,total/s.goal*100):0;
document.body.className='detail-page';
const hero=current.id===5?`<div class="hero-number"><img src="assets/figma/detail-148ed.svg" alt="05"></div><div class="hero-title"><img src="assets/figma/detail-9676d.svg" alt="바키타"></div><div class="hero-badges"><img src="assets/figma/detail-3e083.svg" alt="바다에 살아요. 불법 어망 혼획으로 위협받고 있어요. CR, 매우 심각해요."></div><button class="hero-animal" aria-label="바키타에게 인사하기"><img src="assets/figma/detail-f2c9c.svg" alt="바키타 실루엣"></button>`:`<div class="composite-heading"><img src="${current.id===8?'assets/detail/08-heading.svg?v=31':art(current)+'#svgView(viewBox(0,0,'+animalDimensions[current.id][0]+',100))'}" alt="${current.id}번 ${current.name}, 서식지와 보전 상태 배지"></div><button class="composite-art" aria-label="${current.name}에게 인사하기"><img src="assets/${[3,6,7,8,9,10,12,13,14,15].includes(current.id)?'detail':'camera'}/${String(current.id).padStart(2,'0')}.svg?v=31" alt="${current.name} 실루엣"></button>`;
app.innerHTML=warning()+`<article class="workbook" data-animal="${current.id}"><section class="workbook-hero ${current.id===5?'':'other-animal'}" aria-label="${current.name} 동물 표지"><a class="back-link" href="#home" aria-label="홈으로 돌아가기"><img src="assets/figma/detail-5f09b.svg" alt=""></a><button class="hero-photo" type="button" data-action="practice" aria-label="동물 카메라 열기">${cameraIcon('camera')}</button><h1 class="sr-only">${current.name} 저금통</h1>${hero}<button class="coin" type="button" aria-label="동전이 저금통에 들어가는 모션 재생"><img src="assets/figma/detail-a5f40.svg" alt=""></button></section><section class="workbook-savings" aria-label="나의 저금 현황"><p class="balance-label">${withAnimal(current.name)} 함께 모은 금액</p><div class="balance">${won(total)}<small>원</small></div><div class="goal-row"><span>${s.goal?'목표 '+won(s.goal)+'원':'워크북의 저금 목표를 정해주세요'}</span><button class="text-btn" data-action="goal">${s.goal?'목표 수정':'목표 정하기'}</button></div><div class="progress" role="progressbar" aria-label="저금 목표 달성률" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${Math.floor(ratio)}"><span style="width:${ratio}%"></span></div><p class="goal-help ${s.goal&&total>=s.goal?'reached':''}">${s.goal?(total>=s.goal?'목표를 채웠어요! 모은 마음을 전해볼까요?':'목표까지 '+won(s.goal-total)+'원 남았어요.'):'워크북에 적은 작은 약속을 여기에도 담아요.'}</p>${s.wish?`<p class="wish">“${esc(s.wish)}”</p>`:''}<div class="actions"><button class="primary" data-action="save">저금하기</button><button class="secondary" data-action="donate">기부하기</button></div><p class="small-note demo-note">저금 체험 · 실제 이체는 발생하지 않아요.</p></section><section class="paper-stack" aria-label="동물 이야기와 나의 기록"><details class="paper" id="story"><summary><span class="fold-no">01</span><span class="fold-title">${current.name}의 이야기</span><span class="fold-toggle" aria-hidden="true">+</span></summary><div class="paper-body"><p>${current.intro}</p><h3>함께 지켜주세요</h3><p>${current.story}</p>${current.id===5?'<a class="source-link" href="https://www.fisheries.noaa.gov/species/vaquita" target="_blank" rel="noopener noreferrer">바키타 더 알아보기 ↗</a>':''}<p class="small-note">워크북에 이 친구를 위한 나의 생각을 남겨보세요.</p></div></details><details class="paper" id="records"><summary><span class="fold-no">02</span><span class="fold-title">차곡차곡 모은 마음</span><span class="fold-toggle" aria-hidden="true">+</span></summary><div class="paper-body"><section class="practice-section" aria-label="나의 실천 사진"><div class="practice-title"><h3>나의 실천</h3></div><p class="practice-prompt">텀블러 사용, 쓰레기 줍기, 키트 만들기…<br>위쪽 카메라 아이콘에서 촬영하고,<br>실천 메모와 함께 기록해보세요.</p><div class="practice-list" aria-live="polite"></div><p class="small-note">사진은 이 브라우저에만 저장돼요. 다른 사람에게 공개되거나 다른 기기와 공유되지 않아요.</p></section><h3 class="savings-record-title">저금 기록</h3>${s.records.length?s.records.slice().reverse().map(r=>`<div class="record"><div><time>${new Date(r.date).toLocaleDateString('ko-KR')}</time><br><span>체험 저금</span></div><strong>+${won(r.amount)}원</strong></div>`).join(''):'<p class="empty">아직 첫 저금을 기다리고 있어요.<br>오늘 작은 마음 하나를 담아볼까요?</p>'}<p class="small-note">목표와 기록은 이 브라우저에 저장돼요. 실제 은행 잔액이나 기부 내역이 아니에요.</p></div></details><details class="paper" id="donate"><summary><span class="fold-no">03</span><span class="fold-title">모은 마음 전하기</span><span class="fold-toggle" aria-hidden="true">+</span></summary><div class="paper-body"><p>함께 살아갈 내일을 위해,<br>나의 마음이 닿는 곳을 골라보세요.</p><div class="donor animal-donor"><span class="fund-type">${animalFunds[current.id-1][1]}</span><strong>${animalFunds[current.id-1][0]}</strong><p>${animalFunds[current.id-1][2]}</p><a href="${animalFunds[current.id-1][3]}" target="_blank" rel="noopener noreferrer">이 동물의 후원 경로 ↗</a><small>해외 사이트 · 상세 조건과 결제 가능 여부는 공식 페이지에서 확인해주세요.</small></div><p class="general-funds-label">더 넓은 자연을 함께 도와요</p><div class="donor"><strong>WWF 세계자연기금</strong><p>야생동물과 서식지, 자연을 지키는 활동을 해요.</p><a href="https://www.wwfkorea.or.kr/main" target="_blank" rel="noopener noreferrer">공식 사이트 ↗</a></div><div class="donor"><strong>그린피스</strong><p>바다와 숲, 기후와 환경을 지키는 활동을 해요.</p><a href="https://www.greenpeace.org/korea/" target="_blank" rel="noopener noreferrer">공식 사이트 ↗</a></div><p class="donate-note">외부 공식 사이트로 이동해요. 후원 조건과 지원 대상은 각 단체에서 확인해주세요. 모아도와와의 제휴를 의미하지 않아요.</p><p class="donate-note">어린이는 보호자와 함께 확인해주세요. 사이트 이동만으로 기부가 완료되지는 않아요.</p></div></details></section><a class="all-link" href="#home">다른 동물 친구들 만나기 ↗</a></article>`;
app.querySelector('.back-link').onclick=e=>{e.preventDefault();location.hash='home';};app.querySelectorAll('[data-action="practice"]').forEach(b=>b.onclick=()=>showPractice());loadPractice(current.id);app.querySelector('[data-action="goal"]').onclick=()=>showGoal();app.querySelector('[data-action="save"]').onclick=()=>showSave();app.querySelector('.coin').onclick=()=>playCoin();app.querySelector('[data-action="donate"]').onclick=()=>{const d=document.getElementById('donate');d.open=true;d.scrollIntoView({behavior:'smooth',block:'start'});};
app.querySelector('.hero-animal,.composite-art').onclick=e=>{cancelAnimalTouchHint();e.currentTarget.classList.add('wiggle');setTimeout(()=>document.querySelector('.wiggle')?.classList.remove('wiggle'),800);toast('오늘도 만나서 반가워요. 작은 마음을 함께 모아요!');};

if(enteredRoute){photoInviteTimer=setTimeout(showPhotoInvite,1300);showAnimalTouchHint(current.id);}
}
let animalTouchHintCleanup=null;
const animalTouchHintSeen=new Set();
function cancelAnimalTouchHint(){animalTouchHintCleanup?.();animalTouchHintCleanup=null;}
function showAnimalTouchHint(id){
 const key=`moadowa-touch-hint-${id}`;
 try{if(localStorage.getItem(key))return;}catch{}
 if(animalTouchHintSeen.has(id))return;
 animalTouchHintSeen.add(id);try{localStorage.setItem(key,'1');}catch{}
 const hero=app.querySelector('.workbook-hero'),coin=hero?.querySelector('.coin');if(!coin)return;
 const sparkles=document.createElement('span');sparkles.className='coin-touch-sparkles';sparkles.setAttribute('aria-hidden','true');sparkles.innerHTML='<i></i><i></i>';
 coin.append(sparkles);hero.classList.add('touch-discovery');
 const cleanup=()=>{clearTimeout(timer);hero.classList.remove('touch-discovery');sparkles.remove();};
 const timer=setTimeout(()=>{cleanup();if(animalTouchHintCleanup===cleanup)animalTouchHintCleanup=null;},6350);
 animalTouchHintCleanup=cleanup;
}
function showPhotoInvite(){
 const invite=document.createElement('aside');invite.className='photo-invite';invite.setAttribute('role','status');invite.setAttribute('aria-live','polite');invite.innerHTML=`<button class="photo-invite-action" type="button"><strong>바로 사진으로 기록하기</strong><span>오늘 실천한 순간 기록</span></button><button class="photo-invite-close" type="button" aria-label="사진 기록 안내 닫기">${cameraIcon('close')}</button>`;document.body.append(invite);
 const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches,entryDuration=reduced?150:600;
 invite.animate([{opacity:0,transform:`translateX(-50%) translateY(${reduced?0:-7}px)`},{opacity:1,transform:'translateX(-50%) translateY(0)'}],{duration:entryDuration,easing:'cubic-bezier(.2,.7,.3,1)'});
 const dismiss=()=>{clearTimeout(photoInviteTimer);invite.remove();};invite.querySelector('.photo-invite-action').onclick=()=>{dismiss();showPractice();};invite.querySelector('.photo-invite-close').onclick=dismiss;photoInviteTimer=setTimeout(()=>{invite.inert=true;invite.animate([{opacity:1},{opacity:0}],{duration:matchMedia('(prefers-reduced-motion: reduce)').matches?150:450,easing:'ease-out',fill:'forwards'}).finished.then(()=>invite.remove()).catch(()=>invite.remove());},entryDuration+1800);
}

function renderHome(autoSnow=false){
document.body.className='home-page';
const slots=homeSlots.filter(d=>d.node!=='64:3693'&&d.node!=='43:268').map(d=>`<span class="home-art-slot" data-figma-node="${d.node}" style="left:${d.x/3.9}%;top:${(d.y+(d.y>=200?-23.37:0))/16.54}%;width:${d.w/3.9}%;height:${d.h/16.54}%"><img src="assets/figma/${d.file}" alt="" style="width:${d.iw/3.9}cqw;transform:translate(-50%,-50%) rotate(${d.angle}deg)"></span>`).join('');
const cards=Array.from({length:16},(_,i)=>{const row=Math.floor(i/2),col=i%2;const x=col?197.77:27.73,y=184+row*178.57,filled=(row+col)%2===1;return `<a class="home-tile ${filled?'filled':''}" href="${i<15?'#animal/'+(i+1):'#about'}" style="left:${x/3.9}%;top:${y/16.54}%;width:${164.34/3.9}%;height:${172.51/16.54}%" aria-label="${i<15?String(i+1).padStart(2,'0')+' '+animals[i].name+' 저금통 보기':'모아서 도와요, 이용 방법'}"></a>`;}).join('');
const desktopCards=animals.map((animal,i)=>{const folder=[3,6,7,8,9,10,12,13,14,15].includes(animal.id)?'detail':'camera';return `<a class="catalog-card" href="#animal/${animal.id}"><h2><span>${String(animal.id).padStart(2,'0')}</span>${animal.name}</h2><span class="catalog-art" style="--animal-art:url('assets/${folder}/${String(animal.id).padStart(2,'0')}.svg')" aria-hidden="true"></span></a>`;}).join('');
const desktop=`<section class="desktop-catalog" aria-label="모아도와 동물 도감"><header class="catalog-cover"><button class="catalog-logo" type="button" aria-label="모아도와, 동물 눈 내리기"><img src="assets/figma/home-b46f0.svg" alt="모아도와"></button><p>내 손으로 만들고,<br>마음을 모아 도와요.</p></header><div class="catalog-grid">${desktopCards}<a class="catalog-card catalog-about" href="#about"><img src="assets/figma/home-d53cd.svg" alt="모아서 도와요"><span>모아도와 이야기 ↗</span></a></div></section>`;
app.innerHTML=warning()+`<section class="home-workbook" aria-label="모아도와 동물 도감"><h1 class="sr-only">모아도와, 함께하는 15종의 동물</h1><button class="home-logo-button" type="button" aria-label="모아도와, 동물 눈 내리기"><img src="assets/figma/home-b46f0.svg" alt="모아도와"></button>${cards}${slots}<span class="home-about-lettering" aria-hidden="true"><img src="assets/figma/home-d53cd.svg" alt=""></span><span class="home-dog-art" aria-hidden="true"><img src="assets/detail/10.svg" alt=""></span></section>${desktop}<div class="home-note">내 손으로 만들고, 마음을 모아 도와요.<br>동물 친구를 누르면 나의 저금통으로 연결돼요.</div>`;
app.querySelector('.home-logo-button').onclick=playHomeSnow;
app.querySelector('.catalog-logo').onclick=playHomeSnow;
if(autoSnow)requestAnimationFrame(()=>{if(document.body.classList.contains('home-page'))playHomeSnow();});
}
function playHomeSnow(){
 if(document.querySelector('.home-snow'))return;
 const layer=document.createElement('div');layer.className='home-snow';layer.setAttribute('aria-hidden','true');
 const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
 // Irregular positions and timing, with only local spacing to avoid clumps.
 const placed=[];
 for(let i=0;i<24;i++){
  const plus=i%3!==0,item=document.createElement('span');item.className='snow-piece'+(plus?' snow-plus':'');
  const size=plus?12+Math.pow(Math.random(),.8)*34:42+Math.random()*66;
  let left,delay;
  for(let attempt=0;attempt<60;attempt++){
   left=7+Math.random()*86;delay=Math.random()*3.6;
   if(placed.every(p=>Math.abs(p.left-left)>19||Math.abs(p.delay-delay)>.65))break;
  }
  placed.push({left,delay});
  item.style.cssText=`left:${left}%;width:${size}px;--drift:${(Math.random()-.5)*56}px;--turn:${(Math.random()-.5)*70}deg;animation-duration:${reduced?1:7+Math.random()*1.5}s;animation-delay:${reduced?Math.random()*.3:delay}s`;
  if(!plus){const image=new Image();image.src=`assets/camera/${String(1+Math.floor(Math.random()*15)).padStart(2,'0')}.svg?v=31`;image.alt='';item.append(image);}layer.append(item);
 }
 document.body.append(layer);setTimeout(()=>layer.remove(),reduced?1500:12300);
}
function renderAbout(){document.body.className='about-page';const steps=[['알아봐요.','워크북을 펼쳐 동물 친구의 이야기와 우리가 함께 지킬 자연을 알아봐요.'],['만들어요.','키트의 조각을 하나씩 맞추며 나만의 동물 저금통을 만들어요.'],['모아요.','워크북에 저금 목표를 적고, 작은 마음과 실천을 차곡차곡 모아요.'],['도와요.','모은 마음을 전할 곳을 골라요. 공식 기부 사이트에서 후원 방법을 알아봐요.']];app.innerHTML=`<article class="about-workbook"><a class="about-back back-link" href="#home" aria-label="홈으로 돌아가기"><img src="assets/figma/detail-5f09b.svg" alt=""></a><header class="about-cover"><a class="home-logo-button about-logo-button" href="#home" aria-label="모아도와 홈으로 가기"><img src="assets/figma/home-b46f0.svg" alt="모아도와"></a></header><h1><img src="assets/figma/about-title.svg" alt="모아서 도와요"></h1><p class="about-intro">작은 저금과 실천을 차곡차곡 모아,<br>환경을 지키는 습관으로 이어가요.</p><img class="about-process-art" src="assets/about-process.svg?v=14" alt="1 동물을 알아봐요, 2 저금통을 만들어요, 3 마음을 모아요, 4 동물을 도와요"><ol class="about-steps">${steps.map(([title,text],i)=>`<li><img class="about-step-no" src="assets/step-${i+1}.svg?v=14" alt="${i+1}"><div><h2>${title}</h2><p>${text}</p></div></li>`).join('')}</ol><p class="small-note">은행 앱과의 연계를 상상한 체험 사이트예요. 실제 계좌 연결과 이체는 제공하지 않아요. 목표와 기록은 사용 중인 브라우저에 저장돼요.</p><a class="primary" href="#home">함께할 동물 만나기 ↗</a></article>`;}


function playSavingsPlus(animal){
 const hero=animal.closest('.workbook-hero');if(!hero)return;
 hero.querySelector('.savings-plus-burst')?.remove();
 const layer=document.createElement('div');layer.className='savings-plus-burst';layer.setAttribute('aria-hidden','true');
 const bounds=hero.getBoundingClientRect();
 layer.style.left='0';layer.style.top='0';
 const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
 // Scatter throughout the lower cover; only keep nearby particles apart.
 const points=[],gap=bounds.width*.105;
 for(let i=0;i<18;i++){
  const piece=document.createElement('span'),size=10+Math.random()*23;
  let x,y;
  for(let attempt=0;attempt<80;attempt++){
   x=bounds.width*(.065+Math.random()*.87);
   y=bounds.height*(.38+Math.random()*.51);
   if(points.every(p=>Math.hypot(x-p.x,y-p.y)>gap))break;
  }
  points.push({x,y});
  const dx=(Math.random()-.5)*24,dy=-8-Math.random()*18;
  piece.style.cssText=`left:${x}px;top:${y}px;width:${size}px;height:${size}px;--burst-x:${dx}px;--burst-y:${dy}px;--burst-turn:${(Math.random()-.5)*80}deg;animation-delay:${reduced?0:Math.random()*2.15}s;animation-duration:${reduced?.7:3.3}s`;
  layer.append(piece);
 }
 hero.append(layer);setTimeout(()=>layer.remove(),reduced?900:5700);
}
async function playCoin(){
 cancelAnimalTouchHint();
 const coin=app.querySelector('.coin'),animal=app.querySelector('.hero-animal,.composite-art');
 if(!coin||!animal||coin.disabled)return;
 coin.disabled=true;coin.dataset.animating='true';
 const c=coin.getBoundingClientRect(),a=animal.getBoundingClientRect();
 const dx=a.left+a.width*.5-(c.left+c.width*.5),dy=a.top+a.height*.56-(c.top+c.height*.5);
 const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 playSavingsPlus(animal);
 try{
  const frames=reduced?[{opacity:1},{opacity:.15},{opacity:1}]:[
   {transform:'translate(0,0) rotate(0deg)',opacity:1,offset:0},
   {transform:`translate(${dx*.35}px,${dy*.35}px) rotate(35deg) scale(.95)`,opacity:1,offset:.5},
   {transform:`translate(${dx*.9}px,${dy*.88}px) rotate(85deg) scale(.83)`,opacity:1,offset:.9},
   {transform:`translate(${dx}px,${dy}px) rotate(95deg) scale(.8)`,opacity:0,offset:1}
  ];
  const falling=coin.animate(frames,{duration:reduced?240:1550,easing:'cubic-bezier(.35,.05,.65,1)',fill:'forwards'});
  await falling.finished;
  if(!coin.isConnected){falling.cancel();return;}
  if(!reduced)animal.animate([{transform:'translateY(0)'},{transform:'translateY(2px)'},{transform:'translateY(0)'}],{duration:300,easing:'ease-out'});
  falling.cancel();
  await coin.animate([{opacity:0},{opacity:1}],{duration:reduced?100:360,easing:'ease-out'}).finished;
 }catch{/* Navigation can interrupt a running animation. */}
 finally{coin.disabled=false;delete coin.dataset.animating;}
}
let practiceDbPromise,practiceUrls=[],practiceLoadToken=0;
function releasePracticeUrls(){practiceLoadToken++;practiceUrls.forEach(u=>URL.revokeObjectURL(u));practiceUrls=[];}
function practiceDb(){
 if(!practiceDbPromise)practiceDbPromise=new Promise((resolve,reject)=>{
  if(!window.indexedDB){reject(new Error('사진 저장을 지원하지 않는 브라우저예요.'));return;}
  const req=indexedDB.open('moadowa-practice',1);
  req.onupgradeneeded=()=>{const db=req.result;if(!db.objectStoreNames.contains('photos')){const store=db.createObjectStore('photos',{keyPath:'id'});store.createIndex('animalId','animalId');}};
  req.onsuccess=()=>resolve(req.result);req.onerror=()=>reject(req.error);
 });
 return practiceDbPromise;
}
async function readPractice(animalId){const db=await practiceDb();return new Promise((resolve,reject)=>{const req=db.transaction('photos').objectStore('photos').index('animalId').getAll(animalId);req.onsuccess=()=>resolve(req.result.sort((a,b)=>b.createdAt.localeCompare(a.createdAt)));req.onerror=()=>reject(req.error);});}
async function writePractice(record,remove=false){const db=await practiceDb();return new Promise((resolve,reject)=>{const tx=db.transaction('photos','readwrite');const store=tx.objectStore('photos');remove?store.delete(record.id):store.put(record);tx.oncomplete=()=>resolve();tx.onerror=()=>reject(tx.error);tx.onabort=()=>reject(tx.error);});}
async function loadPractice(animalId){
 const token=practiceLoadToken,target=app.querySelector('.practice-list');if(!target)return;
 try{const records=await readPractice(animalId);if(token!==practiceLoadToken||!target.isConnected)return;
  target.innerHTML=records.length?records.map(r=>{const url=URL.createObjectURL(r.photo);practiceUrls.push(url);return `<button class="practice-card" type="button" data-photo="${esc(r.id)}" aria-label="${esc(r.date)} 실천 기록 보기"><img src="${url}" alt="${esc(r.note||'나의 실천 사진')}" loading="lazy"><span class="practice-date">${esc(r.date.replaceAll('-','.'))}</span><span class="practice-caption">${esc(r.note||'작은 실천 하나를 남겼어요.')}</span></button>`;}).join(''):'<p class="practice-empty">아직 비어 있는 나의 실천 앨범.<br>첫 번째 순간을 담아볼까요?</p>';
  target.querySelectorAll('[data-photo]').forEach(b=>b.onclick=()=>showPracticeDetail(records.find(r=>r.id===b.dataset.photo)));
 }catch{if(target.isConnected)target.innerHTML='<p class="form-error">이 브라우저에서 사진 저장소를 열지 못했어요. 브라우저의 저장 설정을 확인해주세요.</p>';}
}
function localDateString(){const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;}
async function compressPracticePhoto(file){
 if(!file.type.startsWith('image/')||file.type==='image/svg+xml')throw new Error('카메라로 찍은 사진이나 JPG·PNG·WEBP 사진을 골라주세요.');
 if(file.size>35*1024*1024)throw new Error('35MB보다 작은 사진을 골라주세요.');
 const url=URL.createObjectURL(file),img=new Image();
 try{await new Promise((resolve,reject)=>{img.onload=resolve;img.onerror=()=>reject(new Error('사진을 읽지 못했어요. JPG나 PNG 사진으로 다시 시도해주세요.'));img.src=url;});
  const scale=Math.min(1,1200/Math.max(img.naturalWidth,img.naturalHeight)),canvas=document.createElement('canvas');canvas.width=Math.max(1,Math.round(img.naturalWidth*scale));canvas.height=Math.max(1,Math.round(img.naturalHeight*scale));const ctx=canvas.getContext('2d');if(!ctx)throw new Error('사진을 준비하지 못했어요. 다시 시도해주세요.');ctx.fillStyle='#fffaf1';ctx.fillRect(0,0,canvas.width,canvas.height);ctx.drawImage(img,0,0,canvas.width,canvas.height);
  return await new Promise((resolve,reject)=>canvas.toBlob(b=>b?resolve(b):reject(new Error('사진을 저장할 수 있는 형식으로 바꾸지 못했어요.')),'image/jpeg',.82));
 }finally{URL.revokeObjectURL(url);}
}
function showPractice(){showPracticeCamera();}
function showPracticeDetail(record){
 if(!record)return;const url=URL.createObjectURL(record.photo);
 openSheet(`<h2 id="sheet-title">${esc(record.date.replaceAll('-','.'))}의 실천</h2><img class="practice-detail-photo" src="${url}" alt="${esc(record.note||'나의 실천 사진')}"><p class="practice-detail-note">${esc(record.note||'작은 실천 하나를 남겼어요.')}</p><button class="practice-export" type="button">사진 저장 ↓</button><p class="practice-export-help">휴대폰의 저장 메뉴에서 이미지 저장을 선택해주세요.</p><button class="practice-delete" type="button">이 기록 삭제</button><div class="delete-check" hidden><p>이 브라우저에서 사진과 메모를 삭제할까요?</p><button type="button" class="cancel-delete">취소</button><button type="button" class="confirm-delete">삭제하기</button></div><p class="form-error" role="alert" id="delete-error"></p>`);
 sheet.addEventListener('close',()=>URL.revokeObjectURL(url),{once:true});
 content.querySelector('.practice-export').onclick=()=>offerPracticePhotoSave(new File([record.photo],`moadowa-${record.date}.jpg`,{type:'image/jpeg'}),content.querySelector('.practice-export-help'));
 content.querySelector('.practice-delete').onclick=()=>{content.querySelector('.delete-check').hidden=false;};content.querySelector('.cancel-delete').onclick=()=>{content.querySelector('.delete-check').hidden=true;};
 content.querySelector('.confirm-delete').onclick=async e=>{e.currentTarget.disabled=true;try{await writePractice(record,true);sheet.close();render();app.querySelector('#records').open=true;toast('실천 기록을 삭제했어요.');}catch{content.querySelector('#delete-error').textContent='삭제하지 못했어요. 다시 시도해주세요.';e.currentTarget.disabled=false;}};
}
function openSheet(html){closePracticeCamera();content.innerHTML=html;if(!sheet.open)sheet.showModal();sheet.scrollTop=0;}
function showGoal(afterSave=false){const s=state();openSheet(`<h2 id="sheet-title">${withAnimal(current.name)}의<br>작은 약속을 정해요.</h2><p class="explain">워크북에 적은 저금 목표를 옮겨보세요.<br>목표는 언제든 다시 바꿀 수 있어요.</p><form id="goal-form"><label for="goal-input">목표 금액</label><div class="money-field"><input id="goal-input" name="goal" type="text" inputmode="numeric" autocomplete="off" placeholder="50,000" value="${s.goal||''}" required maxlength="11"><span>원</span></div><div class="quick"><button type="button" data-value="10000">1만원</button><button type="button" data-value="30000">3만원</button><button type="button" data-value="50000">5만원</button></div><label for="wish-input">나의 다짐 <span class="edition">(선택)</span></label><input class="wish-input" id="wish-input" name="wish" placeholder="예: 바키타가 안전하게 사는 바다를 위해" maxlength="60" value="${esc(s.wish)}"><p class="form-error" id="error" role="alert"></p><button class="primary form-submit" type="submit">${afterSave?'목표 정하고 저금하기':'나의 목표 담기'} ↗</button><p class="small-note">목표는 이 브라우저에 저장돼요. 다른 기기와 공유되지 않아요.</p></form>`);
content.querySelectorAll('[data-value]').forEach(b=>b.onclick=()=>{document.getElementById('goal-input').value=b.dataset.value;});
document.getElementById('goal-form').onsubmit=e=>{e.preventDefault();const amount=parseMoney(document.getElementById('goal-input').value);if(!validMoney(amount)){document.getElementById('error').textContent='목표는 1원부터 1억원까지, 숫자로 입력해주세요.';return;}s.goal=amount;s.wish=document.getElementById('wish-input').value.trim();const saved=persist(s);sheet.close();render();toast(saved?'워크북의 약속을 여기에 담았어요.':'저장하지 못했어요. 이 화면에서만 기록이 유지돼요.');if(afterSave)showSave();};}
function parseMoney(v){return /^\d[\d,]*$/.test(v.trim())?Number(v.replaceAll(',','')):NaN;}
function showSave(){const s=state();if(!s.goal){showGoal(true);return;}openSheet(`<h2 id="sheet-title">오늘은 얼마를<br>모아볼까요?</h2><p class="explain">${withAnimal(current.name)} 함께하는 작은 한 걸음.<br>부담 없는 금액으로 시작해보세요.</p><form id="save-form"><label for="save-input">체험 저금 금액</label><div class="money-field"><input id="save-input" inputmode="numeric" type="text" placeholder="0" autocomplete="off" required maxlength="11"><span>원</span></div><div class="quick"><button type="button" data-add="1000">+1천원</button><button type="button" data-add="5000">+5천원</button><button type="button" data-add="10000">+1만원</button></div><div class="bank-note">저금 방식 <strong>체험 저금</strong><br>은행 앱과 연계된 상황을 체험하는 화면이에요.<br>실제 계좌에서 돈이 출금되거나 이체되지 않아요.</div><p class="form-error" id="error" role="alert"></p><button class="primary form-submit" type="submit">체험 저금하기 ↓</button></form>`);
content.querySelectorAll('[data-add]').forEach(b=>b.onclick=()=>{const el=document.getElementById('save-input');el.value=(parseMoney(el.value)||0)+Number(b.dataset.add);});
document.getElementById('save-form').onsubmit=e=>{e.preventDefault();const amount=parseMoney(document.getElementById('save-input').value);if(!validMoney(amount)){document.getElementById('error').textContent='1원부터 1억원까지, 숫자로 입력해주세요.';return;}const total=s.records.reduce((n,r)=>n+r.amount,0);if(total+amount>100000000){document.getElementById('error').textContent='체험 저금의 누적 한도는 1억원이에요.';return;}s.records.push({id:crypto.randomUUID?crypto.randomUUID():String(Date.now()),date:new Date().toISOString(),amount});const saved=persist(s);sheet.close();render();const hero=app.querySelector('.workbook-hero');hero.scrollIntoView({behavior:'instant',block:'start'});playCoin();toast(saved?won(amount)+'원 차곡! 체험 저금이 완료됐어요.':'체험 저금은 완료됐지만 브라우저에 저장하지 못했어요.');};}
sheet.querySelector('.close').onclick=()=>sheet.close();sheet.addEventListener('click',e=>{if(e.target===sheet){const r=sheet.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)sheet.close();}});
window.addEventListener('hashchange',()=>{if(sheet.open)sheet.close();render();window.scrollTo(0,0);});
render();

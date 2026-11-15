'use strict';
const PHOTO_PICKUP_ORIGIN='https://moadowa-photo-pickup.esteemedaudio.chatgpt.site';
let activePhotoPickupCleanup=null;
function closePhotoPickup(){activePhotoPickupCleanup?.();activePhotoPickupCleanup=null;}
function photoKeyString(bytes){return btoa(String.fromCharCode(...bytes)).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');}
function photoRemaining(milliseconds){const seconds=Math.max(0,Math.ceil(milliseconds/1000));return String(Math.floor(seconds/60)).padStart(2,'0')+':'+String(seconds%60).padStart(2,'0');}
async function showPhotoPickup(file,host){
 closePhotoPickup();const controller=new AbortController();let interval,disposed=false,ticket=null;
 activePhotoPickupCleanup=()=>{disposed=true;controller.abort();clearInterval(interval);};
 host.hidden=false;host.innerHTML='<p class="photo-pickup-status" role="status">사진을 암호화하고 QR을 준비하고 있어요…</p>';
 const fail=message=>{if(disposed)return;host.innerHTML='';const status=document.createElement('p');status.className='photo-pickup-status';status.setAttribute('role','alert');status.textContent=message;host.append(status);};
 try{
  if(!crypto.subtle||typeof qrcode!=='function')throw new Error('unsupported');
  if(file.size>1750000)throw new Error('too_large');
  const raw=crypto.getRandomValues(new Uint8Array(32)),iv=crypto.getRandomValues(new Uint8Array(12)),key=await crypto.subtle.importKey('raw',raw,'AES-GCM',false,['encrypt']);
  const encrypted=new Uint8Array(await crypto.subtle.encrypt({name:'AES-GCM',iv},key,await file.arrayBuffer())),payload=new Uint8Array(12+encrypted.length);payload.set(iv);payload.set(encrypted,12);
  const ticketResponse=await fetch(PHOTO_PICKUP_ORIGIN+'/api/ticket',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({consent:true}),signal:controller.signal});
  if(!ticketResponse.ok)throw new Error(ticketResponse.status===429?'rate_limited':'offline');ticket=await ticketResponse.json();
  const response=await fetch(PHOTO_PICKUP_ORIGIN+'/api/photos/'+ticket.id,{method:'POST',headers:{'Content-Type':'application/octet-stream','Authorization':'Bearer '+ticket.uploadToken},body:payload,signal:controller.signal});
  if(!response.ok)throw new Error(response.status===413?'too_large':'offline');const result=await response.json();if(disposed)return;
  const pickup=new URL('receive.html',location.href);pickup.hash=ticket.id+'.'+photoKeyString(raw);
  const qr=qrcode(0,'M');qr.addData(pickup.href);qr.make();
  host.innerHTML='<h3>내 휴대폰으로 QR을 찍어주세요</h3><div class="photo-pickup-qr" role="img" aria-label="사진 받기 QR 코드">'+qr.createSvgTag({cellSize:6,margin:4,scalable:true})+'</div><p class="photo-pickup-expiry" role="status"></p><p>10분 안에 사진을 받아주세요.<br>링크는 10분 후 만료되고, 데이터는 자동 정리돼요.</p><button class="photo-pickup-copy" type="button">사진 받기 링크 복사</button>';
  const clockOffset=result.serverTime-Date.now(),expires=Number(result.expiresAt),counter=host.querySelector('.photo-pickup-expiry');
  const tick=()=>{const remaining=expires-(Date.now()+clockOffset);if(remaining<=0){clearInterval(interval);host.innerHTML='<p class="photo-pickup-status">QR이 만료됐어요. 다시 QR로 받기를 눌러주세요.</p>';return;}counter.textContent=photoRemaining(remaining)+' 남았어요';};tick();interval=setInterval(tick,1000);
  host.querySelector('.photo-pickup-copy').onclick=async e=>{try{await navigator.clipboard.writeText(pickup.href);e.currentTarget.textContent='링크를 복사했어요';}catch{e.currentTarget.textContent='QR을 휴대폰으로 스캔해주세요';}};
  host.scrollIntoView({behavior:'smooth',block:'nearest'});
 }catch(error){if(error?.name==='AbortError')return;fail(error.message==='too_large'?'사진 용량이 커서 QR로 전달하지 못했어요. AirDrop이나 이메일로 받아주세요.':error.message==='rate_limited'?'잠시 후 다시 시도해주세요. AirDrop이나 이메일로도 받을 수 있어요.':'QR을 준비하지 못했어요. 잠시 후 다시 시도하거나 AirDrop·이메일로 받아주세요.');}
}

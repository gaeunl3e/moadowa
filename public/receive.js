'use strict';
(async()=>{
 const status=document.getElementById('receive-status'),image=document.getElementById('receive-photo'),save=document.getElementById('receive-save'),open=document.getElementById('receive-open'),expiry=document.getElementById('receive-expiry'),help=document.querySelector('.receive-help');
 let url=null,timer;
 const expire=message=>{clearInterval(timer);if(url)URL.revokeObjectURL(url);url=null;image.removeAttribute('src');image.hidden=true;save.hidden=true;save.onclick=null;open.hidden=true;help.hidden=true;expiry.textContent='';status.textContent=message;};
 try{
  const fragment=location.hash.slice(1),match=fragment.match(/^([a-f0-9]{48})\.([A-Za-z0-9_-]{43})$/);if(!match)throw new Error('invalid');
  const response=await fetch('https://moadowa-photo-pickup.esteemedaudio.chatgpt.site/api/photos/'+match[1],{cache:'no-store'});
  if(response.status===410)throw new Error('expired');if(!response.ok)throw new Error('offline');
  const expiresAt=Number(response.headers.get('X-Photo-Expires')),serverTime=Number(response.headers.get('X-Server-Time')),offset=serverTime-Date.now();if(!expiresAt||!serverTime||expiresAt<=serverTime)throw new Error('expired');
  const bytes=new Uint8Array(await response.arrayBuffer()),raw=Uint8Array.from(atob(match[2].replace(/-/g,'+').replace(/_/g,'/')+'='),c=>c.charCodeAt(0));
  const key=await crypto.subtle.importKey('raw',raw,'AES-GCM',false,['decrypt']),plain=await crypto.subtle.decrypt({name:'AES-GCM',iv:bytes.slice(0,12)},key,bytes.slice(12));
  const file=new File([plain],'moadowa-photo.jpg',{type:'image/jpeg'});url=URL.createObjectURL(file);image.src=url;image.hidden=false;save.hidden=false;open.hidden=false;open.href=url;help.hidden=false;status.textContent='함께한 순간을 휴대폰에 담아주세요.';
  const tick=()=>{const seconds=Math.ceil((expiresAt-Date.now()-offset)/1000);if(seconds<=0){expire('사진 링크가 만료됐어요. 전시 화면에서 새 QR을 만들어주세요.');return;}expiry.textContent=String(Math.floor(seconds/60)).padStart(2,'0')+':'+String(seconds%60).padStart(2,'0')+' 안에 저장해주세요';};tick();timer=setInterval(tick,1000);
  save.onclick=async()=>{if(!url)return;try{if(navigator.canShare?.({files:[file]})&&navigator.share)await navigator.share({files:[file],title:'모아도와 사진'});else{const a=document.createElement('a');a.href=url;a.download=file.name;a.click();status.textContent='다운로드를 시작했어요. 다운로드 폴더를 확인해주세요.';}}catch(error){if(error.name!=='AbortError')status.textContent='사진을 길게 누르거나 ‘사진 크게 보기’에서 저장해주세요.';}};
 }catch(error){expire(error.message==='expired'?'사진 링크가 만료됐어요. 전시 화면에서 새 QR을 만들어주세요.':error.message==='invalid'?'사진 링크를 확인해주세요. 전시 화면의 QR을 다시 스캔할 수 있어요.':'사진을 불러오지 못했어요. 연결 상태를 확인한 뒤 다시 열어주세요.');}
 addEventListener('pagehide',()=>{clearInterval(timer);if(url)URL.revokeObjectURL(url);},{once:true});
})();

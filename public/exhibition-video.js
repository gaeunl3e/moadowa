'use strict';
// Load the exhibition film only when its invitation is shown.
let exhibitionVideoTimer;
const exhibitionVideoDialog=document.createElement('dialog');
exhibitionVideoDialog.className='exhibition-video';
exhibitionVideoDialog.setAttribute('aria-labelledby','exhibition-video-title');
document.body.append(exhibitionVideoDialog);
function scheduleExhibitionVideo(){clearTimeout(exhibitionVideoTimer);exhibitionVideoTimer=setTimeout(()=>{if(!document.hidden&&document.body.classList.contains('home-page')&&!document.querySelector('dialog[open]'))showExhibitionVideo();else scheduleExhibitionVideo();},50000);}
function showExhibitionVideo(){
 if(document.hidden||!document.body.classList.contains('home-page')||document.querySelector('dialog[open]'))return;
 clearTimeout(exhibitionVideoTimer);
 exhibitionVideoDialog.innerHTML='<button class="film-close" type="button" aria-label="영상 닫기">×</button><h2 id="exhibition-video-title" class="sr-only">모아도와 이야기 영상</h2><video playsinline muted preload="none" poster="assets/video/moadowa-story.jpg" aria-label="모아도와 이야기 영상"></video><div class="film-question"><p>계속 시청하시겠습니까?</p><div class="film-choices"><button class="film-yes" type="button">네</button><button class="film-no" type="button">아니요</button></div><span class="film-countdown" aria-hidden="true">5초 후 자동으로 닫혀요</span></div>';
 const video=exhibitionVideoDialog.querySelector('video'),question=exhibitionVideoDialog.querySelector('.film-question'),countdown=exhibitionVideoDialog.querySelector('.film-countdown');
 let tick,loadingTimer,decisionStarted=false,accepted=false;
 const close=()=>{if(exhibitionVideoDialog.open)exhibitionVideoDialog.close();};
 const cleanup=()=>{clearInterval(tick);clearTimeout(loadingTimer);video.pause();video.removeAttribute('src');video.load();exhibitionVideoDialog.removeEventListener('close',cleanup);exhibitionVideoDialog.removeEventListener('cancel',close);document.removeEventListener('visibilitychange',hidden);window.removeEventListener('hashchange',close);scheduleExhibitionVideo();};
 const hidden=()=>{if(document.hidden)close();};
 const startDecision=()=>{if(decisionStarted||accepted||!exhibitionVideoDialog.open)return;decisionStarted=true;const deadline=performance.now()+5000;tick=setInterval(()=>{const remaining=Math.ceil((deadline-performance.now())/1000);if(remaining<=0){close();return;}countdown.textContent=remaining+'초 후 자동으로 닫혀요';},100);};
 exhibitionVideoDialog.querySelector('.film-close').onclick=close;
 exhibitionVideoDialog.querySelector('.film-no').onclick=close;
 exhibitionVideoDialog.querySelector('.film-yes').onclick=()=>{accepted=true;clearInterval(tick);clearTimeout(loadingTimer);question.hidden=true;video.controls=true;video.muted=false;video.play().catch(()=>{video.controls=true;});};
 exhibitionVideoDialog.addEventListener('close',cleanup,{once:true});
 exhibitionVideoDialog.addEventListener('cancel',close);
 document.addEventListener('visibilitychange',hidden);window.addEventListener('hashchange',close);
 video.addEventListener('playing',startDecision,{once:true});video.addEventListener('ended',close,{once:true});video.addEventListener('error',close,{once:true});
 exhibitionVideoDialog.showModal();video.muted=true;video.src='assets/video/moadowa-story.mp4';
 loadingTimer=setTimeout(close,15000);
 video.addEventListener('loadeddata',()=>{clearTimeout(loadingTimer);video.play().catch(startDecision);},{once:true});video.load();
}
scheduleExhibitionVideo();

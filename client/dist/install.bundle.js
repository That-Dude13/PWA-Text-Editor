(()=>{const e=document.getElementById("buttonInstall");window.addEventListener("beforeinstallprompt",(t=>{window.deferredPrompt=t,e.classList.toggle("hidden")})),e.addEventListener("click",(async()=>{const t=window.deferredPrompt;t.prompt(),t.userChoice.then((t=>{"accepted"===t.outcome?console.log("User accepted the Add to Home Screen prompts"):console.log("User dismissed the Add to Home Screen prompts"),window.deferredPrompt=null,e.classList.toggle("hidden")}))})),window.addEventListener("appinstalled",(e=>{window.deferredPrompt=null}))})();
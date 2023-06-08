const butInstall = document.getElementById("buttonInstall");

window.addEventListener("beforeinstallprompt", (event) => {
  window.deferredPrompt = event;

  butInstall.classList.toggle("hidden");
});

butInstall.addEventListener("click", async () => {
  const promptEvent = window.deferredPrompt;
  promptEvent.prompt();
  promptEvent.userChoice.then((choiceResult) => {
    if (choiceResult.outcome === "accepted") {
      console.log("User accepted the Add to Home Screen prompts");
    } else {
      console.log("User dismissed the Add to Home Screen prompts");
    }
    window.deferredPrompt = null;
    butInstall.classList.toggle("hidden");
  });
});

window.addEventListener("appinstalled", (event) => {
  console.log("Appinstalled");
});

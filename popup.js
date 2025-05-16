document.addEventListener("DOMContentLoaded", async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    const url = new URL(tab.url);
  
    if (url.hostname.includes("youtube.com")) {
      const title = tab.title;
      const timecode = url.searchParams.get("t") || "00:00";
  
      document.getElementById("video-title").value = title;
      document.getElementById("timecode").value = timecode;
    } else {
      document.getElementById("video-title").value = tab.title;
      document.getElementById("timecode").value = "N/A";
      document.getElementById("use-timecode").disabled = true;
    }
  
    document.getElementById("save-btn").addEventListener("click", () => {
      const data = {
        title: document.getElementById("video-title").value,
        timecode: document.getElementById("use-timecode").checked
          ? document.getElementById("timecode").value
          : null,
        description: document.getElementById("description").value,
        topic: document.getElementById("topic").value,
        tags: document.getElementById("tags").value.split(",").map(tag => tag.trim()),
        rating: document.getElementById("rating").value,
        agree: document.getElementById("agree").value,
        url: tab.url
      };
  
      // Aqui você pode enviar os dados para sua API ou salvar localmente
      console.log("Dados de curadoria:", data);
      alert("Curadoria salva! (POC)");
    });
  });
  
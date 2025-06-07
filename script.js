document.addEventListener("contextmenu", function (e) {
  e.preventDefault();
  alert("Right-click is disabled to protect content.");
});

document.addEventListener("keydown", function (e) {
  if (
    (e.ctrlKey && ["s", "u", "c", "p"].includes(e.key.toLowerCase())) ||
    (e.ctrlKey && e.shiftKey && ["i", "j"].includes(e.key.toLowerCase())) ||
    e.key === "F12"
  ) {
    e.preventDefault();
    alert("Nah. This action is blocked to protect the content.");
  }
});

window.onbeforeprint = () => {
  alert("Printing is blocked!");
};

const pdfURL = "sai.nit (1).pdf";

const script = document.createElement("script");
script.src =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
script.onload = () => {
  const container = document.getElementById("pdf-viewer");

  pdfjsLib.GlobalWorkerOptions.workerSrc =
    "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
  pdfjsLib.getDocument(pdfURL).promise.then((pdf) => {
    for (let i = 1; i <= pdf.numPages; i++) {
      pdf.getPage(i).then((page) => {
        const viewport = page.getViewport({ scale: 1.5 });
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        container.appendChild(canvas);
        page.render({ canvasContext: context, viewport: viewport });
      });
    }
  });
};
document.body.appendChild(script);

"use-strict";

const videoSrc = document.getElementById("video-file");
const video = document.getElementById("video");
const loader = document.querySelector(".loader");
const alert = document.querySelector('.alert');

if (window.File && window.FileReader && window.FileList && window.Blob) {
  function setVideoSrc(e) {
    e.preventDefault();
    const file = e.target.files[0];
    const reader = new FileReader();

    // Chequear extensión de fichero
    const validFileExtensions = ['webm','mp4','ogv']
    const filePath = videoSrc.value;
    const extension = filePath.substring(filePath.lastIndexOf('.')+1).toLowerCase();
    
    if(validFileExtensions.indexOf(extension) <= -1) {
        alert.classList.remove('hidden');
        alert.textContent = 'Formato no soportado';
    } else {
        reader.onload = (e) => {
            alert.classList.add('hidden')
            const src = document.createAttribute("src");
            src.value = e.target.result;
            video.setAttributeNode(src);
            // Visualizar loader mientras el video se carga
            loader.classList.remove("hidden");
        };
    }

    reader.readAsDataURL(file);
  }

  video.addEventListener("canplaythrough", () => {
    loader.classList.add("hidden");
  });

  videoSrc.addEventListener("change", setVideoSrc, false);

} else {
  alert("File API no es soportada por este navegador");
}

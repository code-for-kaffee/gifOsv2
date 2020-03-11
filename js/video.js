const video = document.querySelector("video");

async function stopRecordingCallback() {
  video.srcObject = null;
  let blob = await recorder.getBlob();
  video.src = URL.createObjectURL(blob);
  recorder.stream.getTracks(t => t.stop());
  // reset recorder's state
  await recorder.reset();
  // clear the memory
  await recorder.destroy();
  // so that we can record again
  recorder = null;
}

let recorder; // globally accessible

document.getElementById("btn-start-recording").addEventListener("click", async function() {
  document.getElementById("video").classList.remove("hide");
  document.getElementById("text-box").classList.add("hide")
    this.disabled = true;
    let stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false
    });
    video.srcObject = stream;
    recorder = new RecordRTCPromisesHandler(stream, {
      type: "video",
      frameRate: 1,
      quality: 10,
      width: 360,
      hidden: 240
    });
    await recorder.startRecording();
    // helps releasing camera on stopRecording
    recorder.stream = stream;
    document.getElementById("btn-stop-recording").disabled = false;
    // if you want to access internal recorder
    const internalRecorder = await recorder.getInternalRecorder();
    console.log("internal-recorder", internalRecorder.name);
    // if you want to read recorder's state
    console.log("recorder state: ", await recorder.getState());
    document.getElementById("btn-stop-recording").addEventListener("click", async function() {
      document.getElementById("video").classList.add("hide");
        this.disabled = true;
        await recorder.stopRecording();
        stopRecordingCallback();
        document.getElementById("btn-start-recording").disabled = false;
      });
  });

  let all;
document.getElementById("dark-theme").addEventListener("click", function classToggle() {
  all = document.getElementsByTagName("*");
  for (let i = 0; i < all.length; i++) {
    all[i].classList.add("dark");
  }
  document.getElementById("logo").src = "/img/gifOF_logo_dark.png";
});
document.getElementById("light-theme").addEventListener("click", function classDelete() {
  all = document.getElementsByTagName("*");
  for (let i = 0; i < all.length; i++) {
    all[i].classList.remove("dark");
  }
  document.getElementById("logo").src = "/img/gifOF_logo.png";
});
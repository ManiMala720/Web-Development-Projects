const progressBar = document.querySelector(".progress-bar");
const badgeStatus = document.querySelector(".badge-status");

window.addEventListener('scroll',scrollProgress);

function scrollProgress(){
  //No of pixels scrolled vertically
  const scrollTop = window.scrollY;
  //Total Scrollable Height = Full page height - Visible height
  const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = Math.round((scrollTop/totalHeight) * 100);
  //Increase Progressbar width when user scrolls
  progressBar.style.width = progress + "%";
  badgeStatus.textContent = progress + "% read";
  if(progress>=100){
    badgeStatus.classList.add("complete");
    badgeStatus.textContent = "✔Complete";
  }
  else{
    badgeStatus.classList.remove("complete");
  }
}
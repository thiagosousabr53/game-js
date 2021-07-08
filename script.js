var ame = document.getElementById("ame");
var borda = document.getElementById("borda");

window.addEventListener("keydown", (e) => {
  var left = parseInt(window.getComputedStyle(ame).getPropertyValue("left"));
  if (e.key == "ArrowLeft" && left > 0) {
    ame.style.left = left - 10 + "px";
  }
  // 460 => largura da borda - ame largura 
  else if (e.key == "ArrowRight" && left <= 460) {
    ame.style.left = left + 10 + "px";
  }

  if (e.key == "ArrowUp" || e.keyCode == 32) {
    //32 é o espaço da tecla
    var laser = document.createElement("div");
    laser.classList.add("laser");
    borda.appendChild(laser);

    var movelaser = setInterval(() => {
      var inimigos = document.getElementsByClassName("inimigos");

      for (var i = 0; i < inimigos.length; i++) {
        var inimigo = inimigos[i];
        if (inimigo != undefined) {
          var inimigobound = inimigo.getBoundingClientRect();
          var laserbound = laser.getBoundingClientRect();

          // Condição para verificar se o inimigo  e a bala estão na mesma posição.!
          // Se sim, então temos que destruir aquele inimigo

          if (
            laserbound.left >= inimigobound.left &&
            laserbound.right <= inimigobound.right &&
            laserbound.top <= inimigobound.top &&
            laserbound.bottom <= inimigobound.bottom
          ) {
            inimigo.parentElement.removeChild(inimigo); /// Apenas removendo aquele inimigo em particular;
            //placar com pontos
            document.getElementById("points").innerHTML =
              parseInt(document.getElementById("points").innerHTML) + 1;
          }
        }
      }
      var laserbottom = parseInt(
        window.getComputedStyle(laser).getPropertyValue("bottom")
      );

      //para o movimento do laser fora do jogo 
      if (laserbottom >= 500) {
        clearInterval(movelaser);
      }

      laser.style.left = left + "px"; //o laser deve sempre ser colocada no topo da ame
      laser.style.bottom = laserbottom + 3 + "px";
    });
  }
});

var gerarInimigos = setInterval(() => {
  var inimigo = document.createElement("div");
  inimigo.classList.add("inimigos");
  //apenas pegando a esquerda do inimigo para colocá-la em uma posição aleatória
  var inimigoleft = parseInt(
    window.getComputedStyle(inimigo).getPropertyValue("left")
  );
  // gera valores entre 0 e 450 onde 450 => largura da borda

  inimigo.style.left = Math.floor(Math.random() * 450) + "px";

  borda.appendChild(inimigo);
}, 1000);

var moveinimigos = setInterval(() => {
  var inimigos = document.getElementsByClassName("inimigos");

  if (inimigos != undefined) {
    for (var i = 0; i < inimigos.length; i++) {
      // agora eu tenho que aumentar o topo de cada inimigo, para que os inimigos possam se mover para baixo
      var inimigo = inimigos[i]; // obtendo cada inimigo
      var inimigotop = parseInt(
        window.getComputedStyle(inimigo).getPropertyValue("top")
      );
      //475 => boardheight - rockheight + 25
      if (inimigotop >= 475) {
        alert("Game Over");
        clearInterval(moveinimigos);
        window.location.reload();
      }

      inimigo.style.top = inimigotop + 25 + "px";
    }
  }
}, 450);
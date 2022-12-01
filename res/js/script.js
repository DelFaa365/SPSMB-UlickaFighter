const button = document.getElementsByTagName("button");
const section = document.getElementsByTagName("section");
const checkboxes = document.getElementsByTagName("checkbox");
const boxes = document.getElementsByClassName("boxes");
const actionRight = document.getElementById("action-right");
const actionLight = document.getElementById("action-left");
const story = document.getElementById("storyTime");

let enemyAttack;
let player = false;

const savePlayer = () => {
  localStorage.setItem("savePlayer", JSON.stringify(player));
}

const deletePlayer = () => {
localStorage.removeItem("savePlayer");
}

const loadPlayer = () => {
  data = JSON.parse(localStorage.getItem("savePlayer"));
  return data;
}

const Init = () => {
  player = loadPlayer();

  if(!player){
      player = {
          location: false,
          isNew: true,
          dmg: 5,
          cash: 0,
          hp: 10,
          hpMultiple: 1,
          protein: false, 
          tren: false,
          upgrades: {}, 
          charactersOwned: {},
          characterEquiped: 0,
          options: {
            music__option: true,
            save__option: true
          }
      }
  }
}

let aText = new Array(
  "Vítej,",
  "Tato hra je čistá píčovina a prostě nevim proč jsem to actually dělal",
  "A tak prostě je to tak"
);
let iSpeed = 100; 
let iIndex = 0; 
let iArrLength = aText[0].length;

let iTextPos = 0; 
let sContents = ""; 
let iRow;

function typewriter() {
  sContents = " ";
  iRow = Math.max(0, iIndex - 20);
  var destination = document.getElementById("storyTime__text");

  while (iRow < iIndex) {
    sContents += aText[iRow++] + "<br />";
  }
  destination.innerHTML =
    sContents + aText[iIndex].substring(0, iTextPos) + "_";
  if (iTextPos++ == iArrLength) {
    iTextPos = 0;
    iIndex++;
    if (iIndex != aText.length) {
      iArrLength = aText[iIndex].length;
      setTimeout("typewriter()", 500);
    }
  } else {
    setTimeout("typewriter()", iSpeed);
  }
}

[...button].forEach((element) => {
  if (element.id == "game_menu") {

    element.onclick = () => {
        if (player.isNew != true) {
          let index = element.dataset.index;
          [...boxes].forEach((element) => {
              console.log(index + " " + element.dataset.index)
            if (element.dataset.index == index) {
              if (element.style.display == "block") {
                element.style.display = "none";
              } else {
                element.style.display = "block";
              }
            } else {
              element.style.display = "none";
            }
          });
        }
      };
  } else if(element.id == "main_menu" || element.id == "action-left" || element.id == "action-right") {
    element.onclick = () => {
        if (player.isNew != true) {
          let index = element.dataset.index;
          [...section].forEach((element) => {
            element.style.display = "none";
            if (element.dataset.index == index) {
              element.style.display = "block";
              player.location = element.dataset.index
            }
          });
          if(element.dataset.index == "goOut"){
            spawnEnemy();
            console.log("spawnuju");
            }else {
              clearInterval(enemyAttack);
            }
        } else {
          [...section].forEach((element) => {
            if (element.dataset.index == "start_game") {
              story.style.display = "block";
              typewriter();
              setTimeout(() => {
                story.style.display = "none";
                element.style.display = "block";
                player.isNew = false;
              }, 15000);
            }
          });
        }
      };
  } else if("main_menu_new"){
    element.onclick = () => {
        [...section].forEach((element) => {
          if (element.dataset.index == "start_game") {
            story.style.display = "block";
            typewriter();
            deletePlayer();
            Init();
            setTimeout(() => {
              story.style.display = "none";
              element.style.display = "block";
              
              player.isNew = false;
            }, 15000);
          }
        });
    };
  }
});

[...checkboxes].forEach((element) => {
    let indexing = element;
    player.options.forEach(element =>{
      console.log(indexing + " " + element)
      if(element == indexing.id){
        element = indexing.checked;
        console.log(indexing.checked)
      }
    })
})

let arrow = document.getElementById("arrow");
const onMouseMove = (e) => {
  arrow.style.left = e.pageX + "px";
  arrow.style.top = e.pageY + "px";
};
document.addEventListener("mousemove", onMouseMove);

const showArrow = (boolean) => {
  if (arrow.style.display == "block") {
    arrow.style.display = "none";
  } else {
    arrow.style.display = "block";
  }
  console.log(boolean);
};

const changeDeg = () => {
  arrow.addClass(".right");
};

actionRight.addEventListener("mouseover", function () {
  showArrow(true);
});
actionLight.addEventListener("mouseover", function () {
  showArrow(false);
});
actionRight.addEventListener("mouseout", function () {
  showArrow(true);
});
actionLight.addEventListener("mouseout", function () {
  showArrow(false);
});


window.addEventListener("load", Init);


const enemyBox = document.getElementById("enemy");
const attackBtn = document.getElementById("attack");
const spawnEnemy = () => {
    let enemies = [
        [{
            hp: 20*player.hpMultiple,
            name: "Ulrych",
            dmg: 1,
            img: "/res/imgs/characters/zatimneco.png"
        }],
        [{
            hp: 20*player.hpMultiple,
            name: "Evinátor",
            dmg: 1,
            img: "/res/imgs/characters/zatimneco.png"
        }],
        [{
            hp: 150*player.hpMultiple,
            name: "Štepíča",
            dmg: 1,
            img: "/res/imgs/characters/zatimneco.png"
        }],
        [{
            hp: 150*player.hpMultiple,
            name: "Velkej Negr",
            dmg: 1,
            img: "/res/imgs/characters/zatimneco.png"
        }],
        [{
            hp: 150*player.hpMultiple,
            name: "Mistr Alkoholik",
            dmg: 1,
            img: "/res/imgs/characters/zatimneco.png"
        }],
        [{
            hp: 150*player.hpMultiple,
            name: "Majstr Hudyny",
            dmg: 1,
            img: "/res/imgs/characters/zatimneco.png"
        }],
        [{
            hp: 150*player.hpMultiple,
            name: "Majstr Hojnej",
            dmg: 1,
            img: "/res/imgs/characters/zatimneco.png"
        }]
    ];

    let avaliableEnemies = 0;

    enemies.forEach((element) => {
        [...element].forEach(element => {
            if(player.hp+30 >= element.hp){
                avaliableEnemies++;
            }
        });
    });

    let random = Math.floor(Math.random() * avaliableEnemies);

    enemies.forEach((element, index) => {
        [...element].forEach(element => {
            if(random == index){
              
                enemyBox.style.backgroundImage = "url(" + element.img + ")";
                enemyBox.innerHTML = element.name;
                  attackBtn.onclick = () => {
                    if(element.hp <= 0){
                      spawnEnemy();
                      playerWins();
                      console.log("spawnuju nový")
                      return
                    } else if(player.hp == 0 && element.hp > 0){
                      console.log("Hráč umřel")
                      return
                    }
                    element.hp -= player.dmg;
                    console.log("Já dáávm damage" + element.hp)
                  }

                  if(player.location == "goOut"){
                    enemyAttack = setInterval(() => {
                      if(element.hp <= 0){
                        return
                      } else if(player.hp == 0 && element.hp > 0){
                        console.log("Hráč umřel")
                        return
                      } else {
                        player.hp -= element.dmg;
                        console.log("Dávám damage" + player.hp);
                      }
                    }, 2000);
                  }
            }
        });
    });



}

const playerWins = () => {
  player.hpMultiple += 0.4;
  console.log(player.hp + " " + player.hpMultiple);
}




let save = setInterval(() => {
    savePlayer();
    console.log("ukládám")
}, 5000);






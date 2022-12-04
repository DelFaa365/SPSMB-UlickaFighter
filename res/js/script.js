const button = document.getElementsByTagName("button");
const section = document.getElementsByTagName("section");
const checkboxes = document.getElementsByTagName("checkbox");
const boxes = document.getElementsByClassName("boxes");
const actionRight = document.getElementsByClassName("action-right");
const actionLight = document.getElementsByClassName("action-left");
const story = document.getElementById("storyTime");
const postava = document.getElementsByClassName("postava");

mainaudio = new Audio('/res/sounds/main.mp3');
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
          maxHp: 10,
          hpMultiple: 1,
          upgrades: {}, 
          charactersOwned: {},
          characterEquiped: "/res/imgs/characters/zatimneco.png",
          options: {
            music__option: true,
            save__option: true
          }
      }
  }
  setHealthBar(true, player.maxHp);
  [...postava].forEach(element => {
    element.style.backgroundImage = "url(" + player.characterEquiped + ")";
  });
  mainaudio.play();
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
            if(element.id == "main_menu"){
              mainaudio.play();
            } else {
              mainaudio.pause();
            }
          });
          if(element.dataset.index == "goOut"){
            spawnEnemy();
            changeHealthBar(true, player.hp);
            console.log("spawnuju");
            }else {
              clearInterval(enemyAttack);
            }
        }
      };
  } else if(element.id == "main_menu_new"){
    element.onclick = () => {
        [...section].forEach((element) => {
          element.style.display = "none";
          typewriter();
          deletePlayer();
          Init();
          if (element.dataset.index == "start_game") {
            story.style.display = "block";
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

let arrow = document.getElementsByClassName("arrow");
const onMouseMove = (e) => {
  [...arrow].forEach(element => {
    element.style.left = e.pageX + "px";
    element.style.top = e.pageY + "px";
  });
};
document.addEventListener("mousemove", onMouseMove);

const showArrow = (boolean) => {
  [...arrow].forEach(element => {
    if (element.style.display == "block") {
      element.style.display = "none";
    } else {
      element.style.display = "block";
      if(boolean){
        element.style.transform ="rotate(180deg)";
      } else {
          element.style.transform ="rotate(0)";
      }
    }
  })
};


[...actionLight].forEach(element => {
  element.addEventListener("mouseover", function () {
    showArrow(false);
  });
  element.addEventListener("mouseout", function () {
    showArrow(false);
  });
});

[...actionRight].forEach(element => {
  element.addEventListener("mouseover", function () {
    showArrow(true);
  });
  element.addEventListener("mouseout", function () {
    showArrow(true);
  });
});

window.addEventListener("load", Init);


const enemyBox = document.getElementById("enemy");
const attackBtn = document.getElementById("attack");;
const spawnEnemy = () => {
    let enemies = [
        [{
            hp: 20*player.hpMultiple,
            name: "Ulrych",
            dmg: 1,
            img: "/res/imgs/characters/ulrychEnemy.png"
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
                element.hp = Math.floor(element.hp);
                enemyBox.style.backgroundImage = "url(" + element.img + ")";
                setHealthBar(false, element.hp)
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
                    changeHealthBar(false, element.hp);
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
                        changeHealthBar(true, player.hp);
                        console.log("Dávám damage" + player.hp);
                      }
                    }, 2000);
                  }
            }
        });
    });
}

const setHealthBar = (player, maxHp) => {
  if(player){
    document.getElementById("healthPlayer").value = maxHp;
    document.getElementById("healthPlayer").max = maxHp;
  } else {
    document.getElementById("healthEnemy").value = maxHp;
    document.getElementById("healthEnemy").max = maxHp;
  }
}

const changeHealthBar = (player, hp) => {
  if(player){
    document.getElementById("healthPlayer").value = hp;
  } else {
    document.getElementById("healthEnemy").value = hp;
  }
}


const playerWins = () => {
  player.hpMultiple += 0.4;
}


let save = setInterval(() => {
    savePlayer();
    console.log("ukládám")
}, 5000);






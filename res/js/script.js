const button = document.getElementsByTagName("button");
const section = document.getElementsByTagName("section");
const checkboxes = document.getElementsByTagName("checkbox");
const boxes = document.getElementsByClassName("boxes");
const actionRight = document.getElementsByClassName("action-right");
const actionDown = document.getElementsByClassName("action-down");
const actionLight = document.getElementsByClassName("action-left");
const story = document.getElementById("storyTime");
const postava = document.getElementsByClassName("postava");


let debugBoolean = true;
const debug = (text) => {
  if (debugBoolean) {
    console.log(text)
  }
}

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

const init = () => {
  player = loadPlayer();

  if (!player) {
    player = {
      location: false,
      isNew: true,
      dmg: 5,
      cash: 0,
      hp: 10,
      maxHp: 10,
      hpMultiple: 1,
      upgrades: [{
        name: "",
        ability: "",
      }],
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
          debug(index + " " + element.dataset.index)
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
  } else if (element.id == "main_menu" || element.id == "action-left" || element.id == "action-right" || element.id == "action-down") {
    element.onclick = () => {
      if (player.isNew != true) {
        let index = element.dataset.index;
        [...section].forEach((element) => {
          element.style.display = "none";
          if (element.dataset.index == index) {
            element.style.display = "block";
            player.location = element.dataset.index
          }
          if (element.id == "main_menu") {
            mainaudio.play();
          } else {
            mainaudio.pause();
          }
        });
        if (element.dataset.index == "goOut") {
          spawnEnemy();
          playerDead(false);
          changeHealthBar(true, player.hp);
          debug("spawnuju");
        } else {
          clearInterval(enemyAttack);
        }
      }
    };
  } else if (element.id == "main_menu_new") {
    element.onclick = () => {
      [...section].forEach((element) => {
        element.style.display = "none";
        typewriter();
        deletePlayer();
        init();
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
  } else if(element.id == "buy"){
    element.onclick = () => {
        buyUpgrade(element.dataset.index);
        debug("přidávám")
      }
  }
});

[...checkboxes].forEach((element) => {
  let indexing = element;
  player.options.forEach(element => {
    debug(indexing + " " + element)
    if (element == indexing.id) {
      element = indexing.checked;
      debug(indexing.checked)
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
      if (boolean == 1) {
        element.style.transform = "rotate(180deg)";
      } else if (boolean == 2) {
        element.style.transform = "rotate(0)";
      } else {
        element.style.transform = "rotate(270deg)";
        debug("otacim neco?")
      }
    }
  })
};


[...actionLight].forEach(element => {
  element.addEventListener("mouseover", function () {
    showArrow(2);
  });
  element.addEventListener("mouseout", function () {
    showArrow(2);
  });
});

[...actionRight].forEach(element => {
  element.addEventListener("mouseover", function () {
    showArrow(1);
  });
  element.addEventListener("mouseout", function () {
    showArrow(1);
  });
});

[...actionDown].forEach(element => {
  element.addEventListener("mouseover", function () {
    showArrow(3);
  });
  element.addEventListener("mouseout", function () {
    showArrow(3);
  });
});

window.addEventListener("load", init);


const enemyBox = document.getElementById("enemy");
const attackBtn = document.getElementById("attack");;
const spawnEnemy = () => {
  let enemies = [
    [{
      hp: 20,
      name: "Ulrych",
      dmg: 1,
      img: "/res/imgs/characters/ulrychEnemy.png",
      attackSpeed: 750
    }],
    [{
      hp: 20,
      name: "Evinátor",
      dmg: 1,
      img: "/res/imgs/characters/eva.png",
      attackSpeed: 1000
    }],
    [{
      hp: 20,
      name: "Erbi",
      dmg: 1,
      img: "/res/imgs/characters/erbi.png",
      attackSpeed: 1000
    }],
    [{
      hp: 150,
      name: "Štepíča",
      dmg: 1,
      img: "/res/imgs/characters/zatimneco.png",
      attackSpeed: 1000
    }],
    [{
      hp: 150,
      name: "Velkej Negr",
      dmg: 1,
      img: "/res/imgs/characters/zatimneco.png",
      attackSpeed: 1000
    }],
    [{
      hp: 150,
      name: "Mistr Alkoholik",
      dmg: 1,
      img: "/res/imgs/characters/zatimneco.png",
      attackSpeed: 1000
    }],
    [{
      hp: 150,
      name: "Majstr Hudyny",
      dmg: 1,
      img: "/res/imgs/characters/zatimneco.png",
      attackSpeed: 1000
    }],
    [{
      hp: 150,
      name: "Majstr Hojnej",
      dmg: 1,
      img: "/res/imgs/characters/zatimneco.png",
      attackSpeed: 1000
    }]
  ];

  let avaliableEnemies = 0;
  enemies.forEach((element) => {
    [...element].forEach(element => {
      if (player.hp + 30 >= element.hp) {
        avaliableEnemies++;
      }
    });
  });

  let random = Math.floor(Math.random() * avaliableEnemies);

  enemies.forEach((element, index) => {
    [...element].forEach(element => {
      if (random == index) {
        element.hp = Math.floor(element.hp);
        enemyBox.style.backgroundImage = "url(" + element.img + ")";
        setHealthBar(false, element.hp)
        attackBtn.onclick = () => {
          if (element.hp <= 0) {
            spawnEnemy();
            playerDead(false);
            playerWins();
            debug("spawnuju nový")
            return
          } else if (player.hp == 0 && element.hp > 0) {
            playerDead(true);
            debug("Hráč umřel")
            return
          }
          element.hp -= player.dmg;
          changeHealthBar(false, element.hp);
          debug("Já dáávm damage" + element.hp);
          [...postava].forEach(element => {
            element.style.left = "15%";
            setTimeout(() => {
              element.style.left = "8%";
            }, 500);
          });
        }

        if (player.location == "goOut") {
          enemyAttack = setInterval(() => {
            if (element.hp <= 0) {
              return
            } else if (player.hp == 0 && element.hp > 0) {
              debug("Hráč umřel")
              return
            } else {
              player.hp -= element.dmg;
              changeHealthBar(true, player.hp);
              debug("Dávám damage" + player.hp);
            }
          }, element.attackSpeed);
        }
      }
    });
  });
}

const setHealthBar = (player, maxHp) => {
  if (player) {
    document.getElementById("healthPlayer").value = maxHp;
    document.getElementById("healthPlayer").max = maxHp;
  } else {
    document.getElementById("healthEnemy").value = maxHp;
    document.getElementById("healthEnemy").max = maxHp;
  }
}

const changeHealthBar = (player, hp) => {
  if (player) {
    document.getElementById("healthPlayer").value = hp;
  } else {
    document.getElementById("healthEnemy").value = hp;
  }
}

const endText = document.getElementById("endText");

const playerWins = () => {
  player.hpMultiple += 0.4;
  player.cash += 10;
  attackBtn.style.display = "none";
  endText.style.display = "block"
  endText.innerText = "Winner"
  setTimeout(() => {
    attackBtn.style.display = "block";
    endText.style.display = "none"
  }, 400);

}

const playerDead = (dead) => {
  if (dead) {
    attackBtn.style.display = "none";
    endText.style.display = "block"
    endText.innerText = "Died"
  } else {
    attackBtn.style.display = "block";
    endText.style.display = "none"
  }
}


let save = setInterval(() => {
  savePlayer();
  debug("ukládám")
}, 5000);

const gymBtn = document.getElementById("gymBtn");
const gymProgBar = document.getElementById("gymProgBar");
let gymActive = false;
let gymProg

const refreshGym = () => {
  gymActive = false;
  gymBtn.onclick = () => {
    if (gymActive == false) {
      startGym();
    }
  }
}

refreshGym();

const startGym = () => {
  gymActive = true;
  gymProg = 0;
  gymProgBar.value = gymProg;
  gymProgBar.max = 1000;
  debug("startnul jsem");
  gymBtn.onclick = () => {
    if (gymActive == true) {
      gymProg += player.dmg * player.hpMultiple;
      gymProgBar.value = gymProg;
      debug("ubírám?");
      if (gymProg >= gymProgBar.max) {
        refreshGym();
        gymProg = 0;
        clearInterval(gymInt);
        return;
      }
    }
  }
  gymInt = setInterval(() => {
    if (gymProg >= 0) {
      gymProg -= player.dmg * player.hpMultiple;
      gymProgBar.value = gymProg;
      debug("dávám dolu?")
    }
  }, 200);
}

let upgrades = [
  [{
    index: "velo",
    name: "Velo",
    subtitle: "Velos pod peros",
    text: "Zvýší tvojí aktivitu v gymu, ale pozor může se z tebe stát dealer nikotinových sáčků",
    img: "https://www.vaporism.cz/picture/62b0c852ef405/w960/velo-arctic-frost-max-strong-20mg.png",
  }],
  [{
    index: "elfbar",
    name: "Elf Bar",
    subtitle: "Čistý dým na tvé plíce",
    text: "Zvýší tvojí aktivitu v gymu",
    img: "https://phoenixeliquid.co.uk/wp-content/uploads/2022/01/elf-bar-family.png",
  }],
  [{
    index: "protein",
    name: "Protein",
    subtitle: "Nikdy neuškodí",
    text: "Zvýší násobič v gymu",
    img: "/res/imgs/characters/ulrychEnemy.png",
  }],
  [{
    index: "kreatin",
    name: "Kreatin",
    subtitle: "Základ, čistej základ",
    text: "Zvýší rychlost používání náčiní v gymu",
    img: "https://www.dafit.cz/userfiles/26b966d6-0237-4fb0-a78c-090711fb0d89.png",
  }],
  [{
    index: "zvaro",
    name: "Žváro",
    subtitle: "Žváro od majsnera",
    text: "Rychlejší regenrace hp",
    img: "https://pngimg.com/uploads/cigarette/cigarette_PNG4755.png",
  }],
];

const initUpgrades = () => {
  upgrades.forEach((element, index) => {
    [...element].forEach(element => {
      const card = document.createElement("div");
      const card_body = document.createElement("div");
      const img = document.createElement("img");
      const card_title = document.createElement("h5");
      const card_subtitle = document.createElement("h6");
      const card_text = document.createElement("p");
      const button = document.createElement("button");

      card.classList.add("card");
      card_body.classList.add("card-body");
      img.classList.add("card-img-top");
      card_title.classList.add("card-title");
      card_subtitle.classList.add("card-subtitle");
      card_text.classList.add("card-text");
      button.dataset.index = element.index;
      button.id = "buy";
      button.innerText = "Koupit";

      img.src = element.img;
      card_title.innerText = element.name;
      card_subtitle.innerText = element.subtitle;
      card_text.innerText = element.text;


      card.append(card_body);
      card.append(button);
      card_body.append(img);
      card_body.append(card_title);
      card_body.append(card_subtitle);
      card_body.append(card_text);
      document.getElementById("upgrades").append(card)

    });
  });
}

initUpgrades();


const buyUpgrade = (id) => {
  player.upgrades.push(id);
  debug("kupujuuuu")
}


const fetchUpgrades = () => {

}





const button = document.getElementsByTagName("button");
const section = document.getElementsByTagName("section");
const boxes = document.getElementsByClassName("boxes");
const actionRight = document.getElementById("action-right");
const actionLight = document.getElementById("action-left");
const story = document.getElementById("storyTime");


let player = false;

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
            }
          });
          if(element.dataset.index == "goOut"){
            spawnEnemy();
            console.log("spawnuju");
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
  }
});

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

const savePlayer = () => {
    localStorage.setItem("savePlayer", JSON.stringify(player));
}

const loadPlayer = () => {
    data = JSON.parse(localStorage.getItem("savePlayer"));
    return data;
}

const Init = () => {
    player = loadPlayer();

    if(!player){
        player = {
            isNew: true,
            hp: 10,
            dmg: 5,
            cash: 0,
            hpMultiple: 1,
            protein: false, 
            tren: false,
            upgrades: {}, 
            charactersOwned: {},
            characterEquiped: 0,
        }
    }
}

window.addEventListener("load", Init);


const enemyBox = document.getElementById("enemy");

const spawnEnemy = () => {
    let enemies = [
        [{
            hp: 20*player.hpMultiple,
            name: "Ulrych",
            img: "/res/imgs/characters/zatimneco.png"
        }],
        [{
            hp: 150*player.hpMultiple,
            name: "Evinátor",
            img: "/res/imgs/characters/zatimneco.png"
        }],
        [{
            hp: 150*player.hpMultiple,
            name: "Štepíča",
            img: "/res/imgs/characters/zatimneco.png"
        }],
        [{
            hp: 150*player.hpMultiple,
            name: "Velkej Negr",
            img: "/res/imgs/characters/zatimneco.png"
        }],
        [{
            hp: 150*player.hpMultiple,
            name: "Mistr Alkoholik",
            img: "/res/imgs/characters/zatimneco.png"
        }],
        [{
            hp: 150*player.hpMultiple,
            name: "Majstr Hudyny",
            img: "/res/imgs/characters/zatimneco.png"
        }],
        [{
            hp: 150*player.hpMultiple,
            name: "Majstr Hojnej",
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

    enemies.forEach((element, index) => {
        [...element].forEach(element => {
            let random = Math.floor(Math.random() * avaliableEnemies);
            console.log(avaliableEnemies);
            console.log(random + " " + index);
            if(random == index){
                enemyBox.style.backgroundImage = "url(" + element.img + ")";
                enemyBox.innerHTML = element.name;
            }
        });
    });


}
const attackBtn = document.getElementById("attack");

attackBtn.onclick = () => {
    // doděláme 
}





let save = setInterval(() => {
    savePlayer();
    console.log("ukládám")
}, 5000);






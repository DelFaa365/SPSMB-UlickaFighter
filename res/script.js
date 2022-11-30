const button = document.getElementsByTagName("button");
const section = document.getElementsByTagName("section");
const boxes = document.getElementsByClassName("boxes");
const actionRight = document.getElementById("action-right");
const actionLight = document.getElementById("action-left");


[...button].forEach(element => {
    if(element.id == "main_menu") {
        element.onclick = () =>{
            let index = element.dataset.index;
            [...section].forEach(element => {
                element.style.display = "none";
                if(element.dataset.index == index){
                    element.style.display = "block";
                }
    
    
            });
        } 
    } else if(element.id == "game_menu") {
        element.onclick = () =>{
            let index = element.dataset.index;
            [...boxes].forEach(element => {
                if(element.dataset.index == index){
                    if(element.style.display == "block"){
                        element.style.display = "none";
                    } else {
                        element.style.display = "block";
                    } 
                } else {
                    element.style.display = "none";
                }
    
    
            });
        } 
    }
});


let arrow = document.getElementById('arrow');
const onMouseMove = (e) =>{
    arrow.style.left = e.pageX + 'px';
    arrow.style.top = e.pageY + 'px';
}
document.addEventListener('mousemove', onMouseMove);

const showArrow = (boolean) => {
    if(arrow.style.display == "block"){
        arrow.style.display = "none";
        if(boolean){
            arrow.style.transform = "rotate(180deg)"
        }
    } else {
        arrow.style.display = "block"
        if(boolean){
            arrow.style.transform = "rotate(180deg)"
        }
    }
}

const changeDeg = () => {
    arrow.addClass(".right")
}

actionRight.addEventListener("mouseover", showArrow(true));
actionLight.addEventListener("mouseover", showArrow);
actionRight.addEventListener("mouseout", showArrow(true));
actionLight.addEventListener("mouseout", showArrow);
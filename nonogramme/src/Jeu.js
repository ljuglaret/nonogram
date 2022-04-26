import React from "react";
import "./App.css";
const dimension = 4;
const indications = [[1,2],[0],[3,2],[2],[2],[3,2],[1,2],[1]]
const caseInitiale = {color:"white", click : false};
const grille = []
export default function Jeu()  {

  function genererTableau(){
    for (let i = 0 ; i < dimension ; i++){
      let ligne = []
      for (let j = 0 ; j < dimension ; j++){
        ligne[j]=caseInitiale
      }
      grille[i] = ligne[i]
    }
  }
  genererTableau()
  
  //const [cls, setCls] = useState("green");

  //change boutonPrincipal
   /* function changeColor(){
    setCls((cls) => 
      (cls === "red" ? "green" : "red")
      )
    }*/

  function changeColor(){
    const btn = document.getElementsByClassName("btn")[0];
    if (btn.className === "btn btn-red"){
      btn.className = "btn btn-green";
    }
    else{
      btn.className = "btn btn-red";
    }
  }
  

  function changeState(i,j){
    const btn = document.getElementsByClassName("btn")[0];
    const caseNumCase = document.getElementById("case"+(i*dimension+j))
    const newColorClassName = "gridCell gridCell-"+btn.className.split(" ")[1].split("-")[1]; 
    caseNumCase.className = newColorClassName
    caseNumCase.disabled = true;//
    grille[i-1][j-1] ={color:btn.className,click:true}
    console.log(grille);
  }

/**
 * 
  {<button id =  {"case" +0} className= "white" onClick={()=>changeState(0)}> case 0</button>
        <button id =  {"case" +1} className= "white" onClick={()=>changeState(1)}> case 1</button>
    } dimension 
 */
  function defBtnCase(btnCase,i,j){
    if (i===0 && j === 0) {
      btnCase.id = "vide"

    }
    else if (i === 0){
      btnCase.id = "indications"
      btnCase.disabled = true
      btnCase.innerText = indications[j-1]
    }
    else if (j === 0){
      btnCase.id = "indications"
      btnCase.disabled = true
      btnCase.innerText = indications[4+ (i-1)]
    }
    else{
      btnCase.id = "case" + (i*dimension+j);
      btnCase.className = "gridCell gridCell-white";
      btnCase.onclick = () => {changeState(i,j);}
    }
  }

  function defBtnChoix(buttonChoix){
    buttonChoix.className = "btn btn-green"
    buttonChoix.onclick = () => {changeColor();}
  }
  function genereGrille(){
    
    var app = document.getElementsByClassName("App")[0]
    var buttonChoix = document.createElement("button")
    var grilleHTML = document.createElement("div")
    grilleHTML.id = "grilleHTML"
    app.parentNode.insertBefore(grilleHTML,app.nextSibling)
    for (let i = 0 ; i <= dimension ; i++){
   
      var ligne = document.createElement("div");
      grilleHTML.insertBefore(ligne,grilleHTML.nextSibling);
    
      for (let j = 0 ; j <= dimension ; j++){
        var btnCase = document.createElement("button");

        defBtnCase(btnCase,i,j)
        ligne.insertBefore(btnCase,ligne.nextSibling)
        
        
      }
    }
    defBtnChoix(buttonChoix)
    app.parentNode.insertBefore(buttonChoix,app.nextSibling)
  }

  return (
    <>
        <button onClick={() => genereGrille()}>Commencer partie</button>
    </>
  )
}

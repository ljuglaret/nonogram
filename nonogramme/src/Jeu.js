import React from "react";
import "./App.css";
const dimension = 4;
//attention , il s'agit d'un exemple de présentation, 
//il peut y avoir des incohérences
const indications = [[1,2],[0],[3,2],[2],[2],[1,2],[0],[1]]
const caseInitiale = {color:"white", click : false};
const grille = []
const grilleAttendue = []

export default function Jeu()  {

  function genereGrille(){
    genereationAlea()
    for (let i = 0 ; i < dimension ; i++){
      let ligne = []
      for (let j = 0 ; j < dimension ; j++){
        ligne[j]=caseInitiale
      }
      grille[i] = ligne
    }
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

  function genereationAlea(){
       //remplis aleatoirement une grille
       const colors = ["btn btn-gray","btn btn-green"]
       for (let i = 0 ; i < dimension ; i++){
         const ligneAlea = []
         for (let j = 0 ; j < dimension ; j ++){ 
          const caseAleatoire = {color:colors[Math.floor(Math.random() * 2)], click : true};  
           ligneAlea[j] =  caseAleatoire
           }
         grilleAttendue[i] = ligneAlea
       }
  }
  function correction(){
 
//compte les cases grisées sur la grille attendue
    for (let i = 0 ; i < grilleAttendue.length ; i++){
      //let comptelignei = 0;
      for (let j = 0 ; j < grilleAttendue.length ; j ++){
        
        //indications[]
    }
  }
 

  for (let i = 0 ; i < grilleAttendue.length ; i++){
     for (let j = 0 ; j < grilleAttendue.length ; j ++){
     if(grille[i][j].color !== grilleAttendue[i][j].color){
       console.log("erreur en " + i +"-"+ j)
     }
   }
 }
}

  function changeColor(){
    const btn = document.getElementsByClassName("btn")[0];
    if (btn.className === "btn btn-gray"){
      btn.className = "btn btn-green";
    }
    else{
      btn.className = "btn btn-gray";
    }
  }
  
  function changeState(i,j){
    const btn = document.getElementsByClassName("btn")[0];
    const caseNumCase = document.getElementById("case"+(i*dimension+j))
    const newColorClassName = "gridCell gridCell-"+btn.className.split(" ")[1].split("-")[1]; 
    caseNumCase.className = newColorClassName
    caseNumCase.disabled = true;//
    grille[i-1][j-1] ={color:btn.className,click:true}
    correction()

    console.log(grille);
    console.log(grilleAttendue);

  }

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
  


  return (
    <>
        <button onClick={() => genereGrille()}>Commencer partie</button>
    </>
  )
}

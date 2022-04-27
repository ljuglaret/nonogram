import React from "react";
import "./App.css";
const dimension = 4;
//attention , il s'agit d'un exemple de présentation, 
//il peut y avoir des incohérences
const indicsLigne = []//[[1,2],[0],[3,2],[2]]
const indicsColonne = []//[[2],[1,2],[0],[1]]

const caseInitiale = {color:"white", click : false};
const grille = []
const grilleAttendue = []

export default function Jeu()  {

  // Mettre les indications dans une autre couleur lorsque 
  // une ligne/colonne est complète
  // === si la ligne/colonne n'a aucune case dont la color est white

  function ligneColComplete(){
  //  genereGrille
    for (let i = 0 ; i < dimension ; i++){
      //let hasMagenicVendor = vendors.some( vendor => vendor['Name'] === 'Magenic' )
       if (!grille[i].some(ligne => ligne['color'] === caseInitiale.color)){
         console.log(i + "est pleine")
         document.getElementsByClassName("indicationsi")[i].className = "indicationsf"
       }
      }
  }

  // Si erreur ne pas mettre en rouge mais en gris 
  // et à ajouter ce nombre à la vue

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
       const colors = ["gridCell gridCell-gray","gridCell gridCell-green"]
       for (let i = 0 ; i < dimension ; i++){
         const ligneAlea = []
         for (let j = 0 ; j < dimension ; j ++){ 
          const caseAleatoire = {color:colors[Math.floor(Math.random() * 2)], click : true};  
           ligneAlea[j] =  caseAleatoire
           }
         grilleAttendue[i] = ligneAlea
       }
       genereIndications()
  }

function genereIndications(){
  console.log(" attendue : ")
    console.log(grilleAttendue);

  //compte les cases grisées sur la grille attendue
for (let i = 0 ; i < dimension ; i++){
  let temp = [], cpt = 0 , k = 0  
      for (let j = 0 ; j < dimension ; j ++){
        if(grilleAttendue[i][j].color === 'gridCell gridCell-green' && j === dimension - 1){
          cpt++;
          temp[k] = cpt;
        }
        else if(grilleAttendue[i][j].color === 'gridCell gridCell-green'){
          cpt++;
        }
      
        else if(grilleAttendue[i][j].color === 'gridCell gridCell-gray' && cpt !==0){
          temp[k] = cpt;
          k++;
          cpt = 0 ;
        }
        indicsLigne[i] = temp
    }
  }
  for (let j = 0 ; j < dimension ; j++){
    let temp = [], cpt = 0 , k = 0  
        for (let i = 0 ; i < dimension ; i ++){
          if(grilleAttendue[i][j].color === 'gridCell gridCell-green' && i === dimension - 1){
            cpt++;
            temp[k] = cpt;
          }
          else if(grilleAttendue[i][j].color === 'gridCell gridCell-green'){
            cpt++;
          }
        
          else if(grilleAttendue[i][j].color === 'gridCell gridCell-gray' && cpt !==0){
            temp[k] = cpt;
            k++;
            cpt = 0 ;
          }
          indicsColonne[j] = temp
      }
    }
    console.log("indic lignes : "+indicsLigne)
    console.log("indic colonnes : "+indicsColonne)
}

function correction(i,j){
//comparaisons réponses données et réponses attendues
  
     if(grille[i][j].color !== grilleAttendue[i][j].color){
      grille[i][j].color = "gridCell gridCell-red"
      const caseNumCase = document.getElementById("case"+(i*dimension+j))
      caseNumCase.className = grille[i][j].color
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
    grille[i][j] ={color: newColorClassName,click:true}
    console.log("couleur choisie : " + newColorClassName)
    correction(i,j)
    ligneColComplete()
    console.log(grille);
    
  }

  function defBtnCase(btnCase,i,j){
    if (i===0 && j === 0) {
      btnCase.id = "vide"

    }
    else if (i === 0){
      btnCase.className = "indicationsj"
      btnCase.disabled = true
      btnCase.innerText = indicsColonne[j-1]
    }
    else if (j === 0){
      btnCase.className = "indicationsi"
      btnCase.disabled = true
      btnCase.innerText = indicsLigne[i-1]
    }
    else{
      btnCase.id = "case" + ((i-1)*dimension+(j-1));
      btnCase.className = "gridCell gridCell-white";
      btnCase.onclick = () => {changeState(i-1,j-1);}
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

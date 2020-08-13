const textAreaStart = document.querySelector(".textAreaStart");
const textAreaEnd = document.querySelector(".textAreaEnd");
const convertButton = document.querySelector(".convertButton");
const resetButton = document.querySelector(".resetButton");
//Tooltip
const tipButton = document.querySelector(".tipButton");

//Forbidden words and nice words
const restrictedWords = "idiot, stupid, ugly, fool, bad, unattractive, hate, unfriendly, enemy, bad";
const words = restrictedWords.split(/, */);
const regex = new RegExp("(" + words.join("|") + ")", "igm");
const niceWords = "intelligent, clever, pretty, wise, nice, charming, love, friendly, friend, good";
const niceTable = niceWords.split(/, */);

//Function to replace the bad words with nice ones
const convertText = () => {
    var tempText = "";
    var splitText = textAreaStart.value.split(/\s */);
    for (let i=0; i<splitText.length; i++) {
        tempText = tempText + splitText[i] + " ";
        if (splitText[i].indexOf(words[i]!=-1)){
            const niceNumber = Math.floor(Math.random()*10);
            tempText = tempText.replace(regex, niceTable[niceNumber]);
        }
    }
        textAreaEnd.value = tempText;
}

const resetText = () => {
    textAreaEnd.value = "Converted text...";
    textAreaStart.value = "Type Your text here...";
}

convertButton.addEventListener("click", convertText);
resetButton.addEventListener("click", resetText);
    
//Create tooltip
const toolTip = document.createElement("div");
    
toolTip.id = "newToolTip";
toolTip.style.visibility = "hidden";
toolTip.style.position = "fixed";
toolTip.style.top = "0.5rem";
toolTip.style.left = "0.5rem";
toolTip.style.padding = "0.5rem";
toolTip.style.width = "30rem";
toolTip.style.borderRadius = "0.5rem";
toolTip.style.border = "solid thin gray";
toolTip.style.backgroundColor = "rgba(105, 105, 105, 0.2)";
toolTip.style.transition.visibility = "0.2s";

document.body.appendChild(toolTip);

//Turn the tooltip on
const toolTipOn = ((evt) => {
    const boundBox = evt.target.getBoundingClientRect();
    const coordX = boundBox.left;
    const coordY = boundBox.top;

    toolTip.style.left = (coordX + 30).toString() + "px";
    toolTip.style.top = (coordY + 30).toString() + "px";
        
    toolTip.innerHTML = "Try to type words like idiot, stupid, ugly, fool, bad, unattractive, hate, unfriendly, enemy or bad.";
        
    toolTip.style.visibility = "visible";
});

//Turn the tooltip off
const toolTipOff = (() => { toolTip.style.visibility = "hidden"; });
    
tipButton.addEventListener("mouseover", toolTipOn , false);
tipButton.addEventListener("mouseout", toolTipOff , false);
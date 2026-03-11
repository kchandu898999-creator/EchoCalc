let display = document.getElementById("display")

function append(value){
display.value += value
}

function clearDisplay(){
display.value = ""
}

function calculate(){

fetch("/calculate", {

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
expression:display.value
})

})

.then(res=>res.json())

.then(data=>{

display.value = data.result
loadHistory()

})

}


// HISTORY PANEL
function toggleHistory(){

let panel = document.getElementById("historyPanel")

panel.classList.toggle("open")

loadHistory()

}

function loadHistory(){

fetch("/history")

.then(res=>res.json())

.then(data=>{

let list=document.getElementById("historyList")

list.innerHTML=""

data.reverse().forEach(item=>{

let li=document.createElement("li")

li.innerText=item.expression+" = "+item.result

li.onclick=function(){
display.value=item.expression
}

list.appendChild(li)

})

})

}


// VOICE OUTPUT
function speak(){

let text = display.value

if(text === "") return

let speech = new SpeechSynthesisUtterance(text)

speech.lang="en-US"

window.speechSynthesis.speak(speech)

}


// VOICE INPUT
function startVoice(){

if (!('webkitSpeechRecognition' in window)){

alert("Voice recognition not supported in this browser. Use Google Chrome.")

return

}

const recognition = new webkitSpeechRecognition()

recognition.lang = "en-US"

recognition.interimResults = false

recognition.maxAlternatives = 1

recognition.start()

recognition.onstart = function(){

console.log("Voice recognition started")

}

recognition.onresult = function(event){

let voiceText = event.results[0][0].transcript

console.log("Voice input:",voiceText)

// convert words to symbols

voiceText = voiceText
.replace(/plus/gi,"+")
.replace(/minus/gi,"-")
.replace(/multiply/gi,"*")
.replace(/into/gi,"*")
.replace(/divide/gi,"/")
.replace(/by/gi,"")

display.value = voiceText

calculate()

speak()

}

recognition.onerror=function(event){

console.log("Voice error:",event.error)

}

recognition.onend=function(){

console.log("Voice recognition ended")

}

}
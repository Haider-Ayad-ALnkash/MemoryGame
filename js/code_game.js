// global var 
let duration=1000;
// BG control 
let name=document.querySelector('.name span')
document.querySelector(".splash-screen span").onclick=function () {
    let yourName=prompt("enter Your Name ");
    if (yourName == null || yourName=='' ) {
        name.innerHTML='Unknown';
    }else{
        name.innerHTML=yourName;
    }
    document.querySelector('.splash-screen').remove();
      
    document.querySelectorAll('.game-block').forEach(block => {
        block.classList.add('is-flipped');
        setTimeout(() => {
            block.classList.remove('is-flipped'); 
        }, 5000);

        let countDiv=document.querySelector('.timeDone');
        var seconds=120,
        remSeconds,
        countDown=setInterval(() => {
        secondPass();
            }, 1000);
        function secondPass() {
        var minutes=Math.floor(seconds/60),
        remSeconds=seconds%60;
        countDiv.innerHTML=minutes+ " : " +remSeconds;
        if (seconds>0) {
            seconds=seconds-1;
        }else{
                clearInterval(countDown);
                countDiv.innerHTML="DONE";
                window.stop();
            setTimeout(() => {
                document.location.reload(true);
            }, 1000);

               
            }
        }

    });   
}

//Time

function showTime() {
    var now=new Date();
    hours=now.getHours(),
    minutes=now.getMinutes();
    seconds=now.getSeconds();
    if (hours<10) {
        hours='0'+hours;
    }
    if (minutes<10) {
        minutes='0'+minutes;
    }
    if (seconds<10) {
        seconds='0'+seconds;
    }
    document.querySelector('footer .time').textContent=hours + ':'+ minutes +':' + seconds }

window.onload=function () {
    setInterval(showTime, 500);
};

// Creat Countdown Timer
   
// Get Block Container 
let blockContainer=document.querySelector('.block-container');
//Get children In Block Container
let blocks=Array.from(blockContainer.children);
// Create Range Array 
let orderRange=Array.from(Array(blocks.length).keys());
shuffel(orderRange);


//Add Order Css property To Game Blocks
blocks.forEach((block,index)=>{
    block.style.order=orderRange[index];
    block.addEventListener("click",function () {
        flipBlocks(block);
    })
});


//Create the Shuffle Function
function shuffel(array) {
    //Setting Vars
    let current=array.length,
    temp,
    random;

    while (current>0) { 
        random=Math.floor(Math.random()*current);
        current--;
        // Save Current 
        temp=array[current];
        //current Element=random Element
        array[current]=array[random];
        // rando Element = Get Element from temp 
        array[random]=temp;
    }
    return array;
}

// Create Function Flip 
function flipBlocks(selectBlock) {
    selectBlock.classList.add('is-flipped');
    // search on blocks to find class contain is-flipped 
    let allFlippBlocks=blocks.filter(flippedBlock=>flippedBlock.classList.contains('is-flipped'));
    if (allFlippBlocks.length === 2) {
        stopClick();
        checkMatchedBlocks(allFlippBlocks[0],allFlippBlocks[1]);
    }
} 

function stopClick() {
    blockContainer.classList.add('no-Click');
    setTimeout(() => {
        blockContainer.classList.remove('no-Click');
    },duration);
}

//Check Matched Block
function checkMatchedBlocks(firstBlock,secondBlock) {
    let tries=document.querySelector('.tries span');
    if (firstBlock.dataset.chooes===secondBlock.dataset.chooes) {
        firstBlock.classList.remove('is-flipped');
        secondBlock.classList.remove('is-flipped');
        
        firstBlock.classList.add('has-match');
        secondBlock.classList.add('has-match');
        let allFlippBlocksMatch=blocks.filter(flippedBlock=>flippedBlock.classList.contains('has-match'));
       
        if (allFlippBlocksMatch.length== blocks.length) {
        //    finishP.innerHTML=parseInt(tries.innerHTML)+1;
         document.querySelector('.finish-screen').style.display='block';
         setTimeout(() => {
            document.location.reload(true);
        }, 1000);
        }
        document.getElementById('success').play();
    }else{
        tries.innerHTML=parseInt(tries.innerHTML)+1;
        setTimeout(() => {
            firstBlock.classList.remove('is-flipped');
            secondBlock.classList.remove('is-flipped');
            document.getElementById('fail').play();
        }, duration);
    }
}
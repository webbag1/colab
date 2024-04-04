let hrCount = 0;
let minCount = 0;
let secCount = 0;
let countdown;

function startcount() {
    hrCount = 0;
    minCount = 0;
    secCount = 0;
    updateCount();
    countdown = setInterval(updatecount, 1000);
}

function updatecount() {
    secCount++;

    if (secCount >= 60) {
        secCount = 0;
        minCount++;

        if (minCount >= 60) {
            minCount = 0;
            hrCount++;
        }
    }

    updateCount();
}

function updateCount() {
    document.getElementById("cdhr").innerText = formatTime(hrCount);
    document.getElementById("cdmin").innerText = formatTime(minCount);
    document.getElementById("cdsec").innerText = formatTime(secCount);
}

function formatTime(time) {
    return time < 10 ? "0" + time : time;
}

function pausecount() {
    clearInterval(countdown);
}

function resetcount() {
    clearInterval(countdown);
    hrCount = 0;
    minCount = 0;
    secCount = 0;
    updateCount();
}


// let hrCount, minCount, secCount, countdown;

// function startcount() {
//     countdown = setInterval(updatecount, 1000);
// }

// function updatecount() {
//     secCount++;

//     if (secCount >= 60) {
//         secCount = 0;
//         minCount++;

//         if (minCount >= 60) {
//             minCount = 0;
//             hrCount++;
//         }
//     }

//     updateCount();
// }

// function updateCount() {
//     document.getElementById("cdhr").innerText = formatTime(hrCount);
//   document.getElementById("cdmin").innerText = formatTime(minCount);
//   document.getElementById("cdsec").innerText = formatTime(secCount);
// }
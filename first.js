
// ================= ARRAYS =================
let candidates = [
    { name: "Mariah Carrey", image: "/image/mc.jpg" },
    { name: "Bruno Mars", image: "/image/bm.jpg" },
    { name: "Taylor Swift", image: "/image/ts.jpg" },
    { name: "beyonce", image: "/image/bey.jpg" },
    { name: "whitney houston", image: "/image/wh.jpg" },
    { name: "britney spears", image: "/image/bs.jpg" },
    { name: "Michael Jackson", image: "/image/mj.jpg" },
    { name: "sam smith", image: "/image/sm.jpg" },
    { name: "justine bieber", image: "/image/jb.jpg" },
    { name: "eminem", image: "/image/mnm.jpg" },
    { name: "Ariana Grande", image: "/image/ariana.jpg" },
    { name: "Rhiana", image: "/image/rhiana.jpg" },
    { name: "Billie Eilish", image: "/image/billie.jpg" },
    { name: "Cardi B", image: "/image/cardi.jpg" },
    { name: "Doja Cat", image: "/image/doja.jpg" },
    {name: "The Weeknd", image: "/image/weeknd.jpg" },
    {name: "Katy Perry", image: "/image/katy.jpg" },
    {name: "Lana Del Rey", image: "/image/lana.jpg" },
    {name: "Laufey", image: "/image/laufey.jpg" },
    {name: "Melanie Martinez", image: "/image/melanie.jpg" },
];

let votes = new Array(candidates.length).fill(0);

let currentRound = 0;
let selectedIndex = null;
let currentWinner = 0;

// ================= PAGE SWITCH FUNCTION =================
function switchPage(hideId, showId) {
    document.getElementById(hideId).classList.remove("show");
    document.getElementById(hideId).classList.add("hidden");

    document.getElementById(showId).classList.remove("hidden");

    setTimeout(() => {
        document.getElementById(showId).classList.add("show");
    }, 50);
}

// ================= START VOTING =================
function startVoting() {
    document.body.classList.add("voting-bg");
    switchPage("homePage", "votingPage");
    showRound();
}
// ================= SHOW ROUND =================
function showRound() {

    document.getElementById("roundTitle").innerText =
        "Round " + (currentRound + 1) + " of " + (candidates.length - 1);

    let left = currentWinner;
    let right = currentRound + 1;

    document.getElementById("leftImage").src = candidates[left].image;
    document.getElementById("leftName").innerText = candidates[left].name;

    document.getElementById("rightImage").src = candidates[right].image;
    document.getElementById("rightName").innerText = candidates[right].name;

    document.getElementById("leftCard").classList.remove("selected");
    document.getElementById("rightCard").classList.remove("selected");

    selectedIndex = null;
}

// ================= SELECT CANDIDATE =================
function selectCandidate(side) {

    let left = currentWinner;
    let right = currentRound + 1;

    document.getElementById("leftCard").classList.remove("selected");
    document.getElementById("rightCard").classList.remove("selected");

    if (side === "left") {
        selectedIndex = left;
        document.getElementById("leftCard").classList.add("selected");
    } else {
        selectedIndex = right;
        document.getElementById("rightCard").classList.add("selected");
    }
}

function shuffleCandidates() {
    for (let i = candidates.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));

        // swap candidates
        let temp = candidates[i];
        candidates[i] = candidates[j];
        candidates[j] = temp;
    }
}
function startVoting() {

    shuffleCandidates();   // <-- ADD THIS LINE

    votes = new Array(candidates.length).fill(0); // reset votes safely
    currentRound = 0;
    currentWinner = 0;

    document.body.classList.add("voting-bg");
    switchPage("homePage", "votingPage");
    showRound();
}
// ================= ADD VOTE METHOD =================
function addVote(index) {
    votes[index]++;
}

// ================= NEXT ROUND =================
function nextRound() {

    if (selectedIndex === null) {
        alert("Please select a candidate first!");
        return;
    }

    addVote(selectedIndex);

    // If challenger wins, they become the new king
    if (selectedIndex !== currentWinner) {
        currentWinner = selectedIndex;
    }

    currentRound++;

    if (currentRound < candidates.length - 1) {
        showRound();
    } else {
        switchPage("votingPage", "donePage");
    }
}

// ================= SORT RESULTS (Bubble Sort) =================
function sortResults() {
    for (let i = 0; i < votes.length - 1; i++) {
        for (let j = 0; j < votes.length - i - 1; j++) {

            if (votes[j] < votes[j + 1]) {

                let tempVote = votes[j];
                votes[j] = votes[j + 1];
                votes[j + 1] = tempVote;

                let tempCandidate = candidates[j];
                candidates[j] = candidates[j + 1];
                candidates[j + 1] = tempCandidate;
            }
        }
    }
}

// ================= SHOW TALLY =================
function showTally() {

    sortResults();
    switchPage("donePage", "resultPage");

    let output = "";

    for (let i = 0; i < candidates.length; i++) {
        output += "<p>" + candidates[i].name +
            " - <b>" + votes[i] + "</b> votes</p>";
    }

    document.getElementById("results").innerHTML = output;
}


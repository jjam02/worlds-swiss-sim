import "./style.css";

import HLE from "./HLE.jpeg";
import PSG from "./PSG.png";
import FLY from "./FLY.png";
import GAM from "./GAM.png";
import G2 from "./g2.png";
import PAIN from "./pain.png";
import BLG from "./blg.webp";
import MAD from "./mad.jpg";
import TES from "./TES.png";
import T1 from "./T1.png";
import TL from "./TLhonda.png";
import LNG from "./LNG.png";
import FNC from "./fnc.png";
import DK from "./DWG.png";
import GEN from "./GEN.png";
import WBG from "./WBG.png";
import data from "./Matchups.json";
import day2WData from "./MatchupsDay2W.json";
import day2LData from "./MatchupsDay2L.json";
import day3WData from "./MatchupsDay3W.json";
import day3LData from "./MatchupsDay3L.json";
import day3WLData from "./MatchupsDay3WL.json";

interface Team {
  name: string;
  picture: string;
  region: string;
  rating: number;
}

interface Match {
  blue: string | undefined;
  red: string | undefined;
  winner: string | undefined;
}

interface Bracket {
  Matches: {
    match: Match;
  }[];
}

let teams: Team[] = [
  { name: "HLE", picture: HLE, region: "LCK", rating: 1 },
  { name: "PSG", picture: PSG, region: "PCS", rating: 1 },
  { name: "FLY", picture: FLY, region: "LCS", rating: 1 },
  { name: "GAM", picture: GAM, region: "VCS", rating: 1 },
  { name: "G2", picture: G2, region: "LEC", rating: 1 },
  { name: "PNG", picture: PAIN, region: "BR", rating: 1 },
  { name: "BLG", picture: BLG, region: "LPL", rating: 1 },
  { name: "MAD", picture: MAD, region: "LEC", rating: 3 },
  { name: "TES", picture: TES, region: "LPL", rating: 2 },
  { name: "T1", picture: T1, region: "LCK", rating: 4 },
  { name: "TL", picture: TL, region: "LCS", rating: 2 },
  { name: "LNG", picture: LNG, region: "LPL", rating: 3 },
  { name: "FNC", picture: FNC, region: "LEC", rating: 2 },
  { name: "DK", picture: DK, region: "LCK", rating: 3 },
  { name: "GEN", picture: GEN, region: "LCK", rating: 2 },
  { name: "WBG", picture: WBG, region: "LPL", rating: 4 },
];

let app = document.querySelector<HTMLDivElement>("#app");

function addTeams(teams: (Team | undefined)[], title: string = "") {
  let div = document.createElement("div");
  div.classList.add("finalTeams");
  div.textContent = title;
  teams.forEach((team) => {
    let button = document.createElement("button");
    button.innerHTML = `<img src=${team?.picture}><div> ${team?.name} ${
      team?.region
    }#${team?.rating.toString()}</div>`;
    div.append(button);
  });

  document.querySelector("div.quart")?.append(div);
}

let round1Container = document.createElement("div");
let round1Button = document.createElement("button");

let round1Text = document.createElement("p");
round1Button.setAttribute("id", "round1End");
round1Button.textContent = "Next Round";
round1Text.textContent = "Round 1 Swiss";
round1Container.setAttribute("id", "R1");
round1Container.append(round1Text, round1Button);

data.Matches.forEach((match, index) => {
  let div = document.createElement("div");
  div.setAttribute("id", `R1${"M" + index.toString()}`);
  let button = document.createElement("button");
  //console.log(match.match.blue);
  let team1 = teams.find((team) => team.name === match.match.blue);
  let team2 = teams.find((team) => team.name === match.match.red);
  //console.log(team1);
  if (team1?.name === match.match.winner) {
    button.classList.add("selected");
  } else {
    button.classList.add("loser");
  }
  button.innerHTML = `<img src=${team1?.picture}><div>${team1?.name} ${
    team1?.region
  }#${team1?.rating.toString()}</div>`;
  let button2 = document.createElement("button");
  if (team2?.name === match.match.winner) {
    button2.classList.add("selected");
  } else {
    button2.classList.add("loser");
  }
  button2.innerHTML = `<img src=${team2?.picture}><div>${team2?.name} ${
    team2?.region
  }#${team2?.rating.toString()}</div>`;
  addListeners(button, button2);
  div.append(button, button2);
  round1Container.append(div);

  //console.log(match.match.blue + " vs " + match.match.red);
});

app?.prepend(round1Container);

function addListeners(button1: HTMLButtonElement, button2: HTMLButtonElement) {
  button1.addEventListener("click", () => {
    document.querySelector("div.finalTeams")?.remove();
    button1.classList.remove("loser");
    button1.classList.add("selected");
    button2.classList.remove("selected");
    button2.classList.add("loser");
  });
  button2.addEventListener("click", () => {
    document.querySelector("div.finalTeams")?.remove();
    button2.classList.remove("loser");
    button2.classList.add("selected");
    button1.classList.add("loser");
    button1.classList.remove("selected");
  });
}

let round1End = document.getElementById("round1End");
round1End?.addEventListener("click", round2Setup);

let round2Win: (Team | undefined)[] = [];
let round2Lose: (Team | undefined)[] = [];
let round3Win: (Team | undefined)[] = [];
let round3WinLose: (Team | undefined)[] = [];
let round3Lose: (Team | undefined)[] = [];
let round4Win: (Team | undefined)[] = [];
let round4Lose: (Team | undefined)[] = [];
let round5: (Team | undefined)[] = [];
let finalTeams: (Team | undefined)[] = [];
roundGenerator(day2WData, "R2W", "1-0");
roundGenerator(day2LData, "R2L", "0-1");
roundGenerator(day3WData, "R3W", "2-0");

roundGenerator(day3WLData, "R3WL", "1-1");

roundGenerator(day3LData, "R3L", "0-2");

function round2Setup() {
  if (round2Win.length > 1) return;
  for (let i = 0; i < 8; i++) {
    //console.log(`div#R1M${i} button#selected`);
    let winner = document
      .querySelector(`div#R1M${i} button.selected`)
      ?.textContent?.split(" ")[0];

    let loser = document
      .querySelector(`div#R1M${i} button.loser`)
      ?.textContent?.split(" ")[0];

    console.log("WINNER: " + winner + " LOSER: " + loser);
    if (winner !== undefined) {
      round2Win.push(teams.find((team) => team.name === winner));
    }
    if (loser !== undefined) {
      round2Lose.push(teams.find((team) => team.name === loser));
    }
  }
  if (round2Win.length < 7 || round2Lose.length < 7) {
    alert("select a team in every match!");
    round2Win.length = 0;
    round2Lose.length = 0;
    return;
  }
  console.log(round2Win);
  // addTeams(round2Win, "1-0");
  // addTeams(round2Lose, "0-1");
  generateBracket(round2Win, "R2W", "1-0");
  generateBracket(round2Lose, "R2L", "0-1");
}

function generateBracket(
  teams: (Team | undefined)[],
  round: string,
  title: string
) {
  console.log(title + round + " GENERATING...");
  let roundMatches: Bracket = { Matches: [] };
  while (teams.length > 0) {
    let blue = pickATeam(teams);
    let red = pickATeam(teams);
    roundMatches.Matches.push({
      match: { blue: blue?.name, red: red?.name, winner: "" },
    });
  }
  roundGenerator(roundMatches, round, title);
}

function pickATeam(pool: (Team | undefined)[]) {
  let index = Math.floor(Math.random() * pool.length);
  return pool.splice(index, 1)[0];
}

function roundGenerator(data: Bracket, round: string, title: string) {
  console.log("ROUND GEN....." + round + title);
  console.log(data);
  let endRoundButton = document.createElement("button");
  endRoundButton.setAttribute("id", round + title + "End");
  endRoundButton.textContent = "Next Round";
  console.log("ROUND 2 ARRAY", round2Win);
  let checkRoundContainer = document.querySelector("div#" + round + title);
  if (checkRoundContainer) checkRoundContainer.remove();
  let roundContainer = document.createElement("div");

  roundContainer.textContent = title;
  roundContainer.setAttribute("id", round + title);
  roundContainer.append(endRoundButton);
  data.Matches.forEach((match, index) => {
    let div = document.createElement("div");
    div.setAttribute("id", round + `${"M" + index.toString()}`);

    let button = document.createElement("button");
    console.log(match.match.blue);
    let team1 = teams.find((team) => team.name === match.match.blue);
    let team2 = teams.find((team) => team.name === match.match.red);
    if (team1?.name === match.match.winner) {
      button.classList.add("selected");
    } else {
      button.classList.add("loser");
    }
    console.log(team1);
    button.innerHTML = `<img src=${team1?.picture}><div>${team1?.name} ${
      team1?.region
    }#${team1?.rating.toString()}</div>`;
    let button2 = document.createElement("button");
    if (team2?.name === match.match.winner) {
      button2.classList.add("selected");
    } else {
      button2.classList.add("loser");
    }
    button2.innerHTML = `<img src=${team2?.picture}><div>${team2?.name} ${
      team2?.region
    }#${team2?.rating.toString()}</div>`;
    addListeners(button, button2);
    div.append(button, button2);
    roundContainer.append(div);

    console.log(match.match.blue + " vs " + match.match.red);
  });
  let round2WinEnd = document.getElementById("R2W1-0End");
  round2WinEnd?.addEventListener("click", round3SetupW);

  let round2WinLose = document.getElementById("R2L0-1End");
  round2WinLose?.addEventListener("click", round3SetupW);

  let round3Win = document.getElementById("R3W2-0End");
  round3Win?.addEventListener("click", round4SetupW);
  let round3WinLose = document.getElementById("R3WL1-1End");
  round3WinLose?.addEventListener("click", round4SetupW);
  let round3Lose = document.getElementById("R3L0-2End");
  round3Lose?.addEventListener("click", round4SetupW);
  let round4Win = document.getElementById("R4W2-1End");
  round4Win?.addEventListener("click", round5Setup);
  let round4Lose = document.getElementById("R4L1-2End");
  round4Lose?.addEventListener("click", round5Setup);

  if (round === "R5") endRoundButton?.addEventListener("click", getFinalteams);
  let app2 = document.querySelector(".app" + round);
  console.log("APP2: ", "app" + round);
  console.log("APP2: ", app2);

  if (app2) {
    app2.append(roundContainer);
  } else {
    app?.append(roundContainer);
  }
}

function round3SetupW() {
  for (let i = 0; i < 4; i++) {
    let winner = document
      .querySelector(`div#R2WM${i} button.selected`)
      ?.textContent?.split(" ")[0];

    let loser = document
      .querySelector(`div#R2WM${i} button.loser`)
      ?.textContent?.split(" ")[0];

    let loser2 = document
      .querySelector(`div#R2LM${i} button.loser`)
      ?.textContent?.split(" ")[0];

    console.log(
      "WINNER: " + winner + " LOSER1: " + loser + " LOSER2: " + loser2
    );
    console.log(teams);
    if (winner !== undefined) {
      round3Win.push(teams.find((team) => team.name === winner));
      console.log(round3Win);
    }
    if (loser !== undefined) {
      round3WinLose.push(teams.find((team) => team.name === loser));
    }
    if (loser2 !== undefined) {
      round3WinLose.push(teams.find((team) => team.name === loser2));
    }
  }
  console.log("WINLOSE: ", round3WinLose);
  if (round3WinLose.length < 8 || round3Win.length < 4) {
    alert("select a team in every match!");
    round3Win = [];
    round3WinLose = [];
    return;
  }
  console.log(round2Win);
  // addTeams(round2Win, "1-0");
  // addTeams(round2Lose, "0-1");
  console.log("meow22oiaefnoi");
  generateBracket(round3WinLose, "R3WL", "1-1");
  generateBracket(round3Win, "R3W", "2-0");
  round3SetupL();
}

function round3SetupL() {
  for (let i = 0; i < 8; i++) {
    console.log(`div#R1M${i} button#selected`);
    let winner = document
      .querySelector(`div#R2LM${i} button.selected`)
      ?.textContent?.split(" ")[0];

    let loser = document
      .querySelector(`div#R2LM${i} button.loser`)
      ?.textContent?.split(" ")[0];

    let loser2 = document
      .querySelector(`div#R2WM${i} button.loser`)
      ?.textContent?.split(" ")[0];
    if (winner !== undefined) {
      round3WinLose.push(teams.find((team) => team.name === winner));
    }
    if (loser !== undefined) {
      round3Lose.push(teams.find((team) => team.name === loser));
    }
    if (loser2 !== undefined) {
      round3WinLose.push(teams.find((team) => team.name === loser2));
    }
  }
  if (round3WinLose.length < 8 || round3Lose.length < 4) {
    alert("select a team in every match!");
    round3Lose = [];
    round3WinLose = [];
    return;
  }
  console.log(round2Win);
  // addTeams(round2Win, "1-0");
  // addTeams(round2Lose, "0-1");
  console.log("meow22oiaefnoi");
  generateBracket(round3WinLose, "R3WL", "1-1");

  generateBracket(round3Lose, "R3L", "0-2");
}

function round4SetupW() {
  for (let i = 0; i < 6; i++) {
    console.log(`div#R1M${i} button#selected`);
    let winner = document
      .querySelector(`div#R3WLM${i} button.selected`)
      ?.textContent?.split(" ")[0];

    let winner2 = document
      .querySelector(`div#R3LM${i} button.selected`)
      ?.textContent?.split(" ")[0];

    let loser = document
      .querySelector(`div#R3WLM${i} button.loser`)
      ?.textContent?.split(" ")[0];

    let loser2 = document
      .querySelector(`div#R3WM${i} button.loser`)
      ?.textContent?.split(" ")[0];
    if (winner !== undefined) {
      round4Win.push(teams.find((team) => team.name === winner));
    }
    if (winner2 !== undefined) {
      round4Lose.push(teams.find((team) => team.name === winner2));
    }
    if (loser !== undefined) {
      round4Lose.push(teams.find((team) => team.name === loser));
    }
    if (loser2 !== undefined) {
      round4Win.push(teams.find((team) => team.name === loser2));
    }
  }
  if (round4Win.length < 6 || round4Lose.length < 6) {
    console.log("ROUND4 WIN: ", round4Win);
    console.log("ROUND4 Lose: ", round4Lose);

    alert("select a team in every match!");
    round4Lose = [];
    round4Win = [];
    return;
  }
  console.log(round2Win);
  // addTeams(round2Win, "1-0");
  // addTeams(round2Lose, "0-1");
  console.log("meow22oiaefnoi");
  generateBracket(round4Win, "R4W", "2-1");

  generateBracket(round4Lose, "R4L", "1-2");
}

function round5Setup() {
  for (let i = 0; i < 3; i++) {
    console.log(`div#R1M${i} button#selected`);
    let winner = document
      .querySelector(`div#R4LM${i} button.selected`)
      ?.textContent?.split(" ")[0];

    let loser = document
      .querySelector(`div#R4WM${i} button.loser`)
      ?.textContent?.split(" ")[0];
    if (winner !== undefined) {
      round5.push(teams.find((team) => team.name === winner));
    }

    if (loser !== undefined) {
      round5.push(teams.find((team) => team.name === loser));
    }
  }
  if (round5.length < 6) {
    alert("select a team in every match!");
    round5 = [];

    return;
  }
  generateBracket(round5, "R5", "2-2");
}

function getFinalteams() {
  console.log("WE HAVD DONE IT");
  if (finalTeams.length > 0) return;
  for (let i = 0; i < 2; i++) {
    let winner = document
      .querySelector(`div#R3WM${i} button.selected`)
      ?.textContent?.split(" ")[0];

    if (winner !== undefined) {
      finalTeams.push(teams.find((team) => team.name === winner));
    }
  }

  for (let i = 0; i < 3; i++) {
    let winner = document
      .querySelector(`div#R4WM${i} button.selected`)
      ?.textContent?.split(" ")[0];

    if (winner !== undefined) {
      finalTeams.push(teams.find((team) => team.name === winner));
    }
  }
  for (let i = 0; i < 3; i++) {
    let winner = document
      .querySelector(`div#R5M${i} button.selected`)
      ?.textContent?.split(" ")[0];

    if (winner !== undefined) {
      finalTeams.push(teams.find((team) => team.name === winner));
    }
  }
  if (finalTeams.length < 8) {
    alert("select a team in every match!");
    finalTeams = [];

    return;
  }
  document.querySelector("div.finalTeams")?.remove();
  addTeams(finalTeams, "QUATERFINALS");
  finalTeams = [];
}

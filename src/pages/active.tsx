import Create from './create';
import { createdTourney } from './create'
import './active.css'
import { EndOfLineState } from 'typescript';

function sumArray(array: string | any[]){
    let sum = 0
    for (let i=0; i< array.length; i+=1 ){
        sum += array[i]
    }
    return sum
}

export default function Active(){
    // console.log(createdTourney)
    let score = 0

    let createTeamList = () => { // creates the entire scoreboard
        let bracketContainer = document.getElementById('bracketContainer') 
        bracketContainer!.innerHTML = ''
        let squad = document.createElement('squad') // this is the number of squads. used for determining the number of rows. everything should append in here
        squad.id = 'squad'
        let multiplierList = document.createElement('multiplierList')
        multiplierList.id = 'multiplierList'
        
        if ((Object.values(createdTourney)[4]) == true){ // if the warzone box was checked
            let wzId = document.createElement('wzId')
            let wzIdInput: any | Node
            wzId.id = 'wzId'
            for (let y = 0; y < Number(Object.values(createdTourney)[2]); y++){ // for the number of games, make a wz game id input
                wzIdInput = document.createElement('input')
                wzIdInput.type = 'input'
                wzIdInput.id = `wzIdInput${y+1}`
                wzIdInput.placeholder = `wz id for game ${y+1}`
                wzId.append(wzIdInput)
                bracketContainer?.append(wzId)
            }
            for (let i = 1; i <= Number(Object.values(createdTourney)[0]); i++){ // for the number of teams, create a multiplier, defaulted to 1 bc most are 1
                let multiValue = document.createElement('input')
                let pTag = document.createElement('p')
                pTag.innerHTML = `multi ${i}`
                multiValue.type = 'input'
                multiValue.id = `place${i}`
                multiValue.value = '1'
                multiplierList.append(pTag)
                multiplierList.append(multiValue)
            }
            bracketContainer?.append(multiplierList)
            bracketContainer?.append(squad)

            console.log(`Object.values(createdTourney) = ${Object.values(createdTourney)}`) // 5,1,1,1,true
            console.log(Object.keys(createdTourney)) // ['teams', 'playersPerTeam', 'games', 'lowsToDrop', 'warzone']
            
            for (let i = 1; i <= Number(Object.values(createdTourney)[0]); i++){ // This creates the number of teams, a vertical stack, children of bracketContainer
                let teamElement = document.createElement(`teamElement`) 
                teamElement.innerText = `Team ${i}`
                squad?.append(teamElement) // CURRENT ONE WORKING
                let team = document.createElement('team') // this is where each team player name input should go
                team.id = 'team'
                let total = document.createElement('total')
                total.id = `total${i}`
                total.textContent = 'Total Score: '
                let allScores: any[] = []
                let playerName: any | Node




                // these should be children of each team
                // creating each player input
                for (let x = 0; x < Number(Object.values(createdTourney)[1]); x++){ // This creates the player name inputs in each vertical team line
                    // // // console.log(`player${i}`)
                    playerName = document.createElement('input')
                    playerName.type = 'input'
                    playerName.id = `player${x+1}`
                    playerName.placeholder = `player ${x+1} input`
                    team.append(playerName)
                    teamElement.append(team)
                }

                // creating each game input necessary
                for (let y = 0; y < Number(Object.values(createdTourney)[2]); y++){ // This creates the game section
                    // let gameInfo = document.createElement('div') // Need elims (editable input), placement(editable input), and a total score output (not editable)
                    let elims = document.createElement('input') //as HTMLInputElement
                    let place = document.createElement('input')
                    let games = document.createElement(`game`) // this is where the elims, place and scores go
                    let scoreSpot = document.createElement('score') as HTMLInputElement
                    let scoreButton = document.createElement('button')
                    
                    allScores.push(0)
                    // console.log(allScores)
                    games.id = `game${y+1}`
                    elims.type = 'input'
                    place.type = 'input'
                    elims.id = `t${i}g${y+1}`

                    place.id = `placet${i}g${y+1}`
                    elims.placeholder = `elims for game ${y+1}`
                    place.placeholder = `placement for game ${y+1}`
                    scoreSpot.id = `scoret${i}g${y+1}`
                    scoreSpot.textContent = String(score)
                    scoreButton.id = `scoreButtont${i}g${y+1}`
                    scoreButton.type = 'button'
                    scoreButton.innerHTML = 'Update Score'
                    scoreButton.onclick = () => {
                        let wzPlayerName = String(playerName.value);
                        let matchString = String(wzIdInput.value);
                        console.log(String(wzIdInput.value))
                        let wzPlayerElims = 0;
                        let wzPlayerPlace = 0;
                        (() => {
                            console.log("working")
                            fetch(`https://www.callofduty.com/api/papi-client/crm/cod/v2/title/mw/platform/battle/fullMatch/wz/${matchString}/it`)
                            .then(response => response.json())
                            .then(data => {
                                for (let n = 0; n < (data)['data']['allPlayers'].length; n++){
                                    if ((data)['data']['allPlayers'][n]['player']['username'] == wzPlayerName) {
                                        console.log(`found player number ${n}`)
                                        console.log((data)['data']['allPlayers'][n]['player']['username']) // Player in game name
                                        wzPlayerElims = ((data)['data']['allPlayers'][n]['playerStats']['kills']) // Player kills
                                        wzPlayerPlace = ((data)['data']['allPlayers'][n]['playerStats']['teamPlacement']) // Place
                                        console.log(`before wzPlayerElims is returned ${wzPlayerElims}`)
                                        elims.value = String(wzPlayerElims)
                                        place.value = String(wzPlayerPlace)
                                        console.log(`before wzPlayerElims is returned ${wzPlayerPlace}`)
                                        // return [wzPlayerElims, wzPlayerPlace]
                                        console.log("first check")
                                        continue
                                    }
                                    // continue
                                    console.log("second check")
                                }
                                console.log("third check")
                            })
                            .catch(error => console.log('error', error));
                        })();
                        console.log(`after wzPlayerElims is returned ${wzPlayerElims}`)
                        console.log(`after wzPlayerElims is returned ${wzPlayerPlace}`)

                        let specificScore = document.getElementById(`t${i}g${y+1}`) as HTMLInputElement
                        let placeValue = (document.getElementById(`placet${i}g${y+1}`) as HTMLInputElement).value // What place the team came in
                        let multiplier = (document.getElementById(`place${placeValue}`) as HTMLInputElement).value // Multiplier you get for your placement
                        let totalScore = 0
                        console.log(`totalScore should be added together and is is ${totalScore}`)
                        console.log(`Final Score should be elims, ${Number(specificScore.value)} * placement multiplier, ${Number(multiplier)}`)
                        score = (Number(specificScore.value)*(Number(multiplier)))
                        allScores.splice(y,1,score)
                        console.log(`all scores is ${allScores}`)
                        scoreSpot.textContent = String(score)
                        totalScore = sumArray(allScores)
                        console.log(totalScore)
                        total.textContent = 'Total Score: ' + totalScore
                        // console.log(wzPlayerName)




                        return score
                    }
                    games.append(elims) // CURRENT ONE WORKING
                    games.append(place) // CURRENT ONE WORKING
                    games.append(scoreSpot)
                    games.append(scoreButton)
                    teamElement.append(games) // CURRENT ONE WORKING
                    teamElement.append(total)

                }
            }
        } else { // this executes if the wz box was not checked
            for (let i = 1; i <= Number(Object.values(createdTourney)[0]); i++){ // for the number of teams, create a multiplier, defaulted to 1 bc most are 1
                let multiValue = document.createElement('input')
                let pTag = document.createElement('p')
                pTag.innerHTML = `multi ${i}`
                multiValue.type = 'input'
                multiValue.id = `place${i}`
                multiValue.value = '1'
                multiplierList.append(pTag)
                multiplierList.append(multiValue)
            }
            bracketContainer?.append(multiplierList)
            bracketContainer?.append(squad)

            console.log(`Object.values(createdTourney) = ${Object.values(createdTourney)}`) // 5,1,1,1,true
            console.log(Object.keys(createdTourney)) // ['teams', 'playersPerTeam', 'games', 'lowsToDrop', 'warzone']
            
            for (let i = 1; i <= Number(Object.values(createdTourney)[0]); i++){ // This creates the number of teams, a vertical stack, children of bracketContainer
                let teamElement = document.createElement(`teamElement`) 
                teamElement.innerText = `Team ${i}`
                squad?.append(teamElement) // CURRENT ONE WORKING
                let team = document.createElement('team') // this is where each team player name input should go
                team.id = 'team'
                let total = document.createElement('total')
                total.id = `total${i}`
                total.textContent = 'Total Score: '
                let allScores: any[] = []


                // these should be children of each team
                // creating each player input
                for (let x = 0; x < Number(Object.values(createdTourney)[1]); x++){ // This creates the player name inputs in each vertical team line
                    // // // console.log(`player${i}`)
                    let playerName = document.createElement('input')
                    playerName.type = 'input'
                    playerName.id = `player${x+1}`
                    playerName.placeholder = `player ${x+1} input`
                    team.append(playerName)
                    teamElement.append(team)
                    
                }

                // creating each game input necessary
                for (let y = 0; y < Number(Object.values(createdTourney)[2]); y++){ // This creates the game section
                    // let gameInfo = document.createElement('div') // Need elims (editable input), placement(editable input), and a total score output (not editable)
                    let elims = document.createElement('input') //as HTMLInputElement
                    let place = document.createElement('input')
                    let games = document.createElement(`game`) // this is where the elims, place and scores go
                    let scoreSpot = document.createElement('score') as HTMLInputElement
                    let scoreButton = document.createElement('button')
                    
                    allScores.push(0)
                    // console.log(allScores)
                    games.id = `game${y+1}`
                    elims.type = 'input'
                    place.type = 'input'
                    elims.id = `t${i}g${y+1}`

                    place.id = `placet${i}g${y+1}`
                    elims.placeholder = `elims for game ${y+1}`
                    place.placeholder = `placement for game ${y+1}`
                    scoreSpot.id = `scoret${i}g${y+1}`
                    scoreSpot.textContent = String(score)
                    scoreButton.id = `scoreButtont${i}g${y+1}`
                    scoreButton.type = 'button'
                    scoreButton.innerHTML = 'Update Score'
                    scoreButton.onclick = () =>{
                        let specificScore = document.getElementById(`t${i}g${y+1}`) as HTMLInputElement
                        let placeValue = (document.getElementById(`placet${i}g${y+1}`) as HTMLInputElement).value // What place the team came in
                        let multiplier = (document.getElementById(`place${placeValue}`) as HTMLInputElement).value // Multiplier you get for your placement
                        let totalScore = 0
                        // console.log(`totalScore should be added together and is is ${totalScore}`)
                        // console.log(`Final Score should be elims, ${Number(specificScore.value)} * placement multiplier, ${Number(multiplier)}`)
                        score = (Number(specificScore.value)*(Number(multiplier)))
                        allScores.splice(y,1,score)
                        // console.log(`all scores is ${allScores}`)
                        scoreSpot.textContent = String(score)
                        totalScore = sumArray(allScores)
                        // console.log(totalScore)
                        total.textContent = 'Total Score: ' + totalScore
                        return score
                    }
                    games.append(elims) // CURRENT ONE WORKING
                    games.append(place) // CURRENT ONE WORKING
                    games.append(scoreSpot)
                    games.append(scoreButton)
                    teamElement.append(games) // CURRENT ONE WORKING
                    teamElement.append(total)

                }
            }
        }
    }



    function checkApi() {
        let matchString = '752505576671720088'
        var myHeaders = new Headers();

        var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

        fetch(`https://www.callofduty.com/api/papi-client/crm/cod/v2/title/mw/platform/battle/fullMatch/wz/${matchString}/it`)
        .then(response => response.json())
        .then(data => {
            console.log((data)['data']['allPlayers'][0]['player']['username']) // Player in game name
            console.log((data)['data']['allPlayers'][0]['playerStats']['kills']) // Player kills
            console.log((data)['data']['allPlayers'][0]['playerStats']['teamPlacement']) // Place
            console.log((data)['data']['allPlayers'].length)
            // let player = data[1]
        })
        // .then(result => console.log(result))
        .catch(error => console.log('error', error));
    }

    return (<>
        <h1>Active Tournament</h1>
        <button onClick={() => createTeamList()}>Create/Reset Bracket</button>
        <button onClick={() => checkApi()}>check api</button>
        <div className="bracketContainer" id="bracketContainer"></div>
    </>)
}
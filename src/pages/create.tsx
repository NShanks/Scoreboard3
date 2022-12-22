import React from "react";
import { useForm } from 'react-hook-form'
import './create.css'

import { useCollectionData } from 'react-firebase-hooks/firestore'
import firebase from 'firebase/compat/app'


type Scoreboard = {
    teams: number
    playersPerTeam: number
    games: number
    lowsToDrop: number
    warzone: boolean
    active: boolean
}

export let createdTourney = {}

export default function Create(){
    const firestore = firebase.firestore()

    const {register, handleSubmit, formState: {errors}} = useForm<Scoreboard>()
    let newBox = document.getElementById('tournamentContainer') // Getting a js variable attached to the html section

    const boxRef = firestore.collection('box') // trying to store the boxes i make in firebase
    const query = boxRef.orderBy('createdAt')
    // const [box] = useCollectionData(query, {idField: 'id'})
    
    const onSubmit = handleSubmit((data) => { // Take the form data and make a little box with the relevant info
                                              // Add buttons to activate/edit each little box
        let temp // creating a variable to attach the data to as a string
        temp = JSON.stringify(data)
        createdTourney = JSON.parse(temp) // taking the json string and making it a json object
        console.log(`You just created ${temp}`)

        let setActive = document.createElement('input')// Creating Buttons
        setActive.type = 'button'
        setActive.value = 'Set Active'
        setActive.onclick = () => {alert("SETTING ACTIVE?!")}
        let editTourney = document.createElement('input')
        editTourney.type = 'button'
        editTourney.value = 'Edit'
        editTourney.onclick = () => {alert("EDITING?!")}
        let delBtn = document.createElement('input')
        delBtn.type = 'button'
        delBtn.value = 'Delete'
        delBtn.addEventListener("click", function() {this.parentElement?.remove()})

        let div = document.createElement("div") // creating a new div to stick the json object into. this is the little box
        div.append(temp) // appending the json string to the div to display on the page
        div.append(setActive)
        div.append(editTourney)
        div.append(delBtn)
        newBox?.append(div) // appending the div that has the json string to the js variable attached to the html section
    })

    return (<>
    <h1>Create a Tournament here</h1>
    <main>
        <form onSubmit={onSubmit}>
            <div>
                <label htmlFor="teams">Teams</label>
                <input {...register('teams', { required: true })} id="teams" name="teams" type="number"/>
                {
                    errors.teams && <div className="error">Enter the number of teams</div>
                }
            </div>
            <div>
                <label htmlFor="playersPerTeam">Players Per Team</label>
                <input {...register('playersPerTeam', { required: true })} id="playersPerTeam" name="playersPerTeam" type="number"/>
                {
                    errors.playersPerTeam && <div className="error">Enter the number of players per team</div>
                }
            </div>
            <div>
                <label htmlFor="games">Games</label>
                <input {...register('games', { required: true })} id="games" name="games" type="number"/>
                {
                    errors.games && <div className="error">Enter the number of games</div>
                }
            </div>
            <div>
                <label htmlFor="lowsToDrop">Number of Low Games Dropped</label>
                <input {...register('lowsToDrop', { required: true })} id="lowsToDrop" name="lowsToDrop" type="number"/>
                {
                    errors.lowsToDrop && <div className="error">Enter the number of low scoring games to drop</div>
                }
            </div>
            <div>
                <label htmlFor="warzone">Warzone</label>
                <input {...register('warzone')} id="warzone" name="warzone" type="checkbox"/>
            </div>
            <button>Submit</button>
            <input type="submit" value="Submit Two" />
        </form>
        <br></br>
        <div className="tournamentContainer" id="tournamentContainer">
        </div>
    </main>
    </>)
}
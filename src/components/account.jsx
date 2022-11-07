import React, { Component } from 'react';

class Account extends Component {
    state = {
        loading: true,
        data: null,
    };

    async componentDidMount() {
        const url = "https://api.wynncraft.com/v2/player/JajmeLesLjcornes/stats";
        const response = await fetch(url);
        const data = await response.json();

        console.log(data);
        this.setState({ loading: false, data: data.data });
    }

    DisplayCharacter = (characterId, character) => {
        if (characterId === "");
        return (
            <div>
                {character.type}<br/>
                Combat Level: {character.professions["combat"].level}<br/>
                Profession Level: {character.professions["combat"].level}<br/>
                Total Level: {character.professions["combat"].level}<br/>
            </div>
        );
    }

    DisplayAccount = (accountData) => {
        if (accountData === null)
            return;
        const characterList = [];

        for (const [characterId, character] of Object.entries(accountData.characters))
            characterList.push(
                <li>
                    {this.DisplayCharacter(characterId, character)}<br/>
                </li>
            );
        return (
            <div>
                <h2>{accountData.username}</h2>
                Characters:
                <ul>
                    {characterList}
                </ul>
            </div>
        );
    }

    DisplayData = () => {
        if (!("data" in this.state) || this.state.loading === true)
            return;
        const accountList = [];

        this.state.data.forEach(account => (
            accountList.push(
                this.DisplayAccount(account)
            )
        ));
        return (
            <div>
                {accountList}
            </div>
        );
    }

    render() {
        return (
            <div>
                {this.state.loading || !this.state.data ?
                    <>Loading...</>
                    :
                    this.DisplayData()
                }
            </div>
        );
    }
}

export default Account;

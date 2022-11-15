import React, { Component } from 'react';
import Character from './character';

class Account extends Component {
    state = {
        loading: true,
        data: null,
    };

    async componentDidMount() {
        if (this.props === null || this.props.username === null)
            return;
        const url = "https://api.wynncraft.com/v2/player/" + this.props.username + "/stats";
        const response = await fetch(url);
        const data = await response.json();

        this.setState({ loading: false, data: data.data });
    }

    DisplayAccount = (accountData) => {
        if (accountData === null)
            return;
        const characterList = [];
        let accountTag = "DEFAULT";

        for (const [characterId, character] of Object.entries(accountData.characters))
            characterList.push(
                <div>
                    <Character characterId={characterId} character={character} /><br />
                </div>
            );
        if (accountData.meta !== null && accountData.meta.tag !== null && accountData.meta.tag.value !== null)
            accountTag = accountData.meta.tag.value.toUpperCase().replace("+", "p");
        return (
            <div className="Account">
                <h2 className="UserName">
                    <img className={"FullSkin " + accountTag}
                        src={"https://visage.surgeplay.com/full/512/" + accountData.uuid}
                        alt="" />
                    - {accountData.username}
                </h2>
                {characterList}
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

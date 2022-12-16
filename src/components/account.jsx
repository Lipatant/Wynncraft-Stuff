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
                <h1 className={"UserName " + accountTag}>
                    {accountData.username}
                </h1>
                <div className="AccountData">
                    <div className="AccountDataBox">
                        <img className="FullSkin DEFAULT"
                            src={"https://visage.surgeplay.com/full/512/" + accountData.uuid}
                            alt="" />
                    </div>
                    {
                        ("meta" in accountData && "location" in accountData.meta && accountData.meta.location.online)
                        ?
                        <div className="AccountDataBox OnlineStatus">
                            <img className="OnlineIcon"
                                src="https://cdn.wynncraft.com/nextgen/guilds/online-image.webp"
                                alt="Online"/>
                            <h1>{accountData.meta.location.server}</h1>
                        </div>
                        :
                        ""
                    }
                    <div className="AccountDataBox">
                        <h1>{characterList.length}</h1>
                        <h2>Characters</h2>
                    </div>
                    {
                        ("guild" in accountData && "name" in accountData.guild && accountData.guild.name !== null)
                            ?
                            <div className="AccountDataBox Guild">
                                <img className="GuildIcon"
                                    src="https://cdn.wynncraft.com/nextgen/guilds/members-image.webp"
                                    alt="Guild"/>
                                <h2>{accountData.guild.name} ({accountData.guild.rank.toLowerCase()})</h2>
                            </div>
                            :
                            ""
                    }
                    <div className="AccountDataBox">
                        <h1>{Math.floor(accountData.meta.playtime / 60)}h played</h1>
                        <h2>{accountData.global.logins} logins</h2>
                        <h2>{accountData.global.deaths} deaths</h2>
                    </div>
                </div>
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

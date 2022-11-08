import React, { Component } from 'react';
import GraphBar from './graphBar';

function FirstUppercase(string) {
    return (string.charAt(0).toUpperCase() + string.slice(1).toLowerCase());
}

class Account extends Component {
    state = {
        loading: true,
        data: null,
    };

    async componentDidMount() {
        if (this.props === null || this.props.userName === null)
            return;
        const url = "https://api.wynncraft.com/v2/player/" + this.props.userName + "/stats";
        const response = await fetch(url);
        const data = await response.json();

        this.setState({ loading: false, data: data.data });
    }

    DisplaySkills = (skills) => {
        const skillDataList = {
            strength: { display: "Strenght", style: { width: "0%", "background-color": "green" } },
            dexterity: { display: "Dexterity", style: { width: "0%", "background-color": "yellow" } },
            intelligence: { display: "Intelligence", style: { width: "0%", "background-color": "cyan" } },
            defence: { display: "Defence", style: { width: "0%", "background-color": "red" } },
            agility: { display: "Agility", style: { width: "0%", "background-color": "white" } },
        };
        const skillDataGraphBar = [];
        const skillList = [];
        let skillTotal = 0;

        for (const [skillId, skillValue] of Object.entries(skills))
            for (const [skillDataId] of Object.entries(skillDataList))
                if (skillId === skillDataId)
                    skillTotal += skillValue;
        for (const [skillId, skillValue] of Object.entries(skills)) {
            if (skillId in skillDataList) {
                skillList.push(
                    <li key={skillId}>
                        {skillDataList[skillId].display}: <b>{skillValue}</b>
                    </li>);
                skillDataList[skillId].style.width = String(skillValue / skillTotal * 100) + "%";
                skillDataGraphBar.push(skillDataList[skillId].style);
            }
        };
        return (
            <div className="Skils">
                Skill Points: <b>{skillTotal}</b>
                <GraphBar width="200px" border="2px solid #624E3C" border-radius="2px" box-shadow="rgba(0, 0, 0, 0.35) 0px 5px 15px" data={skillDataGraphBar} />
                <ul>
                    {skillList}
                </ul>
            </div>
        )
    };

    DisplayGamemodes = (gamemode) => {
        const gamemodeList = [];

        if (gamemode === null)
            return;
        for (const [gamemodeId, gamemodeActive] of Object.entries(gamemode))
            if (gamemodeActive)
                gamemodeList.push(
                    <img className="GamemodeIcon"
                        src={"/img/gamemodes/" + gamemodeId.toLowerCase() + ".webp"}
                        alt={FirstUppercase(gamemodeId)} />);
        if (gamemodeList.length >= 1) {
            gamemodeList.unshift(" (+");
            gamemodeList.push(")");
        }
        return (gamemodeList);
    }

    DisplayCharacter = (characterId, character) => {
        const textureNameAliases = {
            "hunter": "archer",
            "knight": "warrior",
            "ninja": "assassin",
            "darkwizard": "mage",
            "skyseer": "shaman",
        }
        let textureName = "";
        let characterName = "";
        const levels = {
            combat: 0,
            professions: 0,
            total: 0,
        };

        if (characterId === "");
        textureName = character.type.toLowerCase();
        for (const [textureNameOriginal, textureNameAlias] of Object.entries(textureNameAliases)) {
            if (textureName === textureNameOriginal)
                textureName = textureNameAlias;
        }
        characterName = character.type.charAt(0).toUpperCase() + character.type.slice(1).toLowerCase();
        if (characterName.toUpperCase() === "DARKWIZARD")
            characterName = "Dark Wizard";
        for (const [profession, professionData] of Object.entries(character.professions)) {
            if (profession === "combat")
                levels.combat += professionData.level;
            else
                levels.professions += professionData.level;
            levels.total += professionData.level;
        }
        return (
            <div className="Character">
                <div className="Full">
                    <img className="ClassFull"
                        src={"/img/class/full/" + textureName.toLowerCase() + ".webp"}
                        alt="" />
                </div>
                <div className="Name">
                    <img className="ClassIcon"
                        src={"/img/class/icon/" + textureName.toLowerCase() + ".webp"}
                        alt="" />
                    <b className="Text">
                        <b>- {characterName}</b>
                        {this.DisplayGamemodes(character.gamemode)}
                    </b>
                </div>
                <div className="Content">
                    Combat Level: <b>{levels.combat}</b><br />
                    Profession Level: <b>{levels.professions}</b><br />
                    Total Level: <b>{levels.total}</b><br />
                    {this.DisplaySkills(character.skills)}
                </div>
            </div>
        );
    }

    DisplayAccount = (accountData) => {
        if (accountData === null)
            return;
        const characterList = [];
        let accountTag = "DEFAULT";

        for (const [characterId, character] of Object.entries(accountData.characters))
            characterList.push(
                <div>
                    {this.DisplayCharacter(characterId, character)}<br />
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

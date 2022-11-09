import React, { Component } from 'react';
import ClassImg from './classImg';
import GraphBar from './graphBar';
import SkillsLevelBar from './skills/levelBar';

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
            strength: { display: "Strenght", style: { width: "0%", "backgroundColor": "#43D133" } },
            dexterity: { display: "Dexterity", style: { width: "0%", "backgroundColor": "#CFD133" } },
            intelligence: { display: "Intelligence", style: { width: "0%", "backgroundColor": "#33D1D0" } },
            defence: { display: "Defence", style: { width: "0%", "backgroundColor": "#D13333" } },
            agility: { display: "Agility", style: { width: "0%", "backgroundColor": "#D1D1D1" } },
        };
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
            }
        };
        return (
            <div className="Skills">
                Skill Points: <b>{skillTotal}</b>
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

    DisplayLevelBar = (level, maxLevel, className = "") => {
        const data = [
            {
                "height": String((1 - level / maxLevel) * 100) + "%",
                "width": "100%",
                "backgroundColor": "none",
            },
            {
                "height": String(level / maxLevel * 100) + "%",
                "width": "100%",
                "className": "FullPart",
                "content": (level > 0 ? String(level) : ""),
            },
        ]

        return (
            <GraphBar className={"LevelBar " + className} height="100%" backgroundColor="none" data={data} />
        );
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
            combatMax: 0,
            professions: 0,
            professionsMax: 0,
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
            if (profession === "combat") {
                levels.combat += professionData.level;
                levels.combatMax += 106;
            } else {
                levels.professions += professionData.level;
                levels.professionsMax += 132;
            }
            levels.total += professionData.level;
        }
        return (
            <div className="Character">
                {this.DisplayLevelBar(levels.combat, levels.combatMax, "CombatLevelBar")}
                {this.DisplayLevelBar(levels.professions, levels.professionsMax, "ProfessionLevelBar")}
                <SkillsLevelBar skills={character.skills} />
                <div className="Full">
                    <ClassImg className="ClassFull" file="/full/%.webp" classId={character.type} />
                </div>
                <div className="Name">
                    <ClassImg className="ClassIcon" file="/icon/%.webp" classId={character.type} href="https://wynncraft.com/help/classes?class=%"/>
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

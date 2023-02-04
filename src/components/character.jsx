import React, { Component } from 'react';
import ClassImg from './classImg';
import GraphBar from './graphBar';
import ProfessionElement from './profession/element';
import SkillsLevelBar from './skills/levelBar';

function FirstUppercase(string) {
    return (string.charAt(0).toUpperCase() + string.slice(1).toLowerCase());
}

class Character extends Component {
    state = {
        display: "Small",
    };

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
                        src={process.env.PUBLIC_URL + "/img/gamemodes/" + gamemodeId.toLowerCase() + ".webp"}
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
                "height": String((1 - (level > maxLevel ? maxLevel : level) / maxLevel) * 100) + "%",
                "width": "100%",
                "backgroundColor": "none",
            },
            {
                "height": String((level > maxLevel ? maxLevel : level) / maxLevel * 100) + "%",
                "width": "100%",
                "className": "FullPart",
                "content": (level > 0 ? String(level) : ""),
            },
        ]

        return (
            <GraphBar className={"LevelBar " + className} height="100%" backgroundColor="none" data={data} />
        );
    }

    ClickCharacterWindow = () => {
        this.setState({
            display: (this.state.display === "Small" ? "Big" : "Small")
        })
    }

    DisplayCharacterWindow = (characterId, character) => {
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
        const professionList = [];

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
                levels.combatMax += 105;
            } else {
                professionList.push(<ProfessionElement profession={profession} professionLevel={professionData.level} />);
                levels.professions += professionData.level;
                levels.professionsMax += 132;
            }
            levels.total += professionData.level;
        }
        return (
            <div className={"Window Character " + this.state.display}>
                <div className="LevelBars">
                    {this.DisplayLevelBar(levels.combat, levels.combatMax, "CombatLevelBar")}
                    {this.DisplayLevelBar(levels.professions, levels.professionsMax, "ProfessionLevelBar")}
                    <SkillsLevelBar skills={character.skills} />
                </div>
                <div className="Full" onClick={this.ClickCharacterWindow}>
                    <ClassImg className="ClassFull" file="/full/%.webp" classId={character.type} />
                </div>
                <div className="Name">
                    <ClassImg className="ClassIcon" file="/icon/%.webp" classId={character.type} href="https://wynncraft.com/help/classes?class=%" />
                    <b className="Text">
                        <b>{characterName}</b>
                        {this.DisplayGamemodes(character.gamemode)}
                    </b>
                </div>
                <div className="Content">
                    <h2><u>{Math.floor(character.playtime / 60 * 4.7)}h</u> played, <u>{character.logins}</u> logins and <u>{character.deaths}</u> deaths</h2>
                    <div className="ProfessionList">
                        {professionList}
                    </div>
                </div>
            </div>
        );
    }
//    <ClassImg className="ClassIcon" file="/icon/%.webp" classId={character.type} href="https://wynncraft.com/help/classes?class=%" />

    render() {
        const required = ["character"];

        if (this.props === null) return ("");
        for (const element of required)
            if (!(element in this.props))
                return ("");
        return (
            this.DisplayCharacterWindow(this.props.characterId, this.props.character)
        );
    }
}

export default Character;

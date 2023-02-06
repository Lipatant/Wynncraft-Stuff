import { Component } from 'react';
import CharacterGamemodes from './character/gamemodes';
import CharacterName from './character/name';
import ClassImg from './classImg';
import GraphBar from './graphBar';
import SkillsLevelBar from './skills/levelBar';

function TryValue(object, key, defaultValue = "") {
    if ((typeof object) == "object" && key in object)
        return object[key];
    return defaultValue;
}

function TryInCharacter(object, key, defaultValue = "") {
    if ((typeof object) == "object" && "character" in object)
        return TryValue(object.character, key, defaultValue);
    return defaultValue;
}

class CharacterCard extends Component {
    CombatLevelBar = () => {
        let combatLevel = 0;
        let professionLevel = 0;
        const maxCombatLevel = 105;
        let maxProfessionLevel = 0;
        for (const [profession, professionData] of Object.entries(TryInCharacter(this.props, "professions", {}))) {
            if (profession === "combat")
                combatLevel += professionData.level;
            else {
                professionLevel += professionData.level;
                maxProfessionLevel += 132;
            }
        }
        const dataCombat = [
            {
                "height": String((1 - (combatLevel > maxCombatLevel ? maxCombatLevel : combatLevel) / maxCombatLevel) * 100) + "%",
                "width": "100%",
                "backgroundColor": "none",
            },
            {
                "height": String((combatLevel > maxCombatLevel ? maxCombatLevel : combatLevel) / maxCombatLevel * 100) + "%",
                "width": "100%",
                "className": "FullPart",
            },
        ]
        const dataProfession = [
            {
                "height": String((1 - (professionLevel > maxProfessionLevel ? maxProfessionLevel : professionLevel) / maxProfessionLevel) * 100) + "%",
                "width": "100%",
                "backgroundColor": "none",
            },
            {
                "height": String((professionLevel > maxProfessionLevel ? maxProfessionLevel : professionLevel) / maxProfessionLevel * 100) + "%",
                "width": "100%",
                "className": "FullPart",
            },
        ]

        return <>
            <GraphBar className={"CombatLevelBar"} data={dataCombat} span={combatLevel} />
            <GraphBar className={"ProfessionLevelBar"} data={dataProfession} span={professionLevel} />
        </>;
    }

    render() {
        return (
            <div className={"CharacterCard " + TryValue(this.props, "className")} key={TryValue(this.props, "characterId")}>
                <CharacterName character={TryValue(this.props, "character", false)} />
                <CharacterGamemodes character={TryValue(this.props, "character", false)} />
                <ClassImg className="Icon" classId={TryInCharacter(this.props, "type", "Warrior")} file="https://cdn.wynncraft.com/nextgen/classes/icons/%?.svg" />
                <ClassImg className="Illustration" classId={TryInCharacter(this.props, "type", "Warrior")} file="https://cdn.wynncraft.com/nextgen/classes/picture/%?_icon.webp" reskins={false} />
                {this.CombatLevelBar()}
                <SkillsLevelBar skills={TryInCharacter(this.props, "skills", {})} />
            </div>
        );
    }
}

export default CharacterCard;

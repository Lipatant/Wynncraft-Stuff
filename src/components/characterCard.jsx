import { Component } from 'react';
import CharacterName from './character/name';
import ClassImg from './classImg';

function TryValue(object, key, defaultValue = "")
{
    if ((typeof object) == "object" && key in object)
        return object[key];
    return defaultValue;
}

function TryInCharacter(object, key, defaultValue = "")
{
    if ((typeof object) == "object" && "character" in object)
        return TryValue(object.character, key, defaultValue);
    return defaultValue;
}

class CharacterCard extends Component {
    render() {
        return (
            <div className={"CharacterCard " + TryValue(this.props, "className")} key={TryValue(this.props, "characterId")}>
                <ClassImg className="Illustration" classId={TryInCharacter(this.props, "type", "Warrior")} file="https://cdn.wynncraft.com/nextgen/classes/picture/%?_icon.webp" reskins={false}/>
                <CharacterName character={TryValue(this.props, "character", false)} />
                <ClassImg className="Icon" classId={TryInCharacter(this.props, "type", "Warrior")} file="https://cdn.wynncraft.com/nextgen/classes/icons/%?.svg" />
            </div>
        );
    }
}

export default CharacterCard;

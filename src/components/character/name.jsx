import { Component } from 'react';

function GetClassName(character)
{
    let characterName = "???";

    if ((typeof character) != "object" || !("type" in character) || (typeof character.type) != "string")
        return characterName;
    characterName = character.type.charAt(0).toUpperCase() + character.type.slice(1).toLowerCase();
    if (characterName.toUpperCase() === "DARKWIZARD")
        return "Dark Wizard";
    return characterName;
}

function TryValue(object, key, defaultValue = "")
{
    if ((typeof object) == "object" && key in object)
        return object[key];
    return defaultValue;
}

class CharacterName extends Component {
    render() {
        return (
            <span className={"CharacterName " + TryValue(this.props, "className")}>
                {GetClassName(TryValue(this.props, "character", false))}
            </span>
        );
    }
}

export default CharacterName;

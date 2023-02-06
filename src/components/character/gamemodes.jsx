import { Component } from 'react';

function FirstUppercase(string) {
    return (string.charAt(0).toUpperCase() + string.slice(1).toLowerCase());
}

function TryValue(object, key, defaultValue = "")
{
    if ((typeof object) == "object" && key in object)
        return object[key];
    return defaultValue;
}

class CharacterGamemodes extends Component {
    state = {
        gamemodeList: null,
    }

    DisplayGamemodes = (gamemode) => {
        const gamemodeList = [];

        for (const [gamemodeId, gamemodeActive] of Object.entries(gamemode))
            if (gamemodeActive)
                gamemodeList.push(
                    <img className={"CharacterGamemode " + FirstUppercase(gamemodeId)} key={gamemodeId}
                        src={process.env.PUBLIC_URL + "/img/gamemodes/" + gamemodeId.toLowerCase() + ".webp"}
                        alt={FirstUppercase(gamemodeId)} />);
        return (gamemodeList);
    }

    componentDidMount() {
        if (!("character" in this.props))
            return;
        this.setState({gamemodeList: this.DisplayGamemodes(TryValue(this.props.character, "gamemode", {}))})
    }

    render() {
        return (
            <div className={"CharacterGamemodeWrapper " + TryValue(this.props, "className")}>
                {this.state.gamemodeList === null ? "" : this.state.gamemodeList}
            </div>
        );
    }
}

export default CharacterGamemodes;

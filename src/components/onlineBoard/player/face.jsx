import { Component } from 'react';

class OnlineBoardPlayerFace extends Component {
    state = {
        loading: true,
        data: null,
    };

    async componentDidMount() {
        if (this.props === null || !("Player" in this.props))
            return;
        const url = "https://api.wynncraft.com/v2/player/" + this.props.Player + "/uuid";
        const response = await fetch(url);
        const data = await response.json();

        this.setState({ loading: false, data: data });
    }

    GetPlayerUUID = () => {
        if (this.state.loading)
            return null;
        if (!("data" in this.state) || this.state.loading === true || !("data" in this.state.data))
            return null;
        console.log(this.state.data);
        if (this.state.data.data.length < 1 || !("uuid" in this.state.data.data[0]))
            return null;
        return this.state.data.data[0].uuid;
    }

    DisplayPlayerFace = (playerName) => {
        let playerUUID = this.GetPlayerUUID();

        if (playerUUID === null)
            return playerName;
        return <img
            className={"FaceSkin"}
            src={"https://visage.surgeplay.com/bust/100/" + playerUUID}
            alt="" />;
    }

    render() {
        if (this.props === null || this.props.Player === null)
            return;
        return <span
                className={"PlayerFace " + ("className" in this.props ? this.props.className : "")}>
                {this.DisplayPlayerFace(this.props.Player)}
            </span>;
    }
}
export default OnlineBoardPlayerFace;

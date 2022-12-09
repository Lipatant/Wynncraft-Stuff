import { Component } from 'react';
import OnlineBoardPlayer from './player'

class OnlineBoardWorld extends Component {
    state = {
        loading: true,
        playerListNames: [],
    };

    RandomPlayer = (WorldData) => {
        if (WorldData === null)
            return null;
        return WorldData[Math.floor(Math.random()*WorldData.length)];
    }

    render() {
        const playerList = [];

        if (this.props === null || this.props.World === null || this.props.WorldData === null)
            return;
        if (this.state.loading) {
            const playerListNames = []
        if (this.props.WorldData.length > 1)
            playerListNames.push(this.RandomPlayer(this.props.WorldData));
            this.setState({ loading: false, playerListNames: playerListNames });
        }
        for (const playerName of this.state.playerListNames)
            playerList.push(<OnlineBoardPlayer Player={playerName} World={this.props.World}/>);
        return (
            <div className="World">
                <div className="PlayerList">
                    {playerList}
                </div>
            </div>
        )
    }
}
export default OnlineBoardWorld;

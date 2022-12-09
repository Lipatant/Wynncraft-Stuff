import { Component } from 'react';
import OnlineBoardWorld from './onlineBoard/world';

class OnlineBoard extends Component {
    state = {
        loading: true,
        data: null,
    };

    async componentDidMount() {
        const url = "https://api.wynncraft.com/public_api.php?action=onlinePlayers";
        const response = await fetch(url);
        const data = await response.json();

        this.setState({ loading: false, data: data });
    }

    DisplayData = () => {
        const worldList = [];

        if (!("data" in this.state) || this.state.loading === true)
            return;
        for (const [worldName, worldPlayerList] of Object.entries(this.state.data))
            if (worldName.match("^WC[1-9][1-9]*$"))
                worldList.push(<OnlineBoardWorld World={worldName} WorldData={worldPlayerList} key={worldName} />)
        return(
            <>{worldList}</>
        )
    }

    render() {
        return (
            <div className="OnlineBoard">
                {this.state.loading || !this.state.data ?
                    <>Loading...</>
                    :
                    this.DisplayData()
                }
            </div>
        )
    }
}
export default OnlineBoard;

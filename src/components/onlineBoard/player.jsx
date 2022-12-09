import { Component } from 'react';
import OnlineBoardPlayerFace from './player/face'

class OnlineBoardPlayer extends Component {
    render() {
        if (this.props === null || this.props.Player === null)
            return;
        return (
            <a className="Window Player" href={"/Wynncraft-Stuff?player=" + this.props.Player}>
                <OnlineBoardPlayerFace Player={this.props.Player} />
                <h2 className="Name">
                    {this.props.Player}<br />
                    <span className="WorldName">
                        World: {"World" in this.props ? this.props.World : "?"}
                    </span>
                </h2>
            </a>
        )
    }
}
export default OnlineBoardPlayer;

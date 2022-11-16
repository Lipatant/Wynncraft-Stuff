import { Component } from 'react';
import GraphBar from '../graphBar';
import ProfessionIcon from './icon';

class ProfessionElement extends Component {
    state = {
    };

    render() {
        const required = ["profession"];

        if (this.props === null) return ("");
        for (const element of required)
            if (!(element in this.props))
                return ("");
        return (
            <div className={"ProfessionElement " + ("className" in this.props ? this.props.className : "")}>
                <ProfessionIcon profession={this.props.profession} />
                <span className="ProfessionName Text">
                    {this.props.profession.charAt(0).toUpperCase() + this.props.profession.slice(1).toLowerCase()}
                </span>
                <span className="ProfessionLevel Text">
                    Level: <b>{("professionLevel" in this.props ? this.props.professionLevel : "??")}</b>
                </span>
                <GraphBar
                    className="ProfessionBar"
                    height="1em"
                    width="100%"
                    data={[{width:(("professionLevel" in this.props ? this.props.professionLevel : 0) / 132 * 100) + "%"}]}
                />
            </div>
        );
    }
}

export default ProfessionElement;

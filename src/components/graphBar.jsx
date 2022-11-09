import { Component } from 'react';

class GraphBar extends Component {
    state = {};

    getSingleStyle = (data) => {
        let style = {
            "height": "100%",
            "width": "100%",
            "float": "left",
        };

        if (data === null) return style;
        for (const [dataKey, dataValue] of Object.entries(data))
            style[dataKey] = dataValue;
        return style;
    }

    getWrapperStyle = () => {
        let style = {
            "height": "1em",
            "width": "1em",
            "backgroundColor": "black",
        };

        if (this.props === null) return style;
        for (const [propKey, propValue] of Object.entries(this.props))
            style[propKey] = propValue;
        return style;
    }

    render() {
        const graphList = [];
        let identifier = 0;

        if (this.props === null) return ("");
        if ("data" in this.props && this.props.data != null) {
            this.props.data.forEach(element => {
                graphList.push(
                    <div key={String(identifier)} className={element.className} style={this.getSingleStyle(element)} />
                );
                console.log(element.className);
                identifier += 1;
            });
        }
        return (<div style={this.getWrapperStyle()}>
            {graphList}
        </div>);
    }
}

export default GraphBar;

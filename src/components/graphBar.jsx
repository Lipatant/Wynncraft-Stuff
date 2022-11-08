import { Component } from 'react';

class GraphBar extends Component {
    state = {};

    getSingleStyle = (data) => {
        let style = {
            "height": "100%",
            "width": "0%",
            "background-color": "green",
            "float": "left",
        };

        if (data === null) return style;
        for (const [styleKey] of Object.entries(style))
            if (styleKey in data)
                style[styleKey] = data[styleKey];
        return style;
    }

    getWrapperStyle = () => {
        let style = {
            "height": "1em",
            "width": "1em",
            "background-color": "white",
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
                    <div key={String(identifier)} style={this.getSingleStyle(element)} />
                );
                identifier += 1;
            });
        }
        return (<div style={this.getWrapperStyle()}>
            {graphList}
        </div>);
    }
}

export default GraphBar;

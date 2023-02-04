import { Component } from 'react';

function TryValue(object, key, defaultValue = "") {
    if ((typeof object) == "object" && key in object)
        return object[key];
    return defaultValue;
}

class GraphBar extends Component {
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
            let first = true
            this.props.data.forEach(element => {
                let additionalClassName = ""

                if (first)
                    additionalClassName += "First "
                if (identifier === this.props.data.length - 1)
                    additionalClassName += (first ? " Last " : "Last ")
                first = false
                graphList.push(
                    <div key={String(identifier)}
                        className={"GraphBarSegment " + additionalClassName + ("className" in element ? element.className : "")}
                        style={this.getSingleStyle(element)}>{"content" in element ? element.content : ""}</div>
                );
                identifier += 1;
            });
        }
        return (<div className={"GraphBar " + ("className" in this.props ? this.props.className : "")}
            style={this.getWrapperStyle()}>
            <span>{TryValue(this.props, "span")}</span>
            {graphList}
        </div>);
    }
}

export default GraphBar;

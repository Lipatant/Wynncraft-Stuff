import React, { Component } from 'react';

class ProfessionIcon extends Component {
    state = {
    };

    render() {
        const required = ["profession"];

        if (this.props === null) return ("");
        for (const element of required)
            if (!(element in this.props))
                return ("");
        return (
            <img
                className={"ProfessionIcon " + ("className" in this.props ? this.props.className : "")}
                src={"https://cdn.wynncraft.com/nextgen/classes/professions/&?.webp".replace("&?", this.props.profession.toLocaleLowerCase())}
                alt="" />
        );
    }
}

export default ProfessionIcon;

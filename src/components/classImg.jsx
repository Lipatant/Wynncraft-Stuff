import { Component } from 'react';

function RemoveClassSkin(className, inUpperCase = false) {
    let classReturned = className.toLowerCase();
    const classSkinAliases = {
        "hunter": "archer",
        "knight": "warrior",
        "ninja": "assassin",
        "darkwizard": "mage",
        "dark wizard": "mage",
        "skyseer": "shaman",
    }

    if (classReturned in classSkinAliases)
        classReturned = classSkinAliases[classReturned].toLowerCase();
    if (inUpperCase)
        return (classReturned.toUpperCase());
    return (classReturned);
}

class ClassImg extends Component {
    render() {
        const required = ["classId", "file"];

        if (this.props === null) return ("");
        for (const element of required)
            if (!(element in this.props))
                return ("");
        if ("href" in this.props) {
            return (
                <a href={this.props.href.replace("%", RemoveClassSkin(this.props.classId))} target="_blank" rel="noreferrer">
                    <img className={"className" in this.props ? this.props.className : ""}
                        src={process.env.PUBLIC_URL + "/img/class/" + this.props.file.replace("%", RemoveClassSkin(this.props.classId))}
                        alt="" />
                </a>
            );
        }
        return (
            <img className={"className" in this.props ? this.props.className : ""}
                src={process.env.PUBLIC_URL + "/img/class/" + this.props.file.replace("%", RemoveClassSkin(this.props.classId))}
                alt="" />
        );
    }
}

export default ClassImg;

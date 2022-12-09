import { Component } from 'react';
import GraphBar from '../graphBar';

function CreateBarData(skillId, skillValue, skillsTotal) {
    const skillSymbols = {
        "strength": "✤",
        "dexterity": "✦",
        "intelligence": "❉",
        "defence": "✹",
        "agility": "❋",
    }
    let style = {};

    style.className = skillId.toUpperCase();
    if (skillsTotal > 0)
        style.height = String(skillValue / skillsTotal * 100) + "%";
    else
        style.height = "0px";
    if (skillValue > 0)
        style.content = String(skillValue) + (skillId in skillSymbols ? skillSymbols[skillId] : "");
    else
        return null;
    return style;
}

class SkillsLevelBar extends Component {
    render() {
        const required = ["skills"];
        const skillsDataList = ["strength", "dexterity", "intelligence", "defence", "agility"];
        const dataList = [];
        let skillsTotal = 0;

        // Checks props are valid
        if (this.props === null) return ("");
        for (const element of required)
            if (!(element in this.props))
                return ("");
        //
        for (const [skillId, skillValue] of Object.entries(this.props.skills))
            if (skillsDataList.includes(skillId))
                skillsTotal += skillValue
        for (const [skillId, skillValue] of Object.entries(this.props.skills))
            if (skillsDataList.includes(skillId)) {
                const element = CreateBarData(skillId, skillValue, skillsTotal);
                if (element !== null)
                    dataList.push(element);
            }
        //
        return (
            <GraphBar className={"LevelBar SkillsLevelBar " + ("className" in this.props ? this.props.className : "")}
                height="100%"
                data={dataList}
            />
        );
    }
}

export default SkillsLevelBar;

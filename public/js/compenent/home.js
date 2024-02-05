import { CleanBody } from "./clean.js"
import { Fetch } from "./fetch.js";
import { Header } from "./header.js";
import {containerInfos, containerRation, containerSkills} from "./container.js";

export async function Home() {
    CleanBody()

    var UserDatas = await Fetch("/getUserDatas");
    if (UserDatas.success) {
        let User = UserDatas.datas.user[0]
        let xp = UserDatas.datas.xpTotal.aggregate.sum.amount
        let level = UserDatas.datas.level[0].amount
        let skills = UserDatas.datas.skills

        Header()
        if (User !== null && xp !== null && level !== null && skills !== null){
            containerInfos(User, xp, level)
            containerSkills(skills)
            containerRation(User)
        }
        document.body.style.height = "150vh"
    }
}
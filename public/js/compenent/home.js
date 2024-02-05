import { CleanBody } from "./clean.js"
import { Fetch } from "./fetch.js";
import { Header } from "./header.js";
import {containerInfos, containerRation, containerSkills} from "./container.js";

export async function Home() {
    CleanBody()

    var UserDatas = await Fetch("/getUserDatas");
    if (UserDatas.success) {
        let User = UserDatas.datas.user[0]
        let skills = UserDatas.datas.skills
        let xp = UserDatas.datas.xpTotal.aggregate.sum.amount
        let level = UserDatas.datas.level[0]
        Header()
        if (level && User) {
            containerInfos(User, xp, level.amount)
            containerSkills(skills)
            containerRation(User)
            document.body.style.height = "150vh"
        }
    }
}

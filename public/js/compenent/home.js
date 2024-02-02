import { CleanBody } from "./clean.js"
import { Fetch } from "./fetch.js";
import { Login } from "./login.js"

export async function Home() {
    CleanBody()

    var UserDatas = await Fetch("/getUserDatas");
    if (UserDatas.success) {
        let User = UserDatas.datas.user[0]
        let xp = UserDatas.datas.xpTotal.aggregate.sum.amount
        let level = UserDatas.datas.level[0].amount
        let skills = UserDatas.datas.skills

        document.body.appendChild(createHeader())
        document.body.appendChild(createContainer(User, xp, level))
        document.body.appendChild(createContainerSkills(skills, User))

        const logout = document.getElementById('logout')
        logout.addEventListener('click', async () => {
            const response = await fetch('/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const result = await response.json();

            if (result.success) {
                Login()
            } else {
                alert("Error logout")
            }
        })

        // const actionMouse = document.getElementById('actionMouse')

        // actionMouse.addEventListener('mouseover', (event) => {
        //     // showTooltip(`${label} ${value.toFixed(2)} %`, event);
        //     log(event.target)
        // });

        // path.addEventListener('mouseout', () => {
        //     hideTooltip();
        // });
    }
}

function createHeader() {
    const header = document.createElement('header')
    header.className = "navbar"
    let a = document.createElement('a')
    a.id = 'logout'
    a.style.cursor = "pointer"
    a.className = 'logout-btn'
    a.textContent = `Log Out`
    header.appendChild(a)
    return header
}

function createContainer(User, xp, level) {
    const container = document.createElement('div')
    container.className = "container"
    let infoUser = document.createElement('div')
    infoUser.id = "userInfo"
    container.innerHTML = `
        <div class="userInfo">
            <h2>${User.firstName} ${User.lastName}</h2>
            <h3>${User.login}</h3>
            <h3>${User.email}</h3>
        </div>
        <div class="userInfo">
            <h2>XP Amount </h2>
            <h1>${Math.round(xp / 1000)} kB</h1>
        </div>
        <div class="userInfo">
            <h2>Current Level</h2>
            <h1>${level}</h1>
        </div>
    `
    return container
}

function createContainerSkills(skillsData, User) {
    const barWidth = 50;
    const barGap = 10;
    const maxHeight = 200;
    let contentSVG = ``
    let id = 0
    skillsData.forEach((skill, index) => {
        id++
        let content = document.createElementNS("http://www.w3.org/2000/svg", "text");
        const x = index * (barWidth + barGap) + 50;
        const height = (skill.amount / 100) * maxHeight;


        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('x', x);
        rect.setAttribute('y', maxHeight - height);
        rect.setAttribute('width', barWidth);
        rect.setAttribute('height', height);
        rect.setAttribute('fill', "#0ABFBC");

        contentSVG += rect.outerHTML

        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        // text.setAttribute('x', x + barWidth / 5);
        // text.setAttribute('y', maxHeight + 20);
        applyStyle(text, {
            "x": `${x + barWidth / 5}`,
            "y": `${maxHeight + 20}`,
            "fill": `#FC354C`,
            "font-size": "10px",
            // "font-family": "Arial, sans-serif"
        });
        text.textContent = String(skill.type).replace('skill_', '');
        contentSVG += text.outerHTML

        applyStyle(content, {
            "x": `${(x + barWidth / 5)}`,
            "y": `${maxHeight + 35}`,
            "fill": "#0ABFBC",
            "font-size": "10px",
            "font-family": "Arial, sans-serif"
        });
        content.textContent = `${skill.amount} %`;
        contentSVG += content.outerHTML;
    });

    const total = User.totalDown + User.totalUp;
    const pourcentageDown = ((User.totalDown / total) * 100).toFixed(2);
    const pourcentageUp = ((User.totalUp / total) * 100).toFixed(2);
    const segments = [
        { label: "Total Down", value: pourcentageDown, color: "#FC354C" },
        { label: "Total Up", value: pourcentageUp, color: "#0ABFBC" }
    ];
    let containerRation = ``

    const centerX = 200;
    const centerY = 200;
    const radius = 100;

    let startAngle = 0;

    id = 0
    segments.forEach(item => {
        id++
        const { label, value, color } = item;

        let text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        applyStyle(text, {
            "x": `${id * 120}`,
            "y": "50",
            "fill": `${color}`,
            "font-size": "12px",
            "font-family": "Arial, sans-serif"
        });
        text.textContent = `${label} ${value} %`;
        containerRation += text.outerHTML;

        const angle = (value / 100) * Math.PI * 2;
        const endAngle = startAngle + angle;

        const x1 = centerX + radius * Math.cos(startAngle);
        const y1 = centerY + radius * Math.sin(startAngle);
        const x2 = centerX + radius * Math.cos(endAngle);
        const y2 = centerY + radius * Math.sin(endAngle);

        const path = document.createElement("path");
        path.id = `actionMouse-${id}`
        const largeArcFlag = angle > Math.PI ? 1 : 0;
        const d = [
            `M${centerX},${centerY}`,
            `L${x1},${y1}`,
            `A${radius},${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
            "Z"
        ].join(" ");

        path.setAttribute("d", d);
        path.setAttribute("fill", color);

        containerRation += path.outerHTML

        startAngle = endAngle;
    });

    let text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    applyStyle(text, {
        "x": `${180}`,
        "y": "20",
        "fill": `#000`,
        "font-size": "15px",
        "font-weight": "bold"
    });
    text.textContent = `Ratio ${(pourcentageUp/pourcentageDown).toFixed(1)}`;
    containerRation += text.outerHTML;

    const containerGraphic = document.createElement('div')
    containerGraphic.className = "container-graphic"

    containerGraphic.innerHTML = `
        <div class="graphicBox">
            <h2>Skills</h2>
            <svg class="svg-skill">
                ${contentSVG}
            </svg>
        </div>
        <div class="graphicRatio">
            <h2>Audits Ratio</h2>
            <svg class="svg-ratio">
                ${containerRation}
            </svg>
        </div>
    `
    return containerGraphic
}

function drawCirculaireDiagram(data) {
    const total = data.infos[0].totalDown + data.infos[0].totalUp;
    const pourcentageDown = (data.infos[0].totalDown / total) * 100;
    const pourcentageUp = (data.infos[0].totalUp / total) * 100;
    const svgNS = "http://www.w3.org/2000/svg";
    let containerRation = ``

    const centerX = 200;
    const centerY = 200;
    const radius = 100;

    let startAngle = 0;

    let text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    applyStyle(text, {
        "x": "120",
        "y": "50",
        "fill": "#947fbd",
        "font-size": "24px",
        "font-family": "Arial, sans-serif"
    });
    text.textContent = "Audit Ratio";

    containerRation += text.outerHTML;

    data.forEach(item => {
        const { label, value, color } = item;

        const angle = (value / 100) * Math.PI * 2;
        const endAngle = startAngle + angle;

        const x1 = centerX + radius * Math.cos(startAngle);
        const y1 = centerY + radius * Math.sin(startAngle);
        const x2 = centerX + radius * Math.cos(endAngle);
        const y2 = centerY + radius * Math.sin(endAngle);

        const path = document.createElementNS(svgNS, "path");
        const largeArcFlag = angle > Math.PI ? 1 : 0;
        const d = [
            `M ${centerX} ${centerY}`,
            `L ${x1} ${y1}`,
            `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
            "Z"
        ].join(" ");

        path.setAttribute("d", d);
        path.setAttribute("fill", color);

        path.onmouseover = function (event) {
            showTooltip(`${label} ${value.toFixed(2)} %`, event);
        };

        path.onmouseout = function () {
            hideTooltip();
        };

        svg.appendChild(path);

        startAngle = endAngle;
    });

}

function applyStyle(element, styles) {
    for (let property in styles) {
        element.setAttribute(property, styles[property]);
    }
}

function showTooltip(text, event) {
    let tooltip = document.getElementById('tooltip');
    if (!tooltip) {
        tooltip = document.createElement('div');
        tooltip.id = 'tooltip';
        tooltip.style.position = 'absolute';
        tooltip.style.padding = '5px';
        tooltip.style.background = 'black';
        tooltip.style.color = 'white';
        tooltip.style.borderRadius = '4px';
        tooltip.style.opacity = '0.75';
        document.body.appendChild(tooltip);
    }
    tooltip.textContent = text;
    tooltip.style.left = `${event.clientX}px`;
    tooltip.style.top = `${event.clientY}px`;
    tooltip.style.visibility = 'visible';
}

function hideTooltip() {
    const tooltip = document.getElementById('tooltip');
    if (tooltip) {
        tooltip.style.visibility = 'hidden';
    }
}
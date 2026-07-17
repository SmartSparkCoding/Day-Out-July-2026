// =====================================
// KENT FAMILY DAY OUT SHORTLIST ENGINE
// =====================================


// Attraction database

const attractions = [

{
    id: "chatham",

    name: "The Historic Dockyard Chatham",

    emoji: "🚢",

    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8xwPGeKIhhAtWLKBhjtb0vxnS0twimfyX-OiW_rqwTA&s=10",

    baseScore: 9.3,

    badges:[
        "Best Overall",
        "Teen Friendly",
        "Excellent Accessibility"
    ],


    scores:{
        accessibility:10,
        young:8,
        teen:10,
        value:6,
        weather:9,
        adult:10
    },


    short:
    "A full maritime adventure with ships, submarines and interactive history.",


    details:{

        travel:
        `
        <strong>Distance:</strong> Approximately 35–45 minutes from Great Chart.<br><br>

        Normal route:
        Great Chart → M20 → M2 → Chatham.<br><br>

        Traffic warning:
        Allow extra time during weekday rush hour and school holidays.
        `,


        activities:
        `
        <ul>
        <li>Explore HMS Cavalier</li>
        <li>Enter HM Submarine Ocelot</li>
        <li>Visit HMS Gannet</li>
        <li>Victorian Ropery demonstrations</li>
        <li>Historic dockyard buildings</li>
        <li>Interactive exhibitions</li>
        </ul>
        `,


        accessibility:
        `
        <ul>
        <li>Accessible parking</li>
        <li>Accessible toilets</li>
        <li>Changing Places facilities</li>
        <li>Wheelchair-friendly routes</li>
        <li>Many seating areas</li>
        </ul>
        `,


        family:
        `
        <strong>8–9 year olds:</strong>
        Ships, exploration and interactive exhibits.<br><br>

        <strong>13–14 year olds:</strong>
        One of the strongest choices because of engineering, submarines and technology.<br><br>

        <strong>Adults:</strong>
        Strong historical and engineering interest.
        `,


        verdict:
        `
        Probably the strongest all-round option.
        It balances every generation extremely well and has good weather protection.
        `
    }
},



{
    id:"railway",

    name:"Romney, Hythe & Dymchurch Railway",

    emoji:"🚂",

    image:"https://www.rhdr.org.uk/images/rhdr_content_timetables.jpg",


    baseScore:9.0,


    badges:[
        "Lowest Walking",
        "Best For Grandparents",
        "Unique Experience"
    ],


    scores:{
        accessibility:10,
        young:8,
        teen:7,
        value:8,
        weather:7,
        adult:10
    },


    short:
    "A relaxing miniature steam railway journey across Kent countryside.",


    details:{


        travel:
        `
        <strong>Distance:</strong>
        Approximately 35–45 minutes depending on station.<br><br>

        Best starting points:
        Hythe or New Romney.
        `,


        activities:
        `
        <ul>
        <li>Steam train journey</li>
        <li>Kent countryside views</li>
        <li>Historic railway stations</li>
        <li>Engineering interest</li>
        <li>Photography opportunities</li>
        </ul>
        `,


        accessibility:
        `
        <ul>
        <li>Wheelchair spaces available</li>
        <li>Accessible boarding assistance</li>
        <li>Minimal walking requirement</li>
        <li>Easy pace</li>
        </ul>
        `,


        family:
        `
        <strong>Younger children:</strong>
        Usually love the excitement of the train.<br><br>

        <strong>Teenagers:</strong>
        Depends on interest in transport and engineering.<br><br>

        <strong>Adults:</strong>
        Very relaxing and nostalgic.
        `,


        verdict:
        `
        The safest option if reducing physical effort is the biggest priority.
        `
    }

},



{
    id:"bedgebury",

    name:"Bedgebury National Pinetum & Forest",

    emoji:"🌲",

    image:"https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/dd/5e/7e/bedgebury-pinetum-has.jpg?w=1200&h=-1&s=1",


    baseScore:9.0,


    badges:[
        "Best Value",
        "Outdoor Adventure",
        "Sunny Day Winner"
    ],


    scores:{
        accessibility:8,
        young:10,
        teen:8,
        value:10,
        weather:6,
        adult:8
    },


    short:
    "A flexible outdoor day with forests, trails and adventure areas.",


    details:{


        travel:
        `
        <strong>Distance:</strong>
        Approximately 35–45 minutes by car.
        `,


        activities:
        `
        <ul>
        <li>Accessible woodland routes</li>
        <li>Adventure playgrounds</li>
        <li>Picnic areas</li>
        <li>Nature exploration</li>
        <li>Cycling opportunities</li>
        </ul>
        `,


        accessibility:
        `
        <ul>
        <li>Accessible parking</li>
        <li>Accessible toilets</li>
        <li>Changing Places facility</li>
        <li>Some wheelchair-friendly routes</li>
        </ul>
        `,


        family:
        `
        <strong>Younger children:</strong>
        Excellent freedom and play opportunities.<br><br>

        <strong>Teenagers:</strong>
        Better if they enjoy outdoors, photography or exploring.<br><br>

        <strong>Adults:</strong>
        Relaxed countryside experience.
        `,


        verdict:
        `
        The value champion.
        Best when the weather is good.
        `
    }

}

];





// =====================================
// SLIDER SYSTEM
// =====================================


const sliders = [
    "accessibility",
    "young",
    "teen",
    "value",
    "weather",
    "adult"
];



sliders.forEach(id=>{

    document
    .getElementById(id)
    .addEventListener("input",update);

});





function getWeights(){

    let weights={};

    sliders.forEach(id=>{

        weights[id]=Number(
            document.getElementById(id).value
        );

        document
        .getElementById(id+"Value")
        .textContent=weights[id];

    });


    return weights;

}





// =====================================
// SCORE CALCULATOR
// =====================================


function calculateScore(place,weights){


    let total=0;

    let max=0;


    Object.keys(weights)
    .forEach(category=>{


        total +=
        place.scores[category] *
        weights[category];


        max +=
        10 *
        weights[category];


    });


    return ((total/max)*10).toFixed(2);

}





function update(){


    const weights=getWeights();


    let ranked=
    attractions
    .map(place=>{

        return{

            ...place,

            finalScore:
            calculateScore(
                place,
                weights
            )

        };

    })


    .sort(
        (a,b)=>
        b.finalScore-a.finalScore
    );



    renderCards(ranked);


    document
    .getElementById("winnerName")
    .textContent=
    ranked[0].emoji+
    " "+
    ranked[0].name;



    document
    .getElementById("winnerReason")
    .textContent=
    "Currently best match based on your priorities.";

}







// =====================================
// CARD CREATION
// =====================================


function renderCards(list){


const container=
document.getElementById(
"rankingContainer"
);


container.innerHTML="";



list.forEach((place,index)=>{


let card=document.createElement("div");


card.className=
"attraction-card";



card.innerHTML=`

<div class="attraction-image">

<img 
src="${place.image}" 
alt="${place.name}"
loading="lazy"
>

</div>


<div class="attraction-content">


<h2>
${index===0?"🏆 ":""}
${place.emoji}
${place.name}
</h2>


<div class="score">

${place.finalScore}/10

</div>


<div class="badges">

${place.badges
.map(
b=>`<span class="badge">${b}</span>`
)
.join("")}

</div>


<p>
${place.short}
</p>



<button onclick="openModal('${place.id}')">

Show Full Overview

</button>


</div>

`;


container.appendChild(card);


});


}





// =====================================
// MODAL SYSTEM
// =====================================


function openModal(id){


const place=
attractions.find(
x=>x.id===id
);



document
.getElementById("modalBody")
.innerHTML=`

<h1>
${place.emoji}
${place.name}
</h1>


<h2>
Full Family Overview
</h2>


<div class="detail-section">

<h3>
📍 Travel
</h3>

${place.details.travel}

</div>



<div class="detail-section">

<h3>
🎯 Activities
</h3>

${place.details.activities}

</div>



<div class="detail-section">

<h3>
♿ Accessibility
</h3>

${place.details.accessibility}

</div>



<div class="detail-section">

<h3>
👨‍👩‍👧 Family Suitability
</h3>

${place.details.family}

</div>



<div class="detail-section">

<h3>
⭐ Verdict
</h3>

${place.details.verdict}

</div>

`;



document
.getElementById("infoModal")
.classList.add("active");


}




document
.querySelector(".close-modal")
.onclick=function(){

document
.getElementById("infoModal")
.classList.remove("active");

};



document
.getElementById("infoModal")
.onclick=function(e){

if(e.target.id==="infoModal"){

this.classList.remove("active");

}

};




// Start page

update();
'use strict';
let colors = ['#2E3F4F', '#489C85', '#A2B55B', '#E99E32', '#B54A37'];
document.getElementsByClassName("page-reload")[0].style.display ="none";
let canvas = [];
let generateCanvas = () => {
    const numberOfCanvas = ["3", "4", "5"];
    const canvasLength = _.sample(numberOfCanvas);
    for (let i = 0; i < canvasLength; i++) {
        appendCanvasElement(i);
        canvas.push(new fabric.Canvas("id_"+i,{
            backgroundColor: "#ffffff",
            width: 500,
            height: 160,
            targetFindTolerance: 2,
            selection: false,
            hoverCursor: 'pointer'
        }));
        console.log("1",canvas);
    }
    document.getElementsByClassName("generate")[0].style.display = "none";
    document.getElementsByClassName("page-reload")[0].style.display = "block";
};

const appendCanvasElement = (i) => {
    let heightElement = document.createElement("div");
    heightElement.setAttribute("class","height-20");

    /**
     * adding canvas randomly while creating from generate button
     * @type {Element}
     */
    const getElement = document.getElementsByClassName("canvas-section")[0];
    let createElement = document.createElement("canvas");
    createElement.setAttribute("id","id_"+i);
    getElement.appendChild(createElement);
    getElement.appendChild(heightElement);


    /**
     * select drop down for canvas id
     * @type {Element}
     */
    const selectElement = document.getElementsByClassName("inputGroupSelect")[0];
    let createSelectElement = document.createElement("option");
    createSelectElement.textContent = i+1;
    createSelectElement.value = "id_" + i;
    selectElement.appendChild(createSelectElement);
};


const generateShape = () => {
    let selectedId = document.getElementsByClassName("inputGroupSelect")[0].value;
    let id = selectedId.split("_")[1];

    let selectedShape = document.getElementsByClassName("inputShapeSelect")[0].value;

    let generateShape = checkShape(selectedShape);
    //canvas[id].add(group);
    //canvas[id].add(circle2);
    canvas[id].add(generateShape);

};

const checkShape =(shapeValue) => {
    switch (shapeValue) {
        case "rect": {
            return rect;
            break;
        }
        case "circle": {
            return circle;
            break;
        }
        case "triangle": {
            return triangle;
            break;
        }
        case "group": {
            return group;
            break
        }
        default: {
            console.log("no shape selected");
            break;
        }
    }
};

let rect = new fabric.Rect({
    left: 20,
    top: 20,
    fill: _.sample(colors),
    width: 40,
    height: 50
});

let triangle = new fabric.Triangle({
    width: 40,
    height: 50,
    fill: _.sample(colors),
    left: 70,
    top: 50
});

let circle = new fabric.Circle({
    radius: 25,
    fill: _.sample(colors),
    left: 130,
    top: 50
});


let circle1 = new fabric.Circle({
    radius: 20,
    fill: _.sample(colors),
    left: 0
});
let circle2 = new fabric.Circle({
    radius: 30,
    fill: _.sample(colors),
    left: 100
});
let circle3 = new fabric.Circle({
    radius: 10,
    fill: _.sample(colors),
    left: 200
});
let group = new fabric.Group([ circle1, circle2, circle3 ], {
    left: 0,
    top: 20
});

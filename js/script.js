'use strict';
let colors = ['#2E3F4F', '#489C85', '#A2B55B', '#E99E32', '#B54A37'];
document.getElementsByClassName("page-reload")[0].style.display ="none";
document.getElementsByClassName("show-after-generate")[0].style.display = "none";
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
            draggable: true
        }));
    }
    document.getElementsByClassName("generate")[0].style.display = "none";
    document.getElementsByClassName("page-reload")[0].style.display = "block";
    document.getElementsByClassName("show-after-generate")[0].style.display = "block";
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
    let isActiveObject = canvas[id].getActiveObject();
    if(isActiveObject) {
        if(isActiveObject.type === selectedShape) {
            let clipboard;
            canvas[id].getActiveObject().clone(function(cloned) {
                clipboard = cloned;
            });
            clipboard.clone(function(clonedObj) {
                canvas[id].discardActiveObject();
                clonedObj.set({
                    left: clonedObj.left + 10,
                    top: clonedObj.top + 10,
                    evented: true,
                });
                if (clonedObj.type === 'activeSelection') {
                    // active selection needs a reference to the canvas.
                    clonedObj.canvas[id] = canvas[id];
                    clonedObj.forEachObject(function(obj) {
                        canvas[id].add(obj);
                        canvas[id].setActiveObject(obj);
                    });
                    // this should solve the unselectability
                    clonedObj.setCoords();
                } else {
                    canvas[id].add(clonedObj);
                    canvas[id].setActiveObject(clonedObj);
                }
            })
        }
        else  {
            canvas[id].add(generateShape);
            canvas[id].setActiveObject(generateShape);
        }
    }
     else {
        canvas[id].add(generateShape);
        canvas[id].setActiveObject(generateShape);
    }
    canvas[id].requestRenderAll();
};

const checkShape =(shapeValue) => {
    switch (shapeValue) {
        case "rect": {
            return rect;
        }
        case "circle": {
            return circle;
        }
        case "triangle": {
            return triangle;
        }
        case "group": {
            return group;
        }
        default: {
            console.log("no shape selected");
        }
    }
};


let rect = new fabric.Rect({
    left: 100,
	top: 50,
    fill: _.sample(colors),
    width: 40,
    height: 50,
});

let triangle = new fabric.Triangle({
    width: 40,
    height: 50,
    fill: _.sample(colors),
    left: 100,
	top: 50,
});

let circle = new fabric.Circle({
    radius: 25,
    fill: _.sample(colors),
    left: 100,
	top: 50,
});


let circleTwo = new fabric.Circle({
    radius: 35,
    fill: _.sample(colors),
    left: 0
});
let triangleTwo = new fabric.Triangle({
    width: 70,
    height: 70,
    fill: _.sample(colors),
    left: 140,
});
let rectangleTwo = new fabric.Rect({
    left: 70,
    fill: _.sample(colors),
    width: 70,
    height: 70
});
let group = new fabric.Group([circleTwo, rectangleTwo, triangleTwo], {
    left: 200,
    top: 50
});


let overlay = document.querySelector('.overlay');
let modal = document.querySelector('.modal');

let speed = 0;

modal.addEventListener('click', function (e) {

    if (e.target.classList.contains('easy')) {
        speed = 1000;
    }
    else if (e.target.classList.contains('normal')) {
        speed = 500;
    }
    else if (e.target.classList.contains('hard')) {
        speed = 200;
    }

    if (e.target.classList.contains('button')) {
        modal.style.display = 'none';
        overlay.style.display = 'none';
        startGame();

    }
})


function startGame() {




    let a = 0;
    let tetris = document.createElement('div'); // подготовка к генерации клеток
    tetris.classList.add('tetris');

    for (let i = 0; i < 180; i++) { //заполнение таблицы tetris exele'м
        let excel = document.createElement('div');
        excel.classList.add('excel');
        tetris.appendChild(excel);
    }

    let main = document.getElementsByClassName('main')[0]; //суём таблицу tetris в main
    main.appendChild(tetris);

    let excel = document.getElementsByClassName('excel'); // Все эллементы с классом excel. 180 штук
    let i = 0;

    for (let y = 18; y > 0; y--) {
        for (let x = 1; x < 11; x++) {
            excel[i].setAttribute('posX', x);
            excel[i].setAttribute('posY', y); //атрибутик для каждой клеточки
            i++;
        }

    }

    let x = 5, y = 15; // начальные координаты спавна фигур
    let mainArr = [
        //палка 
        [
            // координата 0 0 задана изначально в x=5, y =10
            [0, 1],
            [0, 2],
            [0, 3],
            //поворот на 90
            [
                [-1, 1],
                [0, 0],
                [1, -1],
                [2, -2],
            ],
            //180
            [
                [1, -1],
                [0, 0],
                [-1, 1],
                [-2, 2],
            ],
            //поворот на 270
            [
                [-1, 1],
                [0, 0],
                [1, -1],
                [2, -2],
            ],
            //360
            [
                [1, -1],
                [0, 0],
                [-1, 1],
                [-2, 2],
            ],
        ],
        //квадрат +
        [
            [0, 1],
            [1, 0],
            [1, 1],
            //поворот на 90
            [
                [0, 0],
                [0, 0],
                [0, 0],
                [0, 0],
            ],
            //180
            [
                [0, 0],
                [0, 0],
                [0, 0],
                [0, 0],
            ],
            //поворот на 270
            [
                [0, 0],
                [0, 0],
                [0, 0],
                [0, 0],
            ],
            //360
            [
                [0, 0],
                [0, 0],
                [0, 0],
                [0, 0],
            ],
        ],
        //уголок блок вправо +
        [
            [1, 0],
            [0, 1],
            [0, 2],
            //поворот на 90
            [
                [0, 0],
                [-1, 1],
                [1, 0],
                [2, -1],
            ],
            //180
            [
                [1, -1],
                [1, -1],
                [-1, 0],
                [-1, 0],
            ],
            //поворот на 270
            [
                [-1, 0],
                [0, -1],
                [2, -2],
                [1, -1],
            ],
            //360
            [
                [0, -1],
                [0, -1],
                [-2, 0],
                [-2, 0],
            ],


        ],
        //уголок блок влево +
        [
            [1, 0],
            [1, 1],
            [1, 2],

            //поворот на 90
            [
                [0, 0],
                [0, 0],
                [1, -1],
                [-1, -1],
            ],
            //180
            [
                [0, -1],
                [-1, 0],
                [-2, 1],
                [1, 0],
            ],
            //поворот на 270
            [
                [2, 0],
                [0, 0],
                [1, -1],
                [1, -1],
            ],
            //360
            [
                [-2, 0],
                [1, -1],
                [0, 0],
                [-1, 1],
            ],


        ],
        //змiя смотрит направо +
        [
            [1, 0],
            [-1, 1],
            [0, 1],
            //поворот на 90
            [
                [0, -1],
                [-1, 0],
                [2, -1],
                [1, 0],
            ],
            //180
            [
                [0, 0],
                [1, -1],
                [-2, 0],
                [-1, -1],
            ],
            //поворот на 270
            [
                [0, -1],
                [-1, 0],
                [2, -1],
                [1, 0],
            ],
            //360
            [
                [0, 0],
                [1, -1],
                [-2, 0],
                [-1, -1],
            ],

        ],
        //змiя смотрит налево
        [
            [1, 0],
            [1, 1],
            [2, 1],

            //поворот на 90
            [
                [2, -1],
                [0, 0],
                [1, -1],
                [-1, 0],
            ],
            //180
            [
                [-2, 0],
                [0, -1],
                [-1, 0],
                [1, -1],
            ],
            //поворот на 270
            [
                [2, -1],
                [0, 0],
                [1, -1],
                [-1, 0],
            ],
            //360
            [
                [-2, 0],
                [0, -1],
                [-1, 0],
                [1, -1],
            ],

        ],
        //танк
        [
            [1, 0],
            [2, 0],
            [1, 1],
            //поворот на 90
            [
                [1, -1],
                [0, 0],
                [0, 0],
                [0, 0],
            ],
            //180
            [
                [0, 0],
                [-1, 0],
                [-1, 0],
                [1, -1],
            ],
            //поворот на 270
            [
                [1, -1],
                [1, -1],
                [1, -1],
                [0, 0],
            ],
            //360
            [
                [-2, 0],
                [0, -1],
                [0, -1],
                [-1, -1],
            ],

        ],
    ]

    let currentFigure = 0;

    let figureBody = 0;
    let rotate = 1;

    function create() {
        function getRandom() {
            return Math.round(Math.random() * (mainArr.length - 1)); //рандом для выбора фигуры
        }
        currentFigure = getRandom();

        figureBody = [
            document.querySelector(`[posX = "${x}"][posY= "${y}"]`), //5 и 10
            document.querySelector(`[posX = "${x + mainArr[currentFigure][0][0]}"][posY = "${y + mainArr[currentFigure][0][1]}"]`),
            document.querySelector(`[posX = "${x + mainArr[currentFigure][1][0]}"][posY = "${y + mainArr[currentFigure][1][1]}"]`),
            document.querySelector(`[posX = "${x + mainArr[currentFigure][2][0]}"][posY = "${y + mainArr[currentFigure][2][1]}"]`),
        ]


        for (let i = 0; i < figureBody.length; i++) {

            figureBody[i].classList.add('figure');
        }
    }

    create();

    //напоминаю сам себе, что figure это для тех, кто в движении, а set для тех, кто уже встал

    let score = 0;
    let input = document.getElementsByTagName('input')[0];

    input.value = `Ваши очки: ${score}`;


    function move() {
        let moveFlag = true;
        let coordinates = [ //координатки нашей фигуры
            [figureBody[0].getAttribute('posX'), figureBody[0].getAttribute('posY')],
            [figureBody[1].getAttribute('posX'), figureBody[1].getAttribute('posY')],
            [figureBody[2].getAttribute('posX'), figureBody[2].getAttribute('posY')],
            [figureBody[3].getAttribute('posX'), figureBody[3].getAttribute('posY')],
        ];

        for (let i = 0; i < coordinates.length; i++) { //чекаем самый низ и по аттрибуту кординаты пред.эллемента, если он есть
            if (coordinates[i][1] == 1 || document.querySelector(`[posX="${coordinates[i][0]}"][posY="${coordinates[i][1] - 1}"]`).classList.contains('set')) {
                moveFlag = false;
                rotate = 1;
                break;
            }

        }


        if (moveFlag) {  //пора бы ехать вниз
            for (let i = 0; i < figureBody.length; i++) {

                figureBody[i].classList.remove('figure');
            }

            figureBody = [//смещение координат вниз
                document.querySelector(`[posX="${coordinates[0][0]}"][posY="${coordinates[0][1] - 1}"]`),
                document.querySelector(`[posX="${coordinates[1][0]}"][posY="${coordinates[1][1] - 1}"]`),
                document.querySelector(`[posX="${coordinates[2][0]}"][posY="${coordinates[2][1] - 1}"]`),
                document.querySelector(`[posX="${coordinates[3][0]}"][posY="${coordinates[3][1] - 1}"]`),
            ]
            for (let i = 0; i < figureBody.length; i++) {

                figureBody[i].classList.add('figure');
            }

        }
        else {
            for (let i = 0; i < figureBody.length; i++) {

                figureBody[i].classList.remove('figure');
                figureBody[i].classList.add('set');
                if (figureBody[0].getAttribute('posY') == 15 && a == 0) {
                    alert(`Вы проиграли. Ваши очки: ${score}`);
                    a++;
                }

            }
            for (let i = 1; i < 15; i++) { // удаление строки при заполнении
                let count = 0;
                for (k = 1; k < 11; k++) {
                    if (document.querySelector(`[posX="${k}"][posY="${i}"]`).classList.contains('set')) {
                        count++;
                        if (count == 10) {
                            score += 10;
                            input.value = `Ваши очки: ${score}`;
                            for (let m = 1; m < 11; m++) {
                                document.querySelector(`[posX="${m}"][posY="${i}"]`).classList.remove('set');
                            }

                            let set = document.querySelectorAll('.set');
                            let newSet = [];
                            for (let s = 0; s < set.length; s++) {
                                let setCoordinates = [set[s].getAttribute('posX'), set[s].getAttribute('posY')];
                                if (setCoordinates[1] > i) {
                                    set[s].classList.remove('set');
                                    newSet.push(document.querySelector(`[posX="${setCoordinates[0]}"][posY="${setCoordinates[1] - 1}"]`));

                                }
                            }
                            for (let a = 0; a < newSet.length; a++) {
                                newSet[a].classList.add('set');
                            }
                            i--;

                        }
                    }
                }
            }

            create();
        }
    }




    let interval = setInterval(() => {
        move();
    }, speed);

    let flag = true;

    window.addEventListener('keydown', function (e) {
        let coordinates1 = [figureBody[0].getAttribute('posX'), figureBody[0].getAttribute('posY')];
        let coordinates2 = [figureBody[1].getAttribute('posX'), figureBody[1].getAttribute('posY')];
        let coordinates3 = [figureBody[2].getAttribute('posX'), figureBody[2].getAttribute('posY')];
        let coordinates4 = [figureBody[3].getAttribute('posX'), figureBody[3].getAttribute('posY')];

        //console.log([figureBody[0].getAttribute('posX'), figureBody[0].getAttribute('posY')]);


        function getNewState(a) {

            flag = true;

            let figureNew = [
                document.querySelector(`[posX="${+coordinates1[0] + a}"][posY="${coordinates1[1]}"]`),
                document.querySelector(`[posX="${+coordinates2[0] + a}"][posY="${coordinates2[1]}"]`),
                document.querySelector(`[posX="${+coordinates3[0] + a}"][posY="${coordinates3[1]}"]`),
                document.querySelector(`[posX="${+coordinates4[0] + a}"][posY="${coordinates4[1]}"]`),
            ]


            for (let i = 0; i < figureNew.length; i++) {
                if (!figureNew[i] || figureNew[i].classList.contains('set')) {       // '!'figureNew[i] это тип не сущетсвует
                    flag = false;

                }
            }

            if (flag == true) {
                for (let i = 0; i < figureBody.length; i++) {

                    figureBody[i].classList.remove('figure');
                }
                figureBody = figureNew;

                for (let i = 0; i < figureBody.length; i++) {

                    figureBody[i].classList.add('figure');
                }

            }

        }
        if (e.keyCode == 37) {
            getNewState(-1);
        }
        else if (e.keyCode == 39) {
            getNewState(1);
        }
        else if (e.keyCode == 40) {
            move();
        }
        else if (e.keyCode == 38) {
            flag = true;

            let figureNew = [
                document.querySelector(`[posX="${+coordinates1[0] + mainArr[currentFigure][rotate + 2][0][0]}"][posY="${+coordinates1[1] + mainArr[currentFigure][rotate + 2][0][1]}"]`),
                document.querySelector(`[posX="${+coordinates2[0] + mainArr[currentFigure][rotate + 2][1][0]}"][posY="${+coordinates2[1] + mainArr[currentFigure][rotate + 2][1][1]}"]`),
                document.querySelector(`[posX="${+coordinates3[0] + mainArr[currentFigure][rotate + 2][2][0]}"][posY="${+coordinates3[1] + mainArr[currentFigure][rotate + 2][2][1]}"]`),
                document.querySelector(`[posX="${+coordinates4[0] + mainArr[currentFigure][rotate + 2][3][0]}"][posY="${+coordinates4[1] + mainArr[currentFigure][rotate + 2][3][1]}"]`),
            ]


            for (let i = 0; i < figureNew.length; i++) {
                if (!figureNew[i] || figureNew[i].classList.contains('set')) {       // '!'figureNew[i] это тип не сущетсвует
                    flag = false;

                }
            }

            if (flag == true) {
                for (let i = 0; i < figureBody.length; i++) {

                    figureBody[i].classList.remove('figure');
                }
                figureBody = figureNew;

                for (let i = 0; i < figureBody.length; i++) {

                    figureBody[i].classList.add('figure');
                }

                if (rotate < 4) {
                    rotate++;
                    console.log(rotate);
                }
                else {
                    rotate = 1;
                    console.log(rotate);
                }

            }
        }


    })


}





//? Total preguntas
const TOTAL_PREGUNTAS = 10;

//? Cantidad preguntas correctas
let cantidadCorrectas = 0;

let preguntaActual = -1;
let estadoPreguntas = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

//? Base de datos preguntas
//! /////////////////////////////    PREGUNTAS    /////////////////////////////////// 

const bd_juego = [
    {
        id: 'a',
        pregunta: '¿Empresa reconocida que se dedica a los servidores?',
        respuesta: 'amazon'
    },
    {
        id: 'b',
        pregunta: '¿Termino en ingles que hace referencia a una copia de seguridad?',
        respuesta: 'backup'
    },
    {
        id: 'c',
        pregunta: '¿Nombre de la memoria que almacena temporalmente los datos de la computadora?',
        respuesta: 'cache'
    },
    {
        id: 'd',
        pregunta: '¿Archivo que controla los perifericos que se conectan a la computadora?',
        respuesta: 'cache'
    },
    {
        id: 'e',
        pregunta: '¿Mezclar los datos para protegerlos como medida de seguridad, es decir convertir texto normal a texto cifrado?',
        respuesta: 'encriptar'
    },
    {
        id: 'f',
        pregunta: '¿Famosa red social creada por Mark Zuckerberg?',
        respuesta: 'facebook'
    },
    {
        id: 'g',
        pregunta: '¿Lenguaje de programacion creado por Google?',
        respuesta: 'go'
    },
    {
        id: 'h',
        pregunta: '¿Lenguaje utilizado para estructurar las paginas web?',
        respuesta: 'html'
    },
    {
        id: 'i',
        pregunta: '¿Aspecto que presentan los programas tras su ejecucion mediante el cual ejercemos la comunicacion?',
        respuesta: 'html'
    },
    {
        id: 'j',
        pregunta: '¿Lenguaje de programacion con el cual se diseño el sistema operativo android?',
        respuesta: 'java'
    },
]

//! //////////////////////////////////////////////////////////////// 


//? Variables para controlar el tiempo
const timer = document.getElementById('tiempo')
//? tiempo del juego en segundos
const TIEMPO_DEL_JUEGO = 60;
//? Variable que indica el timpo restante
let timepoRestante = TIEMPO_DEL_JUEGO;
//? Variable que maneja el contador de tiempo
let countdown;

//? creamos las letras de la  A a la J
const container = document.querySelector('.container');
for(let i = 1; i <= TOTAL_PREGUNTAS; i++){
    const circle = document.createElement('div');
    circle.classList.add('circle');
    circle.textContent = String.fromCharCode(i + 96);
    circle.id = String.fromCharCode(i + 96);
    container.appendChild(circle);

    const angle = ((i - 1) / TOTAL_PREGUNTAS)  * Math.PI * 2 - (Math.PI / 2);
    const x = Math.round(95 + 120 * Math.cos(angle));
    const y = Math.round(95 + 120 * Math.sin(angle));
    circle.style.left = `${x}px`
    circle.style.top = `${y}px`
}

//? Funcion Comenzar
let comenzar = document.getElementById('comenzar');
comenzar.addEventListener('click', () => {
    document.getElementById('pantalla-inicial').classList.add('subir')
    document.getElementById('pantalla-juego').style.display = 'block';
    document.getElementById('regresar').style.display = 'block';
    document.getElementById('pantalla-inicial').classList.add('subir');
    document.getElementById('pantalla-juego').classList.add('visible');

    //? Iniciamos el contador();
    iniciarContador();
    //? Cargamos las preguntas
    cargarPreguntas();
});

function iniciarContador(){
    countdown = setInterval(() => {
        //? restamos un segundo al tiempo restante
        timepoRestante--;
        //? Actualizamos el tiempo en el DOM
        timer.innerText = timepoRestante;

        //? Si el tiempo llega a 0, detiene el contador
        if(timepoRestante == 0){
            clearInterval(countdown)
        }
    }, 1000)
}

//? Funcion para cargar las preguntas
function cargarPreguntas(){
    preguntaActual++;
    //? Controlo si he llegado al final de las preguntas, para iniciar de nuevo
    if (preguntaActual >= TOTAL_PREGUNTAS){
        preguntaActual = 0;
    }
    //? Controlo si la pregunta ya fue respondida
    if(estadoPreguntas.indexOf(0)>=0){
        while(estadoPreguntas[preguntaActual] == 1){
            preguntaActual++;
            if(preguntaActual  >= TOTAL_PREGUNTAS) {
                preguntaActual = 0;
            }
        }
        //? Ahora si buscamos la pregunta en la base de datos
        document.getElementById('letra-pregunta').textContent = bd_juego[preguntaActual].id;
        document.getElementById('pregunta').textContent = bd_juego[preguntaActual].pregunta;
        let letra = bd_juego[preguntaActual].id;
        document.getElementById(letra).classList.add('pregunta-actual');
    }else{
        //? Si ya no hay preguntas sin responder, terminamos el juego
        clearInterval(countdown)
        //? mostrarPantallaFinal()
    }
}

//? Funcion para regresar al inicio
let regresar = document.getElementById('regresar');
regresar.addEventListener('click', () => {
    document.getElementById('pantalla-inicial').style.display = 'block';
    document.getElementById('pantalla-juego').style.display = 'none';
    document.getElementById('regresar').style.display = 'none'
    document.getElementById('pantalla-inicial').classList.remove('subir');
})

//! Detectamos el cambio del input

let respuesta = document.getElementById('respuesta');
respuesta.addEventListener('keyup', function (event) {
    //? Detecto si se presiona la tecla enter
    if(event.key === 'Enter'){
        if(respuesta.value === ''){
            alert('Debe ingresar una respuesta');
            return;
        }
        //? Obtengo respuesta ingresada
        let respuestaIngresada = respuesta.value.toLowerCase();
        controlarRespuesta(respuestaIngresada);
    }
});

function controlarRespuesta(respuestaIngresada){
    //? Controlo la respuesta correcta
    if (respuestaIngresada == bd_juego[preguntaActual].respuesta){
        // alert('Respuesta Correcta');
        cantidadCorrectas++;

        //? Cambio el estado de la pregunta
        estadoPreguntas[preguntaActual] = 1;

        let letra = bd_juego[preguntaActual].id;
        document.getElementById(letra).classList.remove('pregunta-actual');
        document.getElementById(letra).classList.add('bien-respondida');
    }
}

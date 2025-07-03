const preguntasData = [
  {
    id: "q1_archivos",
    tema: "Archivos", // Nuevo campo de tema
    tipoDePregunta: 1, // Múltiples correctas
    pregunta: "¿Cuáles son modos de apertura de archivos comunes en programación?",
    respuestas: [
      "Lectura (r)",
      "Escritura (w)",
      "Ejecución (x)",
      "Anexar (a)"
    ],
    respuestasCorrectas: [
      "Lectura (r)",
      "Escritura (w)",
      "Anexar (a)"
    ],
    aclaracion: "El modo 'x' no es un modo de apertura común, mientras que 'r', 'w' y 'a' sí lo son para leer, escribir y anexar respectivamente."
  },
  {
    id: "q2_archivos",
    tema: "Archivos",
    tipoDePregunta: 2, // Una sola correcta
    pregunta: "¿Qué función se utiliza típicamente para cerrar un archivo después de su uso?",
    respuestas: [
      "open()",
      "read()",
      "close()",
      "write()"
    ],
    respuestasCorrectas: [
      "close()"
    ],
    aclaracion: "Es crucial cerrar los archivos con `close()` para liberar recursos y asegurar que los datos se guarden correctamente."
  },
  {
    id: "q1_arboles",
    tema: "Árboles", // Nuevo campo de tema
    tipoDePregunta: 1, // Múltiples correctas
    pregunta: "¿Qué tipos de recorridos son comunes en árboles binarios?",
    respuestas: [
      "Preorden",
      "Postorden",
      "Intercalado",
      "Inorden"
    ],
    respuestasCorrectas: [
      "Preorden",
      "Postorden",
      "Inorden"
    ],
    aclaracion: "Los recorridos estándar son Preorden (raíz-izquierda-derecha), Inorden (izquierda-raíz-derecha) y Postorden (izquierda-derecha-raíz)."
  },
  {
    id: "q2_arboles",
    tema: "Árboles",
    tipoDePregunta: 2, // Una sola correcta
    pregunta: "¿En un árbol binario de búsqueda (BST), los nodos a la derecha de un nodo padre son siempre...?",
    respuestas: [
      "Menores que el padre",
      "Mayores que el padre",
      "Iguales al padre",
      "Aleatorios"
    ],
    respuestasCorrectas: [
      "Mayores que el padre"
    ],
    aclaracion: "En un BST, los valores de los nodos a la izquierda son menores y los de la derecha son mayores que el nodo padre."
  },
  {
    id: "q1_hashing",
    tema: "Hashing", // Nuevo campo de tema
    tipoDePregunta: 1, // Múltiples correctas
    pregunta: "¿Cuáles de las siguientes son técnicas comunes para resolver colisiones en tablas hash?",
    respuestas: [
      "Encadenamiento separado (Separate Chaining)",
      "Direccionamiento abierto (Open Addressing)",
      "Rehashing",
      "Búsqueda binaria"
    ],
    respuestasCorrectas: [
      "Encadenamiento separado (Separate Chaining)",
      "Direccionamiento abierto (Open Addressing)",
      "Rehashing"
    ],
    aclaracion: "La búsqueda binaria es un algoritmo de búsqueda en estructuras ordenadas, no una técnica de resolución de colisiones en hashing."
  },
  {
    id: "q2_hashing",
    tema: "Hashing",
    tipoDePregunta: 2, // Una sola correcta
    pregunta: "¿Qué es una función hash?",
    respuestas: [
      "Una función que comprime datos sin pérdida.",
      "Una función que encripta datos.",
      "Una función que mapea datos de tamaño arbitrario a valores de tamaño fijo.",
      "Una función que ordena una lista de elementos."
    ],
    respuestasCorrectas: [
      "Una función que mapea datos de tamaño arbitrario a valores de tamaño fijo."
    ],
    aclaracion: "Una función hash toma una entrada de cualquier tamaño y produce una salida de tamaño fijo (hash o digest), utilizada para indexar datos en una tabla hash."
  }
];

export default preguntasData;
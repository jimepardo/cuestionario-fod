// Función para barajar un array (algoritmo Fisher-Yates)
export const shuffleArray = (array) => {
  let currentIndex = array.length, randomIndex;

  // Mientras queden elementos a barajar.
  while (currentIndex !== 0) {
    // Elige un elemento restante.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // E intercámbialo con el elemento actual.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
};
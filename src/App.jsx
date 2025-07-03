import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { db, auth } from './firebase-config';

// Importar react-toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // ¡Importante: importar los estilos CSS!

import Pregunta from './components/Pregunta';
import Feedback from './components/Feedback';
import TemaNav from './components/TemaNav';
import AdminPanel from './components/AdminPanel';
import Auth from './components/Auth';
import { shuffleArray } from './utils/helpers';
import './App.css';

function App() {
  const [allQuestions, setAllQuestions] = useState([]);
  const [temaSeleccionado, setTemaSeleccionado] = useState(null);
  const [preguntasFiltradas, setPreguntasFiltradas] = useState([]);
  const [preguntasAleatorias, setPreguntasAleatorias] = useState([]);
  const [preguntaActualIndex, setPreguntaActualIndex] = useState(0);
  const [respuestasSeleccionadas, setRespuestasSeleccionadas] = useState([]);
  const [esCorrecta, setEsCorrecta] = useState(null);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const preguntasCollectionRef = collection(db, "preguntas");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false); 
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const getQuestions = async () => {
      try {
        console.log("Intentando cargar preguntas de Firestore...");
        setLoading(true); 

        const q = query(preguntasCollectionRef, orderBy("tema", "asc"), orderBy("pregunta", "asc"));
        const data = await getDocs(q);
        
        const fetchedQuestions = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id
        }));
        
        setAllQuestions(fetchedQuestions);
        console.log("Preguntas cargadas:", fetchedQuestions);
        
      } catch (error) {
        console.error("Error al cargar preguntas desde Firestore:", error);
        toast.error("Error al cargar preguntas. Por favor, revisa la consola."); // Notificación de error
        setAllQuestions([]); 
      } finally {
        console.log("Finalizada la función getQuestions.");
      }
    };

    getQuestions();
  }, []); 

  useEffect(() => {
    let preguntasDelTema = [];
    if (temaSeleccionado) {
      preguntasDelTema = allQuestions.filter(p => p.tema === temaSeleccionado);
    }
    
    setPreguntasFiltradas(preguntasDelTema);
    setPreguntasAleatorias(shuffleArray([...preguntasDelTema]));
    setPreguntaActualIndex(0);
    setRespuestasSeleccionadas([]);
    setEsCorrecta(null);
  }, [temaSeleccionado, allQuestions]);

  const preguntaActual = preguntasAleatorias[preguntaActualIndex];
  const temasUnicos = [...new Set(allQuestions.map(p => p.tema))];

  // --- Funciones CRUD con Firestore ---
  const handleAddQuestion = async (newQuestionData) => {
    try {
      const docRef = await addDoc(preguntasCollectionRef, newQuestionData);
      setAllQuestions(prev => [...prev, { ...newQuestionData, id: docRef.id }]);
      setTemaSeleccionado(newQuestionData.tema);
      toast.success('Pregunta agregada con éxito!'); // <-- Notificación de éxito
    } catch (error) {
      console.error("Error al agregar pregunta:", error);
      toast.error('Error al agregar pregunta.'); // <-- Notificación de error
    }
  };

  const handleUpdateQuestion = async (updatedQuestionData) => {
    try {
      const questionDocRef = doc(db, "preguntas", updatedQuestionData.id);
      await updateDoc(questionDocRef, updatedQuestionData);
      setAllQuestions(prev => prev.map(q => 
        q.id === updatedQuestionData.id ? updatedQuestionData : q
      ));
      toast.success('Pregunta actualizada con éxito!'); // <-- Notificación de éxito
    } catch (error) {
      console.error("Error al actualizar pregunta:", error);
      toast.error('Error al actualizar pregunta.'); // <-- Notificación de error
    }
  };

  const handleDeleteQuestion = async (questionId) => {
    // Usamos toast.warn para la confirmación, sin el window.confirm
    // O si quieres mantener el window.confirm ANTES, puedes hacerlo.
    // Para simplificar, si el usuario hace clic, se elimina y se notifica.
    // Si quieres una confirmación con toastify, es un poco más complejo (ej. con react-confirm-alert)
    // Por ahora, mantendré el window.confirm por simplicidad.
    if (!window.confirm('¿Estás seguro de que quieres eliminar esta pregunta?')) {
      return;
    }
    try {
      const questionDocRef = doc(db, "preguntas", questionId);
      await deleteDoc(questionDocRef);
      setAllQuestions(prev => prev.filter(q => q.id !== questionId));
      toast.info('Pregunta eliminada.'); // <-- Notificación informativa
      const remainingQuestionsInTheme = allQuestions.filter(q => q.tema === temaSeleccionado && q.id !== questionId);
      if (remainingQuestionsInTheme.length === 0) {
        setTemaSeleccionado(null);
      }
    } catch (error) {
      console.error("Error al eliminar pregunta:", error);
      toast.error('Error al eliminar pregunta.'); // <-- Notificación de error
    }
  };
  // --- Fin Funciones CRUD con Firestore ---

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsAdminMode(false);
      setTemaSeleccionado(null);
      setPreguntaActualIndex(0);
      setRespuestasSeleccionadas([]);
      setEsCorrecta(null);
      toast.info('Sesión cerrada.'); // <-- Notificación informativa
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      toast.error('Error al cerrar sesión.'); // <-- Notificación de error
    }
  };

  const handleCambiarSeleccion = (opcion) => {
    if (preguntaActual.tipoDePregunta === 1) {
      if (respuestasSeleccionadas.includes(opcion)) {
        setRespuestasSeleccionadas(respuestasSeleccionadas.filter(res => res !== opcion));
      } else {
        setRespuestasSeleccionadas([...respuestasSeleccionadas, opcion]);
      }
    } else {
      setRespuestasSeleccionadas([opcion]);
    }
    setEsCorrecta(null);
  };

  const handleVerificarRespuesta = () => {
    let correcto = false;
    if (preguntaActual.tipoDePregunta === 1) {
      const seleccionadasOrdenadas = [...respuestasSeleccionadas].sort();
      const correctasOrdenadas = [...preguntaActual.respuestasCorrectas].sort();
      
      const seleccionadasSet = new Set(seleccionadasOrdenadas);
      const correctasSet = new Set(correctasOrdenadas);

      correcto = seleccionadasSet.size === correctasSet.size &&
                 [...seleccionadasSet].every(item => correctasSet.has(item));

    } else {
      correcto = respuestasSeleccionadas[0] === preguntaActual.respuestasCorrectas[0];
    }
    setEsCorrecta(correcto);
    // Podemos dar feedback instantáneo aquí también
    if (correcto) {
        toast.success('¡Respuesta Correcta!', { autoClose: 1500 });
    } else {
        toast.error('Respuesta Incorrecta. Inténtalo de nuevo.', { autoClose: 1500 });
    }
  };

  const handleSiguientePregunta = () => {
    if (preguntaActualIndex < preguntasAleatorias.length - 1) {
      setPreguntaActualIndex(preguntaActualIndex + 1);
      setRespuestasSeleccionadas([]);
      setEsCorrecta(null);
    } else {
      toast.info('¡Has terminado las preguntas de este tema!'); // <-- Notificación informativa
      setPreguntaActualIndex(0);
      setRespuestasSeleccionadas([]);
      setEsCorrecta(null);
    }
  };

  const handlePreguntaAnterior = () => {
    if (preguntaActualIndex > 0) {
      setPreguntaActualIndex(preguntaActualIndex - 1);
      setRespuestasSeleccionadas([]);
      setEsCorrecta(null);
    }
  };

  if (loading) {
    return (
      <div className="App" style={{ textAlign: 'center', padding: '50px', fontSize: '1.5em', color: '#007bff' }}>
        Cargando datos y verificando autenticación...
      </div>
    );
  }

  if (isAdminMode && !user) {
    return (
      <div className="App">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h1>Cuestionario Interactivo</h1>
          <button onClick={() => setIsAdminMode(false)} className="btn-admin-toggle">
            Volver al Cuestionario
          </button>
        </div>
        <Auth />
        <ToastContainer /> {/* Asegúrate de que ToastContainer esté presente */}
      </div>
    );
  }

  return (
    <div className="App">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>Cuestionario Interactivo</h1>
        {user ? (
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={() => setIsAdminMode(!isAdminMode)} className="btn-admin-toggle">
              {isAdminMode ? 'Volver al Cuestionario' : 'Modo Administrador'}
            </button>
            <button onClick={handleLogout} className="btn-logout">
              Cerrar Sesión ({user.email})
            </button>
          </div>
        ) : (
          <button onClick={() => setIsAdminMode(true)} className="btn-admin-toggle">
            Modo Administrador
          </button>
        )}
      </div>
      
      {isAdminMode && user ? (
        <AdminPanel
          allQuestions={allQuestions}
          temasUnicos={temasUnicos}
          onAddQuestion={handleAddQuestion}
          onUpdateQuestion={handleUpdateQuestion}
          onDeleteQuestion={handleDeleteQuestion}
        />
      ) : (
        <>
          <TemaNav
            temas={temasUnicos}
            temaSeleccionado={temaSeleccionado}
            onSeleccionarTema={setTemaSeleccionado}
          />
          {!temaSeleccionado ? (
            <p style={{ textAlign: 'center', fontSize: '1.2em' }}>
              Por favor, selecciona un tema para empezar el cuestionario.
            </p>
          ) : preguntasAleatorias.length === 0 && preguntasFiltradas.length === 0 ? (
            <p style={{ textAlign: 'center', fontSize: '1.2em' }}>
              No hay preguntas disponibles para el tema seleccionado.
            </p>
          ) : !preguntaActual ? (
            <div style={{ textAlign: 'center' }}>Cargando preguntas del tema...</div>
          ) : (
            <>
              <Pregunta
                pregunta={preguntaActual}
                respuestasSeleccionadas={respuestasSeleccionadas}
                alCambiarSeleccion={handleCambiarSeleccion}
              />

              <div className="controles-pregunta" style={{ textAlign: 'center', marginBottom: '20px' }}>
                <button
                  onClick={handleVerificarRespuesta}
                  disabled={respuestasSeleccionadas.length === 0 || esCorrecta !== null}
                  className="btn-verificar"
                >
                  Verificar Respuesta
                </button>
              </div>

              <Feedback
                esCorrecta={esCorrecta}
                aclaracion={preguntaActual.aclaracion}
                respuestasCorrectas={preguntaActual.respuestasCorrectas}
              />

              <div className="navegacion-preguntas" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px' }}>
                <button
                  onClick={handlePreguntaAnterior}
                  disabled={preguntaActualIndex === 0}
                  className="btn-atras"
                >
                  Anterior
                </button>
                <button
                  onClick={handleSiguientePregunta}
                  disabled={preguntaActualIndex === preguntasAleatorias.length - 1}
                  className="btn-siguiente"
                >
                  Siguiente
                </button>
              </div>
            </>
          )}
        </>
      )}
      <ToastContainer /> {/* Componente donde se renderizarán todas las notificaciones */}
    </div>
  );
}

export default App;
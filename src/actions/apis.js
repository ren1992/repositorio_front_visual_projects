import {
  AddUserToStorange,
  AddLiderToStorange,
  AddProjectsToStorange,
  AddLeaderToStorange,
  AddProjectLeaderToStorange,
  AddTotalActivitiesToStorange,
  AddTotalActivitiesFinishToStorange,
  AddTotalPercentageFinishToStorange,
  AddTotalTaskToStorange,
  AddPercentageTaskToStorange,
  AddGoalsProjectToStorange,
  AddCountsGoalsProjectToStorange,
  AddActivitiesGoalsToStorange,
  AddResponsablesToStorange,
  AddActivitiesInitialsToStorange,
  AddActivitiesOrganizationToStorange,
  AddActivitiesEjecutionToStorange,
  AddActivitiesFinishToStorange,
  AddDataSpiProjectToStorange,
  AddDataCpiProjectToStorange,
  addInfomrationIndicatorsToStorange,
  addTaskActivitiesToStorange,
  AddTaskActivitiesInitialsToStorange,
  AddTaskActivitiesOrganizationToStorange,
  AddTaskActivitiesEjecutionToStorange,
  AddTaskActivitiesFinishToStorange,
  AddActivitiesPlanedToStorange,
  AddRecursosToStorange,
  AddTotalRecursosToStorange,
  AddTotalTareasToStorange,
  AddPresupuestoActividadToStorange,
  AddTaskPlanedToStorange,
  AddRecursosTaskToStorange,
  AddPresupuestoTaskToStorange,
  AddPresupuestoMetaToStorange
} from "./events";
import axios, { formToJSON } from "axios";
import Swal from "sweetalert2";

/**
 * Consultas a las Apis
 */

//export const urlServer = "http://localhost:4000/api";
export const urlServer = "https://nodejs-4xci-production.up.railway.app/api";
/**
 * @description Inicia sesión en la plataforma con las credenciales de un usuario.
 * Envía una solicitud POST al servidor con el correo electrónico y contraseña del usuario.
 * 
 * @route POST /login
 * @param {string} email - Correo electrónico del usuario.
 * @param {string} password - Contraseña del usuario.
 * @returns {Promise<void>} - Guarda los datos del usuario en el almacenamiento o muestra una alerta en caso de error.
 * @throws {Error} Si ocurre un error en la autenticación.
 */

export const login = async(email, password) => {
  return async (dispatch) => {
    let resquest = {
      data: {
        user: {
          email: email,
          password: password,
        },
      },
    };
    await axios({
      method: "post",
      url: urlServer + "/login",
      headers: {
        "Access-Control-Allow-Credentials": true,
        "ngrok-skip-browser-warning": "69420"
      },
      data: resquest,
    })
      .then((resJson) => {
        let liders = resJson.data.data;
        dispatch(AddUserToStorange(liders));
      })
      .catch((error) => {
        Swal.fire("Error", "Error al consultar los Lideres", error);
      });
  };
};

/**
 * @description Obtiene la lista de todos los líderes registrados en el sistema.
 * Envía una solicitud GET al servidor para recuperar la información.
 * 
 * @route GET /consultar/lideres
 * @returns {Promise<Array>} - Una lista de líderes almacenada en el sistema.
 * @throws {Error} Si ocurre un error en la solicitud HTTP.
 */

export const consutarLideres = () => {
  return async (dispatch) => {
    await axios({
      method: "get",
      url: urlServer + "/consultar/lideres",
      headers: {
        "Access-Control-Allow-Credentials": true,
        "ngrok-skip-browser-warning": "69420"
      },
    })
      .then((resJson) => {
        let liders = resJson.data.data;
        dispatch(AddLiderToStorange(liders));
        return liders
      })
      .catch((error) => {
        Swal.fire("Error", "Error al consultar los Lideres", error);
      });
  };
};

/**
 * @description Obtiene la lista de líderes sin proyectos asignados.
 * Envía una solicitud GET al servidor para recuperar la información.
 * 
 * @route GET /consultar/lideres/on-proyects
 * @returns {Promise<Array>} - Una lista de líderes sin proyectos.
 * @throws {Error} Si ocurre un error en la solicitud HTTP.
 */

export const consutarLideresSinProyecto = () => {
  return async (dispatch) => {
    await axios({
      method: "get",
      url: urlServer + "/consultar/lideres/on-proyects",
      headers: {
        "Access-Control-Allow-Credentials": true,
        "ngrok-skip-browser-warning": "69420"
      },
    })
      .then((resJson) => {
        let liders = resJson.data.data;
        dispatch(AddLeaderToStorange(liders));
      })
      .catch((error) => {
        // alert.error("Error", "Error al consultar los Lideres", error);
      });
  };
};

/**
 * @description Crea un nuevo líder en el sistema.
 * Envía una solicitud POST al servidor con la información del líder.
 * 
 * @route POST /crear/lider
 * @param {Object} lider - Objeto con los datos del líder (nombre, correo, etc.).
 * @returns {Promise<void>} - Notifica el éxito o el error en la operación.
 * @throws {Error} Si ocurre un error en la solicitud HTTP.
 */

export const crearLider = (lider) => {
  return async (dispatch) => {
    await axios({
      method: "post",
      url: urlServer + "/crear/lider",
      headers: {
        "Access-Control-Allow-Credentials": true,
        "ngrok-skip-browser-warning": "69420"
      },
      data: lider,
    })
      .then((resJson) => {
        dispatch(consutarLideres());
        Swal.fire("Listo", "Lider creado correctamente", "success");
      })
      .catch((error) => {
        Swal.fire("Error", error.response.data.msg, "error");
      });
  };
};

/**
 * @description Crea un nuevo director en el sistema.
 * Envía una solicitud POST al servidor con los datos del director.
 * 
 * @route POST /crear/director
 * @param {Object} proyecto - Objeto con los datos del director (nombre, email, password).
 * @returns {Promise<void>} - Notifica el éxito o el error en la operación.
 * @throws {Error} Si ocurre un error en la solicitud HTTP.
 */
export const crearDirector = (director) => {
  return async (dispatch) => {
    await axios({
      method: "post",
      url: urlServer + "/crear/director",
      headers: {
        "Access-Control-Allow-Credentials": true,
        "ngrok-skip-browser-warning": "69420"
      },
      data: director,
    })
      .then((resJson) => {
        //dispatch(consutarLideres());
        Swal.fire("Listo", "Director creado correctamente", "success");
      })
      .catch((error) => {
        Swal.fire("Error", error.response.data.msg, "error");
      });
  };
};


/**
 * @description Crea un nuevo proyecto en el sistema.
 * Envía una solicitud POST al servidor con los datos del proyecto.
 * 
 * @route POST /crear/proyectos
 * @param {Object} proyecto - Objeto con los datos del proyecto (nombre, descripción, etc.).
 * @returns {Promise<void>} - Notifica el éxito o el error en la operación.
 * @throws {Error} Si ocurre un error en la solicitud HTTP.
 */

export const crearProyecto = (proyecto) => {
  return async (dispatch) => {
    await axios({
      method: "post",
      url: urlServer + "/crear/proyectos",
      headers: {
        "Access-Control-Allow-Credentials": true,
        "ngrok-skip-browser-warning": "69420"
      },
      data: proyecto,
    })
      .then((resJson) => {
        dispatch(consutarLideres());
        Swal.fire("Listo", "Proyecto creado correctamente", "success");
      })
      .catch((error) => {
        Swal.fire("Error", error, "error");
      });
  };
};

/**
 * @description Obtiene la lista de todos los proyectos en el sistema.
 * Envía una solicitud GET al servidor para recuperar los datos.
 * 
 * @route GET /consultar/proyectos
 * @returns {Promise<Array>} - Una lista de proyectos.
 * @throws {Error} Si ocurre un error en la solicitud HTTP.
 */

export const consultarProyectos = (idDirector) => {
  return async (dispatch) => {
    await axios({
      method: "get",
      url: urlServer + "/consultar/proyectos",
      headers: {
        "Access-Control-Allow-Credentials": true,
        "ngrok-skip-browser-warning": "69420"
      },

    })
      .then((resJson) => {
        let projects = resJson.data.data;
        dispatch(AddProjectsToStorange(projects));
      })
      .catch((error) => {
        // Swal.fire("Error", "Error al consultar los proyectos", "error");
      });
  };
};

/**
 * @description Obtiene los proyectos asociados a un director específico.
 * Envía una solicitud GET al servidor con el ID del director.
 * 
 * @route GET /consultar/proyecto/director/:idDirector
 * @param {string} idDirector - ID del director para buscar sus proyectos.
 * @returns {Promise<Array>} - Una lista de proyectos asociados al director.
 * @throws {Error} Si ocurre un error en la solicitud HTTP.
 */

export const consultarProyectosDirector = (idDirector) => {
  return async (dispatch) => {
    let test = await axios({
      method: "get",
      url: urlServer + `/consultar/proyecto/director/${idDirector}`,
      headers: {
        "Access-Control-Allow-Credentials": true,
        "ngrok-skip-browser-warning": "69420"
      }
    })
      .then((resJson) => {
        let projects = resJson.data.data;
        dispatch(AddProjectsToStorange(projects));
      })
      .catch((error) => {
        // Swal.fire("Error", "Error al consultar los proyectos", "error");
      });
 
  };
};

/**
 * Peticion para consultar los proyectos asociados a un director
 * @returns
 */

export const consultarProyectoLider = (idLider) => {
  return async (dispatch) => {
    await axios({
      method: "get",
      url: urlServer + `/consultar/proyectos/lider/${idLider}`,
      headers: {
        "Access-Control-Allow-Credentials": true,
        "ngrok-skip-browser-warning": "69420"
      },
    })
      .then((resJson) => {
        let projects = resJson.data.data;
         dispatch(AddProjectLeaderToStorange(projects));
      })
      .catch((error) => {
        // Swal.fire("Error", "Error al consultar los proyectos", "error");
      });
  };
};

/**
 * @description Cuenta el total de actividades asociadas a un cronograma de proyecto.
 * Envía una solicitud POST al servidor con el ID del cronograma.
 * 
 * @route POST /contar/actividades
 * @param {string} idCronograma - ID del cronograma a consultar.
 * @returns {Promise<number>} - Devuelve el número total de actividades asociadas al cronograma.
 * @throws {Error} Si ocurre un error en la solicitud HTTP.
 */

export const contarActividades = (idCronograma) => {
  return async (dispatch) => {
    await axios({
      method: "post",
      url: urlServer + "/contar/actividades",
      headers: {
        "Access-Control-Allow-Credentials": true,
        "ngrok-skip-browser-warning": "69420"
      },
      data: {
        data:{
          activity: {
            idCronograma: idCronograma,
          },
        }
      },
    })
      .then((resJson) => {
        let totalActivities = resJson.data.data;
         dispatch(AddTotalActivitiesToStorange(totalActivities));
      })
      .catch((error) => {
        Swal.fire("Error", error, "error");
      });
  };
};

/**
 * @description Cuenta el total de actividades finalizadas asociadas a un cronograma de proyecto.
 * Envía una solicitud POST al servidor con el ID del cronograma.
 * 
 * @route POST /contar/actividades/finalizadas
 * @param {string} idCronograma - ID del cronograma a consultar.
 * @returns {Promise<number>} - Devuelve el número total de actividades finalizadas.
 * @throws {Error} Si ocurre un error en la solicitud HTTP.
 */

export const contarActividadesFinalizadas = (idCronograma) => {
  return async (dispatch) => {
    await axios({
      method: "post",
      url: urlServer + "/contar/actividades/finalizadas",
      headers: {
        "Access-Control-Allow-Credentials": true,
        "ngrok-skip-browser-warning": "69420"
      },
      data: {
        data:{
          activity: {
            idCronograma: idCronograma,
          },
        }
      },
    })
      .then((resJson) => {
        let totalActivities = resJson.data.data;
         dispatch(AddTotalActivitiesFinishToStorange(totalActivities));
      })
      .catch((error) => {
        Swal.fire("Error", error, "error");
      });
  };
};

/**
 * @description Calcula el porcentaje de actividades finalizadas en un cronograma.
 * Envía una solicitud POST al servidor con el ID del cronograma.
 * 
 * @route POST /porcentaje/actividades/finalizadas
 * @param {string} idCronograma - ID del cronograma a consultar.
 * @returns {Promise<number>} - Devuelve el porcentaje de actividades completadas.
 * @throws {Error} Si ocurre un error en la solicitud HTTP.
 */

export const porcentajeActividadesFinalizadas = (idCronograma) => {
  return async (dispatch) => {
    await axios({
      method: "post",
      url: urlServer + "/pocentaje/actividades/finalizadas",
      headers: {
        "Access-Control-Allow-Credentials": true,
        "ngrok-skip-browser-warning": "69420"
      },
      data: {
        data:{
          activity: {
            idCronograma: idCronograma,
          },
        }
      },
    })
      .then((resJson) => {
        let percentage = resJson.data.data;
         dispatch(AddTotalPercentageFinishToStorange(percentage));
      })
      .catch((error) => {
        Swal.fire("Error", error, "error");
      });
  };
};

/**
 * @description Cuenta el total de tareas asociadas a un cronograma de proyecto.
 * Envía una solicitud POST al servidor con el ID del cronograma.
 * 
 * @route POST /contar/tareas
 * @param {string} idCronograma - ID del cronograma a consultar.
 * @returns {Promise<number>} - Devuelve el número total de tareas asociadas al cronograma.
 * @throws {Error} Si ocurre un error en la solicitud HTTP.
 */

export const totalTareas = (idCronograma) => {
  return async (dispatch) => {
    await axios({
      method: "post",
      url: urlServer + "/contar/tareas",
      headers: {
        "Access-Control-Allow-Credentials": true,
        "ngrok-skip-browser-warning": "69420"
      },
      data: {
        data:{
          activity: {
            idCronograma: idCronograma,
          },
        }
      },
    })
      .then((resJson) => {
        let totalTask = resJson.data.data;
         dispatch(AddTotalTaskToStorange(totalTask));
      })
      .catch((error) => {
        Swal.fire("Error", error, "error");
      });
  };
};

/**
 * @description Calcula el porcentaje de tareas finalizadas en un cronograma.
 * Envía una solicitud POST al servidor con el ID del cronograma.
 * 
 * @route POST /porcentaje/tareas/finalizadas
 * @param {string} idCronograma - ID del cronograma a consultar.
 * @returns {Promise<number>} - Devuelve el porcentaje de tareas completadas.
 * @throws {Error} Si ocurre un error en la solicitud HTTP.
 */

export const porcentajeTareasTerminadas = (idCronograma) => {
  return async (dispatch) => {
    await axios({
      method: "post",
      url: urlServer + "/pocentaje/tareas/finalizadas",
      headers: {
        "Access-Control-Allow-Credentials": true,
        "ngrok-skip-browser-warning": "69420"
      },
      data: {
        data:{
          activity: {
            idCronograma: idCronograma,
          },
        }
      },
    })
      .then((resJson) => {
        let percentageTask = resJson.data.data;
         dispatch(AddPercentageTaskToStorange(percentageTask));
      })
      .catch((error) => {
        Swal.fire("Error", error, "error");
      });
  };
};


export const agregarPlaneacion = (data) => {
  return async (dispatch) => {
    await axios({
      method: "post",
      url: urlServer + "/crear/planeacion",
      headers: {
        "Access-Control-Allow-Credentials": true,
        "ngrok-skip-browser-warning": "69420"
      },
      data: {data},
    })
      .then((resJson) => {
        Swal.fire("Éxito", "La planeación fue agregada con éxito", "success");
        console.log("soy resJson", resJson)
        let proyecto = resJson.data.data
        dispatch(AddProjectLeaderToStorange(proyecto))
      })
      .catch((error) => {
        Swal.fire("Error", error, "error");
      });
  };
};


export const consultarMetasProyecto = (idCronograma) => {
  return async (dispatch) => {
    await axios({
      method: "get",
      url: urlServer + `/consultar/metas/${idCronograma}`,
      headers: {
        "Access-Control-Allow-Credentials": true,
        "ngrok-skip-browser-warning": "69420"
      },
    })
      .then((resJson) => {
        let goals = resJson.data.data;
        dispatch(AddGoalsProjectToStorange(goals))
      })
      .catch((error) => {
        let goals = [];
        dispatch(AddGoalsProjectToStorange(goals))
       // Swal.fire("Error", error, "error");
      });
  };
};

export const crearMeta = (data) => {
  return async (dispatch) => {
    await axios({
      method: "post",
      url: urlServer + "/crear/meta",
      headers: {
        "Access-Control-Allow-Credentials": true,
        "ngrok-skip-browser-warning": "69420"
      },
      data:{data},
    })
      .then((resJson) => {

        Swal.fire("Éxito", "La Meta fue creada con éxito", "success");
      })
      .catch((error) => {
        Swal.fire("Error", error, "error");
      });
  };
};
/**
 * Peticion para obtener el un arreglo con el total de estados de las metas creadas
 * @returns
 */
export const contadorEstadoTareas = (idCronograma) => {
  return async (dispatch) => {
    await axios({
      method: "post",
      url: urlServer + "/contar/estado/metas",
      headers: {
        "Access-Control-Allow-Credentials": true,
        "ngrok-skip-browser-warning": "69420"
      },
      data: {
        data:{
          goal: {
            idCronograma: idCronograma,
          },
        }
      },
    })
      .then((resJson) => {
        let counstGoals = resJson.data.data;
         dispatch(AddCountsGoalsProjectToStorange(counstGoals));
      })
      .catch((error) => {
        //Swal.fire("Error", error, "error");
      });
  };
};

export const consultarActividadesMetas = (idMeta) => {
  return async (dispatch) => {
    await axios({
      method: "get",
      url: urlServer + `/consultar/actividades/meta/${idMeta}`,
      headers: {
        "Access-Control-Allow-Credentials": true,
        "ngrok-skip-browser-warning": "69420"
      },
    })
      .then((resJson) => {
        let activitiesGoals = resJson.data.data;
        
        dispatch(AddActivitiesGoalsToStorange(activitiesGoals))
        return activitiesGoals
      })
      .catch((error) => {
       // Swal.fire("Error", error, "error");
      });
  };
};

export const consultarTareasActividades = (idActividad) => {
  return async (dispatch) => {
    await axios({
      method: "get",
      url: urlServer + `/consultar/tareas/actividad/${idActividad}`,
      headers: {
        "Access-Control-Allow-Credentials": true,
        "ngrok-skip-browser-warning": "69420"
      },
    })
      .then(async(resJson) => {
        let activitiesGoals = resJson.data.data;
        
        await dispatch(addTaskActivitiesToStorange(activitiesGoals))
        return activitiesGoals
      })
      .catch((error) => {
       // Swal.fire("Error", error, "error");
      });
  };
};


export const consultarResponsables = () => {
  return async (dispatch) => {
    await axios({
      method: "get",
      url: urlServer + '/consultar/responsables',
      headers: {
        "Access-Control-Allow-Credentials": true,
        "ngrok-skip-browser-warning": "69420"
      },
    })
      .then((resJson) => {
        let responsables = resJson.data.data;
        dispatch(AddResponsablesToStorange(responsables))
      })
      .catch((error) => {
        console.log("Error", error)
      
      });
  };
};


export const consultarRecursosActividad = (idActividad) => {
  return async (dispatch) => {
    await axios({
      method: "get",
      url: urlServer + `/api/consultar/recurso/actividad/${idActividad}`,
      headers: {
        "Access-Control-Allow-Credentials": true,
        "ngrok-skip-browser-warning": "69420"
      },
    })
      .then((resJson) => {
        let responsables = resJson.data.data;
        dispatch(AddResponsablesToStorange(responsables))
      })
      .catch((error) => {
        console.log("Error", error)
      
      });
  };
};


export const consultarActividadesMetaInicio = (idMeta) => {
  return async (dispatch) => {
    await axios({
      method: "get",
      url: urlServer + `/consultar/actividades-meta/inicio/${idMeta}`,
      headers: {
        "Access-Control-Allow-Credentials": true,
        "ngrok-skip-browser-warning": "69420"
      },
    })
      .then((resJson) => {
        let responsables = resJson.data.data;
        dispatch(AddActivitiesInitialsToStorange(responsables))
      })
      .catch((error) => {
        console.log("Error", error)
      
      });
  };
};


export const consultarTareasActividadesInicio = (idActividad) => {
  return async (dispatch) => {
    await axios({
      method: "get",
      url: urlServer + `/consultar/tareas-actividades/inicio/${idActividad}`,
      headers: {
        "Access-Control-Allow-Credentials": true,
        "ngrok-skip-browser-warning": "69420"
      },
    })
      .then((resJson) => {
        let responsables = resJson.data.data;
        dispatch(AddTaskActivitiesInitialsToStorange(responsables))
      })
      .catch((error) => {
        console.log("Error", error)
      
      });
  };
};


export const consultarActividadesMetaOrganizacion = (idMeta) => {
  
  return async (dispatch) => {
    await axios({
      method: "get",
      url: urlServer + `/consultar/actividades-meta/organizacion/${idMeta}`,
      headers: {
        "Access-Control-Allow-Credentials": true,
        "ngrok-skip-browser-warning": "69420"
      },
    })
      .then((resJson) => {
        let responsables = resJson.data.data;
       
        dispatch(AddActivitiesOrganizationToStorange(responsables))
      })
      .catch((error) => {
        console.log("Error", error)
      
      });
  };
};

export const consultarTareasActividadesOrganizacion = (idActividad) => {
 
  return async (dispatch) => {
    await axios({
      method: "get",
      url: urlServer + `/consultar/tareas-actividades/organizacion/${idActividad}`,
      headers: {
        "Access-Control-Allow-Credentials": true,
        "ngrok-skip-browser-warning": "69420"
      },
    })
      .then((resJson) => {
        let responsables = resJson.data.data;
       
        dispatch(AddTaskActivitiesOrganizationToStorange(responsables))
      })
      .catch((error) => {
        console.log("Error", error)
      
      });
  };
};

export const consultarActividadesMetaEjecucion = (idMeta) => {

  return async (dispatch) => {
    await axios({
      method: "get",
      url: urlServer + `/consultar/actividades-meta/ejecucion/${idMeta}`,
      headers: {
        "Access-Control-Allow-Credentials": true,
        "ngrok-skip-browser-warning": "69420"
      },
    })
      .then((resJson) => {
        let responsables = resJson.data.data;
       
        dispatch(AddActivitiesEjecutionToStorange(responsables))
      })
      .catch((error) => {
        console.log("Error", error)
      
      });
  };
};


export const consultarTareasActividadesEjecucion = (idActividad) => {

  return async (dispatch) => {
    await axios({
      method: "get",
      url: urlServer + `/consultar/tareas-actividades/ejecucion/${idActividad}`,
      headers: {
        "Access-Control-Allow-Credentials": true,
        "ngrok-skip-browser-warning": "69420"
      },
    })
      .then((resJson) => {
        let responsables = resJson.data.data;
       
        dispatch(AddTaskActivitiesEjecutionToStorange(responsables))
      })
      .catch((error) => {
        console.log("Error", error)
      
      });
  };
};

export const consultarActividadesMetaCierre = (idMeta) => {

  return async (dispatch) => {
    await axios({
      method: "get",
      url: urlServer + `/consultar/actividades-meta/cierre/${idMeta}`,
      headers: {
        "Access-Control-Allow-Credentials": true,
        "ngrok-skip-browser-warning": "69420"
      },
    })
      .then((resJson) => {
        let responsables = resJson.data.data;
       
        dispatch(AddActivitiesFinishToStorange(responsables))
      })
      .catch((error) => {
        console.log("Error", error)
      
      });
  };
};

export const consultarTareasActividadesCierre = (idActividad) => {

  return async (dispatch) => {
    await axios({
      method: "get",
      url: urlServer + `/consultar/tareas-actividades/cierre/${idActividad}`,
      headers: {
        "Access-Control-Allow-Credentials": true,
        "ngrok-skip-browser-warning": "69420"
      },
    })
      .then((resJson) => {
        let responsables = resJson.data.data;
       
        dispatch(AddTaskActivitiesFinishToStorange(responsables))
      })
      .catch((error) => {
        console.log("Error", error)
      
      });
  };
};


export const actualizarActividadesIOrganizacion = (idActividad) => {
  return async (dispatch) => {
    await axios({
      method: "put",
      url: urlServer + `/actualizar/estado-organizacion/actividad/${idActividad}`,
      headers: {
        "Access-Control-Allow-Credentials": true,
        "ngrok-skip-browser-warning": "69420"
      },
    })
      .then((resJson) => {
        Swal.fire("Éxito", "El estado de la meta se actualizo correctamente", "success");
      })
      .catch((error) => {
        console.log("Error", error)
      
      });
  };
};

/**
 * @description Actualiza el estado de una actividad a "Inicio".
 * Envía una solicitud PUT al servidor con el ID de la actividad.
 * 
 * @route PUT /actualizar/estado-inicio/actividad/:idActividad
 * @param {string} idActividad - ID de la actividad a actualizar.
 * @returns {Promise<void>} - Notifica el éxito o el error en la operación.
 * @throws {Error} Si ocurre un error en la solicitud HTTP.
 */

export const actualizarActividadesInicio = (idActividad) => {
  return async (dispatch) => {
    await axios({
      method: "put",
      url: urlServer + `/actualizar/estado-inicio/actividad/${idActividad}`,
      headers: {
        "Access-Control-Allow-Credentials": true,
        "ngrok-skip-browser-warning": "69420"
      },
    })
      .then((resJson) => {
        Swal.fire("Éxito", "El estado de la meta se actualizo correctamente", "success");
      })
      .catch((error) => {
        console.log("Error", error)
      
      });
  };
};

/**
 * @description Actualiza el estado de una actividad a "Ejecucion".
 * Envía una solicitud PUT al servidor con el ID de la actividad.
 * 
 * @route PUT /actualizar/estado-inicio/actividad/:idActividad
 * @param {string} idActividad - ID de la actividad a actualizar.
 * @returns {Promise<void>} - Notifica el éxito o el error en la operación.
 * @throws {Error} Si ocurre un error en la solicitud HTTP.
 */

export const actualizarActividadesEjecucion = (idActividad) => {
  return async (dispatch) => {
    await axios({
      method: "put",
      url: urlServer + `/actualizar/estado-ejecucion/actividad/${idActividad}`,
      headers: {
        "Access-Control-Allow-Credentials": true,
        "ngrok-skip-browser-warning": "69420"
      },
    })
      .then((resJson) => {
        Swal.fire("Éxito", "El estado de la meta se actualizo correctamente", "success");
      })
      .catch((error) => {
        console.log("Error", error)
      
      });
  };
};

/**
 * @description Actualiza el estado de una actividad a "Cierre".
 * Envía una solicitud PUT al servidor con el ID de la actividad.
 * 
 * @route PUT /actualizar/estado-cierre/actividad/:idActividad
 * @param {string} idActividad - ID de la actividad a actualizar.
 * @returns {Promise<void>} - Notifica el éxito o el error en la operación.
 * @throws {Error} Si ocurre un error en la solicitud HTTP.
 */

export const actualizarActividadesCierre = (idActividad) => {
  return async (dispatch) => {
    await axios({
      method: "put",
      url: urlServer + `/actualizar/estado-cierre/actividad/${idActividad}`,
      headers: {
        "Access-Control-Allow-Credentials": true,
        "ngrok-skip-browser-warning": "69420"
      },
    })
      .then((resJson) => {
        Swal.fire("Éxito", "El estado de la meta se actualizo correctamente", "success");
      })
      .catch((error) => {
        console.log("Error", error)
      
      });
  };
};

/**
 * @description Actualiza el estado de una tarea a "Inicio".
 * Envía una solicitud PUT al servidor con el ID de la tarea.
 * 
 * @route PUT /actualizar/estado-inicio/tarea/:idTarea
 * @param {string} idTarea - ID de la tarea a actualizar.
 * @returns {Promise<void>} - Notifica el éxito o el error en la operación.
 * @throws {Error} Si ocurre un error en la solicitud HTTP.
 */

export const actualizarTareasInicio = (idTarea) => {
  return async (dispatch) => {
    await axios({
      method: "put",
      url: urlServer + `/actualizar/estado-inicio/tarea/${idTarea}`,
      headers: {
        "Access-Control-Allow-Credentials": true,
        "ngrok-skip-browser-warning": "69420"
      },
    })
      .then((resJson) => {
        Swal.fire("Éxito", "El estado de la tarea se actualizo correctamente", "success");
      })
      .catch((error) => {
        console.log("Error", error)
      
      });
  };
};

/**
 * @description Actualiza el estado de una tarea a "Organización ".
 * Envía una solicitud PUT al servidor con el ID de la tarea.
 * 
 * @route PUT /actualizar/estado-inicio/tarea/:idTarea
 * @param {string} idTarea - ID de la tarea a actualizar.
 * @returns {Promise<void>} - Notifica el éxito o el error en la operación.
 * @throws {Error} Si ocurre un error en la solicitud HTTP.
 */

export const actualizarTareasOrganizacion = (idTarea) => {
  return async (dispatch) => {
    await axios({
      method: "put",
      url: urlServer + `/actualizar/estado-organizacion/tarea/${idTarea}`,
      headers: {
        "Access-Control-Allow-Credentials": true,
        "ngrok-skip-browser-warning": "69420"
      },
    })
      .then((resJson) => {
        Swal.fire("Éxito", "El estado de la tarea se actualizo correctamente", "success");
      })
      .catch((error) => {
        console.log("Error", error)
      
      });
  };
};

/**
 * @description Actualiza el estado de una tarea a "Ejecucion".
 * Envía una solicitud PUT al servidor con el ID de la tarea.
 * 
 * @route PUT /actualizar/estado-inicio/tarea/:idTarea
 * @param {string} idTarea - ID de la tarea a actualizar.
 * @returns {Promise<void>} - Notifica el éxito o el error en la operación.
 * @throws {Error} Si ocurre un error en la solicitud HTTP.
 */
export const actualizarTareasEjecucion = (idTarea) => {
  return async (dispatch) => {
    await axios({
      method: "put",
      url: urlServer + `/actualizar/estado-ejecucion/tarea/${idTarea}`,
      headers: {
        "Access-Control-Allow-Credentials": true,
        "ngrok-skip-browser-warning": "69420"
      },
    })
      .then((resJson) => {
        Swal.fire("Éxito", "El estado de la tarea se actualizo correctamente", "success");
      })
      .catch((error) => {
        console.log("Error", error)
      
      });
  };
};

/**
 * @description Actualiza el estado de una tarea a "Cierre".
 * Envía una solicitud PUT al servidor con el ID de la tarea.
 * 
 * @route PUT /actualizar/estado-cierre/tarea/:idTarea
 * @param {string} idTarea - ID de la tarea a actualizar.
 * @returns {Promise<void>} - Notifica el éxito o el error en la operación.
 * @throws {Error} Si ocurre un error en la solicitud HTTP.
 */

export const actualizarTareasCierre = (idTarea) => {
  return async (dispatch) => {
    await axios({
      method: "put",
      url: urlServer + `/actualizar/estado-cierre/tarea/${idTarea}`,
      headers: {
        "Access-Control-Allow-Credentials": true,
        "ngrok-skip-browser-warning": "69420"
      },
    })
      .then((resJson) => {
        Swal.fire("Éxito", "El estado de la tarea se actualizo correctamente", "success");
      })
      .catch((error) => {
        console.log("Error", error)
      
      });
  };
};







/**
 * Peticion para obtener el un arreglo con el total de estados de las metas creadas
 * @returns
 */
export const consultarProyectoSPI = (data) => {
  return async (dispatch) => {
    await axios({
      method: "post",
      url: urlServer + "/consultar/spi/projecto",
      headers: {
        "Access-Control-Allow-Credentials": true,
        "ngrok-skip-browser-warning": "69420"
      },
      data: {data},
    })
      .then((resJson) => {
        let dataSpi = resJson.data.data;
         dispatch(AddDataSpiProjectToStorange(dataSpi));
      })
      .catch((error) => {
        //Swal.fire("Error", error, "error");
      });
  };
};


export const consultarProyectoCPI = (data) => {
  return async (dispatch) => {
    await axios({
      method: "post",
      url: urlServer + "/consultar/cpi/projecto",
      headers: {
        "Access-Control-Allow-Credentials": true,
        "ngrok-skip-browser-warning": "69420"
      },
      data: {data},
    })
      .then((resJson) => {
        let dataCpi = resJson.data.data;
         dispatch(AddDataCpiProjectToStorange(dataCpi));
      })
      .catch((error) => {
        //Swal.fire("Error", error, "error");
      });
  };
};



export const infotmationIndicators = (data) => {
  return async (dispatch) => {
    await axios({
      method: "post",
      url: urlServer + "/information/indicators",
      headers: {
        "Access-Control-Allow-Credentials": true,
        "ngrok-skip-browser-warning": "69420"
      },
      data: {data},
    })
      .then((resJson) => {
        let dataCpi = resJson.data.data;
        console.log("soy el dataCpi", dataCpi)
        dispatch(addInfomrationIndicatorsToStorange(dataCpi));
      })
      .catch((error) => {
        //Swal.fire("Error", error, "error");
      });
  };
};


export const consultarActividadPlaneada = (data) => {
  return async (dispatch) => {
    await axios({
      method: "post",
      url: urlServer + "/consultar/actividad/planeada",
      headers: {
        "Access-Control-Allow-Credentials": true,
        "ngrok-skip-browser-warning": "69420"
      },
      data: {data},
    })
      .then((resJson) => {
        let dataCpi = resJson.data.data;
        console.log("soy el dataCpi", dataCpi)
        dispatch(AddActivitiesPlanedToStorange(dataCpi));
      })
      .catch((error) => {
        //Swal.fire("Error", error, "error");
      });
  };
};



export const actualizarActividad = (data) => {
  return async (dispatch) => {
    //console.log("soy el data", JSON.stringify(data))
    await axios({
      method: "put",
      url: urlServer + "/actualizar/actividad",
      headers: {
        "Access-Control-Allow-Credentials": true,
        "ngrok-skip-browser-warning": "69420"
      },
      data:data,
    })
      .then((resJson) => {

        Swal.fire("Éxito", "La Actividad se actizalizo con éxito", "success");
      })
      .catch((error) => {
        Swal.fire("Error", error.response.data.msg, "error");
      });
  };
};

export const consultarRecursoActividad = (idActividad) => {
  return async (dispatch) => {
    await axios({
      method: "get",
      url: urlServer +`/consultar/recursos/actividades/${idActividad}`,
      headers: {
        "Access-Control-Allow-Credentials": true,
        "ngrok-skip-browser-warning": "69420"
      },
    })
      .then((resJson) => {
        let recursos = resJson.data.data;
         dispatch(AddRecursosToStorange(recursos));
      })
      .catch((error) => {
        let recursos = [];
        dispatch(AddRecursosToStorange(recursos));
        //Swal.fire("Error", error, "error");
      });
  };
};

export const totalPresupuestoRecursosActividad = (idActividad) => {
  return async (dispatch) => {
    await axios({
      method: "get",
      url: urlServer +`/total/presupuesto-recurso/actividad/${idActividad}`,
      headers: {
        "Access-Control-Allow-Credentials": true,
        "ngrok-skip-browser-warning": "69420"
      },
    })
      .then((resJson) => {
        let recursos = resJson.data.data;
         dispatch(AddTotalRecursosToStorange(recursos));
      })
      .catch((error) => {
        let recursos = {};
        dispatch(AddTotalRecursosToStorange(recursos));
        //Swal.fire("Error", error, "error");
      });
  };
};

export const totalPresupuestoTareasActividad = (idActividad) => {
  return async (dispatch) => {
    await axios({
      method: "get",
      url: urlServer +`/total/presupuesto-tarea/actividad/${idActividad}`,
      headers: {
        "Access-Control-Allow-Credentials": true,
        "ngrok-skip-browser-warning": "69420"
      },
    })
      .then((resJson) => {
        let recursos = resJson.data.data;
         dispatch(AddTotalTareasToStorange(recursos));
      })
      .catch((error) => {
        let recursos = {};
        dispatch(AddTotalTareasToStorange(recursos));
        //Swal.fire("Error", error, "error");
      });
  };
};

export const crearRecurso= (data) => {
  return async (dispatch) => {
    //console.log("soy el data", JSON.stringify(data))
    await axios({
      method: "post",
      url: urlServer + "/crear/recurso/actividad",
      headers: {
        "Access-Control-Allow-Credentials": true,
        "ngrok-skip-browser-warning": "69420"
      },
      data:data,
    })
      .then((resJson) => {

        Swal.fire("Éxito", "El recurso se creo con éxito", "success");
      })
      .catch((error) => {
        Swal.fire("Error", error.response.data.msg, "error");
      });
  };
};



export const consultarPresupuestoActividad = (idActividad) => {
  return async (dispatch) => {
    await axios({
      method: "get",
      url: urlServer +`/consultar/presupuesto-actividad/${idActividad}`,
      headers: {
        "Access-Control-Allow-Credentials": true,
        "ngrok-skip-browser-warning": "69420"
      },
    })
      .then((resJson) => {
        let recursos = resJson.data.data.presupuesto;
         dispatch(AddPresupuestoActividadToStorange(recursos));
      })
      .catch((error) => {
        let recursos = 0;
        dispatch(AddPresupuestoActividadToStorange(recursos));
        //Swal.fire("Error", error, "error");
      });
  };
};




export const eliminarPresupuestoActividad = (idActividad) => {
  return async (dispatch) => {
    await axios({
      method: "delete",
      url: urlServer +`/eliminar/recurso/actividad/${idActividad}`,
      headers: {
        "Access-Control-Allow-Credentials": true,
        "ngrok-skip-browser-warning": "69420"
      },
    })
      .then((resJson) => {
        let recursos = resJson.data.data.presupuesto;
         dispatch(AddPresupuestoActividadToStorange(recursos));
      })
      .catch((error) => {
        let recursos = 0;
        dispatch(AddPresupuestoActividadToStorange(recursos));
        //Swal.fire("Error", error, "error");
      });
  };
};

export const actualizarRecursoActividad= (data) => {
  return async (dispatch) => {
    //console.log("soy el data", JSON.stringify(data))
    await axios({
      method: "put",
      url: urlServer + "/actualizar/recurso/actividad",
      headers: {
        "Access-Control-Allow-Credentials": true,
        "ngrok-skip-browser-warning": "69420"
      },
      data:data,
    })
      .then((resJson) => {

        Swal.fire("Éxito", "El recurso se actualizo con éxito", "success");
      })
      .catch((error) => {
        Swal.fire("Error", error.response.data.msg, "error");
      });
  };
};


/**
 * @description Elimina una actividad específica del sistema.
 * Envía una solicitud DELETE al servidor con el ID de la actividad.
 * 
 * @route DELETE /eliminar/actividad/:idActividad
 * @param {string} idActividad - ID de la actividad a eliminar.
 * @returns {Promise<void>} - Notifica el éxito o el error en la operación.
 * @throws {Error} Si ocurre un error en la solicitud HTTP.
 */

export const eliminarActividad= (idActividad) => {
  return async (dispatch) => {
    await axios({
      method: "delete",
      url: urlServer + `/eliminar/actividad/${idActividad}`,
      headers: {
        "Access-Control-Allow-Credentials": true,
        "ngrok-skip-browser-warning": "69420"
      }
    })
      .then((resJson) => {

        Swal.fire("Éxito", "La actividad se elimino con éxito", "success");
      })
      .catch((error) => {
        Swal.fire("Error", error.response.data.msg, "error");
      });
  };
};


export const consultarTareaPlaneada = (data) => {
  return async (dispatch) => {
    await axios({
      method: "post",
      url: urlServer + "/consultar/tarea/planeada",
      headers: {
        "Access-Control-Allow-Credentials": true,
        "ngrok-skip-browser-warning": "69420"
      },
      data: {data},
    })
      .then((resJson) => {
        let dataCpi = resJson.data.data;
        dispatch(AddTaskPlanedToStorange(dataCpi));
      })
      .catch((error) => {
        //Swal.fire("Error", error, "error");
      });
  };
};

export const consultarRecursoTarea = (idTarea) => {
  return async (dispatch) => {
    await axios({
      method: "get",
      url: urlServer +`/consultar/recurso/tarea/${idTarea}`,
      headers: {
        "Access-Control-Allow-Credentials": true,
        "ngrok-skip-browser-warning": "69420"
      },
    })
      .then((resJson) => {
        let recursos = resJson.data.data;
         dispatch(AddRecursosTaskToStorange(recursos));
      })
      .catch((error) => {
        let recursos = [];
        dispatch(AddRecursosTaskToStorange(recursos));
        //Swal.fire("Error", error, "error");
      });
  };
};

export const crearRecursoTarea= (data) => {
  return async (dispatch) => {
    //console.log("soy el data", JSON.stringify(data))
    await axios({
      method: "post",
      url: urlServer + "/crear/recurso/tarea",
      headers: {
        "Access-Control-Allow-Credentials": true,
        "ngrok-skip-browser-warning": "69420"
      },
      data:data,
    })
      .then((resJson) => {

        Swal.fire("Éxito", "El recurso se creo con éxito", "success");
      })
      .catch((error) => {
        Swal.fire("Error", error.response.data.msg, "error");
      });
  };
};

export const consultarPresupuestoTarea = (idTarea) => {
  return async (dispatch) => {
    await axios({
      method: "get",
      url: urlServer +`/total/presupuesto-recurso/tarea/${idTarea}`,
      headers: {
        "Access-Control-Allow-Credentials": true,
        "ngrok-skip-browser-warning": "69420"
      },
    })
      .then((resJson) => {
        let recursos = resJson.data.data.presupuestoTotal;
         dispatch(AddPresupuestoTaskToStorange(recursos));
      })
      .catch((error) => {
        let recursos = 0;
        dispatch(AddPresupuestoTaskToStorange(recursos));
        //Swal.fire("Error", error, "error");
      });
  };
};

export const consultarPresupuestoMeta = (idMeta) => {
  return async (dispatch) => {
    await axios({
      method: "get",
      url: urlServer +`/consultar/presupuesto/meta/${idMeta}`,
      headers: {
        "Access-Control-Allow-Credentials": true,
        "ngrok-skip-browser-warning": "69420"
      },
    })
      .then((resJson) => {
        let recursos = resJson.data.data;
         dispatch(AddPresupuestoMetaToStorange(recursos));
      })
      .catch((error) => {
        let recursos = 0;
        dispatch(AddPresupuestoMetaToStorange(recursos));
        //Swal.fire("Error", error, "error");
      });
  };
};

export const eliminarRecursoTarea= (idRecurso) => {
  return async (dispatch) => {
    //console.log("soy el data", JSON.stringify(data))
    await axios({
      method: "delete",
      url: urlServer + `/eliminar/recurso/tarea/${idRecurso}`,
      headers: {
        "Access-Control-Allow-Credentials": true,
        "ngrok-skip-browser-warning": "69420"
      }
    })
      .then((resJson) => {
        Swal.fire("Éxito", "La actividad se elimino con éxito", "success");
      })
      .catch((error) => {
        Swal.fire("Error", error.response.data.msg, "error");
      });
  };
};

export const actualizarRecursoTarea= (data) => {
  return async (dispatch) => {
    //console.log("soy el data", JSON.stringify(data))
    await axios({
      method: "put",
      url: urlServer + "/actualizar/recurso/tarea",
      headers: {
        "Access-Control-Allow-Credentials": true,
        "ngrok-skip-browser-warning": "69420"
      },
      data:data,
    })
      .then((resJson) => {

        Swal.fire("Éxito", "El recurso se actualizo con éxito", "success");
      })
      .catch((error) => {
        Swal.fire("Error", error.response.data.msg, "error");
      });
  };
};

/**
 * @description Elimina una tarea específica del sistema.
 * Envía una solicitud DELETE al servidor con el ID de la tarea.
 * 
 * @route DELETE /eliminar/tarea/:idTarea
 * @param {string} idTarea - ID de la tarea a eliminar.
 * @returns {Promise<void>} - Notifica el éxito o el error en la operación.
 * @throws {Error} Si ocurre un error en la solicitud HTTP.
 */

export const eliminarTarea= (idTarea) => {
  return async (dispatch) => {
    //console.log("soy el data", JSON.stringify(data))
    await axios({
      method: "delete",
      url: urlServer + `/eliminar/tarea/${idTarea}`,
      headers: {
        "Access-Control-Allow-Credentials": true,
        "ngrok-skip-browser-warning": "69420"
      }
    })
      .then((resJson) => {
        Swal.fire("Éxito", "La tarea se elimino con éxito", "success");
      })
      .catch((error) => {
        Swal.fire("Error", error.response.data.msg, "error");
      });
  };
};

export const actualizarTarea= (data) => {
  return async (dispatch) => {
    //console.log("soy el data", JSON.stringify(data))
    await axios({
      method: "put",
      url: urlServer + "/actualizar/tarea",
      headers: {
        "Access-Control-Allow-Credentials": true,
        "ngrok-skip-browser-warning": "69420"
      },
      data:data,
    })
      .then((resJson) => {

        Swal.fire("Éxito", "El tarea se actualizo con éxito", "success");
      })
      .catch((error) => {
        Swal.fire("Error", error.response.data.msg, "error");
      });
  };
};

export const actualizarEstadoActividad= (data) => {
  return async (dispatch) => {
    //console.log("soy el data", JSON.stringify(data))
    await axios({
      method: "put",
      url: urlServer + "/actualizar/estado/actividad",
      headers: {
        "Access-Control-Allow-Credentials": true,
        "ngrok-skip-browser-warning": "69420"
      },
      data:data,
    })
      .then((resJson) => {

       // Swal.fire("Éxito", "El actividad se actualizo con éxito", "success");
      })
      .catch((error) => {
        Swal.fire("Error", error.response.data.msg, "error");
      });
  };
};

export const actualizarEstadoMeta= (data) => {
  return async (dispatch) => {
    //console.log("soy el data", JSON.stringify(data))
    await axios({
      method: "put",
      url: urlServer + "/actualizar/estado/meta",
      headers: {
        "Access-Control-Allow-Credentials": true,
        "ngrok-skip-browser-warning": "69420"
      },
      data:data,
    })
      .then((resJson) => {

       // Swal.fire("Éxito", "El actividad se actualizo con éxito", "success");
      })
      .catch((error) => {
        Swal.fire("Error", error.response.data.msg, "error");
      });
  };
};

export const eliminarMeta= (idMeta) => {
  return async (dispatch) => {
    //console.log("soy el data", JSON.stringify(data))
    await axios({
      method: "delete",
      url: urlServer + `/eliminar/meta/${idMeta}`,
      headers: {
        "Access-Control-Allow-Credentials": true,
        "ngrok-skip-browser-warning": "69420"
      }
    })
      .then((resJson) => {
        Swal.fire("Éxito", "La meta se elimino con éxito", "success");
      })
      .catch((error) => {
        Swal.fire("Error", error.response.data.msg, "error");
      });
  };
};


export const actualizarMeta= (data) => {
  return async (dispatch) => {
    //console.log("soy el data", JSON.stringify(data))
    await axios({
      method: "put",
      url: urlServer + "/actualizar/meta",
      headers: {
        "Access-Control-Allow-Credentials": true,
        "ngrok-skip-browser-warning": "69420"
      },
      data:data,
    })
      .then((resJson) => {

       // Swal.fire("Éxito", "El actividad se actualizo con éxito", "success");
      })
      .catch((error) => {
        Swal.fire("Error", error.response.data.msg, "error");
      });
  };
};

/**
 * @description Elimina un proyecto del sistema.
 * Envía una solicitud DELETE al servidor con el ID del proyecto.
 * 
 * @route DELETE /eliminar/proyecto/:idProyecto
 * @param {string} idProyecto - ID del proyecto a eliminar.
 * @returns {Promise<void>} - Notifica el éxito o el error en la operación.
 * @throws {Error} Si ocurre un error en la solicitud HTTP.
 */

export const eliminarProyecto= (idProyecto) => {
  return async (dispatch) => {
    //console.log("soy el data", JSON.stringify(data))
    await axios({
      method: "delete",
      url: urlServer + `/eliminar/proyecto/${idProyecto}`,
      headers: {
        "Access-Control-Allow-Credentials": true,
        "ngrok-skip-browser-warning": "69420"
      }
    })
      .then((resJson) => {
        Swal.fire("Éxito", "EL proyecto se elimino con éxito", "success");
      })
      .catch((error) => {
        Swal.fire("Error", error.response.data.msg, "error");
      });
  };
};

/**
 * @description Actualiza los datos de un proyecto existente.
 * Envía una solicitud PUT al servidor con los datos actualizados del proyecto.
 * 
 * @route PUT /actualizar/proyecto
 * @param {Object} data - Objeto con los datos actualizados del proyecto.
 * @returns {Promise<void>} - Notifica el éxito o el error en la operación.
 * @throws {Error} Si ocurre un error en la solicitud HTTP.
 */

export const actualizarProjecto= (data) => {
  return async (dispatch) => {
    console.log("soy el data", JSON.stringify(data))
    await axios({
      method: "put",
      url: urlServer + "/actualizar/proyecto",
      headers: {
        "Access-Control-Allow-Credentials": true,
        "ngrok-skip-browser-warning": "69420"
      },
      data:data,
    })
      .then((resJson) => {

       // Swal.fire("Éxito", "El actividad se actualizo con éxito", "success");
      })
      .catch((error) => {
        Swal.fire("Error", error.response.data.msg, "error");
      });
  };
};

/**
 * @description Elimina un líder del sistema.
 * Envía una solicitud DELETE al servidor con el ID del líder.
 * 
 * @route DELETE /eliminar/lider/:idLider
 * @param {string} idLider - ID del líder a eliminar.
 * @returns {Promise<void>} - Notifica el éxito o el error en la operación.
 * @throws {Error} Si ocurre un error en la solicitud HTTP.
 */

export const eliminarLider= (idLider) => {
  return async (dispatch) => {
    //console.log("soy el data", JSON.stringify(data))
    await axios({
      method: "delete",
      url: urlServer + `/eliminar/lider/${idLider}`,
      headers: {
        "Access-Control-Allow-Credentials": true,
        "ngrok-skip-browser-warning": "69420"
      }
    })
      .then((resJson) => {
        Swal.fire("Éxito", "El líder se eliminó con éxito", "success");
      })
      .catch((error) => {
        Swal.fire("Error", error.response.data.msg, "error");
      });
  };
};

/**
 * @description Actualiza la información de un líder.
 * Envía una solicitud PUT al servidor con los datos actualizados.
 * 
 * @route PUT /actualizar/lider
 * @param {Object} data - Objeto con los datos actualizados del líder.
 * @returns {Promise<void>} - Notifica el éxito o el error en la operación.
 * @throws {Error} Si ocurre un error en la solicitud HTTP.
 */

export const actualizarLider= (data) => {
  return async (dispatch) => {
    //console.log("soy el data", JSON.stringify(data))
    await axios({
      method: "put",
      url: urlServer + "/actualizar/lider",
      headers: {
        "Access-Control-Allow-Credentials": true,
        "ngrok-skip-browser-warning": "69420"
      },
      data:data,
    })
      .then((resJson) => {

       // Swal.fire("Éxito", "El actividad se actualizo con éxito", "success");
      })
      .catch((error) => {
        Swal.fire("Error", error.response.data.msg, "error");
      });
  };
};

//export {consutarLideres}

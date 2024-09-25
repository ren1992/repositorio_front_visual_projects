import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, ModalHeader, FormGroup } from "reactstrap";
import Swal from "sweetalert2";
import {
  closeModalAddLeader,
  ConsultLiderToStorange,
  closeModalTaddLeader,
  modalAddLeader,
  modalDeleteRecurso,
  modalDeleteActivity,
  modalDeletelTask
} from "../../actions/events";
import MaterialTable, { MTableBody, MTableBodyRow } from "@material-table/core";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdOutlineEmail } from "react-icons/md";
import "../../css/index.css";
import { AiOutlineUserAdd } from "react-icons/ai";
import { BiRename } from "react-icons/bi";
import { crearLider } from "../../actions/apis";
import { consutarLideres } from "../../actions/apis";
import { MdOutlineWarning } from "react-icons/md";
import {  eliminarActividad, consultarActividadesMetas,consultarTareasActividades,consultarTareasActividadesInicio,consultarTareasActividadesOrganizacion,consultarTareasActividadesEjecucion, consultarTareasActividadesCierre, consultarPresupuestoMeta,eliminarTarea} from "../../actions/apis";
export const ModalEliminarTarea = (props) => {
  const dispatch = useDispatch();
  const { modalLider, leaders, deleteRecursoActividad, recursoActividad, idActivity, deleteActivityProject, goal,deleteModalTask } = useSelector((state) => state);
  console.log("soy el idActivity", idActivity)
  const handleCerrar = () => {
    dispatch(modalDeletelTask(false));
  };

 async function handleDeleteTask(tarea)
  {
    await dispatch(eliminarTarea(tarea?.idTarea))
    await dispatch(consultarActividadesMetas(goal.id));
    await dispatch(consultarTareasActividades(idActivity.idActividad));
    await dispatch(consultarTareasActividadesInicio(idActivity.idActividad));
    await dispatch(
      consultarTareasActividadesOrganizacion(idActivity.idActividad)
    );
    await dispatch(consultarTareasActividadesEjecucion(idActivity.idActividad));
    await dispatch(consultarTareasActividadesCierre(idActivity.idActividad));
    await dispatch(consultarPresupuestoMeta(goal.id))
    dispatch(modalDeletelTask(false));
  }
  return (
    <Modal
      className="modalAddLider"
      isOpen={deleteModalTask}
      style={{ marginTop: "15%" }}
    >
      <ModalHeader className="modal-crear-leader">
        <div className="row text-center">
          <div className="col-xs-4 col-sm-4 col-md-4 col-lg-11">
          <MdOutlineWarning size={30}  style={{ marginLeft: "-4rem" }}/>
            <div className="title-create-leader " style={{ marginTop: "-1.8rem", marginLeft: "8rem" }}>
                  Eliminar Tarea
            </div>
          </div>
          <div className="col-xs-4 col-sm-4 col-md-4 col-lg-1">
            <div style={{ marginLeft: "4rem" }} onClick={handleCerrar}>
              X
            </div>
          </div>
        </div>
      </ModalHeader>
      <FormGroup>
        <div className=" container mt-1" style={{marginLeft:'0.5rem'}}>
            {'¿Esta seguro que desea eliminar '+ props.task?.nombre+'?'}
        </div>
      </FormGroup>
      <div className="d-flex justify-content-center">
        <button
          className="btn"
          style={{
            background: "#5254b1",
            color: "white",
            marginBottom: "20px",
          }}
          onClick={()=>handleDeleteTask(props.task)}
        >
          Eliminar tarea{" "}
        </button>
      </div>
    </Modal>
  );
};
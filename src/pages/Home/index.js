import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { ContainerPrincipal } from "./styles";
import List from "../../components/List";
import Form from "../../components/Form";

import api from "../../services/api";

export default function Home() {
  const [createdItems, setCreatedItems] = useState([]);
  const [doneItems, setDoneItems] = useState([]);
  const [task, setTask] = useState({ title: "", description: "" });

  async function getData() {
    try {
      const response = await api.get("/tasks");
      const { data } = response;
      const citems = data.filter((item) => item.status === "CREATED");
      const ditems = data.filter((item) => item.status === "DONE");
      setCreatedItems(
        citems.map((item) => ({
          ...item,
          createdAtFormatted: format(
            new Date(item.createdAt),
            "dd/MM/yyyy HH:mm:ss"
          ),
          updatedAtFormatted: format(
            new Date(item.updatedAt),
            "dd/MM/yyyy HH:mm:ss"
          ),
        }))
      );
      setDoneItems(
        ditems.map((item) => ({
          ...item,
          createdAtFormatted: format(
            new Date(item.createdAt),
            "dd/MM/yyyy HH:mm:ss"
          ),
          updatedAtFormatted: format(
            new Date(item.updatedAt),
            "dd/MM/yyyy HH:mm:ss"
          ),
        }))
      );
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    const loadData = async () => {
      await getData();
    };

    loadData();
  }, []);

  function handleInputChange(event) {
    const { target } = event;
    const { value, name } = target;
    setTask({ ...task, [name]: value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      if (task && task.id === undefined) {
        await api.post("/tasks", {
          ...task,
          status: "CREATED",
        });
      } else {
        await api.put(`/tasks/${task.id}`, task);
      }
      await getData();
      setTask({ title: "", description: "" });
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDelete(id) {
    try {
      const confirm = window.confirm("Confirma a exclusão da tarefa?");
      if (confirm) {
        await api.delete(`/tasks/${id}`);
        await getData();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDone(id) {
    try {
      const confirm = window.confirm("Confirma a conclusão da tarefa?");
      if (confirm) {
        await api.put(`/tasks/${id}`, {
          status: "DONE",
        });
        await getData();
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleCancel() {
    setTask({ title: "", description: "" });
  }

  return (
    <ContainerPrincipal>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className="paper">
              <Form
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
                handleCancel={handleCancel}
                task={task}
              />
            </Paper>
            <Paper className="paper">
              <List
                title="Tarefas pendentes"
                items={createdItems}
                handleDelete={(id) => handleDelete(id)}
                handleDone={(id) => handleDone(id)}
                setTask={setTask}
              />
            </Paper>
            <Paper className="paper">
              <List
                title="Tarefas concluídas"
                items={doneItems}
                handleDelete={(id) => handleDelete(id)}
                setTask={setTask}
              />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </ContainerPrincipal>
  );
}

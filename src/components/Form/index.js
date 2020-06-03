import React from "react";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";

export default function Form(props) {
  const { handleInputChange, handleSubmit, handleCancel, task } = props;
  return (
    <Box>
      <Typography>Tarefa</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          name="title"
          label="Título"
          size="small"
          fullWidth
          onChange={handleInputChange}
          value={task.title}
        />
        <TextField
          name="description"
          label="Descrição"
          size="small"
          fullWidth
          style={{ marginTop: 15 }}
          onChange={handleInputChange}
          value={task.description}
          multiline
          rows="2"
        />
        <Box mt={3} display="flex" justifyContent="flex-end">
          <Button type="submit" variant="contained" color="primary">
            Salvar
          </Button>
          <Button
            type="button"
            style={{ marginLeft: 10 }}
            onClick={handleCancel}
          >
            Cancelar
          </Button>
        </Box>
      </form>
    </Box>
  );
}

Form.propTypes = {
  handleInputChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  task: PropTypes.shape().isRequired,
};

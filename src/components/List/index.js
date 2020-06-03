import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import DoneIcon from "@material-ui/icons/Done";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import PropTypes from "prop-types";

export default function List(props) {
  const { title, items, handleDelete, handleDone, setTask } = props;

  const list = items.map((item) => (
    <TableRow hover key={item.id} onClick={() => setTask(item)}>
      <TableCell style={{ width: 10 }} align="left">
        {item.id}
      </TableCell>
      <TableCell>
        <Box display="flex" flexDirection="column">
          <Typography variant="button" display="block" gutterBottom>
            {item.title}
          </Typography>
          <Tooltip
            title={
              <Typography variant="caption" display="block" gutterBottom>
                Criado em {item.createdAtFormatted}
              </Typography>
            }
          >
            <Typography variant="caption" display="block" gutterBottom>
              Editado em {item.updatedAtFormatted}
            </Typography>
          </Tooltip>
        </Box>
      </TableCell>
      <TableCell style={{ width: 10 }} align="right">
        <Box display="flex" flexDirection="row">
          {item.status !== "DONE" && (
            <Tooltip title="Finalizar">
              <IconButton
                aria-label="finalizar"
                component="span"
                onClick={() => handleDone(item.id)}
              >
                <DoneIcon />
              </IconButton>
            </Tooltip>
          )}
          <Tooltip title="Excluir">
            <IconButton
              aria-label="delete"
              component="span"
              onClick={() => handleDelete(item.id)}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </TableCell>
    </TableRow>
  ));

  return (
    <>
      <Typography>{title}</Typography>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableBody>{list}</TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

List.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  handleDelete: PropTypes.array.isRequired,
  handleDone: PropTypes.array.isRequired,
  setTask: PropTypes.array.isRequired,
};

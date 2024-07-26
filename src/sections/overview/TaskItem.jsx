/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import React, { useState } from "react";

import { Popover, MenuItem, TableRow, TableCell, IconButton } from "@mui/material";

import Iconify from "src/components/iconify";

import ViewModal from './detailView';

const TaskItem = ({ task, list }) => {
  const [openMenu, setOpenMenu] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleOpenMenu = (event) => {
    setOpenMenu(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenu(null);
  };

  return (
    <TableRow
      sx={{
        border: '2px solid #e0e0e0',
        '&:hover': { backgroundColor: '#f5f5f5' },
      }}
    >
      <React.Fragment key={task.id}>
        <TableCell>{task.consultant}</TableCell>
        <TableCell>{task.kind}</TableCell>
        <TableCell style={{ display: 'flex', alignItems: 'center' }}>
          {task.status ? (
            <Iconify icon="mdi:perimeter" style={{ color: 'green' }} />
          ) : (
            <Iconify icon="gravity-ui:circle-check" style={{ color: 'blue' }} />
          )}
        </TableCell>
        <TableCell>{task.date}</TableCell>
        <TableCell>{task.time}</TableCell>
      </React.Fragment>

      <TableCell>
        <IconButton color={openMenu ? 'inherit' : 'default'} onClick={handleOpenMenu}>
          <Iconify icon="eva:more-vertical-fill" />
        </IconButton>
        <Popover
          open={!!openMenu}
          anchorEl={openMenu}
          onClose={handleCloseMenu}
          anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <MenuItem onClick={() => setViewModalOpen(true)}>
            <Iconify icon="gravity-ui:chevrons-expand-up-right" sx={{ mr: 2 }} />
            مشاهده
          </MenuItem>
        </Popover>
      </TableCell>

      <ViewModal
        open={viewModalOpen}
        onClose={() => setViewModalOpen(false)}
        id={list.find((item) => item.id === selectedTask)}
      />
    </TableRow>
  );
};

TaskItem.propTypes = {
  task: PropTypes.object.isRequired,
  list: PropTypes.array.isRequired,
};

export default TaskItem;

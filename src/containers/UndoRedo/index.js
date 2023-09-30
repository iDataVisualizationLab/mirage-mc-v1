import React from 'react'
import {ActionCreators as UndoActionCreators} from 'redux-undo'
import { connect } from 'react-redux'
import {IconButton} from "@mui/material";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";

let UndoRedo = ({ canUndo, canRedo, onUndo, onRedo }) => (
    <>
        <IconButton onClick={onUndo} disabled={!canUndo}><UndoIcon/></IconButton>
        <IconButton onClick={onRedo} disabled={!canRedo}><RedoIcon/></IconButton>
    </>
)

const mapStateToProps = (state) => ({
    canUndo: state.streamFilters.past.length > 0,
    canRedo: state.streamFilters.future.length > 0
})

const mapDispatchToProps = ({
    onUndo: UndoActionCreators.undo,
    onRedo: UndoActionCreators.redo
})

UndoRedo = connect(
    mapStateToProps,
    mapDispatchToProps
)(UndoRedo)

export default UndoRedo



import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import Spinner from '../../components/Spinner';

const NodeInsertPage = ({ formData, isLoading, onChangeData, addNote, handleCloseInsertingNoteDialog }) => {


    return (
        <div className="m-3 card">
            <div className="card-header">
                <h5 className>Not Ekle</h5>
            </div>
            <div className="card-body">

                <div class="form-group">
                    <label for="">Not</label>
                    <textarea
                        class="form-control"
                        name="note"
                        style={{ width: "830px" }}
                        onChange={e => onChangeData("note", e.target.value)}
                        value={formData.note} />
                </div>

            </div>

            {isLoading ? <Spinner /> :
                <div className="modal-footer">
                    <div className='col-lg-1'>

                        <button
                            className="btn  btn-sm"
                            id="search-button"
                            type="button"
                            onClick={addNote}><FontAwesomeIcon icon="save"></FontAwesomeIcon> Ekle</button>
                    </div>
                    <div className='col'></div>
                    <div className='col-lg-1'>

                        <button
                            className="btn btn-sm btn-dark"
                            type="button"
                            onClick={handleCloseInsertingNoteDialog}>
                            <FontAwesomeIcon icon="window-close"></FontAwesomeIcon> Kapat
                        </button>
                    </div>
                </div>
            }
        </div>
    );
};

export default NodeInsertPage;
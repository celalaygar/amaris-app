

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dialog } from '@mui/material';
import React, { useState } from 'react';

const NodeListTable = ({ page }) => {
    const [openViewDialog, setOpenViewDialog] = useState(false);
    const [singleNote, setSingleNote] = useState(null);
    const handleCloseViewDialog = () => {
        setOpenViewDialog(false);
        setSingleNote(null);
    }

    const handleOpenViewDialog = (note) => {
        setOpenViewDialog(true);
        setSingleNote(note);
    }

    return (
        <>

            <table className="table table-hover table-sm">
                <thead>
                    <tr>
                        <th scope="col">Not id</th>
                        <th scope="col">Note</th>
                        <th scope="col">Kaydeden Kullanıcı</th>
                        <th scope="col">İşlemler</th>
                    </tr>
                </thead>
                <tbody>
                    {page?.content?.map((note, index) =>
                        <tr key={index} >
                            <td>{note.noteId}</td>
                            <td>{note.note}</td>
                            <td>{note.user?.username}</td>
                            <td className="d-flex">
                                <li className="nav-item dropdown dropdown-item">
                                    <div className="dropdown">
                                        <button
                                            className="btn btn-secondary btn-sm dropdown-toggle"
                                            type="button"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false">
                                            İşlemler
                                        </button>
                                        <ul className="dropdown-menu">
                                            <li key={1} className="dropdown-item " >
                                                <button
                                                    className="dropdown-item btn btn-secondary btn-sm "
                                                    type="button"
                                                    onClick={e => handleOpenViewDialog(note)}
                                                > Aç </button> </li>

                                            <li key={3} className="dropdown-item " >
                                                <button
                                                    className="dropdown-item btn btn-secondary btn-sm "
                                                    type="button"
                                                > Sil  </button></li>

                                        </ul>
                                    </div>
                                </li>
                            </td>
                        </tr >
                    )
                    }
                </tbody >
            </table >


            <Dialog
                fullWidth={true}
                maxWidth={"md"}
                open={openViewDialog}
                onClose={handleCloseViewDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <>
                    <div className="m-3 card">
                        <div className="card-header">
                            <h5 className>Not </h5>
                        </div>
                        {singleNote &&
                            <>
                                <div className="card-body">
                                    <b>Kullanıcı : </b>{singleNote?.user?.username}
                                </div>
                                <hr></hr>
                                <div className="card-body">
                                    <b>Not : </b>{singleNote?.note}

                                </div>
                            </>
                        }
                    </div>
                    <div className="modal-footer">
                        <div className='col-lg-1'>

                            <button
                                className="btn btn-sm btn-dark"
                                type="button"
                                onClick={handleCloseViewDialog}>
                                <FontAwesomeIcon icon="window-close"></FontAwesomeIcon> Kapat
                            </button>
                        </div>
                    </div>
                </>
            </Dialog >
        </>
    );
};

export default NodeListTable;
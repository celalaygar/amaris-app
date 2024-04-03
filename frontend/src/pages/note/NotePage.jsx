


import React, { useEffect, useState } from 'react';

import { Dialog } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Spinner from '../../components/Spinner';
import NoteService from '../../services/NoteService';
import Input from '../../components/Input';
import alertify from 'alertifyjs';
import NodeInsertPage from './NodeInsertPage';
import NodeListTable from './NodeListTable';
import PaginationComponent from '../../components/PaginationComponent';
import Preloader from '../../components/preloader/Preloader';
import { BACK, FIRST, LAST, NEXT } from '../../constant/GeneralConstant';

const NotePage = ({ notes }) => {

    const [error, setError] = useState(null);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [openInsertDialog, setOpenInsertDialog] = useState(false);
    const [page, setPage] = useState({
        content: [],
        number: 0,
        size: 5,
    });
    const [formData, setFormData] = useState({
        note: "",
    });
    useEffect(() => {
        getNotessWithPagination(page.number, page.size);
    }, []);
    const onClickPagination = (event, value) => {
        event.preventDefault();
        if (value === NEXT) {
            const nextPage = page.number + 1;
            getNotessWithPagination(nextPage, page.size);
        } else if (value === BACK) {
            const nextPage = page.number - 1;
            getNotessWithPagination(nextPage, page.size);
        } else if (value === LAST) {
            const nextPage = page.totalPages - 1;
            getNotessWithPagination(nextPage, page.size);
        } else if (value === FIRST) {
            const nextPage = 0;
            getNotessWithPagination(nextPage, page.size);
        }
    };
    const getNotessWithPagination = async (number, size) => {
        setIsLoading(true);
        try {
            const response = await NoteService.getNotesWithPagination(number, size);
            setPage({ ...response.data });
        } catch (error) {
            if (error.response) {
                console.log(error.response)
            }
            else if (error.request)
                console.log(error.request);
            else
                console.log(error.message);
        }

        setIsLoading(false);
    };

    const onChangeData = (name, value) => {
        if (error) {
            setError(null);
        }
        const stateData = formData;
        stateData[name] = value

        setFormData({ ...stateData });
    }

    const handleCloseInsertingNoteDialog = () => {
        setOpenInsertDialog(false);
        onChangeData("note", "");
        getNotessWithPagination(page.number, page.size);
    }

    const handleOpenInsertingNoteDialog = () => {
        setOpenInsertDialog(true);
        onChangeData("note", "");
        getNotessWithPagination(page.number, page.size);
    }




    const addNote = async (event) => {
        setIsLoading(true);
        event.preventDefault();
        if (error) {
            setError(null);
        }
        try {
            let body = {
                note: formData.note
            };
            if (formData.note !== undefined) {
                const response = await NoteService.save(body);
                alertify.alert('Uyarı', "Güncelleme İşlemi Başarılı");

            } else {
                let errors = {
                    note: "Lütfen Not Giriniz",
                }
                setErrors({ ...errors })
            }

        } catch (error) {
            if (error.response) {
                console.log(error.response);
                if (error.response.data.status === 500) {
                }
                if (error.response.data.validationErrors) {
                    setErrors({ ...error.response.data.validationErrors })
                }
            }
            else if (error.request)
                console.log(error.request);
            else
                console.log(error.message);
        }
        setIsLoading(false);
        handleCloseInsertingNoteDialog();
    }


    const deleteNote = async (event, note) => {
        setIsLoading(true);
        event.preventDefault();
        if (error) {
            setError(null);
        }
        try {
            let body = {
                ...note
            };
            if (formData.note !== undefined) {
                const response = await NoteService.delete(body);
                alertify.alert('Uyarı', "Not silinmiştir.");

            } else {
                let errors = {
                    note: "Lütfen Not Giriniz",
                }
                setErrors({ ...errors })
            }

        } catch (error) {
            if (error.response) {
                console.log(error.response);
                if (error.response.data.status === 500) {
                }
                if (error.response.data.validationErrors) {
                    setErrors({ ...error.response.data.validationErrors })
                }
            }
            else if (error.request)
                console.log(error.request);
            else
                console.log(error.message);
        }
        setIsLoading(false);
        getNotessWithPagination(page.number, page.size);
    }
    return (
        <div className="row ">
            <div className="col-sm-12 mt-2">
                <div className="card">
                    <div className="card-header">
                        <div className=" justify-content-center">
                            <h5 className="mb-0" >Notlar</h5>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-sm-12 mt-2">

                <button
                    className="btn btn-secondary btn-sm "
                    onClick={handleOpenInsertingNoteDialog}
                    type="button"> Not Ekle</button>


            </div>
            <div className="col-sm-12 mt-2">
                {isLoading ? (
                    <Preloader width={50} height={50} />
                ) : (
                    <NodeListTable page={page} deleteNote={deleteNote} />
                )}
            </div>
            {page.content.length > 0 ? (
                <div className="col-sm-12 mt-3 ">
                    <PaginationComponent
                        first={page.first}
                        last={page.last}
                        number={page.number}
                        onClickPagination={onClickPagination}
                        totalPages={page.totalPages}
                    />
                </div>
            ) : null}

            <Dialog
                fullWidth={true}
                maxWidth={"md"}
                open={openInsertDialog}
                onClose={handleCloseInsertingNoteDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <>
                    <NodeInsertPage
                        formData={formData}
                        isLoading={isLoading}
                        onChangeData={onChangeData}
                        handleCloseInsertingNoteDialog={handleCloseInsertingNoteDialog}
                        addNote={addNote}
                    />
                </>
            </Dialog >
        </div >
    );
};

export default NotePage;
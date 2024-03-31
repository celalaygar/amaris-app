
import React, { Component, useState } from 'react'
import { connect, useSelector } from 'react-redux';
import Input from '../../../components/Input';
import Spinner from '../../../components/Spinner';
//import { logoutAction } from '../../../redux/AuthenticationAction';
import AlertifyService from '../../../services/AlertifyService';
import UserService from '../../../services/UserService';


import { selectedAuthentication } from '../../../redux/redux-toolkit/authentication/AuthenticationSlice';

const MyAccountPasswordEdiPage = () => {

    const selectedAuth = useSelector(selectedAuthentication);
    const [formData, setFormData] = useState({
        oldPassword: '',
        newPassword: '',
        repeatNewPassword: '',
        email: '',
        password: '',
        motherName: undefined,
        fatherName: undefined,
        tcNo: undefined,
        phoneNumber: undefined,
        bloodType: undefined,
        role: "Seçiniz",
    });

    const [error, setError] = useState(null);
    const [errors, setErrors] = useState({});
    const [isdisable, setIsdisable] = useState(true);
    const [isLoading, setIsLoading] = useState(false);


    const loadUser = async () => {
        try {
            const response = await UserService.get("/my-account");
        } catch (error) {
            if (error.response) {
                console.log(error.response)

            }
            else if (error.request)
                console.log(error.request);
            else
                console.log(error.message);
        }
    }
    const onChangeData = (type, event) => {
        if (error) {
            setError(null)
        }
        const stateData = formData;
        let errorsObj = errors;
        stateData[type] = event;
        if (stateData["newPassword"]) {
            if (stateData["newPassword"] === stateData["repeatNewPassword"]) {
                stateData["isdisable"] = false;
                errorsObj = { newPassword: undefined }
            } else {
                errorsObj = { newPassword: "Şifreler Uyuşmuyor" }
            }
        } else if (stateData["newPassword"] || stateData["repeatNewPassword"]) {
            errorsObj = { newPassword: "Şifreler Uyuşmuyor" }
        } else if (!stateData["newPassword"] || !stateData["repeatNewPassword"]) {
            errorsObj = { newPassword: undefined }
        }
        setErrors(errorsObj)
        setFormData(stateData)
    }
    const onClickUpdate = async (event) => {
        setIsLoading(true);

        event.preventDefault();
        if (error) {
            setError(null);
        }

        try {
            let body = {
                oldPassword: formData.oldPassword,
                newPassword: formData.newPassword,
                repeatNewPassword: formData.repeatNewPassword,
            }
            const response = await UserService.updateMyPassword(body);
            if (response.data.body === true) {
                AlertifyService.alert("Şifreniz Güncellendi. Lütfen Tekrar Giriş Yapınız")
            } else {
                AlertifyService.alert(response.data)
            }

        } catch (error) {
            if (error.response) {
                console.log(error.response)
                if (error.response.status === 401 && error.response.data) {
                    console.log(error.response.data)
                    setError(error.response.data)
                }
            }
            else if (error.request)
                console.log(error.request);
            else
                console.log(error.message);
        }
        setIsLoading(false);

    }
    return (
        <div className="row">
            <div className="col-lg-8">
                <div className="card">
                    <div className="card-header">
                        <h5 className="mb-0">Şifremi Güncelle</h5>
                    </div>
                    <div className="card-body">
                        <form >
                            <Input
                                label={"Mevcut Şifreniz *"}
                                error={errors.oldPassword}
                                type="password"
                                name="oldPassword"
                                placeholder={"Mevcut Şifreniz *"}
                                valueName={formData.oldPassword}
                                onChangeData={onChangeData}
                            />
                            <Input
                                label={"Yeni Şifreniz *"}
                                error={errors.newPassword}
                                type="password"
                                name="newPassword"
                                placeholder={"Yeni Şifreniz *"}
                                valueName={formData.newPassword}
                                onChangeData={onChangeData}
                            />
                            <Input
                                label={"Yeni Şifreniz (Tekrar) *"}
                                type="password"
                                name="repeatNewPassword"
                                placeholder={"Yeni Şifreniz (Tekrar)) *"}
                                valueName={formData.repeatNewPassword}
                                onChangeData={onChangeData}
                            />

                            {isLoading ? <Spinner /> :
                                <button
                                    className="btn"
                                    id="search-button"
                                    type="button"
                                    //disabled={!btnEnable}
                                    disabled={isdisable ? true : ""}
                                    onClick={onClickUpdate}>Güncelle</button>
                            }

                        </form>
                        <br />
                        {error && <div className="alert alert-danger" role="alert"> {error} </div>}
                    </div>
                    <div className="col"></div>
                    <div className="col-lg-12">
                        <hr />
                        <hr />
                        <hr />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyAccountPasswordEdiPage;


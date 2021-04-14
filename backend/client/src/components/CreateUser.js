import { Box, Button, Collapse, FormControlLabel, InputLabel, Radio, RadioGroup } from '@material-ui/core';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { TextField } from 'formik-material-ui';
import React, { useEffect, useState } from 'react';
import { validationSchema } from '../validation/User';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, getUserState, addUser, changeStatus, updateUser } from '../reducers/userslice';

const CreateUser = (props) => {

    const userstate = useSelector(getUserState);

    const [error, seterror] = useState('')

    const dispatch = useDispatch();

    useEffect(() => {
        if (props.id) {
            debugger;
            dispatch(getUser(props.id))
                .then(res => {
                    if (res.error) {
                        seterror("SERVER ERROR");
                    } else {
                        props.toggle(true);
                    }
                });
        }
        return () => {

        }
    }, [props.id, dispatch]);

    return (
        <><div>{error}</div>
            <Collapse in={props.show}>
                <Formik
                    initialValues={props.id && userstate.user ? userstate.user : { name: '', email: '', gender: '' }}
                    validationSchema={validationSchema}
                    enableReinitialize
                    onSubmit={(values, { setSubmitting }) => {
                        if (props.id) {
                            let data = { ...values };
                            dispatch(updateUser(data)).then((res) => {
                                if (res.error) {
                                    seterror("SERVER ERROR");
                                } else {
                                    dispatch(changeStatus('idle'));
                                    props.toggle(!props.show);
                                }
                            });
                        } else {
                            dispatch(addUser(values)).then((res) => {
                                dispatch(changeStatus('idle'));
                                props.toggle(!props.show);
                            }).catch(err => {
                                alert('Error');
                            });
                        }
                    }}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
                        setFieldValue
                        /* and other goodies */
                    }) => (
                        <Form onSubmit={handleSubmit} autoComplete="off">
                            <Box paddingBottom={3}>
                                <Field fullWidth name="name" label="Name" component={TextField} ></Field>
                            </Box>
                            <Box paddingBottom={3}>
                                <Field fullWidth name="email" label="Email" component={TextField} ></Field>
                            </Box>
                            <Box paddingBottom={3} style={{ float: 'left', textAlign: 'left' }} >
                                <InputLabel>Gender</InputLabel>
                                <RadioGroup className={errors.gender ? 'error' : ''} name="gender" style={{ display: 'inline-block', float: 'left' }} value={values.gender}
                                    onChange={handleChange("gender")}
                                >
                                    <FormControlLabel value="Male" control={<Radio />} label="Male" />
                                    <FormControlLabel value="Female" control={<Radio />} label="Female" />
                                </RadioGroup>
                                <div style={{ color: 'red' }}><ErrorMessage name="gender" /></div>
                                {/* {errors.gender ? <div>{errors.gender}</div> : null} */}
                            </Box>
                            <Box paddingBottom={3}>
                                <Button variant="contained" color="primary" style={{ float: 'right', margin: 5 }} type="submit">{props.id ? 'Update' : 'Save'}</Button>
                                <Button variant="contained" color="default" style={{ float: 'right', margin: 5 }} onClick={() => props.toggle(!props.show)}>Cancel</Button>
                            </Box>
                        </Form>
                    )}
                </Formik>
            </Collapse>
        </>
    )
}

export default CreateUser;
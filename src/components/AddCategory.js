import React from "react";
import {Alert, Button, Col, Form, Input, Row} from "antd";
import axios from "axios";
import {HOME_URL, ADD_CATEGORIES_URL} from "../constants/app-contants";
import {setError, setTitle} from "../actions";
import {connect, useDispatch} from "react-redux";
import PropTypes from 'prop-types';

const AddCategory = ({title, isError}) => {
    const dispatch = useDispatch();

    const handleForm = (event) => {
        event.preventDefault();
        createCategory();
    };

    const handleChangeTitle = (event) => {
        dispatch(setTitle(event.target.value));
    };

    const createCategory = () => {
        axios.post(ADD_CATEGORIES_URL, {title})
            .then(response => {
                window.location.href = HOME_URL;
            })
            .catch(error => {
                console.log(error);
                dispatch(setError(true, ''));
            })
    };

    return (
        <Row type="flex" justify="center">
            {
                isError ? <Col span={13} style={{textAlign: 'center'}}>
                    <Alert message="Произошла ошибка" type="error"/>
                </Col> : ''
            }
            <Col style={{textAlign: "center"}} span={13}>
                <Form className="create-product-form" onSubmit={handleForm}>
                    <Form.Item>
                        <Input
                            placeholder="title"
                            onChange={handleChangeTitle}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Add category
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    )
};

AddCategory.propTypes = {
  title: PropTypes.string,
  isError: PropTypes.bool.isRequired
};

const mapStateToProps = (state, ownProps) => {
    return {
        title: state.title,
        isError: state.isError,
    }
};

export default connect(mapStateToProps)(AddCategory);
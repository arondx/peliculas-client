import React, { useState, useEffect } from 'react'
import { Button, Alert, Form, Input, Checkbox, Card, Typography, Flex } from 'antd';

import { useAuthMutation } from '../auth-api-slice';
import { selectIsPersisted, setCredentials } from '../auth-slice';
import { useDispatch, useSelector } from 'react-redux';

import { Link, useLocation, useNavigate } from 'react-router-dom';
import PageLoader from '../../../components/page-loader';

function LoginView() {

    const [error, setError] = useState()
    const [auth, { isLoading, isError }] = useAuthMutation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const [persist, setPersist] = useState(useSelector(selectIsPersisted))
    
    const togglePersist = () => {
        setPersist(prev => !prev);
        console.log("changed!")
    }

    const from = location.state?.from?.pathname || '/'

    useEffect(() => {
        localStorage.setItem("persist", persist);
    }, [persist])


    const onFinish = async (values) => {
        console.log('Success:', values);
        const user = values.user
        const pwd = values.pwd
        try {
            !isError && setError(null)
            const userData = await auth({ user, pwd }).unwrap()
            dispatch(setCredentials({ ...userData, user }))
            navigate(from, { replace: true });
        } catch (err) {
            console.log(err)
            if (err?.data) {
                setError(err.data)
            } else if (err?.error) {
                setError(err.error)
            }
        }
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const content = isLoading
        ? (<PageLoader />)
        : (<Flex vertical style={{
            maxWidth: 576,
            marginInline: 'auto'
        }}>
            <Card>
                <Form
                    name="auth"
                    layout='vertical'
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Username"
                        name="user"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="pwd"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="persist"
                        valuePropName="checked">
                        <Checkbox onChange={togglePersist} defaultChecked={persist} checked={persist}>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item >
                        <Button type="primary" htmlType="submit">
                            Log in
                        </Button>
                    </Form.Item>

                </Form>
                {error && <Alert message={error} type="error" showIcon />}
            </Card>
            <Card
                style={{
                    marginTop: '16px'
                }}>
                <Typography style={{ textAlign: 'center' }}>Don´t have an account? <Link to="/register">Sign up</Link></Typography>
            </Card>
        </Flex>)

    return content
}

export default LoginView
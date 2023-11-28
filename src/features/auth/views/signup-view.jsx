import React, { useState } from 'react'
import { Button, Alert, Form, Input, Typography, Card, Flex } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';

function SignupView() {

    const [error, setError] = useState()

    const onFinish = async (values) => {
        console.log('Success:', values);
        try {
            const res = await axios.post(
                'http://localhost:3500/register',
                values,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            console.log(res)
            setError(null)
        } catch (err) {
            err.response.data ? setError(err.response.data.message) : console.log(err)
        }

    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Flex vertical style={{
            maxWidth: 576,
            marginInline: 'auto'
        }}>
            <Card>
                <Form
                    name="register"
                    layout='vertical'
                    style={{
                        maxWidth: 600,
                    }}
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

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Sign up
                        </Button>
                    </Form.Item>

                </Form>
                {error && <Alert message={error} type="error" showIcon />}
            </Card>
            <Card
                style={{
                    marginTop: '32px'
                }}>
                <Typography style={{ textAlign: 'center' }}>Have an account? <Link to="/auth">Log in</Link></Typography>
            </Card>
        </Flex>
    )
}

export default SignupView
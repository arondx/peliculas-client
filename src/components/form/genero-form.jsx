import React, { useState } from 'react'
import { Button, Form, Input, Alert } from 'antd';
import PageLoader from '../page-loader';

function GeneroForm({
  form,
  initialValues,
  onFinish,
  isLoading,
  isSuccess,
  error
}) {

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const [isDirty, setisDirty] = useState(false)

  const handleIsDirty = () => {
    const initValues = JSON.stringify(initialValues)
    const currValues = JSON.stringify(form.getFieldsValue())

    console.log(form.getFieldsValue())
    if (error) console.log(error)

    if (currValues != initValues) setisDirty(true)
    else setisDirty(false)
  }

  const content = isLoading
    ? <PageLoader />
    : <>
      <Form
        name="basic"
        layout='vertical'
        style={{
          maxWidth: 480,
          marginInline: 'auto'
        }}
        form={form}
        initialValues={initialValues}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        onFieldsChange={handleIsDirty}
      >
        <Form.Item
          label="Título"
          name="titulo"
          rules={[
            {
              required: true,
              message: 'Por favor ingresa el título.',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" disabled={!isDirty}>
            Submit
          </Button>
        </Form.Item>
      </Form>
      {error && <Alert message={error.data?.message} type="error" showIcon />}
    </>

  return content
}

export default GeneroForm
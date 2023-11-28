import React from 'react'
import { Card, message, Form } from 'antd'
import GeneroForm from '../../../components/form/genero-form'
import { useCreateGeneroMutation } from '../generos-api-slice'

function CrearGeneroView() {
    
    const [ create, { error, isLoading, isSuccess, data } ] = useCreateGeneroMutation()
    const [form] = Form.useForm()

    const initialValues = {
        titulo: ''
    }

    const onFinish = async (values) => {
        console.log('Success:', values);
        try {
            await create(values).unwrap()
            message.success("El género ha sido creado con éxito.")
            form.resetFields()
        } catch (err) {
            console.log(err)
        }
    };
    
    return (
        <Card style={{ maxWidth: 480, marginInline: 'auto' }}>
            <GeneroForm
                form={form}
                initialValues={initialValues}
                onFinish={onFinish}
                error={error}
                isLoading={isLoading}
                isSuccess={isSuccess}
                data={data}/>
        </Card>
    )
}

export default CrearGeneroView
import React, { useState } from 'react';
import { Button, Form, Input, InputNumber, AutoComplete, Flex, Card } from 'antd';
const { TextArea } = Input;
import ImageUploader from './image-uploader';
import FormItem from 'antd/es/form/FormItem';
import { useGetPeliculasGenresQuery } from '../../features/peliculas/peliculas-api-slice';

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const PeliculaForm = ({
  form,
  onFinish
}) => {

  const { data } = useGetPeliculasGenresQuery()

  const getOptions = () => {
    console.log(data.result)
    return data.result.map(opt => ({
      value: opt,
    }))
  }

  const handleFileChange = (value) => {
    form.setFieldValue('imagen', value)
    form.setIsDirty()
    form.g
  } 


  return (
    <Form
      name="basic"
      layout='vertical'
      form={form}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      onChange={() => console.log(form.getFieldsValue())}
      onValuesChange={form.setIsDirty}
    >

      <div style={{
        display: 'flex',
        gap: 20,
        flexWrap: 'wrap',
      }}>
        <Card style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexGrow: 1
        }}>
          <FormItem
            label="Imagen"
            name="imagen"
            rules={[
              {
                required: true,
                message: 'Por favor sube una imagen.',
              },
            ]}
          >
            <ImageUploader handleFileChange={handleFileChange} form={form} />
          </FormItem>
        </Card>

        <Card style={{
          flexGrow: 3
        }}>
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

          <Form.Item
            label="Director"
            name="director"
            rules={[
              {
                required: true,
                message: 'Por favor ingresa el director.',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Año"
            name="año"
            rules={[
              {
                required: true,
                message: 'Por favor ingresa el año.',
              },
            ]}
          >
            <InputNumber min={1900} max={2024} />
          </Form.Item>

          <Form.Item
            label="Género"
            name="genero"
            rules={[
              {
                required: true,
                message: 'Por favor selecciona el género.',
              },
            ]}
          >
            <AutoComplete
              options={data && getOptions()}
              style={{
                width: 200,
              }}
              filterOption={(inputValue, option) =>
                option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
              }
            />
          </Form.Item>

          <Form.Item
            label="Sinopsis"
            name="sinopsis"
            rules={[
              {
                required: true,
                message: 'Por favor ingresa la sinopsis.',
              },
            ]}
          >
            <TextArea />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" disabled={!form.isDirty}>
              Submit
            </Button>
          </Form.Item>
        </Card>
      </div>
    </Form>
  );
}
export default PeliculaForm;

import React, { useEffect, useState } from 'react';
import { Table, Image, Row, Col, Card, Input, Button, Flex, Tooltip, Space, Tabs, Tag, Alert, Typography } from 'antd';
const { Title } = Typography
import { EditOutlined, ArrowRightOutlined, FilterOutlined, SearchOutlined, StarOutlined, StarFilled } from '@ant-design/icons';
import PageLoader from '../../../components/page-loader'

import {
  useGetAllPeliculasQuery,
  useGetPeliculasGenresQuery,
  useGetPeliculasAñosQuery,
  useGetPeliculasDirectoresQuery,
  useLazyFilterPeliculasQuery
} from '../peliculas-api-slice';

import FiltersFilter from '../../../components/filters/filters-panel';

function ListarPeliculasView() {

  const { data: peliculas = { result: [] }, isLoading } = useGetAllPeliculasQuery()
  const { data: generos = { result: [] } } = useGetPeliculasGenresQuery()
  const { data: años = { result: [] } } = useGetPeliculasAñosQuery()
  const { data: directores = { result: [] } } = useGetPeliculasDirectoresQuery()
  const [trigger] = useLazyFilterPeliculasQuery()


  const [filters, setFilters] = useState({
  });

  if (filters) {
    console.log(new URLSearchParams(filters).toString())
  }

  const handleFilterChange = (selectedValues, filterName) => {
    console.log(selectedValues)
    console.log(filterName)
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: selectedValues,
    }));
  };

  const addRowKey = (rows) => {
    return rows.map((row, idx) => ({
      ...row,
      key: idx
    }))
  }

  const [open, setOpen] = useState(false)

  const formatSelectOptions = (data) => {
    return data.map(item => ({
      label: item,
      value: item,
      desc: item
    }))
  }

  const plainOptions = [
    {
      label: 'Género',
      filterName: 'genero',
      type: 'select',
      options: formatSelectOptions(generos?.result),
      config: {
        mode: 'multiple'
      }
    },
    {
      label: 'Director',
      filterName: 'director',
      type: 'select',
      options: formatSelectOptions(directores?.result),
      config: {
        mode: 'multiple'
      }
    },
    {
      label: 'Año',
      filterName: 'año',
      type: 'range',
      values: años?.result,
    },
    {
      label: 'Destacada',
      filterName: 'destacada',
      type: 'select',
      options: formatSelectOptions(['Destacadas', 'No destacadas']),
    },
  ];

  const columns = [
    {
      title: 'Imagen',
      dataIndex: 'imagen',
      key: 'imagen',
      render: (value) => <Image height={32} style={{ aspectRatio: '1 / 1' }} src={value.cloudinaryUrl} />
    },
    {
      title: 'Titulo',
      dataIndex: 'titulo',
      key: 'titulo',
    },
    {
      title: 'Director',
      dataIndex: 'director',
      key: 'director',
    },
    {
      title: 'Género',
      dataIndex: 'genero',
      key: 'genero',
    },
    {
      title: 'Año',
      dataIndex: 'año',
      key: 'año'
    },
    {
      title: 'Destacada',
      dataIndex: 'destacada',
      key: 'destacada',
      render: (value) => value ? <Tag color='blue'>'Sí</Tag> : <Tag color='red'>No</Tag>
    },
    {
      title: 'Acciones',
      dataIndex: '',
      key: '',
      render: (value, record) =>
        <Space>
          <Tooltip placement="top" title={record.destacada ? 'Desmarcar' : 'Destacar'}>
            <Button size='small' icon={record.destacada ? <StarFilled /> : <StarOutlined />}></Button>
          </Tooltip>
          <Tooltip placement="top" title='Editar'>
            <Button size='small' icon={<EditOutlined />}></Button>
          </Tooltip>
          <Tooltip placement="top" title='Ver'>
            <Button size='small' icon={<ArrowRightOutlined />}></Button>
          </Tooltip>
        </Space>
    }
  ]

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
  };


  return (
    isLoading ? <PageLoader /> :
      <div>
        <Title level={2}>Lista de películas</Title>
        <Card>
          <Row>
            <Col span={24}>
              <div>
                <Alert
                  message=""
                  description="1 Pelicula(s) seleccionada(s)"
                  type="info"
                  action={
                    <Space>
                      <Button size="small" danger ghost>
                        Borrar
                      </Button>
                    </Space>
                  }
                  style={{ marginBottom: 8 }}
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <div style={{ position: 'relative', maxWidth: 346 }}>
                <Flex gap={8}>
                  <Space.Compact style={{ width: '100%' }}>
                    <Input onChange={(e) => handleFilterChange(e.target.value, 'titulo')} placeholder="Basic usage" />
                    <Tooltip placement='top' title="Buscar">
                      <Button icon={<SearchOutlined />} />
                    </Tooltip>
                  </Space.Compact>
                  <Tooltip placement='top' title={open ? 'Ver menos filtros' : 'Ver más filtros'}>
                    <Button onClick={() => setOpen(!open)} icon={<FilterOutlined />} />
                  </Tooltip>
                </Flex>
                <FiltersFilter
                  open={open}
                  options={generos && plainOptions}
                  handleFilterChange={handleFilterChange}
                  onFilter={() => trigger(filters)}
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <div style={{ display: 'flex' }}>
                {/* <FiltersFilter options={plainOptions} /> */}
                <Table
                  style={{ flex: 1, overflow: 'auto', marginTop: 24 }}
                  dataSource={peliculas ? addRowKey(peliculas.result) : null}
                  columns={columns ? columns : null}
                  rowSelection={rowSelection}
                  pagination={{ pageSize: 5 }
                  } />
              </div>
            </Col>
          </Row>
        </Card>

      </div>

  );
}

export default ListarPeliculasView;

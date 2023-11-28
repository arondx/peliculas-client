import React, { useState } from 'react'
import SelectFilter from './select-filter'
import RangeFilter from './range-filter'
import { FilterOutlined } from '@ant-design/icons';
import { Button, Flex, Divider } from 'antd';
function FiltersPanel({
    options,
    open,
    handleFilterChange,
    onFilter
}) {

    const wrapperStyle = {
        border: '1px solid #d9d9d9',
        paddingInline: 12,
        paddingBlock: 8,
        borderRadius: 4
    }

    const renderFilters = options.map(item => {
        if (item.type === 'select') {
            return (
                <div style={wrapperStyle}>
                    <SelectFilter 
                        label={item.label}
                        filterName={item.filterName}
                        options={item.options}
                        handleFilterChange={handleFilterChange}
                        config={item.config}
                        />
                </div>
            ) 
        } else if (item.type === 'range') {
            return (
                <div style={wrapperStyle}>
                    <RangeFilter 
                        label={item.label}
                        filterName={item.filterName}
                        values={item.values}
                        handleFilterChange={handleFilterChange}
                    />
                </div>
            )
       }
    }) 

    return (
        <Flex vertical style={{ 
                border: '1px solid #f9f9f9', 
                background: '#FFF',
                padding: 24, 
                position: 'absolute',
                zIndex: 100, 
                display: open ? 'block' : 'none', 
                width: '100%', 
                boxShadow: '0 6px 16px 0 rgba(0, 0, 0, 0.08),0 3px 6px -4px rgba(0, 0, 0, 0.12),0 9px 28px 8px rgba(0, 0, 0, 0.05)', 
                borderRadius: 8
                }}>   
            <Flex vertical gap={20}>
                {renderFilters}
            </Flex>
            <Flex gap={8} justify='flex-end' style={{ marginTop: 32 }}>
                <Button size='small' type='primary' onClick={onFilter}>Aplicar</Button>
                <Button size='small' type='link' ghost>Resetear</Button>
            </Flex>
        </Flex>

    )
}

export default FiltersPanel
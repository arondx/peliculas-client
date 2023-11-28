import React from 'react'
import { Select, Space, Form } from 'antd';

function SelectFilter({
    placeholder,
    label,
    filterName,
    options,
    handleFilterChange,
    config
}) {
    
    const handleChange = (value) => {
        handleFilterChange(value, filterName)
    }

    return (
            <div style={{ marginBottom: 12 }}>
                <label style={{ display: 'block', marginBottom: 4 }}>{label}</label>
                <Select
                    {...config}
                    allowClear
                    size='small'
                    style={{
                        minWidth: '100%'  
                    }}
                    placeholder={placeholder}
                    onChange={handleChange}
                    optionLabelProp="label"
                    options={options}
                    optionRender={(option) => (
                        <Space>
                            {option.data.desc}
                        </Space>
                    )}
                />
            </div>
    )
}

export default SelectFilter
import { useEffect, useState } from 'react'
import { Slider, InputNumber, Flex, Form } from 'antd';

function RangeFilter({
    label,
    values,
    filterName,
    handleFilterChange
}) {
    const minValue = Math.min(...values)
    const maxValue = Math.max(...values)

    const [año, setAño] = useState({
        min: minValue,
        max: maxValue
    })

    const onSliderChange = (newValue) => {
        setAño({
            min: newValue[0],
            max: newValue[1]
        });
    };

    const onAfterChange = (newValue) => {
        handleFilterChange(newValue, filterName);
    };

    const onMinValueChange = (newValue) => {
        setAño((prev) => ({
            ...prev,
            min: newValue
        }));
    };

    const onMaxValueChange = (newValue) => {
        setAño((prev) => ({
            ...prev,
            max: newValue
        }));
    };

    const onBlurMinValue = () => {
        handleFilterChange([año.min, año.max], filterName);
    };

    const onBlurMaxValue = () => {
        handleFilterChange([año.min, año.max], filterName);
    };


    return (
        <div style={{ marginBottom: 12, maxWidth: 224 }}>
            <label style={{ display: 'block', marginBottom: 4 }}>{label}</label>
            <Slider
                range
                min={minValue}
                max={maxValue}
                defaultValue={[año.min, año.max]}
                style={{ marginInline: 12 }}
                value={[año.min, año.max]}
                onChange={onSliderChange}
                onAfterChange={onAfterChange}
            />
            <Flex justify='center' gap={8}>
                <InputNumber
                    size='small'
                    min={minValue}
                    max={maxValue}
                    defaultValue={minValue}
                    value={año.min}
                    onChange={onMinValueChange}
                    onBlur={onBlurMinValue}
                />
                <InputNumber
                    size='small'
                    min={minValue}
                    max={maxValue}
                    defaultValue={maxValue}
                    value={año.max}
                    onChange={onMaxValueChange}
                    onBlur={onBlurMaxValue}
                />
            </Flex>
        </div>
    )
}

export default RangeFilter
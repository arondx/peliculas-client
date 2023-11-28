import { useState, useEffect, useRef } from "react";
import { Form } from 'antd';

function useCustomForm() {

    const [form] = Form.useForm()
    const [isDirty, setIsDirty] = useState(false);
    const refInitialValues = useRef(null)

    useEffect(() => {
        refInitialValues.current = form.getFieldsValue();
    }, [])

    const handleIsDirty = () => {
        const initValues = JSON.stringify(refInitialValues.current);
        const currValues = JSON.stringify(form.getFieldsValue());

        if (currValues !== initValues) {
            setIsDirty(true);
        } else {
            setIsDirty(false);
        }
    };

    form.isDirty = isDirty;
    form.setIsDirty = handleIsDirty;

    return form
}

export default useCustomForm
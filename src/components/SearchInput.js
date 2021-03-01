import React, { memo } from 'react';
import { Form, Input, Button } from 'antd';

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 8,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 8,
    },
};

function SearchInput(props) {

    const onFinish = (values) => {
        console.log('Success:', values);
        props.onSearchValChanged(values.username)
    };


    return (<div>

        <Form
            {...layout}
            name="basic"
            initialValues={{}}
            onFinish={onFinish}
        >
            <Form.Item
                label="Enter git Username"
                name="username"
                rules={[
                    {
                        required: true,
                        message: 'Please input your username.',
                    },
                ]}
            >
                <Input />
            </Form.Item>



            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                    Search
        </Button>
            </Form.Item>
        </Form>
    </div>)
}

export default memo(SearchInput)
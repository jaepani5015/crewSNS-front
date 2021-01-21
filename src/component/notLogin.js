import React, { useState, useEffect, useCallback, useRef, memo } from 'react';
import { Link } from "react-router-dom";
import { Form, Input, Button } from 'antd';
import styled from 'styled-components';

import { useDispatch } from 'react-redux';
import { login } from '../store/storeUser';
import { fetchLogin } from '../store/thunk/thunkUser';

const LoginForm = () => {
    const [userInput, setUserInput] = useState({ id: null, pw: null });
    const onloadFocus = useRef(null);

    const dispatch = useDispatch();

    //로그인 아닌 경우 아이디 입력 창에 자동 포커싱
    useEffect(() => {
        onloadFocus.current.focus();
    }, []);

    const onInputSuccess = useCallback(e => {
        dispatch(fetchLogin({ id: 'test', pw: '123' }));
        setUserInput({ ...e });
    }, []);

    useEffect(() => {
        userInput.id !== null ?
            userInput.pw !== null ?
                dispatch(login({ ...userInput })) : console.log('undefined') : console.log('undefined');
    }, [userInput]);

    const onInputError = useCallback(e => { });

    return (
        <Wrap>
            <Form size='middle' onFinish={onInputSuccess} onFinishFailed={onInputError}
                wrapperCol={{ md: 18, xs: 12 }}>
                <Form.Item name="id" rules={[
                    {
                        required: true,
                        message: '계정 입력'
                    }
                ]}>
                    <Input placeholder="아이디" ref={onloadFocus} />
                </Form.Item>
                <Form.Item name="pw" rules={[
                    {
                        required: true,
                        message: '비밀번호 입력'
                    }
                ]}>
                    <Input type="password" placeholder="비밀번호" />
                </Form.Item>
                <Form.Item>
                    <LoginButton type="primary" htmlType="submit">로그인</LoginButton>
                    <Button type="ghost"><Link to='/signup'>회원가입</Link></Button>
                </Form.Item>
            </Form>
        </Wrap>
    );
}

export default memo(LoginForm);


const LoginButton = styled(Button)`
  margin-right: 10px;
`;

const Wrap = styled.div`
  position: sticky;
  top: 15px;
`;
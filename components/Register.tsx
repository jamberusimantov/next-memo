import styles from '../styles/Register.module.css'
import React, { FormEvent } from 'react'
import { svg, Btn, Input } from '../dir/elements';
import { fetcher, composeURL, isValidId } from '../dir/functions';
import Cookies from 'js-cookie';

const Register = (props: { setState: (user: string) => void }) => {
    const phoneNumberELRef = React.createRef<HTMLInputElement>()
    const prefixELRef = React.createRef<HTMLSelectElement>()

    const submit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const url = composeURL('/api/userAPI', {
                prefix: `${prefixELRef.current?.value}`,
                phoneNumber: `${phoneNumberELRef.current?.value}`,
            });
            const res = await fetcher(url, 'POST');  
            if (!res.success) throw res.error
            if (isValidId(res.data)) {
                Cookies.set('memo-simantov.herokuapp.com', res.data, { secure: true })
                props.setState(res.data);
            }
        } catch (err) { console.log(err); }
    }

    return (
        <div className={styles.container}>
            <form onSubmit={submit}>
                <div>
                    <select
                        className={styles.prefix}
                        ref={prefixELRef}
                    >
                        <option value="050">050</option>
                        <option value="051">051</option>
                        <option value="052">052</option>
                        <option value="053">053</option>
                        <option value="054">054</option>
                        <option value="055">055</option>
                        <option value="056">056</option>
                        <option value="058">058</option>
                        <option value="059">059</option>
                    </select>
                    <Input name={'phoneNumber'} ref={phoneNumberELRef} className={styles.input} />
                </div>
                <Btn child={svg('blue-user')} className={styles.submitBtn} submit={true} />
            </form>
        </div>
    )
}

export default Register;
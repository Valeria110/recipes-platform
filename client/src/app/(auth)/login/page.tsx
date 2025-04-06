import { LoginForm } from '@/widgets/sign-in';
import styles from './login.module.scss';
import Image from 'next/image';
import { loginBg } from '@/shared/assets';

export default function LoginPage() {
  return (
    <>
      <div className={`relative flex justify-center min-h-dvh p-5 pt-16 ${styles.formContainer}`}>
        <Image className='object-cover' src={loginBg} alt='login page background image' fill={true} />
        <LoginForm />
      </div>
    </>
  );
}

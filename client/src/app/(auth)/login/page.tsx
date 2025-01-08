import { LoginForm } from '@/widgets/sign-in';
import styles from './login.module.scss';

export default function LoginPage() {
  return (
    <>
      <div className={`flex justify-center min-h-dvh p-5 pt-16 ${styles.formContainer}`}>
        <LoginForm />
      </div>
    </>
  );
}

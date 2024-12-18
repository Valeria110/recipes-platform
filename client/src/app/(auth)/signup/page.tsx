import styles from './signup.module.scss';
import { SignUpForm } from '@/components/SignUpForm/SignUpForm';

export default function SignUpPage() {
  return (
    <>
      <div className={`flex justify-center min-h-dvh p-5 pt-16 ${styles.formContainer}`}>
        <SignUpForm />
      </div>
    </>
  );
}

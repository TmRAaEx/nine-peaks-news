import getUserData from '@/lib/UserData';
import Link from 'next/link';

export default async function AdminLoginButton() {

    const userData = await getUserData();
    
    if(!userData) return null;

    return (
        <>
            {userData.user.isAdmin 
                ? <Link href="/admin" className='admin-login-button'>Admin panel</Link>
                : <></>
            }
        </>
    );
}
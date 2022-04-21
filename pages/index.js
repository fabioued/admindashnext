import { useRouter } from 'next/router';


const Index = () => {
    const router = useRouter()
    if (typeof window !== 'undefined') {
        router.push('/dashboard')
    }
};

export default Index;
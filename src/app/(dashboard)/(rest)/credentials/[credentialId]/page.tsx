import { requireAuth } from "@/lib/auth-utils";

interface PageProps {
    params: Promise<{ credentialId: string }>
}
const Page = async ({ params }: PageProps) => {
    await requireAuth();
    const { credentialId } = await params;

    return (
        <div>
            <p>Credentials ID: {credentialId}</p>
        </div>
    )
}

export default Page

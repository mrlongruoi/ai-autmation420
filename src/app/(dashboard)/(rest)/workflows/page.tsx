import { requireAuth } from "@/lib/auth-utils"

const Page = async () => {
  await requireAuth();

  return (
    <div>
      <p>Workflows Page</p>
    </div>
  )
}

export default Page

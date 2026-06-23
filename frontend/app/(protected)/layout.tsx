import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import React from 'react'
import { CameraProvider } from '@/contexts/CameraContext';

const ProtectedLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
const session = await auth();
  if (!session?.user) {
    return redirect("/login")
  }
  return (
    <CameraProvider>
      {children}
    </CameraProvider>
  )
}

export default ProtectedLayout
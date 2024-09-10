"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { app } from '@/config/firebaseConfig'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { doc, getFirestore, setDoc } from 'firebase/firestore'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'sonner'

function CreateBusiness() {
    const [businessName, setBusinessName] = useState('');
    const db = getFirestore(app);
    const { user } = useKindeBrowserClient();
    const router = useRouter();

    const onCreateBusiness = async () => {
        const sanitizedBusinessName = businessName.replace(/ /g, "-");
        console.log("btn Click", sanitizedBusinessName);
        await setDoc(doc(db, 'Business', user.email), {
            businessName: sanitizedBusinessName,
            email: user.email,
            userName: user.given_name + " " + user.family_name
        }).then(() => {
            console.log("Document Saved");
            toast('New Business Created!');
            router.replace('/dashboard');
        });
    }

    return (
        <div className='items-center flex flex-col'>
            <Image src='/logo.svg' width={350} height={300} alt='Meet-Orbit'/>
            <div className='flex flex-col items-center gap-4 max-w-3xl'>
                <h2 className='text-4xl font-bold'>What should we call your business?</h2>
                <p className='text-slate-500'>You can always change this later from settings</p>
                <div className='w-full'>
                    <label className='text-slate-400'>Team Name</label>
                    <Input placeholder="Ex. Meet-Orbit" 
                        className="mt-2"
                        onChange={(event) => setBusinessName(event.target.value)}
                    />
                </div>
                <Button className="w-full"
                    disabled={!businessName}
                    onClick={onCreateBusiness}
                >Create Business</Button>
            </div>
        </div>
    )
}

export default CreateBusiness;

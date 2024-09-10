"use client"
import React, { useEffect, useState } from 'react'
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { doc, getDoc, getFirestore, updateDoc } from 'firebase/firestore'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { toast } from 'sonner'
import { app } from '@/config/firebaseConfig'
import DaysList from '@/app/__utils/DaysList'

function Availability() {

    const [daysAvailable, setDaysAvailable] = useState({
        Sunday: false,
        Monday: false,
        Tuesday: false,
        Wednesday: false,
        Thursday: false,
        Friday: false,
        Saturday: false
    });
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const db = getFirestore(app);
    const { user } = useKindeBrowserClient();

    useEffect(() => {
        if (user) getBusinessInfo();
    }, [user]);

    const getBusinessInfo = async () => {
        const docRef = doc(db, 'Business', user.email);
        const docSnap = await getDoc(docRef);
        const result = docSnap.data();
        if (result) {
            setDaysAvailable(result.daysAvailable || {
                Sunday: false,
                Monday: false,
                Tuesday: false,
                Wednesday: false,
                Thursday: false,
                Friday: false,
                Saturday: false
            });
            setStartTime(result.startTime || '');
            setEndTime(result.endTime || '');
        }
    }

    const onHandleChange = (day, value) => {
        setDaysAvailable(prevState => ({
            ...prevState,
            [day]: value
        }));
    }

    const handleSave = async () => {

        const filteredDaysAvailable = Object.fromEntries(
            Object.entries(daysAvailable).filter(([day, available]) => available)
        );
    
        console.log(filteredDaysAvailable, startTime, endTime);
        
        if (user?.email) {
            const docRef = doc(db, 'Business', user.email);
            await updateDoc(docRef, {
                daysAvailable: filteredDaysAvailable,
                startTime,
                endTime
            }).then(() => {
                toast('Change Updated!');
            });
        }
    };
    

    return (
        <div className='p-10'>
            <h2 className='font-bold text-2xl'>Availability</h2>
            <hr className='my-7'></hr>
            <div>
                <h2 className='font-bold'>Availability Days</h2>
                <div className='grid grid-cols-2 md:grid-cols-4 gap-5 my-3'>
                    {DaysList && DaysList.map((item, index) => (
                        <div key={index}>
                            <h2 className='flex gap-2'>
                                <Checkbox className='mt-1'
                                    checked={daysAvailable[item?.day] || false}
                                    onCheckedChange={(e) => onHandleChange(item.day, e)}
                                />
                                {item.day}
                            </h2>
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <h2 className='font-bold mt-10'>Availability Time</h2>
                <div className='flex gap-10'>
                    <div className='mt-3'>
                        <h2>Start Time</h2>
                        <Input type="time"
                            value={startTime}
                            onChange={(e) => setStartTime(e.target.value)} />
                    </div>
                    <div className='mt-3'>
                        <h2>End Time</h2>
                        <Input type="time"
                            value={endTime}
                            onChange={(e) => setEndTime(e.target.value)} />
                    </div>
                </div>
            </div>
            <Button className="mt-10"
                onClick={handleSave}
            >Save</Button>
        </div>
    )
}

export default Availability;

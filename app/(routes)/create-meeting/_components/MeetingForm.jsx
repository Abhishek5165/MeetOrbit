"use client";
import { Button } from "@/components/ui/button";
import '../../../__components/style.css'
import { Input } from "@/components/ui/input";
import { ChevronLeft } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LocationOption from "@/app/__utils/LocationOption";
import Image from "next/image";
import Link from "next/link";
import ThemeOptions from "@/app/__utils/ThemeOptions";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { app } from "@/config/firebaseConfig";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

function MeetingForm({ setFormValue }) {
  const [location, setLocation] = useState();
  const [themeColor, setThemeColor] = useState("");
  const [eventName, setEventName] = useState();
  const [duration, setDuration] = useState(30);
  const [locationUrl, setLocationUrl] = useState();
 
  const { user } = useKindeBrowserClient();
  const db = getFirestore(app);
  const router = useRouter();
  useEffect(() => {
    setFormValue({
      eventName: eventName,
      duration: duration,
      location: location,
      locationUrl: locationUrl,
      themeColor: themeColor,
    });
  }, [eventName, duration, location, locationUrl, themeColor]);

  const onCreateClick = async () => {
    const id = Date.now().toString();
    await setDoc(doc(db, "MeetingEvent", id), {
      id: id,
      eventName: eventName,
      duration: duration,
      location: location,
      locationUrl: locationUrl,
      themeColor: themeColor,
      businessId: doc(db, "Business", user?.email),
      createdBy: user?.email,
    });
    toast("New Meeting Event Created!");
    router.replace("/dashboard/meeting-type");
  };
  return (
    <div className="p-8 ">
      <Link href={"/dashboard"}>
        <h2 className="flex gap-2">
          <ChevronLeft /> Cancel
        </h2>
      </Link>
      <div className="mt-4">
        <h2 className="font-bold text-2xl my-4">Create New Event</h2>
        <hr></hr>
      </div>
      <div className="flex flex-col gap-3 my-4">
        <h2 className="font-bold">Event Name <span>*</span></h2>
        <Input
          placeholder="Name of your meeting event"
          onChange={(event) => setEventName(event.target.value)}
        />

        <h2 className="font-bold">Duration <span>*</span></h2>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="max-w-40">
              {duration} Min
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setDuration(15)}>
              15 Min
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setDuration(30)}>
              30 Min
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setDuration(45)}>
              45 Min
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setDuration(60)}>
              60 Min
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setDuration(90)}>
              90 Min
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <h2 className="font-bold">Location <span>*</span></h2>
        <div className="grid grid-cols-4 gap-3">
          {LocationOption.map((option, index) => (
            <div
              key={index}
              className={`border flex flex-col
                     justify-center items-center 
                     p-3 rounded-lg cursor-pointer
                     hover:bg-blue-100 hover:border-primary
                     ${
                       location == option.name && "bg-blue-100 border-primary"
                     }`}
              onClick={() => setLocation(option.name)}
            >
              <Image
                src={option.icon}
                width={30}
                height={30}
                alt={option.name}
              />
              <h2>{option.name}</h2>
            </div>
          ))}
        </div>
        {location && (
          <>
            <h2 className="font-bold">Add {location} Url <span>*</span></h2>
            <Input
              placeholder="Add Url"
              onChange={(event) => setLocationUrl(event.target.value)}
            />
          </>
        )}
        <h2 className="font-bold">Select Theme Color</h2>
        <div className="flex justify-evenly">
          {ThemeOptions.map((color, index) => (
            <div
              key={index}
              className={`h-7 w-7 rounded-full
                    ${themeColor == color && " border-2 border-black"}`}
              style={{ backgroundColor: color }}
              onClick={() => setThemeColor(color)}
            ></div>
          ))}
        </div>
      </div>

      <Button
        className="w-full mt-9"
        disabled={!eventName || !duration || !location || !locationUrl}
        onClick={() => onCreateClick()}
      >
        Create
      </Button>
    </div>
  );
}

export default MeetingForm;

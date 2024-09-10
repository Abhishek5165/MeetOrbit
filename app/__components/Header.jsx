"use client";
import React from "react";
import Image from "next/image";
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs";
import "../__components/style.css";
import { Button } from "@/components/ui/button";
import '../__components/style.css'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import Link from "next/link";

function Header() {
  return (
    <div>
      <div className="flex items-center justify-between p-5 navbar">
        <Image
          src="/logo.svg"
          width={200}
          height={200}
          alt="Logo"
          className="w-[200px] md:w-[250px]"
        />
        <ul className="hidden md:flex gap-14 font-medium text-lg">
          <li className="navlink transition-all duration-300">Product</li>
          <li className="navlink">Pricing</li>
          <Link href='/Contact'><li className="navlink">Contact Us</li></Link>
          <AlertDialog className='bg-white'>
            <AlertDialogTrigger><li className="navlink">About Us</li></AlertDialogTrigger>
            <AlertDialogContent className='bg-white'>
              <AlertDialogHeader className='bg-white'>
                <AlertDialogTitle className='text-lg about'> 🎀 Meet-Orbit : Revolutionizing Scheduling with Effortless Precision !</AlertDialogTitle>
                <AlertDialogDescription className='para'>
                ▶️ Meet-Orbit is a streamlined meeting scheduling website designed to simplify the process of organizing meetings. 
                <br /><br />▶️ With features like automated calendar syncing, time zone detection, and customizable scheduling options, users can effortlessly coordinate with others. 
                <br /><br />▶️ Meet-Orbit reduces the need for extensive back-and-forth communication, making it an ideal tool for both professional and personal use.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

        </ul>
        <div className="flex gap-5">
          <LoginLink>
            <Button variant="ghost" className="font-medium text-lg">
              Login
            </Button>
          </LoginLink>
          <RegisterLink>
            <Button className="font-medium log">Get Started</Button>
          </RegisterLink>
        </div>
      </div>
    </div>
  );
}

export default Header;

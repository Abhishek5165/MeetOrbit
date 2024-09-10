"use client";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import React, { useEffect, useState } from "react";
import { doc, getDoc, getFirestore, getDocs } from "firebase/firestore";
import { app } from "@/config/firebaseConfig";
import { query, collection, where } from "firebase/firestore";
import "../../../../app/__components/style.css";
import { Button, } from "@react-email/components";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
function Settings() {
  const db = getFirestore(app);
  const { user } = useKindeBrowserClient();
  const [eventList, setEventList] = useState([]);
  const [businessInfo, setBusinessInfo] = useState();

  useEffect(() => {
    if (user) {
      getEventList();
      BusinessInfo();
    }
  }, [user]);

  const getEventList = async () => {
    setEventList([]);
    const q = query(
      collection(db, "Business"),
      where("businessName", "==", user?.email)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      setEventList((prevEvent) => [...prevEvent, doc.data()]);
    });
  };

  const BusinessInfo = async () => {
    const docRef = doc(db, "Business", user.email);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setBusinessInfo(docSnap.data());
      console.log(docSnap.data());
    } else {
      console.log("No such document!");
    }
  };

  const renderDaysAvailable = () => {
    if (!businessInfo?.daysAvailable) return null;
    // Assuming daysAvailable is an object with keys as days
    return (
      <ul>
        {Object.keys(businessInfo.daysAvailable).map((day) => (
          <li key={day}>{day}</li>
        ))}
      </ul>
    );
  };

  return (
    <div className="p-5 py-10 shadow-lg m-5 mt-20">
      <h2 className="font-bold text-3xl text-cyan-600">Your Info !</h2>
      <hr />
      <br />
      {businessInfo ? (
        <>
          <h2 className="font-medium text-2xl border-b-4 mb-4">
            <span className=" info">Business Name :</span>{" "}
            {businessInfo.businessName}
          </h2>
          <h2 className="font-medium text-2xl border-b-4 mb-4">
            <span className=" info">Email :</span> {businessInfo.email}
          </h2>

          <h2 className="font-medium text-2xl border-b-4 mb-4">
            <span className=" info">Name :</span> {businessInfo.userName}
          </h2>

          {businessInfo.daysAvailable && (
            <>
              <h2 className="font-medium text-2xl mb-4 border-b-4">
                <span className="info">Available Days :</span>
              </h2>
              <ul className="mb-4">
                {Object.keys(businessInfo.daysAvailable).map((day) => (
                  <li className="litems" key={day}>
                    ➡️ {day}
                  </li>
                ))}
              </ul>
            </>
          )}
          <Button className="font-medium text-2xl mb-5"><LogoutLink>Logout</LogoutLink></Button>
        </>
      ) : (
        <p>Welcome !</p>
      )}
    </div>
  );
}

export default Settings;

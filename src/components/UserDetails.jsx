import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import FriendsList from "./FriendsList";

const UserDetails = () => {
  const [user, setUser] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      await axios.get(`http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${id}`)
        .then((response) => {
          const res = response.data
          setUser(res)
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchData();
  }, [id]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="border pt-[20px] border-solid border-gray-300 p-[10px]">
      <div className="flex flex-wrap pl-[29px] items-start gap-3">
        <div className="h-[350px] w-[350px]">
          <img src={user.imageUrl} alt="" />
        </div>
        <div className="h-[256px] border relative border-solid border-gray-500">
          <p className="bg-white absolute left-[15px] p-1 top-[-18px]">Info</p>
          <div className="flex flex-col p-[15px] w-[750px] gap-[15px]">
            <div>
              <p className="font-bold text-xl">{user.prefix} {user.name} {user.lastName}</p>
              <p className="text-xl">{user.title}</p>
            </div>
            <div>
              <p><span className="underline">Email: </span> {user.email}</p>
              <p><span className="underline">Ip Address: </span> {user.ip}</p>
              <p><span className="underline">Ip Address: </span> {user.ip}</p>
              <p><span className="underline">Job Area: </span> {user.jobArea}</p>
              <p><span className="underline">Job Type: </span> {user.jobType}</p>
            </div>
          </div>
        </div>
        <div className="w-[150px] h-[256px] relative border border-solid border-gray-500">
          <p className="bg-white absolute left-[15px] p-1 top-[-18px]">Address</p>
          <div className="p-[11px]">
            <p>Country: {user.address.country}</p>
            <p>City: {user.address.city}</p>
            <p>State: {user.address.state}</p>
            <p>Street address: {user.address.streetAddress}</p>
            <p>Zip: {user.address.zipCode}</p>
          </div>
        </div>
      </div>
      <FriendsList id={id} />
    </div>
  );
}

export default UserDetails;
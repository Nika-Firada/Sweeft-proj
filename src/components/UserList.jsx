import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PAGE_SIZE = 20;

const UserList = () => {
  // Define state variables
  const navigate = useNavigate()
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // Fetch data from API
  const fetchData = async () => {
    setLoading(true);
    await axios.get(`http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${page}/${PAGE_SIZE}`)
      .then((response) => {
        const res = response.data
        setUsers(prevUsers => [...prevUsers, ...res.list])
        setPage(prevPage => prevPage + 1);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  // Load data on component mount
  useEffect(() => {
    fetchData();
  }, []);
  // Set up observer for infinite scrolling
  const observer = useRef();
  const lastUserRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        fetchData();
      }
    });
    if (node) observer.current.observe(node);
  }, [loading]);

  const handleUserClick = (userId) => {
    navigate(`/user/${userId}`)
  }

  return (
    <div className="flex flex-col flex-wrap gap-3 items-center justify-center border border-solid border-gray-300">
      <div className="flex flex-wrap gap-3 items-center justify-center">
        {users.map((user, index) => {
          if (users.length === index + 1) {
            const key = `${user.id}-${index}`;
            return (
              <div ref={lastUserRef} className="cursor-pointer flex flex-col border border-solid border-gray-300 h-[300px] w-[320px]" key={key} onClick={() => handleUserClick(user.id)}>
                <div>
                  <img src={user.imageUrl} alt="" />
                </div>
                <div className="pl-3">
                  <p className="font-bold">{user.prefix} {user.name} {user.lastName}</p>
                  <p>{user.title}</p>
                </div>
              </div>
            )
          } else {
            const key = `${user.id}-${index}`;
            return (
              <div className="cursor-pointer flex flex-col border border-solid border-gray-300 h-[300px] w-[320px]" key={key} onClick={() => handleUserClick(user.id)}>
                <div>
                  <img src={user.imageUrl} alt="" />
                </div>
                <div className="pl-3">
                  <p className="font-bold">{user.prefix} {user.name} {user.lastName}</p>
                  <p>{user.title}</p>
                </div>
              </div>
            )
          }
        }
        )}
      </div>
      {loading && <div>Loading...</div>}
    </div>
  );
}

export default UserList;
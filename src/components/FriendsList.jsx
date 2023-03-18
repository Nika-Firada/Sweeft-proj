import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PAGE_SIZE = 10;

const FriendsList = ({ id }) => {
  const [page, setPage] = useState(1);
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate()

  const fetchData = async () => {
    setLoading(true);
    await axios.get(`http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${id}/friends/${page}/${PAGE_SIZE}`)
      .then((response) => {
        const res = response.data
        setFriends(prevFriends => [...prevFriends, ...res.list])
        setPage(prevPage => prevPage + 1);
      })
      .catch((error) => {
        console.log(error);
      }).finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    setFriends([]);
    setPage(1);
    fetchData();
  }, [id]);

  const handleUserClick = (userId) => {
    navigate(`/user/${userId}`)
  }
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

  if (!friends) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h1 className="font-bold text-2xl mb-[15px] pl-[30px]">Friends:</h1>
      <div className="flex flex-col flex-wrap gap-3 items-center justify-center">
        <div className="flex flex-wrap gap-3 items-center justify-center">
          {friends.map((friend, index) => {
            const key = `${friend.id}-${index}`;
            if (friends.length === index + 1) {
              return (
                <div ref={lastUserRef} className="cursor-pointer flex flex-col border border-solid border-gray-300 h-[300px] w-[320px]" key={key} onClick={() => handleUserClick(friend.id)}>
                  <div>
                    <img src={friend.imageUrl} alt="" />
                  </div>
                  <div className="pl-3">
                    <p className="font-bold">{friend.prefix} {friend.name} {friend.lastName}</p>
                    <p>{friend.title}</p>
                  </div>
                </div>
              )
            } else {
              const key = `${friend.id}-${index}`;
              return (
                <div className="cursor-pointer flex flex-col border border-solid border-gray-300 h-[300px] w-[320px]" key={key} onClick={() => handleUserClick(friend.id)}>
                  <div>
                    <img src={friend.imageUrl} alt="" />
                  </div>
                  <div className="pl-3">
                    <p className="font-bold">{friend.prefix} {friend.name} {friend.lastName}</p>
                    <p>{friend.title}</p>
                  </div>
                </div>
              )
            }
          }
          )}
        </div>
        {loading && <div>Loading...</div>}
      </div>
    </div>
  );
}

export default FriendsList
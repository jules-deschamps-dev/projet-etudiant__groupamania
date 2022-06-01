import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { isEmpty } from "../Utils";

const Card = ({ post }) => {
  const [isLoading, setIsLoading] = useState(true);
  const usersData = useSelector((state) => state.usersReducer);
  //const userData = useSelector((state) => state.userReducer);

  useEffect(() => {
    console.log(usersData);
    !isEmpty(usersData[0]) && setIsLoading(false);
  }, [usersData]);

  return (
    <li className="card-container" key={post.id}>
      {isLoading ? (
        <p>Chargement</p>
      ) : (
        <div>
          {
            !isEmpty(
              usersData[0] &&
                usersData
                  .map((user) => {
                    if (user.id === post.author) return <p>user.name</p>;
                  })
                  .join("")
            )
          }
        </div>
      )}
    </li>
  );
};

export default Card;

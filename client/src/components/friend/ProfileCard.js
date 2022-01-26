import { useParams } from "react-router-dom";

export default function ProfileCard() {
  const { friend_id } = useParams();

  return <div>{friend_id}</div>;
}

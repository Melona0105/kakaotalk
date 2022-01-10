import "../../css/components/friend/Friend.css";

export default function Friend({ src, name, song }) {
  return (
    <div className="friend-container">
      <div className="friend-profile">
        <img src={src} />
        <div>{name}</div>
      </div>
      {song && <div className="friend-profile-song">{song}</div>}
    </div>
  );
}

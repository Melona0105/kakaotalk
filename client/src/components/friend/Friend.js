import "../../css/components/friend/Friend.css";

export default function Friend({ src, name, comment, song }) {
  return (
    <div className="friend-container">
      <div className="friend-profile">
        <img src={src} />
        <div>
          <div>{name}</div>
          <div className="friend-comment">{comment}</div>
        </div>
      </div>
      {song && <div className="friend-profile-song">{song}</div>}
    </div>
  );
}

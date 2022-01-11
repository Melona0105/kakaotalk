import friend from "../../images/nav/friend.png";
import search from "../../images/friend/search.png";
import notiImg from "../../images/chatting/noti.png";
import bucket from "../../images/chatting/bucket.png";
import hamburger from "../../images/chatting/hamburger.png";
import imoticon from "../../images/chatting/imoticon.png";
import upload from "../../images/chatting/upload.png";
import schedule from "../../images/chatting/schedule.png";
import face_talk from "../../images/chatting/face talk.png";
import voice_talk from "../../images/chatting/voice talk.png";
import control_bar from "../../images/chatting/control bar.png";
import "../../css/components/chatting/Chatting.css";

export default function Chatting({ data }) {
  const { id, img, username, noti, time, message, newMsg, newMsgCount } = data;

  const rightNavButtonStyle = {
    width: 22,
    border: "1px solid lightgray",
    borderRadius: "50%",
  };

  const footerNavImgStyle = { width: 30, marginRight: 10 };

  const flexAndDirectionColumn = { display: "flex", flexDirection: "column" };
  const flexAndAlignItemsCenter = { display: "flex", alignItems: "center" };

  return (
    <div
      className="chatting-container"
      style={{ ...flexAndDirectionColumn, height: "100vh", margin: -8 }}
    >
      <div
        className="chatting-container-nav"
        style={{ ...flexAndDirectionColumn, height: 65, margin: "0px 10px" }}
      >
        <div
          className="chatting-container-inner-nav"
          style={{ flex: 1, display: "flex" }}
        >
          <div
            className="inner-nav-left"
            style={{ ...flexAndAlignItemsCenter, flex: 4 }}
          >
            <img src={img} style={{ flex: 1, width: 55, marginRight: 10 }} />
            <div
              style={{
                ...flexAndDirectionColumn,
                flex: 3,
                fontSize: "14px",
                justifyContent: "space-around",
                height: "100%",
                paddingTop: 20,
              }}
            >
              <div>{username}</div>
              <div
                style={{
                  ...flexAndAlignItemsCenter,
                  marginBottom: 15,
                }}
              >
                <img
                  src={friend}
                  style={{
                    width: "14px",
                    height: "14px",
                    filter: "brightness(0.7) invert(1)",
                    marginBottom: 2,
                  }}
                />
                <div style={{ color: "#808080", fontSize: "12px" }}>2</div>
              </div>
            </div>
          </div>
          <div
            className="nav-bottom-right"
            style={{
              ...flexAndDirectionColumn,
              flex: 2,
              alignItems: "flex-end",
            }}
          >
            <img style={{ height: 25, width: "100%" }} src={control_bar} />
            <div
              style={{
                ...flexAndAlignItemsCenter,
                flex: 1,
                width: "100%",
                justifyContent: "space-between",
                marginBottom: 10,
              }}
            >
              {[search, notiImg, bucket, hamburger].map((el) => (
                <img src={el} style={rightNavButtonStyle} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div
        className="chatting-container-body"
        style={{ flex: 1, backgroundColor: "#bdd0dc" }}
      >
        {"이 안에 컨텐츠 뿌리기"}
      </div>
      <div
        className="chatting-container-input"
        style={{
          ...flexAndDirectionColumn,
          height: 130,
        }}
      >
        <div
          className="chatting-input-nav"
          style={{
            flex: 2,
            backgroundColor: "#f8f8f8",
            borderBottom: "1px solid #e8e8e8",
            display: "flex",
          }}
        >
          <div
            className="chatting-input-nav-left"
            style={{ ...flexAndAlignItemsCenter, flex: 1 }}
          >
            <img src={imoticon} style={footerNavImgStyle} />
            <img src={upload} style={footerNavImgStyle} />
            <img src={schedule} style={footerNavImgStyle} />
          </div>
          <div
            className="chatting-input-nav-right"
            style={{
              ...flexAndAlignItemsCenter,
              justifyContent: "flex-end",
              flex: 1,
            }}
          >
            <img src={voice_talk} style={footerNavImgStyle} />
            <img src={face_talk} style={footerNavImgStyle} />
          </div>
        </div>
        <div style={{ display: "flex", flex: 5 }}>
          <input
            style={{
              flex: 5,
              border: "none",
            }}
          />
          <div
            style={{
              ...flexAndAlignItemsCenter,
              justifyContent: "center",
              flex: 2,
            }}
          >
            <div
              style={{
                border: "1px solid #e8e8e8",
                padding: 25,
                borderRadius: 5,
                color: "#b0b0b0",
                fontSize: 14,
                backgroundColor: "#f9f9f9",
              }}
            >
              전송
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

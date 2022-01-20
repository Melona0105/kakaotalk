export default function SettingNav({
  menu,
  currentSetting,
  setCurrentSetting,
  index,
}) {
  const style =
    currentSetting === index ? { backgroundColor: "#e6e6e6" } : { undefined };
  return (
    <div
      style={style}
      onClick={() => {
        setCurrentSetting(index);
      }}
    >
      {menu}
    </div>
  );
}

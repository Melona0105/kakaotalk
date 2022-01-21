export default function SettingNav({
  menu,
  currentSetting,
  setCurrentSetting,
  index,
}) {
  return (
    <div
      style={{ backgroundColor: currentSetting === index && "#e6e6e6" }}
      onClick={() => {
        setCurrentSetting(index);
      }}
    >
      {menu}
    </div>
  );
}

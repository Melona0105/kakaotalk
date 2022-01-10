import "../../css/components/seemore/SeeMoreMenu.css";

export default function SeeMoreMenu({ data }) {
  const { name, url, logo } = data;
  return (
    <div className="menu-container">
      <a href={url}>
        <img src={logo} />
        <div>{name}</div>
      </a>
    </div>
  );
}

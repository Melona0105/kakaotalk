import { useDispatch } from "react-redux";
import { handleCurrentPage } from "../../actions";

export default function NavMenu({ currentPage, src, index, totalNewMsg }) {
  const dispatch = useDispatch();
  return (
    <div
      className="nav-menu-container"
      onClick={() => dispatch(handleCurrentPage(index))}
    >
      <img
        className={currentPage === index ? "selected" : "deselected"}
        src={src}
      />
      {index === 1 && totalNewMsg !== 0 && (
        <div className="nav-message">{totalNewMsg}</div>
      )}
    </div>
  );
}

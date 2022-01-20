import { useDispatch } from "react-redux";
import { handleCurrentPage } from "../../actions";

export default function NavMenu({ currentPage, src, index }) {
  const dispatch = useDispatch();
  return (
    <img
      className={currentPage === index ? "selected" : "deselected"}
      src={src}
      onClick={() => dispatch(handleCurrentPage(index))}
    />
  );
}

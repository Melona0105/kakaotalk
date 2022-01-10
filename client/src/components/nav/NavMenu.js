export default function NavMenu({ currentPage, src, index, setIsCurrentPage }) {
  return (
    <img
      className={currentPage === index ? "selected" : "deselected"}
      src={src}
      onClick={() => setIsCurrentPage(index)}
    />
  );
}

import search from "../../../images/friend/search.png";

function SearchBar({ searchOnChange, searchOnKeyDown, keyWord }) {
  return (
    <div className="friend-search-bar">
      <img src={search} />
      <input
        placeholder="이름으로 검색"
        onChange={(e) => searchOnChange(e)}
        onKeyDown={(e) => searchOnKeyDown(e)}
        value={keyWord}
      />
    </div>
  );
}

export default SearchBar;

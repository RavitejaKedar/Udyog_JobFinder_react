import {BsSearch} from 'react-icons/bs'
import './index.css'

const SearchBar = props => {
  const {
    onEnterSearchInput,
    onChangeSearchInput,
    searchInput,
    onClickSearchButton,
  } = props

  const ChangeSearchInput = event => {
    onChangeSearchInput(event)
  }

  const EnterSearchInput = event => {
    onEnterSearchInput(event)
  }

  const ClickSearchButton = () => {
    onClickSearchButton()
  }

  return (
    <div className="searchable-container ">
      <input
        value={searchInput}
        type="search"
        className="search-input"
        placeholder="Search"
        onChange={ChangeSearchInput}
        onKeyDown={EnterSearchInput}
      />
      <button
        testid="searchButton"
        type="button"
        className="search-button"
        onClick={ClickSearchButton}
      >
        <BsSearch className="search-icon" />
      </button>
    </div>
  )
}

export default SearchBar

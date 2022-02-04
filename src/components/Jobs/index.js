import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

import Header from '../Header'

import FilterBox from '../FilterBox'
import RightPart from '../RightPart'
import SearchBar from '../SearchBar'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
  noJobs: 'NO_JOBS',
}

class Jobs extends Component {
  state = {
    typeData: [],
    rangeData: '',
    searchInput: '',
    jobsList: '',
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobsData()
  }

  getJobsData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const {searchInput, typeData, rangeData} = this.state

    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${typeData.toString()}&minimum_package=${rangeData}&search=${searchInput}`

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()

      const modifiedData = this.getModifiedData(fetchedData)
      if (modifiedData.total === 0) {
        this.setState({
          jobsList: modifiedData,
          apiStatus: apiStatusConstants.noJobs,
        })
      } else {
        this.setState({
          jobsList: modifiedData,
          apiStatus: apiStatusConstants.success,
        })
      }
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  getModifiedData = fetchedData => ({
    jobs: fetchedData.jobs.map(eachJob => ({
      companyLogoUrl: eachJob.company_logo_url,
      employmentType: eachJob.employment_type,
      id: eachJob.id,
      location: eachJob.location,
      packagePerAnnum: eachJob.package_per_annum,
      rating: eachJob.rating,
      title: eachJob.title,
      jobDescription: eachJob.job_description,
    })),
    total: fetchedData.total,
  })

  clickedRetry = () => {
    this.getJobsData()
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onEnterSearchInput = event => {
    if (event.key === 'Enter') {
      this.getJobsData()
    }
  }

  onClickSearchButton = () => {
    this.getJobsData()
  }

  selectedType = async type => {
    const {typeData} = this.state

    if (typeData.includes(type)) {
      const filteredList = typeData.filter(each => each !== type)
      await this.setState({typeData: filteredList})

      this.getJobsData()
    } else {
      await this.setState(prevState => ({
        typeData: [...prevState.typeData, type],
      }))
      this.getJobsData()
    }
  }

  selectedRange = async range => {
    await this.setState({rangeData: range})
    this.getJobsData()
  }

  render() {
    const {searchInput, apiStatus, jobsList} = this.state
    return (
      <div>
        <Header />

        <div className="main-container">
          <div className="search-bar-mobile">
            <SearchBar
              searchInput={searchInput}
              onChangeSearchInput={this.onChangeSearchInput}
              onEnterSearchInput={this.onEnterSearchInput}
              onClickSearchButton={this.onClickSearchButton}
            />
          </div>
          <div className="left-part-container">
            <FilterBox
              selectedType={this.selectedType}
              selectedRange={this.selectedRange}
            />
          </div>

          <div className="right-part-container">
            <div className="search-bar-desktop">
              <SearchBar
                searchInput={searchInput}
                onChangeSearchInput={this.onChangeSearchInput}
                onEnterSearchInput={this.onEnterSearchInput}
                onClickSearchButton={this.onClickSearchButton}
              />
            </div>
            <RightPart
              apiStatus={apiStatus}
              jobsList={jobsList}
              clickedRetry={this.clickedRetry}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs

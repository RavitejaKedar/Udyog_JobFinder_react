import {Component} from 'react'

import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Header from '../Header'

import './index.css'
import JobListElement from '../JobListElement'
import SimilarJobElement from '../SimilarJobElement'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {apiStatus: apiStatusConstants.initial, jobItemDetails: ''}

  componentDidMount() {
    this.getJobItemDetails()
  }

  getJobItemDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()

      const modifiedData = this.getModifiedData(fetchedData)
      this.setState({
        jobItemDetails: modifiedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  getModifiedData = fetchedData => ({
    jobDetails: {
      companyLogoUrl: fetchedData.job_details.company_logo_url,
      companyWebsiteUrl: fetchedData.job_details.company_website_url,
      employmentType: fetchedData.job_details.employment_type,
      id: fetchedData.job_details.id,
      title: fetchedData.job_details.title,
      jobDescription: fetchedData.job_details.job_description,
      skills: fetchedData.job_details.skills.map(eachSkill => ({
        imageUrl: eachSkill.image_url,
        name: eachSkill.name,
      })),
      lifeAtCompany: {
        description: fetchedData.job_details.life_at_company.description,
        imageUrl: fetchedData.job_details.life_at_company.image_url,
      },
      location: fetchedData.job_details.location,
      packagePerAnnum: fetchedData.job_details.package_per_annum,
      rating: fetchedData.job_details.rating,
    },

    similarJobs: fetchedData.similar_jobs.map(eachSimJob => ({
      companyLogoUrl: eachSimJob.company_logo_url,
      employmentType: eachSimJob.employment_type,
      id: eachSimJob.id,
      jobDescription: eachSimJob.job_description,
      location: eachSimJob.location,
      rating: eachSimJob.rating,
      title: eachSimJob.title,
    })),
  })

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  onClickRetry = () => {
    this.getJobItemDetails()
  }

  renderFailureView = () => (
    <div className="error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png "
        alt="failure view"
        className="failure-img"
      />
      <h1 className="failure-heading-text">Oops! Something Went Wrong</h1>
      <p className="failure-description">
        We cannot seem to find the page you are looking for
      </p>
      <button onClick={this.onClickRetry} type="button" className="fail-btn">
        Retry
      </button>
    </div>
  )

  renderJobDetailsView = () => {
    const {jobItemDetails} = this.state
    return (
      <div className="job-details-main-container">
        <JobListElement
          eachJob={jobItemDetails.jobDetails}
          isLinkPreset="true"
        />
        <h1 className="side-headings">Skills</h1>
        <ul className="skills-list">
          {jobItemDetails.jobDetails.skills.map(eachSkill => (
            <li className="skill-item" key={eachSkill.name}>
              <img
                className="skill-image "
                src={eachSkill.imageUrl}
                alt="name"
              />
              <p className="skill-name">{eachSkill.name}</p>
            </li>
          ))}
        </ul>
        <h1 className="side-headings">Life at Company</h1>
        <div className="life-at-company-container">
          <p className="para">
            {jobItemDetails.jobDetails.lifeAtCompany.description}
          </p>
          <img
            alt="life at company"
            className="life-at-company-image "
            src={jobItemDetails.jobDetails.lifeAtCompany.imageUrl}
          />
        </div>
        <h1 className="side-headings">Similar Jobs</h1>
        <ul className="similar-container">
          {jobItemDetails.similarJobs.map(eachSimilarJob => (
            <SimilarJobElement
              eachSimilarJob={eachSimilarJob}
              key={eachSimilarJob.id}
            />
          ))}
        </ul>
      </div>
    )
  }

  renderJobDetailsPage = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobDetailsView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        {this.renderJobDetailsPage()}
      </div>
    )
  }
}
export default JobItemDetails

import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import JobListElement from '../JobListElement'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
  noJobs: 'NO_JOBS',
}

const RightPart = props => {
  const {apiStatus, jobsList, clickedRetry} = props

  const renderLoadingView = () => (
    <div testid="loader" className="loader-container">
      <Loader type="ThreeDots" color="#4f46e5" height="50" width="50" />
    </div>
  )

  const onClickRetry = () => {
    clickedRetry()
  }

  const renderFailureView = () => (
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
      <button onClick={onClickRetry} type="button" className="fail-btn">
        Retry
      </button>
    </div>
  )

  const renderJobsData = () => (
    <ul className="jobs-list-style">
      {jobsList.jobs.map(eachJob => (
        <Link
          to={`/jobs/${eachJob.id}`}
          key={eachJob.id}
          className="link-style"
        >
          <JobListElement
            eachJob={eachJob}
            key={eachJob.id}
            isLinkPreset="false"
          />
        </Link>
      ))}
    </ul>
  )

  const renderNoJobsView = () => (
    <div className="error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png "
        alt="no jobs"
        className="failure-img"
      />
      <h1 className="failure-heading-text">No Jobs Found</h1>
      <p className="failure-description">
        We could not find any jobs. Try other filters
      </p>
    </div>
  )

  const renderJobsDetails = () => {
    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderJobsData()
      case apiStatusConstants.failure:
        return renderFailureView()
      case apiStatusConstants.inProgress:
        return renderLoadingView()
      case apiStatusConstants.noJobs:
        return renderNoJobsView()
      default:
        return null
    }
  }

  return <div>{renderJobsDetails()}</div>
}

export default RightPart

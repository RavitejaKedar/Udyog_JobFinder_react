import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiExternalLink} from 'react-icons/fi'

import './index.css'

const JobListElement = props => {
  const {eachJob, isLinkPreset} = props
  const {
    companyLogoUrl,
    employmentType,

    location,
    packagePerAnnum,
    rating,
    title,
    jobDescription,
  } = eachJob

  const linkElement = () =>
    isLinkPreset === 'true' ? (
      <a href={eachJob.companyWebsiteUrl} className="link-style">
        <label htmlFor="linkicon" className="visit-style">
          Visit
        </label>
        <FiExternalLink id="linkicon" className="link-icon-style" />
      </a>
    ) : null

  return (
    <li className="list-style">
      <div>
        <div className="top-logo-part">
          <img
            className="logo-style"
            src={companyLogoUrl}
            alt="job details company logo"
          />
          <div className="top-left-part">
            <h1 className="heading">{title}</h1>

            <div className="star-container">
              <AiFillStar className="star-style" />
              <p className="heading">{rating}</p>
            </div>
          </div>
        </div>
        <div className="lower-logo-part">
          <div className="lower-icon-part">
            <div className="icon-container">
              <MdLocationOn className="icons-style " id="location" />
              <label className="para" htmlFor="location">
                <p>{location}</p>
              </label>
            </div>
            <div className="icon-container">
              <BsFillBriefcaseFill className="icons-style " id="emptype" />
              <label className="para" htmlFor="emptype">
                <p> {employmentType}</p>
              </label>
            </div>
          </div>
          <p>{packagePerAnnum}</p>
        </div>
      </div>
      <hr />
      <div className="visit-container">
        <h1 className="side-headings ">Description</h1>
        {linkElement()}
      </div>
      <p className="para">{jobDescription}</p>
    </li>
  )
}

export default JobListElement

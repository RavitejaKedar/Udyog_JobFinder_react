import './index.css'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'

const SimilarJobElement = props => {
  const {eachSimilarJob} = props
  const {
    companyLogoUrl,
    title,
    rating,
    location,
    employmentType,
    jobDescription,
  } = eachSimilarJob
  return (
    <li className="similar-list-style">
      <div>
        <div className="similar-top-logo-part">
          <img
            className="similar-logo-style"
            src={companyLogoUrl}
            alt="similar job company logo"
          />
          <div className="similar-top-left-part">
            <h1 className="similar-heading">{title}</h1>

            <AiFillStar id="similar-star" className="star-style" />
            <label className="similar-heading" htmlFor="star">
              <p>{rating}</p>
            </label>
          </div>
        </div>
        <div className="similar-lower-logo-part">
          <div className="similar-lower-icon-part">
            <div className="similar-icon-container">
              <MdLocationOn className="similar-icons-style " id="location" />
              <label className="similar-para" htmlFor="location">
                <p>{location}</p>
              </label>
            </div>
            <div className="similar-icon-container">
              <BsFillBriefcaseFill
                className="similar-icons-style "
                id="emptype"
              />
              <label className="similar-para" htmlFor="emptype">
                <p>{employmentType}</p>
              </label>
            </div>
          </div>
        </div>
      </div>

      <p className="similar-side-headings ">Description</p>
      <p className="similar-para">{jobDescription}</p>
    </li>
  )
}

export default SimilarJobElement

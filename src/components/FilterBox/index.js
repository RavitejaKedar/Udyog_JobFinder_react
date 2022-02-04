import ProfileElement from '../ProfileElement'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const FilterBox = props => {
  const {selectedType, selectedRange} = props
  const onSelectType = event => {
    selectedType(event.target.value)
  }

  const onSelectRange = event => {
    selectedRange(event.target.value)
  }
  return (
    <div>
      <ProfileElement />
      <div>
        <hr />
        <h1 className="heading-filter">Type of Employment</h1>
        <ul className="list-styling">
          {employmentTypesList.map(eachType => (
            <li key={eachType.employmentTypeId}>
              <input
                type="checkbox"
                id={eachType.employmentTypeId}
                onClick={onSelectType}
                value={eachType.employmentTypeId}
              />
              <label htmlFor={eachType.employmentTypeId}>
                {eachType.label}
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h1 className="heading-filter">Salary Range</h1>
        <hr />
        <ul className="list-styling">
          {salaryRangesList.map(eachRange => (
            <li key={eachRange.salaryRangeId}>
              <input
                type="radio"
                name="range"
                id={eachRange.salaryRangeId}
                onClick={onSelectRange}
                value={eachRange.salaryRangeId}
              />
              <label htmlFor={eachRange.salaryRangeId}>{eachRange.label}</label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
export default FilterBox

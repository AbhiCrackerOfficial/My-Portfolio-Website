import React from 'react'
import PropTypes from 'prop-types'
// import { FaLink } from "react-icons/fa";
import { FaStar, FaCodeFork } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import './projectcard.css'


function projectcard({ title, description, url, stars, forks, watchers, tags }) {
    return (
        <div className="project-card">
            <div className="project-card-header">
                <h3 className="project-card-title">{title}</h3>
            </div>
            <div className="project-card-body">
                <p className="project-card-description">{description}</p>
            </div>
            <div className="project-card-footer">
                <div className="project-card-stats">
                    <span className="project-card-star"><FaStar size={12}/> {stars}</span>
                    <span className="project-card-fork"><FaCodeFork size={12}/> {forks}</span>
                    <span className="project-card-watch"><IoEyeSharp size={12}/> {watchers}</span>
                 <a href={url} target='_blank' className="project-card-link"><FaArrowRight size={15}/></a>
                </div>
            </div>
        </div>
    )
}

projectcard.prototype = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    stars: PropTypes.number.isRequired,
    forks: PropTypes.number.isRequired,
    watchers: PropTypes.number.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default projectcard
import { useState } from "react";

const initialData = {
    fullName: "",
    email: "",
    phone: "",
    address: "",
    jobTitle: "",
    company: "",
    yoe: "0-1",
    skills: "",
};

export default function Tab({ activeTab, onNext, onPrev }) {
    // form data
    const [formData, setFormData] = useState(initialData);
    // handle formData as the user types function
    const handleDataInput = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // --- returning ---
    return (
        <>
            <div className="tabs-container">
                <div className="tabs-header">
                    <button
                        className={`tab-header ${activeTab === 0 ? "active" : ""}`}
                    >
                        Personal Details
                    </button>
                    <button
                        className={`tab-header ${activeTab === 1 ? "active" : ""}`}
                    >
                        Experience
                    </button>
                    <button
                        className={`tab-header ${activeTab === 2 ? "active" : ""}`}
                    >
                        Review & Submit
                    </button>
                </div>
                {/* Personal info */}
                {activeTab == 0 && (
                    <div className="personal-info">
                        <div className="input-sec">
                            <label htmlFor="fullName">Full Name:</label>
                            <input
                                type="text"
                                id="fullName"
                                name="fullName"
                                onChange={handleDataInput}
                                value={formData.fullName}
                                required
                            />
                        </div>
                        <div className="input-sec">
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleDataInput}
                                required
                            />
                        </div>
                        <div className="input-sec">
                            <label htmlFor="phone">Phone:</label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                onChange={handleDataInput}
                                value={formData.phone}
                            />
                        </div>
                        <div className="input-sec">
                            <label htmlFor="address">Address:</label>
                            <textarea
                                rows="3"
                                placeholder="33, wall street, New York"
                                id="address"
                                name="address"
                                required
                                onChange={handleDataInput}
                                value={formData.address}
                            />
                        </div>
                    </div>
                )}
                {/* Experience */}
                {activeTab == 1 && (
                    <div className="experience">
                        <div className="input-sec">
                            <label htmlFor="job-title">Job</label>
                            <input
                                id="job-title"
                                type="text"
                                name="jobTitle"
                                value={formData.jobTitle}
                                onChange={handleDataInput}
                            />
                        </div>
                        <div className="input-sec">
                            <label htmlFor="company">Company</label>
                            <input
                                id="company"
                                type="text"
                                name="company"
                                value={formData.company}
                                onChange={handleDataInput}
                            />
                        </div>
                        <div className="input-sec">
                            <label htmlFor="yoe">Years of Experience</label>
                            <select
                                name="yoe"
                                id="yoe"
                                value={formData.yoe}
                                onChange={handleDataInput}
                            >
                                <option value="0-1">Less than 1 year</option>
                                <option value="1-3">1-3 years</option>
                                <option value="3-5">3-5 years</option>
                                <option value="5+">More than 5 years</option>
                            </select>
                        </div>
                        <div className="input-sec">
                            <label htmlFor="skills">Skills</label>
                            <textarea
                                name="skills"
                                id="skills"
                                rows={3}
                                placeholder="Eg. HTML/CSS, JS, React, Nextjs, Nodejs..."
                                value={formData.skills}
                                onChange={handleDataInput}
                            ></textarea>
                        </div>
                    </div>
                )}
                {/* REVIEW */}
                {activeTab == 2 && (
                    <div className="review">
                        <div className="review-info">
                            <h4>Personal Details</h4>
                            <p>
                                <strong>Full Name: </strong>
                                {formData.fullName}
                            </p>
                            <p>
                                <strong>Email: </strong>
                                {formData.email}
                            </p>
                            <p>
                                <strong>Phone: </strong>
                                {formData.phone}
                            </p>
                            <p>
                                <strong>Address: </strong>
                                {formData.address}
                            </p>
                        </div>
                        <div className="review-info">
                            <h4>Experience</h4>
                            <p>
                                <strong>Job Title: </strong>
                                {formData.jobTitle}
                            </p>
                            <p>
                                <strong>Company: </strong>
                                {formData.company}
                            </p>
                            <p>
                                <strong>Years of Experience: </strong>
                                {formData.yoe}
                            </p>
                            <p>
                                <strong>Skills: </strong>
                                {formData.skills}
                            </p>
                        </div>
                        <div className="review-info"></div>
                    </div>
                )}
            </div>
        </>
    );
}

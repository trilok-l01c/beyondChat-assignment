import { useState } from "react";

export default function Tab({ activeTab }) {
    // --- returning ---
    return (
        <>
            <div className="tabs-container">
                <div className="tabs-header">
                    <button
                        className={`tab-header ${activeTab === 0 ? "active" : ""}`}
                    ></button>
                    <button
                        className={`tab-header ${activeTab === 1 ? "active" : ""}`}
                    ></button>
                    <button
                        className={`tab-header ${activeTab === 2 ? "active" : ""}`}
                    ></button>
                </div>
                {/* Personal info */}
                {activeTab == 0 && (
                    <div className="personal-info">
                        <div className="input-sec">
                            <label htmlFor="name"></label>
                            <input type="text" id="name" name="name" required />
                        </div>
                        <div className="input-sec">
                            <label htmlFor="email"></label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                            />
                        </div>
                        <div className="input-sec">
                            <label htmlFor="phone"></label>
                            <input type="tel" id="phone" name="phone" />
                        </div>
                        <div className="input-sec">
                            <label htmlFor="address"></label>
                            <textarea
                                rows="3"
                                placeholder="33, wall street, New York"
                                id="address"
                                name="address"
                                required
                            />
                        </div>
                    </div>
                )}
                {/* Experience */}
                {activeTab == 1 && (
                    <div className="experience">
                        <div className="input-sec">
                            <label htmlFor="job-title">Job</label>
                            <input id="job-title" type="text" name="jobTitle" />
                        </div>
                        <div className="input-sec">
                            <label htmlFor="company">Company</label>
                            <input id="company" type="text" name="company" />
                        </div>
                        <div className="input-sec">
                            <label htmlFor="yoe">Years of Experience</label>
                            <select name="yoe" id="yoe"></select>
                        </div>
                        <div className="input-sec">
                            <label htmlFor="skills">Skills</label>
                            <textarea
                                name="skills"
                                id="skills"
                                rows={3}
                                placeholder="Eg. HTML/CSS, JS, React, Nextjs, Nodejs..."
                            ></textarea>
                        </div>
                    </div>
                )}
                {/* REVIEW */}
                {activeTab == 2 && (
                    <div className="review">
                        <div className="show-info"></div>
                        <div className="show-info"></div>
                        <div className="show-info"></div>
                    </div>
                )}
            </div>
        </>
    );
}

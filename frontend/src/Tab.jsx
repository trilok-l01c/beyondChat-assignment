import { useState } from "react";

export default function Tab({ activeTab }) {
    // --- returning ---
    return (
        <>
            {/* Personal info */}
            {activeTab == 0 && (
                <div className="personal-info">
                    <div className="input-sec">
                        <label htmlFor="name"></label>
                        <input type="text" id="name" name="name" required />
                    </div>
                    <div className="input-sec">
                        <label htmlFor="email"></label>
                        <input type="email" id="email" name="email" required />
                    </div>
                    <div className="input-sec">
                        <label htmlFor="phone"></label>
                        <input type="tel" id="phone" name="phone" />
                    </div>
                    <div className="input-sec">
                        <label htmlFor="address"></label>
                        <input
                            type="text"
                            placeholder="33, wall street, New York"
                            id="address"
                            name="address"
                            required
                        />
                    </div>
                </div>
            )}
            {/* Experience */}
            {activeTab == 1 && <div className="experience"></div>}
            {/* REVIEW */}
            {activeTab == 2 && <div className="review"></div>}
        </>
    );
}

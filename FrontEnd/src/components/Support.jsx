import React, { useState } from 'react';

const Support = () => {
    const [isOpen, setIsOpen] = useState(true);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const supportLinks = [
        { icon: 'fa-question-circle', text: 'FAQ' },
        { icon: 'fa-file-alt', text: 'Documentation' },
        { icon: 'fa-video', text: 'Video Tutorials' },
    ];

    return (
        <div className="bg-white p-4 rounded-lg shadow-md mt-4">
            <div className="flex justify-between items-center cursor-pointer" onClick={toggleDropdown}>
                <h3 className="text-lg font-semibold">
                    <i className="fas fa-life-ring text-green-500"></i>
                    <span className="ml-2">Support</span>
                </h3>
                <i className={`fas fa-angle-down ${isOpen ? 'transform rotate-180' : ''}`}></i>
            </div>
            {isOpen && (
                <div className="mt-2 space-y-2">
                    {supportLinks.map((link, index) => (
                        <a key={index} href="#" className="block p-2 hover:bg-gray-100 rounded">
                            <i className={`fas ${link.icon} text-blue-500`}></i>
                            <span className="ml-2">{link.text}</span>
                        </a>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Support;
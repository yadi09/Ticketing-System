import React, { Component } from 'react';

class Footer extends Component {
    render() {
        return (
            <footer className="flex justify-between items-center p-4 border-t bg-gray-200 text-black">
                <span>Copyright © 2025 Saas solution. All Rights Reserved.</span>
                <div className="flex space-x-4">
                    <a href="https://facebook.com" className="text-blue-600">Facebook</a>
                    <a href="https://twitter.com" className="text-blue-600">Twitter</a>
                </div>
            </footer>
        );
    }
}

export default Footer;

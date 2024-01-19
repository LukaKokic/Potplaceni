import React from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

const PrivacyModal = (props) => {
    const [open, setOpen] = React.useState(false);
    const policyText = (
        <p>
           Privacy Policy

Last updated: January 13, 2024

Information Collection and Use

Potplaceni ("us", "we", or "our") operates [your website or application name] (the "Service"). This page informs you of our policies regarding the collection, use, and disclosure of Personal Information when you use our Service.

Types of Data Collected

While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data"). Personally identifiable information may include, but is not limited to:

Email address
First name and last name
Phone number
Address, State, Province, ZIP/Postal code, City
Use of Data

Potplaceni uses the collected data for various purposes:

To provide and maintain our Service
To notify you about changes to our Service
To allow you to participate in interactive features of our Service when you choose to do so
To provide customer support
To gather analysis or valuable information so that we can improve our Service
To monitor the usage of our Service
To detect, prevent and address technical issues
Transfer of Data

Your information, including Personal Data, may be transferred to — and maintained on — computers located outside of your state, province, country, or other governmental jurisdiction where the data protection laws may differ than those from your jurisdiction.
        </p>
    );
    return (
        <>
            <button className="item1" onClick={() => setOpen(true)}>
                Privacy Policy
            </button>
            <Modal open={open} onClose={() => setOpen(false)} center>
                <h2>Privacy Policy</h2>
                {policyText}
                
            </Modal>
        </>
    );
};

export default PrivacyModal;
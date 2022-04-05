import React from 'react';

export const CloseIcon = ({ color='#ffffff', width='20px' }) => (
    <>
        <svg width={width} height='100%' viewBox='0 0 61.35 61.35' xmlns='http://www.w3.org/2000/svg'>
            <g id='Layer_2' data-name='Layer 2'>
                <g id='Layer_1-2' data-name='Layer 1'>
                    <g id='Regular-S'>
                        <path fill={color} d='M1.12,60.21A4,4,0,0,0,4,61.33a3.82,3.82,0,0,0,2.78-1.12l23.92-24,24,24a3.87,3.87,0,0,0,2.78,1.14,3.62,3.62,0,0,0,2.79-1.14,4,4,0,0,0,1.12-2.81,3.79,3.79,0,0,0-1.12-2.76l-24-24,24-23.92a4,4,0,0,0,1.14-2.83,3.62,3.62,0,0,0-1.14-2.79A3.93,3.93,0,0,0,57.4,0a3.75,3.75,0,0,0-2.76,1.12l-24,24L6.74,1.12A3.81,3.81,0,0,0,3.93,0,3.81,3.81,0,0,0,1.12,1.12,3.91,3.91,0,0,0,0,3.93,3.91,3.91,0,0,0,1.12,6.74l24,23.92-24,24a4,4,0,0,0,0,5.57Z'/>
                    </g>
                </g>
            </g>
        </svg>
    </>
);

export const HamburgerIcon = ({ color='#ffffff', width='18px' }) => (
    <>
        <svg width={width} height='100%' viewBox='0 0 18 14' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <rect width='18' height='2.4' rx='1.2' fill={color}/>
            <rect y='5.80054' width='18' height='2.4' rx='1.2' fill={color} />
            <rect y='11.5996' width='18' height='2.4' rx='1.2' fill={color} />
        </svg>
    </>
);

export const ClockIcon = ({ color='#FFC908', width='14px' }) => (
    <>
        <svg width={width} height='100%' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path fill={color} d='M4.0809 9.04782H7.79086C7.94385 9.04782 8.07134 8.99683 8.17333 8.89484C8.28043 8.78775 8.33397 8.6577 8.33397 8.50472V3.70088C8.33397 3.553 8.28043 3.42806 8.17333 3.32606C8.07134 3.21897 7.94385 3.16543 7.79086 3.16543C7.64297 3.16543 7.51548 3.21897 7.40839 3.32606C7.3064 3.42806 7.2554 3.553 7.2554 3.70088V7.96926H4.0809C3.92281 7.96926 3.79277 8.0228 3.69078 8.1299C3.58878 8.23189 3.53779 8.35683 3.53779 8.50472C3.53779 8.6577 3.58878 8.78775 3.69078 8.89484C3.79277 8.99683 3.92281 9.04782 4.0809 9.04782ZM7.79851 15.6416C8.81333 15.6416 9.76951 15.4453 10.667 15.0526C11.5646 14.665 12.355 14.1296 13.0384 13.4462C13.7217 12.7629 14.2572 11.975 14.6447 11.0826C15.0323 10.185 15.2261 9.22631 15.2261 8.20639C15.2261 7.19157 15.0298 6.23539 14.6371 5.33786C14.2495 4.44033 13.7141 3.64989 13.0307 2.96654C12.3474 2.28319 11.5569 1.74773 10.6594 1.36016C9.76186 0.972594 8.80569 0.778809 7.79086 0.778809C6.77604 0.778809 5.81986 0.972594 4.92233 1.36016C4.0299 1.74773 3.23946 2.28319 2.55101 2.96654C1.86767 3.64989 1.33221 4.44033 0.944637 5.33786C0.557066 6.23539 0.363281 7.19157 0.363281 8.20639C0.363281 9.22631 0.557066 10.185 0.944637 11.0826C1.33731 11.975 1.87532 12.7629 2.55866 13.4462C3.24201 14.1296 4.0299 14.665 4.92233 15.0526C5.81986 15.4453 6.77859 15.6416 7.79851 15.6416ZM7.79851 14.28C6.95708 14.28 6.16919 14.1219 5.43484 13.8058C4.7005 13.4947 4.0554 13.0612 3.49954 12.5054C2.94368 11.9495 2.51022 11.3044 2.19914 10.5701C1.88806 9.83571 1.73253 9.04782 1.73253 8.20639C1.73253 7.36495 1.88806 6.57706 2.19914 5.84272C2.51022 5.10838 2.94368 4.46328 3.49954 3.90742C4.0554 3.35156 4.69795 2.91809 5.42719 2.60702C6.16154 2.29594 6.94943 2.1404 7.79086 2.1404C8.6323 2.1404 9.42019 2.29594 10.1545 2.60702C10.8889 2.91809 11.534 3.35156 12.0898 3.90742C12.6457 4.46328 13.0792 5.10838 13.3902 5.84272C13.7064 6.57706 13.8645 7.36495 13.8645 8.20639C13.8696 9.04782 13.7141 9.83571 13.3979 10.5701C13.0868 11.3044 12.6533 11.9495 12.0975 12.5054C11.5467 13.0612 10.9016 13.4947 10.1622 13.8058C9.42784 14.1219 8.63995 14.28 7.79851 14.28Z' />
        </svg>
    </>
);